// src/app/admin/edit/[id]/page.tsx

import React from "react";
import { notFound, redirect } from "next/navigation";
import prisma from "@/app/lib/prisma";
import type { Post } from "@/generated/prisma/client";
import EditPostFormClient from "./EditPostForm.client";

async function getPost(id: string): Promise<Post | null> {
  console.log(`[EditPage Server] getPost called with ID: ${id}`);
  try {
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
  // Add a return statement here to satisfy TypeScript, although it should be unreachable
  return null;
}

interface EditPostPageProps {
  params: { id: string };
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const id = params.id; // Ensure id is correctly defined within the function scope

  if (!id || typeof id !== "string") {
    console.error(
      `[EditPage Server] Invalid or missing ID in params: '${id}'. Redirecting.`
    );
    redirect("/admin");
  }

  const post = await getPost(id);

  if (!post) {
    console.log(
      `[EditPage Server] Post with ID ${id} not found. Triggering 404.`
    );
    notFound();
  }

  // Ensure the return statement is correctly placed within the function
  return <EditPostFormClient post={post} />;
} // Ensure the function closing brace is correctly placed
