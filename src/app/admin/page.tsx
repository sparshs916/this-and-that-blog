import React from "react";
import Link from "next/link";
import type { Post, Recipe } from "@/generated/prisma/client";
import PostActions from "./PostActions";
import RecipeActions from "./RecipeActions";
import {
  getPosts,
  type SortablePostFields,
  type SortOrder as PostSortOrder,
} from "@/lib/posts";
import {
  getRecipes,
  type SortableRecipeFields,
  type SortOrder as RecipeSortOrder,
} from "@/lib/recipes";

// Interface for the raw searchParams prop from Next.js
interface AdminDashboardSearchParams {
  page?: string;
  sortBy?: SortablePostFields;
  sortOrder?: PostSortOrder;
  recipePage?: string;
  recipeSortBy?: SortableRecipeFields;
  recipeSortOrder?: RecipeSortOrder;
}

// Interface for the processed parameters passed to getData
interface GetDataParams {
  page: number;
  sortBy: SortablePostFields;
  sortOrder: PostSortOrder;
  recipePage: number;
  recipeSortBy: SortableRecipeFields;
  recipeSortOrder: RecipeSortOrder;
}

async function getData(params: GetDataParams) {
  try {
    const postsData = await getPosts({
      page: params.page,
      sortBy: params.sortBy,
      sortOrder: params.sortOrder,
      limit: 5,
    });

    const recipesData = await getRecipes({
      page: params.recipePage,
      sortBy: params.recipeSortBy,
      sortOrder: params.recipeSortOrder,
      limit: 5,
    });

    return { postsData, recipesData };
  } catch (error) {
    console.error("Failed to fetch admin data:", error);
    return {
      postsData: { posts: [], totalPosts: 0, totalPages: 0, currentPage: 1 },
      recipesData: {
        recipes: [],
        totalRecipes: 0,
        totalPages: 0,
        currentPage: 1,
      },
    };
  }
}

