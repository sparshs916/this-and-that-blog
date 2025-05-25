import React from "react";
import Link from "next/link";
import type { Post, Recipe, NewsletterIssue } from "@/generated/prisma/client";
import { NewsletterStatus } from "@/generated/prisma/client";
import PostActions from "./PostActions";
import RecipeActions from "./RecipeActions";
import SendNewsletterButton from "./newsletter/SendNewsletterButton";
import DeleteNewsletterButton from "./newsletter/DeleteNewsletterButton";

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
import {
  getNewsletterIssues,
  type SortableNewsletterFields,
  type SortOrder as NewsletterSortOrder,
} from "@/lib/newsletters";

// Interface for the raw searchParams prop from Next.js
interface AdminDashboardSearchParams {
  page?: string;
  sortBy?: SortablePostFields;
  sortOrder?: PostSortOrder;
  recipePage?: string;
  recipeSortBy?: SortableRecipeFields;
  recipeSortOrder?: RecipeSortOrder;
  newsletterPage?: string;
  newsletterSortBy?: SortableNewsletterFields;
  newsletterSortOrder?: NewsletterSortOrder;
}

// Interface for the processed parameters passed to getData
interface GetDataParams {
  page: number;
  sortBy: SortablePostFields;
  sortOrder: PostSortOrder;
  recipePage: number;
  recipeSortBy: SortableRecipeFields;
  recipeSortOrder: RecipeSortOrder;
  newsletterPage: number;
  newsletterSortBy: SortableNewsletterFields;
  newsletterSortOrder: NewsletterSortOrder;
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

    const newsletterIssuesData = await getNewsletterIssues({
      page: params.newsletterPage,
      sortBy: params.newsletterSortBy,
      sortOrder: params.newsletterSortOrder,
      limit: 5,
    });

    return { postsData, recipesData, newsletterIssuesData };
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
      newsletterIssuesData: {
        issues: [],
        totalIssues: 0,
        totalPages: 0,
        currentPage: 1,
      },
    };
  }
}

