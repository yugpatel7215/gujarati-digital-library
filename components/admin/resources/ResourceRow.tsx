import Link from "next/link";

import DeleteButton from "./DeleteButton";
import FeaturedToggle from "./FeaturedToggle";
import PublishToggle from "./PublishToggle";

interface ResourceRowProps {
  resource: {
    id: string;
    title: string;
    type: string;
    author: string | null;
    isPublished: boolean;
    isFeatured: boolean;
    category: {
      name: string;
    };
  };
}

function formatResourceType(type: string) {
  return type
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function ResourceRow({
  resource,
}: ResourceRowProps) {
  return (
    <tr className="border-t transition hover:bg-gray-50">
      <td className="p-4 text-gray-900">
        {resource.title}
      </td>

      <td className="p-4 text-gray-900">
        {resource.category.name}
      </td>

      <td className="p-4 text-gray-900">
        {formatResourceType(resource.type)}
      </td>

      <td className="p-4 text-gray-900">
        {resource.author ?? "-"}
      </td>

      <td className="p-4">
        <PublishToggle
          resourceId={resource.id}
          isPublished={resource.isPublished}
        />
      </td>

      <td className="p-4">
        <FeaturedToggle
          resourceId={resource.id}
          isFeatured={resource.isFeatured}
        />
      </td>

      <td className="p-4">
        <div className="flex gap-2">
          <Link
            href={`/admin/resources/${resource.id}/edit`}
            className="rounded bg-blue-600 px-3 py-1 text-sm text-white transition hover:bg-blue-700"
          >
            Edit
          </Link>

          <DeleteButton resourceId={resource.id} />
        </div>
      </td>
    </tr>
  );
}