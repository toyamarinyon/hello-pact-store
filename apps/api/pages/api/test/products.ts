import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@sat0shi-store/prisma";
import { ProductModel } from "@sat0shi-store/prisma/zod";
import { serverEnv } from "../../../env/server";
const ProductInput = ProductModel.omit({ id: true });

export default async (request: NextApiRequest, response: NextApiResponse) => {
  if (serverEnv.VERCEL_ENV === "production") {
    response.status(404);
  } else {
    if (request.method === "DELETE") {
      await prisma.product.deleteMany({});
      response.status(200).json({});
    } else if (request.method === "POST") {
      const products = await prisma.product.createMany({
        data: ProductInput.array().parse(request.body.products),
      });
      response.status(200).json({ products });
    } else {
      response.status(404);
    }
  }
};
