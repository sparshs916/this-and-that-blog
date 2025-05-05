"use client"; // Add this directive

import React from "react";
import { useActionState } from "react";
import Link from "next/link";
import type { Post } from "@prisma/client"; // Correct import path
import PostForm from "@/app/admin/PostForm";
import { updatePost, type State } from "@/app/lib/actions"; // Correct import path

interface EditPostFormClientProps {
  post: Post; // Use the imported Post type
}

export default function EditPostFormClient({ post }: EditPostFormClientProps) {
  // Provide a default initial state instead of undefined
  const initialState: State = { message: null, errors: {} };
  const [state, formActionDispatch] = useActionState(updatePost, initialState);

  return (
    // Use a light background for the page container
    <div className="min-h-screen bg-gray-50 py-8">
      <form
        action={formActionDispatch}
        // Center the form, add padding, max-width
        className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl"
      >
        <div className="flex justify-between items-center mb-6 border-b pb-4 border-gray-200">
          <h1 className="text-2xl sm:text-3xl font-bold text-black">
            Edit Post
          </h1>
          <Link
            href="/admin"
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            &larr; Back to Dashboard
          </Link>
        </div>
        {/* Pass initialData and state to PostForm */}
        {/* Ensure state is passed correctly */}
        <PostForm initialData={post} state={state ?? initialState} />
      </form>
    </div>
  );
}
