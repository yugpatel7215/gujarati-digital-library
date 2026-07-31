"use client";

import { useTransition } from "react";

import { deleteResource } from "@/app/admin/resources/actions";

interface DeleteButtonProps {
  resourceId: string;
}

export default function DeleteButton({
  resourceId,
}: DeleteButtonProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() => {
        const confirmed = window.confirm(
          "Are you sure you want to delete this resource?"
        );

        if (!confirmed) return;

        startTransition(async () => {
          await deleteResource(resourceId);
        });
      }}
      disabled={isPending}
      className="rounded bg-red-600 px-3 py-1 text-sm text-white transition hover:bg-red-700 disabled:opacity-50"
    >
      {isPending ? "Deleting..." : "Delete"}
    </button>
  );
}