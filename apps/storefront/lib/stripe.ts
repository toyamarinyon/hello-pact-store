import Stripe from "stripe";
import { serverEnv } from "../env/server";

export const stripe = new Stripe(serverEnv.STRIPE_SECRET_KEY, {
  host: serverEnv.STRIPE_HOST,
  port: serverEnv.STRIPE_PORT,
  protocol: serverEnv.STRIPE_PORT === 443 ? "https" : "http",
  apiVersion: "2020-08-27",
});

export function createCheckoutSession() {
  const host = serverEnv.STRIPE_HOST;
  const port = serverEnv.STRIPE_PORT;
  const protocol = serverEnv.STRIPE_PORT === 443 ? "https" : "http";

  fetch(`${protocol}://${host}:${port}/v1/checkout/sessions`, {
    headers: {
      authorization: `Bearer ${serverEnv.STRIPE_SECRET_KEY}`,
    },
    body: ""
  });
}
