import { TransactionType } from "@prisma/client";
import { CategoryModel } from "../models/category.model";

export const CategoryRepository = {
  create: async (data: {
    name: string;
    type: TransactionType;
    icon: string;
    color: string;
    userId?: string;
  }) => {
    return await CategoryModel.create({ data });
  },
  findById: async (id: string) => {
    return await CategoryModel.findUnique({ where: { id } });
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
    return await CategoryModel.update({ where: { id }, data });
  },
  delete: async (id: string) => {
    return await CategoryModel.delete({ where: { id } });
  },
  findByUserId: async (userId: string) => {
    return await CategoryModel.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  },
};
