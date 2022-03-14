import { Matchers } from "@pact-foundation/pact-web";
const { like, eachLike } = Matchers;

describe("通信内容をモックして動作確認をする", () => {
  before(() => {
    cy.setupProvider({
      consumer: "storefront",
      provider: "api",
      host: "localhost",
      port: 3024,
    });
  });
  describe("トップページ", () => {
    beforeEach(() => {
      cy.addInteractionToProvider({
        as: "products",
        state: "products exist",
        uponReceiving: "a request to en products",
        withRequest: {
          method: "GET",
          path: "/api/products",
          query: {
            locale: "en",
          },
        },
        willRespondWith: {
          status: 200,
          headers: { "Content-Type": "application/json; charset=utf-8" },
          body: {
            products: [
              {
                id: like(1),
                title: like("Pact Handmade Hair Tie"),
                price: like("$3.00"),
                stripePriceId: like("price_1KbQQXJMuLcK5nTcV2H8BT97"),
                locale: like("en"),
                imageUrl: like("hair01.jpeg"),
              },
              {
                id: like(2),
                title: like("Pact Handmade Pin"),
                price: like("$3.00"),
                stripePriceId: like("price_1KbQQXJMuLcK5nTcV2H8BT97"),
                locale: like("en"),
                imageUrl: like("hair02.jpeg"),
              },
            ],
          },
        },
      });
      cy.visit("/");
    });
    it("英語の商品は表示する", () => {
      cy.findByRole("heading", { name: /pact handmade hair tie/i });
      cy.findByRole("heading", { name: /pact handmade pin/i });
    });
    it("日本語の商品は表示しない", () => {
      cy.findByRole("heading", {
        name: /〈入園式にもピッタリ♪〉 春に映えるヘアゴム 苺色/i,
      }).should("not.exist");
      cy.findByRole("heading", { name: /おめめパッチリ☆メガネバッチ/i }).should(
        "not.exist"
      );
    });
    afterEach(() => {
      cy.verifyProvider();
    });
  });
  describe("日本語トップページ", () => {
    beforeEach(() => {
      cy.addInteractionToProvider({
        as: "products",
        state: "products exist",
        uponReceiving: "a request to jp products",
        withRequest: {
          method: "GET",
          path: "/api/products",
          query: {
            locale: "jp",
          },
        },
        willRespondWith: {
          status: 200,
          headers: { "Content-Type": "application/json; charset=utf-8" },
          body: {
            products: [
              {
                id: like(3),
                title: like(
                  "Pact 〈入園式にもピッタリ♪〉 春に映えるヘアゴム 苺色"
                ),
                price: like("￥300"),
                stripePriceId: like("price_1KbPQcJMuLcK5nTchC1dzJpa"),
                locale: like("jp"),
                imageUrl: like("hair01.jpeg"),
              },
              {
                id: like(4),
                title: like(
                  "Pact おめめパッチリ☆メガネバッチ"
                ),
                price: like("￥300"),
                stripePriceId: like("price_1KbQRLJMuLcK5nTcmE15TFWl"),
                locale: like("jp"),
                imageUrl: like("hair02.jpeg"),
              },
            ],
          },
        },
      });
      cy.visit("/jp");
    });
    it("英語の商品は表示しない", () => {
      cy.findByRole("heading", { name: /MOCK handmade hair tie/i }).should(
        "not.exist"
      );
      cy.findByRole("heading", { name: /MOCK handmade pin/i }).should(
        "not.exist"
      );
    });
    it("日本語の商品は表示する", () => {
      cy.findByRole("heading", {
        name: /Pact 〈入園式にもピッタリ♪〉 春に映えるヘアゴム 苺色/i,
      });
      cy.findByRole("heading", { name: /Pact おめめパッチリ☆メガネバッチ/i });
    });
    afterEach(() => {
      cy.verifyProvider();
    });
  });
  after(() => {
    cy.finalizeProvider();
  });
});
