import React, { Suspense } from "react";
import RecipesClientPage from "./RecipesClientPage"; // Import the new client component

// Optional: A simple loading component
const LoadingRecipes = () => (
  <div className="container mx-auto max-w-3xl px-4 py-12 text-center">
    <p className="text-gray-600">Loading recipes...</p>
  </div>
);

export default function RecipesPage() {
  return (
    <Suspense fallback={<LoadingRecipes />}>
      <RecipesClientPage />
    </Suspense>
  );
}
