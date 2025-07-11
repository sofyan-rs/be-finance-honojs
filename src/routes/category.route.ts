import { Hono } from "hono";
import { jwtAuth } from "../middlewares/auth";
import * as category from "../controllers/category.controller";

const route = new Hono();

route.get("/", jwtAuth, category.getCategories);
route.get("/:id", jwtAuth, category.getCategoryById);
route.post("/", jwtAuth, category.createCategory);
route.put("/:id", jwtAuth, category.updateCategory);
route.delete("/:id", jwtAuth, category.deleteCategory);

export default route;
