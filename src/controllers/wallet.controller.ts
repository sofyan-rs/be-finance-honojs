import { Context } from "hono";
import { WalletService } from "../services/wallet.service";
import { toWalletDto } from "../mappers/wallet.mapper";
import type { CreateWalletDto, UpdateWalletDto } from "../dto/wallet.dto";

export const createWallet = async (c: Context) => {
  try {
    const user = c.get("user");
    const body: CreateWalletDto = await c.req.json();
    const payload: CreateWalletDto = { ...body, userId: user.id };
    const wallet = await WalletService.create(payload);
    return c.json(wallet);
  } catch (err: unknown) {
    return c.json(
      { error: err instanceof Error ? err.message : String(err) },
      400,
    );
  }
};

export const getWallets = async (c: Context) => {
  try {
    const user = c.get("user");
    const wallets = await WalletService.getAllByUserId(user.id);
    return c.json(wallets);
  } catch (err: unknown) {
    return c.json(
      { error: err instanceof Error ? err.message : String(err) },
      400,
    );
  }
};

export const getWalletById = async (c: Context) => {
  try {
    const id = c.req.param("id");
    const wallet = await WalletService.getById(id);
    if (!wallet) {
      return c.json({ error: "Wallet not found" }, 404);
    }
    return c.json(wallet);
  } catch (err: unknown) {
    return c.json(
      { error: err instanceof Error ? err.message : String(err) },
      400,
    );
  }
};

export const updateWallet = async (c: Context) => {
  try {
    const id = c.req.param("id");
    const body: UpdateWalletDto = await c.req.json();
    const wallet = await WalletService.update(id, body);
    return c.json(wallet);
  } catch (err: unknown) {
    return c.json(
      { error: err instanceof Error ? err.message : String(err) },
      400,
    );
  }
};

export const deleteWallet = async (c: Context) => {
  try {
    const id = c.req.param("id");
    await WalletService.delete(id);
    return c.json({ message: "Wallet deleted successfully" });
  } catch (err: unknown) {
    return c.json(
      { error: err instanceof Error ? err.message : String(err) },
      400,
    );
  }
};
