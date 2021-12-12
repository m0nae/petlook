/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * A shorthand version of cy.get('[data-cy=insertnamehere]')
     * @example
     * cy.dataCy('location-input')
     */
    dataCy(dataCy: string): Chainable<any>
  }
}