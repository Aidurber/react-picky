describe('singleselect', () => {
  before(() => {
    cy.visit('/');
  });
  afterEach(() => {
    cy.reload();
  });
  it('selects options', () => {
    cy.get('#single').click();
    cy.get('#single [data-testid="dropdown"]').should('be.visible');
    cy.get('#single [data-testid="option"]')
      .eq(0)
      .click()
      .get('[data-testid="option-checkbox"]')
      .should('be.checked');

    cy.get('#single [data-testid="option-checkbox"]')
      .eq(1)
      .should('not.be.checked')
      .click()
      .should('be.checked');
    // deselects the previous option
    cy.get('[data-testid="option-checkbox"]')
      .eq(0)
      .should('not.be.checked');
    cy.get('#single [data-testid="picky_placeholder"]').should(
      'have.text',
      'Item 2'
    );

    cy.get('body').click();
    cy.get('#single [data-testid="dropdown"]').should('not.be.visible');
  });
});
