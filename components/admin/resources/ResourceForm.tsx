import { ResourceType } from "@prisma/client";

import {
  createResource,
  updateResource,
} from "@/app/admin/resources/actions";

interface Category {
  id: string;
  name: string;
}

interface Resource {
  id: string;
  title: string;
  author: string | null;
  language: string;
  description: string | null;
  thumbnailUrl: string | null;
  fileUrl: string | null;
  externalUrl: string | null;
  type: ResourceType;
  categoryId: string;
}

interface ResourceFormProps {
  categories: Category[];
  resource?: Resource;
}

export default function ResourceForm({
  categories,
  resource,
}: ResourceFormProps) {
  const formAction = resource
    ? updateResource.bind(null, resource.id)
    : createResource;

  return (
    <form
      action={formAction}
      className="space-y-6 rounded-xl border bg-white p-6 shadow"
    >
      <div>
        <label className="mb-2 block font-medium text-gray-700">
          Title
        </label>

        <input
          name="title"
          required
          defaultValue={resource?.title}
          className="w-full rounded-lg border border-gray-300 p-3 text-gray-900"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium text-gray-700">
          Author
        </label>

        <input
          name="author"
          defaultValue={resource?.author ?? ""}
          className="w-full rounded-lg border border-gray-300 p-3 text-gray-900"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium text-gray-700">
          Language
        </label>

        <input
          name="language"
          defaultValue={resource?.language ?? "Gujarati"}
          className="w-full rounded-lg border border-gray-300 p-3 text-gray-900"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium text-gray-700">
          Category
        </label>

        <select
          name="categoryId"
          required
          defaultValue={resource?.categoryId}
          className="w-full rounded-lg border border-gray-300 p-3 text-gray-900"
        >
          <option value="">Select Category</option>

          {categories.map((category) => (
            <option
              key={category.id}
              value={category.id}
            >
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block font-medium text-gray-700">
          Resource Type
        </label>

        <select
          name="type"
          defaultValue={resource?.type}
          className="w-full rounded-lg border border-gray-300 p-3 text-gray-900"
        >
          {Object.values(ResourceType).map((type) => (
            <option
              key={type}
              value={type}
            >
              {type}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block font-medium text-gray-700">
          Description
        </label>

        <textarea
          name="description"
          rows={4}
          defaultValue={resource?.description ?? ""}
          className="w-full rounded-lg border border-gray-300 p-3 text-gray-900"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium text-gray-700">
          Thumbnail URL
        </label>

        <input
          name="thumbnailUrl"
          defaultValue={resource?.thumbnailUrl ?? ""}
          className="w-full rounded-lg border border-gray-300 p-3 text-gray-900"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium text-gray-700">
          File URL
        </label>

        <input
          name="fileUrl"
          defaultValue={resource?.fileUrl ?? ""}
          className="w-full rounded-lg border border-gray-300 p-3 text-gray-900"
          placeholder="Only for PDF, Audio, Video"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium text-gray-700">
          External URL
        </label>

        <input
          name="externalUrl"
          defaultValue={resource?.externalUrl ?? ""}
          className="w-full rounded-lg border border-gray-300 p-3 text-gray-900"
          placeholder="Only for External Links"
        />
      </div>

      <button
        type="submit"
        className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
      >
        {resource ? "Update Resource" : "Create Resource"}
      </button>
    </form>
  );
}