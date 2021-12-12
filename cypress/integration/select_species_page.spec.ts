const checkNavButtonStatus = (type: "next" | "back", state: "disabled" | "enabled") => {
  cy.dataCy(`${type}-button`).should(`${state === "disabled" ? "not.exist" : "exist"}`);
  cy.dataCy(`${type}-button-disabled`).should(`${state === "disabled" ? "exist" : "not.exist"}`);
}

describe("The 'Select species' page", () => {
  beforeEach(() => {
    cy.visit('localhost:3000/select-species');
  })

  it("Should disable the 'next' button if nothing is selected", () => {
    checkNavButtonStatus("next", "disabled");
  })

  it("Should select 'Cat' when the Cat option is clicked", () => {
    cy.dataCy('cat-selection').click({ force: true });
  })

  it("Should enable the next button after an option is selected", () => {
    cy.dataCy('cat-selection').click();
    checkNavButtonStatus("next", "enabled");
  })

  it("The back button should always be enabled", () => {
    checkNavButtonStatus("back", "enabled");
    cy.dataCy('cat-selection').click();
    checkNavButtonStatus("back", "enabled");
  });

  it("The Next button should take the user to the 'Select location' page", () => {
    cy.dataCy('cat-selection').click();
    cy.dataCy('next-button').click();
    cy.url().should('include', '/select-location');
  })
})

describe('The Select location page', () => {
  beforeEach(() => {
    cy.visit('localhost:3000/select-location');
  })

  it("Should disable the next button if there is no input, otherwise enable it", () => {
    checkNavButtonStatus("next", "disabled")
    cy.dataCy('location-input').type('San Francisco, CA')
    checkNavButtonStatus("next", "enabled");
  })

  it("Should populate the input field with the last input text when de-focused", () => {
    // cy.dataCy('location-input').should('not.contain.value');
    cy.dataCy('location-input').focus().type('San Francisco, CA');
    cy.dataCy('location-input').blur();
    cy.dataCy('location-input').should('contain.value', 'San Francisco, CA')

    cy.dataCy('location-input').clear().blur();
    cy.dataCy('location-input').should('contain.value', 'San Francisco, CA')
  })
})

export {}