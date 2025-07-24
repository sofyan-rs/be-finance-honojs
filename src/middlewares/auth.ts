import type { MiddlewareHandler } from "hono";
import * as jwt from "jsonwebtoken";
import type { UserPayload } from "../types/env";
import { errorResponse } from "../utils/response-formatter";

const JWT_SECRET = process.env.JWT_SECRET || "default";

export const jwtAuth: MiddlewareHandler = async (c, next) => {
  const header = c.req.header("Authorization");
  const token = header?.replace("Bearer ", "");

  if (!token) return c.json(errorResponse({ message: "Unauthorized" }), 401);

  try {
    const payload = jwt.verify(token, JWT_SECRET) as UserPayload;
    c.set("user", payload);
    await next();
  } catch {
    return c.json(errorResponse({ message: "Invalid token" }), 401);
  }
};
