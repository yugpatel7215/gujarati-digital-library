"use client";

import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="relative mx-auto max-w-2xl">
      <Search
        size={22}
        className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        type="text"
        placeholder="Search books, bhajans, aartis..."
        className="w-full rounded-xl border border-gray-200 bg-white py-4 pl-14 pr-5 text-lg text-gray-900 shadow-lg outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
      />
    </div>
  );
}