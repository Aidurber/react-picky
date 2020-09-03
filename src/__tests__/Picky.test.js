import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { Picky } from '../Picky';
import { Filter } from '../Filter';

const corePickyProps = {
  id: 'picky-test-id',
};

describe('Picky', () => {
  afterEach(cleanup);

  it('should have Placeholder component', () => {
    const { getByTestId } = render(<Picky {...corePickyProps} value={[]} />);
    expect(getByTestId('picky_placeholder')).toBeDefined();
  });

  it('should accept render prop', () => {
    const renderPropMock = jest.fn();
    renderPropMock.mockReturnValue(<p />);
    render(
      <Picky
        {...corePickyProps}
        value={[1, 2, 3]}
        options={[1, 2, 3, 4, 5]}
        open={true}
        render={renderPropMock}
      />
    );

    expect(renderPropMock).toHaveBeenCalled();
  });

  it('should accept renderList prop', () => {
    const renderListProp = jest.fn();
    const renderProp = jest.fn();
    renderListProp.mockReturnValue(<p />);
    render(
      <Picky
        {...corePickyProps}
        value={[1, 2, 3]}
        options={[1, 2, 3, 4, 5]}
        open={true}
        render={renderProp}
        renderList={renderListProp}
      />
    );

    expect(renderListProp).toHaveBeenCalled();
    expect(renderProp).not.toHaveBeenCalled();
  });

  it('should call render list with correct options', () => {
    const renderListProp = jest.fn();
    const renderProp = jest.fn();
    renderListProp.mockReturnValue(<p />);
    const options = [
      { id: 1, name: '1' },
      { id: 2, name: '2' },
    ];
    render(
      <Picky
        {...corePickyProps}
        value={[]}
        options={options}
        open={true}
        labelKey="name"
        valueKey="id"
        render={renderProp}
        renderList={renderListProp}
        multiple={false}
      />
    );

    const calledWithProps = renderListProp.mock.calls[0][0];
    expect(calledWithProps.items).toHaveLength(options.length);
    expect(calledWithProps.multiple).toEqual(false);
    expect(calledWithProps.selectValue).toBeDefined();
  });

  describe('Virtual Dropdown drawer', () => {
    it('should open if prop open is true', () => {
      const { getByTestId } = render(
        <Picky {...corePickyProps} value={[1, 2, 3]} open={true} />
      );
      expect(getByTestId('dropdown')).toBeTruthy();
    });
    it('should not be open if prop open is false', () => {
      const { queryByTestId } = render(
        <Picky {...corePickyProps} value={[1, 2, 3]} open={false} />
      );
      expect(queryByTestId('dropdown')).toBeFalsy();
    });

    it('should open on click of button', () => {
      const { getByTestId, queryByTestId } = render(
        <Picky {...corePickyProps} value={[1, 2, 3]} />
      );
      expect(queryByTestId('dropdown')).toBeFalsy();
      const input = getByTestId('picky-input');
      fireEvent.click(input);
      expect(queryByTestId('dropdown')).toBeTruthy();
    });
    it('should open on click of button (open by prop)', () => {
      const { getByTestId, queryByTestId } = render(
        <Picky {...corePickyProps} value={[1, 2, 3]} open={true} />
      );
      expect(queryByTestId('dropdown')).toBeTruthy();
      const input = getByTestId('picky-input');
      fireEvent.click(input);
      expect(queryByTestId('dropdown')).toBeFalsy();
    });
    it('should have items', () => {
      const { getAllByTestId } = render(
        <Picky
          {...corePickyProps}
          value={[1, 2, 3]}
          options={[1, 2, 3, 4, 5]}
          open={true}
        />
      );
      expect(getAllByTestId('option')).toHaveLength(5);
    });

    it('should have items selected by default when supplied', () => {
      const { getAllByTestId } = render(
        <Picky
          {...corePickyProps}
          value={[1, 2, 3]}
          options={[1, 2, 3, 4, 5]}
          open={true}
        />
      );
      const selected = getAllByTestId('option').filter(
        opt => opt.dataset.selected
      );
      expect(selected).toHaveLength(3);
      expect(selected[0].textContent).toEqual('1');
      expect(selected[1].textContent).toEqual('2');
      expect(selected[2].textContent).toEqual('3');
    });
    it('should show placeholder if value is an array and none selected', () => {
      const { getByTestId } = render(
        <Picky
          {...corePickyProps}
          value={[]}
          options={[1, 2, 3, 4, 5]}
          open={true}
          multiple
        />
      );

      expect(getByTestId('picky_placeholder').textContent).toEqual(
        'None selected'
      );
    });
    it('should show correct placeholder with selected value, single select', () => {
      const { getByTestId } = render(
        <Picky
          {...corePickyProps}
          value={[1]}
          options={[1, 2, 3, 4, 5]}
          open={true}
          multiple={false}
        />
      );
      expect(getByTestId('picky_placeholder').textContent).toEqual('1');
    });

    it('should show single select placeholder if single select and is defined', () => {
      const singlePlaceholder = val => `You have selected ${val}`;
      const { getByTestId, rerender } = render(
        <Picky
          {...corePickyProps}
          value={2}
          options={[1, 2, 3, 4, 5]}
          open={true}
          multiple={false}
          singleSelectPlaceholder={singlePlaceholder}
        />
      );

      expect(getByTestId('picky_placeholder').textContent).toEqual(
        'You have selected 2'
      );

      rerender(
        <Picky
          {...corePickyProps}
          value={3}
          options={[1, 2, 3, 4, 5]}
          open={true}
          multiple={false}
          singleSelectPlaceholder={singlePlaceholder}
        />
      );
      expect(getByTestId('picky_placeholder').textContent).toEqual(
        'You have selected 3'
      );
    });
    it('should show single select placeholder if single select and is defined with object value', () => {
      const singlePlaceholder = val => `You have selected ${val.label}`;
      const { getByTestId, rerender } = render(
        <Picky
          {...corePickyProps}
          value={{ value: 1, label: 'One' }}
          options={[
            { value: 1, label: 'One' },
            { value: 2, label: 'Two' },
            { value: 3, label: 'Three' },
          ]}
          labelKey="label"
          valueKey="value"
          open={true}
          multiple={false}
          singleSelectPlaceholder={singlePlaceholder}
        />
      );

      expect(getByTestId('picky_placeholder').textContent).toEqual(
        'You have selected One'
      );

      rerender(
        <Picky
          {...corePickyProps}
          value={{ value: 1, label: 'Three' }}
          options={[
            { value: 1, label: 'One' },
            { value: 2, label: 'Two' },
            { value: 3, label: 'Three' },
          ]}
          labelKey="label"
          valueKey="value"
          open={true}
          multiple={false}
          singleSelectPlaceholder={singlePlaceholder}
        />
      );
      expect(getByTestId('picky_placeholder').textContent).toEqual(
        'You have selected Three'
      );
    });
    it('should show correct placeholder with selected value, multi select', () => {
      const { getByTestId, rerender } = render(
        <Picky
          {...corePickyProps}
          value={[1, 2, 3]}
          options={[1, 2, 3, 4, 5]}
          open={true}
          multiple={true}
        />
      );
      expect(getByTestId('picky_placeholder').textContent).toEqual('1, 2, 3');

      rerender(
        <Picky
          {...corePickyProps}
          numberDisplayed={2}
          value={[1, 2, 3]}
          options={[1, 2, 3, 4, 5]}
          open={true}
          multiple={true}
        />
      );
      expect(getByTestId('picky_placeholder').textContent).toEqual(
        '3 selected'
      );
    });
  });

  describe('Selecting', () => {
    it('should accept includeSelectAll option', () => {
      const { getByTestId } = render(
        <Picky
          {...corePickyProps}
          value={[1, 2, 3]}
          includeSelectAll={true}
          options={[1, 2, 3, 4, 5]}
          open={true}
          multiple={true}
        />
      );
      expect(getByTestId('selectall')).toBeTruthy();
    });

    it('should have "select all" text when no selectAllText prop provided', () => {
      const { getByTestId } = render(
        <Picky
          {...corePickyProps}
          value={[1, 2, 3]}
          includeSelectAll={true}
          options={[1, 2, 3, 4, 5]}
          open={true}
          multiple={true}
        />
      );
      expect(getByTestId('select-all-text').textContent).toEqual('Select all');
    });
    it('should support select all text with selectAllText prop', () => {
      const { getByTestId } = render(
        <Picky
          {...corePickyProps}
          value={[1, 2, 3]}
          includeSelectAll={true}
          options={[1, 2, 3, 4, 5]}
          open={true}
          multiple={true}
          selectAllText="Select em all"
        />
      );
      expect(getByTestId('select-all-text').textContent).toEqual(
        'Select em all'
      );
    });

    it('should select all options when select all is clicked', () => {
      const onChange = jest.fn();
      const options = [1, 2, 3, 4, 5];
      const { getByTestId, getAllByTestId } = render(
        <Picky
          {...corePickyProps}
          value={[1, 2, 3]}
          includeSelectAll={true}
          options={options}
          open={true}
          multiple={true}
          onChange={onChange}
        />
      );
      const selectAllItem = getByTestId('selectall');
      const selected = getAllByTestId('option').filter(
        opt => opt.dataset.selected
      );
      expect(selected).toHaveLength(3);
      fireEvent.click(selectAllItem);
      expect(onChange).toHaveBeenLastCalledWith(options);
      fireEvent.click(selectAllItem);
      expect(onChange).toHaveBeenLastCalledWith([]);
    });

    it('should select single value', () => {
      const onChange = jest.fn();
      const { getAllByTestId } = render(
        <Picky
          {...corePickyProps}
          value={1}
          options={[1, 2, 3, 4, 5]}
          open={true}
          onChange={onChange}
        />
      );
      const secondOption = getAllByTestId('option')[1];
      fireEvent.click(secondOption);
      expect(onChange).toHaveBeenLastCalledWith(2);
    });

    it('should select multiple value', () => {
      const onChange = jest.fn();
      const { getAllByTestId } = render(
        <Picky
          {...corePickyProps}
          value={[]}
          options={[1, 2, 3, 4, 5]}
          open={true}
          multiple
          onChange={onChange}
        />
      );
      const secondOption = getAllByTestId('option')[1];
      fireEvent.click(secondOption);
      expect(onChange).toHaveBeenLastCalledWith([2]);
    });

    it('should deselect multiple value', () => {
      const onChange = jest.fn();
      const { getAllByTestId } = render(
        <Picky
          {...corePickyProps}
          value={[2]}
          options={[1, 2, 3, 4, 5]}
          open={true}
          multiple
          onChange={onChange}
        />
      );
      const secondOption = getAllByTestId('option')[1];
      fireEvent.click(secondOption);

      expect(onChange).toHaveBeenLastCalledWith([]);
    });

    it('should support object options single select', () => {
      const options = [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
        { id: 3, name: 'Item 3' },
      ];
      const mockOnChange = jest.fn();
      const { getAllByTestId } = render(
        <Picky
          {...corePickyProps}
          value={undefined}
          options={options}
          open={true}
          valueKey="id"
          labelKey="name"
          onChange={mockOnChange}
        />
      );

      fireEvent.click(getAllByTestId('option')[0]);

      expect(mockOnChange).toHaveBeenLastCalledWith({
        id: 1,
        name: 'Item 1',
      });
    });
    it('should be indeterminate if some options are checked', () => {
      const { getByTestId, getAllByTestId, rerender } = render(
        <Picky
          {...corePickyProps}
          includeSelectAll
          open
          options={[1, 2, 3, 4]}
          value={[]}
          multiple
        />
      );

      const options = getAllByTestId('option');
      // Should have none selected
      // Select a single option
      fireEvent.click(options[0]);

      rerender(
        <Picky
          {...corePickyProps}
          includeSelectAll
          open
          options={[1, 2, 3, 4]}
          value={[1]}
          multiple
        />
      );
      // Checkbox should be indeterminate
      const checkbox = getByTestId('selectall-checkbox');
      expect(checkbox.indeterminate).toBe(true);

      // Should have correct styles

      const selectAll = getByTestId('selectall');
      expect(selectAll.classList.contains('selected')).toBe(false);
    });
  });

  describe('Filter', () => {
    it('should have filter component', () => {
      const { getByTestId } = render(
        <Picky
          {...corePickyProps}
          includeFilter={true}
          open={true}
          value={[]}
        />
      );
      expect(getByTestId('picky__filter__input')).toBeTruthy();
    });

    it('should select only filtered when selectAllMode is "filtered"', () => {
      // We're going to be listening for changes so we're going to need a mock function.
      const mockOnChange = jest.fn();
      // Specify the options that picky is going to use
      const options = ['Boo', 'Moon', 'Cat', 'Dog'];

      // Mount Picky with Enzyme
      const { getByTestId } = render(
        <Picky
          {...corePickyProps}
          options={options}
          value={['Dog']}
          onChange={mockOnChange}
          multiple={true}
          filterDebounce={0}
          open={true}
          selectAllMode="filtered"
          includeFilter={true}
          includeSelectAll={true}
        />
      );

      /**
       *  Lets change the filter input to 'oo', this should leave us with 2 options in the filter
       *  - Moon
       *  - Boo
       */
      const input = getByTestId('picky__filter__input');

      fireEvent.change(input, { target: { value: 'oo' } });

      // Find the Select All button in the DOM
      const selectAllButton = getByTestId('selectall');
      // Click the select all button
      fireEvent.click(selectAllButton);

      // The value should be "Moon" and "Boo"
      // Dog was selected before so it should still be returned
      expect(mockOnChange).toHaveBeenLastCalledWith(['Dog', 'Boo', 'Moon']);

      // Deselect all
      fireEvent.click(selectAllButton);

      // Should be the original values when we deslect, as we don't want to deselect everything
      expect(mockOnChange).toHaveBeenLastCalledWith(['Dog']);

      // Remove the filter text from 'oo' to ''
      fireEvent.change(input, { target: { value: '' } });
      // Checkbox should be indeterminate
      const checkbox = getByTestId('selectall-checkbox');
      expect(checkbox.indeterminate).toEqual(true);
      // Lets select all again when we have no filter
      fireEvent.click(selectAllButton);

      // Should return all values since we're no longer filtered and we can see every option
      expect(mockOnChange).toHaveBeenLastCalledWith([
        'Boo',
        'Moon',
        'Cat',
        'Dog',
      ]);

      // Lets deselect all when we're not filtered. This should completely remove all options
      fireEvent.click(selectAllButton);

      expect(mockOnChange).toHaveBeenLastCalledWith([]);
    });
    it('should be focused by default if defaultFocusFilter is true', () => {
      const { getByTestId } = render(
        <Picky
          {...corePickyProps}
          includeFilter={true}
          value={[]}
          defaultFocusFilter={true}
          open={true}
        />
      );
      const input = getByTestId('picky__filter__input');

      expect(input).toEqual(document.activeElement);
    });

    it('should call onFilterChange prop when text has changed', () => {
      const onChange = jest.fn();
      const { getByTestId } = render(
        <Filter tabIndex={0} onFilterChange={onChange} />
      );
      fireEvent.change(getByTestId('picky__filter__input'), {
        target: { value: '123' },
      });
      expect(onChange).toHaveBeenCalledWith('123');
    });

    it('should filter values', () => {
      const onFiltered = jest.fn();
      const { getByTestId } = render(
        <Picky
          {...corePickyProps}
          options={[1, 2, 3, 4]}
          value={[]}
          multiple={true}
          filterDebounce={0}
          open={true}
          includeFilter={true}
          onFiltered={onFiltered}
        />
      );
      const input = getByTestId('picky__filter__input');
      fireEvent.change(input, { target: { value: '1' } });
      expect(onFiltered).toHaveBeenLastCalledWith([1]);
    });

    it('should filter values when case sensitive', () => {
      const onFiltered = jest.fn();

      const options = [
        { label: 'Item 1', value: 1 },
        { label: 'item 2', value: 2 },
        { label: 'item 3', value: 3 },
        { label: 'Item 4', value: 4 },
      ];
      const { getByTestId } = render(
        <Picky
          {...corePickyProps}
          options={options}
          value={[]}
          valueKey="value"
          labelKey="label"
          caseSensitiveFilter={true}
          multiple={true}
          filterDebounce={0}
          open={true}
          includeFilter={true}
          onFiltered={onFiltered}
        />
      );
      const input = getByTestId('picky__filter__input');

      fireEvent.change(input, { target: { value: 'i' } });

      expect(onFiltered).toHaveBeenLastCalledWith([
        { label: 'item 2', value: 2 },
        { label: 'item 3', value: 3 },
      ]);
    });

    it('should process filter term', () => {
      const onFiltered = jest.fn();

      const options = [
        { label: 'Item 1', value: 1 },
        { label: 'Item 2', value: 2 },
      ];
      const processor = jest.fn().mockImplementation(term => term.trim());
      const { getByTestId } = render(
        <Picky
          {...corePickyProps}
          options={options}
          value={[]}
          valueKey="value"
          labelKey="label"
          multiple={true}
          filterDebounce={0}
          open={true}
          filterTermProcessor={processor}
          includeFilter={true}
          onFiltered={onFiltered}
        />
      );
      const input = getByTestId('picky__filter__input');
      const filterValue = '  item 1  ';
      fireEvent.change(input, { target: { value: filterValue } });
      expect(processor).toHaveBeenCalledWith(filterValue);
      expect(onFiltered).toHaveBeenLastCalledWith([
        { label: 'Item 1', value: 1 },
      ]);
    });

    it('shouldnt filter if filter query is blank or empty string', () => {
      const onFiltered = jest.fn();

      const { getByTestId } = render(
        <Picky
          {...corePickyProps}
          options={[1, 2, 3, 4]}
          value={[]}
          multiple={true}
          filterDebounce={0}
          open={true}
          includeFilter={true}
          onFiltered={onFiltered}
        />
      );
      const input = getByTestId('picky__filter__input');
      fireEvent.change(input, { target: { value: '   ' } });
      expect(onFiltered).not.toHaveBeenCalled();
    });

    it('should filter object arrays', () => {
      const onFiltered = jest.fn();
      const options = [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 3' },
      ];
      const { getByTestId } = render(
        <Picky
          {...corePickyProps}
          options={options}
          value={[]}
          multiple={true}
          filterDebounce={0}
          open={true}
          includeFilter={true}
          labelKey="name"
          valueKey="id"
          onFiltered={onFiltered}
        />
      );

      const input = getByTestId('picky__filter__input');
      fireEvent.change(input, { target: { value: '1' } });
      expect(onFiltered).toHaveBeenLastCalledWith([
        {
          id: 1,
          name: 'Item 1',
        },
      ]);
    });

    it('should not call onClose on focusing with autoclose mode after select', () => {
      const onCloseMock = jest.fn();
      const { getByTestId } = render(
        <Picky
          {...corePickyProps}
          options={[1, 2, 3, 4]}
          value={[]}
          multiple={false}
          keepOpen={false}
          open={false}
          includeFilter={true}
          onClose={onCloseMock}
        />
      );

      // Open it
      const component = getByTestId('picky-input');
      fireEvent.click(component);

      // Focus on input
      const filterInput = getByTestId('picky__filter__input');
      fireEvent.click(filterInput);

      // Dropdown should't close
      expect(onCloseMock).toHaveBeenCalledTimes(0);
    });

    it('should not show select all when a filter has been entered', () => {
      const { getByTestId, queryByTestId } = render(
        <Picky
          {...corePickyProps}
          value={[]}
          includeSelectAll={true}
          options={[1, 2, 3]}
          open={true}
          filterDebounce={0}
          includeFilter={true}
          multiple={true}
        />
      );
      expect(queryByTestId('selectall')).toBeTruthy();
      fireEvent.change(getByTestId('picky__filter__input'), {
        target: { value: '1' },
      });
      expect(queryByTestId('selectall')).toBeFalsy();
    });

    it('should show select all when a filter has been entered but selectAllMode is filtered', () => {
      const { getByTestId } = render(
        <Picky
          {...corePickyProps}
          value={[]}
          includeSelectAll={true}
          options={[1, 2, 3]}
          open={true}
          filterDebounce={0}
          includeFilter={true}
          multiple={true}
          selectAllMode="filtered"
        />
      );
      expect(getByTestId('selectall')).toBeTruthy();

      fireEvent.change(getByTestId('picky__filter__input'), {
        target: { value: '1' },
      });

      expect(getByTestId('selectall')).toBeTruthy();
    });

    it('should retain filter on close', () => {
      const { getByTestId, queryAllByTestId } = render(
        <Picky
          {...corePickyProps}
          value={[]}
          includeSelectAll={true}
          options={['Moo', 'Cat', 'Boo']}
          filterDebounce={0}
          includeFilter={true}
          multiple={true}
        />
      );

      const button = getByTestId('picky-input');
      const input = getByTestId('picky__filter__input');

      fireEvent.click(button);

      fireEvent.change(input, { target: { value: 'oo' } });

      expect(queryAllByTestId('option')[0].textContent).toEqual('Moo');
      expect(queryAllByTestId('option')[1].textContent).toEqual('Boo');

      // Close
      fireEvent.click(button);

      // Open
      fireEvent.click(button);
      expect(queryAllByTestId('option')[0].textContent).toEqual('Moo');
      expect(queryAllByTestId('option')[1].textContent).toEqual('Boo');
    });
    it('should retain clear filter on close with clearFilterOnClose prop', () => {
      const { getByTestId, queryAllByTestId } = render(
        <Picky
          {...corePickyProps}
          clearFilterOnClose={true}
          value={[]}
          includeSelectAll={true}
          options={['Moo', 'Cat', 'Boo']}
          filterDebounce={0}
          includeFilter={true}
          multiple={true}
        />
      );

      const button = getByTestId('picky-input');
      const input = getByTestId('picky__filter__input');

      fireEvent.click(button);

      fireEvent.change(input, { target: { value: 'oo' } });

      expect(queryAllByTestId('option')[0].textContent).toEqual('Moo');
      expect(queryAllByTestId('option')[1].textContent).toEqual('Boo');

      // Close
      fireEvent.click(button);

      // Open
      fireEvent.click(button);

      expect(queryAllByTestId('option')[0].textContent).toEqual('Moo');
      expect(queryAllByTestId('option')[1].textContent).toEqual('Cat');
      expect(queryAllByTestId('option')[2].textContent).toEqual('Boo');
    });
  });

  describe('Callbacks', () => {
    it('should call onOpen and on close', () => {
      const onOpenMock = jest.fn();
      const onCloseMock = jest.fn();
      const { getByTestId } = render(
        <Picky
          {...corePickyProps}
          options={[1, 2, 3, 4]}
          value={[]}
          multiple={true}
          filterDebounce={0}
          open={false}
          includeFilter={true}
          onOpen={onOpenMock}
          onClose={onCloseMock}
        />
      );

      fireEvent.click(getByTestId('picky-input'));
      expect(onOpenMock).toHaveBeenCalled();
      fireEvent.click(getByTestId('picky-input'));
      expect(onCloseMock).toHaveBeenCalled();
    });
  });

  it('should not render custom selectall when renderSelectAll prop is not supplied', () => {
    const { getByTestId } = render(
      <Picky
        {...corePickyProps}
        options={[]}
        open={true}
        includeSelectAll={true}
        multiple={true}
      />
    );
    const selAllText = getByTestId('select-all-text');
    expect(selAllText).toBeTruthy();
  });
  it('should not render custom selectall when renderSelectAll prop is not supplied', () => {
    const renderSelectAllMock = jest.fn();
    render(
      <Picky
        {...corePickyProps}
        options={[1, 2, 3, 4]}
        open={true}
        includeSelectAll={true}
        multiple={true}
        renderSelectAll={renderSelectAllMock}
      />
    );
    const calledWithProps = renderSelectAllMock.mock.calls[0][0];
    expect(calledWithProps.filtered).toEqual(false);
    expect(calledWithProps.multiple).toEqual(true);
    expect(calledWithProps.allSelected).toEqual('none');
    expect(calledWithProps.tabIndex).toEqual(0);
  });

  describe('Regressions', () => {
    describe('Issue #36', () => {
      it('should highlight selected items, isSelected should be true', () => {
        const items = Array.from(Array(10).keys()).map(v => {
          return {
            id: v + 1,
            name: `Label ${v + 1}`,
          };
        });
        const { getAllByTestId } = render(
          <Picky
            {...corePickyProps}
            multiple={true}
            open={true}
            options={items}
            value={[
              { id: 1, name: 'Label 1' },
              { id: 2, name: 'Label 2' },
              { id: 3, name: 'Label 3' },
              { id: 4, name: 'Label 4' },
              { id: 5, name: 'Label 5' },
            ]}
            labelKey="name"
            valueKey="id"
          />
        );
        const options = getAllByTestId('option');
        const selectedOptions = options.filter(opt => opt.dataset.selected);
        expect(selectedOptions).toHaveLength(5);
        expect(options).toHaveLength(10);
        expect(Boolean(options[0].getAttribute('aria-selected'))).toEqual(true);
      });
    });

    describe('Issue #39', () => {
      test('should set selectedValue state when async value prop updates', () => {
        const mockOnChange = jest.fn();
        const { rerender, getAllByTestId } = render(
          <Picky
            {...corePickyProps}
            multiple
            open
            value={[]}
            options={[]}
            onChange={mockOnChange}
          />
        );

        rerender(
          <Picky
            {...corePickyProps}
            multiple
            open
            value={['1', '2']}
            options={['1', '2', '3', '4', '5']}
            onChange={mockOnChange}
          />
        );

        const options = getAllByTestId('option');
        expect(options).toHaveLength(5);
      });
      test('with async value when selecting option should not unselect all other options', done => {
        const onChangeMock = jest.fn();
        const { rerender, getAllByTestId } = render(
          <Picky
            {...corePickyProps}
            multiple
            open
            value={[]}
            options={[]}
            onChange={onChangeMock}
          />
        );

        setTimeout(() => {
          rerender(
            <Picky
              {...corePickyProps}
              multiple
              open
              value={['1', '2']}
              options={['1', '2', '3', '4', '5']}
              onChange={onChangeMock}
            />
          );
          fireEvent.click(getAllByTestId('option')[2]);

          expect(onChangeMock).toHaveBeenCalledWith(['1', '2', '3']);
          done();
        }, 20);
      });
    });
    /**
     * Select all - All selected not calculated properly
     */
    describe('Issue #68', () => {
      test('select all should be false when deslecting single value', () => {
        const onChangeMock = jest.fn();
        const ALL_SELECTED_TEXT = 'All selected';
        const { getByTestId, getAllByTestId, rerender } = render(
          <Picky
            {...corePickyProps}
            multiple
            open
            value={[]}
            options={[1, 2, 3, 4]}
            onChange={onChangeMock}
            includeSelectAll
            allSelectedPlaceholder={ALL_SELECTED_TEXT}
          />
        );

        const selectAll = getByTestId('selectall');
        fireEvent.click(selectAll);
        rerender(
          <Picky
            {...corePickyProps}
            multiple
            open
            value={[1, 2, 3, 4]}
            options={[1, 2, 3, 4]}
            onChange={onChangeMock}
            includeSelectAll
            allSelectedPlaceholder={ALL_SELECTED_TEXT}
          />
        );
        // Deselect single option
        fireEvent.click(getAllByTestId('option')[2]);

        expect(onChangeMock).toHaveBeenLastCalledWith([1, 2, 4]);
      });
    });
    /**
     * Filter input gets cleared when the menu closes
     * so if the list is in a filtered state you can't recover
     */
    describe('Issue #73', () => {
      test('should retain the filter value after closing menu', () => {
        const onChangeMock = jest.fn();

        const { getByTestId } = render(
          <Picky
            {...corePickyProps}
            multiple
            value={[]}
            options={[1, 2, 3, 4]}
            onChange={onChangeMock}
            includeSelectAll
            includeFilter
          />
        );
        const component = getByTestId('picky-input');
        fireEvent.click(component);
        // Open it
        const filterInput = getByTestId('picky__filter__input');
        fireEvent.change(filterInput, { target: { value: 'Item' } });

        expect(filterInput.value).toEqual('Item');

        // Close it
        fireEvent.click(component);

        // Reopen and check filter value is the same
        fireEvent.click(component);
        const newFilterInput = getByTestId('picky__filter__input');

        expect(newFilterInput.value).toEqual('Item');
      });
    });

    describe('Issue #76', () => {
      test('should only call onChange once when pressing the checkbox', () => {
        const onChange = jest.fn();

        const { getAllByTestId } = render(
          <Picky
            {...corePickyProps}
            multiple
            value={[1]}
            options={[1, 2, 3]}
            onChange={onChange}
            open={true}
          />
        );
        const chk = getAllByTestId('option-checkbox')[0];
        expect(chk).toBeDefined();
        fireEvent.click(chk);
        expect(onChange).toHaveBeenCalledTimes(1);
      });
      test('should only call onChange once when pressing the select all checkbox', () => {
        const onChange = jest.fn();

        const { getByTestId } = render(
          <Picky
            {...corePickyProps}
            multiple
            value={[1]}
            options={[1, 2, 3]}
            onChange={onChange}
            open={true}
            includeSelectAll
          />
        );
        const chk = getByTestId('selectall-checkbox');
        expect(chk).toBeDefined();
        fireEvent.click(chk);
        expect(onChange).toHaveBeenCalledTimes(1);
      });
      test('should still call onChange when pressing the option', () => {
        const onChange = jest.fn();

        const { getAllByTestId } = render(
          <Picky
            {...corePickyProps}
            multiple
            value={[1]}
            options={[1, 2, 3]}
            onChange={onChange}
            open={true}
          />
        );
        const option = getAllByTestId('option')[0];
        expect(option).toBeDefined();
        fireEvent.click(option);
        expect(onChange).toHaveBeenCalledTimes(1);
      });
    });

    test('should override filter placeholder if supplied', () => {
      const { getByTestId } = render(
        <Picky
          {...corePickyProps}
          options={[1, 2, 3]}
          open={true}
          includeFilter
          filterPlaceholder="Hello..."
        />
      );
      const filter = getByTestId('picky__filter__input');

      expect(filter.placeholder).toEqual('Hello...');
    });
    test('filter placeholder default to Filter... if not supplied', () => {
      const { getByTestId } = render(
        <Picky
          {...corePickyProps}
          options={[1, 2, 3]}
          open={true}
          includeFilter
        />
      );
      const filter = getByTestId('picky__filter__input');

      expect(filter.placeholder).toEqual('Filter...');
    });

    test('should correctly update allSelected when values set programmatically', () => {
      const options = [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
      ];
      const { getByTestId, rerender } = render(
        <Picky
          {...corePickyProps}
          options={options}
          includeSelectAll
          valueKey="id"
          labelKey="name"
          open={true}
          multiple
          value={[]}
        />
      );

      expect(getByTestId('selectall-checkbox').checked).toEqual(false);

      rerender(
        <Picky
          {...corePickyProps}
          options={options}
          includeSelectAll
          valueKey="id"
          labelKey="name"
          open={true}
          multiple
          value={[
            { id: 2, name: 'Item 2' },
            { id: 1, name: 'Item 1' },
          ]}
        />
      );

      expect(getByTestId('selectall-checkbox').checked).toEqual(true);
    });
    test('should correctly update allSelected when values set programmatically simple options', () => {
      const options = [1, 2];
      const { getByTestId, rerender } = render(
        <Picky
          {...corePickyProps}
          options={options}
          includeSelectAll
          open={true}
          multiple
          value={[]}
        />
      );

      expect(getByTestId('selectall-checkbox').checked).toEqual(false);

      rerender(
        <Picky
          {...corePickyProps}
          options={options}
          includeSelectAll
          open={true}
          multiple
          value={[2, 1]}
        />
      );

      expect(getByTestId('selectall-checkbox').checked).toEqual(true);
    });
  });

  it('should be disabled when disabled prop supplied', () => {
    const options = [1, 2];
    const { getByTestId } = render(
      <Picky
        {...corePickyProps}
        options={options}
        includeSelectAll
        open={true}
        multiple
        disabled
        value={[]}
      />
    );

    const selectAllCheckbox = getByTestId('selectall-checkbox');

    expect(selectAllCheckbox.checked).toEqual(false);
    fireEvent(
      selectAllCheckbox,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );

    expect(selectAllCheckbox.checked).toEqual(false);
  });

  it('should not have select all checked when there are no options', () => {
    const options = [];
    const { getByTestId } = render(
      <Picky
        {...corePickyProps}
        options={options}
        includeSelectAll
        open={true}
        multiple
        disabled
        value={[]}
      />
    );
    const selectAllCheckbox = getByTestId('selectall-checkbox');

    expect(selectAllCheckbox.checked).toEqual(false);
  });

  it('should update select all state if rendered again with additional options', () => {
    const { getByTestId, rerender } = render(
      <Picky
        {...corePickyProps}
        options={[1, 2]}
        value={[1, 2]}
        open={true}
        multiple={true}
        includeSelectAll={true}
      />
    );

    expect(getByTestId('selectall-checkbox').checked).toBe(true);

    rerender(
      <Picky
        {...corePickyProps}
        options={[1, 2, 3]}
        value={[1, 2]}
        open={true}
        multiple={true}
        includeSelectAll={true}
      />
    );

    expect(getByTestId('selectall-checkbox').checked).toBe(false);
  });

  it('should pass all buttonProps to button', () => {
    const { getByTestId } = render(
      <Picky
        {...corePickyProps}
        options={[1, 2]}
        buttonProps={{ className: 'btn btn-primary', 'aria-label': 'test' }}
      />
    );

    const button = getByTestId('picky-input');
    expect(button.classList.contains('btn')).toBe(true);
    expect(button.classList.contains('btn-primary')).toBe(true);
    expect(button.getAttribute('aria-label')).toEqual('test');
  });
});
