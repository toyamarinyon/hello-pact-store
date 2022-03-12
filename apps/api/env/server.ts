import { envsafe, num, str } from "envsafe";

export const serverEnv = {
  ...envsafe({
    STRIPE_SECRET_KEY: str(),
    STRIPE_HOST: str({ default: "api.stripe.com" }),
    STRIPE_PORT: num({ default: 443 }),
    VERCEL_ENV: str({
      devDefault: "development",
      choices: ["production", "preview", "development"],
    }),
  }),
};
