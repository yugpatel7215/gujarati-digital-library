import { notFound } from "next/navigation";

import ResourceForm from "@/components/admin/resources/ResourceForm";
import { categoryRepository } from "@/lib/category-repository";
import { resourceRepository } from "@/lib/resource-repository";

interface EditResourcePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditResourcePage({
  params,
}: EditResourcePageProps) {
  const { id } = await params;

  const resource = await resourceRepository.getById(id);

  if (!resource) {
    notFound();
  }

  const categories = await categoryRepository.getAll();

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-gray-900">
        Edit Resource
      </h1>

      <ResourceForm
        categories={categories}
        resource={{
          id: resource.id,
          title: resource.title,
          author: resource.author,
          language: resource.language,
          description: resource.description,
          thumbnailUrl: resource.thumbnailUrl,
          fileUrl: resource.fileUrl,
          externalUrl: resource.externalUrl,
          type: resource.type,
          categoryId: resource.categoryId,
        }}
      />
    </div>
  );
}