export default async function AdminDashboard({
  searchParams,
}: {
  searchParams: Promise<AdminDashboardSearchParams>; // searchParams is now a Promise
}) {
  // Helper function to process searchParams asynchronously
  async function getProcessedSearchParams(
    rawParamsPromise: Promise<AdminDashboardSearchParams> // Parameter is now a Promise
  ) {
    const rawParams = await rawParamsPromise; // Await the promise to get the raw parameters
    // It's good practice to ensure this runs after the current macrotask,
    // though simply awaiting this function call might be sufficient.
    await new Promise((resolve) => setTimeout(resolve, 0)); // Ensure async boundary for searchParams resolution

    const pageForPosts = rawParams.page ? parseInt(rawParams.page, 10) : 1;
    const sortByForPosts = rawParams.sortBy || "createdAt";
    const sortOrderForPosts = rawParams.sortOrder || "desc";

    const pageForRecipes = rawParams.recipePage
      ? parseInt(rawParams.recipePage, 10)
      : 1;
    const sortByForRecipes = rawParams.recipeSortBy || "createdAt";
    const sortOrderForRecipes = rawParams.recipeSortOrder || "desc";

    return {
      pageForPosts,
      sortByForPosts,
      sortOrderForPosts,
      pageForRecipes,
      sortByForRecipes,
      sortOrderForRecipes,
    };
  }

  // Await the processed search parameters
  const {
    pageForPosts,
    sortByForPosts,
    sortOrderForPosts,
    pageForRecipes,
    sortByForRecipes,
    sortOrderForRecipes,
  } = await getProcessedSearchParams(searchParams); // Pass the searchParams Promise directly

  // Fetch data using the processed parameters
  const { postsData, recipesData } = await getData({
    page: pageForPosts,
    sortBy: sortByForPosts,
    sortOrder: sortOrderForPosts,
    recipePage: pageForRecipes,
    recipeSortBy: sortByForRecipes,
    recipeSortOrder: sortOrderForRecipes,
  });

  const { posts, totalPages, currentPage } = postsData;
  const {
    recipes,
    totalPages: recipeTotalPages,
    currentPage: recipeCurrentPage,
  } = recipesData;

  // Use the processed values for UI logic
  const currentSortBy = sortByForPosts;
  const currentSortOrder = sortOrderForPosts;
  // For pagination, currentPage (from postsData) is used directly.

  const currentRecipeSortBy = sortByForRecipes;
  const currentRecipeSortOrder = sortOrderForRecipes;
  // For recipe pagination, recipeCurrentPage (from recipesData) is used directly.

  const renderSortIcon = (
    field: SortablePostFields | SortableRecipeFields,
    type: "post" | "recipe"
  ) => {
    const currentSortField =
      type === "post" ? currentSortBy : currentRecipeSortBy;
    const currentOrder =
      type === "post" ? currentSortOrder : currentRecipeSortOrder;
    if (currentSortField === field) {
      return currentOrder === "asc" ? " ↑" : " ↓";
    }
    return "";
  };

  const getSortLink = (
    field: SortablePostFields | SortableRecipeFields,
    type: "post" | "recipe"
  ) => {
    if (type === "post") {
      const order =
        currentSortBy === field && currentSortOrder === "asc" ? "desc" : "asc";
      // Use currentPage for post pagination state
      return `/admin?page=${currentPage}&sortBy=${field}&sortOrder=${order}&recipePage=${recipeCurrentPage}&recipeSortBy=${currentRecipeSortBy}&recipeSortOrder=${currentRecipeSortOrder}`;
    }
    // For recipe
    const order =
      currentRecipeSortBy === field && currentRecipeSortOrder === "asc"
        ? "desc"
        : "asc";
    // Use recipeCurrentPage for recipe pagination state
    return `/admin?page=${currentPage}&sortBy=${currentSortBy}&sortOrder=${currentSortOrder}&recipePage=${recipeCurrentPage}&recipeSortBy=${field}&recipeSortOrder=${order}`;
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center text-black">
        Admin Dashboard
      </h1>

      {/* Posts Section */}
      <section className="mb-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="text-2xl font-semibold text-black">Blog Posts</h2>
          <Link
            href="/admin/new"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 text-sm sm:text-base whitespace-nowrap"
          >
            Create New Post
          </Link>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider w-2/5"
                >
                  <Link
                    href={getSortLink("title", "post")}
                    className="hover:underline"
                  >
                    Title{renderSortIcon("title", "post")}
                  </Link>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider w-1/5"
                >
                  <Link
                    href={getSortLink("category", "post")}
                    className="hover:underline"
                  >
                    Category{renderSortIcon("category", "post")}
                  </Link>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider w-1/5"
                >
                  <Link
                    href={getSortLink("published", "post")}
                    className="hover:underline"
                  >
                    Status{renderSortIcon("published", "post")}
                  </Link>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider w-1/5"
                >
                  <Link
                    href={getSortLink("createdAt", "post")}
                    className="hover:underline"
                  >
                    Date{renderSortIcon("createdAt", "post")}
                  </Link>
                </th>
                <th scope="col" className="relative px-6 py-3 w-auto">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {posts.length > 0 ? (
                posts.map((post: Post) => (
                  <tr key={post.id}>
                    <td className="px-6 py-4 whitespace-nowrap w-2/5">
                      <div className="text-sm font-medium text-black">
                        {post.title}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap w-1/5">
                      <div className="text-sm text-gray-500">
                        {post.category || "N/A"}{" "}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap w-1/5">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          post.published
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {post.published ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 w-1/5">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium w-auto">
                      <PostActions
                        postId={post.id}
                        postSlug={post.slug}
                        isPublished={post.published}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No posts found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 mt-4 pb-4">
              {currentPage > 1 && (
                <Link
                  href={`/admin?page=${
                    currentPage - 1
                  }&sortBy=${currentSortBy}&sortOrder=${currentSortOrder}&recipePage=${recipeCurrentPage}&recipeSortBy=${currentRecipeSortBy}&recipeSortOrder=${currentRecipeSortOrder}`}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Previous
                </Link>
              )}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNumber) => (
                  <Link
                    key={pageNumber}
                    href={`/admin?page=${pageNumber}&sortBy=${currentSortBy}&sortOrder=${currentSortOrder}&recipePage=${recipeCurrentPage}&recipeSortBy=${currentRecipeSortBy}&recipeSortOrder=${currentRecipeSortOrder}`}
                    className={`px-4 py-2 text-sm font-medium rounded-md ${
                      pageNumber === currentPage
                        ? "bg-blue-500 text-white"
                        : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {pageNumber}
                  </Link>
                )
              )}
              {currentPage < totalPages && (
                <Link
                  href={`/admin?page=${
                    currentPage + 1
                  }&sortBy=${currentSortBy}&sortOrder=${currentSortOrder}&recipePage=${recipeCurrentPage}&recipeSortBy=${currentRecipeSortBy}&recipeSortOrder=${currentRecipeSortOrder}`}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Next
                </Link>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Recipes Section */}
      <section>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="text-2xl font-semibold text-black">Recipes</h2>
          <Link
            href="/admin/recipes/new"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300 text-sm sm:text-base whitespace-nowrap"
          >
            Create New Recipe
          </Link>
        </div>
        <div className="bg-white shadow-md rounded-lg overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider w-2/5"
                >
                  <Link
                    href={getSortLink("title", "recipe")}
                    className="hover:underline"
                  >
                    Title{renderSortIcon("title", "recipe")}
                  </Link>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider w-1/5"
                >
                  <Link
                    href={getSortLink("category", "recipe")}
                    className="hover:underline"
                  >
                    Category{renderSortIcon("category", "recipe")}
                  </Link>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider w-1/5"
                >
                  <Link
                    href={getSortLink("published", "recipe")}
                    className="hover:underline"
                  >
                    Status{renderSortIcon("published", "recipe")}
                  </Link>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider w-1/5"
                >
                  <Link
                    href={getSortLink("createdAt", "recipe")}
                    className="hover:underline"
                  >
                    Date{renderSortIcon("createdAt", "recipe")}
                  </Link>
                </th>
                <th scope="col" className="relative px-6 py-3 w-auto">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recipes.length > 0 ? (
                recipes.map((recipe: Recipe) => (
                  <tr key={recipe.id}>
                    <td className="px-6 py-4 whitespace-nowrap w-2/5">
                      <div className="text-sm font-medium text-black">
                        {recipe.title}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap w-1/5">
                      <div className="text-sm text-gray-500">
                        {recipe.category || "N/A"}{" "}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap w-1/5">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          recipe.published
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {recipe.published ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 w-1/5">
                      {new Date(recipe.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium w-auto">
                      <RecipeActions
                        recipeId={recipe.id}
                        recipeSlug={recipe.slug}
                        isPublished={recipe.published}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    No recipes found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {recipeTotalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 mt-4 pb-4">
              {recipeCurrentPage > 1 && (
                <Link
                  href={`/admin?page=${currentPage}&sortBy=${currentSortBy}&sortOrder=${currentSortOrder}&recipePage=${
                    recipeCurrentPage - 1
                  }&recipeSortBy=${currentRecipeSortBy}&recipeSortOrder=${currentRecipeSortOrder}`}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Previous
                </Link>
              )}
              {Array.from({ length: recipeTotalPages }, (_, i) => i + 1).map(
                (pageNumber) => (
                  <Link
                    key={pageNumber}
                    href={`/admin?page=${currentPage}&sortBy=${currentSortBy}&sortOrder=${currentSortOrder}&recipePage=${pageNumber}&recipeSortBy=${currentRecipeSortBy}&recipeSortOrder=${currentRecipeSortOrder}`}
                    className={`px-4 py-2 text-sm font-medium rounded-md ${
                      pageNumber === recipeCurrentPage
                        ? "bg-blue-500 text-white"
                        : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {pageNumber}
                  </Link>
                )
              )}
              {recipeCurrentPage < recipeTotalPages && (
                <Link
                  href={`/admin?page=${currentPage}&sortBy=${currentSortBy}&sortOrder=${currentSortOrder}&recipePage=${
                    recipeCurrentPage + 1
                  }&recipeSortBy=${currentRecipeSortBy}&recipeSortOrder=${currentRecipeSortOrder}`}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Next
                </Link>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
