import { categoryRepository } from "@/lib/category-repository";

import CategoryForm from "@/components/admin/categories/CategoryForm";
import CategoryTable from "@/components/admin/categories/CategoryTable";

export default async function CategoriesPage() {
  const categories = await categoryRepository.getAll();

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-gray-900">
        Categories
      </h1>

      <CategoryForm />

      <CategoryTable categories={categories} />
    </div>
  );
}