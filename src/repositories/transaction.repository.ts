import { TransactionType } from "@prisma/client";
import { TransactionModel } from "../models/transaction.model";

export const TransactionRepository = {
  create: async (data: {
    title: string;
    amount: number;
    type: TransactionType;
    date: Date;
    userId: string;
    categoryId: string;
    walletId: string;
  }) => {
    return await TransactionModel.create({ data });
  },
  findById: async (id: number) => {
    return await TransactionModel.findUnique({
      where: { id },
      include: {
        category: true,
        wallet: true,
        user: true,
      },
    });
  },
  update: async (
    id: number,
    data: {
      title?: string;
      amount?: number;
      type?: TransactionType;
      date?: Date;
      categoryId?: string;
      walletId?: string;
    }
  ) => {
    return await TransactionModel.update({ where: { id }, data });
  },
  delete: async (id: number) => {
    return await TransactionModel.delete({ where: { id } });
  },
  findByUserId: async (userId: string) => {
    return await TransactionModel.findMany({
      where: { userId },
      include: {
        category: true,
        wallet: true,
      },
      orderBy: {
        date: "desc",
      },
    });
  },
  findByWalletId: async (walletId: string) => {
    return await TransactionModel.findMany({
      where: { walletId },
      include: {
        category: true,
        wallet: true,
      },
      orderBy: {
        date: "desc",
      },
    });
  },
  findByCategoryId: async (categoryId: string) => {
    return await TransactionModel.findMany({
      where: { categoryId },
      include: {
        category: true,
        wallet: true,
      },
      orderBy: {
        date: "desc",
      },
    });
  },
};
