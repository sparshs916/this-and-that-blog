'use server';

import prisma from "@/app/lib/prisma"; // Corrected import path
import type { Recipe } from "@/generated/prisma/client";

export type SortableRecipeFields = "title" | "category" | "createdAt" | "published";
export type SortOrder = "asc" | "desc";

interface GetRecipesParams {
  page?: number;
  limit?: number;
  sortBy?: SortableRecipeFields;
  sortOrder?: SortOrder;
  published?: boolean; // Add published filter
}

interface GetRecipesResult {
  recipes: Recipe[];
  totalRecipes: number;
  totalPages: number;
  currentPage: number;
}

const DEFAULT_RECIPE_LIMIT = 5;

export async function getRecipes({
  page = 1,
  limit = DEFAULT_RECIPE_LIMIT,
  sortBy = "createdAt",
  sortOrder = "desc",
  published, // Add published to destructuring
}: GetRecipesParams = {}): Promise<GetRecipesResult> {
  try {
    const skip = (page - 1) * limit;
    const take = limit;

    const where: { published?: boolean } = {}; // Type `where` explicitly
    if (published !== undefined) {
      where.published = published;
    }

    const recipes = await prisma.recipe.findMany({
      where,
      orderBy: {
        [sortBy]: sortOrder,
      },
      skip,
      take,
    });

    const totalRecipes = await prisma.recipe.count({ where });
    const totalPages = Math.ceil(totalRecipes / limit);

    return {
      recipes,
      totalRecipes,
      totalPages,
      currentPage: page,
    };
  } catch (error) {
    console.error("Failed to fetch recipes:", error);
    return {
      recipes: [],
      totalRecipes: 0,
      totalPages: 0,
      currentPage: 1,
    };
  }
}

export async function getUniqueRecipeCategories(): Promise<string[]> {
  try {
    const categories = await prisma.recipe.findMany({
      distinct: ["category"],
      select: {
        category: true,
      },
      where: {
        category: {
          not: null,
        },
      },
    });
    return categories
      .map((r: { category: string | null }) => r.category)
      .filter((c: string | null): c is string => c !== null)
      .sort(); // Sorts alphabetically
  } catch (error) {
    console.error("Failed to fetch unique recipe categories:", error);
    return [];
  }
}

export type { Recipe }; // Export Recipe type
