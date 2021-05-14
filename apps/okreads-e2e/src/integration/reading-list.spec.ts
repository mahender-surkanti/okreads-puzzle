describe('When: I use the reading list feature', () => {
  beforeEach(() => {
    cy.startAt('/');
  });

  xit('Then: I should see my reading list', () => {
    cy.get('[data-testing="toggle-reading-list"]').click();

    cy.get('[data-testing="reading-list-container"]').should(
      'contain.text',
      'My Reading List'
    );
  });

  xit('Test the snackbar message', function() {
    cy.get('input[type="search"]').type('stocks');
    cy.get('[data-testing="want-to-read-button"]').first().click();
    cy.on('snackBar', (str) => {
      expect(str).to.include('Book Added!!');
    });
    cy.wait(2000);
    cy.contains('Undo').click();
   });

   it('Test the Ability to mark a book as finished', function() {
    cy.get('input[type="search"]').type('stocks');
    cy.get('[data-testing="want-to-read-button"]').first().click();
    cy.get('[data-testing="toggle-reading-list"]').click();
    cy.wait(1000);
    cy.get('[data-testing="side-nav-finish-button"]').click();
    cy.wait(1000);
    cy.get('[data-testing="remove-book-circle"]').click();
    cy.wait(1000);
    cy.get('[data-testing="side-nav-close-button"]').click();
   });

});
