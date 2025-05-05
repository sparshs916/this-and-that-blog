"use server";

import { z } from "zod";
import prisma from "./prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getAdminSession, verifyPassword } from "./auth";
import slugify from "slugify";
import { writeFile, mkdir, unlink } from 'fs/promises';
import path from 'path';
// Import types from the generated client path
import type { Post, Recipe } from "@/generated/prisma/client";

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
  slug: z
    .string()
    .optional()
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

// Helper function to generate a unique slug
async function generateUniqueSlug(title: string, currentId?: string): Promise<string> {
  const slug = slugify(title, { lower: true, strict: true, remove: /[*+~.()'"!:@]/g });
  let uniqueSlug = slug;
  let counter = 1;

  while (
    await prisma.post.findFirst({
      where: {
        slug: uniqueSlug,
        NOT: {
          id: currentId,
        },
      },
      select: { id: true },
    })
  ) {
    uniqueSlug = `${slug}-${counter}`;
    counter++;
  }
  return uniqueSlug;
}

// Define a type for Prisma unique constraint errors
interface PrismaError extends Error {
  code?: string;
  meta?: { target?: string[] };
}

// --- Helper function to save image ---
async function saveImage(imageFile: File): Promise<string | null> {
  if (!imageFile || imageFile.size === 0) {
    return null;
  }

  if (!imageFile.type.startsWith('image/')) {
    throw new Error('Invalid file type. Only images are allowed.');
  }

  const bytes = await imageFile.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const filename = `${Date.now()}-${imageFile.name.replace(/\s+/g, '_')}`;
  const uploadDir = path.join(process.cwd(), 'public/uploads');
  const filePath = path.join(uploadDir, filename);

  await mkdir(uploadDir, { recursive: true });
  await writeFile(filePath, buffer);

  return `/uploads/${filename}`;
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
const CreatePost = PostSchema.omit({ id: true });

export async function createPost(
  prevState: State | undefined,
  formData: FormData
): Promise<State> {
  const session = await getAdminSession();
  if (!session?.isLoggedIn) {
    return { message: "Authentication required." };
  }

  const imageFile = formData.get("image") as File | null;

  const validatedFields = CreatePost.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    content: formData.get("content"),
    image: imageFile && imageFile.size > 0 ? imageFile : undefined,
    published: formData.get("published") === 'on',
  });

  if (!validatedFields.success) {
    console.log("Validation Errors:", validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Failed to create post. Please check the fields.",
    };
  }

  const { title, content, published } = validatedFields.data;
  let slug = validatedFields.data.slug;
  const validatedImageFile = validatedFields.data.image;

  console.log("Attempting to create post with title:", title);

  try {
    if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
        slug = await generateUniqueSlug(title);
        console.log("Generated slug:", slug);
    } else {
        const existing = await prisma.post.findUnique({ where: { slug } });
        if (existing) {
            console.log(`Slug "${slug}" already exists.`);
            return { errors: { slug: [`Slug "${slug}" already exists. Try a different one or leave it blank.`] }, message: `Slug "${slug}" already exists.` };
        }
        console.log("Using provided unique slug:", slug);
    }

    let imageUrl: string | null = null;
    if (validatedImageFile) {
      try {
        imageUrl = await saveImage(validatedImageFile);
        console.log("Image saved successfully:", imageUrl);
      } catch (uploadError: unknown) {
        console.error("Image Upload Error:", uploadError);
        const message = uploadError instanceof Error ? uploadError.message : 'Failed to upload image.';
        return { errors: { image: [message] }, message: "Image upload failed." };
      }
    }

    const dataToCreate = {
        title,
        slug,
        content,
        imageUrl: imageUrl,
        published,
    };

    console.log("Data being sent to prisma.post.create:", dataToCreate);
    const createdPost = await prisma.post.create({ data: dataToCreate });
    console.log("Successfully created post:", createdPost.id);

    revalidatePath("/admin");
    revalidatePath("/blog");
    revalidatePath("/");
    redirect("/admin");

  } catch (error) {
    if (error instanceof Error && error.message.includes('NEXT_REDIRECT')) {
      throw error;
    }
    console.error("Database Error creating post:", error);
    const prismaError = error as PrismaError;
    if (prismaError?.code === 'P2002' && prismaError?.meta?.target?.includes('slug')) {
         return { message: `Slug "${slug}" is already taken. Please choose another or leave blank.` };
    }
    return { message: "Database Error: Failed to Create Post." };
  }
}

// --- UPDATE POST ACTION ---
const UpdatePost = PostSchema;

export async function updatePost(
  prevState: State | undefined,
  formData: FormData
): Promise<State> {
   const session = await getAdminSession();
   if (!session?.isLoggedIn) {
     return { message: "Authentication required." };
   }

  const imageFile = formData.get("image") as File | null;

  const validatedFields = UpdatePost.safeParse({
    id: formData.get("id"),
    title: formData.get("title"),
    slug: formData.get("slug"),
    content: formData.get("content"),
    image: imageFile && imageFile.size > 0 ? imageFile : undefined,
    published: formData.get("published") === 'on',
  });

  if (!validatedFields.success) {
     console.log("Validation Errors:", validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Failed to update post. Please check the fields.",
    };
  }

  const { id, title, content, published } = validatedFields.data;
  let slug = validatedFields.data.slug;
  const validatedImageFile = validatedFields.data.image;

  if (!id) {
      return { message: "Post ID is missing." };
  }

  try {
     if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
         slug = await generateUniqueSlug(title, id);
     } else {
         const existing = await prisma.post.findFirst({
             where: { slug, NOT: { id } },
             select: { id: true }
         });
         if (existing) {
              return { errors: { slug: [`Slug "${slug}" already exists. Try a different one or leave it blank.`] }, message: `Slug "${slug}" already exists.` };
         }
     }

    let imageUrl: string | null | undefined = undefined;
    if (validatedImageFile) {
      try {
        imageUrl = await saveImage(validatedImageFile);
        console.log("New image saved successfully:", imageUrl);
      } catch (uploadError: unknown) {
        console.error("Image Upload Error:", uploadError);
        const message = uploadError instanceof Error ? uploadError.message : 'Failed to upload image.';
        return { errors: { image: [message] }, message: "Image upload failed." };
      }
    }

    const dataToUpdate: {
        title: string;
        slug: string;
        content: string;
        published: boolean;
        imageUrl?: string | null;
    } = {
        title,
        slug,
        content,
        published,
    };

    if (imageUrl !== undefined) {
        dataToUpdate.imageUrl = imageUrl;
    }

    await prisma.post.update({
      where: { id: id },
      data: dataToUpdate,
    });

    revalidatePath("/admin");
    revalidatePath(`/admin/edit/${id}`);
    revalidatePath(`/blog/${slug}`);
    revalidatePath("/blog");
    revalidatePath("/");
    redirect("/admin");

  } catch (error) {
    if (error instanceof Error && error.message.includes('NEXT_REDIRECT')) {
      throw error;
    }
    console.error("Database Error updating post:", error);
    const prismaError = error as PrismaError;
    if (prismaError?.code === 'P2002' && prismaError?.meta?.target?.includes('slug')) {
         return { message: `Slug "${slug}" is already taken. Please choose another or leave blank.` };
    }
    return { message: "Database Error: Failed to Update Post." };
  }
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

// Helper function to generate a unique slug for Recipes
async function generateUniqueRecipeSlug(title: string, currentId?: string): Promise<string> {
  const slug = slugify(title, { lower: true, strict: true, remove: /[*+~.()'!:@]/g });
  let uniqueSlug = slug;
  let counter = 1;

  while (
    await prisma.recipe.findFirst({
      where: {
        slug: uniqueSlug,
        NOT: {
          id: currentId,
        },
      },
      select: { id: true },
    })
  ) {
    uniqueSlug = `${slug}-${counter}`;
    counter++;
  }
  return uniqueSlug;
}

// Validation Schema for Recipe
const RecipeSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(3, { message: "Title must be at least 3 characters." }),
  slug: z
    .string()
    .optional()
    .refine((val) => !val || /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(val), {
      message: "Slug can only contain lowercase letters, numbers, and hyphens.",
    }),
  description: z.string().optional(),
  ingredients: z.string().optional(),
  instructions: z.string().optional(),
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

const CreateRecipeSchema = RecipeSchema.omit({ id: true });
const UpdateRecipeSchema = RecipeSchema;

export async function createRecipe(
  prevState: State | undefined,
  formData: FormData
): Promise<State> {
  const session = await getAdminSession();
  if (!session?.isLoggedIn) {
    return { message: "Authentication required." };
  }

  const imageFile = formData.get("image") as File | null;

  const validatedFields = CreateRecipeSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    description: formData.get("description"),
    ingredients: formData.get("ingredients"),
    instructions: formData.get("instructions"),
    prepTime: formData.get("prepTime"),
    cookTime: formData.get("cookTime"),
    servings: formData.get("servings"),
    image: imageFile && imageFile.size > 0 ? imageFile : undefined,
    published: formData.get("published") === 'on',
  });

  if (!validatedFields.success) {
    console.log("Recipe Validation Errors:", validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Failed to create recipe. Please check the fields.",
    };
  }

  const {
    title,
    description,
    ingredients,
    instructions,
    prepTime,
    cookTime,
    servings,
    published
  } = validatedFields.data;
  let slug = validatedFields.data.slug;
  const validatedImageFile = validatedFields.data.image;

  try {
    if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      slug = await generateUniqueRecipeSlug(title);
    } else {
      const existing = await prisma.recipe.findUnique({ where: { slug } });
      if (existing) {
        return { errors: { slug: [`Slug "${slug}" already exists.`] }, message: `Slug "${slug}" already exists.` };
      }
    }

    let imageUrl: string | null = null;
    if (validatedImageFile) {
      try {
        imageUrl = await saveImage(validatedImageFile);
      } catch (uploadError: unknown) {
        const message = uploadError instanceof Error ? uploadError.message : 'Failed to upload image.';
        return { errors: { image: [message] }, message: "Image upload failed." };
      }
    }

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
        imageUrl,
        published,
      },
    });

    revalidatePath("/admin");
    revalidatePath("/recipes");
    redirect("/admin");

  } catch (error) {
    if (error instanceof Error && error.message.includes('NEXT_REDIRECT')) {
      throw error;
    }
    const prismaError = error as PrismaError;
    if (prismaError?.code === 'P2002' && prismaError?.meta?.target?.includes('slug')) {
      return { message: `Slug "${slug}" is already taken.` };
    }
    console.error("Database Error creating recipe:", error);
    return { message: "Database Error: Failed to Create Recipe." };
  }
}

