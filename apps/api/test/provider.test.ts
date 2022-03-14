import { Verifier, VerifierOptions } from "@pact-foundation/pact";
import path from "path";
import process from "process";
import { main as seed } from "@sat0shi-store/prisma/seed";

describe("Pact Verification", () => {
  it("validates the expectations of Matching Service", async () => {
    const options: VerifierOptions = {
      providerBaseUrl: "http://localhost:3024",
      pactUrls: [
        path.resolve(process.cwd(), "../storefront/pacts/storefront-api.json"),
      ],
      stateHandlers: {
        "products exist": () => {
          return new Promise((resolve) =>
            seed().then(() => resolve("Products added to the db"))
          );
        },
      },
      // requestFilter: (req, res, next) => {
      //   req.headers["authorization"] = `Bearer ${serverEnv.STRIPE_SECRET_KEY}`;
      //   next();
      // },
    };

    const result = await new Verifier(options).verifyProvider();
    console.log("Pact Verification Complete!");
    console.log(result);
    return result;
  });
});
