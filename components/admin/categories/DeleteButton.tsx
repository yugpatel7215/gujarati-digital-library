import { deleteCategory } from "@/app/admin/categories/actions";

interface DeleteButtonProps {
  categoryId: string;
}

export default function DeleteButton({
  categoryId,
}: DeleteButtonProps) {
  return (
    <form
      action={async () => {
        "use server";
        await deleteCategory(categoryId);
      }}
      className="inline"
    >
      <button
        type="submit"
        className="rounded bg-red-600 px-3 py-1 text-white transition hover:bg-red-700"
      >
        Delete
      </button>
    </form>
  );
}