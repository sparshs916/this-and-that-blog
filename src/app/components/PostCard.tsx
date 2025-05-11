import Image from "next/image";
import Link from "next/link"; // Import Link for the button

interface PostCardProps {
  isOdd: boolean;
  title: string;
  date: string;
  category: string;
  description?: string | null; // Make description optional
  excerpt?: string; // Keep excerpt for fallback or other uses
  slug: string;
  imageUrl: string;
}

export default function PostCard({
  isOdd,
  title,
  date,
  category,
  description,
  excerpt,
  slug,
  imageUrl,
}: PostCardProps) {
  const cardClasses = `flex flex-col md:flex-row items-stretch w-full min-h-[20rem] md:min-h-[25rem] lg:min-h-[28rem] shadow-lg rounded-lg overflow-hidden my-6 md:my-8 ${
    isOdd ? "md:flex-row-reverse" : ""
  }`;

  // textContentOrder variable removed

  // Use description if available, otherwise use the passed excerpt (which might be generated from content)
  const displayExcerpt = description || excerpt;

  return (
    <article className={cardClasses}>
      <Link
        href={`/blog/${slug}`}
        className="block w-full h-56 sm:h-64 md:w-1/2 md:h-auto relative group overflow-hidden" // Added md:h-auto
      >
        <Image
          src={imageUrl}
          alt={`Featured image for ${title}`}
          layout="fill" // Changed to fill
          objectFit="cover" // Added objectFit
          className="group-hover:scale-105 transition-transform duration-300"
        />
      </Link>
      <div
        className={`p-6 md:p-8 lg:p-10 flex-1 flex flex-col justify-between`}
      >
        {/* Meta information: Adjusted text color and spacing */}
        <p className="text-xs text-gray-500 mb-3 uppercase tracking-wider">
          {new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          / <span className="font-medium text-gray-600">{category}</span>
        </p>
        {/* Title: Use serif font, larger size, adjusted color and margin */}
        <h1 className="font-serif font-normal text-3xl md:text-4xl lg:text-5xl mb-4 text-gray-900">
          {title}
        </h1>
        {/* Excerpt: Adjusted text color, size, and line height */}
        <p className="text-base text-gray-600 mb-6 leading-relaxed line-clamp-3">
          {displayExcerpt}
        </p>
        {/* Read More Button */}
        <div className="mt-auto pt-2">
          {" "}
          {/* mt-auto pushes to bottom, pt-2 for spacing */}
          <Link
            href={`/blog/${slug}`}
            className="inline-block px-5 py-2 text-xs font-semibold tracking-wider text-gray-700 uppercase bg-gray-100 rounded-sm hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            READ MORE
          </Link>
        </div>
      </div>
    </article>
  );
}
