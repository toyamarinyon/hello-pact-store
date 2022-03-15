import { envsafe, num, str } from "envsafe";

export const browserEnv = envsafe({
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: str({
    input: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    allowEmpty: true,
  }),
  NEXT_PUBLIC_API_HOST: str({
    input: process.env.NEXT_PUBLIC_API_HOST,
    devDefault: "localhost",
  }),
  NEXT_PUBLIC_API_PORT: num({
    input: process.env.NEXT_PUBLIC_API_PORT,
    default: 443,
    devDefault: 3024,
  }),
  NEXT_PUBLIC_API_PROTOCOL: str({
    input: process.env.NEXT_PUBLIC_API_PROTOCOL,
    default: "https",
    devDefault: "http",
    choices: ["http", "https"],
  }),
});

if (browserEnv.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY === "") {
  console.warn(
    "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined, so checkout will occurs error."
  );
}
