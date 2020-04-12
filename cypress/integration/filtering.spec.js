describe('filtering', () => {
  before(() => {
    cy.visit('/');
  });
  afterEach(() => {
    cy.reload();
  });
  it('should filter', () => {
    cy.get('#multi').click();
    cy.get('#multi-option-0').should('have.text', 'Item 1');
    cy.get('#multi-option-1').should('have.text', 'Item 2');

    cy.get('#multi .picky__filter__input').type('2');
    cy.get('#multi')
      .find('#multi-option-0')
      .should('have.text', 'Item 2');
    cy.get('#multi')
      .find('#multi-option-1')
      .should('have.text', 'Item 12');
  });
});
