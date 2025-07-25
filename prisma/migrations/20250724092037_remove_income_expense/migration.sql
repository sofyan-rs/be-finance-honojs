/*
  Warnings:

  - You are about to drop the column `expense` on the `Wallet` table. All the data in the column will be lost.
  - You are about to drop the column `income` on the `Wallet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Wallet" DROP COLUMN "expense",
DROP COLUMN "income";
