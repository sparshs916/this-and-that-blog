import React from "react";
import { notFound } from "next/navigation";
import prisma from "@/app/lib/prisma"; // Correct path to Prisma client
import Image from "next/image";
import Link from "next/link"; // Import Link for the back button
import { Metadata } from "next"; // Import Metadata type
import { getAdminSession } from "@/app/lib/auth"; // Import admin session helper

// Define the structure for a Post (matching Prisma schema)
// You might already have this in a definitions file, import if so
interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  imageUrl: string | null;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
  // Add author field if you have relations
  // author: { name: string; } | null;
}

// Function to fetch a single post by its slug, considering admin status
async function getPostBySlug(slug: string): Promise<Post | null> {
  console.log(
    `[getPostBySlug] Attempting to fetch post with slug: '${slug}' (Type: ${typeof slug})`
  );
  if (!slug || typeof slug !== "string" || slug.trim() === "") {
    console.error(
      `[getPostBySlug] Invalid slug detected: '${slug}'. Aborting fetch.`
    );
    return null;
  }

  // Check if the user is an admin
  const session = await getAdminSession();
  const isAdmin = session?.isLoggedIn === true;

  try {
    const whereClause: { slug: string; published?: boolean } = {
      slug: slug.trim(), // Use trimmed slug
    };

    // Only filter by published: true if the user is NOT an admin
    if (!isAdmin) {
      whereClause.published = true;
    }

    console.log(`[getPostBySlug] Fetching with where clause:`, whereClause);

    const post = await prisma.post.findUnique({
      where: whereClause,
    });

    if (!post) {
      console.log(
        `[getPostBySlug] Post with slug '${slug}' ${
          isAdmin ? "not found" : "not found or not published"
        }.`
      );
    } else {
      console.log(
        `[getPostBySlug] Successfully fetched post with slug '${slug}'. Published status: ${post.published}, Admin: ${isAdmin}`
      );
    }
    return post;
  } catch (error) {
    console.error(
      `[getPostBySlug] Prisma error fetching slug '${slug}':`,
      error
    );
    return null;
  }
}

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

// Generate Metadata for SEO
export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const slug = params.slug; // Removed optional chaining
  console.log(`[generateMetadata] Received slug: '${slug}'`);
  // Add stricter check here too
  if (!slug || typeof slug !== "string" || slug.trim() === "") {
    console.error(
      `[generateMetadata] Invalid slug received: '${slug}'. Returning default metadata.`
    );
    return { title: "Post Not Found" };
  }
  const post = await getPostBySlug(slug); // Pass validated slug

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.content.substring(0, 160), // Generate a short description
    // Add other metadata like openGraph images if desired
    // openGraph: {
    //   title: post.title,
    //   description: post.content.substring(0, 160),
    //   images: post.imageUrl ? [{ url: post.imageUrl }] : [],
    // },
  };
}

// Generate Static Paths (Optional but recommended for performance)
export async function generateStaticParams() {
  console.log("[generateStaticParams] Starting generation...");
  try {
    const posts = await prisma.post.findMany({
      where: { published: true },
      select: { slug: true },
    });
    console.log(
      `[generateStaticParams] Fetched ${posts.length} potential slugs.`
    );
    const validSlugs = posts
      .filter((post: { slug: string | null }) => {
        // Add explicit type for post
        // Stricter filtering
        const isValid =
          post && typeof post.slug === "string" && post.slug.trim().length > 0;
        if (!isValid) {
          console.warn(
            `[generateStaticParams] Filtering out invalid slug:`,
            post?.slug
          );
        }
        return isValid;
      })
      .map((post: { slug: string }) => ({
        // Add explicit type for post
        slug: post.slug.trim(), // Trim the slug just in case
      }));
    console.log(
      `[generateStaticParams] Generated ${validSlugs.length} valid static params:`,
      validSlugs
    );
    return validSlugs;
  } catch (error) {
    console.error("[generateStaticParams] Error fetching slugs:", error);
    return [];
  }
}

// The Page Component
const BlogPostPage: React.FC<BlogPostPageProps> = async ({ params }) => {
  const slug = params.slug; // Removed optional chaining
  console.log(`[BlogPostPage] Rendering page for slug: '${slug}'`);
  if (!slug || typeof slug !== "string" || slug.trim() === "") {
    console.error(
      `[BlogPostPage] Invalid slug received in params: '${slug}'. Triggering notFound.`
    );
    notFound();
  }

  const post = await getPostBySlug(slug.trim()); // Fetch post (handles admin check)
  const session = await getAdminSession(); // Check session again for display logic
  const isAdmin = session?.isLoggedIn === true;

  if (!post) {
    console.log(
      `[BlogPostPage] Post not found for slug '${slug}'. Triggering notFound.`
    );
    notFound();
  }

  // If the post is not published AND the user is not an admin, show 404
  // This is an extra safety check, though getPostBySlug should handle it.
  if (!post.published && !isAdmin) {
    console.log(
      `[BlogPostPage] Non-admin attempting to view unpublished post '${slug}'. Triggering notFound.`
    );
    notFound();
  }

  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12 text-gray-800">
      {/* Draft Banner for Admins */}
      {!post.published && isAdmin && (
        <div className="mb-6 p-4 bg-yellow-100 border border-yellow-300 text-yellow-800 rounded-md text-center">
          <strong>Draft Preview:</strong> This post is not published and is only
          visible to administrators.
        </div>
      )}

      <div className="mb-8">
        <Link
          href="/blog"
          className="text-indigo-600 hover:text-indigo-800 hover:underline"
        >
          &larr; Back to Blog
        </Link>
      </div>
      <article className="prose prose-lg lg:prose-xl max-w-none">
        {/* Post Header */}
        <header className="mb-8 border-b border-gray-200 pb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            {post.title}
          </h1>
          <div className="text-sm text-gray-500 flex items-center space-x-3">
            <time dateTime={post.createdAt.toISOString()}>{formattedDate}</time>
          </div>
        </header>

        {/* Optional Featured Image */}
        {post.imageUrl && (
          <div className="mb-8 -mx-4 sm:mx-0">
            <Image
              src={post.imageUrl}
              alt={`Featured image for ${post.title}`}
              width={768}
              height={432}
              className="w-full h-auto rounded-lg object-cover"
              priority
            />
          </div>
        )}

        {/* Post Content - Remove specific classes, let prose handle it */}
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </div>
  );
};

export default BlogPostPage;
