import { Hono } from "hono";
import { jwtAuth } from "../middlewares/auth";
import * as auth from "../controllers/auth.controller";

const route = new Hono();

route.use("*", jwtAuth);

route.get("/me", auth.getUserMe);
route.put("/profile", auth.updateProfile);
route.put("/change-password", auth.changePassword);

export default route;
