import { browserEnv } from "../env/browser";
import { ProductModel } from "@sat0shi-store/prisma/zod";
import { z } from "zod";

const { NEXT_PUBLIC_API_HOST, NEXT_PUBLIC_API_PORT, NEXT_PUBLIC_API_PROTOCOL } =
  browserEnv;

export const productsScheme = z.object({
  products: ProductModel.array(),
});

export const createCheckoutSessionsScheme = z.object({
  url: z.string(),
});
export const baseUrl = new URL(
  "/",
  `${NEXT_PUBLIC_API_PROTOCOL}://${NEXT_PUBLIC_API_HOST}:${NEXT_PUBLIC_API_PORT}`
);
interface FetcherParam {
  url: string;
  query?: Record<string, string>;
}
export function apiFetcher<T extends z.SomeZodObject>(scheme: T) {
  return async function ({ url, query }: FetcherParam): Promise<z.infer<T>> {
    const requestUrl = new URL(url, baseUrl);
    requestUrl.search = new URLSearchParams(query).toString();
    return fetch(requestUrl.toString())
      .then((res) => res.json())
      .then((json) => scheme.parse(json));
  };
}

export async function createCheckoutSession(productId: number) {
  const requestUrl = new URL("/api/checkout_sessions", baseUrl);
  return fetch(requestUrl.toString(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      productId,
    }),
  })
    .then((res) => res.json())
    .then((json) => createCheckoutSessionsScheme.parse(json));
}
