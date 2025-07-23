import { UserSettingModel } from "../models/setting.model";

export const UserSettingRepository = {
  create: async (data: { userId: string; currency?: string }) => {
    return await UserSettingModel.create({ data });
  },
  findById: async (id: string) => {
    return await UserSettingModel.findUnique({ where: { id } });
  },
  findByUserId: async (userId: string) => {
    return await UserSettingModel.findUnique({ where: { userId } });
  },
  update: async (
    id: string,
    data: {
      currency?: string;
    }
  ) => {
    return await UserSettingModel.update({ where: { id }, data });
  },
  updateByUserId: async (
    userId: string,
    data: {
      currency?: string;
    }
  ) => {
    return await UserSettingModel.update({ where: { userId }, data });
  },
  delete: async (id: string) => {
    return await UserSettingModel.delete({ where: { id } });
  },
};
