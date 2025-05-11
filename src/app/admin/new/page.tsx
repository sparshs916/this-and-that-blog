// Make it a client component to use the hook
"use client";

import React from "react";
// Import useActionState from React
import { useActionState } from "react";
import PostForm from "@/app/admin/PostForm"; // Ensure this path is correct
// Import getPostCategories and createPost server actions
import { createPost, getPostCategories, type State } from "@/app/lib/actions";
import Link from "next/link";

// Remove the local getUniquePostCategories function as we'll use the server action

export default function NewPostPage() {
  // Use useActionState for form handling
  const initialState: State = { message: null, errors: {} };
  const [state, dispatch] = useActionState(createPost, initialState);

  // Fetch existing categories
  const [existingCategories, setExistingCategories] = React.useState<string[]>(
    []
  );

  React.useEffect(() => {
    async function fetchCategories() {
      // Call the server action to get categories
      const categories = await getPostCategories();
      setExistingCategories(categories);
    }
    void fetchCategories();
  }, []);

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-3xl text-black">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Create New Post</h1>
        <Link
          href="/admin"
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-300 text-sm"
        >
          &larr; Back to Dashboard
        </Link>
      </div>
      <hr className="mb-6 border-gray-300" />
      {/* Wrap PostForm with a form tag and pass the dispatch function */}
      <form action={dispatch}>
        {/* Pass state down, form action is handled by the hook */}
        <PostForm state={state} existingCategories={existingCategories} />
      </form>
    </div>
  );
}
