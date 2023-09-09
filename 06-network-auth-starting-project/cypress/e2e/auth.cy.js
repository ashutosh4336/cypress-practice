/// <reference types="cypress" />

describe('Authentication', () => {
  beforeEach(() => {
    cy.task('seedDatabase');

    //    cy.visit('/');
  });

  it('Should signup', () => {
    cy.visit('/signup');

    cy.get('[data-cy="auth-email"]').click();

    cy.get('[data-cy="auth-email"]').type('ashutosh@example.com');
    cy.get('[data-cy="auth-password"]').type('ashutoshPassword');
    cy.get('[data-cy="auth-submit"]').click();

    cy.location('pathname').should('eq', '/takeaways');
    cy.getCookies().should('have.length', 1);

    cy.getCookie('__session').its('value').should('not.be.empty').and('exist');
  });

  it('Should Login', () => {
    cy.visit('/login');

    cy.get('[data-cy="auth-email"]').click();

    cy.login();

    cy.location('pathname').should('eq', '/takeaways');
    cy.getCookies().should('have.length', 1);

    cy.getCookie('__session').its('value').should('not.be.empty').and('exist');
  });

  it('Login Fail', () => {
    cy.visit('/login');

    cy.get('[data-cy="auth-email"]').click();

    cy.get('[data-cy="auth-email"]').type('invalid@example.com');
    cy.get('[data-cy="auth-password"]').type('invalidPassword');
    cy.get('[data-cy="auth-submit"]').click();

    cy.location('pathname').should('eq', '/login');
    cy.getCookies().should('have.length', 0);

    cy.getCookie('__session').should('not.exist');

    cy.contains('Invalid credentials.');
  });

  it('Should logout', () => {
    cy.login();

    cy.get('[data-cy="logout-btn"]').click();
    cy.location('pathname').should('eq', '/');

    cy.getCookie('__session').its('value').should('be.empty');
  });
});
