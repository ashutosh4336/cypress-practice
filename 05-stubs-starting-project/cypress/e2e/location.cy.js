/// <reference types="cypress" />

describe('share location', () => {
  beforeEach(() => {
    cy.clock();
    // cy.visit('/').then((win) => {
    //   cy.stub(win.navigator.geolocation, 'getCurrentPosition').callsFake(
    //     (cb) => {
    //       return cb({
    //         coords: {
    //           latitude: 11,
    //           longitude: 22,
    //         },
    //       });
    //     }
    //   );
    // });

    cy.fixture('user-location.json').as('userLocationDB');

    cy.visit('/').then((win) => {
      cy.get('@userLocationDB').then((position) => {
        cy.stub(win.navigator.geolocation, 'getCurrentPosition')
          .as('userLocation')
          .callsFake((cb) => {
            setTimeout(() => {
              return cb(position);
            }, 100);
          });
      });

      cy.stub(win.navigator.clipboard, 'writeText')
        .as('copyToClipboard')
        .resolves();

      cy.spy(win.localStorage, 'setItem').as('setItem');
      cy.spy(win.localStorage, 'getItem').as('getItem');
    });
  });

  it('should fetch the user location', () => {
    cy.get('[data-cy="get-loc-btn"]').click();
    cy.get('@userLocation').should('be.calledOnce');
    cy.get('[data-cy="get-loc-btn"]').should('be.disabled');
    cy.get('[data-cy="actions"]').should('contain', 'Location fetched!');
  });

  // cy.task('getClipboard').then((data) => {
  //   expect(data).to.eq(
  //     'https://www.bing.com/maps?cp=11~22&lvl=15&style=r&sp=point.11_22_Shraddha%20Kapoor'
  //   );
  // });

  it('should share a location URL.', () => {
    const typedName = 'Shraddha Kapoor';
    cy.get('[data-cy="name-input"]').type(typedName);
    cy.get('[data-cy="get-loc-btn"]').click();
    cy.get('[data-cy="share-loc-btn"]').click();

    cy.get('@copyToClipboard').should('be.calledOnce');

    cy.get('@userLocationDB').then((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      cy.get('@copyToClipboard').should(
        'have.been.calledWithMatch',
        new RegExp(`${lat}.*${lon}.*${encodeURI(typedName)}`)
      );

      cy.get('@setItem').should('have.been.called');
      cy.get('@setItem').should(
        'have.been.calledWithMatch',
        /Shraddha Kapoor/,
        new RegExp(`${lat}.*${lon}.*${encodeURI(typedName)}`)
      );
    });

    cy.get('[data-cy="share-loc-btn"]').click();
    cy.get('@getItem').should('have.been.called');
    cy.get('[data-cy="info-message"]').should('be.visible');
    cy.get('[data-cy="info-message"]').should('have.class', 'visible');

    cy.tick(6000);
    cy.get('[data-cy="info-message"]').should('not.be.visible');
  });
});
