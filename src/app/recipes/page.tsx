"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { getRecipes, Recipe } from "@/lib/recipes"; // Ensure Recipe type is exported or available
import { useSearchParams } from "next/navigation";

// Helper function to create a plain text excerpt
function createExcerpt(htmlContent: string, maxLength: number = 100): string {
  if (!htmlContent) return "";
  const plainText = htmlContent.replace(/<[^>]+>/g, ""); // Basic strip of HTML tags
  if (plainText.length <= maxLength) {
    return plainText;
  }
  return plainText.substring(0, maxLength) + "...";
}

const RecipesPage: React.FC = () => {
  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const searchParams = useSearchParams();

  useEffect(() => {
    const page = parseInt(searchParams.get("page") || "1", 10);
    setCurrentPage(page);
  }, [searchParams]);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const { recipes, totalPages: fetchedTotalPages } = await getRecipes({
          page: currentPage,
          limit: 5, // 5 recipes per page
          published: true, // Only fetch published recipes
        });
        setAllRecipes(recipes);
        setFilteredRecipes(recipes);
        setTotalPages(fetchedTotalPages);

        // Derive categories from fetched recipes
        // Consider a separate API call for all unique categories if performance is an issue
        const uniqueCategories = Array.from(
          new Set(
            recipes.map((recipe) => recipe.category).filter(Boolean) as string[]
          )
        );
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Failed to fetch recipes:", error);
      }
      setIsLoading(false);
    }
    void fetchData();
  }, [currentPage]);

  const handleCategoryFilter = (category: string | null) => {
    setSelectedCategory(category);
    if (category === null) {
      setFilteredRecipes(allRecipes);
    } else {
      setFilteredRecipes(
        allRecipes.filter((recipe) => recipe.category === category)
      );
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-3xl px-4 py-12 text-center">
        <p className="text-gray-600">Loading recipes...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">
        Recipes
      </h1>

      <div className="flex flex-wrap justify-center gap-2 mb-10">
        <button
          onClick={() => handleCategoryFilter(null)}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            selectedCategory === null
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          All Categories
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryFilter(category)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              selectedCategory === category
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {filteredRecipes.length === 0 ? (
        <p className="text-center text-gray-600">
          {selectedCategory
            ? `No recipes found in category: "${selectedCategory}".`
            : "No recipes found."}
        </p>
      ) : (
        <div className="space-y-8">
          {filteredRecipes.map((recipe) => (
            <Link
              key={recipe.id}
              href={`/recipes/${recipe.slug}`}
              legacyBehavior
            >
              <a className="flex flex-col md:flex-row items-start border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-white">
                {recipe.imageUrl && (
                  <div className="relative w-full md:w-48 h-48 flex-shrink-0">
                    <Image
                      src={recipe.imageUrl}
                      alt={`Image for ${recipe.title}`}
                      layout="fill"
                      objectFit="cover"
                      className="md:rounded-l-lg md:rounded-r-none"
                    />
                  </div>
                )}
                <div className="p-6 flex-grow">
                  <h2 className="text-xl font-semibold mb-2 text-gray-800">
                    {recipe.title}
                  </h2>
                  <div className="text-gray-500 text-sm mb-2">
                    <span>
                      {new Date(recipe.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                    {recipe.category && (
                      <span className="ml-2 px-2 py-0.5 bg-gray-200 text-gray-700 rounded-full text-xs">
                        {recipe.category}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm">
                    {createExcerpt(recipe.description)}
                  </p>
                </div>
              </a>
            </Link>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-12 flex justify-center items-center space-x-2">
          {currentPage > 1 && (
            <Link
              href={`/recipes?page=${currentPage - 1}${
                selectedCategory ? `&category=${selectedCategory}` : ""
              }`}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Previous
            </Link>
          )}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNumber) => (
              <Link
                key={pageNumber}
                href={`/recipes?page=${pageNumber}${
                  selectedCategory ? `&category=${selectedCategory}` : ""
                }`}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  pageNumber === currentPage
                    ? "bg-green-600 text-white"
                    : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
                }`}
              >
                {pageNumber}
              </Link>
            )
          )}
          {currentPage < totalPages && (
            <Link
              href={`/recipes?page=${currentPage + 1}${
                selectedCategory ? `&category=${selectedCategory}` : ""
              }`}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Next
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default RecipesPage;
