import { envsafe, str } from "envsafe";

export const browserEnv = envsafe({
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: str({
    input: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  }),
  NEXT_PUBLIC_API_HOST: str({
    input: process.env.NEXT_PUBLIC_API_HOST,
    devDefault: "localhost",
  }),
  NEXT_PUBLIC_API_PORT: str({
    input: process.env.NEXT_PUBLIC_API_PORT,
    default: "443",
    devDefault: "3000",
  }),
  NEXT_PUBLIC_API_PROTOCOL: str({
    input: process.env.NEXT_PUBLIC_API_PROTOCOL,
    default: "https",
    devDefault: "http",
    choices: ["http", "https"],
  }),
});
