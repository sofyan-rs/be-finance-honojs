import { Context } from "hono";
import { UserService } from "../services/user.service";
import { errorResponse, successResponse } from "../utils/response-formatter";

export const register = async (c: Context) => {
  try {
    const { name, email, password } = await c.req.json();
    const result = await UserService.register(name, email, password);
    return c.json(
      successResponse({
        message: "User registered successfully",
        data: result,
      })
    );
  } catch (err: any) {
    return c.json(errorResponse({ message: err.message }), err.status);
  }
};

export const login = async (c: Context) => {
  try {
    const { email, password } = await c.req.json();
    const result = await UserService.login(email, password);
    return c.json(
      successResponse({
        message: "User logged in successfully",
        data: result,
      })
    );
  } catch (err: any) {
    return c.json(errorResponse({ message: err.message }), err.status);
  }
};

export const updateProfile = async (c: Context) => {
  try {
    const { name, email } = await c.req.json();
    const user = c.get("user");
    const updated = await UserService.updateProfile(user.id, { name, email });
    return c.json(
      successResponse({
        message: "User updated successfully",
        data: updated,
      })
    );
  } catch (err: any) {
    return c.json(errorResponse({ message: err.message }), err.status);
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
    return c.json(
      successResponse({
        message: "User password updated successfully",
        data: result,
      })
    );
  } catch (err: any) {
    return c.json(errorResponse({ message: err.message }), err.status);
  }
};

export const getUserMe = async (c: Context) => {
  try {
    const user = c.get("user");
    const result = await UserService.getById(user.id);
    return c.json(
      successResponse({
        message: "User fetched successfully",
        data: result,
      })
    );
  } catch (err: any) {
    return c.json(errorResponse({ message: err.message }), err.status);
  }
};
