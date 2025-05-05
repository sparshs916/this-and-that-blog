"use client";

import { useState, useEffect } from "react";

interface Post {
  id: string;
  title: string;
  content: string;
  category: string;
}

export default function RecentPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Replace this with mock data or an API call
        const mockPosts: Post[] = [
          {
            id: "1",
            title: "Post 1",
            content: "This is the first post.",
            category: "General",
          },
          {
            id: "2",
            title: "Post 2",
            content: "This is the second post.",
            category: "Technology",
          },
        ];
        setPosts(mockPosts);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred.");
        }
      }
    };

    fetchPosts();
  }, []);

  return (
    <section className="container mx-auto px-4 py-2">
      <div className="max-w-2xl mx-auto">
        {error && <p className="text-red-500">{error}</p>}
        {posts.length > 0 ? (
          <ul>
            {posts.map((post) => (
              <li key={post.id} className="border p-4 rounded mb-2 text-black">
                <h2 className="text-xl font-semibold text-black">
                  {post.title}
                </h2>
                <p className="text-black">{post.content}</p>
                <p className="text-sm text-gray-500">
                  Category: {post.category}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-black">No posts found.</p>
        )}
      </div>
    </section>
  );
}
