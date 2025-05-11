"use client";

import Image from "next/image";
import Link from "next/link";

interface RecipeCardProps {
  title: string;
  date: string;
  category?: string | null;
  description?: string | null;
  slug: string;
  imageUrl?: string | null;
  prepTime?: string | null;
  cookTime?: string | null;
}

export default function RecipeCard({
  title,
  date,
  category,
  description,
  slug,
  imageUrl,
  prepTime,
  cookTime,
}: RecipeCardProps) {
  const displayDescription = description; // Or a generated excerpt if you prefer

  return (
    <article className="flex flex-col md:flex-row items-stretch w-full min-h-[20rem] md:min-h-[25rem] lg:min-h-[28rem] shadow-lg rounded-lg overflow-hidden my-6 md:my-8">
      <Link
        href={`/recipes/${slug}`}
        className="block w-full h-56 sm:h-64 md:w-1/2 md:h-auto relative group overflow-hidden"
      >
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={`Featured image for ${title}`}
            layout="fill"
            objectFit="cover"
            className="group-hover:scale-105 transition-transform duration-300"
          />
        )}
      </Link>
      <div className="p-6 md:p-8 lg:p-10 flex-1 flex flex-col justify-between">
        <div>
          <p className="text-xs text-gray-500 mb-3 uppercase tracking-wider">
            {new Date(date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            {category && (
              <>
                {" "}
                / <span className="font-medium text-gray-600">{category}</span>
              </>
            )}
          </p>
          <h1 className="font-serif font-normal text-3xl md:text-4xl lg:text-5xl mb-4 text-gray-900">
            {title}
          </h1>
          {displayDescription && (
            <p className="text-base text-gray-600 mb-6 leading-relaxed line-clamp-3">
              {displayDescription}
            </p>
          )}
          <div className="text-sm text-gray-600 space-y-1 mb-4">
            {prepTime && (
              <div>
                <span className="font-semibold">Prep time:</span> {prepTime}
              </div>
            )}
            {cookTime && (
              <div>
                <span className="font-semibold">Cook time:</span> {cookTime}
              </div>
            )}
          </div>
        </div>
        <div className="mt-auto pt-2">
          <Link
            href={`/recipes/${slug}`}
            className="inline-block px-5 py-2 text-xs font-semibold tracking-wider text-gray-700 uppercase bg-gray-100 rounded-sm hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            VIEW RECIPE
          </Link>
        </div>
      </div>
    </article>
  );
}
