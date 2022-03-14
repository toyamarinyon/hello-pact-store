import { Pact } from "@pact-foundation/pact";
import { like } from "@pact-foundation/pact/src/dsl/matchers";
import fetch from "node-fetch";
import { browserEnv } from "../env/browser";
import { baseUrl } from "../lib/fetcher";

console.log({ browserEnv });
const provider = new Pact({
  consumer: "storefront",
  provider: "api",
  host: browserEnv.NEXT_PUBLIC_API_HOST,
  port: browserEnv.NEXT_PUBLIC_API_PORT,
});

describe("api", () => {
  beforeAll(async () => {
    await provider.setup();
  });
  describe("products exist", () => {
    beforeAll(async () => {
      await provider.addInteraction({
        state: "products exist",
        uponReceiving: "a request to all products",
        withRequest: {
          method: "GET",
          path: "/api/products",
          query: {
            locale: "en",
          },
        },
        willRespondWith: {
          status: 200,
          headers: { "Content-Type": "application/json" },
          body: {
            products: [],
          },
        },
      });
    });
    it("retrieve all products", async () => {
      const url = new URL("/api/products", baseUrl);
      url.search = new URLSearchParams({ locale: "en" }).toString();
      const result = await fetch(url.toString());
    });
    afterEach(async () => await provider.verify());
  });
  describe("jp", () => {
    beforeAll(async () => {
      await provider.addInteraction({
        state: "products exist",
        uponReceiving: "a request to all jp products",
        withRequest: {
          method: "GET",
          path: "/api/products",
          query: {
            locale: "jp",
          },
        },
        willRespondWith: {
          status: 200,
          headers: { "Content-Type": "application/json" },
          body: {
            products: [],
          },
        },
      });
    });
    it("retrieve all products", async () => {
      const url = new URL("/api/products", baseUrl);
      url.search = new URLSearchParams({ locale: "jp" }).toString();
      const result = await fetch(url.toString());
    });
    afterEach(async () => await provider.verify());
  });
  afterAll(async () => await provider.finalize());
});
