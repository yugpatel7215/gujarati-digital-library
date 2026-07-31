import { prisma } from "./prisma";

export class CategoryRepository {
  async getAll() {
    return prisma.category.findMany({
      orderBy: {
        createdAt: "desc",
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

  async delete(id: string) {
    return prisma.category.update({
      where: {
        id,
      },
      data: {
        isActive: false,
      },
    });
  }
}

export const categoryRepository = new CategoryRepository();