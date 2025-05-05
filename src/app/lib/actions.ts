"use server";

import { z } from "zod";
import prisma from "./prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getAdminSession, verifyPassword } from "./auth";
import slugify from "slugify";
import { writeFile, mkdir, unlink } from 'fs/promises';
import path from 'path';
// Import Prisma namespace for types like Prisma.RecipeUpdateInput
import { Prisma } from "@/generated/prisma/client";

// Helper function to check if an object looks like a File
function isFileLike(obj: unknown): obj is File {
  return (
    obj !== null &&
    typeof obj === 'object' &&
    typeof (obj as File).size === 'number' &&
    typeof (obj as File).type === 'string' &&
    typeof (obj as File).name === 'string' &&
    typeof (obj as File).arrayBuffer === 'function'
  );
}

// Validation Schema for Post
const PostSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(3, { message: "Title must be at least 3 characters." }),
  // Allow slug to be null or undefined initially, handle generation/validation in the action
  slug: z
    .string()
    .nullable() // Allow null
    .optional() // Allow undefined
    .refine((val) => !val || /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(val), {
      message: "Slug can only contain lowercase letters, numbers, and hyphens.",
    }),
  content: z
    .string()
    .min(10, { message: "Content must be at least 10 characters." }),
  image: z
    .any()
    .optional()
    .refine(
      (file) => {
        const looksLikeFile = isFileLike(file);
        const isImage = looksLikeFile && file.type.startsWith("image/");
        return !file || (looksLikeFile && file.size === 0) || isImage;
      },
      "Only images are allowed."
    )
    .refine(
        (file) => {
            const looksLikeFile = isFileLike(file);
            return !file || looksLikeFile;
        },
        "Please upload a valid file."
    )
    .transform((file) => file as File | undefined),
  published: z.coerce.boolean().default(false),
});

