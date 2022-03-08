import { envsafe, num, str } from "envsafe";
import { browserEnv } from "./browser";

export const serverEnv = {
  ...browserEnv,
  ...envsafe({
    STRIPE_SECRET_KEY: str(),
    STRIPE_HOST: str({ default: "api.stripe.com" }),
    STRIPE_PORT: num({ default: 443 }),
  }),
};
