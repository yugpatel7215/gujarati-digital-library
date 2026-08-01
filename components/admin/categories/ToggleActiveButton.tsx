"use client";

import { useTransition } from "react";
import { toggleCategoryActive } from "@/app/admin/categories/actions";

interface ToggleActiveButtonProps {
  categoryId: string;
  isActive: boolean;
}

export default function ToggleActiveButton({
  categoryId,
  isActive,
}: ToggleActiveButtonProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() =>
        startTransition(async () => {
          await toggleCategoryActive(categoryId);
        })
      }
      disabled={isPending}
      className={`rounded px-3 py-1 text-white transition ${
        isActive
          ? "bg-yellow-600 hover:bg-yellow-700"
          : "bg-green-600 hover:bg-green-700"
      } disabled:opacity-50`}
    >
      {isPending
        ? "Updating..."
        : isActive
        ? "Deactivate"
        : "Activate"}
    </button>
  );
}