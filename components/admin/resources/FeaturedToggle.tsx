"use client";

import { useTransition } from "react";

import { toggleFeatured } from "@/app/admin/resources/actions";

interface FeaturedToggleProps {
  resourceId: string;
  isFeatured: boolean;
}

export default function FeaturedToggle({
  resourceId,
  isFeatured,
}: FeaturedToggleProps) {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      await toggleFeatured(resourceId);
    });
  };

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className={`min-w-[120px] rounded-lg px-4 py-2 text-sm font-medium text-white transition ${
        isFeatured
          ? "bg-yellow-500 hover:bg-yellow-600"
          : "bg-gray-500 hover:bg-gray-600"
      } disabled:cursor-not-allowed disabled:opacity-50`}
    >
      {isPending
        ? "Updating..."
        : isFeatured
        ? "⭐ Featured"
        : "☆ Normal"}
    </button>
  );
}