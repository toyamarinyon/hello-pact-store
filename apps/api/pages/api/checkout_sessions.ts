import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@sat0shi-store/prisma";
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
  res
    .setHeader("Access-Control-Allow-Credentials", "true")
    .setHeader("Access-Control-Allow-Origin", "*")
    .setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
    .setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method == "OPTIONS") {
    res.status(200).json({});
  } else if (req.method === "POST") {
    try {
      // Create Checkout Sessions from body params.
      const product = await prisma.product.findUnique({
        where: { id: req.body.productId },
      });
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price: product?.stripePriceId,
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
        res.json({ url: session.url });
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
