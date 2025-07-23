import { Hono } from "hono";
import { UserSettingController } from "../controllers/setting.controller";
import { jwtAuth } from "../middlewares/auth";

const route = new Hono();

route.use("*", jwtAuth);

// User setting CRUD routes
route.post("/", UserSettingController.create);
route.get("/", UserSettingController.getByUser);
route.get("/:id", UserSettingController.getById);
route.put("/", UserSettingController.updateByUser);
route.put("/:id", UserSettingController.update);
route.delete("/:id", UserSettingController.delete);

export default route;
