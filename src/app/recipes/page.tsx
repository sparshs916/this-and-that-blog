import React from "react";
import Link from "next/link";
import Image from "next/image";
import prisma from "@/app/lib/prisma";
import type { Recipe } from "@prisma/client";

// Fetch published recipes
async function getPublishedRecipes() {
  try {
    const recipes = await prisma.recipe.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
    });
    return recipes;
  } catch (error) {
    console.error("Failed to fetch published recipes:", error);
    return [];
  }
}

// Recipe Card Component (similar to PostCard)
function RecipeCard({ recipe }: { recipe: Recipe }) {
  // Format date similar to the single recipe page
  const formattedDate = new Date(recipe.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    // Removed h-full to allow cards to size based on content
    <article className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-lg flex flex-col">
      <Link
        href={`/recipes/${recipe.slug}`}
        className="group flex flex-col flex-grow" // flex-grow remains on the link to make it fill the article
      >
        {recipe.imageUrl && (
          <div className="relative h-48 w-full">
            <Image
              src={recipe.imageUrl}
              alt={`Image for ${recipe.title}`}
              fill={true} // Use fill prop instead of layout
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Add sizes prop for optimization
              className="object-cover transition-transform duration-300 group-hover:scale-105" // Use object-cover class
            />
          </div>
        )}
        {/* Removed flex-grow from this div, let content determine height */}
        <div className="p-6 flex flex-col">
          <h2 className="text-xl font-semibold mb-2 group-hover:text-indigo-600 transition-colors duration-300 text-black">
            {recipe.title}
          </h2>
          {/* Updated time/servings display format - Removed 'Published:' label */}
          <div className="text-xs text-gray-600 mb-3 space-y-1"> {/* Use space-y for vertical spacing */}
            <div>
              <time dateTime={recipe.createdAt.toISOString()}>
                {formattedDate}
              </time>
            </div>
            {recipe.prepTime && (
              <div>
                <span className="font-semibold">Prep time:</span> {recipe.prepTime}
              </div>
            )}
            {recipe.cookTime && (
              <div>
                <span className="font-semibold">Cook time:</span> {recipe.cookTime}
              </div>
            )}
            {recipe.servings && (
              <div>
                <span className="font-semibold">Servings:</span> {recipe.servings}
              </div>
            )}
          </div>
          {/* Added flex-grow to push the link down */}
          <div className="flex-grow"></div>
          <span className="text-indigo-500 hover:text-indigo-700 font-medium text-sm mt-auto self-start">
            View Recipe &rarr;
          </span> {/* Correctly close span tag, removed extra space */}
        </div>
      </Link>
    </article>
  );
}

export default async function RecipesPage() {
  const recipes = await getPublishedRecipes();

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Added text-black */}
      <h1 className="text-4xl font-bold mb-10 text-center text-black">
        Recipes
      </h1>
      {recipes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No recipes published yet.</p>
      )}
    </div>
  );
}
