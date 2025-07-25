import { Hono } from "hono";
import { jwtAuth } from "../middlewares/auth";
import * as wallet from "../controllers/wallet.controller";

const route = new Hono();

route.use("*", jwtAuth);

route.get("/", wallet.getWallets);
route.post("/", wallet.createWallet);
route.get("/summary", wallet.getWalletsSummary);
route.get("/summary/detailed", wallet.getDetailedWalletsSummary);
route.get("/:id", wallet.getWalletById);
route.put("/:id", wallet.updateWallet);
route.delete("/:id", wallet.deleteWallet);

export default route;
