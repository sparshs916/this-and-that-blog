"use client";

import React from "react";
// Import useActionState from React instead of useFormState from react-dom
import { useActionState } from "react";
import Link from "next/link"; // Add import for Link
import { updateRecipe, State } from "@/app/lib/actions"; // Add import for updateRecipe and State
import RecipeForm from "@/app/admin/RecipeForm"; // Add import for RecipeForm

import type { Recipe } from "@/generated/prisma/client"; // Updated import path

interface EditRecipeFormClientProps {
  recipe: Recipe;
}

const initialState: State | undefined = undefined; // Initial state can be undefined

export default function EditRecipeFormClient({
  recipe,
}: EditRecipeFormClientProps) {
  // Rename dispatch to formActionDispatch for clarity, matching EditPostForm.client
  // Use useActionState hook
  const [state, formActionDispatch] = useActionState(
    updateRecipe,
    initialState
  );

  return (
    // Remove background color bg-gray-50
    <div className="min-h-screen py-8">
      {/* Remove container styles from the form */}
      <form
        action={formActionDispatch} // Pass dispatch to the form's action
        // Remove container styles
        className=""
      >
        {/* Header section */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-black">
            Edit Recipe
          </h1>
          <Link
            href="/admin"
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            &larr; Back to Dashboard
          </Link>
        </div>{" "}
        {/* Ensure this closing tag is present */}
        {/* Add a divider below the header */}
        <hr className="mb-6 border-gray-300" />
        {/* Pass initialData and state directly to RecipeForm */}
        {/* Remove the action prop from RecipeForm as the parent form handles submission */}
        {/* Set applyBoxStyling to true to keep the card style for the form fields */}
        <RecipeForm
          initialData={recipe}
          state={state}
          applyBoxStyling={true} // Keep the box styling for the form fields
          // action prop removed
        />
        {/* Hidden input for ID is now handled within RecipeForm */}
      </form>
    </div>
  );
}
