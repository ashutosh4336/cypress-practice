/// <reference types="Cypress" />

describe('Tasks Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/').as('home');
  });

  it('SHould open and close new task modal.', () => {
    cy.get('[data-cy=start-add-task-button]').click();
    cy.get('dialog').should('have.class', 'modal').should('be.visible');

    cy.get('.backdrop').click({ force: true });

    cy.get('.backdrop').should('not.exist');
    cy.get('dialog.modal').should('not.exist');

    // click on cancel button to close modal
    cy.get('[data-cy=start-add-task-button]').click();

    cy.get('p.actions > button').filter(':contains("Cancel")').click();

    cy.get('.backdrop').should('not.exist');
    cy.get('dialog.modal').should('not.exist');
  });
});

describe('Tasks Management', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/').as('home');
  });

  it('Should create a new task', () => {
    cy.get('[data-cy=start-add-task-button]').click();

    const taskTitle = randomStringWithLength(10);
    const taskSummary = randomStringWithLength(30);
    const randomNumber = Math.floor(Math.random() * 100);
    const selectCategory =
      randomNumber > 0 && randomNumber < 25
        ? 'urgent'
        : randomNumber > 25 && randomNumber < 50
        ? 'important'
        : randomNumber > 50 && randomNumber < 75
        ? 'moderate'
        : 'low';

    cy.get('input[name="title"]').type(taskTitle);
    cy.get('textarea[name="summary"]').type(taskSummary);
    cy.get('select[name="category"]').select(selectCategory);

    cy.get('p.actions > button').filter(':contains("Add Task")').click();

    cy.get('dialog.modal').should('not.exist');
    cy.get('.backdrop').should('not.exist');

    cy.get('ul.task-list > li').should('have.length', 1);
    cy.get('ul.task-list > li.task > div > .task-title').should(
      'have.text',
      taskTitle
    );
    cy.get('ul.task-list > li.task > div > .task-summary').should(
      'have.text',
      taskSummary
    );
  });

  it('Should validate user input.', () => {
    cy.get('[data-cy=start-add-task-button]').click();

    cy.get('p.actions > button').filter(':contains("Add Task")').click();

    cy.get('p.error-message').should('exist').should('be.visible');
  });

  it('Filter Tasks on category', () => {
    cy.get('[data-cy=start-add-task-button]').click();

    const selectCategory = 'urgent';

    cy.get('input[name="title"]').type(`I'm an urgent task`);
    cy.get('textarea[name="summary"]').type(`I'm an urgent task summary.`);
    cy.get('select[name="category"]').select(selectCategory);

    cy.get('p.actions > button').filter(':contains("Add Task")').click();

    cy.get('select[name="filter-tasks"]').select(selectCategory);
    cy.get('ul.task-list > li').should('have.length', 1);

    cy.get('select[name="filter-tasks"]').select('important');
    cy.get('ul.task-list > li').should('have.length', 0);

    cy.get('select[name="filter-tasks"]').select('moderate');
    cy.get('ul.task-list > li').should('have.length', 0);

    cy.get('select[name="filter-tasks"]').select('low');
    cy.get('ul.task-list > li').should('have.length', 0);
  });
});

const randomStringWithLength = (length) => {
  const chars =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';

  for (let i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
};
