import { PrismaClient } from "@prisma/client";

// Inisialisasi Prisma Client sekali saja (hindari re-init di dev hot reload)
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
