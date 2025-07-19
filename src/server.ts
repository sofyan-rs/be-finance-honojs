import { serve } from "@hono/node-server";
import app from "./app";

const port = Number(app.port);

serve({ fetch: app.fetch, port }, () => {
  console.log(`Server running at http://localhost:${port}`);
});
