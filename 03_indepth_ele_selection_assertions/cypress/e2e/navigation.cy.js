/// <reference types='Cypress' />;

describe('Page Navigation', () => {
  it('Should navigate between pages.', () => {
    cy.task('log', "Hello... I'm in Navigate task.");
    cy.visit('/');

    cy.get('[data-cy="header-about-link"]').click();

    cy.location('pathname').should('eq', '/about');

    cy.get('[data-cy="header-home-link"]').click();

    // cy.go('back'); // back / forward / reload
    cy.location('pathname').should('eq', '/');
  });
});
