import { prisma } from "../config/db";

export const UserRepository = {
  create: (data: { name: string; email: string; password: string }) =>
    prisma.user.create({ data }),
  findByEmail: (email: string) => prisma.user.findUnique({ where: { email } }),
  findById: (id: string) => prisma.user.findUnique({ where: { id } }),
  update: (
    id: string,
    data: { name?: string; email?: string; password?: string }
  ) => {
    return prisma.user.update({ where: { id }, data });
  },
};
