import DeleteButton from "./DeleteButton";

interface Category {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
}

interface CategoryRowProps {
  category: Category;
}

export default function CategoryRow({
  category,
}: CategoryRowProps) {
  return (
    <tr className="border-t hover:bg-gray-50 transition">
      <td className="p-3 text-gray-900">
        {category.name}
      </td>

      <td className="p-3 text-gray-900">
        {category.slug}
      </td>

      <td className="p-3">
        <span
          className={`rounded px-2 py-1 text-sm font-medium ${
            category.isActive
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {category.isActive ? "Active" : "Inactive"}
        </span>
      </td>

      <td className="space-x-2 p-3">
        <button className="rounded bg-blue-600 px-3 py-1 text-white hover:bg-blue-700">
          Edit
        </button>

        <DeleteButton categoryId={category.id} />
      </td>
    </tr>
  );
}