import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <h1 className="text-5xl font-bold mb-6 text-black">
        404 - Page Not Found
      </h1>
      <p className="text-xl mb-10 text-black">
        Oops! The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="text-black hover:underline font-semibold py-3 px-6 border-2 border-black rounded-lg hover:bg-gray-200 transition-colors duration-150 ease-in-out"
      >
        Go back home
      </Link>
    </div>
  );
}
