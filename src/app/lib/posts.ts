// filepath: /Users/sparshsaini/Documents/Ally-Blog-Website/ally-blog/src/app/lib/posts.ts
import prisma from "./prisma";
import type { Post } from "@/generated/prisma/client"; // Updated import path

export async function getAllPublishedPosts(): Promise<Post[]> {
  try {
    const posts = await prisma.post.findMany({
      where: {
        published: true,
      },
      orderBy: { createdAt: "desc" },
    });
    // Filter out posts with invalid slugs before returning
    return posts.filter(
      (post) => post && typeof post.slug === "string" && post.slug.length > 0
    );
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return [];
  }
}

// Export Post type if needed elsewhere, otherwise just use Prisma's type directly
export type { Post };
