import React from "react";
// Removed prisma import
import Link from "next/link";
import Image from "next/image";
import { getAllPublishedPosts, Post } from "@/app/lib/posts"; // Import from lib

// Helper function to create a plain text excerpt (can be shared if moved to a utils file)
function createExcerpt(htmlContent: string, maxLength: number = 100): string {
  // Shorter excerpt for list view
  if (!htmlContent) return "";
  const plainText = htmlContent.replace(/<[^>]+>/g, ""); // Strip HTML tags
  if (plainText.length <= maxLength) {
    return plainText;
  }
  return plainText.substring(0, maxLength) + "...";
}

// Define the Blog Index Page component
const BlogIndexPage: React.FC = async () => {
  const posts: Post[] = await getAllPublishedPosts(); // Use imported function

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      {" "}
      {/* Adjusted max-width for list view */}
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-900">
        Blog Posts
      </h1>
      {posts.length === 0 ? (
        <p className="text-center text-gray-600">No posts found.</p>
      ) : (
        // Restore vertical spacing between cards
        <div className="space-y-8">
          {" "}
          {/* Keep space-y-8 */}
          {posts.map((post) => {
            // Log the imageUrl for debugging
            console.log(
              `[Blog List Page] Post: ${post.slug}, Image URL: ${post.imageUrl}`
            );

            return (
              <Link key={post.id} href={`/blog/${post.slug}`} legacyBehavior>
                {/* Restore Card Styling to the <a> tag */}
                <a className="flex flex-col md:flex-row items-start border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-white">
                  {post.imageUrl && (
                    // Restore original image container styling for card layout
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
                  {/* Restore padding to text container */}
                  <div className="p-6 flex-grow">
                    <h2 className="text-xl font-semibold mb-2 text-gray-800">
                      {post.title}
                    </h2>
                    <p className="text-gray-500 text-sm mb-4">
                      {new Date(post.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    {/* Use helper function for excerpt */}
                    <p className="text-gray-600 text-sm">
                      {createExcerpt(post.content)}
                    </p>
                  </div>
                </a>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

// Export the correct component
export default BlogIndexPage;
