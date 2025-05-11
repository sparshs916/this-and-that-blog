// filepath: /Users/sparshsaini/Documents/Ally-Blog-Website/ally-blog/src/app/admin/recipes/new/page.tsx
"use client";

import React from "react";
import { useActionState } from "react"; // Correct hook
import RecipeForm from "@/app/admin/RecipeForm"; // Ensure this path is correct
// Import getRecipeCategories and createRecipe server actions
import {
  createRecipe,
  getRecipeCategories,
  type State,
} from "@/app/lib/actions";
import Link from "next/link";
// Remove import of getUniqueRecipeCategories from "@/app/lib/posts"

export default function NewRecipePage() {
  // Initialize useActionState for recipe creation
  const initialState: State = { message: null, errors: {} }; // Use State type
  const [state, dispatch] = useActionState(createRecipe, initialState); // Use createRecipe action
  const [existingCategories, setExistingCategories] = React.useState<string[]>(
    []
  );

  React.useEffect(() => {
    async function fetchCategories() {
      // Call the server action to get categories
      const categories = await getRecipeCategories();
      setExistingCategories(categories);
    }
    void fetchCategories();
  }, []);

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-3xl text-black">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Create New Recipe</h1>
        <Link
          href="/admin"
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-300 text-sm"
        >
          &larr; Back to Dashboard
        </Link>
      </div>
      <hr className="mb-6 border-gray-300" />
      {/* Wrap RecipeForm with a form tag and pass the dispatch function */}
      <form action={dispatch}>
        {/* Pass state down, form action is handled by the hook */}
        {/* Remove action prop from RecipeForm */}
        <RecipeForm
          initialData={undefined}
          state={state}
          applyBoxStyling={true}
          existingCategories={existingCategories}
        />
      </form>
    </div>
  );
}
