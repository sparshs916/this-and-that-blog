// src/app/admin/edit/[id]/page.tsx

import React from "react";
import { notFound, redirect } from "next/navigation"; // Import redirect
import prisma from "@/app/lib/prisma"; // Use alias

// Import Post type correctly using alias
import type { Post } from "@prisma/client"; // Import directly from @prisma/client
import EditPostFormClient from "./EditPostForm.client"; // Import the new client component

// getPost function can stay here or be moved to lib
async function getPost(id: string): Promise<Post | null> {
  console.log(`[EditPage Server] getPost called with ID: ${id}`);
  try {
    // Ensure ID is valid before querying
    if (!id || typeof id !== "string") {
      console.error(`[EditPage Server] Invalid ID received: ${id}`);
      return null;
    }
    const post = await prisma.post.findUnique({
      where: { id },
    });
    console.log(
      `[EditPage Server] Prisma findUnique result for ID ${id}:`,
      post
    );
    return post;
  } catch (error) {
    console.error(
      `[EditPage Server] Prisma error fetching post with ID ${id}:`,
      error
    );
    return null;
  }
}

// --- Server Component (Default Export) ---
// Directly define the type for params in the function signature
export default async function EditPostPage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;
  // Add extra check for ID validity here as well
  if (!id || typeof id !== "string") {
    console.error(
      `[EditPage Server] Invalid or missing ID in params: '${id}'. Redirecting.`
    );
    redirect("/admin"); // Or show a specific error page
  }
  const post = await getPost(id);

  if (!post) {
    console.log(
      `[EditPage Server] Post with ID ${id} not found. Triggering 404.`
    );
    notFound();
  }

  // Render the new client component, passing the post data
  return <EditPostFormClient post={post} />;
}
