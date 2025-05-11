// filepath: /Users/sparshsaini/Documents/Ally-Blog-Website/ally-blog/src/app/admin/recipes/edit/[id]/page.tsx
import React from "react";
import prisma from "@/app/lib/prisma";
import EditRecipeFormClient from "./EditRecipeForm.client";
import type { Recipe } from "@/generated/prisma/client"; // Updated import path
// Import the server action for getting recipe categories
import { getRecipeCategories } from "@/app/lib/actions";
import { notFound } from "next/navigation"; // Import notFound

// Import PrismaClient for casting
import { PrismaClient } from "@/generated/prisma/client";

// Function to fetch a single recipe by its ID
async function getRecipeById(id: string): Promise<Recipe | null> {
  if (!id) return null;
  // Cast prisma to the base PrismaClient type
  return (prisma as PrismaClient).recipe.findUnique({
    where: { id },
  });
}

interface EditRecipePageProps {
  params: Promise<{ id: string }>; // params is now a Promise
}

export default async function EditRecipePage({ params }: EditRecipePageProps) {
  const { id } = await params; // Await params and destructure id
  const recipe = await getRecipeById(id); // Use the awaited id
  // Fetch categories using the server action
  const existingCategories = await getRecipeCategories();

  if (!recipe) {
    notFound(); // Show 404 if recipe doesn't exist
  }

  return (
    <EditRecipeFormClient
      recipe={recipe}
      existingCategories={existingCategories}
    /> // Pass categories
  );
}
