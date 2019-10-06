import React from 'react';
import { mount } from 'enzyme';
import { render as rtlRender, fireEvent, cleanup } from 'react-testing-library';

import Placeholder from '../src/Placeholder';
import Picky from '../src/Picky';
import Filter from '../src/Filter';
import Option from '../src/Option';

const sel = id => `[data-testid="${id}"]`;
const selSelected = id => `[data-testid="${id}"][data-selected="selected"]`;

const corePickyProps = {
  id: 'picky-test-id',
};

describe('Picky', () => {
  afterEach(cleanup);

  it('should accept render prop', () => {
    const renderPropMock = jest.fn();
    renderPropMock.mockReturnValue(<p />);
    const wrapper = mount(
      <Picky
        {...corePickyProps}
        value={[1, 2, 3]}
        options={[1, 2, 3, 4, 5]}
        open={true}
        render={renderPropMock}
      />
    );

    expect(wrapper.prop('render')).toBeDefined();
    expect(renderPropMock).toHaveBeenCalled();
  });

  it('should accept renderList prop', () => {
    const renderListProp = jest.fn();
    const renderProp = jest.fn();
    renderListProp.mockReturnValue(<p />);
    const wrapper = mount(
      <Picky
        {...corePickyProps}
        value={[1, 2, 3]}
        options={[1, 2, 3, 4, 5]}
        open={true}
        render={renderProp}
        renderList={renderListProp}
      />
    );

    expect(wrapper.prop('renderList')).toBeDefined();
    expect(renderListProp).toHaveBeenCalled();
    expect(renderProp).not.toHaveBeenCalled();
  });

  it('should call render list with correct options', () => {
    const renderListProp = jest.fn();
    const renderProp = jest.fn();
    renderListProp.mockReturnValue(<p />);
    const options = [{ id: 1, name: '1' }, { id: 2, name: '2' }];
    mount(
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

  describe('Plain Dropdown drawer', () => {
    it('should open if prop open is true', () => {
      const wrapper = mount(
        <Picky
          {...corePickyProps}
          value={[1, 2, 3]}
          open={true}
          virtual={false}
        />
      );
      expect(wrapper.find(sel('dropdown'))).toHaveLength(1);
    });
    it('should not be open if prop open is false', () => {
      const wrapper = mount(
        <Picky
          {...corePickyProps}
          value={[1, 2, 3]}
          open={false}
          virtual={false}
        />
      );
      expect(wrapper.find(sel('dropdown'))).toHaveLength(0);
    });

    it('should have items', () => {
      const wrapper = mount(
        <Picky
          {...corePickyProps}
          value={[1, 2, 3]}
          options={[1, 2, 3, 4, 5]}
          open={true}
          virtual={false}
        />
      );
      expect(wrapper.find(sel('option'))).toHaveLength(5);
    });

    it('should have items selected by default when supplied', () => {
      const wrapper = mount(
        <Picky
          {...corePickyProps}
          value={[1, 2, 3]}
          options={[1, 2, 3, 4, 5]}
          open={true}
          virtual={false}
        />
      );
      const selected = wrapper.find(selSelected('option'));
      expect(selected).toHaveLength(3);
      expect(selected.at(0).text()).toEqual('1');
      expect(selected.at(1).text()).toEqual('2');
      expect(selected.at(2).text()).toEqual('3');
    });
    it('should show correct placeholder with selected value, single select', () => {
      const wrapper = mount(
        <Picky
          {...corePickyProps}
          value={[1]}
          options={[1, 2, 3, 4, 5]}
          open={true}
          multiple={false}
          virtual={false}
        />
      );
      expect(wrapper.find(sel('picky_placeholder')).text()).toEqual('1');
    });
  });

  describe('Selecting', () => {
    it('should support select all text with selectAllText prop', () => {
      const wrapper = mount(
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
      expect(
        wrapper
          .find(sel('select-all-text'))
          .text()
          .toLowerCase()
      ).toEqual('Select em all'.toLowerCase());
    });

    it('should select single value controlled', () => {
      const onChange = jest.fn();
      const wrapper = mount(
        <Picky
          {...corePickyProps}
          value={1}
          options={[1, 2, 3, 4, 5]}
          open={true}
          onChange={onChange}
        />
      );
      expect(wrapper.state('selectedValue')).toEqual(1);
      wrapper
        .find(sel('option'))
        .at(1)
        .simulate('click');
      expect(onChange).toHaveBeenLastCalledWith(2);
    });

    it('should select single value uncontrolled', () => {
      const onChange = jest.fn();
      const wrapper = mount(
        <Picky
          {...corePickyProps}
          options={[1, 2, 3, 4, 5]}
          open={true}
          onChange={onChange}
        />
      );
      expect(wrapper.state('selectedValue')).toEqual(null);
      wrapper
        .find(sel('option'))
        .at(1)
        .simulate('click');
      expect(onChange).toHaveBeenLastCalledWith(2);
    });
  });

  describe('Filter', () => {
    it('should call onFilterChange prop when text has changed', () => {
      const onChange = jest.fn();
      const wrapper = mount(<Filter onFilterChange={onChange} />);
      const event = { target: { value: '123' } };
      wrapper.find(sel('picky__filter__input')).simulate('change', event);
      expect(onChange).toHaveBeenCalledWith('123');
    });

    it('should not call onClose on focusing with autoclose mode after select', () => {
      const onCloseMock = jest.fn();
      const { getByTestId } = rtlRender(
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
      const wrapper = mount(
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
      expect(wrapper.find(sel('selectall'))).toHaveLength(1);

      const event = { target: { value: '1' } };
      wrapper.find(sel('picky__filter__input')).simulate('change', event);

      expect(wrapper.find(sel('selectall'))).toHaveLength(0);
    });

    it('should show select all when a filter has been entered but selectAllMode is filtered', () => {
      const wrapper = mount(
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
      expect(wrapper.find(sel('selectall'))).toHaveLength(1);

      const event = { target: { value: '1' } };
      wrapper.find(sel('picky__filter__input')).simulate('change', event);

      expect(wrapper.find(sel('selectall'))).toHaveLength(1);
    });
  });

  describe('Callbacks', () => {
    it('should call onFiltered callback', () => {
      const onFilteredMock = jest.fn();
      const wrapper = mount(
        <Picky
          {...corePickyProps}
          options={[1, 2, 3, 4]}
          value={[]}
          multiple={true}
          filterDebounce={0}
          open={true}
          includeFilter={true}
          onFiltered={onFilteredMock}
        />
      );

      const event = { target: { value: '1' } };
      wrapper.find(sel('picky__filter__input')).simulate('change', event);
      expect(onFilteredMock).toHaveBeenCalledWith([1]);
    });

    it('should call onOpen', () => {
      const onOpenMock = jest.fn();
      const wrapper = mount(
        <Picky
          {...corePickyProps}
          options={[1, 2, 3, 4]}
          value={[]}
          multiple={true}
          filterDebounce={0}
          open={false}
          includeFilter={true}
          onOpen={onOpenMock}
        />
      );

      wrapper.find(sel('picky-input')).simulate('click');
      expect(onOpenMock).toHaveBeenCalled();
    });
    it('should call onClose', () => {
      const onCloseMock = jest.fn();
      const wrapper = mount(
        <Picky
          {...corePickyProps}
          options={[1, 2, 3, 4]}
          value={[]}
          multiple={true}
          filterDebounce={0}
          open={true}
          includeFilter={true}
          onClose={onCloseMock}
        />
      );

      wrapper.find(sel('picky-input')).simulate('click');
      expect(onCloseMock).toHaveBeenCalled();
    });
  });

  xit('should close when clicked outside of component', () => {
    //Can't figure out how to test this
    // const wrapper = mount(<Picky {...corePickyProps}  open={true} options={[1, 2, 3]} />);
    // wrapper.mount();
    // expect(wrapper.find(sel('dropdown'))).toHaveLength(1);
    // wrapper.instance().handleOutsideClick({ target: '#root' });
    // expect(wrapper.find(sel('dropdown'))).toHaveLength(0);
  });
  it('should select option on keyPress', () => {
    const keyPressMock = jest.fn();
    const wrapper = mount(
      <Option id="option" item={1} selectValue={keyPressMock} />
    );
    wrapper.simulate('keyPress', {});
    expect(keyPressMock).toHaveBeenCalledWith(1);
  });

  it('should not render custom selectall when renderSelectAll prop is not supplied', () => {
    const wrapper = mount(
      <Picky
        {...corePickyProps}
        options={[]}
        virtual={false}
        open={true}
        includeSelectAll={true}
        multiple={true}
      />
    );
    const selAllText = wrapper.find(sel('select-all-text'));
    expect(selAllText).toHaveLength(1);
  });
  it('should not render custom selectall when renderSelectAll prop is not supplied', () => {
    const renderSelectAllMock = jest.fn();
    mount(
      <Picky
        {...corePickyProps}
        options={[1, 2, 3, 4]}
        virtual={false}
        open={true}
        includeSelectAll={true}
        multiple={true}
        renderSelectAll={renderSelectAllMock}
      />
    );
    const calledWithProps = renderSelectAllMock.mock.calls[0][0];
    expect(calledWithProps.filtered).toEqual(false);
    expect(calledWithProps.multiple).toEqual(true);
    expect(calledWithProps.allSelected).toEqual(false);
    expect(calledWithProps.tabIndex).toEqual(0);

    // expect(renderSelectAllMock).toHaveBeenCalledWith({
    //   filtered: false,
    //   includeSelectAll: true,
    //   multiple: true,
    //   allSelected: false,
    //   toggleSelectAll: () => {},
    //   tabIndex: 0
    // });
  });

  describe('Regressions', () => {
    describe('Issue #38', () => {
      test('should set selectedValue state when async value prop updates', done => {
        const mockOnChange = jest.fn();
        const wrapper = mount(
          <Picky
            {...corePickyProps}
            multiple
            open
            value={[]}
            options={[]}
            onChange={mockOnChange}
          />
        );
        const componentWillUpdateSpy = jest.spyOn(
          Picky.prototype,
          'UNSAFE_componentWillReceiveProps'
        );
        expect(wrapper.state('selectedValue')).toHaveLength(0);
        setTimeout(() => {
          wrapper.setProps({
            value: ['1', '2'],
            options: ['1', '2', '3', '4', '5'],
          });
          expect(componentWillUpdateSpy).toHaveBeenCalled();
          expect(wrapper.state('allSelected')).toEqual(false);
          componentWillUpdateSpy.mockReset();
          componentWillUpdateSpy.mockRestore();
          done();
        }, 20);
      });
      test('with async value when selecting option should not unselect all other options', done => {
        const onChangeMock = jest.fn();
        const wrapper = mount(
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
          wrapper.setProps({
            value: ['1', '2'],
            options: ['1', '2', '3', '4', '5'],
          });
          wrapper.update();
          wrapper
            .find(sel('option'))
            .at(2)
            .simulate('click');

          expect(onChangeMock).toHaveBeenCalledWith(['1', '2', '3']);
          done();
        }, 20);
      });
    });

    describe('Issue #76', () => {
      test('should only call onChange once when pressing the checkbox', () => {
        const onChange = jest.fn();

        const { getByTestId } = rtlRender(
          <Picky
            {...corePickyProps}
            multiple
            value={[1]}
            options={[1, 2, 3]}
            onChange={onChange}
            open={true}
          />
        );
        const chk = getByTestId('option-checkbox');
        expect(chk).toBeDefined();
        fireEvent.click(chk);
        expect(onChange).toHaveBeenCalledTimes(1);
      });
      test('should only call onChange once when pressing the select all checkbox', () => {
        const onChange = jest.fn();

        const { getByTestId } = rtlRender(
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

        const { getByTestId } = rtlRender(
          <Picky
            {...corePickyProps}
            multiple
            value={[1]}
            options={[1, 2, 3]}
            onChange={onChange}
            open={true}
          />
        );
        const option = getByTestId('option');
        expect(option).toBeDefined();
        fireEvent.click(option);
        expect(onChange).toHaveBeenCalledTimes(1);
      });
    });

    test('should override filter placeholder if supplied', () => {
      const { getByTestId } = rtlRender(
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
      const { getByTestId } = rtlRender(
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
      const options = [{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }];
      const { getByTestId, rerender } = rtlRender(
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
          value={[{ id: 2, name: 'Item 2' }, { id: 1, name: 'Item 1' }]}
        />
      );

      expect(getByTestId('selectall-checkbox').checked).toEqual(true);
    });
    test('should correctly update allSelected when values set programmatically simple options', () => {
      const options = [1, 2];
      const { getByTestId, rerender } = rtlRender(
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

  it('should not have select all checked when there are no options', () => {
    const options = [];
    const { getByTestId } = rtlRender(
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
    const wrapper = mount(
      <Picky {...corePickyProps} options={[1, 2]} value={[1, 2]} />
    );

    expect(wrapper.state('allSelected')).toEqual(true);

    wrapper.setProps({ options: [1, 2, 3] });
    wrapper.update();

    expect(wrapper.state('allSelected')).toEqual(false);
  });

  it('should pass all buttonProps to button', () => {
    const { getByTestId } = rtlRender(
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
