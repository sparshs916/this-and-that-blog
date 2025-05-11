import prisma from "@/app/lib/prisma"; // Corrected import path
import type { Post } from "@/generated/prisma/client";

export type SortablePostFields = "title" | "category" | "createdAt" | "published";
export type SortOrder = "asc" | "desc";

interface GetPostsParams {
  page?: number;
  limit?: number;
  sortBy?: SortablePostFields;
  sortOrder?: SortOrder;
}

interface GetPostsResult {
  posts: Post[];
  totalPosts: number;
  totalPages: number;
  currentPage: number;
}

const DEFAULT_POST_LIMIT = 5;

export async function getPosts({
  page = 1,
  limit = DEFAULT_POST_LIMIT,
  sortBy = "createdAt",
  sortOrder = "desc",
}: GetPostsParams = {}): Promise<GetPostsResult> {
  try {
    const skip = (page - 1) * limit;
    const take = limit;

    const where = {}; // Add any default filtering conditions here if needed

    const posts = await prisma.post.findMany({
      where,
      orderBy: {
        [sortBy]: sortOrder,
      },
      skip,
      take,
    });

    const totalPosts = await prisma.post.count({ where });
    const totalPages = Math.ceil(totalPosts / limit);

    return {
      posts,
      totalPosts,
      totalPages,
      currentPage: page,
    };
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    // It's better to throw the error or handle it in a way that informs the caller
    // For now, returning an empty state on error
    return {
      posts: [],
      totalPosts: 0,
      totalPages: 0,
      currentPage: 1,
    };
  }
}

// Function to get all unique categories for filtering/sorting if needed
export async function getUniquePostCategories(): Promise<string[]> {
  try {
    const categories = await prisma.post.findMany({
      distinct: ["category"],
      select: {
        category: true,
      },
      where: {
        category: {
          not: null, // Exclude posts where category is null
        },
      },
    });
    // Ensure categories are not null and map to string array
    return categories
      .map((p: { category: string | null }) => p.category) // Added explicit type for p
      .filter((c: string | null): c is string => c !== null) // Added explicit type for c
      .sort();
  } catch (error) {
    console.error("Failed to fetch unique post categories:", error);
    return [];
  }
}
