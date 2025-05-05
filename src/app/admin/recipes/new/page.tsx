// filepath: /Users/sparshsaini/Documents/Ally-Blog-Website/ally-blog/src/app/admin/recipes/new/page.tsx
"use client";

import React from "react";
import { useActionState } from "react"; // Correct hook
import RecipeForm from "@/app/admin/RecipeForm"; // Use alias
import { createRecipe, State } from "@/app/lib/actions"; // Use alias, import State
import Link from "next/link";

export default function NewRecipePage() {
  // Initialize useActionState for recipe creation
  const initialState: State | undefined = undefined; // Use State type
  const [state, dispatch] = useActionState(createRecipe, initialState); // Use createRecipe action

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-3xl text-black">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Create New Recipe</h1>
        <Link href="/admin" className="text-blue-600 hover:underline">
          &larr; Back to Dashboard
        </Link>
      </div>
      {/* Wrap RecipeForm with a form tag and pass the dispatch function */}
      <form action={dispatch}>
        {/* Pass state down, form action is handled by the hook */}
        {/* Remove action prop from RecipeForm */}
        <RecipeForm initialData={undefined} state={state} />
      </form>
    </div>
  );
}
