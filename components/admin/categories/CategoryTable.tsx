import CategoryRow from "./CategoryRow";

interface Category {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
}

interface CategoryTableProps {
  categories: Category[];
}

export default function CategoryTable({
  categories,
}: CategoryTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-300 bg-white shadow-sm">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-4 text-left text-black">Name</th>
            <th className="p-4 text-left text-black">Slug</th>
            <th className="p-4 text-left text-black">Status</th>
            <th className="p-4 text-left text-black">Actions</th>
          </tr>
        </thead>

        <tbody>
          {categories.length === 0 ? (
            <tr>
              <td
                colSpan={4}
                className="p-6 text-center text-gray-500"
              >
                No categories found.
              </td>
            </tr>
          ) : (
            categories.map((category) => (
              <CategoryRow
                key={category.id}
                category={category}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}