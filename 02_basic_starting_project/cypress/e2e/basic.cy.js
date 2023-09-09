/// <reference types="Cypress" />

describe('Tasks Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/').as('home');
  });

  it('Should Render the Main Image', () => {
    cy.get('[data-cy=main-image]').should('exist');
    cy.get('[data-cy=main-image]').should('have.attr', 'src');
    cy.get('[data-cy=main-image]')
      .should('have.attr', 'alt')
      .should('be.equal', 'TasksImage');

    // cy.get('.main-header img')
    // cy.get('.main-header').find('img')
  });

  it('Should Render the Main Title', () => {
    // cy.get('[data-cy=main-title]').should('exist');
    // cy.get('[data-cy=main-title]').should('have.text', 'React Tasks');

    cy.get('h1').should('have.class', 'main-title').and('have.length', 1);
    // cy.get('h1').should('have.length', 1);

    cy.get('[data-cy=main-title]')
      .should('exist')
      .and('have.text', 'React Tasks');

    // cy.get('[data-cy=main-title]').contains('React');
  });
});
