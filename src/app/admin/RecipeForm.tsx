"use client"; // Mark as client component if using hooks like useState

import React, { useState } from "react"; // Import useState
// Import Recipe type directly from @prisma/client
import type { Recipe } from "@/generated/prisma/client";
import { useFormStatus } from "react-dom"; // Import useFormStatus for pending state
import type { State } from "@/app/lib/actions"; // Import the State type for errors
import Image from "next/image"; // Import Next.js Image component
import LexicalEditorComponent from "@/app/components/LexicalEditor"; // Updated import path

// Submit Button Component (copied from PostForm for consistency)
function SubmitButton({ isUpdating }: { isUpdating: boolean }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={`inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white ${
        pending
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      }`}
      disabled={pending}
      aria-disabled={pending}
    >
      {pending ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          {isUpdating ? "Updating..." : "Creating..."}
        </>
      ) : isUpdating ? (
        "Update Recipe"
      ) : (
        "Create Recipe"
      )}
    </button>
  );
}

interface RecipeFormProps {
  initialData?: Recipe | null;
  state?: State;
  applyBoxStyling?: boolean; // Add new prop
}

export default function RecipeForm({
  initialData,
  state,
  applyBoxStyling = true, // Default to true
}: RecipeFormProps) {
  const isEditing = !!initialData;

  // State for editor content
  const [descriptionContent, setDescriptionContent] = useState(
    initialData?.description || ""
  );
  const [ingredientsContent, setIngredientsContent] = useState(
    initialData?.ingredients || ""
  );
  const [instructionsContent, setInstructionsContent] = useState(
    initialData?.instructions || ""
  );

  // Handlers for editor changes
  const handleDescriptionChange = (htmlContent: string) => {
    setDescriptionContent(htmlContent);
  };
  const handleIngredientsChange = (htmlContent: string) => {
    setIngredientsContent(htmlContent);
  };
  const handleInstructionsChange = (htmlContent: string) => {
    setInstructionsContent(htmlContent);
  };

  return (
    // Conditionally apply box styling classes
    <div
      className={`space-y-6 ${
        applyBoxStyling
          ? "bg-white shadow-md rounded-lg p-6 border border-gray-200"
          : ""
      }`}
    >
      {/* Add hidden input for ID if editing */}
      {initialData?.id && (
        <input type="hidden" name="id" value={initialData.id} />
      )}
      {/* Title */}
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          defaultValue={initialData?.title || ""}
          required
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
          aria-describedby="title-error"
        />
        {state?.errors?.title && (
          <div
            id="title-error"
            aria-live="polite"
            className="mt-1 text-sm text-red-500"
          >
            {state.errors.title.map((error: string) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        )}
      </div>
      {/* Description - Use Lexical Editor */}
      <div>
        <label
          htmlFor="description-editor"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Description
        </label>
        <LexicalEditorComponent
          initialContent={descriptionContent}
          onChange={handleDescriptionChange}
        />
        <input
          type="hidden"
          id="description"
          name="description"
          value={descriptionContent}
        />
        {state?.errors?.description && (
          <div
            id="description-error"
            aria-live="polite"
            className="mt-1 text-sm text-red-500"
          >
            {state.errors.description.map((error: string) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        )}
      </div>
      {/* Ingredients - Use Lexical Editor */}
      <div>
        <label
          htmlFor="ingredients-editor"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Ingredients
        </label>
        <LexicalEditorComponent
          initialContent={ingredientsContent}
          onChange={handleIngredientsChange}
        />
        <input
          type="hidden"
          id="ingredients"
          name="ingredients"
          value={ingredientsContent}
        />
        {state?.errors?.ingredients && (
          <div
            id="ingredients-error"
            aria-live="polite"
            className="mt-1 text-sm text-red-500"
          >
            {state.errors.ingredients.map((error: string) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        )}
      </div>
      {/* Instructions - Use Lexical Editor */}
      <div>
        <label
          htmlFor="instructions-editor"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Instructions
        </label>
        <LexicalEditorComponent
          initialContent={instructionsContent}
          onChange={handleInstructionsChange}
        />
        <input
          type="hidden"
          id="instructions"
          name="instructions"
          value={instructionsContent}
        />
        {state?.errors?.instructions && (
          <div
            id="instructions-error"
            aria-live="polite"
            className="mt-1 text-sm text-red-500"
          >
            {state.errors.instructions.map((error: string) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        )}
      </div>
      {/* Prep Time */}
      <div>
        <label
          htmlFor="prepTime"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Prep Time (e.g., 15 mins)
        </label>
        <input
          type="text"
          id="prepTime"
          name="prepTime"
          defaultValue={initialData?.prepTime || ""}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
          aria-describedby="prepTime-error"
        />
        {state?.errors?.prepTime && (
          <div
            id="prepTime-error"
            aria-live="polite"
            className="mt-1 text-sm text-red-500"
          >
            {state.errors.prepTime.map((error: string) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        )}
      </div>
      {/* Cook Time */}
      <div>
        <label
          htmlFor="cookTime"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Cook Time (e.g., 30 mins)
        </label>
        <input
          type="text"
          id="cookTime"
          name="cookTime"
          defaultValue={initialData?.cookTime || ""}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
          aria-describedby="cookTime-error"
        />
        {state?.errors?.cookTime && (
          <div
            id="cookTime-error"
            aria-live="polite"
            className="mt-1 text-sm text-red-500"
          >
            {state.errors.cookTime.map((error: string) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        )}
      </div>
      {/* Servings */}
      <div>
        <label
          htmlFor="servings"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Servings (e.g., 4 servings)
        </label>
        <input
          type="text"
          id="servings"
          name="servings"
          defaultValue={initialData?.servings || ""}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
          aria-describedby="servings-error"
        />
        {state?.errors?.servings && (
          <div
            id="servings-error"
            aria-live="polite"
            className="mt-1 text-sm text-red-500"
          >
            {state.errors.servings.map((error: string) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        )}
      </div>
      {/* Image Upload */}
      <div>
        <label
          htmlFor="image"
          className="block text-sm font-medium text-gray-700"
        >
          Featured Image
        </label>
        <div className="mt-1 flex items-center space-x-4">
          {initialData?.imageUrl && (
            // Replace <img> with Next.js Image component
            <Image
              src={initialData.imageUrl}
              alt="Current featured image"
              width={80} // Provide width
              height={80} // Provide height
              className="h-20 w-auto rounded-md object-cover"
            />
          )}
          <div className="flex-1">
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
              aria-describedby="image-error"
            />
          </div>
        </div>
        <p className="mt-2 text-sm text-gray-500" id="image_help">
          Upload an image file (e.g., JPG, PNG, GIF). Leave blank to keep the
          existing image or if no image is desired. Max file size limit
          determined by server configuration.
        </p>
        {state?.errors?.image && (
          <div
            id="image-error"
            aria-live="polite"
            className="mt-2 text-sm text-red-500"
          >
            {state.errors.image.map((error: string) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        )}
      </div>
      {/* Published Checkbox */}
      <div className="flex items-center">
        <input
          id="published"
          name="published"
          type="checkbox"
          defaultChecked={initialData?.published ?? false}
          className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          aria-describedby="published-error"
        />
        <label
          htmlFor="published"
          className="ml-3 block text-sm font-medium text-gray-700"
        >
          Published
        </label>
        {state?.errors?.published && (
          <div
            id="published-error"
            aria-live="polite"
            className="ml-4 text-sm text-red-500"
          >
            {state.errors.published.map((error: string) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        )}
      </div>
      {/* General Error Message */}
      {state?.message && (
        <div aria-live="polite" className="text-sm text-red-500">
          <p>{state.message}</p>
        </div>
      )}
      {/* Submit Button */}
      <div className="pt-4">
        <SubmitButton isUpdating={isEditing} />
      </div>
    </div> // Close the spacing div
  );
}
