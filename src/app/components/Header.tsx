"use client"; // Add this for useState and useEffect

import Link from "next/link";
import { useState, useEffect } from "react";
import { Great_Vibes, Libre_Baskerville } from "next/font/google"; // Import fonts

// Initialize fonts
const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-great-vibes", // Add variable for Tailwind
});

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-libre-baskerville", // Add variable for Tailwind
});

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navLinks = [
    { href: "/", label: "HOME" },
    { href: "/about", label: "ABOUT" },
    { href: "/blog", label: "BLOG" },
    { href: "/recipes", label: "RECIPES" },
  ];

  return (
    <header
      className={`${greatVibes.variable} ${libreBaskerville.variable} bg-white drop-shadow-md sticky top-0 z-50`}
    >
      <nav className="container mx-auto flex items-center justify-between px-4 py-3 tracking-wide text-black">
        <div className="text-lg font-semibold">
          <Link
            href="/"
            className="hover:text-indigo-600 transition-colors flex items-baseline"
          >
            <span
              className={`${libreBaskerville.className} text-black text-base`}
            >
              This
            </span>
            <span
              className={`${libreBaskerville.className} text-gray-500 text-xs px-1`}
            >
              and
            </span>
            <span className={`${greatVibes.className} text-black text-xl`}>
              That
            </span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-x-4 font-playfair font-bold">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-indigo-600 transition-colors px-2 py-1 text-black"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
            className="text-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 p-2 rounded-md"
          >
            {isMobileMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg py-2 z-40">
          <div className="container mx-auto flex flex-col items-center gap-y-2 px-4 font-playfair font-bold">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block w-full text-center hover:bg-indigo-50 hover:text-indigo-600 transition-colors px-4 py-2 rounded-md text-black"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
