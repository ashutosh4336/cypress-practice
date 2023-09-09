describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173/').as('cypressExample');

    cy.get('li').should('have.length', 6);
  });
});
