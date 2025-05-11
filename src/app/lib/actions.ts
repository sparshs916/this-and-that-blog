"use server";

import { z } from "zod";
import prisma from "./prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getAdminSession, verifyPassword } from "./auth";
import slugify from "slugify";
import { put, del } from '@vercel/blob';
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
  description: z.string().max(200, { message: "Description must be 200 characters or less." }).optional(), // Added description field with validation
  content: z
    .string()
    .min(10, { message: "Content must be at least 10 characters." }),
  category: z.string().optional(), // Added category field
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
        // No new image provided or empty file, return undefined (no change to DB)
        return undefined;
    }

    // Basic validation (redundant with Zod but good practice)
    if (!image.type.startsWith('image/')) {
        throw new Error('Invalid file type. Only images are allowed.');
    }

    // Generate a unique blob name (e.g., uploads/timestamp-filename)
    // Vercel Blob doesn't use traditional paths but a flat structure. 
    // You can use slashes in names for organization if desired.
    const blobName = `uploads/${Date.now()}-${image.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;

    try {
        const blob = await put(blobName, image, {
            access: 'public',
            contentType: image.type, // Pass content type
        });

        // If there was an old image URL, attempt to delete it from Vercel Blob
        if (currentImageUrl) {
            try {
                await del(currentImageUrl); 
            } catch (deleteError: unknown) {
                // Log deletion error but don't let it fail the upload of the new image
                console.error(`Failed to delete old image ${currentImageUrl} from Vercel Blob:`, deleteError);
            }
        }
        return blob.url; // Return the public URL of the new image from Vercel Blob

    } catch (uploadError: unknown) {
        console.error(`Failed to upload image ${blobName} to Vercel Blob:`, uploadError);
        // Re-throw or handle as appropriate for your application
        // For now, let's re-throw a generic error to be caught by the calling action
        if (uploadError instanceof Error) {
            throw new Error(`Image upload failed: ${uploadError.message}`);
        }
        throw new Error('Image upload failed due to an unknown error.');
    }
}

// Type for state management with useFormState
export type State = {
  errors?: {
    title?: string[];
    slug?: string[];
    description?: string[]; // Added description errors
    content?: string[];
    category?: string[]; // Added category errors
    image?: string[];
    published?: string[];
    ingredients?: string[];
    instructions?: string[];
    prepTime?: string[];
    cookTime?: string[];
    servings?: string[];
  };
  message?: string | null;
  status?: number; // Add status to State type
};

// --- CREATE POST ACTION ---
export async function createPost(
  prevState: State | undefined,
  formData: FormData
): Promise<State> {
  // Validate form using Zod
  const validatedFields = PostSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug") || null, // Handle empty string as null
    description: formData.get("description"), // Get description
    content: formData.get("content"),
    category: formData.get("category"), // Get category
    image: formData.get("image"),
    published: formData.get("published") === "on",
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    // console.error("Validation Errors:", validatedFields.error.flatten().fieldErrors); // Removed log
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Failed to create post. Please check the fields.",
    };
  }

  // Destructure the validated data
  const { title, slug: inputSlug, description, content, category: rawCategory, image, published } = validatedFields.data;

  // Capitalize category
  let category: string | undefined | null = rawCategory;
  if (typeof category === 'string' && category.trim() !== '') {
    category = category.trim();
    category = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
  } else if (typeof category === 'string' && category.trim() === '') {
    category = null; 
  }

  // Generate a unique slug if not provided or if it\'s an empty string
  const slug = inputSlug && inputSlug.trim() !== "" ? inputSlug : await generateUniquePostSlug(title);

  try {
    // Handle image upload if an image is provided
    const imageUrl = await handleImageUpload(image);

    // Create the post in the database
    await prisma.post.create({
      data: {
        title,
        slug,
        description, // Add description
        content,
        category, // Add category
        imageUrl,
        published,
      },
    });

    // Revalidate the path to update the cache
    revalidatePath("/admin");
    revalidatePath("/blog");
    revalidatePath("/"); // Revalidate home page if it shows recent posts

    // Return success state (redirect will be handled by the client)
    // No specific success message needed here if redirecting
    // For create, we typically redirect, so a message might not be seen.
    // However, if we wanted to show one: return { message: "Post created successfully!" };
  } catch (e) {
    const error = e as PrismaError; // Type assertion
    // console.error("Prisma Error:", error); // Removed log
    // Check for unique constraint violation on slug
    if (error.code === "P2002" && error.meta?.target?.includes("slug")) {
      return {
        errors: { slug: ["This slug is already in use. Please choose another."] },
        message: "Failed to create post due to slug conflict.",
      };
    }
    return { message: "Database Error: Failed to Create Post." };
  }
  // If successful, redirect to the admin page
  redirect("/admin");
}

// --- UPDATE POST ACTION ---
export async function updatePost(
  prevState: State | undefined,
  formData: FormData
): Promise<State> {
  const id = formData.get("id") as string; // Get ID from form data

  // Validate form using Zod
  const validatedFields = PostSchema.safeParse({
    id, // Include id for context, though not strictly part of schema for creation
    title: formData.get("title"),
    slug: formData.get("slug") || null,
    description: formData.get("description"), // Get description
    content: formData.get("content"),
    category: formData.get("category"), // Get category
    image: formData.get("image"),
    published: formData.get("published") === "on",
  });

  // If form validation fails, return errors early.
  if (!validatedFields.success) {
    // console.error("Validation Errors:", validatedFields.error.flatten().fieldErrors); // Removed log
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Failed to update post. Please check the fields.",
    };
  }

  // Destructure the validated data
  const { title, slug: inputSlug, description, content, category: rawCategory, image, published } = validatedFields.data;

  // Capitalize category
  let category: string | undefined | null = rawCategory;
  if (typeof category === 'string' && category.trim() !== '') {
    category = category.trim();
    category = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
  } else if (typeof category === 'string' && category.trim() === '') {
    category = null; 
  }

  // Fetch the current post to get existing image URL and slug (if needed)
  const currentPost = await prisma.post.findUnique({ where: { id } });
  if (!currentPost) {
    return { message: "Post not found." };
  }

  // Generate a unique slug if the title changed and no slug was provided,
  // or if the provided slug is different from the current one.
  let slugToUse = currentPost.slug;
  if (inputSlug && inputSlug.trim() !== "" && inputSlug !== currentPost.slug) {
    slugToUse = await generateUniquePostSlug(inputSlug, id);
  } else if (title !== currentPost.title && (!inputSlug || inputSlug.trim() === "")) {
    // If title changed and slug is empty, regenerate slug from new title
    slugToUse = await generateUniquePostSlug(title, id);
  }


  try {
    // Handle image upload
    const imageUrl = await handleImageUpload(image, currentPost.imageUrl);

    // Update the post in the database
    await prisma.post.update({
      where: { id },
      data: {
        title,
        slug: slugToUse,
        description, // Add description
        content,
        category, // Add category
        imageUrl, // This will be undefined if no new image, null if image removed, or new URL
        published,
      },
    });

    // Revalidate paths
    revalidatePath("/admin");
    revalidatePath(`/blog/${slugToUse}`); // Revalidate specific post page
    revalidatePath("/blog"); // Revalidate blog listing
    revalidatePath("/"); // Revalidate home page

    // Return success state (redirect will be handled by the client)
    // No specific success message needed here if redirecting
  } catch (e) {
    const error = e as PrismaError; // Type assertion
    // console.error("Prisma Error:", error); // Removed log
    if (error.code === "P2002" && error.meta?.target?.includes("slug")) {
      return {
        errors: { slug: ["This slug is already in use. Please choose another."] },
        message: "Failed to update post due to slug conflict.",
      };
    }
    return { message: "Database Error: Failed to Update Post." };
  }
  // If successful, redirect to the admin page
  redirect("/admin");
}

// --- DELETE POST ACTION ---
export async function deletePost(id: string): Promise<State> {
  if (!id) {
    return {
      message: "Post ID is required for deletion.",
      status: 400,
      errors: {},
    };
  }
  try {
    // Check if the user is authenticated (example)
    const session = await getAdminSession();
    if (!session?.isLoggedIn) {
      return {
        message: "Authentication required.",
        status: 401,
        errors: {},
      };
    }

    // Check if post exists before attempting to delete
    const existingPost = await prisma.post.findUnique({
      where: { id },
      select: { id: true }, // Only select id for efficiency
    });

    if (!existingPost) {
      return {
        message: "Post not found. It may have already been deleted.",
        status: 404,
        errors: {},
      };
    }

    await prisma.post.delete({
      where: { id },
    });

    revalidatePath("/admin"); // Revalidate the admin dashboard
    revalidatePath("/blog"); // Revalidate the main blog page
    revalidatePath(`/blog/[slug]`); // Revalidate individual blog post pages (template)
    revalidatePath("/"); // Revalidate home page

    return {
      message: "Post deleted successfully.",
      status: 200,
      errors: {},
    };
  } catch (error: unknown) { // Changed from 'e' to 'error' for clarity if it was 'e'
    // console.error("Error deleting post:", error); // Removed log
    // Check for specific Prisma errors if needed, e.g., P2025 (Record to delete does not exist)
    if (error instanceof Object && 'code' in error && typeof error.code === 'string' && error.code === "P2025") {
      return {
        message: "Post not found or already deleted.",
        status: 404,
        errors: {},
      };
    }
    return {
      message: "Failed to delete post due to a server error. Please try again.",
      status: 500,
      errors: {},
    };
  }
}

// --- TOGGLE POST PUBLISH STATUS ---
export async function togglePublishStatus(id: string, currentStatus: boolean): Promise<State> {
  const session = await getAdminSession();
  if (!session?.isLoggedIn) {
    return {
      message: "Authentication required.",
      status: 401,
      errors: {},
    };
  }

  try {
    const updatedPost = await prisma.post.update({
      where: { id },
      data: { published: !currentStatus },
    });

    revalidatePath("/admin");
    revalidatePath("/blog");
    revalidatePath(`/blog/${updatedPost.slug}`);
    revalidatePath("/"); // Revalidate home page

    return {
      message: `Post ${updatedPost.published ? "published" : "unpublished"} successfully.`,
      status: 200,
      errors: {},
    };
  } catch (error) {
    // console.error("Error toggling post publish status:", error); // Removed log
    return {
      message: "Failed to toggle post publish status.",
      status: 500,
      errors: {},
    };
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
  session.destroy(); // Removed await here
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
  category: z.string().optional(), // Added category field
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
    category: formData.get("category"), // Get category
    image: formData.get("image"),
    published: formData.get("published") === "on",
  });

  if (!validatedFields.success) {
    // console.error("Validation Errors:", validatedFields.error.flatten().fieldErrors); // Removed log
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Failed to create recipe. Please check the fields.",
    };
  }

  const { title, description, ingredients, instructions, prepTime, cookTime, servings, category: rawCategory, image, published } = validatedFields.data;
  
  // Capitalize category
  let category: string | undefined | null = rawCategory;
  if (typeof category === 'string' && category.trim() !== '') {
    category = category.trim();
    category = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
  } else if (typeof category === 'string' && category.trim() === '') {
    category = null; 
  }
  
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
        category, // Add category
        imageUrl: imageUrl === undefined ? null : imageUrl,
        published,
      },
    });
  } catch (error: unknown) {
    // console.error("Database or File System Error:", error); // Removed log
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
  revalidatePath("/"); // Revalidate home page

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

  const id = formData.get("id") as string; // Get ID from form data

  const validatedFields = RecipeSchema.safeParse({
    id, // Include id for context
    title: formData.get("title"),
    slug: formData.get("slug") || null,
    description: formData.get("description"),
    ingredients: formData.get("ingredients"),
    instructions: formData.get("instructions"),
    prepTime: formData.get("prepTime"),
    cookTime: formData.get("cookTime"),
    servings: formData.get("servings"),
    category: formData.get("category"), // Get category
    image: formData.get("image"),
    published: formData.get("published") === "on",
  });

  if (!validatedFields.success) {
    // console.error("Validation Errors:", validatedFields.error.flatten().fieldErrors); // Removed log
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Failed to update recipe. Please check the fields.",
    };
  }

  // Destructure validated data, using a clear name for slug from form
  const { title, slug: inputSlugFromForm, description, ingredients, instructions, prepTime, cookTime, servings, category: rawCategory, image, published } = validatedFields.data;

  // Capitalize category
  let category: string | undefined | null = rawCategory;
  if (typeof category === 'string' && category.trim() !== '') {
    category = category.trim();
    category = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
  } else if (typeof category === 'string' && category.trim() === '') {
    category = null;
  }

  const currentRecipe = await prisma.recipe.findUnique({ where: { id } });
  if (!currentRecipe) {
    return { message: "Recipe not found." };
  }

  // Determine the slug to use
  let slugToUse = currentRecipe.slug;
  if (inputSlugFromForm && inputSlugFromForm.trim() !== "" && inputSlugFromForm !== currentRecipe.slug) {
    // If a new slug is provided via form and it's different, use it (after ensuring uniqueness)
    slugToUse = await generateUniqueRecipeSlug(inputSlugFromForm, id);
  } else if (title !== currentRecipe.title && (!inputSlugFromForm || inputSlugFromForm.trim() === "")) {
    // If title changed AND no new slug was provided (or it was empty), regenerate from new title
    slugToUse = await generateUniqueRecipeSlug(title, id);
  }
  
  let imageUrl: string | null | undefined = undefined;

  try {
    // The following lines from the original file seem to have a less robust slug logic.
    // if (title !== currentRecipe.title) {
    //   slug = await generateUniqueRecipeSlug(title, id);
    // } else {
    //   slug = currentRecipe.slug;
    // }
    // Replaced by the slugToUse logic above.

    imageUrl = await handleImageUpload(image, currentRecipe.imageUrl);

    const updateData: Prisma.RecipeUpdateInput = {
      title,
      slug: slugToUse, // Use the determined slugToUse
      description,
      ingredients,
      instructions,
      prepTime,
      cookTime,
      servings,
      category, // Add category
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
    // console.error("Database or File System Error:", error); // Removed log
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
  revalidatePath(`/recipes/${slugToUse}`);
  revalidatePath("/"); // Revalidate home page

  redirect("/admin");
}

// --- DELETE RECIPE ACTION ---
export async function deleteRecipe(id: string): Promise<State> {
  if (!id) {
    return {
      message: "Recipe ID is required for deletion.",
      status: 400,
      errors: {},
    };
  }
  try {
    const session = await getAdminSession();
    if (!session?.isLoggedIn) {
      return {
        message: "Authentication required.",
        status: 401,
        errors: {},
      };
    }

    const existingRecipe = await prisma.recipe.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!existingRecipe) {
      return {
        message: "Recipe not found. It may have already been deleted.",
        status: 404,
        errors: {},
      };
    }

    await prisma.recipe.delete({
      where: { id },
    });

    revalidatePath("/admin");
    revalidatePath("/recipes");
    revalidatePath(`/recipes/[slug]`);
    revalidatePath("/"); // Revalidate home page

    return {
      message: "Recipe deleted successfully.",
      status: 200,
      errors: {},
    };
  } catch (error: unknown) { // Changed from 'e' to 'error' for clarity
    // console.error("Error deleting recipe:", error); // Removed log
    if (error instanceof Object && 'code' in error && typeof error.code === 'string' && error.code === "P2025") {
      return {
        message: "Recipe not found or already deleted.",
        status: 404,
        errors: {},
      };
    }
    return {
      message: "Failed to delete recipe due to a server error. Please try again.",
      status: 500,
      errors: {},
    };
  }
}

// --- TOGGLE RECIPE PUBLISH STATUS ---
export async function toggleRecipePublishStatus(id: string, currentStatus: boolean): Promise<State> {
  const session = await getAdminSession();
  if (!session?.isLoggedIn) {
    return {
      message: "Authentication required.",
      status: 401,
      errors: {},
    };
  }

  try {
    const updatedRecipe = await prisma.recipe.update({
      where: { id },
      data: { published: !currentStatus },
    });

    revalidatePath("/admin");
    revalidatePath("/recipes"); // Revalidate the main recipes page
    revalidatePath(`/recipes/${updatedRecipe.slug}`); // Revalidate individual recipe pages
    revalidatePath("/"); // Revalidate home page

    return {
      message: `Recipe ${updatedRecipe.published ? "published" : "unpublished"} successfully.`,
      status: 200,
      errors: {},
    };
  } catch (error) {
    // console.error("Error toggling recipe publish status:", error); // Removed log
    return {
      message: "Failed to toggle recipe publish status.",
      status: 500,
      errors: {},
    };
  }
}

// Action to get unique post categories
export async function getPostCategories(): Promise<string[]> {
  try {
    const categories = await prisma.post.findMany({
      where: {
        category: {
          not: null,
          notIn: [''], // Exclude empty strings if necessary
        },
      },
      select: {
        category: true,
      },
      distinct: ["category"],
    });
    // Ensure categories are strings and filter out any null/undefined if they somehow pass the query
    return categories
      .map((p) => p.category)
      .filter((c): c is string => c !== null && c !== undefined && c.trim() !== '');
  } catch (error) {
    // console.error("Error fetching post categories:", error); // Removed log
    return []; // Return empty array on error
  }
}

// Action to get unique recipe categories
export async function getRecipeCategories(): Promise<string[]> {
  try {
    const categories = await prisma.recipe.findMany({
      where: {
        category: {
          not: null,
          notIn: [''], // Exclude empty strings
        },
      },
      select: {
        category: true,
      },
      distinct: ["category"],
    });
    return categories
      .map((r) => r.category)
      .filter((c): c is string => c !== null && c !== undefined && c.trim() !== '');
  } catch (error) {
    // console.error("Error fetching recipe categories:", error); // Removed log
    return [];
  }
}

// Authentication