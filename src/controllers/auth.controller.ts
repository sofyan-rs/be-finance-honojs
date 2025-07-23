import { Context } from "hono";
import { UserService } from "../services/user.service";

export const register = async (c: Context) => {
  try {
    const { name, email, password } = await c.req.json();
    const result = await UserService.register(name, email, password);
    return c.json(result);
  } catch (err: any) {
    return c.json({ error: err.message }, err.status);
  }
};

export const login = async (c: Context) => {
  try {
    const { email, password } = await c.req.json();
    const result = await UserService.login(email, password);
    return c.json(result);
  } catch (err: any) {
    return c.json({ error: err.message }, err.status);
  }
};

export const updateProfile = async (c: Context) => {
  try {
    const { name, email } = await c.req.json();
    const user = c.get("user");
    const updated = await UserService.updateProfile(user.id, { name, email });
    return c.json(updated);
  } catch (err: any) {
    return c.json({ error: err.message }, err.status);
  }
};

export const changePassword = async (c: Context) => {
  try {
    const { currentPassword, newPassword } = await c.req.json();
    const user = c.get("user");
    const result = await UserService.changePassword(user.id, {
      currentPassword,
      newPassword,
    });
    return c.json(result);
  } catch (err: any) {
    return c.json({ error: err.message }, err.status);
  }
};

export const getUserMe = async (c: Context) => {
  try {
    const user = c.get("user");
    const result = await UserService.getById(user.id);
    return c.json(result);
  } catch (err: any) {
    return c.json({ error: err.message }, err.status);
  }
};
