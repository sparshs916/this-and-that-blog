// src/app/components/Footer.tsx
import Link from "next/link";
import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-100 border-t border-gray-200 mt-auto">
      <div className="container mx-auto px-4 py-8 text-center text-gray-600">
        <div className="space-x-4">
          <Link
            href="/about"
            className="hover:text-indigo-600 transition-colors"
          >
            About
          </Link>
          <Link
            href="/blog"
            className="hover:text-indigo-600 transition-colors"
          >
            Blog
          </Link>
          <Link
            href="/recipes"
            className="hover:text-indigo-600 transition-colors"
          >
            Recipes
          </Link>
          {/* Add other links as needed */}
        </div>
      </div>
    </footer>
  );
}