// Helper function to generate a unique slug for Posts
async function generateUniquePostSlug(title: string, currentId?: string): Promise<string> {
  const baseSlug = slugify(title, { lower: true, strict: true, remove: /[*+~.()'"!:@]/g });
  let uniqueSlug = baseSlug;
  let counter = 1;
  const MAX_SLUG_LENGTH = 255; // Example max length, adjust if needed

  while (
    await prisma.post.findFirst({
      where: {
        slug: uniqueSlug.substring(0, MAX_SLUG_LENGTH), // Check truncated slug
        NOT: {
          id: currentId, // Exclude current post when checking
        },
      },
      select: { id: true }, // Only select id for efficiency
    })
  ) {
    // Ensure the generated slug doesn't exceed max length
    const suffix = `-${counter}`;
    const availableLength = MAX_SLUG_LENGTH - suffix.length;
    uniqueSlug = `${baseSlug.substring(0, availableLength)}${suffix}`;
    counter++;
    if (counter > 100) { // Add a safety break
        throw new Error("Could not generate a unique slug after 100 attempts.");
    }
  }
  return uniqueSlug.substring(0, MAX_SLUG_LENGTH); // Return truncated slug
}

// Define a type for Prisma unique constraint errors
interface PrismaError extends Error {
  code?: string;
  meta?: { target?: string[] };
}

// Helper function to handle image upload
async function handleImageUpload(image: File | undefined, currentImageUrl?: string | null): Promise<string | null | undefined> {
    if (!image || image.size === 0) {
        // No new image provided or empty file, return current URL (undefined means no change)
        return undefined;
    }

    // Basic validation (redundant with Zod but good practice)
    if (!image.type.startsWith('image/')) {
        throw new Error('Invalid file type. Only images are allowed.');
    }

    // Define upload directory and ensure it exists
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadDir, { recursive: true });

    // Generate a unique filename
    const uniqueSuffix = `${Date.now()}-${image.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
    const filePath = path.join(uploadDir, uniqueSuffix);
    const fileUrl = `/uploads/${uniqueSuffix}`; // URL path relative to public folder

    // Convert file to buffer and write to disk
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);

    // Delete old image if it exists and a new one was uploaded
    if (currentImageUrl) {
        const oldFilePath = path.join(process.cwd(), 'public', currentImageUrl);
        try {
            await unlink(oldFilePath);
            console.log(`Deleted old image: ${oldFilePath}`);
        } catch (unlinkError: unknown) {
            // Ignore error if file doesn't exist, log others
            if (typeof unlinkError === 'object' && unlinkError !== null && 'code' in unlinkError && (unlinkError as { code?: string }).code !== 'ENOENT') {
                console.error(`Failed to delete old image ${oldFilePath}:`, unlinkError);
            }
        }
    }

    return fileUrl; // Return the URL path of the new image
}

// Type for state management with useFormState
export type State = {
  errors?: {
    title?: string[];
    slug?: string[];
    content?: string[];
    image?: string[];
    published?: string[];
    description?: string[];
    ingredients?: string[];
    instructions?: string[];
    prepTime?: string[];
    cookTime?: string[];
    servings?: string[];
  };
  message?: string | null;
};

// --- CREATE POST ACTION ---
export async function createPost(
  prevState: State | undefined,
  formData: FormData
): Promise<State> {
  const session = await getAdminSession();
  if (!session?.isLoggedIn) {
    return { message: "Authentication required." };
  }

  const validatedFields = PostSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
    image: formData.get("image"),
    published: formData.get("published") === "on",
  });

  if (!validatedFields.success) {
    console.error("Validation Errors:", validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Failed to create post. Please check the fields.",
    };
  }

  const { title, content, image, published } = validatedFields.data;

  let imageUrl: string | null | undefined = undefined;
  let slug: string;

  try {
    slug = await generateUniquePostSlug(title);
    imageUrl = await handleImageUpload(image);

    await prisma.post.create({
      data: {
        title,
        slug,
        content,
        imageUrl: imageUrl === undefined ? null : imageUrl,
        published,
      },
    });
  } catch (error: unknown) {
    console.error("Database or File System Error:", error);
    if (typeof error === 'object' && error !== null && 'code' in error && (error as PrismaError).code === 'P2002' && 'meta' in error && typeof (error as PrismaError).meta === 'object' && (error as PrismaError).meta !== null && 'target' in (error as PrismaError).meta! && Array.isArray((error as PrismaError).meta!.target) && (error as PrismaError).meta!.target?.includes('slug')) {
      return {
        errors: { slug: ['Slug already exists. Try a different title.'] },
        message: 'Failed to create post.',
      };
    }
    if (error instanceof Error) {
        if (error.message.includes("Invalid file type")) {
          return {
            errors: { image: [error.message] },
            message: 'Failed to create post.',
          };
        }
        if (error.message.includes("Could not generate a unique slug")) {
          return {
            errors: { title: ["Could not generate a unique slug from this title. Please modify the title."] },
            message: 'Failed to create post.',
          };
        }
        return { message: `Database or File System Error: ${error.message}` };
    }
    return { message: 'An unknown error occurred while creating the post.' };
  }

  revalidatePath("/admin");
  revalidatePath("/blog");
  revalidatePath("/");

  redirect("/admin");
}

// --- UPDATE POST ACTION ---
export async function updatePost(
  prevState: State | undefined,
  formData: FormData
): Promise<State> {
  const session = await getAdminSession();
  if (!session?.isLoggedIn) {
    return { message: "Authentication required." };
  }

  const id = formData.get("id") as string;
  if (!id) {
    return { message: "Post ID is missing." };
  }

  const existingPost = await prisma.post.findUnique({
    where: { id },
    select: { imageUrl: true, slug: true, title: true },
  });

  if (!existingPost) {
    return { message: "Post not found." };
  }

  const validatedFields = PostSchema.safeParse({
    id: id,
    title: formData.get("title"),
    slug: formData.get("slug"),
    content: formData.get("content"),
    image: formData.get("image"),
    published: formData.get("published") === "on",
  });

  if (!validatedFields.success) {
    console.error("Validation Errors:", validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Failed to update post. Please check the fields.",
    };
  }

  const { title, content, image, published } = validatedFields.data;
  let slug = validatedFields.data.slug;

  let imageUrl: string | null | undefined = undefined;

  try {
    if (title !== existingPost.title) {
      slug = await generateUniquePostSlug(title, id);
    } else {
      slug = existingPost.slug;
    }

    imageUrl = await handleImageUpload(image, existingPost.imageUrl);

    const updateData: Prisma.PostUpdateInput = {
      title,
      slug,
      content,
      published,
    };

    if (imageUrl !== undefined) {
      updateData.imageUrl = imageUrl;
    }

    await prisma.post.update({
      where: { id: id },
      data: updateData,
    });
  } catch (error: unknown) {
    console.error("Database or File System Error:", error);
    if (typeof error === 'object' && error !== null && 'code' in error && (error as PrismaError).code === 'P2002' && 'meta' in error && typeof (error as PrismaError).meta === 'object' && (error as PrismaError).meta !== null && 'target' in (error as PrismaError).meta! && Array.isArray((error as PrismaError).meta!.target) && (error as PrismaError).meta!.target?.includes('slug')) {
      return {
        errors: { slug: ['Slug already exists. Try a different title.'] },
        message: 'Failed to update post.',
      };
    }
    if (error instanceof Error) {
        if (error.message.includes("Invalid file type")) {
          return {
            errors: { image: [error.message] },
            message: 'Failed to update post.',
          };
        }
        if (error.message.includes("Could not generate a unique slug")) {
          return {
            errors: { title: ["Could not generate a unique slug from this title. Please modify the title."] },
            message: 'Failed to update post.',
          };
        }
        return { message: `Database or File System Error: ${error.message}` };
    }
    return { message: 'An unknown error occurred while updating the post.' };
  }

  revalidatePath("/admin");
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/");

  redirect("/admin");
}

// --- DELETE POST ACTION ---
export async function deletePost(id: string) {
  const session = await getAdminSession();
  if (!session?.isLoggedIn) {
    return { message: "Authentication required." };
  }

  let postSlug: string | null = null;

  try {
    const post = await prisma.post.findUnique({ where: { id }, select: { slug: true } });
    if (post) {
      postSlug = post.slug;
    }

    await prisma.post.delete({
      where: { id },
    });

    revalidatePath("/admin");
    revalidatePath("/blog");
    revalidatePath("/");
    if (postSlug) revalidatePath(`/blog/${postSlug}`);
    redirect("/admin");
  } catch (error) {
    if (error instanceof Error && error.message.includes('NEXT_REDIRECT')) {
      throw error;
    }

    console.error("Database Error deleting post:", error);
    return { message: "Database Error: Failed to Delete Post." };
  }
}

// --- TOGGLE PUBLISH STATUS ACTION ---
export async function togglePublishStatus(id: string, currentState: boolean) {
  const session = await getAdminSession();
  if (!session?.isLoggedIn) {
    console.error("Authentication required to toggle publish status.");
    return { success: false, message: "Authentication required." };
  }

  try {
    const post = await prisma.post.update({
      where: { id },
      data: { published: !currentState },
      select: { slug: true },
    });

    console.log(`Toggled publish status for post ${id} to ${!currentState}`);

    revalidatePath("/admin");
    revalidatePath("/blog");
    revalidatePath("/");
    if (post.slug) revalidatePath(`/blog/${post.slug}`);

    return { success: true };
  } catch (error) {
    console.error("Database Error toggling publish status:", error);
    return { success: false, message: "Database Error: Failed to toggle status." };
  }
}

// --- LOGIN ACTION ---
export async function login(prevState: State | undefined, formData: FormData): Promise<State> {
  const password = formData.get('password') as string;

  if (!verifyPassword(password)) {
    return { message: 'Invalid password' };
  }

  const session = await getAdminSession();
  session.isLoggedIn = true;
  await session.save();

  redirect('/admin');
}

// --- LOGOUT ACTION ---
export async function logout() {
  const session = await getAdminSession();
  await session.destroy();
  redirect("/admin/login");
}

// --- Recipe Actions ---

// Validation Schema for Recipe
const RecipeSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(3, { message: "Title must be at least 3 characters." }),
  // Allow slug to be null or undefined initially, handle generation/validation in the action
  slug: z
    .string()
    .nullable() // Allow null
    .optional() // Allow undefined
    .refine((val) => !val || /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(val), {
      message: "Slug can only contain lowercase letters, numbers, and hyphens.",
    }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  ingredients: z.string().min(10, { message: "Ingredients must be at least 10 characters." }),
  instructions: z.string().min(10, { message: "Instructions must be at least 10 characters." }),
  prepTime: z.string().optional(),
  cookTime: z.string().optional(),
  servings: z.string().optional(),
  image: z
    .any()
    .optional()
    .refine(
      (file) => {
        const looksLikeFile = isFileLike(file);
        const isImage = looksLikeFile && file.type.startsWith("image/");
        return !file || (looksLikeFile && file.size === 0) || isImage;
      },
      "Only images are allowed."
    )
    .refine(
        (file) => {
            const looksLikeFile = isFileLike(file);
            return !file || looksLikeFile;
        },
        "Please upload a valid file."
    )
    .transform((file) => file as File | undefined),
  published: z.coerce.boolean().default(false),
});

// Helper function to generate a unique slug for Recipes
async function generateUniqueRecipeSlug(title: string, currentId?: string): Promise<string> {
  const baseSlug = slugify(title, { lower: true, strict: true, remove: /[*+~.()'"!:@]/g });
  let uniqueSlug = baseSlug;
  let counter = 1;
  const MAX_SLUG_LENGTH = 255; // Example max length, adjust if needed

  while (
    await prisma.recipe.findFirst({
      where: {
        slug: uniqueSlug.substring(0, MAX_SLUG_LENGTH), // Check truncated slug
        NOT: {
          id: currentId, // Exclude current recipe when checking
        },
      },
      select: { id: true }, // Only select id for efficiency
    })
  ) {
    // Ensure the generated slug doesn't exceed max length
    const suffix = `-${counter}`;
    const availableLength = MAX_SLUG_LENGTH - suffix.length;
    uniqueSlug = `${baseSlug.substring(0, availableLength)}${suffix}`;
    counter++;
     if (counter > 100) { // Add a safety break
        throw new Error("Could not generate a unique slug after 100 attempts.");
    }
  }
  return uniqueSlug.substring(0, MAX_SLUG_LENGTH); // Return truncated slug
}

// --- CREATE RECIPE ACTION ---
export async function createRecipe(
  prevState: State | undefined,
  formData: FormData
): Promise<State> {
  const session = await getAdminSession();
  if (!session?.isLoggedIn) {
    return { message: "Authentication required." };
  }

  const validatedFields = RecipeSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    ingredients: formData.get("ingredients"),
    instructions: formData.get("instructions"),
    prepTime: formData.get("prepTime"),
    cookTime: formData.get("cookTime"),
    servings: formData.get("servings"),
    image: formData.get("image"),
    published: formData.get("published") === "on",
  });

  if (!validatedFields.success) {
    console.error("Validation Errors:", validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Failed to create recipe. Please check the fields.",
    };
  }

  const { title, description, ingredients, instructions, prepTime, cookTime, servings, image, published } = validatedFields.data;
  let imageUrl: string | null | undefined = undefined;
  let slug: string;

  try {
    slug = await generateUniqueRecipeSlug(title);
    imageUrl = await handleImageUpload(image);

    await prisma.recipe.create({
      data: {
        title,
        slug,
        description,
        ingredients,
        instructions,
        prepTime,
        cookTime,
        servings,
        imageUrl: imageUrl === undefined ? null : imageUrl,
        published,
      },
    });
  } catch (error: unknown) {
    console.error("Database or File System Error:", error);
    if (typeof error === 'object' && error !== null && 'code' in error && (error as PrismaError).code === 'P2002' && 'meta' in error && typeof (error as PrismaError).meta === 'object' && (error as PrismaError).meta !== null && 'target' in (error as PrismaError).meta! && Array.isArray((error as PrismaError).meta!.target) && (error as PrismaError).meta!.target?.includes('slug')) {
      return {
        errors: { slug: ['Slug already exists. Try a different title.'] },
        message: 'Failed to create recipe.',
      };
    }
    if (error instanceof Error) {
        if (error.message.includes("Invalid file type")) {
          return {
            errors: { image: [error.message] },
            message: 'Failed to create recipe.',
          };
        }
        if (error.message.includes("Could not generate a unique slug")) {
          return {
            errors: { title: ["Could not generate a unique slug from this title. Please modify the title."] },
            message: 'Failed to create recipe.',
          };
        }
        return { message: `Database or File System Error: ${error.message}` };
    }
    return { message: 'An unknown error occurred while creating the recipe.' };
  }

  revalidatePath("/admin");
  revalidatePath("/recipes");

  redirect("/admin");
}

// --- UPDATE RECIPE ACTION ---
export async function updateRecipe(
  prevState: State | undefined,
  formData: FormData
): Promise<State> {
  const session = await getAdminSession();
  if (!session?.isLoggedIn) {
    return { message: "Authentication required." };
  }

  const id = formData.get("id") as string;
  if (!id) {
    return { message: "Recipe ID is missing." };
  }

  const existingRecipe = await prisma.recipe.findUnique({
    where: { id },
    select: { imageUrl: true, slug: true, title: true },
  });

  if (!existingRecipe) {
    return { message: "Recipe not found." };
  }

  const validatedFields = RecipeSchema.safeParse({
    id: id,
    title: formData.get("title"),
    slug: formData.get("slug"),
    description: formData.get("description"),
    ingredients: formData.get("ingredients"),
    instructions: formData.get("instructions"),
    prepTime: formData.get("prepTime"),
    cookTime: formData.get("cookTime"),
    servings: formData.get("servings"),
    image: formData.get("image"),
    published: formData.get("published") === "on",
  });

  if (!validatedFields.success) {
    console.error("Validation Errors:", validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Failed to update recipe. Please check the fields.",
    };
  }

  const { title, description, ingredients, instructions, prepTime, cookTime, servings, image, published } = validatedFields.data;
  let slug = validatedFields.data.slug;
  let imageUrl: string | null | undefined = undefined;

  try {
    if (title !== existingRecipe.title) {
      slug = await generateUniqueRecipeSlug(title, id);
    } else {
      slug = existingRecipe.slug;
    }

    imageUrl = await handleImageUpload(image, existingRecipe.imageUrl);

    const updateData: Prisma.RecipeUpdateInput = {
      title,
      slug,
      description,
      ingredients,
      instructions,
      prepTime,
      cookTime,
      servings,
      published,
    };

    if (imageUrl !== undefined) {
      updateData.imageUrl = imageUrl;
    }

    await prisma.recipe.update({
      where: { id: id },
      data: updateData,
    });
  } catch (error: unknown) {
    console.error("Database or File System Error:", error);
    if (typeof error === 'object' && error !== null && 'code' in error && (error as PrismaError).code === 'P2002' && 'meta' in error && typeof (error as PrismaError).meta === 'object' && (error as PrismaError).meta !== null && 'target' in (error as PrismaError).meta! && Array.isArray((error as PrismaError).meta!.target) && (error as PrismaError).meta!.target?.includes('slug')) {
      return {
        errors: { slug: ['Slug already exists. Try a different title.'] },
        message: 'Failed to update recipe.',
      };
    }
    if (error instanceof Error) {
        if (error.message.includes("Invalid file type")) {
          return {
            errors: { image: [error.message] },
            message: 'Failed to update recipe.',
          };
        }
        if (error.message.includes("Could not generate a unique slug")) {
          return {
            errors: { title: ["Could not generate a unique slug from this title. Please modify the title."] },
            message: 'Failed to update recipe.',
          };
        }
        return { message: `Database or File System Error: ${error.message}` };
    }
    return { message: 'An unknown error occurred while updating the recipe.' };
  }

  revalidatePath("/admin");
  revalidatePath("/recipes");
  revalidatePath(`/recipes/${slug}`);

  redirect("/admin");
}

// --- DELETE RECIPE ACTION ---
export async function deleteRecipe(id: string) {
  const session = await getAdminSession();
  if (!session?.isLoggedIn) {
    return { success: false, message: "Authentication required." };
  }
  let recipeSlug: string | null = null;
  let imageUrlToDelete: string | null = null;
  try {
    const recipe = await prisma.recipe.findUnique({ where: { id }, select: { imageUrl: true, slug: true } });
    if (recipe) {
        recipeSlug = recipe.slug;
        imageUrlToDelete = recipe.imageUrl;
    }

    await prisma.recipe.delete({
      where: { id },
    });

    if (imageUrlToDelete && imageUrlToDelete.startsWith('/uploads/')) {
        try {
            const imagePath = path.join(process.cwd(), "public", imageUrlToDelete);
            await unlink(imagePath);
        } catch (unlinkError) {
            console.error(`Failed to delete image file ${imageUrlToDelete} for recipe ${id}:`, unlinkError);
        }
    }

    revalidatePath("/admin");
    revalidatePath("/recipes");
    if (recipeSlug) {
        revalidatePath(`/recipes/${recipeSlug}`);
    }
  } catch (error) {
    if (error instanceof Error && error.message.includes('NEXT_REDIRECT')) {
      throw error;
    }
    console.error(`Database Error: Failed to delete recipe ${id}.`, error);
    return { success: false, message: "Database Error: Failed to delete recipe." };
  }

  redirect("/admin");
}

// --- TOGGLE RECIPE PUBLISH STATUS ACTION ---
export async function toggleRecipePublishStatus(id: string, publish: boolean) {
  const session = await getAdminSession();
  if (!session?.isLoggedIn) {
    return { success: false, message: "Authentication required." };
  }
  let recipeSlug: string | null = null;
  try {
    const updatedRecipe = await prisma.recipe.update({
      where: { id },
      data: { published: publish },
      select: { slug: true },
    });
    recipeSlug = updatedRecipe.slug;
    revalidatePath("/admin");
    revalidatePath("/recipes");
    if (recipeSlug) {
        revalidatePath(`/recipes/${recipeSlug}`);
    }
    return { success: true };
  } catch (error) {
    console.error(`Database Error: Failed to toggle publish status for recipe ${id}.`, error);
    return { success: false, message: "Database Error: Failed to toggle status." };
  }
}