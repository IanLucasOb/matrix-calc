describe("template spec", () => {
  it("calculate a 3x3 determinant", () => {
    cy.visit("/");
    cy.get("#input-0").should("exist").click().type("3");
    cy.get(":nth-child(1) > :nth-child(2) > .v-btn > .v-btn__content").click();
    // cy.get(":nth-child(1) > .v-btn > .v-btn__content").click();
    // const matrix = [];
    const v = [-2, 5, 1, 6, 7, 3, 4, 4, 9];
    for (let i = 0; i < v.length; i++) {
      cy.get(`#input-test-${i}`).clear().type(v[i]);
    }
    cy.get(".mt-4 > .v-btn > .v-btn__content").click();
    cy.get(":nth-child(3) > .v-card-title").should("exist").and("be.visible");
    cy.get("#resultLabel").should("be.visible").and("exist");
  });
});
