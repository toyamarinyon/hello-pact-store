describe("テスト用のAPIサーバと通信して動作確認をする", () => {
  before(() => {
    cy.request("DELETE", "http://localhost:3024/api/test/products");
    cy.request("POST", "http://localhost:3024/api/test/products", {
      products: [
        {
          title: "Handmade Hair Tie",
          price: "$3.00",
          stripePriceId: "price_1KbQQXJMuLcK5nTcV2H8BT97",
          locale: "en",
          imageUrl: "hair01.jpeg",
        },
        {
          title: "〈入園式にもピッタリ♪〉 春に映えるヘアゴム 苺色",
          price: "￥300",
          stripePriceId: "price_1KbPQcJMuLcK5nTchC1dzJpa",
          locale: "jp",
          imageUrl: "hair01.jpeg",
        },
        {
          title: "Handmade Pin",
          price: "$3.00",
          stripePriceId: "price_1KbQLyJMuLcK5nTcZDTkTCUM",
          locale: "en",
          imageUrl: "hair02.jpeg",
        },
        {
          title: "おめめパッチリ☆メガネバッチ",
          price: "￥300",
          stripePriceId: "price_1KbQRLJMuLcK5nTcmE15TFWl",
          locale: "jp",
          imageUrl: "hair02.jpeg",
        },
      ],
    });
  });
  describe("トップページ", () => {
    beforeEach(() => {
      cy.visit("/");
    });
    it("英語の商品は表示する", () => {
      cy.findByRole("heading", { name: /handmade hair tie/i });
      cy.findByRole("heading", { name: /handmade pin/i });
    });
    it("日本語の商品は表示しない", () => {
      cy.findByRole("heading", { name: /〈入園式にもピッタリ♪〉 春に映えるヘアゴム 苺色/i }).should('not.exist');
      cy.findByRole("heading", { name: /おめめパッチリ☆メガネバッチ/i }).should('not.exist');
    });
  });
  describe("日本語トップページ", () => {
    beforeEach(() => {
      cy.visit("/jp");
    });
    it("英語の商品は表示しない", () => {
      cy.findByRole("heading", { name: /handmade hair tie/i }).should('not.exist');
      cy.findByRole("heading", { name: /handmade pin/i }).should('not.exist');
    });
    it("日本語の商品は表示する", () => {
      cy.findByRole("heading", { name: /〈入園式にもピッタリ♪〉 春に映えるヘアゴム 苺色/i });
      cy.findByRole("heading", { name: /おめめパッチリ☆メガネバッチ/i });
    });
  });

});
