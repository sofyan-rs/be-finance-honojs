import { WalletRepository } from "../repositories/wallet.repository";
import type { CreateWalletDto, UpdateWalletDto } from "../dto/wallet.dto";
import { toWalletDto } from "../mappers/wallet.mapper";
import { HttpError } from "../errors/http-error";

export class WalletService {
  static async create(data: CreateWalletDto) {
    try {
      const wallet = await WalletRepository.create(data);
      // Fetch the wallet with transactions to calculate balance properly
      const walletWithTransactions = await WalletRepository.findById(wallet.id);
      return walletWithTransactions
        ? toWalletDto(walletWithTransactions)
        : null;
    } catch (error: unknown) {
      throw new HttpError(
        error instanceof Error ? error.message : "Failed to create wallet",
        500
      );
    }
  }

  static async getById(id: string) {
    try {
      const wallet = await WalletRepository.findById(id);
      return wallet ? toWalletDto(wallet) : null;
    } catch (error: unknown) {
      throw new HttpError(
        error instanceof Error ? error.message : "Failed to get wallet",
        500
      );
    }
  }

  static async update(id: string, data: UpdateWalletDto) {
    try {
      await WalletRepository.update(id, data);
      // Fetch the updated wallet with transactions
      const wallet = await WalletRepository.findById(id);
      return wallet ? toWalletDto(wallet) : null;
    } catch (error: unknown) {
      throw new HttpError(
        error instanceof Error ? error.message : "Failed to update wallet",
        500
      );
    }
  }

  static async delete(id: string) {
    try {
      await WalletRepository.delete(id);
    } catch (error: unknown) {
      throw new HttpError(
        error instanceof Error ? error.message : "Failed to delete wallet",
        500
      );
    }
  }

  static async getAllByUserId(userId: string) {
    try {
      const wallets = await WalletRepository.findByUserId(userId);
      return wallets.map(toWalletDto);
    } catch (error: unknown) {
      throw new HttpError(
        error instanceof Error ? error.message : "Failed to get wallets",
        500
      );
    }
  }

  static async getSummaryByUserId(userId: string) {
    try {
      const wallets = await WalletRepository.findByUserId(userId);
      const walletsDto = wallets.map(toWalletDto);

      const totalBalance = walletsDto.reduce(
        (sum, wallet) => sum + wallet.balance,
        0
      );
      const totalIncome = walletsDto.reduce(
        (sum, wallet) => sum + wallet.income,
        0
      );
      const totalExpense = walletsDto.reduce(
        (sum, wallet) => sum + wallet.expense,
        0
      );

      return {
        totalBalance,
        totalIncome,
        totalExpense,
      };
    } catch (error: unknown) {
      throw new HttpError(
        error instanceof Error ? error.message : "Failed to get wallet summary",
        500
      );
    }
  }

  static async getDetailedSummaryByUserId(userId: string) {
    try {
      const wallets = await WalletRepository.findByUserId(userId);
      const walletsDto = wallets.map(toWalletDto);

      const overall = {
        totalBalance: walletsDto.reduce(
          (sum, wallet) => sum + wallet.balance,
          0
        ),
        totalIncome: walletsDto.reduce((sum, wallet) => sum + wallet.income, 0),
        totalExpense: walletsDto.reduce(
          (sum, wallet) => sum + wallet.expense,
          0
        ),
      };

      const walletsData = walletsDto.map((wallet) => ({
        id: wallet.id,
        name: wallet.name,
        balance: wallet.balance,
        income: wallet.income,
        expense: wallet.expense,
        type: wallet.type,
        color: wallet.color,
      }));

      return {
        overall,
        wallets: walletsData,
      };
    } catch (error: unknown) {
      throw new HttpError(
        error instanceof Error
          ? error.message
          : "Failed to get detailed wallet summary",
        500
      );
    }
  }
}
