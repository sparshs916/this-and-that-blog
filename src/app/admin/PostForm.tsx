"use client"; // Add this directive

import React, { useState } from "react"; // Import useState
import { useFormStatus } from "react-dom"; // Import hooks
import type { State } from "@/app/lib/actions"; // Import the State type
import type { Post } from "@/generated/prisma/client"; // Updated import path
import LexicalEditorComponent from "@/app/components/LexicalEditor"; // Corrected import path

// Submit Button Component
function SubmitButton({ isUpdating }: { isUpdating: boolean }) {
  const { pending } = useFormStatus(); // Get pending state

  return (
    <button
      type="submit"
      className={`inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white ${
        pending
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      }`}
      disabled={pending} // Disable button when pending
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
        "Update Post"
      ) : (
        "Create Post"
      )}
    </button>
  );
}

// Component definition
export default function PostForm({
  initialData,
  state, // Add state prop
}: {
  initialData?: Post | null; // Use Post type directly
  state?: State; // Add state type
}) {
  const isEditing = !!initialData;
  // State for editor content - used ONLY for the hidden input value
  const [content, setContent] = useState(initialData?.content || "");

  // Handler updates the state for the hidden input
  const handleContentChange = (htmlContent: string) => {
    setContent(htmlContent);
  };

  return (
    // Use a card-like structure for the form
    <div className="bg-white shadow-md rounded-lg p-6 space-y-6 border border-gray-200">
      {/* Add hidden input for ID if editing */}
      {initialData?.id && (
        <input type="hidden" name="id" value={initialData.id} />
      )}
      {/* Add hidden input for SLUG if editing */}
      {initialData?.slug && (
        <input type="hidden" name="slug" value={initialData.slug} />
      )}

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
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black" // Enhanced styling
          aria-describedby="title-error" // For accessibility
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

      {/* Content Field using LexicalEditorComponent */}
      <div>
        <label
          htmlFor="content-editor" // Changed ID for label association
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Content
        </label>
        <LexicalEditorComponent
          // Pass initialData.content directly for initialization
          initialContent={initialData?.content || ""}
          onChange={handleContentChange} // Update state on change
        />
        {/* Hidden input to pass the CURRENT content state to server action */}
        <input type="hidden" id="content" name="content" value={content} />
        {state?.errors?.content && (
          <div
            id="content-error"
            aria-live="polite"
            className="mt-1 text-sm text-red-500"
          >
            {state.errors.content.map((error: string) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        )}
      </div>

      {/* Image Upload Field */}
      <div>
        <label
          htmlFor="image"
          className="block text-sm font-medium text-gray-700"
        >
          Featured Image
        </label>
        <div className="mt-1 flex items-center space-x-4">
          {/* Display current image if editing and exists */}
          {initialData?.imageUrl && (
            <img
              src={initialData.imageUrl}
              alt="Current featured image"
              className="h-20 w-auto rounded-md object-cover" // Slightly larger preview, rounded
            />
          )}
          <div className="flex-1">
            <input
              id="image" // Changed id to 'image'
              name="image" // Changed name to 'image'
              type="file" // Changed type to 'file'
              accept="image/*" // Accept only image files
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer" // Improved file input styling
              aria-describedby="image_help"
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

      <div className="flex items-center">
        <input
          id="published"
          name="published"
          type="checkbox"
          defaultChecked={initialData?.published ?? false} // Handle default checked state
          className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" // Consistent focus ring
          aria-describedby="published-error"
        />
        <label
          htmlFor="published"
          className="ml-3 block text-sm font-medium text-gray-700"
        >
          {" "}
          {/* Adjusted margin and font */}
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

      {state?.message && (
        <div aria-live="polite" className="text-sm text-red-500">
          <p>{state.message}</p>
        </div>
      )}

      <div className="pt-4">
        {" "}
        {/* Add some padding above the button */}
        <SubmitButton isUpdating={isEditing} />
      </div>
    </div>
  );
}
