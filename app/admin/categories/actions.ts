"use server";

import { revalidatePath } from "next/cache";
import { categoryRepository } from "@/lib/category-repository";

function createSlug(name: string) {
  return name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
}

export async function createCategory(formData: FormData): Promise<void> {
  const name = formData.get("name")?.toString().trim();

  if (!name) {
    throw new Error("Category name is required.");
  }

  const description =
    formData.get("description")?.toString().trim() || undefined;

  const icon =
    formData.get("icon")?.toString().trim() || undefined;

  await categoryRepository.create({
    name,
    slug: createSlug(name),
    description,
    icon,
  });

  revalidatePath("/admin/categories");
}

export async function deleteCategory(id: string) {
  await categoryRepository.delete(id);

  revalidatePath("/admin/categories");
}

export async function updateCategory(
  id: string,
  formData: FormData
) {
  const name = formData.get("name")?.toString().trim();

  if (!name) {
    throw new Error("Category name is required.");
  }

  const slug = createSlug(name);

  await categoryRepository.update(id, {
    name,
    slug,
  });

  revalidatePath("/admin/categories");
  revalidatePath(`/admin/categories/${id}/edit`);
}