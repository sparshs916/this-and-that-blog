import Hero from "@/app/components/Hero";
import PostCard from "@/app/components/PostCard";
// Import the correct function
import { getAllPublishedPosts } from "@/app/lib/posts";

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
  const allPosts = await getAllPublishedPosts();
  const posts = allPosts.slice(0, 3); // Get the 3 most recent posts

  return (
    <div className="flex w-full flex-col">
      <Hero />
      <div className="w-full">
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <PostCard
              key={post.id}
              isOdd={index % 2 !== 0}
              title={post.title}
              date={post.createdAt.toISOString()}
              category={"Blog"} // Example category
              excerpt={createExcerpt(post.content)}
              slug={post.slug}
              imageUrl={post.imageUrl || "/img/stock_photo.jpeg"}
            />
          ))
        ) : (
          <p className="text-center py-10 text-gray-500">No posts found.</p>
        )}
      </div>
    </div>
  );
}
