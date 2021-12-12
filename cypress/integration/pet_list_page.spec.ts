describe("The pet listing page", () => {
  beforeEach(() => {
    cy.visit('localhost:3000/select-species');
    cy.dataCy('dog-selection').click();
    cy.dataCy('next-button').click();
    cy.dataCy('location-input').type('San Francisco, CA')
  });

  it("Should display an error screen when a network error occurs", () => {
    cy.intercept('GET', '/v2/*', {
      statusCode: 404,
    }).as('request');
    cy.dataCy('next-button').click();
    cy.wait('@request')

    cy.contains('Uh oh! There was an error retrieving the data');
  })

  it.only("Should properly change the search filters", () => {
    cy.dataCy('next-button').click();
    cy.dataCy('species-select').select('Rabbits');
    cy.dataCy('distance-input-desktop')
      .clear({ force: true })
      .type('2', { force: true });
    cy.dataCy('distance-input-desktop').should('have.value', '20');

    cy.dataCy('search-button-desktop').click().wait(5000);
    cy.contains('Uh oh').should('not.exist');
  })
})

export {}