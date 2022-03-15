/// <reference types="cypress" />

import {
  RequestOptions as PactRequestOptions,
  ResponseOptions,
} from "@pact-foundation/pact";

declare global {
  namespace Cypress {
    interface Chainable {
      setupProvider(option: {
        consumer: string;
        provider: string;
        host: string;
        port: number;
      }): Chainable<Element>;
      addInteractionToProvider(option: {
        state: string;
        uponReceiving: string;
        withRequest: PactRequestOptions;
        willRespondWith: ResponseOptions;
      }): Chainable<Element>;
      verifyProvider(): Chainable<Element>;
      finalizeProvider(): Chainable<Element>;
    }
  }
}
