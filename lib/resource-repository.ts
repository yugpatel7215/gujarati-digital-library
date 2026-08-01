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
  async getPublishedResources() {
    return prisma.resource.findMany({
      where: {
        isPublished: true,
        category: {
          isActive: true,
        },
      },
      include: {
        category: true,
      },
      orderBy: [
        {
          sortOrder: "asc",
        },
        {
          createdAt: "desc",
        },
      ],
    });
  }

  async getLatestResources(limit = 8) {
    return prisma.resource.findMany({
      where: {
        isPublished: true,
        category: {
          isActive: true,
        },
      },
      include: {
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
    });
  }

  async getFeaturedResources(limit = 6) {
    return prisma.resource.findMany({
      where: {
        isPublished: true,
        isFeatured: true,
        category: {
          isActive: true,
        },
      },
      include: {
        category: true,
      },
      orderBy: [
        {
          sortOrder: "asc",
        },
        {
          createdAt: "desc",
        },
      ],
      take: limit,
    });
  }

  async getResourcesByCategorySlug(categorySlug: string) {
    return prisma.resource.findMany({
      where: {
        isPublished: true,
        category: {
          slug: categorySlug,
          isActive: true,
        },
      },
      include: {
        category: true,
      },
      orderBy: [
        {
          sortOrder: "asc",
        },
        {
          createdAt: "desc",
        },
      ],
    });
  }
  async getResourceBySlug(slug: string) {
    return prisma.resource.findUnique({
      where: {
        slug,
      },
      include: {
        category: true,
        admin: true,
      },
    });
  }
  async searchResources(query: string) {
  return prisma.resource.findMany({
    where: {
      isPublished: true,
      category: {
        isActive: true,
      },
      OR: [
        {
          title: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          author: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          language: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: query,
            mode: "insensitive",
          },
        },
      ],
    },
    include: {
      category: true,
    },
    orderBy: [
      {
        sortOrder: "asc",
      },
      {
        createdAt: "desc",
      },
    ],
  });
}
}


export const resourceRepository = new ResourceRepository();