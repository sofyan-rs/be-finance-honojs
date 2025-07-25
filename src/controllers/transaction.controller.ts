import { Context } from "hono";
import { TransactionService } from "../services/transaction.service";
import { errorResponse, successResponse } from "../utils/response-formatter";

export class TransactionController {
  static async create(c: Context) {
    try {
      const user = c.get("user");
      const body = await c.req.json();

      const transaction = await TransactionService.create({
        ...body,
        userId: user.id,
      });

      return c.json(
        successResponse({
          message: "Transaction created successfully",
          data: transaction,
        })
      );
    } catch (err: any) {
      return c.json(errorResponse({ message: err.message }), err.status);
    }
  }

  static async getById(c: Context) {
    try {
      const { id } = c.req.param();
      const transaction = await TransactionService.getById(id);

      if (!transaction) {
        return c.json(
          { success: false, message: "Transaction not found" },
          404
        );
      }

      return c.json(
        successResponse({
          message: "Transaction fetched successfully",
          data: transaction,
        })
      );
    } catch (err: any) {
      return c.json(errorResponse({ message: err.message }), err.status);
    }
  }

  static async update(c: Context) {
    try {
      const { id } = c.req.param();
      const body = await c.req.json();

      const transaction = await TransactionService.update(id, body);

      return c.json(
        successResponse({
          message: "Transaction updated successfully",
          data: transaction,
        })
      );
    } catch (err: any) {
      return c.json(errorResponse({ message: err.message }), err.status);
    }
  }

  static async delete(c: Context) {
    try {
      const { id } = c.req.param();
      await TransactionService.delete(id);

      return c.json(
        successResponse({
          message: "Transaction deleted successfully",
        })
      );
    } catch (err: any) {
      return c.json(errorResponse({ message: err.message }), err.status);
    }
  }

  static async getAllByUser(c: Context) {
    try {
      const user = c.get("user");
      const { startDate, endDate } = c.req.query();

      const transactions = await TransactionService.getAllByUserId({
        userId: user.id,
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : undefined,
      });

      return c.json(
        successResponse({
          message: "Transactions fetched successfully",
          data: transactions,
        })
      );
    } catch (err: any) {
      return c.json(errorResponse({ message: err.message }), err.status);
    }
  }
}
