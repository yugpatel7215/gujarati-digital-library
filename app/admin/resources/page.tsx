import Link from "next/link";

import ResourceTable from "@/components/admin/resources/ResourceTable";
import { resourceRepository } from "@/lib/resource-repository";

export default async function ResourcesPage() {
  const resources = await resourceRepository.getAll();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold text-gray-900">
          Resources
        </h1>

        <Link
          href="/admin/resources/create"
          className="rounded-lg bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700"
        >
          + Add Resource
        </Link>
      </div>

      <ResourceTable resources={resources} />
    </div>
  );
}