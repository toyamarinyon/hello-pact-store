import { Verifier, VerifierOptions } from "@pact-foundation/pact";
import path from "path";
import process from "process";
import { serverEnv } from "../env/server";

describe("Pact Verification", () => {
  it("validates the expectations of Matching Service", async () => {
    const options: VerifierOptions = {
      providerBaseUrl: "https://api.stripe.com",
      pactUrls: [
        path.resolve(process.cwd(), "./pacts/storefront-stripe.json"),
      ],
      requestFilter: (req, res, next) => {
        req.headers["authorization"] = `Bearer ${serverEnv.STRIPE_SECRET_KEY}`;
        next();
      },
    };

    const result = await new Verifier(options).verifyProvider();
    console.log("Pact Verification Complete!");
    console.log(result);
  });
});
