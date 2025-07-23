import { Hono } from "hono";
import { TransactionController } from "../controllers/transaction.controller";
import { jwtAuth } from "../middlewares/auth";

const route = new Hono();

route.use("*", jwtAuth);

route.post("/", TransactionController.create);
route.get("/", TransactionController.getAllByUser);
route.get("/:id", TransactionController.getById);
route.put("/:id", TransactionController.update);
route.delete("/:id", TransactionController.delete);

// Filtering routes
route.get("/wallet/:walletId", TransactionController.getAllByWallet);
route.get("/category/:categoryId", TransactionController.getAllByCategory);

export default route;
