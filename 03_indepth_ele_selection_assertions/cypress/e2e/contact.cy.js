/// <reference types='Cypress' />;

describe('Contact Form', () => {
  beforeEach(() => {
    cy.visit('/about');
  });

  it('Should submit the form', () => {
    cy.getById('contact-input-message').type('Hello World!');
    cy.getById('contact-input-name').type('John Doe');

    cy.getById('contact-btn-submit').then(($btn) => {
      expect($btn.text()).to.equal('Send Message');
      expect($btn).to.not.have.attr('disabled');
      expect($btn.attr('disabled')).to.be.undefined;
    });

    cy.getById('contact-input-email').type('john@gmail.com{enter}');

    cy.getById('contact-btn-submit').as('submitBtn');

    // cy.get('@submitBtn')
    //   .should('not.be.disabled')
    //   .and('have.text', 'Send Message');
    // cy.get('@submitBtn').click();
    cy.get('@submitBtn').should('be.disabled');
    // cy.get('@submitBtn').should('have.attr', 'disabled');
    cy.get('@submitBtn').should('have.text', 'Sending...');
  });

  it('Should validate the form inputs', () => {
    cy.getById('contact-btn-submit').as('submitBtn');
    // cy.get('@submitBtn').click();

    cy.submitForm();

    cy.get('@submitBtn').then(($btn) => {
      expect($btn).to.not.have.attr('disabled');
      expect($btn.attr('disabled')).to.be.undefined;
      expect($btn.text()).to.equal('Send Message');
    });

    cy.getById('contact-input-message').as('messageInput');
    cy.getById('contact-input-name').as('nameInput');
    cy.getById('contact-input-email').as('emailInput');

    cy.screenshot('BeforeBlur');
    cy.get('@messageInput').focus().blur();
    cy.get('@messageInput')
      .parent()
      .should('have.attr', 'class')
      .and('match', /invalid/);
    cy.screenshot('AfterMessageInputBlur');

    cy.get('@nameInput').focus().blur();
    cy.get('@nameInput')
      .parent()
      .should('have.attr', 'class')
      .and('match', /invalid/);
    cy.screenshot('AfterNameInputBlur');

    cy.get('@emailInput').focus().blur();
    cy.get('@emailInput')
      .parent()
      .should('have.attr', 'class')
      .and('match', /invalid/);
    cy.screenshot('AfterEmailInputBlur');

    cy.get('@emailInput')
      .parent()
      .should((el) => {
        expect(el.attr('class')).not.to.be.undefined;
        expect(el.attr('class')).contain('invalid');
      });
  });
});

// .then((el) => {
//   expect(el.attr('class')).to.contain('invalid');
// });
