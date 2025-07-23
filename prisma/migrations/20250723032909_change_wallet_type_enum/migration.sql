/*
  Warnings:

  - The values [credit,debit] on the enum `WalletType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "WalletType_new" AS ENUM ('cash', 'bank', 'ewallet', 'investment');
ALTER TABLE "Wallet" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "Wallet" ALTER COLUMN "type" TYPE "WalletType_new" USING ("type"::text::"WalletType_new");
ALTER TYPE "WalletType" RENAME TO "WalletType_old";
ALTER TYPE "WalletType_new" RENAME TO "WalletType";
DROP TYPE "WalletType_old";
ALTER TABLE "Wallet" ALTER COLUMN "type" SET DEFAULT 'cash';
COMMIT;

-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "color" SET DEFAULT '#EF4444';

-- AlterTable
ALTER TABLE "Wallet" ALTER COLUMN "color" SET DEFAULT '#EF4444';
