import { WalletType } from "@prisma/client";
import { WalletModel } from "../models/wallet.model";

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
    return await WalletModel.create({ data });
  },
  findById: async (id: string) => {
    return await WalletModel.findUnique({ where: { id } });
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
    return await WalletModel.update({ where: { id }, data });
  },
  delete: async (id: string) => {
    return await WalletModel.delete({ where: { id } });
  },
  findByUserId: async (userId: string) => {
    return await WalletModel.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  },
};
