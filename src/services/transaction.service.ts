import { TransactionRepository } from "../repositories/transaction.repository";
import type {
  CreateTransactionDto,
  UpdateTransactionDto,
} from "../dto/transaction.dto";
import { toTransactionDto } from "../mappers/transaction.mapper";
import { HttpError } from "../errors/http-error";
import { WalletRepository } from "../repositories/wallet.repository";
import { TransactionType } from "@prisma/client";

export class TransactionService {
  static async create(data: CreateTransactionDto) {
    try {
      const transaction = await TransactionRepository.create(data);
      const transactionWithIncludes = await TransactionRepository.findById(
        transaction.id
      );
      if (!transactionWithIncludes) {
        throw new Error("Failed to fetch created transaction");
      }
      // Get previous balance
      const previousBalance = await WalletRepository.findById(
        transactionWithIncludes.walletId
      );
      if (!previousBalance) {
        throw new Error("Failed to fetch previous balance");
      }

      // Update balance
      await WalletRepository.update(transactionWithIncludes.walletId, {
        balance:
          transactionWithIncludes.type === TransactionType.income
            ? previousBalance.balance + transactionWithIncludes.amount
            : previousBalance.balance - transactionWithIncludes.amount,
      });

      return toTransactionDto(transactionWithIncludes);
    } catch (error: unknown) {
      throw new HttpError(
        error instanceof Error ? error.message : "Failed to create transaction",
        500
      );
    }
  }

  static async getById(id: string) {
    try {
      const transaction = await TransactionRepository.findById(id);
      return transaction ? toTransactionDto(transaction) : null;
    } catch (error: unknown) {
      throw new HttpError(
        error instanceof Error ? error.message : "Failed to get transaction",
        500
      );
    }
  }

  static async update(id: string, data: UpdateTransactionDto) {
    try {
      const transaction = await TransactionRepository.update(id, data);
      const transactionWithIncludes = await TransactionRepository.findById(
        transaction.id
      );
      if (!transactionWithIncludes) {
        throw new Error("Failed to fetch updated transaction");
      }
      return toTransactionDto(transactionWithIncludes);
    } catch (error: unknown) {
      throw new HttpError(
        error instanceof Error ? error.message : "Failed to update transaction",
        500
      );
    }
  }

  static async delete(id: string) {
    try {
      await TransactionRepository.delete(id);
    } catch (error: unknown) {
      throw new HttpError(
        error instanceof Error ? error.message : "Failed to delete transaction",
        500
      );
    }
  }

  static async getAllByUserId({
    userId,
    startDate,
    endDate,
  }: {
    userId: string;
    startDate?: Date;
    endDate?: Date;
  }) {
    try {
      const transactions = await TransactionRepository.findByUserId({
        userId,
        startDate,
        endDate,
      });
      return transactions.map(toTransactionDto);
    } catch (error: unknown) {
      throw new HttpError(
        error instanceof Error ? error.message : "Failed to get transactions",
        500
      );
    }
  }
}
