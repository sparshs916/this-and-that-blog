import React, { Suspense } from "react";
import BlogIndexClientPage from "./BlogIndexClientPage"; // Import the new client component

// Optional: A simple loading component
const LoadingBlogPosts = () => (
  <div className="container mx-auto max-w-3xl px-4 py-12 text-center">
    <p className="text-gray-600">Loading posts...</p>
  </div>
);

export default function BlogPage() {
  return (
    <Suspense fallback={<LoadingBlogPosts />}>
      <BlogIndexClientPage />
    </Suspense>
  );
}
