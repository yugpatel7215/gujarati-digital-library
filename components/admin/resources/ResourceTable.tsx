import ResourceRow from "./ResourceRow";

interface ResourceTableProps {
  resources: {
    id: string;
    title: string;
    type: string;
    author: string | null;
    isPublished: boolean;
    isFeatured: boolean;
    category: {
      name: string;
    };
  }[];
}

export default function ResourceTable({
  resources,
}: ResourceTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-300 bg-white shadow-sm">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-4 text-left text-black">Title</th>
            <th className="p-4 text-left text-black">Category</th>
            <th className="p-4 text-left text-black">Type</th>
            <th className="p-4 text-left text-black">Author</th>
            <th className="p-4 text-left text-black">Published</th>
            <th className="p-4 text-left text-black">Featured</th>
            <th className="p-4 text-left text-black">Actions</th>
          </tr>
        </thead>

        <tbody>
          {resources.length === 0 ? (
            <tr>
              <td
                colSpan={7}
                className="p-8 text-center text-gray-500"
              >
                📚 No resources found.
              </td>
            </tr>
          ) : (
            resources.map((resource) => (
              <ResourceRow
                key={resource.id}
                resource={resource}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}