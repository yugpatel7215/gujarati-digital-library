"use client";

import { useTransition } from "react";

import { togglePublished } from "@/app/admin/resources/actions";

interface PublishToggleProps {
  resourceId: string;
  isPublished: boolean;
}

export default function PublishToggle({
  resourceId,
  isPublished,
}: PublishToggleProps) {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      await togglePublished(resourceId);
    });
  };

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className={`min-w-30 rounded-lg px-4 py-2 text-sm font-medium text-white transition ${
        isPublished
          ? "bg-green-600 hover:bg-green-700"
          : "bg-red-600 hover:bg-red-700"
      } disabled:cursor-not-allowed disabled:opacity-50`}
    >
      {isPending
        ? "Updating..."
        : isPublished
        ? "🟢 Published"
        : "🔴 Unpublished"}
    </button>
  );
}