import { WalletType } from "@prisma/client";
import { prisma } from "../config/db";

export const WalletRepository = {
  create: async (data: {
    name: string;
    userId: string;
    balance?: number;
    type: WalletType;
    color: string;
  }) => {
    return await prisma.wallet.create({ data });
  },
  findById: async (id: string) => {
    return await prisma.wallet.findUnique({
      where: { id },
      include: {
        transactions: true,
      },
    });
  },
  update: async (
    id: string,
    data: {
      name?: string;
      balance?: number;
      type?: WalletType;
      color?: string;
    }
  ) => {
    return await prisma.wallet.update({ where: { id }, data });
  },
  delete: async (id: string) => {
    return await prisma.$transaction(async (tx) => {
      // First delete all transactions associated with this wallet
      await tx.transaction.deleteMany({
        where: { walletId: id },
      });

      // Then delete the wallet
      return await tx.wallet.delete({ where: { id } });
    });
  },
  findByUserId: async (userId: string) => {
    return await prisma.wallet.findMany({
      where: { userId },
      include: {
        transactions: true,
      },
      orderBy: { createdAt: "desc" },
    });
  },
  calculateBalanceFromTransactions: async (walletId: string) => {
    const incomeResult = await prisma.transaction.aggregate({
      where: {
        walletId,
        type: "income",
      },
      _sum: {
        amount: true,
      },
    });

    const expenseResult = await prisma.transaction.aggregate({
      where: {
        walletId,
        type: "expense",
      },
      _sum: {
        amount: true,
      },
    });

    const income = incomeResult._sum.amount || 0;
    const expense = expenseResult._sum.amount || 0;
    const balance = income - expense;

    return { income, expense, balance };
  },
};
