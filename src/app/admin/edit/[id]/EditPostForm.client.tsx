"use client"; // Add this directive

import React from "react";
import { useActionState } from "react";
import Link from "next/link";
import type { Post } from "@/generated/prisma/client";
import PostForm from "@/app/admin/PostForm";
// Import updatePost instead of savePost
import { updatePost, type State } from "@/app/lib/actions";

interface EditPostFormClientProps {
  post: Post; // Use the imported Post type
  existingCategories?: string[]; // Add this prop
}

export default function EditPostFormClient({
  post,
  existingCategories,
}: EditPostFormClientProps) {
  // Provide a default initial state instead of undefined
  const initialState: State = { message: null, errors: {} };
  // Use updatePost action
  const [state, formActionDispatch] = useActionState(updatePost, initialState);

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-3xl text-black">
      <form action={formActionDispatch} className="">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-black">Edit Post</h1>
          <Link
            href="/admin"
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-300 text-sm"
          >
            &larr; Back to Dashboard
          </Link>
        </div>
        <hr className="mb-6 border-gray-300" />
        <PostForm
          initialData={post}
          state={state ?? initialState}
          existingCategories={existingCategories}
        />
      </form>
    </div>
  );
}
