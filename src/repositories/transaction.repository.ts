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
  findById: async (id: string) => {
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
    id: string,
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
  delete: async (id: string) => {
    return await prisma.transaction.delete({ where: { id } });
  },
  findByUserId: async ({
    userId,
    startDate,
    endDate,
  }: {
    userId: string;
    startDate?: Date;
    endDate?: Date;
  }) => {
    return await prisma.transaction.findMany({
      where: {
        userId,
        date: { gte: startDate, lte: endDate },
      },
      include: { category: true, wallet: true },
      orderBy: { date: "desc" },
    });
  },
};
