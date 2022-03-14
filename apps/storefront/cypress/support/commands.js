import "@testing-library/cypress/add-commands";

Cypress.Commands.add("setupProvider", (option) => {
  cy.task("setupProvider", option);
});
Cypress.Commands.add("addInteractionToProvider", (option) => {
  cy.task("addInteractionToProvider", option);
});
Cypress.Commands.add("verifyProvider", () => {
  cy.task("verifyProvider");
});
Cypress.Commands.add("finalizeProvider", () => {
  cy.task("finalizeProvider");
});
