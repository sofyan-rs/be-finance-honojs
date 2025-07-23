import type { Transaction } from "@prisma/client";
import type { TransactionDto } from "../dto/transaction.dto";

export function toTransactionDto(transaction: Transaction): TransactionDto {
  return {
    id: transaction.id,
    title: transaction.title,
    amount: transaction.amount,
    type: transaction.type,
    date: transaction.date.toISOString(),
    userId: transaction.userId,
    categoryId: transaction.categoryId,
    walletId: transaction.walletId,
    createdAt: transaction.createdAt.toISOString(),
    modifiedAt: transaction.modifiedAt.toISOString(),
  };
}
