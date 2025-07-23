import { TransactionType } from "@prisma/client";

export interface TransactionDto {
  id: number;
  title: string;
  amount: number;
  type: TransactionType;
  date: string;
  userId: string;
  categoryId: string;
  walletId: string;
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
