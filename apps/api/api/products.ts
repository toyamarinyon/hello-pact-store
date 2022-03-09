import type { VercelRequest, VercelResponse } from "@vercel/node";
import { prisma } from "@hello-pact-store/prisma";

export default async (request: VercelRequest, response: VercelResponse) => {
  const { name } = request.query;
  const products = await prisma.product.findMany();
  response.status(200).json(products);
};
