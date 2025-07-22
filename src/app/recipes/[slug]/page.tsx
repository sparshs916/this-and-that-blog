import React from "react";
import { notFound } from "next/navigation";
import prisma from "@/app/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { getAdminSession } from "@/app/lib/auth";
import type { Recipe } from "@/generated/prisma/client"; // Updated import path

// Import PrismaClient for casting
import { PrismaClient } from "@/generated/prisma/client";

export const dynamic = "force-dynamic";

// Function to fetch a single recipe by its slug, considering admin status
async function getRecipeBySlug(slug: string): Promise<Recipe | null> {
  console.log(
    `[getRecipeBySlug] Attempting to fetch recipe with slug: '${slug}'`
  );
  if (!slug || typeof slug !== "string" || slug.trim() === "") {
    console.error(
      `[getRecipeBySlug] Invalid slug detected: '${slug}'. Aborting fetch.`
    );
    return null;
  }

  // 1. Static-first query: Try to find a published recipe.
  // This is safe for static generation.
  const publishedRecipe = await (prisma as PrismaClient).recipe.findUnique({
    where: { slug: slug.trim(), published: true },
  });

  if (publishedRecipe) {
    console.log(
      `[getRecipeBySlug] Found published recipe with slug '${slug}'.`
    );
    return publishedRecipe;
  }

  // 2. Dynamic fallback for admins: If no published recipe is found,
  // check for an admin session and look for any recipe (including drafts).
  // This part is dynamic and will only run at request time if needed.
  console.log(
    `[getRecipeBySlug] No published recipe found. Checking for admin session to find draft.`
  );
  const session = await getAdminSession();
  console.log(`[getRecipeBySlug] Admin session:`, {
    isLoggedIn: session?.isLoggedIn,
  });

  if (session?.isLoggedIn) {
    console.log(
      "[getRecipeBySlug] Admin session found. Querying for any recipe (including drafts)."
    );
    // Try to find ANY recipe with this slug, regardless of published status
    const draftRecipe = await (prisma as PrismaClient).recipe.findUnique({
      where: { slug: slug.trim() },
    });
    if (draftRecipe) {
      console.log(
        `[getRecipeBySlug] Found draft recipe for admin. Published status: ${draftRecipe.published}`
      );
    } else {
      console.log(
        `[getRecipeBySlug] No recipe found with slug: ${slug}, even for admin. This might be a real 404.`
      );
    }
    return draftRecipe;
  }

  console.log(
    `[getRecipeBySlug] No published recipe found and no admin session.`
  );
  return null;
}

type RecipePageProps = {
  params: Promise<{ slug: string }>;
};

// Generate Metadata for SEO
export async function generateMetadata(
  props: RecipePageProps
): Promise<Metadata> {
  const params = await props.params;
  const { slug } = params;
  console.log(`[generateMetadata - Recipe] Received slug: '${slug}'`);
  if (!slug || typeof slug !== "string" || slug.trim() === "") {
    console.error(
      `[generateMetadata - Recipe] Invalid slug received: '${slug}'. Returning default metadata.`
    );
    return { title: "Recipe Not Found" };
  }
  // Fetch only published recipe for metadata generation to keep it static
  const recipe = await (prisma as PrismaClient).recipe.findUnique({
    where: { slug: slug.trim(), published: true },
  });

  if (!recipe) {
    return {
      title: "Recipe Not Found",
    };
  }

  // Create a plain text description excerpt
  const descriptionText = recipe.description?.replace(/<[^>]+>/g, "") || "";

  return {
    title: recipe.title,
    description: descriptionText.substring(0, 160),
    openGraph: {
      title: recipe.title,
      description: descriptionText.substring(0, 160),
      images: recipe.imageUrl ? [{ url: recipe.imageUrl }] : [],
    },
  };
}

// Generate Static Paths
export async function generateStaticParams() {
  console.log("[generateStaticParams - Recipe] Starting generation...");
  try {
    const recipes = await (prisma as PrismaClient).recipe.findMany({
      where: { published: true },
      select: { slug: true },
    });
    console.log(
      `[generateStaticParams - Recipe] Fetched ${recipes.length} potential slugs.`
    );
    const validSlugs = recipes
      .filter((recipe: { slug: string | null }) => {
        const isValid =
          recipe &&
          typeof recipe.slug === "string" &&
          recipe.slug.trim().length > 0;
        if (!isValid) {
          console.warn(
            `[generateStaticParams - Recipe] Filtering out invalid slug:`,
            recipe?.slug
          );
        }
        return isValid;
      })
      .map((recipe: { slug: string }) => ({
        slug: recipe.slug.trim(),
      }));
    console.log(
      `[generateStaticParams - Recipe] Generated ${validSlugs.length} valid static params:`,
      validSlugs
    );
    return validSlugs;
  } catch (error) {
    console.error(
      "[generateStaticParams - Recipe] Error fetching slugs:",
      error
    );
    return [];
  }
}