export default async function AdminDashboard({
  searchParams,
}: {
  searchParams: Promise<AdminDashboardSearchParams>;
}) {
  async function getProcessedSearchParams(
    rawParamsPromise: Promise<AdminDashboardSearchParams>
  ) {
    const rawParams = await rawParamsPromise;
    await new Promise((resolve) => setTimeout(resolve, 0));

    const pageForPosts = rawParams.page ? parseInt(rawParams.page, 10) : 1;
    const sortByForPosts = rawParams.sortBy || "createdAt";
    const sortOrderForPosts = rawParams.sortOrder || "desc";

    const pageForRecipes = rawParams.recipePage
      ? parseInt(rawParams.recipePage, 10)
      : 1;
    const sortByForRecipes = rawParams.recipeSortBy || "createdAt";
    const sortOrderForRecipes = rawParams.recipeSortOrder || "desc";

    const pageForNewsletterIssues = rawParams.newsletterPage
      ? parseInt(rawParams.newsletterPage, 10)
      : 1;
    const sortByForNewsletterIssues = rawParams.newsletterSortBy || "createdAt";
    const sortOrderForNewsletterIssues =
      rawParams.newsletterSortOrder || "desc";

    return {
      pageForPosts,
      sortByForPosts,
      sortOrderForPosts,
      pageForRecipes,
      sortByForRecipes,
      sortOrderForRecipes,
      pageForNewsletterIssues,
      sortByForNewsletterIssues,
      sortOrderForNewsletterIssues,
    };
  }

  const {
    pageForPosts,
    sortByForPosts,
    sortOrderForPosts,
    pageForRecipes,
    sortByForRecipes,
    sortOrderForRecipes,
    pageForNewsletterIssues,
    sortByForNewsletterIssues,
    sortOrderForNewsletterIssues,
  } = await getProcessedSearchParams(searchParams);

  const { postsData, recipesData, newsletterIssuesData } = await getData({
    page: pageForPosts,
    sortBy: sortByForPosts,
    sortOrder: sortOrderForPosts,
    recipePage: pageForRecipes,
    recipeSortBy: sortByForRecipes,
    recipeSortOrder: sortOrderForRecipes,
    newsletterPage: pageForNewsletterIssues,
    newsletterSortBy: sortByForNewsletterIssues,
    newsletterSortOrder: sortOrderForNewsletterIssues,
  });

  const { posts, totalPages, currentPage } = postsData;
  const {
    recipes,
    totalPages: recipeTotalPages,
    currentPage: recipeCurrentPage,
  } = recipesData;
  const {
    issues: newsletterIssues,
    totalPages: newsletterTotalPages,
    currentPage: newsletterCurrentPage,
  } = newsletterIssuesData;

  const currentSortBy = sortByForPosts;
  const currentSortOrder = sortOrderForPosts;

  const currentRecipeSortBy = sortByForRecipes;
  const currentRecipeSortOrder = sortOrderForRecipes;

  const currentNewsletterSortBy = sortByForNewsletterIssues;
  const currentNewsletterSortOrder = sortOrderForNewsletterIssues;

  // Define base query strings for each section to preserve their states
  const postParams = `page=${currentPage}&sortBy=${currentSortBy}&sortOrder=${currentSortOrder}`;
  const recipeParams = `recipePage=${recipeCurrentPage}&recipeSortBy=${currentRecipeSortBy}&recipeSortOrder=${currentRecipeSortOrder}`;
  const newsletterParams = `newsletterPage=${newsletterCurrentPage}&newsletterSortBy=${currentNewsletterSortBy}&newsletterSortOrder=${currentNewsletterSortOrder}`;

  const renderSortIcon = (
    field: SortablePostFields | SortableRecipeFields | SortableNewsletterFields,
    type: "post" | "recipe" | "newsletter"
  ) => {
    let currentSortField: string;
    let currentOrder: string;

    if (type === "post") {
      currentSortField = currentSortBy;
      currentOrder = currentSortOrder;
    } else if (type === "recipe") {
      currentSortField = currentRecipeSortBy;
      currentOrder = currentRecipeSortOrder;
    } else {
      // newsletter
      currentSortField = currentNewsletterSortBy;
      currentOrder = currentNewsletterSortOrder;
    }

    if (currentSortField === field) {
      return currentOrder === "asc" ? " ↑" : " ↓";
    }
    return "";
  };

  const getSortLink = (
    field: SortablePostFields | SortableRecipeFields | SortableNewsletterFields,
    type: "post" | "recipe" | "newsletter"
  ) => {
    let order: PostSortOrder | RecipeSortOrder | NewsletterSortOrder;
    const baseLink = "/admin?";

    if (type === "post") {
      order =
        currentSortBy === field && currentSortOrder === "asc" ? "desc" : "asc";
      return `${baseLink}page=${currentPage}&sortBy=${field}&sortOrder=${order}&${recipeParams}&${newsletterParams}`;
    } else if (type === "recipe") {
      order =
        currentRecipeSortBy === field && currentRecipeSortOrder === "asc"
          ? "desc"
          : "asc";
      return `${baseLink}${postParams}&recipePage=${recipeCurrentPage}&recipeSortBy=${field}&recipeSortOrder=${order}&${newsletterParams}`;
    } else {
      // newsletter
      order =
        currentNewsletterSortBy === field &&
        currentNewsletterSortOrder === "asc"
          ? "desc"
          : "asc";
      return `${baseLink}${postParams}&${recipeParams}&newsletterPage=${newsletterCurrentPage}&newsletterSortBy=${field}&newsletterSortOrder=${order}`;
    }
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
                  href={`/admin?page=${currentPage - 1}&sortBy=${currentSortBy}&sortOrder=${currentSortOrder}&${recipeParams}&${newsletterParams}`}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Previous
                </Link>
              )}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNumber) => (
                  <Link
                    key={pageNumber}
                    href={`/admin?page=${pageNumber}&sortBy=${currentSortBy}&sortOrder=${currentSortOrder}&${recipeParams}&${newsletterParams}`}
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
                  href={`/admin?page=${currentPage + 1}&sortBy=${currentSortBy}&sortOrder=${currentSortOrder}&${recipeParams}&${newsletterParams}`}
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
      <section className="mb-12">
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
            <nav
              aria-label="Recipe Pagination"
              className="flex justify-center items-center space-x-2 mt-4 pb-4" // Added pb-4 for padding
            >
              {recipeCurrentPage > 1 && (
                <Link
                  href={`/admin?${postParams}&recipePage=${recipeCurrentPage - 1}&recipeSortBy=${currentRecipeSortBy}&recipeSortOrder=${currentRecipeSortOrder}&${newsletterParams}`}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Previous
                </Link>
              )}
              {[...Array(recipeTotalPages)].map((_, i) => (
                <Link
                  key={i}
                  href={`/admin?${postParams}&recipePage=${i + 1}&recipeSortBy=${currentRecipeSortBy}&recipeSortOrder=${currentRecipeSortOrder}&${newsletterParams}`}
                  className={`px-3 py-1 border border-gray-300 rounded-md text-sm font-medium ${
                    recipeCurrentPage === i + 1
                      ? "bg-green-500 text-white" // Theme color for recipe pagination
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {i + 1}
                </Link>
              ))}
              {recipeCurrentPage < recipeTotalPages && (
                <Link
                  href={`/admin?${postParams}&recipePage=${recipeCurrentPage + 1}&recipeSortBy=${currentRecipeSortBy}&recipeSortOrder=${currentRecipeSortOrder}&${newsletterParams}`}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Next
                </Link>
              )}
            </nav>
          )}
        </div>
      </section>
      {/* End of Recipes Section */}

      {/* Newsletter Issues Section */}
      <section className="mt-12 mb-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="text-2xl font-semibold text-black">
            Newsletter Issues
          </h2>
          <Link
            href="/admin/newsletter/compose"
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-300 text-sm sm:text-base whitespace-nowrap"
          >
            Compose New Newsletter
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
                    href={getSortLink("title", "newsletter")}
                    className="hover:underline"
                  >
                    Title{renderSortIcon("title", "newsletter")}
                  </Link>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider w-1/5"
                >
                  <Link
                    href={getSortLink("status", "newsletter")}
                    className="hover:underline"
                  >
                    Status{renderSortIcon("status", "newsletter")}
                  </Link>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider w-1/5"
                >
                  <Link
                    href={getSortLink("createdAt", "newsletter")}
                    className="hover:underline"
                  >
                    Date{renderSortIcon("createdAt", "newsletter")}
                  </Link>
                </th>
                <th scope="col" className="relative px-6 py-3 w-auto">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {newsletterIssues.length > 0 ? (
                newsletterIssues.map((issue: NewsletterIssue) => (
                  <tr key={issue.id}>
                    <td className="px-6 py-4 whitespace-nowrap w-2/5">
                      <div className="text-sm font-medium text-black">
                        {issue.title}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap w-1/5">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          issue.status === NewsletterStatus.SENT
                            ? "bg-green-100 text-green-800"
                            : issue.status === NewsletterStatus.DRAFT
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {issue.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 w-1/5">
                      {new Date(issue.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium w-auto">
                      <div className="flex items-center justify-end space-x-3">
                        <Link
                          href={`/admin/newsletter/edit/${issue.id}`}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit
                        </Link>
                        {issue.status === NewsletterStatus.DRAFT && (
                          <SendNewsletterButton issueId={issue.id} />
                        )}
                        <Link
                          href={`/admin/newsletter/view/${issue.id}`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          View
                        </Link>
                        <DeleteNewsletterButton issueId={issue.id} />{" "}
                        {/* Add this line */}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4} // Adjusted colspan for newsletter table
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No newsletter issues found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {newsletterTotalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 mt-4 pb-4">
              {newsletterCurrentPage > 1 && (
                <Link
                  href={`/admin?${postParams}&${recipeParams}&newsletterPage=${newsletterCurrentPage - 1}&newsletterSortBy=${currentNewsletterSortBy}&newsletterSortOrder=${currentNewsletterSortOrder}`}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Previous
                </Link>
              )}
              {Array.from(
                { length: newsletterTotalPages },
                (_, i) => i + 1
              ).map((pageNumber) => (
                <Link
                  key={pageNumber}
                  href={`/admin?${postParams}&${recipeParams}&newsletterPage=${pageNumber}&newsletterSortBy=${currentNewsletterSortBy}&newsletterSortOrder=${currentNewsletterSortOrder}`}
                  className={`px-4 py-2 text-sm font-medium rounded-md ${
                    pageNumber === newsletterCurrentPage
                      ? "bg-purple-500 text-white" // Theme color for newsletter pagination
                      : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {pageNumber}
                </Link>
              ))}
              {newsletterCurrentPage < newsletterTotalPages && (
                <Link
                  href={`/admin?${postParams}&${recipeParams}&newsletterPage=${newsletterCurrentPage + 1}&newsletterSortBy=${currentNewsletterSortBy}&newsletterSortOrder=${currentNewsletterSortOrder}`}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Next
                </Link>
              )}
            </div>
          )}
        </div>
      </section>
      {/* End of Newsletter Issues Section */}
    </div>
  );
}
