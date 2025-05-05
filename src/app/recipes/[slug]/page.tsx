import React from "react";
import { notFound } from "next/navigation";
import prisma from "@/app/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { getAdminSession } from "@/app/lib/auth";
import type { Recipe } from "@/generated/prisma/client"; // Updated import path

// Function to fetch a single recipe by its slug, considering admin status
async function getRecipeBySlug(slug: string): Promise<Recipe | null> {
  console.log(
    `[getRecipeBySlug] Attempting to fetch recipe with slug: '${slug}' (Type: ${typeof slug})`
  );
  if (!slug || typeof slug !== "string" || slug.trim() === "") {
    console.error(
      `[getRecipeBySlug] Invalid slug detected: '${slug}'. Aborting fetch.`
    );
    return null;
  }

  // Check if the user is an admin
  const session = await getAdminSession();
  const isAdmin = session?.isLoggedIn === true;

  try {
    const whereClause: { slug: string; published?: boolean } = {
      slug: slug.trim(), // Use trimmed slug
    };

    // Only filter by published: true if the user is NOT an admin
    if (!isAdmin) {
      whereClause.published = true;
    }

    console.log(`[getRecipeBySlug] Fetching with where clause:`, whereClause);

    const recipe = await prisma.recipe.findUnique({
      where: whereClause,
    });

    if (!recipe) {
      console.log(
        `[getRecipeBySlug] Recipe with slug '${slug}' ${
          isAdmin ? "not found" : "not found or not published"
        }.`
      );
    } else {
      console.log(
        `[getRecipeBySlug] Successfully fetched recipe with slug '${slug}'. Published status: ${recipe.published}, Admin: ${isAdmin}`
      );
    }
    return recipe;
  } catch (error) {
    console.error(
      `[getRecipeBySlug] Prisma error fetching slug '${slug}':`,
      error
    );
    return null;
  }
}

interface RecipePageProps {
  params: {
    slug: string;
  };
}

// Generate Metadata for SEO
export async function generateMetadata({
  params,
}: RecipePageProps): Promise<Metadata> {
  const slug = params.slug;
  console.log(`[generateMetadata - Recipe] Received slug: '${slug}'`);
  if (!slug || typeof slug !== "string" || slug.trim() === "") {
    console.error(
      `[generateMetadata - Recipe] Invalid slug received: '${slug}'. Returning default metadata.`
    );
    return { title: "Recipe Not Found" };
  }
  const recipe = await getRecipeBySlug(slug);

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
    const recipes = await prisma.recipe.findMany({
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
const RecipePage: React.FC<RecipePageProps> = async ({ params }) => {
  const slug = params.slug;
  console.log(`[RecipePage] Rendering page for slug: '${slug}'`);
  if (!slug || typeof slug !== "string" || slug.trim() === "") {
    console.error(
      `[RecipePage] Invalid slug received in params: '${slug}'. Triggering notFound.`
    );
    notFound();
  }

  const recipe = await getRecipeBySlug(slug.trim());
  const session = await getAdminSession();
  const isAdmin = session?.isLoggedIn === true;

  if (!recipe) {
    console.log(
      `[RecipePage] Recipe not found for slug '${slug}'. Triggering notFound.`
    );
    notFound();
  }

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
      {!recipe.published && isAdmin && (
        <div className="mb-6 p-4 bg-yellow-100 border border-yellow-300 text-yellow-800 rounded-md text-center">
          <strong>Draft Preview:</strong> This recipe is not published and is
          only visible to administrators.
        </div>
      )}
      <div className="mb-8">
        <Link
          href="/recipes" // Link back to the main recipes page
          className="text-indigo-600 hover:text-indigo-800 hover:underline"
        >
          &larr; Back to Recipes
        </Link>
      </div>
      {/* Card Container */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden p-6 md:p-8">
        {" "}
        {/* Added card styling */}
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
