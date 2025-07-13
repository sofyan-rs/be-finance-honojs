import { serve } from "@hono/node-server";
import app from "./app";

serve({ fetch: app.fetch, port: 4000 }, () => {
  console.log("Server running at http://localhost:4000");
});
