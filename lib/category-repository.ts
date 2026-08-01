import { prisma } from "./prisma";

export class CategoryRepository {
  async getAll() {
    return prisma.category.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async getPublishedCategories() {
    return prisma.category.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        name: "asc",
      },
    });
  }

  async getById(id: string) {
    return prisma.category.findUnique({
      where: {
        id,
      },
    });
  }

  async create(data: {
    name: string;
    slug: string;
    description?: string;
    icon?: string;
  }) {
    return prisma.category.create({
      data,
    });
  }

  async update(
    id: string,
    data: {
      name: string;
      slug: string;
      description?: string;
      icon?: string;
      isActive?: boolean;
    }
  ) {
    return prisma.category.update({
      where: {
        id,
      },
      data,
    });
  }

  async toggleActive(id: string) {
    const category = await prisma.category.findUnique({
      where: {
        id,
      },
      select: {
        isActive: true,
      },
    });

    if (!category) {
      throw new Error("Category not found");
    }

    return prisma.category.update({
      where: {
        id,
      },
      data: {
        isActive: !category.isActive,
      },
    });
  }

  
}

export const categoryRepository = new CategoryRepository();