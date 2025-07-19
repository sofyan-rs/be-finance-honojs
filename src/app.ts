import { Hono } from "hono";
import { cors } from "hono/cors";
import authRoutes from "./routes/auth.route";
import userRoutes from "./routes/user.route";
import categoryRoutes from "./routes/category.route";
import { logger } from "./middlewares/logger";

const app = new Hono();

const feURL = process.env.FE_URL || "http://localhost:3000";

app.use(
  cors({
    origin: [feURL],
  }),
);
app.use("*", logger);
app.onError((err, c) => {
  return c.json({ error: err.message }, 500);
});
app.get("/", (c) => {
  return c.text("Finance Tracker API!");
});
app.route("/auth", authRoutes);
app.route("/user", userRoutes);
app.route("/category", categoryRoutes);

const port = process.env.PORT || 3000;

export default {
  port,
  fetch: app.fetch,
};
