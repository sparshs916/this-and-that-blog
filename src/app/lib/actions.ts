"use server";
// Import Prisma namespace for types like Prisma.RecipeUpdateInput

// Import PrismaClient for casting
import { PrismaClient, NewsletterStatus, Prisma } from "@/generated/prisma/client"; // Combined imports
import prisma from "@/app/lib/prisma"; // Ensure prisma is imported
import { z } from "zod";
import slugify from "slugify";
import { put, del } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getAdminSession, verifyPassword } from "./auth";
import { sendWelcomeEmail, sendWeeklyNewsletter } from "@/app/lib/email"; // Added sendWeeklyNewsletter

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
  const MAX_SLUG_LENGTH = 255;
  while (
    await (prisma as PrismaClient).post.findFirst({
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
    await (prisma as PrismaClient).post.create({
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
  } catch (e) {
    const error = e as Prisma.PrismaClientKnownRequestError;
    if (error.code === "P2002" && error.meta?.target) {
      const target = error.meta.target;
      let isSlugError = false;
      if (typeof target === 'string') {
        isSlugError = target.includes("slug");
      } else if (Array.isArray(target)) {
        isSlugError = target.includes("slug");
      }
      if (isSlugError) {
        return {
          errors: { slug: ["This slug is already in use. Please choose another."] },
          message: "Failed to create post due to slug conflict.",
        };
      }
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
    id: formData.get("id") as string, // Include id for context, though not strictly part of schema for creation
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
  const currentPost = await (prisma as PrismaClient).post.findUnique({ where: { id } });
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
    await (prisma as PrismaClient).post.update({
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

  } catch (e) {
    const error = e as Prisma.PrismaClientKnownRequestError;
    if (error.code === "P2002" && error.meta?.target) {
      const target = error.meta.target;
      let isSlugError = false;
      if (typeof target === 'string') {
        isSlugError = target.includes("slug");
      } else if (Array.isArray(target)) {
        isSlugError = target.includes("slug");
      }
      if (isSlugError) {
        return {
          errors: { slug: ["This slug is already in use. Please choose another."] },
          message: "Failed to update post due to slug conflict.",
        };
      }
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
    const existingPost = await (prisma as PrismaClient).post.findUnique({
      where: { id },
      select: { id: true, imageUrl: true }, // Select imageUrl to delete from blob storage
    });

    if (!existingPost) {
      return { message: "Post not found.", status: 404 };
    }

    // Delete image from Vercel Blob if it exists
    if (existingPost.imageUrl) {
      try {
        await del(existingPost.imageUrl);
      } catch (blobError: unknown) {
        console.error(`Failed to delete image ${existingPost.imageUrl} from Vercel Blob:`, blobError);
        // Optionally, decide if this should prevent post deletion or just be logged
      }
    }

    await (prisma as PrismaClient).post.delete({
      where: { id },
    });

    revalidatePath("/admin");
    revalidatePath("/blog");
    revalidatePath("/");
    return { message: "Post deleted successfully.", status: 200 };
  } catch (error: unknown) {
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
    await (prisma as PrismaClient).post.update({
      where: { id },
      data: { published: !currentStatus },
    });
    revalidatePath("/admin");
    revalidatePath("/blog"); // Revalidate blog listing
    revalidatePath(`/blog/${id}`); // Revalidate specific post page if slug is id, or fetch slug
    revalidatePath("/");
    return { message: `Post ${!currentStatus ? "published" : "unpublished"} successfully.`, status: 200 };
  } catch (error) {
    // console.error("Error toggling post publish status:", error); // Removed log
    return {
      message: "Failed to toggle post publish status.",
      status: 500,
      errors: {},
    };
  }
}

// --- RECIPE ACTIONS ---

// Validation Schema for Recipe
const RecipeSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(3, { message: "Title must be at least 3 characters." }),
  slug: z
    .string()
    .nullable()
    .optional()
    .refine((val) => !val || /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(val), {
      message: "Slug can only contain lowercase letters, numbers, and hyphens.",
    }),
  description: z.string().max(300, { message: "Description must be 300 characters or less." }).optional(),
  ingredients: z.string().min(10, { message: "Ingredients must be at least 10 characters." }),
  instructions: z.string().min(10, { message: "Instructions must be at least 10 characters." }),
  prepTime: z.string().optional(), // e.g., "20 minutes"
  cookTime: z.string().optional(), // e.g., "30 minutes"
  servings: z.string().optional().nullable(), // Allow string, undefined, or null
  category: z.string().optional(), // e.g., "Dinner", "Dessert"
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
  const baseSlug = slugify(title, { lower: true, strict: true, remove: /[*+~.()\'"!:@]/g });
  let uniqueSlug = baseSlug;
  let counter = 1;
  const MAX_SLUG_LENGTH = 255;
  while (
    await (prisma as PrismaClient).recipe.findFirst({
      where: {
        slug: uniqueSlug.substring(0, MAX_SLUG_LENGTH),
        NOT: {
          id: currentId,
        },
      },
      select: { id: true },
    })
  ) {
    const suffix = `-${counter}`;
    const availableLength = MAX_SLUG_LENGTH - suffix.length;
    uniqueSlug = `${baseSlug.substring(0, availableLength)}${suffix}`;
    counter++;
     if (counter > 100) {
        throw new Error("Could not generate a unique recipe slug after 100 attempts.");
    }
  }
  return uniqueSlug.substring(0, MAX_SLUG_LENGTH);
}

// --- CREATE RECIPE ACTION ---
export async function createRecipe(
  prevState: State | undefined,
  formData: FormData
): Promise<State> {
  const session = await getAdminSession();
  if (!session?.isLoggedIn) {
    return { message: "Authentication required.", status: 401 };
  }

  const rawServings = formData.get("servings");
  const servingsForValidation = rawServings === "" || rawServings === null ? undefined : rawServings;

  const validatedFields = RecipeSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug") || null,
    description: formData.get("description"),
    ingredients: formData.get("ingredients"),
    instructions: formData.get("instructions"),
    prepTime: formData.get("prepTime"),
    cookTime: formData.get("cookTime"),
    servings: servingsForValidation, // Pass potentially undefined string
    category: formData.get("category"),
    image: formData.get("image"),
    published: formData.get("published") === "on",
  });

  if (!validatedFields.success) {
    console.error("Create Recipe Validation Errors:", validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Failed to create recipe. Please check the fields.",
    };
  }

  const { title, slug: inputSlug, description, ingredients, instructions, prepTime, cookTime, servings, category, image, published } = validatedFields.data;
  // 'servings' is now string | null | undefined
  // 'notes' was removed
  // 'cuisine' was removed

  const slug = inputSlug && inputSlug.trim() !== "" ? inputSlug : await generateUniqueRecipeSlug(title);

  try {
    const imageUrl = await handleImageUpload(image);

    await (prisma as PrismaClient).recipe.create({
      data: {
        title,
        slug,
        description: description ?? "",
        ingredients,
        instructions,
        prepTime,
        cookTime,
        servings: servings ?? null, // Pass string or null
        category: category ?? null,
        imageUrl,
        published,
        // authorId: session.userId, 
      },
    });

    revalidatePath("/admin/recipes");
    revalidatePath("/admin");
    revalidatePath("/blog/recipes");
    revalidatePath("/"); // Revalidate home page for sitemap or featured recipes

  } catch (e) {
    const error = e as Prisma.PrismaClientKnownRequestError;
    if (error.code === "P2002" && error.meta?.target) {
      const target = error.meta.target;
      let isSlugError = false;
      if (typeof target === 'string') {
        isSlugError = target.includes("slug");
      } else if (Array.isArray(target)) {
        isSlugError = target.includes("slug");
      }
      if (isSlugError) {
        return {
          errors: { slug: ["This slug is already in use. Please choose another."] },
          message: "Failed to create recipe due to slug conflict.",
        };
      }
    }
    console.error("Create Recipe DB Error:", e);
    return { message: "Database Error: Failed to Create Recipe." };
  }
  redirect("/admin/recipes");
}


// --- UPDATE RECIPE ACTION ---
export async function updateRecipe(
  prevState: State | undefined,
  formData: FormData
): Promise<State> {
  const session = await getAdminSession();
  if (!session?.isLoggedIn) {
    return { message: "Authentication required.", status: 401 };
  }

  const id = formData.get("id") as string;
  if (!id) {
    return { message: "Recipe ID is required for update.", status: 400 };
  }

  const rawServings = formData.get("servings");
  // If servings is an empty string, treat as undefined for Zod's optional validation
  const servingsForValidation = rawServings === "" || rawServings === null ? undefined : rawServings;

  const validatedFields = RecipeSchema.safeParse({
    id: id,
    title: formData.get("title"),
    slug: formData.get("slug") || null,
    description: formData.get("description"),
    ingredients: formData.get("ingredients"),
    instructions: formData.get("instructions"),
    prepTime: formData.get("prepTime"),
    cookTime: formData.get("cookTime"),
    servings: servingsForValidation, // Pass string or undefined to Zod
    category: formData.get("category"),
    image: formData.get("image"), 
    published: formData.get("published") === "on",
  });

  if (!validatedFields.success) {
    console.error("Update Recipe Validation Errors:", validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Failed to update recipe. Please check the fields.",
    };
  }

  const { title, slug: inputSlug, description, ingredients, instructions, prepTime, cookTime, servings, category, /* cuisine, */ image, published } = validatedFields.data;
  // 'servings' from Zod is string | null | undefined
  // 'notes' from Zod was removed
  // 'cuisine' from Zod was removed

  const currentRecipe = await (prisma as PrismaClient).recipe.findUnique({ where: { id } });
  if (!currentRecipe) {
    return { message: "Recipe not found." };
  }

  let slugToUse = currentRecipe.slug;
  if (inputSlug && inputSlug.trim() !== "" && inputSlug !== currentRecipe.slug) {
    slugToUse = await generateUniqueRecipeSlug(inputSlug, id);
  } else if (title !== currentRecipe.title && (!inputSlug || inputSlug.trim() === "")) {
    slugToUse = await generateUniqueRecipeSlug(title, id);
  }

  try {
    const imageUrl = await handleImageUpload(image, currentRecipe.imageUrl);
    
    const updateData: Prisma.RecipeUpdateInput = {
        title,
        slug: slugToUse,
        description: description ?? undefined, // Use undefined if Zod resulted in undefined
        ingredients,
        instructions,
        prepTime: prepTime ?? undefined,
        cookTime: cookTime ?? undefined,
        servings: servings ?? null, // Pass string or null
        // notes: notes ?? undefined, // Removed notes
        category: category ?? undefined,
        // cuisine: cuisine ?? undefined, // Removed cuisine
        published,
        updatedAt: new Date(),
    };

    if (imageUrl !== undefined) { 
        updateData.imageUrl = imageUrl;
    }
    
    await (prisma as PrismaClient).recipe.update({
      where: { id },
      data: updateData,
    });
  } catch (e: any) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
      const target = e.meta?.target as string[] | string | undefined;
      let isSlugError = false;
      if (typeof target === 'string') {
        isSlugError = target.includes("slug");
      } else if (Array.isArray(target)) {
        isSlugError = target.includes("slug");
      }
      if (isSlugError) {
        return {
          errors: { slug: ["This slug is already in use. Please choose another."] },
          message: "Failed to update recipe due to slug conflict.",
        };
      }
    }
    console.error("Update Recipe DB Error:", e);
    return { message: "Database Error: Failed to Update Recipe." };
  }

  revalidatePath("/admin/recipes"); // Revalidate the admin recipes list
  revalidatePath("/admin"); // Revalidate the main admin dashboard
  revalidatePath(`/blog/recipes/${slugToUse}`); // Correct path for individual recipe
  revalidatePath("/"); // Revalidate home page for sitemap or featured recipes
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

    const existingRecipe = await (prisma as PrismaClient).recipe.findUnique({
      where: { id },
      select: { id: true, imageUrl: true, slug: true }, // Select imageUrl and slug
    });

    if (!existingRecipe) {
      return { message: "Recipe not found.", status: 404 };
    }

    // Delete image from Vercel Blob if it exists
    if (existingRecipe.imageUrl) {
      try {
        await del(existingRecipe.imageUrl);
      } catch (blobError: unknown) {
        console.error(`Failed to delete recipe image ${existingRecipe.imageUrl} from Vercel Blob:`, blobError);
      }
    }

    await (prisma as PrismaClient).recipe.delete({
      where: { id },
    });

    revalidatePath("/admin");
    revalidatePath("/admin/recipes"); // Assuming an admin page for recipes
    revalidatePath("/recipes");
    if (existingRecipe.slug) {
      revalidatePath(`/recipes/${existingRecipe.slug}`);
    }
    revalidatePath("/");
    return { message: "Recipe deleted successfully.", status: 200 };
  } catch (error: unknown) {
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
    const updatedRecipe = await (prisma as PrismaClient).recipe.update({
      where: { id },
      data: { published: !currentStatus },
      select: { slug: true } // Select slug for revalidation
    });
    revalidatePath("/admin");
    revalidatePath("/admin/recipes");
    revalidatePath("/recipes");
    if (updatedRecipe.slug) {
      revalidatePath(`/recipes/${updatedRecipe.slug}`);
    }
    revalidatePath("/");
    return { message: `Recipe ${!currentStatus ? "published" : "unpublished"} successfully.`, status: 200 };
  } catch (error) {
    return {
      message: "Failed to toggle recipe publish status.",
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

// --- NEWSLETTER ACTIONS ---

// Validation Schema for Newsletter Issue ID
const NewsletterIssueIdSchema = z.object({
  id: z.string().min(1, { message: "Newsletter Issue ID is required." }),
});

// --- DELETE NEWSLETTER ISSUE ACTION ---
export async function deleteNewsletterIssue(id: string): Promise<State> {
  if (!id) {
    return {
      message: "Newsletter Issue ID is required for deletion.",
      status: 400,
      errors: {},
    };
  }

  const validatedFields = NewsletterIssueIdSchema.safeParse({ id });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Invalid Newsletter Issue ID.",
      status: 400,
    };
  }

  const session = await getAdminSession();
  if (!session?.isLoggedIn) {
    return {
      message: "Authentication required.",
      status: 401,
      errors: {},
    };
  }

  try {
    const existingIssue = await (prisma as PrismaClient).newsletterIssue.findUnique({
      where: { id },
      select: { id: true, newsletterImage: true }, // Select newsletterImage to delete from blob storage
    });

    if (!existingIssue) {
      return { message: "Newsletter Issue not found.", status: 404 };
    }

    // Delete image from Vercel Blob if it exists
    if (existingIssue.newsletterImage) {
      try {
        await del(existingIssue.newsletterImage);
      } catch (blobError: unknown) {
        console.error(`Failed to delete newsletter image ${existingIssue.newsletterImage} from Vercel Blob:`, blobError);
        // Optionally, decide if this should prevent deletion or just be logged
      }
    }

    await (prisma as PrismaClient).newsletterIssue.delete({
      where: { id },
    });

    revalidatePath("/admin"); // Revalidate the admin dashboard where newsletters are listed
    return { message: "Newsletter Issue deleted successfully.", status: 200 };

  } catch (error: unknown) {
    if (error instanceof Object && 'code' in error && typeof error.code === 'string' && error.code === "P2025") {
      return {
        message: "Newsletter Issue not found or already deleted.",
        status: 404,
        errors: {},
      };
    }
    console.error("Error deleting newsletter issue:", error); // Added for more detailed server-side logging
    return {
      message: "Failed to delete newsletter issue due to a server error. Please try again.",
      status: 500,
      errors: {},
    };
  }
}

// --- CREATE NEWSLETTER ISSUE ACTION ---
const NewsletterIssueSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(3, { message: "Title must be at least 3 characters." }),
  content: z.string().min(10, { message: "Content must be at least 10 characters." }),
  status: z.nativeEnum(NewsletterStatus).default(NewsletterStatus.DRAFT),
  scheduledAt: z.string().nullable().optional(), // Changed to string, will parse to Date
  // Image validation
  image: z
    .any()
    .optional()
    .refine(
      (file) => {
        const looksLikeFile = isFileLike(file);
        const isImage = looksLikeFile && file.type.startsWith("image/");
        return !file || (looksLikeFile && file.size === 0) || isImage; // Allow empty file (no change) or image
      },
      "Only images are allowed."
    )
    .refine(
        (file) => {
            const looksLikeFile = isFileLike(file);
            return !file || looksLikeFile; // Ensure it's a file-like object if provided
        },
        "Please upload a valid file."
    )
    .transform((file) => file as File | undefined), // Cast to File | undefined
});

// Helper function to handle image upload for newsletter issues
async function handleNewsletterImageUpload(
  imageFile: File | undefined,
  existingImageUrl?: string | null
): Promise<string | null | undefined> {
  if (imageFile && imageFile.size > 0) {
    // If a new image is uploaded, delete the old one if it exists
    if (existingImageUrl) {
      try {
        await del(existingImageUrl);
      } catch (delError) {
        console.error("Failed to delete existing newsletter image:", delError);
        // Continue even if deletion fails, to upload the new image
      }
    }
    // Upload the new image
    const blob = await put(imageFile.name, imageFile, {
      access: "public",
      contentType: imageFile.type,
    });
    return blob.url;
  } else if (imageFile === undefined && existingImageUrl) {
    // No new image provided, keep the existing one
    return existingImageUrl;
  } else if (imageFile === null) {
    // Image explicitly set to be removed
    if (existingImageUrl) {
      try {
        await del(existingImageUrl);
      } catch (delError) {
        console.error("Failed to delete existing newsletter image:", delError);
      }
    }
    return null; // Set image URL to null
  }
  // No new image, and no existing image, or imageFile is an empty File object (no change)
  return existingImageUrl; // or undefined if you prefer to clear it if no file is passed
}


export async function createNewsletterIssue(
  prevState: State | undefined,
  formData: FormData
): Promise<State> {
  const session = await getAdminSession();
  if (!session?.isLoggedIn) {
    return { message: "Authentication required.", status: 401 };
  }

  console.log("Received title for validation:", formData.get("title")); // Added for debugging
  const validatedFields = NewsletterIssueSchema.safeParse({
    title: formData.get("title") || "", // Ensure title is not null
    content: formData.get("content"),
    status: formData.get("status") || NewsletterStatus.DRAFT,
    scheduledAt: formData.get("scheduledAt") || null,
    image: formData.get("image"),
  });

  if (!validatedFields.success) {
    console.error("Newsletter Validation Errors:", validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Failed to create newsletter issue. Please check the fields.",
    };
  }

  const { title, content, status, scheduledAt, image } = validatedFields.data;

  try {
    const newNewsletterImage = await handleNewsletterImageUpload(image);

    await (prisma as PrismaClient).newsletterIssue.create({
      data: {
        title,
        content,
        status,
        scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
        newsletterImage: newNewsletterImage, // Changed from imageUrl to newsletterImage
        // sentAt will be set when the newsletter is actually sent
      },
    });

    revalidatePath("/admin/newsletter");
    // Potentially revalidate other paths if newsletters are displayed publicly

  } catch (e) {
    console.error("Create Newsletter Issue Error:", e);
    return { message: "Database Error: Failed to Create Newsletter Issue." };
  }
  redirect("/admin/newsletter");
}

// --- UPDATE NEWSLETTER ISSUE ACTION ---
export async function updateNewsletterIssue(
  prevState: State | undefined,
  formData: FormData
): Promise<State> {
  const session = await getAdminSession();
  if (!session?.isLoggedIn) {
    return { message: "Authentication required.", status: 401 };
  }

  const id = formData.get("id") as string;
  if (!id) {
    return { message: "Newsletter Issue ID is required for update.", status: 400 };
  }

  const validatedFields = NewsletterIssueSchema.safeParse({
    id: id,
    title: formData.get("title") || "", // Ensure title is not null
    content: formData.get("content"),
    status: formData.get("status") || undefined, // Or handle default based on current status
    scheduledAt: formData.get("scheduledAt") || null,
    image: formData.get("image"),
  });

  if (!validatedFields.success) {
    console.error("Update Newsletter Validation Errors:", validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Failed to update newsletter issue. Please check the fields.",
    };
  }

  const { title, content, status, scheduledAt, image } = validatedFields.data;

  const currentIssue = await (prisma as PrismaClient).newsletterIssue.findUnique({ where: { id } });
  if (!currentIssue) {
    return { message: "Newsletter Issue not found." };
  }

  try {
    const newNewsletterImage = await handleNewsletterImageUpload(image, currentIssue.newsletterImage);

    const updateData: Prisma.NewsletterIssueUpdateInput = {
      title,
      content,
      status,
      scheduledAt: scheduledAt ? new Date(scheduledAt) : (scheduledAt === null ? null : undefined), // Handle explicit null vs undefined
      updatedAt: new Date(),
    };

    if (newNewsletterImage !== undefined) { // if handleNewsletterImageUpload decided on a change
        updateData.newsletterImage = newNewsletterImage;
    }

    await (prisma as PrismaClient).newsletterIssue.update({
      where: { id },
      data: updateData,
    });

    revalidatePath("/admin/newsletter");
    revalidatePath(`/admin/newsletter/edit/${id}`);

  } catch (e) {
    console.error("Update Newsletter Issue Error:", e);
    return { message: "Database Error: Failed to Update Newsletter Issue." };
  }
  redirect("/admin/newsletter");
}

// --- SEND NEWSLETTER ACTION ---
export async function sendNewsletter(issueId: string): Promise<State> {
  const session = await getAdminSession();
  if (!session?.isLoggedIn) {
    return { message: "Authentication required.", status: 401 };
  }

  if (!issueId) {
    return { message: "Newsletter Issue ID is required.", status: 400 };
  }

  try {
    const issue = await (prisma as PrismaClient).newsletterIssue.findUnique({
      where: { id: issueId },
    });

    if (!issue) {
      return { message: "Newsletter issue not found.", status: 404 };
    }

    if (issue.status === NewsletterStatus.SENT) {
      return { message: "This newsletter has already been sent.", status: 400 };
    }
    
    // Allow sending DRAFT or READY_TO_SEND.
    // The sendWeeklyNewsletter function in email.ts will also need to be consistent with this status handling.
    if (issue.status !== NewsletterStatus.READY_TO_SEND && issue.status !== NewsletterStatus.DRAFT) {
         return { message: "Newsletter is not ready to be sent or has an invalid status.", status: 400 };
    }

    // Call sendWeeklyNewsletter with only the issueId.
    // sendWeeklyNewsletter handles fetching subscribers, sending emails, and its own status updates.
    const emailResult = await sendWeeklyNewsletter(issueId);

    if (!emailResult.success) {
      // If sendWeeklyNewsletter itself indicates failure.
      // The status of the issue might not have been updated to SENT by email.ts.
      // Return the error message from emailResult.
      return { message: emailResult.error || "Failed to send newsletter. Check email service logs.", status: 500 };
    }

    // If emailResult.success is true, sendWeeklyNewsletter should have handled the sending
    // and updated the status to SENT.
    // This action will ensure the status is definitively SENT and revalidate the path.
    await (prisma as PrismaClient).newsletterIssue.update({
        where: { id: issueId },
        data: { status: NewsletterStatus.SENT, sentAt: new Date() }, // Ensure it's marked SENT
    });

    revalidatePath("/admin");
    // Use message from emailResult if available (e.g., "No subscribers..." or specific success message)
    return { message: emailResult.message || "Newsletter sent successfully.", status: 200 };

  } catch (error) {
    console.error("Error in sendNewsletter action:", error);
    // This catch block is for unexpected errors within this action itself,
    // not for controlled failures reported by sendWeeklyNewsletter.
    return { message: "Failed to send newsletter due to an unexpected server error.", status: 500 };
  }
}

// --- SUBSCRIBE TO NEWSLETTER ACTION ---
const SubscribeSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
});

export async function subscribeToNewsletter(
  prevState: State | undefined,
  formData: FormData
): Promise<State> {
  const validatedFields = SubscribeSchema.safeParse({
    email: formData.get("email"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Failed to subscribe. Please check your email address.",
    };
  }

  const { email } = validatedFields.data;

  try {
    // Corrected: Use newsletterSubscription instead of newsletterSubscriber
    const existingSubscriber = await (prisma as PrismaClient).newsletterSubscription.findUnique({
      where: { email },
    });

    if (existingSubscriber) {
      if (existingSubscriber.subscribed) {
        return { message: "You are already subscribed to the newsletter." };
      } else {
        // Resubscribe if previously unsubscribed
        // Corrected: Use newsletterSubscription instead of newsletterSubscriber
        await (prisma as PrismaClient).newsletterSubscription.update({
          where: { email },
          data: { subscribed: true, updatedAt: new Date() },
        });
        // Optionally send a welcome back email
        return { message: "You have been resubscribed to the newsletter!", status: 200 };
      }
    }

    // Create new subscriber
    // Corrected: Use newsletterSubscription instead of newsletterSubscriber
    await (prisma as PrismaClient).newsletterSubscription.create({
      data: {
        email,
        subscribed: true,
      },
    });

    // Send welcome email
    // Note: sendWelcomeEmail signature might need adjustment if it causes type errors.
    // This was an existing issue and will be addressed if it blocks current changes.
    await sendWelcomeEmail(email, "Welcome to the Newsletter!"); // Added a subject line as per typical usage

    return { message: "Successfully subscribed! Please check your email for a welcome message.", status: 200 };
  } catch (error) {
    console.error("Subscription error:", error);
    // Check for unique constraint violation (though findUnique should handle it)
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        // This case should ideally be caught by the existingSubscriber check,
        // but as a fallback:
        return { message: "This email is already registered. You might already be subscribed or try resubscribing." };
    }
    return { message: "An error occurred during subscription. Please try again later." };
  }
}


// --- UNSUBSCRIBE FROM NEWSLETTER ACTION ---
// For now, unsubscription might be handled via a link in the email
// or a separate page. If direct action is needed:
export async function unsubscribeFromNewsletter(token: string): Promise<State> {
  // This is a placeholder. Proper unsubscription would involve:
  // 1. Verifying the token (e.g., JWT or a unique one-time token).
  // 2. Finding the subscriber by the token or email derived from the token.
  // 3. Updating their 'subscribed' status to false.

  if (!token) { // Basic check
    return { message: "Invalid unsubscribe link.", status: 400 };
  }

  try {
    // Example: Find subscriber by a simple token (in reality, use a secure method)
    // This assumes you have a field like `unsubscribeToken` on your subscriber model
    // For this example, let's assume the token IS the email for simplicity,
    // but THIS IS NOT SECURE FOR PRODUCTION.
    const email = decodeURIComponent(token); // Simplistic token decoding

    // Corrected: Use newsletterSubscription instead of newsletterSubscriber
    const subscriber = await (prisma as PrismaClient).newsletterSubscription.findUnique({
      where: { email: email },
    });

    if (!subscriber) {
      return { message: "Subscriber not found.", status: 404 };
    }

    if (!subscriber.subscribed) {
      return { message: "You are already unsubscribed.", status: 200 };
    }

    // Corrected: Use newsletterSubscription instead of newsletterSubscriber
    // Also, Prisma does not have an `unsubscribedAt` field by default unless added to the schema.
    // Assuming `updatedAt` is sufficient for now.
    await (prisma as PrismaClient).newsletterSubscription.update({
      where: { email: email },
      data: { subscribed: false, updatedAt: new Date() }, // Removed unsubscribedAt unless it's in your schema
    });

    revalidatePath("/admin/subscribers"); // If you have a page listing subscribers
    return { message: "Successfully unsubscribed.", status: 200 };

  } catch (error) {
    console.error("Unsubscription error:", error);
    return { message: "Failed to unsubscribe. Please try again later.", status: 500 };
  }
}


// General state type for form actions
export type State = {
  errors?: {
    title?: string[];
    slug?: string[];
    description?: string[];
    content?: string[]; // Keep for Post, Newsletter
    category?: string[];
    image?: string[];
    published?: string[];
    password?: string[];
    email?: string[];
    status?: string[]; // For NewsletterIssue
    scheduledAt?: string[]; // For NewsletterIssue
    id?: string[];
    // Recipe specific fields
    ingredients?: string[];
    instructions?: string[];
    prepTime?: string[];
    cookTime?: string[];
    servings?: string[];
    cuisine?: string[];
  };
  message?: string | null;
  status?: number; // Optional status code
};

// Helper function to handle image uploads (generic for Post, could be adapted)
async function handleImageUpload(
  imageFile: File | undefined,
  existingImageUrl?: string | null
): Promise<string | null | undefined> {
  if (imageFile && imageFile.size > 0) {
    // If a new image is uploaded, delete the old one if it exists
    if (existingImageUrl) {
      try {
        await del(existingImageUrl);
      } catch (delError) {
        console.error("Failed to delete existing image:", delError);
        // Continue even if deletion fails, to upload the new image
      }
    }
    // Upload the new image
    const blob = await put(imageFile.name, imageFile, {
      access: "public",
      contentType: imageFile.type,
    });
    return blob.url;
  } else if (imageFile === undefined && existingImageUrl) {
    // No new image provided, keep the existing one
    return existingImageUrl;
  } else if (imageFile === null) {
    // Image explicitly set to be removed (e.g., by a checkbox in the form)
    if (existingImageUrl) {
      try {
        await del(existingImageUrl);
      } catch (delError) {
        console.error("Failed to delete existing image:", delError);
      }
    }
    return null; // Set image URL to null
  }
  // No new image, and no existing image, or imageFile is an empty File object (no change)
  return existingImageUrl; // or undefined if you prefer to clear it if no file is passed
}