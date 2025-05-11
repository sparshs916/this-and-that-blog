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

    const post = await prisma.post.findUnique({
      where: whereClause,
    });

    return post;
  } catch (error) {
    return null;
  }
}

interface BlogPostPageProps {
  params: Promise<{ slug: string }>; // params is now a Promise
}

// Generate Metadata for SEO
export async function generateMetadata({
  params, // This is Promise<{ slug: string }>
}: BlogPostPageProps): Promise<Metadata> {
  const actualParams = await params; // Await the promise to get the actual params
  const { slug } = actualParams; // Destructure slug from the resolved params
  if (!slug || typeof slug !== "string" || slug.trim() === "") {
    return { title: "Post Not Found" };
  }
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  // Use post.description if available, otherwise generate from content
  const metaDescription = post.description || post.content.substring(0, 160);

  return {
    title: post.title,
    description: metaDescription,
    openGraph: {
      title: post.title,
      description: metaDescription,
      images: post.imageUrl ? [{ url: post.imageUrl }] : [],
    },
  };
}

// Generate Static Paths (Optional but recommended for performance)
export async function generateStaticParams() {
  try {
    const posts = await prisma.post.findMany({
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
const BlogPostPage: React.FC<BlogPostPageProps> = async ({ params }) => {
  // params is Promise<{ slug: string }>
  const actualParams = await params; // Await the promise
  const { slug } = actualParams; // Destructure slug from the resolved params
  console.log(`[BlogPostPage] Rendering page for slug: '${slug}'`);
  if (!slug || typeof slug !== "string" || slug.trim() === "") {
    notFound();
  }

  const post = await getPostBySlug(slug.trim());
  const session = await getAdminSession();
  const isAdmin = session?.isLoggedIn === true;

  if (!post) {
    notFound();
  }

  if (!post.published && !isAdmin) {
    notFound();
  }

  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      {/* Draft Banner for Admins */}
      {!post.published && isAdmin && (
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
};

export default BlogPostPage;
