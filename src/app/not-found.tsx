import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div className="container mx-auto text-center py-20">
      <h1 className="text-4xl font-bold mb-4 text-black dark:text-white">
        404 - Page Not Found
      </h1>
      <p className="text-lg mb-8 text-black dark:text-gray-300">
        Oops! The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="text-blue-600 dark:text-blue-400 hover:underline"
      >
        Go back home
      </Link>
    </div>
  );
}
