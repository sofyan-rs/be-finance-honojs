import { Context } from "hono";
import { WalletService } from "../services/wallet.service";
import type { CreateWalletDto, UpdateWalletDto } from "../dto/wallet.dto";
import { errorResponse, successResponse } from "../utils/response-formatter";

export const createWallet = async (c: Context) => {
  try {
    const user = c.get("user");
    const body: CreateWalletDto = await c.req.json();
    const payload: CreateWalletDto = { ...body, userId: user.id };
    const wallet = await WalletService.create(payload);
    return c.json(
      successResponse({
        message: "Wallet created successfully",
        data: wallet,
      })
    );
  } catch (err: any) {
    return c.json(errorResponse({ message: err.message }), err.status);
  }
};

export const getWallets = async (c: Context) => {
  try {
    const user = c.get("user");
    const wallets = await WalletService.getAllByUserId(user.id);
    return c.json(
      successResponse({
        message: "Wallets fetched successfully",
        data: wallets,
      })
    );
  } catch (err: any) {
    return c.json(errorResponse({ message: err.message }), err.status);
  }
};

export const getWalletById = async (c: Context) => {
  try {
    const id = c.req.param("id");
    const wallet = await WalletService.getById(id);
    if (!wallet) {
      return c.json({ success: false, message: "Wallet not found" }, 404);
    }
    return c.json(
      successResponse({
        message: "Wallet fetched successfully",
        data: wallet,
      })
    );
  } catch (err: any) {
    return c.json(errorResponse({ message: err.message }), err.status);
  }
};

export const updateWallet = async (c: Context) => {
  try {
    const id = c.req.param("id");
    const body: UpdateWalletDto = await c.req.json();
    const wallet = await WalletService.update(id, body);
    return c.json(
      successResponse({
        message: "Wallet updated successfully",
        data: wallet,
      })
    );
  } catch (err: any) {
    return c.json(errorResponse({ message: err.message }), err.status);
  }
};

export const deleteWallet = async (c: Context) => {
  try {
    const id = c.req.param("id");
    await WalletService.delete(id);
    return c.json(
      successResponse({
        message: "Wallet deleted successfully",
        data: null,
      })
    );
  } catch (err: any) {
    return c.json(errorResponse({ message: err.message }), err.status);
  }
};

export const getWalletsSummary = async (c: Context) => {
  try {
    const user = c.get("user");
    const summary = await WalletService.getSummaryByUserId(user.id);
    return c.json(
      successResponse({
        message: "Wallet summary fetched successfully",
        data: summary,
      })
    );
  } catch (err: any) {
    return c.json(errorResponse({ message: err.message }), err.status);
  }
};

export const getDetailedWalletsSummary = async (c: Context) => {
  try {
    const user = c.get("user");
    const summary = await WalletService.getDetailedSummaryByUserId(user.id);
    return c.json(
      successResponse({
        message: "Detailed wallet summary fetched successfully",
        data: summary,
      })
    );
  } catch (err: any) {
    return c.json(errorResponse({ message: err.message }), err.status);
  }
};
