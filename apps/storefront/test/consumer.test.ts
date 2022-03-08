import { Pact } from "@pact-foundation/pact";
import { like } from "@pact-foundation/pact/src/dsl/matchers";
import { serverEnv } from "../env/server";
import { stripe } from "../lib/stripe";

const provider = new Pact({
  consumer: "storefront",
  provider: "Stripe",
  port: serverEnv.STRIPE_PORT,
  host: serverEnv.STRIPE_HOST,
});

describe("Stripe", () => {
  describe("when checkout a product", () => {
    beforeAll(async () => {
      await provider.setup();
      await provider.addInteraction({
        state: "no token",
        uponReceiving: "a request to create checkout",
        withRequest: {
          method: "POST",
          path: "/v1/checkout/sessions",
          headers: { Accept: "application/json" },
          body: "success_url=https%3A%2F%2Fexample.com%2Fsuccess&cancel_url=https%3A%2F%2Fexample.com%2Fcancel&line_items[0][price]=price_1KYnp4JMuLcK5nTcH8UZ7UJ2&line_items[0][quantity]=2&mode=payment",
        },
        willRespondWith: {
          status: 200,
          headers: { "Content-Type": "application/json" },
          body: {
            url: like("https://checkout.stripe.com/pay/"),
          },
        },
      });
    });
    it("generates a checkout url", async () => {
      const result = await stripe.checkout.sessions.create({
        success_url: "https://example.com/success",
        cancel_url: "https://example.com/cancel",
        line_items: [{ price: "price_1KYnp4JMuLcK5nTcH8UZ7UJ2", quantity: 2 }],
        mode: "payment",
      });
    });
    afterEach(async () => await provider.verify());
  });
  afterAll(async () => await provider.finalize());
});
