import React from "react";
import { notFound } from "next/navigation";
import prisma from "@/app/lib/prisma"; // Correct path to Prisma client
import Image from "next/image";
import Link from "next/link"; // Import Link for the back button
import { Metadata } from "next"; // Import Metadata type
import { getAdminSession } from "@/app/lib/auth"; // Import admin session helper

// Import PrismaClient for casting
import { PrismaClient } from "@/generated/prisma/client";

export const dynamic = "force-dynamic";

// Define the structure for a Post (matching Prisma schema)
// You might already have this in a definitions file, import if so
interface Post {
  id: string;
  title: string;
  slug: string;
  description: string | null; // Added description property
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
  if (!slug || typeof slug !== "string" || slug.trim() === "") {
    return null;
  }

  // 1. Static-first query: Try to find a published post.
  const post = await (prisma as PrismaClient).post.findUnique({
    where: {
      slug: slug.trim(),
      published: true,
    },
  });

  // If found, return it. This path is safe for static generation.
  if (post) {
    return post;
  }

  // 2. Dynamic fallback for admins: If no published post is found,
  // check for an admin session and look for any post (including drafts).
  const session = await getAdminSession();
  if (session?.isLoggedIn) {
    const draftPost = await (prisma as PrismaClient).post.findUnique({
      where: {
        slug: slug.trim(),
      },
    });

    // Add explicit debug logging to trace what's happening
    if (draftPost) {
      console.log(
        `[getPostBySlug] Found draft post for admin: ${slug}, published: ${draftPost.published}`
      );
    } else {
      console.log(
        `[getPostBySlug] No post found with slug: ${slug}, even for admin`
      );
    }

    return draftPost;
  }

  // If not an admin and no published post was found, return null.
  return null;
}

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

// Generate Metadata for SEO
export async function generateMetadata(
  props: BlogPostPageProps
): Promise<Metadata> {
  const params = await props.params;
  const { slug } = params;
  // Fetch only published post for metadata generation to keep it static
  const post = await (prisma as PrismaClient).post.findUnique({
    where: { slug: slug.trim(), published: true },
  });

  if (!post) {
    return {
      title: "Blog Post Not Found",
    };
  }

  // Create a plain text description excerpt
  const descriptionText = post.description?.replace(/<[^>]+>/g, "") || "";

  return {
    title: post.title,
    description: descriptionText.substring(0, 160),
    openGraph: {
      title: post.title,
      description: descriptionText.substring(0, 160),
      images: post.imageUrl ? [{ url: post.imageUrl }] : [],
    },
  };
}

// Generate Static Paths (Optional but recommended for performance)
export async function generateStaticParams() {
  try {
    const posts = await (prisma as PrismaClient).post.findMany({
      where: { published: true },
      select: { slug: true },
    });
    const validSlugs = posts
      .filter((post: { slug: string | null }) => {
        const isValid =
          post && typeof post.slug === "string" && post.slug.trim().length > 0;
        return isValid;
      })
      .map((post: { slug: string }) => ({
        slug: post.slug.trim(),
      }));
    return validSlugs;
  } catch (error: unknown) {
    return [];
  }
}

// The Page Component
export default async function BlogPostPage(props: BlogPostPageProps) {
  const params = await props.params;
  const { slug } = params;
  console.log(`[BlogPostPage] Rendering page for slug: '${slug}'`);
  if (!slug || typeof slug !== "string" || slug.trim() === "") {
    notFound();
  }

  // Check admin session first, to avoid duplicate checks
  const session = await getAdminSession();
  const isAdmin = session?.isLoggedIn === true;
  console.log(`[BlogPostPage] Admin session check:`, { isAdmin });

  const post = await getPostBySlug(slug.trim());

  // If no post is found (neither published nor a draft for an admin), return 404.
  if (!post) {
    console.log(`[BlogPostPage] No post found for slug: ${slug}. Showing 404.`);
    notFound();
  }

  // If the post is a draft, only admins can view it
  if (!post.published && !isAdmin) {
    console.log(
      `[BlogPostPage] Post is unpublished and user is not admin. Showing 404.`
    );
    notFound(); // Non-admin trying to access a draft.
  }

  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      {/* Draft Banner for Admins */}
      {!post.published && (
        <div className="mb-6 p-4 bg-yellow-100 border border-yellow-300 text-yellow-800 rounded-md text-center">
          <strong>Draft Preview:</strong> This post is not published and is only
          visible to administrators.
        </div>
      )}
      <div className="mb-8">
        <Link
          href="/blog" // Link back to the main blog page
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-300 text-sm"
        >
          &larr; Back to Blog
        </Link>
      </div>
      {/* Card Container */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden p-6 md:p-8">
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

        {/* Post Content - Add text-gray-900 for black text */}
        <div
          className="prose prose-lg max-w-none text-gray-900"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </div>
  );
}
