"use server";

import { ResourceType } from "@prisma/client"
import { redirect } from "next/navigation";;
import { revalidatePath } from "next/cache";

import { auth } from "@/lib/auth";
import { resourceRepository } from "@/lib/resource-repository";

const RESOURCE_TYPES = new Set(Object.values(ResourceType));

function createSlug(text: string) {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");
}

export async function createResource(formData: FormData) {
    const session = await auth();

    if (!session?.user?.id) {
        throw new Error("Unauthorized");
    }

    const title = formData.get("title")?.toString().trim();
    const language = formData.get("language")?.toString().trim();
    const author = formData.get("author")?.toString().trim();
    const categoryId = formData.get("categoryId")?.toString();
    const typeValue = formData.get("type")?.toString();
    const description = formData.get("description")?.toString().trim();
    const thumbnailUrl = formData.get("thumbnailUrl")?.toString().trim();
    const fileUrl = formData.get("fileUrl")?.toString().trim();
    const externalUrl = formData.get("externalUrl")?.toString().trim();
    if (!title || !language || !categoryId || !typeValue) {
        throw new Error("Missing required fields.");
    }

    if (!RESOURCE_TYPES.has(typeValue as ResourceType)) {
        throw new Error("Invalid resource type.");
    }

    await resourceRepository.create({
        title,
        slug: createSlug(title),
        description,
        author,
        language,
        type: typeValue as ResourceType,
        fileUrl,
        externalUrl,
        thumbnailUrl,
        categoryId,
        createdBy: session.user.id,
    });

    revalidatePath("/admin/resources");
}

export async function deleteResource(id: string) {
  await resourceRepository.delete(id);

  revalidatePath("/admin/resources");
}


export async function updateResource(
  id: string,
  formData: FormData
) {
  const title = formData.get("title") as string;
  const author = formData.get("author") as string;
  const language = formData.get("language") as string;
  const description = formData.get("description") as string;
  const thumbnailUrl = formData.get("thumbnailUrl") as string;
  const fileUrl = formData.get("fileUrl") as string;
  const externalUrl = formData.get("externalUrl") as string;
  const categoryId = formData.get("categoryId") as string;
  const type = formData.get("type") as ResourceType;

  await resourceRepository.update(id, {
    title,
    slug: title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, ""),
    author,
    language,
    description,
    thumbnailUrl,
    fileUrl,
    externalUrl,
    categoryId,
    type,
  });

  revalidatePath("/admin/resources");
  redirect("/admin/resources");
}

export async function togglePublished(id: string) {
  await resourceRepository.togglePublished(id);

  revalidatePath("/admin/resources");
}

export async function toggleFeatured(id: string) {
  await resourceRepository.toggleFeatured(id);

  revalidatePath("/admin/resources");
}