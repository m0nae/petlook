describe("The Home Page", () => {
  beforeEach(() => {
    cy.visit("localhost:3000");
  })

  it("The 'Find a Pet' button takes the user to the next page", () => {
    cy.contains('Find a Pet').click();
    cy.url({ timeout: 6000 }).should('include', '/select-species');
  });
});

describe("The 404 page", () => {
  it('Should appear when trying to navigate to a nonexistent page', () => {
    cy.visit('/foobar');
    cy.contains('Whoops! Page not found');
  })

  it("The home button should navigate back to the home page when clicked", () => {
    cy.dataCy("home-button").click();
    cy.url().should('contain', 'localhost:3000');
  })
})

export {};
