import { WalletRepository } from "../repositories/wallet.repository";
import type { CreateWalletDto, UpdateWalletDto } from "../dto/wallet.dto";
import { toWalletDto } from "../mappers/wallet.mapper";
import { HttpError } from "../errors/http-error";

export class WalletService {
  static async create(data: CreateWalletDto) {
    try {
      const wallet = await WalletRepository.create(data);
      return toWalletDto(wallet);
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
      const wallet = await WalletRepository.update(id, data);
      return toWalletDto(wallet);
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
}
