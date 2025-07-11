export type UserPayload = {
  id: string;
  email: string;
};

declare module "hono" {
  interface ContextVariableMap {
    user: UserPayload;
  }
}
