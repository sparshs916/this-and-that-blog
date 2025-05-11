// filepath: /Users/sparshsaini/Documents/Ally-Blog-Website/ally-blog/src/app/lib/posts.ts
'use server';
import prisma from "./prisma";
import type { Post } from "@/generated/prisma/client"; // Updated import path

export async function getAllPublishedPosts(
  page: number = 1,
  limit: number = 5
): Promise<{ posts: Post[]; totalPosts: number; totalPages: number }> {
  try {
    const skip = (page - 1) * limit;
    const posts = await prisma.post.findMany({
      where: {
        published: true,
      },
      orderBy: { createdAt: "desc" },
      skip: skip,
      take: limit,
    });
    const totalPosts = await prisma.post.count({
      where: {
        published: true,
      },
    });
    // Filter out posts with invalid slugs before returning
    const filteredPosts = posts.filter(
      (post) => post && typeof post.slug === "string" && post.slug.length > 0
    );
    return {
      posts: filteredPosts,
      totalPosts,
      totalPages: Math.ceil(totalPosts / limit),
    };
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return { posts: [], totalPosts: 0, totalPages: 0 };
  }
}

export async function getUniquePostCategories(): Promise<string[]> {
  try {
    const categories = await prisma.post.findMany({
      select: {
        category: true,
      },
      distinct: ["category"],
      where: {
        category: {
          not: null, // Ensure we don't get null categories
        },
      },
    });
    // Filter out any null or empty string categories and map to an array of strings
    return categories
      .map((post) => post.category)
      .filter((category): category is string => !!category && category.trim() !== "");
  } catch (error) {
    console.error("Failed to fetch unique post categories:", error);
    return [];
  }
}

export async function getUniqueRecipeCategories(): Promise<string[]> {
  try {
    const categories = await prisma.recipe.findMany({
      select: {
        category: true,
      },
      distinct: ["category"],
      where: {
        category: {
          not: null, // Ensure we don't get null categories
        },
      },
    });
    // Filter out any null or empty string categories and map to an array of strings
    return categories
      .map((recipe) => recipe.category)
      .filter((category): category is string => !!category && category.trim() !== "");
  } catch (error) {
    console.error("Failed to fetch unique recipe categories:", error);
    return [];
  }
}

// Export Post type if needed elsewhere, otherwise just use Prisma's type directly
export type { Post };