export async function updateRecipe(
  prevState: State | undefined,
  formData: FormData
): Promise<State> {
  const session = await getAdminSession();
  if (!session?.isLoggedIn) {
    return { message: "Authentication required." };
  }

  const id = formData.get("id") as string | null;
  if (!id) {
    return { message: "Recipe ID is missing.", errors: {} };
  }

  const imageFile = formData.get("image") as File | null;
  const slugValue = formData.get("slug"); // Get slug value

  const validatedFields = UpdateRecipeSchema.safeParse({
    id: id,
    title: formData.get("title"),
    slug: slugValue === null ? undefined : slugValue, // Convert null to undefined before validation
    description: formData.get("description"),
    ingredients: formData.get("ingredients"),
    instructions: formData.get("instructions"),
    prepTime: formData.get("prepTime"),
    cookTime: formData.get("cookTime"),
    servings: formData.get("servings"),
    // Ensure published is handled correctly (coerce boolean)
    published: formData.get("published") === 'on', // Check if checkbox value is 'on'
    image: imageFile && imageFile.size > 0 ? imageFile : undefined,
  });

  if (!validatedFields.success) {
    console.error("Recipe Validation Failed:", validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Failed to update recipe. Please check the fields.",
    };
  }

  // Destructure validated data, including published status
  const { image, published, ...recipeData } = validatedFields.data;
  let { slug } = recipeData;

  if (!slug || !slug.trim()) {
    slug = await generateUniqueRecipeSlug(recipeData.title, id);
  } else {
    slug = slugify(slug, { lower: true, strict: true });
    const existingRecipe = await prisma.recipe.findFirst({
      where: {
        slug: slug,
        id: { not: id },
      },
    });
    if (existingRecipe) {
      return {
        errors: { slug: ["Slug already exists. Please choose a unique slug."] },
        message: "Failed to update recipe.",
      };
    }
  }

  let imageUrl: string | null | undefined = undefined;
  try {
    if (image) {
      imageUrl = await saveImage(image);
    }

    // Use Prisma.RecipeUpdateInput for type safety
    const dataToUpdate: Prisma.RecipeUpdateInput = {
      ...recipeData,
      slug: slug,
      published: published, // Include published status
    };

    if (imageUrl !== undefined) {
      dataToUpdate.imageUrl = imageUrl;
    } else {
      // No new image, don't include imageUrl in the update data
      // Prisma handles this correctly if the field is omitted
    }

    await prisma.recipe.update({
      where: { id: id },
      data: dataToUpdate,
    });

    console.log(`Recipe ${id} updated successfully.`);

  } catch (error) {
    console.error("Database Error: Failed to Update Recipe.", error);
    return { message: "Database Error: Failed to update recipe.", errors: {} };
  }

  revalidatePath("/admin");
  revalidatePath("/recipes");
  if (published && slug) { // Use the validated published status
    revalidatePath(`/recipes/${slug}`);
  }

  redirect("/admin");
}

