/// <reference types="Cypress" />

describe('Takeaways', () => {
  beforeEach(() => {
    cy.task('seedDatabase');
    cy.visit('/');

    // cy.server()
    // cy.route('GET', '/api/takeaways', 'fixture:takeaways.json')
    // cy.intercept('GET', '/api/takeaways', { fixture: 'takeaways.json' });
  });

  it('should display a list of fetched takeaways', () => {
    cy.get('[data-cy="takeaway-item"]').should('have.length.at.least', 2);
  });

  it('should add a new takeaway.', () => {
    cy.intercept('POST', '/takeaways/new*', {
      success: true,
    }).as('createTakeaway');

    cy.login();

    cy.get('a').contains('+ Add a new takeaway').click();

    cy.get('[data-cy="title"]').click();
    cy.get('[data-cy="title"]').type('Cypress queues commands');
    cy.get('[data-cy="body"]').type('Sample Test Body.');
    cy.get('[data-cy="create-takeaway"]').click();

    cy.wait('@createTakeaway')
      .its('request.body')
      .should('match', /Cypress.*Sample/);
  });
});
