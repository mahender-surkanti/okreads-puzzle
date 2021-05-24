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

  it('Test the snackbar message', () => {
    cy.get('input[type="search"]').type('stocks');
    cy.contains('Want to Read').click();
    cy.on('snackBar', (str) => {
      expect(str).to.include('Book Added!!');
    });
    cy.contains('Undo').click();
  });
});
