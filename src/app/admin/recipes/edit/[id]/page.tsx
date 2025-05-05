// filepath: /Users/sparshsaini/Documents/Ally-Blog-Website/ally-blog/src/app/admin/recipes/edit/[id]/page.tsx
import React from "react";
import prisma from "@/app/lib/prisma";
import { notFound } from "next/navigation";
import EditRecipeFormClient from "./EditRecipeForm.client"; // Import the client component

// Fetch the specific recipe by ID
async function getRecipe(id: string) {
  try {
    const recipe = await prisma.recipe.findUnique({
      where: { id },
    });
    return recipe;
  } catch (error) {
    console.error("Failed to fetch recipe:", error);
    return null;
  }
}

interface EditRecipePageProps {
  params: { id: string };
}

export default async function EditRecipePage({ params }: EditRecipePageProps) {
  // Destructure id directly from params
  const { id } = params;
  const recipe = await getRecipe(id); // Use the destructured id

  if (!recipe) {
    notFound(); // Show 404 if recipe doesn't exist
  }

  return (
    // Adjust container styles here - use max-w-4xl for consistency
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Pass the fetched recipe data to the client component */}
      <EditRecipeFormClient recipe={recipe} />
    </div>
  );
}
