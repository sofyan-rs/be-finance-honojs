import { Context } from "hono";
import { TransactionService } from "../services/transaction.service";
import { HttpError } from "../errors/http-error";

export class TransactionController {
  static async create(c: Context) {
    try {
      const user = c.get("user");
      const body = await c.req.json();

      const transaction = await TransactionService.create({
        ...body,
        userId: user.id,
      });

      return c.json({ success: true, data: transaction }, 201);
    } catch (err: unknown) {
      return c.json(
        { error: err instanceof Error ? err.message : String(err) },
        400
      );
    }
  }

  static async getById(c: Context) {
    try {
      const { id } = c.req.param();
      const transaction = await TransactionService.getById(parseInt(id));

      if (!transaction) {
        return c.json({ error: "Transaction not found" }, 404);
      }

      return c.json({ success: true, data: transaction });
    } catch (err: unknown) {
      return c.json(
        { error: err instanceof Error ? err.message : String(err) },
        400
      );
    }
  }

  static async update(c: Context) {
    try {
      const { id } = c.req.param();
      const body = await c.req.json();

      const transaction = await TransactionService.update(parseInt(id), body);

      return c.json({ success: true, data: transaction });
    } catch (err: unknown) {
      return c.json(
        { error: err instanceof Error ? err.message : String(err) },
        400
      );
    }
  }

  static async delete(c: Context) {
    try {
      const { id } = c.req.param();
      await TransactionService.delete(parseInt(id));

      return c.json({
        success: true,
        message: "Transaction deleted successfully",
      });
    } catch (err: unknown) {
      return c.json(
        { error: err instanceof Error ? err.message : String(err) },
        400
      );
    }
  }

  static async getAllByUser(c: Context) {
    try {
      const user = c.get("user");
      const transactions = await TransactionService.getAllByUserId(user.id);

      return c.json({ success: true, data: transactions });
    } catch (err: unknown) {
      return c.json(
        { error: err instanceof Error ? err.message : String(err) },
        400
      );
    }
  }

  static async getAllByWallet(c: Context) {
    try {
      const { walletId } = c.req.param();
      const transactions = await TransactionService.getAllByWalletId(walletId);

      return c.json({ success: true, data: transactions });
    } catch (err: unknown) {
      return c.json(
        { error: err instanceof Error ? err.message : String(err) },
        400
      );
    }
  }

  static async getAllByCategory(c: Context) {
    try {
      const { categoryId } = c.req.param();
      const transactions = await TransactionService.getAllByCategoryId(
        categoryId
      );

      return c.json({ success: true, data: transactions });
    } catch (err: unknown) {
      return c.json(
        { error: err instanceof Error ? err.message : String(err) },
        400
      );
    }
  }
}
