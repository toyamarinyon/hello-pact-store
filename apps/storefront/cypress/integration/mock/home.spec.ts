describe("通信内容をモックして動作確認をする", () => {
  describe("トップページ", () => {
    beforeEach(() => {
      cy.intercept("/api/products*", {
        products: [
          {
            id: 1,
            title: "MOCK Handmade Hair Tie",
            price: "$3.00",
            stripePriceId: "price_1KbQQXJMuLcK5nTcV2H8BT97",
            locale: "en",
            imageUrl: "hair01.jpeg",
          },

          {
            id: 3,
            title: "MOCK Handmade Pin",
            price: "$3.00",
            stripePriceId: "price_1KbQLyJMuLcK5nTcZDTkTCUM",
            locale: "en",
            imageUrl: "hair02.jpeg",
          },
        ],
      }).as("getProducts");
      cy.visit("/");
      cy.wait(["@getProducts"]);
    });
    it("英語の商品は表示する", () => {
      cy.findByRole("heading", { name: /handmade hair tie/i });
      cy.findByRole("heading", { name: /handmade pin/i });
    });
    it("日本語の商品は表示しない", () => {
      cy.findByRole("heading", {
        name: /〈入園式にもピッタリ♪〉 春に映えるヘアゴム 苺色/i,
      }).should("not.exist");
      cy.findByRole("heading", { name: /おめめパッチリ☆メガネバッチ/i }).should(
        "not.exist"
      );
    });
  });
  describe("日本語トップページ", () => {
    beforeEach(() => {
      cy.intercept("/api/products*", {
        products: [
          {
            id: 2,
            title: "MOCK 〈入園式にもピッタリ♪〉 春に映えるヘアゴム 苺色",
            price: "￥300",
            stripePriceId: "price_1KbPQcJMuLcK5nTchC1dzJpa",
            locale: "jp",
            imageUrl: "hair01.jpeg",
          },
          {
            id: 4,
            title: "MOCK おめめパッチリ☆メガネバッチ",
            price: "￥300",
            stripePriceId: "price_1KbQRLJMuLcK5nTcmE15TFWl",
            locale: "jp",
            imageUrl: "hair02.jpeg",
          },
        ],
      }).as("getProducts");
      cy.visit("/jp");
      cy.wait(["@getProducts"]);
    });
    it("英語の商品は表示しない", () => {
      cy.findByRole("heading", { name: /MOCK handmade hair tie/i }).should(
        "not.exist"
      );
      cy.findByRole("heading", { name: /MOCK handmade pin/i }).should("not.exist");
    });
    it("日本語の商品は表示する", () => {
      cy.findByRole("heading", {
        name: /MOCK 〈入園式にもピッタリ♪〉 春に映えるヘアゴム 苺色/i,
      });
      cy.findByRole("heading", { name: /MOCK おめめパッチリ☆メガネバッチ/i });
    });
  });
});
