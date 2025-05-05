import Link from "next/link";

export default function Header() {
  return (
    <section>
      {/* <head>
      </head> */}
      <header className="bg-white drop-shadow-md">
        <nav className="flex flex-row justify-center gap-x-4 px-4 py-3 tracking-wide font-bold text-black font-playfair">
          <Link href="/" className="">
            {" "}
            HOME{" "}
          </Link>
          <Link href="/about" className="transition">
            {" "}
            ABOUT{" "}
          </Link>
          <Link href="/blog" className="transition">
            {" "}
            BLOG{" "}
          </Link>
          <Link href="/recipes" className="transition">
            {" "}
            RECIPES{" "}
          </Link>
        </nav>
      </header>
    </section>
  );
}
