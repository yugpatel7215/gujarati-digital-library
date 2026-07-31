import { prisma } from "./prisma";
import { ResourceType } from "@prisma/client";

export class ResourceRepository {
  async getAll() {
    return prisma.resource.findMany({
      include: {
        category: true,
        admin: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async getById(id: string) {
    return prisma.resource.findUnique({
      where: {
        id,
      },
      include: {
        category: true,
        admin: true,
      },
    });
  }

  async create(data: {
    title: string;
    slug: string;
    description?: string;
    author?: string;
    language: string;
    type: ResourceType;
    fileUrl?: string;
    externalUrl?: string;
    thumbnailUrl?: string;
    categoryId: string;
    createdBy: string;

  }) {
    return prisma.resource.create({
      data,
    });
  }
  async update(
    id: string,
    data: Partial<{
      title: string;
      slug: string;
      description: string;
      author: string;
      language: string;
      type: ResourceType;
      fileUrl: string;
      externalUrl: string;
      thumbnailUrl: string;
      isPublished: boolean;
      isFeatured: boolean;
      sortOrder: number;
      categoryId: string;
    }>
  ) {
    return prisma.resource.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: string) {
    return prisma.resource.delete({
      where: {
        id,
      },
    });
  }

  async togglePublished(id: string) {
    const resource = await prisma.resource.findUnique({
      where: {
        id,
      },
      select: {
        isPublished: true,
      },
    });

    if (!resource) {
      throw new Error("Resource not found");
    }

    return prisma.resource.update({
      where: {
        id,
      },
      data: {
        isPublished: !resource.isPublished,
      },
    });
  }
  async toggleFeatured(id: string) {
    const resource = await prisma.resource.findUnique({
      where: {
        id,
      },
      select: {
        isFeatured: true,
      },
    });

    if (!resource) {
      throw new Error("Resource not found");
    }

    return prisma.resource.update({
      where: {
        id,
      },
      data: {
        isFeatured: !resource.isFeatured,
      },
    });
  }
}

export const resourceRepository = new ResourceRepository();