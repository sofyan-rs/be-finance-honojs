import { WalletType } from "@prisma/client";

export interface WalletDto {
  id: string;
  name: string;
  balance: number;
  income: number;
  expense: number;
  type: WalletType;
  color: string;
  userId: string;
  createdAt: string;
  modifiedAt: string;
}

export interface CreateWalletDto {
  name: string;
  type: WalletType;
  color: string;
  userId: string;
}

export interface UpdateWalletDto {
  name?: string;
  type?: WalletType;
  color?: string;
}

export interface WalletSummaryDto {
  totalBalance: number;
  totalIncome: number;
  totalExpense: number;
}

export interface IndividualWalletSummaryDto {
  id: string;
  name: string;
  balance: number;
  income: number;
  expense: number;
  type: WalletType;
  color: string;
}

export interface AllWalletsSummaryDto {
  overall: WalletSummaryDto;
  wallets: IndividualWalletSummaryDto[];
}
