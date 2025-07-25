import { Hono } from "hono";
import { jwtAuth } from "../middlewares/auth";
import * as category from "../controllers/category.controller";

const route = new Hono();

route.use("*", jwtAuth);

route.get("/", category.getCategories);
route.post("/", category.createCategory);
route.get("/:id", category.getCategoryById);
route.put("/:id", category.updateCategory);
route.delete("/:id", category.deleteCategory);

export default route;
