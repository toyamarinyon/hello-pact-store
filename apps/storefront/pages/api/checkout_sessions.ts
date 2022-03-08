import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../lib/stripe";

interface StripeError {
  statusCode: number;
  message: string;
}
export function isStripeError(error: unknown): error is StripeError {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    "statusCode" in error &&
    typeof (error as Record<string, unknown>).message === "string" &&
    typeof (error as Record<string, unknown>).statusCode === "number"
  );
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price: "price_1KYnp4JMuLcK5nTcH8UZ7UJ2",
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      });
      if (session.url == null) {
        res.status(500).json({ message: "unexpected error" });
      } else {
        res.redirect(303, session.url);
      }
    } catch (err) {
      if (isStripeError(err)) {
        res.status(err.statusCode).json(err.message);
      } else {
        res.status(500).json({ message: "unexpected error" });
      }
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
