/// <reference types="Cypress" />

describe('Takeaways', () => {
  beforeEach(() => {
    cy.task('seedDatabase');

    cy.visit('/');
  });

  it('News letter signup.', () => {
    cy.intercept('POST', '/newsletter*', {
      fixture: 'newsletter-success.json',
    }).as(
      'newsLetterReq' // 👈 INTERCEPT POST REQUEST
    );

    cy.get('[data-cy="newsletter-email"]').type('ashutosh@example.com');
    cy.get('[data-cy="newsletter-submit"]').click();
    cy.wait('@newsLetterReq'); // 👈 WAIT FOR THE REQUEST TO FINISH
    cy.contains('Thanks for signing up!');
  });

  it('Should display validation error.', () => {
    cy.intercept('POST', '/newsletter*', {
      fixture: 'newsletter-failure.json',
    }).as(
      'newsLetterReq' // 👈 INTERCEPT POST REQUEST
    );
    cy.get('[data-cy="newsletter-email"]').type('ashutosh@example.com');
    cy.get('[data-cy="newsletter-submit"]').click();
    cy.wait('@newsLetterReq'); // 👈 WAIT FOR THE REQUEST TO FINISH
    cy.contains('This email is already subscribed.');
  });

  it('Should successfully signup.', () => {
    cy.request({
      method: 'POST',
      url: '/newsletter',
      body: {
        email: 'ashutosh@ashutosh.app',
      },
      form: true,
    }).then((response) => {
      console.log(response);
      expect(response.body).to.have.property('status', 201);
      expect(response.status).to.eq(201);
    });
  });
});
