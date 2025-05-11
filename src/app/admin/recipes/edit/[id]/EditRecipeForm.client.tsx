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
  existingCategories?: string[]; // Add this prop
}

const initialState: State | undefined = undefined; // Initial state can be undefined

export default function EditRecipeFormClient({
  recipe,
  existingCategories, // Destructure the prop
}: EditRecipeFormClientProps) {
  // Rename dispatch to formActionDispatch for clarity, matching EditPostForm.client
  // Use useActionState hook
  const [state, formActionDispatch] = useActionState(
    updateRecipe,
    initialState
  );

  return (
    // Apply container styles from NewRecipePage
    <div className="container mx-auto p-4 md:p-8 max-w-3xl text-black">
      {/* Apply consistent container and max-width styles from NewRecipePage */}
      <form
        action={formActionDispatch} // Pass dispatch to the form's action
        // Remove container classes, as they are now on the parent div
        className=""
      >
        {/* Header section - match NewRecipePage styling */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-black">Edit Recipe</h1>
          <Link
            href="/admin"
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-300 text-sm"
          >
            &larr; Back to Dashboard
          </Link>
        </div>
        {/* Add a divider below the header - matched from NewRecipePage */}
        <hr className="mb-6 border-gray-300" />
        {/* Pass initialData, state, and existingCategories directly to RecipeForm */}
        {/* Remove the action prop from RecipeForm as the parent form handles submission */}
        {/* Set applyBoxStyling to true to keep the card style for the form fields */}
        <RecipeForm
          initialData={recipe}
          state={state}
          applyBoxStyling={true} // Keep the box styling for the form fields
          existingCategories={existingCategories} // Pass the categories
          // action prop removed
        />
        {/* Hidden input for ID is now handled within RecipeForm */}
      </form>
    </div>
  );
}
