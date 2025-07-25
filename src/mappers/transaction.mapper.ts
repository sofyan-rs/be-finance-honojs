import type { Transaction, Category, Wallet } from "@prisma/client";
import type { TransactionDto } from "../dto/transaction.dto";
import { toCategoryDto } from "./category.mapper";

type TransactionWithIncludes = Transaction & {
  category: Category;
  wallet: Wallet;
};

export function toTransactionDto(
  transaction: TransactionWithIncludes
): TransactionDto {
  return {
    id: transaction.id,
    title: transaction.title,
    amount: transaction.amount,
    type: transaction.type,
    date: transaction.date.toISOString(),
    userId: transaction.userId,
    categoryId: transaction.categoryId,
    walletId: transaction.walletId,
    category: toCategoryDto(transaction.category),
    wallet: {
      id: transaction.wallet.id,
      name: transaction.wallet.name,
      balance: transaction.wallet.balance,
      type: transaction.wallet.type,
      color: transaction.wallet.color,
      userId: transaction.wallet.userId,
      createdAt: transaction.wallet.createdAt.toISOString(),
      modifiedAt: transaction.wallet.modifiedAt.toISOString(),
    },
    createdAt: transaction.createdAt.toISOString(),
    modifiedAt: transaction.modifiedAt.toISOString(),
  };
}
