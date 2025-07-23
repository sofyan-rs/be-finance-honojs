-- CreateEnum
CREATE TYPE "WalletType" AS ENUM ('cash', 'bank', 'credit', 'debit', 'investment');

-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_userId_fkey";

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "color" TEXT NOT NULL DEFAULT '#000000',
ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "UserSetting" ALTER COLUMN "currency" SET DEFAULT 'IDR';

-- AlterTable
ALTER TABLE "Wallet" ADD COLUMN     "color" TEXT NOT NULL DEFAULT '#000000',
ADD COLUMN     "expense" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "income" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "type" "WalletType" NOT NULL DEFAULT 'cash';

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
