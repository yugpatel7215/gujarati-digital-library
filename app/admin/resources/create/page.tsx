import { categoryRepository } from "@/lib/category-repository";

import ResourceForm from "@/components/admin/resources/ResourceForm";

export default async function CreateResourcePage() {
  const categories = await categoryRepository.getAll();

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-gray-900">
        Create Resource
      </h1>

      <ResourceForm categories={categories} />
    </div>
  );
}