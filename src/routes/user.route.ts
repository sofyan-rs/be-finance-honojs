import { Hono } from "hono";
import { jwtAuth } from "../middlewares/auth";
import * as auth from "../controllers/auth.controller";

const route = new Hono();

route.get("/me", jwtAuth, (c) => {
  const user = c.get("user");
  return c.json({ user });
});
route.put("/profile", jwtAuth, auth.updateProfile);
route.put("/change-password", jwtAuth, auth.changePassword);

export default route;
