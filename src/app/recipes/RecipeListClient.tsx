"use client";

import { useState, useMemo } from "react";
import type { Recipe } from "@/generated/prisma/client";
import RecipeCard from "@/app/components/RecipeCard"; // Adjusted import path

interface RecipeListClientProps {
  allRecipes: Recipe[];
  categories: string[];
}

export default function RecipeListClient({
  allRecipes,
  categories,
}: RecipeListClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredRecipes = useMemo(() => {
    if (!selectedCategory) {
      return allRecipes;
    }
    return allRecipes.filter((recipe) => recipe.category === selectedCategory);
  }, [allRecipes, selectedCategory]);

  const handleCategoryClick = (category: string | null) => {
    setSelectedCategory(category);
  };

  return (
    <>
      {/* Category Filters */}
      {categories.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <button
            onClick={() => handleCategoryClick(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
              ${
                !selectedCategory
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
          >
            All Recipes
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                ${
                  selectedCategory === category
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {/* Recipe Grid */}
      {filteredRecipes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          {selectedCategory
            ? `No recipes found in category: "${selectedCategory}".`
            : "No recipes published yet."}
        </p>
      )}
    </>
  );
}
