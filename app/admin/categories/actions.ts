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
  revalidatePath("/");
}

export async function updateCategory(
  id: string,
  formData: FormData
) {
  const name = formData.get("name")?.toString().trim();

  if (!name) {
    throw new Error("Category name is required.");
  }

  const description =
    formData.get("description")?.toString().trim() || undefined;

  const icon =
    formData.get("icon")?.toString().trim() || undefined;

  await categoryRepository.update(id, {
    name,
    slug: createSlug(name),
    description,
    icon,
  });

  revalidatePath("/admin/categories");
  revalidatePath(`/admin/categories/${id}/edit`);
  revalidatePath("/");
}

export async function toggleCategoryActive(id: string) {
  await categoryRepository.toggleActive(id);

  revalidatePath("/admin/categories");
  revalidatePath("/");
}

