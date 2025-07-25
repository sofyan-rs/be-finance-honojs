import { Wallet, Transaction, TransactionType } from "@prisma/client";
import { WalletDto } from "../dto/wallet.dto";

type WalletWithTransactions = Wallet & {
  transactions: Transaction[];
};

export function toWalletDto(wallet: WalletWithTransactions): WalletDto {
  // Calculate income and expense from transactions
  const income = wallet.transactions
    .filter((t) => t.type === TransactionType.income)
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = wallet.transactions
    .filter((t) => t.type === TransactionType.expense)
    .reduce((sum, t) => sum + t.amount, 0);

  return {
    id: wallet.id,
    name: wallet.name,
    balance: wallet.balance,
    income,
    expense,
    type: wallet.type,
    color: wallet.color,
    userId: wallet.userId,
    createdAt: wallet.createdAt.toISOString(),
    modifiedAt: wallet.modifiedAt.toISOString(),
  };
}
