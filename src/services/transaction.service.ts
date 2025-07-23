import { TransactionRepository } from "../repositories/transaction.repository";
import type {
  CreateTransactionDto,
  UpdateTransactionDto,
} from "../dto/transaction.dto";
import { toTransactionDto } from "../mappers/transaction.mapper";
import { HttpError } from "../errors/http-error";

export class TransactionService {
  static async create(data: CreateTransactionDto) {
    try {
      const transaction = await TransactionRepository.create(data);
      return toTransactionDto(transaction);
    } catch (error: unknown) {
      throw new HttpError(
        error instanceof Error ? error.message : "Failed to create transaction",
        500
      );
    }
  }

  static async getById(id: number) {
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

  static async update(id: number, data: UpdateTransactionDto) {
    try {
      const transaction = await TransactionRepository.update(id, data);
      return toTransactionDto(transaction);
    } catch (error: unknown) {
      throw new HttpError(
        error instanceof Error ? error.message : "Failed to update transaction",
        500
      );
    }
  }

  static async delete(id: number) {
    try {
      await TransactionRepository.delete(id);
    } catch (error: unknown) {
      throw new HttpError(
        error instanceof Error ? error.message : "Failed to delete transaction",
        500
      );
    }
  }

  static async getAllByUserId(userId: string) {
    try {
      const transactions = await TransactionRepository.findByUserId(userId);
      return transactions.map(toTransactionDto);
    } catch (error: unknown) {
      throw new HttpError(
        error instanceof Error ? error.message : "Failed to get transactions",
        500
      );
    }
  }

  static async getAllByWalletId(walletId: string) {
    try {
      const transactions = await TransactionRepository.findByWalletId(walletId);
      return transactions.map(toTransactionDto);
    } catch (error: unknown) {
      throw new HttpError(
        error instanceof Error
          ? error.message
          : "Failed to get wallet transactions",
        500
      );
    }
  }

  static async getAllByCategoryId(categoryId: string) {
    try {
      const transactions = await TransactionRepository.findByCategoryId(
        categoryId
      );
      return transactions.map(toTransactionDto);
    } catch (error: unknown) {
      throw new HttpError(
        error instanceof Error
          ? error.message
          : "Failed to get category transactions",
        500
      );
    }
  }
}
