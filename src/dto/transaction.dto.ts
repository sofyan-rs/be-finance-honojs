import { TransactionType } from "@prisma/client";
import type { CategoryDto } from "./category.dto";
import type { WalletDto } from "./wallet.dto";

export interface TransactionDto {
  id: string;
  title: string;
  amount: number;
  type: TransactionType;
  date: string;
  userId: string;
  categoryId: string;
  walletId: string;
  category: CategoryDto;
  wallet: Omit<WalletDto, "income" | "expense">; // Simplified wallet without calculated fields
  createdAt: string;
  modifiedAt: string;
}

export interface CreateTransactionDto {
  title: string;
  amount: number;
  type: TransactionType;
  date: Date;
  userId: string;
  categoryId: string;
  walletId: string;
}

export interface UpdateTransactionDto {
  title?: string;
  amount?: number;
  type?: TransactionType;
  date?: Date;
  categoryId?: string;
  walletId?: string;
}
