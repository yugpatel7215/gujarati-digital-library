import { createCategory } from "@/app/admin/categories/actions";

export default function CategoryForm() {
  return (
    <form
      action={createCategory}
      className="rounded-xl border border-gray-300 bg-white p-6 shadow-sm space-y-5"
    >
      <div>
        <label className="mb-2 block font-medium text-gray-900">
          Category Name
        </label>

        <input
          type="text"
          name="name"
          placeholder="Bhajans"
          required
          className="w-full rounded-lg border px-4 py-3 text-gray-900"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium text-gray-900">
          Description
        </label>

        <textarea
          name="description"
          placeholder="Optional description"
          className="w-full rounded-lg border px-4 py-3 text-gray-900"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium text-gray-900">
          Icon
        </label>

        <input
          type="text"
          name="icon"
          placeholder="book-open"
          className="w-full rounded-lg border px-4 py-3 text-gray-900"
        />
      </div>

      <button
        type="submit"
        className="rounded-lg bg-black px-6 py-3 text-white transition hover:bg-gray-800"
      >
        Create Category
      </button>
    </form>
  );
}