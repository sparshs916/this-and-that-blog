// Make it a client component to use the hook
"use client";

import React from "react";
// Import useActionState from React
import { useActionState } from "react";
import PostForm from "@/app/admin/PostForm"; // Correct import path using alias
import { createPost } from "@/app/lib/actions"; // Use alias
import Link from "next/link";

export default function NewPostPage() {
  // Initialize useActionState
  const initialState = { message: null, errors: {} };
  // Use useActionState instead of useFormState
  const [state, dispatch] = useActionState(createPost, initialState);

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-3xl text-black">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Create New Post</h1>
        <Link href="/admin" className="text-blue-600 hover:underline">
          &larr; Back to Dashboard
        </Link>
      </div>
      {/* Wrap PostForm with a form tag and pass the dispatch function */}
      <form action={dispatch}>
        {/* Pass state down, form action is handled by the hook */}
        <PostForm initialData={undefined} state={state} />
      </form>
    </div>
  );
}
