import { Hono } from "hono";
import { UserSettingController } from "../controllers/setting.controller";
import { jwtAuth } from "../middlewares/auth";

const route = new Hono();

route.use("*", jwtAuth);

route.post("/", UserSettingController.create);
route.get("/", UserSettingController.getByUser);
route.put("/", UserSettingController.updateByUser);
// route.get("/:id", UserSettingController.getById);
// route.put("/:id", UserSettingController.update);
// route.delete("/:id", UserSettingController.delete);

export default route;
