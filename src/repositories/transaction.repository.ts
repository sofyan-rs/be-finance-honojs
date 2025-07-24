import { TransactionType } from "@prisma/client";
import { prisma } from "../config/db";

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
    return await prisma.transaction.create({ data });
  },
  findById: async (id: number) => {
    return await prisma.transaction.findUnique({
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
    return await prisma.transaction.update({ where: { id }, data });
  },
  delete: async (id: number) => {
    return await prisma.transaction.delete({ where: { id } });
  },
  findByUserId: async (userId: string) => {
    return await prisma.transaction.findMany({
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
    return await prisma.transaction.findMany({
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
    return await prisma.transaction.findMany({
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
