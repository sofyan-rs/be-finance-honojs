import { WalletType } from "@prisma/client";
import { prisma } from "../config/db";

export const WalletRepository = {
  create: async (data: {
    name: string;
    userId: string;
    balance?: number;
    income?: number;
    expense?: number;
    type: WalletType;
    color: string;
  }) => {
    return await prisma.wallet.create({ data });
  },
  findById: async (id: string) => {
    return await prisma.wallet.findUnique({ where: { id } });
  },
  update: async (
    id: string,
    data: {
      name?: string;
      balance?: number;
      income?: number;
      expense?: number;
      type?: WalletType;
      color?: string;
    }
  ) => {
    return await prisma.wallet.update({ where: { id }, data });
  },
  delete: async (id: string) => {
    return await prisma.wallet.delete({ where: { id } });
  },
  findByUserId: async (userId: string) => {
    return await prisma.wallet.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  },
};
