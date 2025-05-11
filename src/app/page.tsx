import Hero from "@/app/components/Hero";
import PostCard from "@/app/components/PostCard";
import RecipeCard from "@/app/components/RecipeCard"; // Import RecipeCard
// Import the correct function
import { getAllPublishedPosts } from "@/app/lib/posts";
import { getRecipes } from "@/lib/recipes"; // Import getRecipes
import type { Recipe } from "@/generated/prisma/client"; // Import Recipe type

// Helper function to create a plain text excerpt
function createExcerpt(htmlContent: string, maxLength: number = 150): string {
  if (!htmlContent) return "";
  const plainText = htmlContent.replace(/<[^>]+>/g, ""); // Strip HTML tags
  if (plainText.length <= maxLength) {
    return plainText;
  }
  return plainText.substring(0, maxLength) + "...";
}

export default async function HomePage() {
  // Call the correct function and limit results
  const { posts: allPostsArray } = await getAllPublishedPosts(1, 3); // Fetch page 1, limit 3
  const posts = allPostsArray; // Already limited by the API call

  // Fetch recent recipes
  const { recipes: recentRecipes } = await getRecipes({
    page: 1,
    limit: 3,
    published: true,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  return (
    <div className="flex w-full flex-col">
      <Hero />
      {/* Constrain the width of the posts list and center it */}
      <div className="container mx-auto px-4 py-2 md:py-6 lg:py-8">
        {posts.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
              Recent Blog Posts
            </h2>
            {posts.map((post, index) => (
              <PostCard
                key={post.id}
                isOdd={index % 2 !== 0}
                title={post.title}
                date={post.createdAt.toISOString()}
                category={post.category || "General"} // Use post category, fallback to General
                description={post.description} // Pass the new description
                excerpt={createExcerpt(post.content)} // Keep fallback excerpt from content
                slug={post.slug}
                imageUrl={post.imageUrl || "/img/stock_photo.jpeg"}
              />
            ))}
          </section>
        )}

        {recentRecipes.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
              Recent Recipes
            </h2>
            {recentRecipes.map(
              (
                recipe: Recipe // Add type for recipe
              ) => (
                <RecipeCard
                  key={recipe.id}
                  title={recipe.title}
                  date={recipe.createdAt.toISOString()}
                  category={recipe.category}
                  description={createExcerpt(recipe.description, 100)} // Use excerpt for recipe description
                  slug={recipe.slug}
                  imageUrl={recipe.imageUrl}
                  prepTime={recipe.prepTime}
                  cookTime={recipe.cookTime}
                />
              )
            )}
          </section>
        )}

        {posts.length === 0 && recentRecipes.length === 0 && (
          <p className="text-center py-10 text-gray-500">
            No recent posts or recipes found.
          </p>
        )}
      </div>
    </div>
  );
}