// Ensure only one definition exists for toggleRecipePublishStatus
export async function toggleRecipePublishStatus(id: string, publish: boolean) {
  const session = await getAdminSession();
  if (!session?.isLoggedIn) {
    // Return an object indicating failure, consistent with other actions
    return { success: false, message: "Authentication required." };
  }
  let recipeSlug: string | null = null; // To revalidate specific path
  try {
    const updatedRecipe = await prisma.recipe.update({
      where: { id },
      data: { published: publish },
      select: { slug: true }, // Select slug for revalidation
    });
    recipeSlug = updatedRecipe.slug;
    revalidatePath("/admin");
    revalidatePath("/recipes");
    if (recipeSlug) {
        revalidatePath(`/recipes/${recipeSlug}`);
    }
    console.log(`Recipe ${id} publish status toggled to ${publish}`);
    return { success: true }; // Indicate success
  } catch (error) {
    console.error(`Database Error: Failed to toggle publish status for recipe ${id}.`, error);
    // Return an object indicating failure
    return { success: false, message: "Database Error: Failed to toggle status." };
  }
}

// Ensure only one definition exists for deleteRecipe
export async function deleteRecipe(id: string) {
  const session = await getAdminSession();
  if (!session?.isLoggedIn) {
    // Return an object indicating failure
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

    // Delete DB record first
    await prisma.recipe.delete({
      where: { id },
    });
    console.log(`Recipe ${id} deleted from database.`);

    // If DB deletion successful, attempt to delete image file
    if (imageUrlToDelete && imageUrlToDelete.startsWith('/uploads/')) {
        try {
            const imagePath = path.join(process.cwd(), "public", imageUrlToDelete);
            await unlink(imagePath);
            console.log(`Deleted image file for recipe ${id}: ${imageUrlToDelete}`);
        } catch (unlinkError) {
            // Log error but don't block revalidation/redirect if file deletion fails
            console.error(`Failed to delete image file ${imageUrlToDelete} for recipe ${id}:`, unlinkError);
        }
    }

    // Revalidate paths after successful DB deletion
    revalidatePath("/admin");
    revalidatePath("/recipes");
    if (recipeSlug) {
        revalidatePath(`/recipes/${recipeSlug}`);
    }

    // Redirect only after successful deletion and revalidation
    // Note: redirect() throws an error, so it should be outside the try block
    // if we want the catch block to handle DB errors.
    // However, common practice is to redirect at the end of the successful path.

  } catch (error) {
    if (error instanceof Error && error.message.includes('NEXT_REDIRECT')) {
      throw error; // Allow redirect errors to propagate
    }
    console.error(`Database Error: Failed to delete recipe ${id}.`, error);
    // Return an object indicating failure
    return { success: false, message: "Database Error: Failed to delete recipe." };
  }

  // Redirect after successful try block execution
  redirect("/admin");
}