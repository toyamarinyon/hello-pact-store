import type { VercelRequest, VercelResponse } from "@vercel/node";
import { prisma } from "@hello-pact-store/prisma";
import { ProductModel } from "@hello-pact-store/prisma/zod";

export default async (request: VercelRequest, response: VercelResponse) => {
  const localeScheme = ProductModel.shape.locale;
  const locale = localeScheme.safeParse(request.query.locale);
  const products = await prisma.product.findMany({
    where: { locale: locale.success ? locale.data : "en" },
  });
  response
    .status(200)
    .setHeader("Access-Control-Allow-Credentials", "true")
    .setHeader("Access-Control-Allow-Origin", "*")
    .setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
    .json({ products });
};
