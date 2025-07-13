import { Wallet } from "@prisma/client";
import { WalletDto } from "../dto/wallet.dto";

export function toWalletDto(wallet: Wallet): WalletDto {
  return {
    id: wallet.id,
    name: wallet.name,
    balance: wallet.balance,
    userId: wallet.userId,
    createdAt: wallet.createdAt.toISOString(),
    modifiedAt: wallet.modifiedAt.toISOString(),
  };
}
