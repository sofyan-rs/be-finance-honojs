import { TransactionType } from "@prisma/client";
import { prisma } from "../config/db";

export const CategoryRepository = {
  create: async (data: {
    name: string;
    type: TransactionType;
    icon: string;
    color: string;
    userId?: string;
  }) => {
    return await prisma.category.create({ data });
  },
  findById: async (id: string) => {
    return await prisma.category.findUnique({ where: { id } });
  },
  update: async (
    id: string,
    data: {
      name?: string;
      type?: TransactionType;
      icon?: string;
      color?: string;
    }
  ) => {
    return await prisma.category.update({ where: { id }, data });
  },
  delete: async (id: string) => {
    return await prisma.$transaction(async (tx) => {
      // First delete all transactions associated with this category
      await tx.transaction.deleteMany({
        where: { categoryId: id },
      });

      // Then delete the category
      return await tx.category.delete({ where: { id } });
    });
  },
  findByUserId: async (userId: string) => {
    return await prisma.category.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  },
};
