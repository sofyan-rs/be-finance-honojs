import { prisma } from "../config/db";

export const UserSettingRepository = {
  create: async (data: { userId: string; currency?: string }) => {
    return await prisma.userSetting.create({ data });
  },
  findById: async (id: string) => {
    return await prisma.userSetting.findUnique({ where: { id } });
  },
  findByUserId: async (userId: string) => {
    return await prisma.userSetting.findUnique({ where: { userId } });
  },
  update: async (
    id: string,
    data: {
      currency?: string;
    }
  ) => {
    return await prisma.userSetting.update({ where: { id }, data });
  },
  updateByUserId: async (
    userId: string,
    data: {
      currency?: string;
    }
  ) => {
    return await prisma.userSetting.update({ where: { userId }, data });
  },
  delete: async (id: string) => {
    return await prisma.userSetting.delete({ where: { id } });
  },
};
