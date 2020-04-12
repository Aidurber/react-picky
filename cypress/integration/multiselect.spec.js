describe('multiselect', () => {
  before(() => {
    cy.visit('/');
  });
  afterEach(() => {
    cy.reload();
  });
  it('selects options', () => {
    cy.get('#multi').click();
    cy.get('#multi [data-testid="dropdown"]').should('be.visible');
    cy.get('#multi [data-testid="option"]')
      .eq(0)
      .click()
      .get('[data-testid="option-checkbox"]')
      .should('be.checked');

    cy.get('#multi [data-testid="option-checkbox"]')
      .eq(1)
      .should('not.be.checked')
      .click()
      .should('be.checked');

    cy.get('#multi [data-testid="picky_placeholder"]').should(
      'have.text',
      'Item 1, Item 2'
    );

    cy.get('#multi [data-testid="option-checkbox"]')
      .eq(1)
      .click();
    cy.get('#multi [data-testid="picky_placeholder"]').should(
      'have.text',
      'Item 1'
    );

    cy.get('#multi [data-testid="selectall-checkbox"]').click();
    cy.get('#multi [data-testid="picky_placeholder"]')
      .should('have.text', '200 selected')
      .get('#multi [data-testid="selectall-checkbox"]')
      .click();

    cy.get('#multi [data-testid="picky_placeholder"]').should(
      'have.text',
      'None selected'
    );

    cy.get('body').click();
    cy.get('#multi [data-testid="dropdown"]').should('not.be.visible');
  });
});
