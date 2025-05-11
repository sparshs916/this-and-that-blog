// filepath: /Users/sparshsaini/Documents/Ally-Blog-Website/ally-blog/src/app/admin/RecipeActions.tsx
"use client";

import React from "react"; // Removed useTransition
import Link from "next/link";
import { toggleRecipePublishStatus, deleteRecipe } from "../lib/actions"; // Adjust path if needed

interface RecipeActionsProps {
  recipeId: string;
  recipeSlug: string;
  isPublished: boolean;
}

export default function RecipeActions({
  recipeId,
  recipeSlug,
  isPublished,
}: RecipeActionsProps) {
  // Match PostActions handler style
  const handleTogglePublish = () => {
    void (async () => {
      try {
        await toggleRecipePublishStatus(recipeId, !isPublished);
        // Consider adding toast notifications or better feedback
      } catch (error) {
        alert("Failed to toggle publish status. Please try again.");
      }
    })();
  };

  // Match PostActions handler style
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      void (async () => {
        try {
          const result = await deleteRecipe(recipeId);

          if (result.status && result.status >= 400) {
            // Server action reported an error
            alert(
              result.message || "Failed to delete the recipe. Please try again."
            );
          } else if (result.status === 200) {
            // Successfully deleted, revalidation will update the UI.
          } else {
            // Unexpected result structure
            alert(
              "Received an unexpected response after attempting to delete the recipe."
            );
          }
        } catch (error) {
          // Catch client-side errors or if the promise from deleteRecipe rejects unexpectedly
          alert(
            "An unexpected error occurred while trying to delete the recipe. Please try again."
          );
        }
      })();
    }
  };

  return (
    // Match PostActions structure and styling
    <div className="flex items-center justify-end space-x-2">
      {/* Publish/Unpublish Button - Match PostActions styling */}
      <button
        type="button"
        onClick={handleTogglePublish}
        className={`px-2 py-1 text-xs rounded ${
          isPublished
            ? "bg-gray-200 text-gray-700 hover:bg-gray-300" // Match PostActions unpublish style
            : "bg-blue-500 text-white hover:bg-blue-600" // Match PostActions publish style
        }`}
      >
        {isPublished ? "Unpublish" : "Publish"}
      </button>

      {/* Edit Link - Match PostActions styling */}
      <Link
        href={`/admin/recipes/edit/${recipeId}`}
        className="text-indigo-600 hover:text-indigo-900 text-sm"
      >
        Edit
      </Link>

      {/* Delete Button - Match PostActions styling */}
      <button
        type="button"
        onClick={handleDelete}
        className="text-red-500 hover:text-red-700 text-sm"
      >
        Delete
      </button>

      {/* View Link - Match PostActions styling (conditionally rendered) */}
      {isPublished && (
        <Link
          href={`/recipes/${recipeSlug}`} // Link to the public recipe page
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-700 text-sm"
        >
          View
        </Link>
      )}
    </div>
  );
}
