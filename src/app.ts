import { Hono } from "hono";
import { cors } from "hono/cors";
import authRoutes from "./routes/auth.route";
import userRoutes from "./routes/user.route";
import categoryRoutes from "./routes/category.route";
import walletRoutes from "./routes/wallet.route";
import transactionRoutes from "./routes/transaction.route";
import settingRoutes from "./routes/setting.route";
import { logger } from "./middlewares/logger";
import { errorResponse } from "./utils/response-formatter";

const app = new Hono();

const feURL = process.env.FE_URL || "http://localhost:4000";

app.use(
  cors({
    origin: [feURL],
  })
);
app.use("*", logger);
app.onError((err, c) => {
  return c.json(errorResponse({ message: err.message }), 500);
});
app.get("/", (c) => {
  return c.text("Finance Tracker API!");
});
app.route("/auth", authRoutes);
app.route("/user", userRoutes);
app.route("/category", categoryRoutes);
app.route("/wallet", walletRoutes);
app.route("/transaction", transactionRoutes);
app.route("/setting", settingRoutes);

const port = process.env.PORT || 3000;

export default {
  port,
  fetch: app.fetch,
};
