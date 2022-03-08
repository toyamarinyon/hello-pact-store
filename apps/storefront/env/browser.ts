import { envsafe, str } from "envsafe";

export const browserEnv = envsafe({
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: str({
    input: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  }),
});
