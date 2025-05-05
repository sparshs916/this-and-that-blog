import Image from "next/image";
import Link from "next/link"; // Import Link for the button

interface PostCardProps {
  isOdd: boolean;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  slug: string;
  imageUrl: string;
}

export default function PostCard({
  isOdd,
  title,
  date,
  category,
  excerpt,
  slug,
  imageUrl,
}: PostCardProps) {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    // Increased vertical padding, removed section background/shadow
    <section className="px-4 py-16 md:py-20 text-gray-800 max-w-screen-xl mx-auto">
      <div
        className={`flex flex-col ${
          isOdd ? "md:flex-row-reverse" : "md:flex-row"
        } items-center gap-8 md:gap-16 lg:gap-24`} // Increased gap
      >
        {/* Image Container: Slightly larger width on large screens */}
        <div className="w-full md:w-1/2 lg:w-1/2 flex-shrink-0">
          <Image
            src={imageUrl}
            alt={`Featured image for ${title}`}
            width={700} // Adjusted base width
            height={500} // Adjusted base height
            className="object-cover rounded-md w-full h-auto md:max-h-[500px]" // Slightly rounded corners, removed shadow
          />
        </div>
        {/* Post Content Container: Adjusted width and padding */}
        <div className="w-full md:w-1/2 lg:w-1/2 flex flex-col justify-center">
          {/* Meta information: Adjusted text color and spacing */}
          <p className="text-xs text-gray-500 mb-3 uppercase tracking-wider">
            {formattedDate} /{" "}
            <span className="font-medium text-gray-600">{category}</span>
          </p>
          {/* Title: Use serif font, larger size, adjusted color and margin */}
          <h1 className="font-serif font-normal text-3xl md:text-4xl lg:text-5xl mb-4 text-gray-900">
            {title}
          </h1>
          {/* Excerpt: Adjusted text color, size, and line height */}
          <p className="text-base text-gray-600 mb-6 leading-relaxed">
            {excerpt}
          </p>
          {/* Read More Button: Styled to match the image */}
          <Link href={`/blog/${slug}`} legacyBehavior>
            <a className="self-start font-sans mt-2 px-6 py-2.5 text-xs font-semibold uppercase tracking-widest text-gray-700 rounded-sm bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition duration-200 ease-in-out">
              Read More
            </a>
          </Link>
        </div>{" "}
        {/* Closing tag for post content div */}
      </div>{" "}
      {/* Closing tag for flex container div */}
    </section> /* Closing tag for section */
  );
}