// The Page Component
const RecipePage = async (props: RecipePageProps) => {
  const params = await props.params;
  const { slug } = params;
  console.log(`[RecipePage] Rendering page for slug: '${slug}'`);
  if (!slug || typeof slug !== "string" || slug.trim() === "") {
    console.error(
      `[RecipePage] Invalid slug received in params: '${slug}'. Triggering notFound.`
    );
    notFound();
  }

  // Check admin session first, to avoid duplicate checks
  const session = await getAdminSession();
  const isAdmin = session?.isLoggedIn === true;
  console.log(`[RecipePage] Admin session check:`, { isAdmin });

  const recipe = await getRecipeBySlug(slug.trim());

  // If no recipe is found (neither published nor a draft for an admin), return 404.
  if (!recipe) {
    console.log(
      `[RecipePage] Recipe not found for slug '${slug}'. Triggering notFound.`
    );
    notFound();
  }

  // If the recipe is a draft, only admins can view it
  if (!recipe.published && !isAdmin) {
    console.log(
      `[RecipePage] Non-admin attempting to view unpublished recipe '${slug}'. Triggering notFound.`
    );
    notFound();
  }

  const formattedDate = new Date(recipe.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      {" "}
      {/* Adjusted max-width */}
      {/* Draft Banner for Admins */}
      {!recipe.published && (
        <div className="mb-6 p-4 bg-yellow-100 border border-yellow-300 text-yellow-800 rounded-md text-center">
          <strong>Draft Preview:</strong> This recipe is not published and is
          only visible to administrators.
        </div>
      )}
      <div className="mb-8">
        <Link
          href="/recipes" // Link back to the main recipes page
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300 text-sm"
        >
          &larr; Back to Recipes
        </Link>
      </div>
      {/* Card Container */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden p-6 md:p-8">
        {" "}
        {/* Use prose for overall styling */}
        <article className="prose prose-lg lg:prose-xl max-w-none text-gray-800">
          {" "}
          {/* Moved text-gray-800 here */}
          {/* Recipe Header */}
          <header className="mb-8 border-b border-gray-200 pb-6">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
              {recipe.title}
            </h1>
            {/* Updated time/servings display - Removed 'Published:' label */}
            <div className="text-sm text-gray-600 space-y-1">
              <div>
                <time dateTime={recipe.createdAt.toISOString()}>
                  {formattedDate}
                </time>
              </div>
              {recipe.prepTime && (
                <div>
                  <span className="font-semibold">Prep time:</span>{" "}
                  {recipe.prepTime}
                </div>
              )}
              {recipe.cookTime && (
                <div>
                  <span className="font-semibold">Cook time:</span>{" "}
                  {recipe.cookTime}
                </div>
              )}
              {recipe.servings && (
                <div>
                  <span className="font-semibold">Servings:</span>{" "}
                  {recipe.servings}
                </div>
              )}
            </div>
          </header>
          {/* Optional Featured Image - Adjusted size and centering */}
          {recipe.imageUrl && (
            <div className="mb-8 flex justify-center">
              {" "}
              {/* Center the image container */}
              <div className="relative w-full max-w-lg">
                {" "}
                {/* Limit max width and keep responsive */}
                <Image
                  src={recipe.imageUrl}
                  alt={`Featured image for ${recipe.title}`}
                  width={768} // Example width, adjust as needed
                  height={432} // Example height, adjust for aspect ratio
                  className="w-full h-auto object-contain rounded-lg" // Use object-contain, add rounded corners
                  priority
                />
              </div>
            </div>
          )}
          {/* Description */}
          {recipe.description && (
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Description</h2>
              {/* Render HTML content */}
              <div dangerouslySetInnerHTML={{ __html: recipe.description }} />
            </section>
          )}
          {/* Ingredients */}
          {recipe.ingredients && (
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
              {/* Render HTML content */}
              <div dangerouslySetInnerHTML={{ __html: recipe.ingredients }} />
            </section>
          )}
          {/* Instructions */}
          {recipe.instructions && (
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
              {/* Render HTML content */}
              <div dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
            </section>
          )}
        </article>{" "}
        {/* Ensure article tag is closed */}
      </div>{" "}
      {/* Ensure Card Container div is closed */}
    </div> // Ensure main container div is closed
  );
};

export default RecipePage;
