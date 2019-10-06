describe('multiselect', () => {
  before(() => {
    cy.visit('/tests/multiselect');
  });
  beforeEach(() => {
    cy.get('#reset-button').click();
    cy.togglePicky();
  });

  it('can select an item', () => {
    cy.option(0).click();
    cy.option(0)
      .find('input')
      .should('be.checked');
    cy.get('.picky__placeholder').should('have.text', 'Item 1');
    cy.option(0).click();
    cy.option(0)
      .find('input')
      .should('not.be.checked');
    cy.get('.picky__placeholder').should('have.text', 'None selected');

    cy.option(0).click();
    cy.option(1).click();
    cy.get('.picky__placeholder').should('have.text', 'Item 1, Item 2');
    cy.option(0).should('have.attr', 'aria-selected', 'true');
    cy.option(1).should('have.attr', 'aria-selected', 'true');
    cy.option(2).should('have.attr', 'aria-selected', 'false');
  });

  it('can select all', () => {
    cy.get('#multiselect-option-selectall').should('have.text', 'Select all');
    cy.selectAll();
    cy.get('.picky__placeholder').should('have.text', '20 selected');
    cy.selectAll();
  });
  it('should not have select all checked when a single value is deselected', () => {
    cy.selectAll();
    cy.get('.picky__placeholder').should('have.text', '20 selected');
    cy.get('#multiselect-option-selectall input').should('be.checked');
    cy.option(0).click();
    cy.get('#multiselect-option-selectall input').should('not.be.checked');
    cy.option(0).click();
    cy.get('#multiselect-option-selectall input').should('be.checked');
  });
  it('can filter', () => {
    cy.get('.picky__filter__input').type('1');
  });

  it('cannot selectAll when includeSelectAll is disabled', () => {
    cy.get('#includeSelectAll')
      .click()
      .should('not.be.checked');
    cy.togglePicky();
    cy.get('#multiselect-option-selectall').should('not.exist');
  });
  it('cannot filter when includeFilter is disabled', () => {
    cy.get('#includeFilter')
      .click()
      .should('not.be.checked');
    cy.togglePicky();
    cy.get('.picky__filter__input').should('not.exist');
    cy.option(0).should('have.text', 'Item 1');
    cy.option(1).should('have.text', 'Item 2');
  });

  it('should clear filter on close when clearFilterOnClose is enabled', () => {
    cy.get('#clearFilterOnClose')
      .click()
      .should('be.checked');

    cy.togglePicky();
    cy.get('.picky__filter__input').type('1');
    cy.option(0).should('have.text', 'Item 1');
    cy.option(1).should('have.text', 'Item 10');
    cy.togglePicky();
    cy.togglePicky();
    cy.option(0).should('have.text', 'Item 1');
    cy.option(1).should('have.text', 'Item 2');

    // Without the prop it should clear
    cy.get('#clearFilterOnClose')
      .click()
      .should('not.be.checked');
    cy.togglePicky();
    cy.get('.picky__filter__input').type('1');
    cy.option(0).should('have.text', 'Item 1');
    cy.option(1).should('have.text', 'Item 10');
    cy.togglePicky();
    cy.togglePicky();
    cy.option(0).should('have.text', 'Item 1');
    cy.option(1).should('have.text', 'Item 10');
  });

  it('should be disabled with disabled prop', () => {
    cy.get('#disabled')
      .click()
      .should('be.checked');
    cy.get('#multiselect__button__button').should('have.attr', 'disabled');
    cy.togglePicky({ force: true });
    cy.get('#disabled')
      .click()
      .should('not.be.checked');

    cy.get('#multiselect__button__button').should('not.have.attr', 'disabled');
  });

  it('should not try to filter with whitespace', () => {
    cy.get('#clearFilterOnClose')
      .click()
      .should('be.checked');
    cy.togglePicky();
    cy.get('.picky__filter__input').type('             ');
    cy.option(0).should('have.text', 'Item 1');
    cy.option(1).should('have.text', 'Item 2');
  });
  it('should not find anything with incorrect case and case sensitive filter enabled', () => {
    cy.get('#clearFilterOnClose')
      .click()
      .should('be.checked');
    cy.get('#caseSensitiveFilter')
      .click()
      .should('be.checked');
    cy.togglePicky();
    cy.get('.picky__filter__input').type('item');
    cy.option(0).should('not.exist');
  });

  it('should have filter focused if defaultFocusFilter is set to true', () => {
    cy.get('#clearFilterOnClose')
      .click()
      .should('be.checked');
    cy.get('#defaultFocusFilter')
      .click()
      .should('be.checked');
    cy.togglePicky();
    cy.focused().should('have.class', 'picky__filter__input');
  });
});
