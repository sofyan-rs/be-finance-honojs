import { Context } from "hono";

// Logger middleware
export const logger = async (c: Context, next: () => Promise<void>) => {
  const start = Date.now();
  await next();
  const duration = Date.now() - start;
  console.log(
    `[${new Date().toISOString()}] ${c.req.method} ${c.req.path} - ${c.res.status} (${duration}ms)`,
  );
};
