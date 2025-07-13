import { Hono } from "hono";
import { jwtAuth } from "../middlewares/auth";
import * as wallet from "../controllers/wallet.controller";

const route = new Hono();

route.get("/", jwtAuth, wallet.getWallets);
route.get("/:id", jwtAuth, wallet.getWalletById);
route.post("/", jwtAuth, wallet.createWallet);
route.put("/:id", jwtAuth, wallet.updateWallet);
route.delete("/:id", jwtAuth, wallet.deleteWallet);

export default route;
