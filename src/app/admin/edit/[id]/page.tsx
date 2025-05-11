// src/app/admin/edit/[id]/page.tsx

import React from "react";
import { notFound, redirect } from "next/navigation";
import prisma from "@/app/lib/prisma";
import EditPostFormClient from "./EditPostForm.client";
import type { Post } from "@/generated/prisma/client"; // Updated import path
// Import the server action for getting post categories
import { getPostCategories } from "@/app/lib/actions";

// Function to fetch a single post by its ID
async function getPostById(id: string): Promise<Post | null> {
  if (!id) return null;
  return prisma.post.findUnique({
    where: { id },
  });
}

// Define the standard Props type for Next.js App Router pages
type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined }; // Include searchParams even if unused
};

// Use the standard Props type for the component signature
export default async function EditPostPage(props: Props) {
  const id = props.params.id; // Access id from props.params

  if (!id || typeof id !== "string") {
    redirect("/admin");
  }

  const post = await getPostById(id);
  // Fetch categories using the server action
  const existingCategories = await getPostCategories();

  if (!post) {
    notFound();
  }

  // Ensure the return statement is correctly placed within the function
  return (
    <EditPostFormClient post={post} existingCategories={existingCategories} /> // Pass categories
  );
} // Ensure the function closing brace is correctly placed
