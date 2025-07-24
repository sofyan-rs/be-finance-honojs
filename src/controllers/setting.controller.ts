import { Context } from "hono";
import { UserSettingService } from "../services/setting.service";
import { errorResponse, successResponse } from "../utils/response-formatter";

export class UserSettingController {
  static async create(c: Context) {
    try {
      const user = c.get("user");
      const body = await c.req.json();

      const userSetting = await UserSettingService.create({
        ...body,
        userId: user.id,
      });

      return c.json(
        successResponse({
          message: "User setting created successfully",
          data: userSetting,
        })
      );
    } catch (err: any) {
      return c.json(errorResponse({ message: err.message }), err.status);
    }
  }

  static async getById(c: Context) {
    try {
      const { id } = c.req.param();
      const userSetting = await UserSettingService.getById(id);

      if (!userSetting) {
        return c.json({ message: "User setting not found" }, 404);
      }

      return c.json(
        successResponse({
          message: "User setting fetched successfully",
          data: userSetting,
        })
      );
    } catch (err: any) {
      return c.json(errorResponse({ message: err.message }), err.status);
    }
  }

  static async getByUser(c: Context) {
    try {
      const user = c.get("user");
      const userSetting = await UserSettingService.getByUserId(user.id);

      if (!userSetting) {
        return c.json(
          errorResponse({ message: "User setting not found" }),
          404
        );
      }

      return c.json(
        successResponse({
          message: "User setting fetched successfully",
          data: userSetting,
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

      const userSetting = await UserSettingService.update(id, body);

      return c.json(
        successResponse({
          message: "User setting updated successfully",
          data: userSetting,
        })
      );
    } catch (err: any) {
      return c.json(errorResponse({ message: err.message }), err.status);
    }
  }

  static async updateByUser(c: Context) {
    try {
      const user = c.get("user");
      const body = await c.req.json();

      const userSetting = await UserSettingService.updateByUserId(
        user.id,
        body
      );

      return c.json(
        successResponse({
          message: "User setting updated successfully",
          data: userSetting,
        })
      );
    } catch (err: any) {
      return c.json(errorResponse({ message: err.message }), err.status);
    }
  }

  static async delete(c: Context) {
    try {
      const { id } = c.req.param();
      await UserSettingService.delete(id);

      return c.json(
        successResponse({
          message: "User setting deleted successfully",
          data: null,
        })
      );
    } catch (err: any) {
      return c.json(errorResponse({ message: err.message }), err.status);
    }
  }
}
