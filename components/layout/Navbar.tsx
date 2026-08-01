"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const navigation = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Categories",
    href: "/categories",
  },
];

export default function Navbar() {
  const router = useRouter();

  const [query, setQuery] = useState("");

  const handleSearch = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const search = query.trim();

    if (!search) return;

    router.push(`/search?q=${encodeURIComponent(search)}`);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        <Link
          href="/"
          className="text-2xl font-bold text-blue-600"
        >
          Gujarati Digital Library
        </Link>

        <nav className="flex items-center gap-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="font-medium text-gray-700 transition hover:text-blue-600"
            >
              {item.name}
            </Link>
          ))}

          <form onSubmit={handleSearch}>
            <input
  type="text"
  placeholder="Search resources..."
  value={query}
  onChange={(e) => setQuery(e.target.value)}
  className="w-64 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
/>
          </form>
        </nav>

      </div>
    </header>
  );
}