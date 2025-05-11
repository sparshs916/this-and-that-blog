"use client"; // Add this to make it a client component

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { getAllPublishedPosts, Post } from "@/app/lib/posts";
import { useSearchParams } from "next/navigation";

// Helper function to create a plain text excerpt
function createExcerpt(htmlContent: string, maxLength: number = 100): string {
  if (!htmlContent) return "";
  const plainText = htmlContent.replace(/<[^>]+>/g, "");
  if (plainText.length <= maxLength) {
    return plainText;
  }
  return plainText.substring(0, maxLength) + "...";
}

// Define the Blog Index Page component
const BlogIndexPage: React.FC = () => {
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const searchParams = useSearchParams(); // Get search params

  useEffect(() => {
    const page = parseInt(searchParams.get("page") || "1", 10);
    setCurrentPage(page);
  }, [searchParams]);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        // Pass current page to the fetch function
        const { posts, totalPages: fetchedTotalPages } =
          await getAllPublishedPosts(currentPage, 5); // 5 posts per page
        setAllPosts(posts);
        setFilteredPosts(posts); // Initially show all posts for the current page
        setTotalPages(fetchedTotalPages);

        // Fetch categories (assuming this doesn't need pagination or is handled separately)
        // This might need to be adjusted if categories should be based on *all* posts, not just the current page
        const uniqueCategories = Array.from(
          new Set(
            posts.map((post) => post.category).filter(Boolean) as string[]
          )
        );
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
        // Handle error state if necessary
      }
      setIsLoading(false);
    }
    void fetchData();
  }, [currentPage]); // Refetch when currentPage changes

  const handleCategoryFilter = (category: string | null) => {
    setSelectedCategory(category);
    if (category === null) {
      // When clearing filter, show all posts from the *current* page's original set
      setFilteredPosts(allPosts);
    } else {
      // Filter from the *current* page's posts
      setFilteredPosts(allPosts.filter((post) => post.category === category));
    }
    // Note: This filtering is client-side for the current page.
    // For server-side filtering with pagination, the API would need to support category filtering.
  };

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-3xl px-4 py-12 text-center">
        <p className="text-gray-600">Loading posts...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">
        Blog Posts
      </h1>

      {/* Category Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        <button
          onClick={() => handleCategoryFilter(null)}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors
            ${
              selectedCategory === null
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
        >
          All Categories
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryFilter(category)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors
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

      {filteredPosts.length === 0 ? (
        <p className="text-center text-gray-600">
          {selectedCategory
            ? `No posts found in category: "${selectedCategory}".`
            : "No posts found."}
        </p>
      ) : (
        <div className="space-y-8">
          {filteredPosts.map((post) => {
            // Use post.description if available, otherwise generate excerpt from content
            const displayExcerpt =
              post.description || createExcerpt(post.content);

            return (
              <Link key={post.id} href={`/blog/${post.slug}`} legacyBehavior>
                <a className="flex flex-col md:flex-row items-start border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-white">
                  {post.imageUrl && (
                    <div className="relative w-full md:w-48 h-48 flex-shrink-0">
                      <Image
                        src={post.imageUrl}
                        alt={`Image for ${post.title}`}
                        layout="fill"
                        objectFit="cover"
                        className="md:rounded-l-lg md:rounded-r-none"
                      />
                    </div>
                  )}
                  <div className="p-6 flex-grow">
                    <h2 className="text-xl font-semibold mb-2 text-gray-800">
                      {post.title}
                    </h2>
                    <div className="text-gray-500 text-sm mb-2">
                      <span>
                        {new Date(post.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                      {post.category && (
                        <span className="ml-2 px-2 py-0.5 bg-gray-200 text-gray-700 rounded-full text-xs">
                          {post.category}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm">{displayExcerpt}</p>
                  </div>
                </a>
              </Link>
            );
          })}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-12 flex justify-center items-center space-x-2">
          {currentPage > 1 && (
            <Link
              href={`/blog?page=${currentPage - 1}${
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
                href={`/blog?page=${pageNumber}${
                  selectedCategory ? `&category=${selectedCategory}` : ""
                }`}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  pageNumber === currentPage
                    ? "bg-indigo-600 text-white"
                    : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
                }`}
              >
                {pageNumber}
              </Link>
            )
          )}
          {currentPage < totalPages && (
            <Link
              href={`/blog?page=${currentPage + 1}${
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

export default BlogIndexPage;
