import { User } from "@prisma/client";
import { prisma } from "../config/db";
import { UserModel } from "../models/user.model";

export const UserRepository = {
  create: (data: { name: string; email: string; password: string }) =>
    UserModel.create({ data }),
  findByEmail: (email: string) => UserModel.findUnique({ where: { email } }),
  findById: (id: string) => UserModel.findUnique({ where: { id } }),
  update: (
    id: string,
    data: { name?: string; email?: string; password?: string },
  ) => {
    return UserModel.update({ where: { id }, data });
  },
};
