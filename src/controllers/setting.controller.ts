import { Context } from "hono";
import { UserSettingService } from "../services/setting.service";
import { HttpError } from "../errors/http-error";

export class UserSettingController {
  static async create(c: Context) {
    try {
      const user = c.get("user");
      const body = await c.req.json();

      const userSetting = await UserSettingService.create({
        ...body,
        userId: user.id,
      });

      return c.json({ success: true, data: userSetting }, 201);
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
      const userSetting = await UserSettingService.getById(id);

      if (!userSetting) {
        return c.json({ error: "User setting not found" }, 404);
      }

      return c.json({ success: true, data: userSetting });
    } catch (err: unknown) {
      return c.json(
        { error: err instanceof Error ? err.message : String(err) },
        400
      );
    }
  }

  static async getByUser(c: Context) {
    try {
      const user = c.get("user");
      const userSetting = await UserSettingService.getByUserId(user.id);

      if (!userSetting) {
        return c.json({ error: "User setting not found" }, 404);
      }

      return c.json({ success: true, data: userSetting });
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

      const userSetting = await UserSettingService.update(id, body);

      return c.json({ success: true, data: userSetting });
    } catch (err: unknown) {
      return c.json(
        { error: err instanceof Error ? err.message : String(err) },
        400
      );
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

      return c.json({ success: true, data: userSetting });
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
      await UserSettingService.delete(id);

      return c.json({
        success: true,
        message: "User setting deleted successfully",
      });
    } catch (err: unknown) {
      return c.json(
        { error: err instanceof Error ? err.message : String(err) },
        400
      );
    }
  }
}
