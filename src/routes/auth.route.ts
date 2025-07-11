import { Hono } from "hono";
import * as auth from "../controllers/auth.controller";

const route = new Hono();

route.post("/register", auth.register);
route.post("/login", auth.login);

export default route;
