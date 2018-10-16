import React from 'react';
import { mount } from 'enzyme';
import { render as rtlRender, fireEvent, cleanup } from 'react-testing-library';

import Placeholder from '../src/Placeholder';
import Picky from '../src/Picky';
import Filter from '../src/Filter';
import Option from '../src/Option';

const sel = id => `[data-testid="${id}"]`;
const selSelected = id => `[data-testid="${id}"][data-selected="selected"]`;

describe('Picky', () => {
  afterEach(cleanup); // <-- add this

  it('should select initial values on load', () => {
    const wrapper = mount(<Picky value={[1, 2, 3]} multiple />);
    expect(wrapper.state('selectedValue')).toEqual([1, 2, 3]);
  });

  it('should have Placeholder component', () => {
    const wrapper = mount(<Picky value={[]} />);
    expect(wrapper.find(Placeholder)).toHaveLength(1);
  });

  it('should accept render prop', () => {
    const renderPropMock = jest.fn();
    renderPropMock.mockReturnValue(<p />);
    const wrapper = mount(
      <Picky
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
      const wrapper = mount(<Picky value={[1, 2, 3]} open={true} />);
      expect(wrapper.find(sel('dropdown'))).toHaveLength(1);
    });
    it('should not be open if prop open is false', () => {
      const wrapper = mount(<Picky value={[1, 2, 3]} open={false} />);
      expect(wrapper.find(sel('dropdown'))).toHaveLength(0);
    });

    it('should open on click of button', () => {
      const wrapper = mount(<Picky value={[1, 2, 3]} />);
      expect(wrapper.find(sel('dropdown'))).toHaveLength(0);
      wrapper.find(sel('picky-input')).simulate('click');
      expect(wrapper.find(sel('dropdown'))).toHaveLength(1);
    });
    it('should open on click of button (open by prop)', () => {
      const wrapper = mount(<Picky value={[1, 2, 3]} open={true} />);
      expect(wrapper.find(sel('dropdown'))).toHaveLength(1);
      wrapper.find(sel('picky-input')).simulate('click');
      expect(wrapper.find(sel('dropdown'))).toHaveLength(0);
    });
    it('should have items', () => {
      const wrapper = mount(
        <Picky value={[1, 2, 3]} options={[1, 2, 3, 4, 5]} open={true} />
      );
      expect(wrapper.find(sel('option'))).toHaveLength(5);
    });

    it('should have items selected by default when supplied', () => {
      const wrapper = mount(
        <Picky value={[1, 2, 3]} options={[1, 2, 3, 4, 5]} open={true} />
      );
      const selected = wrapper.find(selSelected('option'));
      expect(selected).toHaveLength(3);
      expect(selected.at(0).text()).toEqual('1');
      expect(selected.at(1).text()).toEqual('2');
      expect(selected.at(2).text()).toEqual('3');
    });
    it('should show placeholder if value is an array and none selected', () => {
      const wrapper = mount(
        <Picky value={[]} options={[1, 2, 3, 4, 5]} open={true} multiple />
      );

      expect(wrapper.find(sel('picky_placeholder')).text()).toEqual(
        'None selected'
      );
    });
    it('should show correct placeholder with selected value, single select', () => {
      const wrapper = mount(
        <Picky
          value={[1]}
          options={[1, 2, 3, 4, 5]}
          open={true}
          multiple={false}
        />
      );
      expect(wrapper.find(sel('picky_placeholder')).text()).toEqual('1');
    });
    it('should show correct placeholder with selected value, multi select', () => {
      const wrapper = mount(
        <Picky
          value={[1, 2, 3]}
          options={[1, 2, 3, 4, 5]}
          open={true}
          multiple={true}
        />
      );
      expect(wrapper.find(sel('picky_placeholder')).text()).toEqual('1, 2, 3');

      const nextWrapper = mount(
        <Picky
          numberDisplayed={2}
          value={[1, 2, 3]}
          options={[1, 2, 3, 4, 5]}
          open={true}
          multiple={true}
        />
      );
      expect(nextWrapper.find(sel('picky_placeholder')).text()).toEqual(
        '3 selected'
      );
    });
  });
  describe('Plain Dropdown drawer', () => {
    it('should open if prop open is true', () => {
      const wrapper = mount(
        <Picky value={[1, 2, 3]} open={true} virtual={false} />
      );
      expect(wrapper.find(sel('dropdown'))).toHaveLength(1);
    });
    it('should not be open if prop open is false', () => {
      const wrapper = mount(
        <Picky value={[1, 2, 3]} open={false} virtual={false} />
      );
      expect(wrapper.find(sel('dropdown'))).toHaveLength(0);
    });

    it('should open on click of button', () => {
      const wrapper = mount(<Picky value={[1, 2, 3]} />);
      expect(wrapper.find(sel('dropdown'))).toHaveLength(0);
      wrapper.find(sel('picky-input')).simulate('click');
      expect(wrapper.find(sel('dropdown'))).toHaveLength(1);
    });
    it('should open on click of button (open by prop)', () => {
      const wrapper = mount(
        <Picky value={[1, 2, 3]} open={true} virtual={false} />
      );
      expect(wrapper.find(sel('dropdown'))).toHaveLength(1);
      wrapper.find(sel('picky-input')).simulate('click');
      expect(wrapper.find(sel('dropdown'))).toHaveLength(0);
    });
    it('should have items', () => {
      const wrapper = mount(
        <Picky
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
    it('should show placeholder if value is an array and none selected', () => {
      const wrapper = mount(
        <Picky
          value={[]}
          options={[1, 2, 3, 4, 5]}
          open={true}
          multiple
          virtual={false}
        />
      );

      expect(wrapper.find(sel('picky_placeholder')).text()).toEqual(
        'None selected'
      );
    });
    it('should show correct placeholder with selected value, single select', () => {
      const wrapper = mount(
        <Picky
          value={[1]}
          options={[1, 2, 3, 4, 5]}
          open={true}
          multiple={false}
          virtual={false}
        />
      );
      expect(wrapper.find(sel('picky_placeholder')).text()).toEqual('1');
    });
    it('should show correct placeholder with selected value, multi select', () => {
      const wrapper = mount(
        <Picky
          value={[1, 2, 3]}
          options={[1, 2, 3, 4, 5]}
          open={true}
          multiple={true}
          virtual={false}
        />
      );
      expect(wrapper.find(sel('picky_placeholder')).text()).toEqual('1, 2, 3');

      const nextWrapper = mount(
        <Picky
          numberDisplayed={2}
          value={[1, 2, 3]}
          options={[1, 2, 3, 4, 5]}
          open={true}
          multiple={true}
          virtual={false}
        />
      );
      expect(nextWrapper.find(sel('picky_placeholder')).text()).toEqual(
        '3 selected'
      );
    });
  });

  describe('Selecting', () => {
    it('should accept includeSelectAll option', () => {
      const wrapper = mount(
        <Picky
          value={[1, 2, 3]}
          includeSelectAll={true}
          options={[1, 2, 3, 4, 5]}
          open={true}
          multiple={true}
        />
      );
      expect(wrapper.find(sel('selectall'))).toHaveLength(1);
    });

    it('should have "select all" text when no selectAllText prop provided', () => {
      const wrapper = mount(
        <Picky
          value={[1, 2, 3]}
          includeSelectAll={true}
          options={[1, 2, 3, 4, 5]}
          open={true}
          multiple={true}
        />
      );
      expect(
        wrapper
          .find(sel('select-all-text'))
          .text()
          .toLowerCase()
      ).toEqual('Select All'.toLowerCase());
    });
    it('should support select all text with selectAllText prop', () => {
      const wrapper = mount(
        <Picky
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

    it('should select all options when select all is clicked', () => {
      const onChange = jest.fn();
      const wrapper = mount(
        <Picky
          value={[1, 2, 3]}
          includeSelectAll={true}
          options={[1, 2, 3, 4, 5]}
          open={true}
          multiple={true}
          onChange={onChange}
        />
      );
      const selectAllItem = wrapper.find(sel('selectall')).first();

      expect(wrapper.find(selSelected('option'))).toHaveLength(3);
      selectAllItem.simulate('click');
      expect(wrapper.state('selectedValue')).toHaveLength(5);
      selectAllItem.simulate('click');
      expect(wrapper.state('selectedValue')).toHaveLength(0);
      expect(onChange).toHaveBeenCalled();
      expect(onChange).toHaveBeenCalledWith([1, 2, 3, 4, 5]);
    });

    it('should select single value controlled', () => {
      const onChange = jest.fn();
      const wrapper = mount(
        <Picky
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
      expect(onChange).lastCalledWith(2);
    });

    it('should select single value uncontrolled', () => {
      const onChange = jest.fn();
      const wrapper = mount(
        <Picky options={[1, 2, 3, 4, 5]} open={true} onChange={onChange} />
      );
      expect(wrapper.state('selectedValue')).toEqual(null);
      wrapper
        .find(sel('option'))
        .at(1)
        .simulate('click');
      expect(onChange).lastCalledWith(2);
    });
    it('should select multiple value controlled', () => {
      const onChange = jest.fn();
      const wrapper = mount(
        <Picky
          value={[]}
          options={[1, 2, 3, 4, 5]}
          open={true}
          multiple
          onChange={onChange}
        />
      );

      expect(wrapper.state('selectedValue')).toEqual([]);
      wrapper
        .find(sel('option'))
        .at(1)
        .simulate('click');
      expect(onChange).lastCalledWith([2]);
      expect(wrapper.state('selectedValue')).toEqual([2]);
    });
    it('should select multiple value uncontrolled', () => {
      const onChange = jest.fn();
      const wrapper = mount(
        <Picky
          options={[1, 2, 3, 4, 5]}
          open={true}
          multiple
          onChange={onChange}
        />
      );

      expect(wrapper.state('selectedValue')).toEqual([]);
      wrapper
        .find(sel('option'))
        .at(1)
        .simulate('click');
      expect(onChange).lastCalledWith([2]);
      expect(wrapper.state('selectedValue')).toEqual([2]);
    });

    it('should deselect multiple value', () => {
      const onChange = jest.fn();
      const wrapper = mount(
        <Picky
          value={[2]}
          options={[1, 2, 3, 4, 5]}
          open={true}
          multiple
          onChange={onChange}
        />
      );

      expect(wrapper.state('selectedValue')).toEqual([2]);
      wrapper
        .find(sel('option'))
        .at(1)
        .simulate('click');
      expect(onChange).lastCalledWith([]);
      expect(wrapper.state('selectedValue')).toEqual([]);
    });

    it('should support object options single select', () => {
      const options = [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
        { id: 3, name: 'Item 3' },
      ];
      const wrapper = mount(
        <Picky
          value={null}
          options={options}
          open={true}
          valueKey="id"
          labelKey="name"
        />
      );

      wrapper
        .find(sel('option'))
        .at(0)
        .simulate('click');

      expect(wrapper.state('selectedValue')).toEqual({
        id: 1,
        name: 'Item 1',
      });
    });
  });

  describe('Filter', () => {
    it('should accept includeFilter prop', () => {
      const wrapper = mount(<Picky includeFilter={true} value={[]} />);
      expect(wrapper.prop('includeFilter')).toEqual(true);
    });

    it('should have filter component', () => {
      const wrapper = mount(
        <Picky includeFilter={true} open={true} value={[]} />
      );
      expect(wrapper.find(Filter)).toHaveLength(1);
    });

    it('should be focused by default if defaultFocusFilter is true', () => {
      //picky__filter__input
      const wrapper = mount(
        <Picky
          includeFilter={true}
          value={[]}
          defaultFocusFilter={true}
          open={true}
        />
      );
      const input = wrapper.find(sel('picky__filter__input'));

      expect(input.instance()).toEqual(document.activeElement);
    });

    it('should call onFilterChange prop when text has changed', () => {
      const onChange = jest.fn();
      const wrapper = mount(<Filter onFilterChange={onChange} />);
      const event = { target: { value: '123' } };
      wrapper.find(sel('picky__filter__input')).simulate('change', event);
      expect(onChange).toHaveBeenCalledWith('123');
    });

    it('should filter values', () => {
      const wrapper = mount(
        <Picky
          options={[1, 2, 3, 4]}
          value={[]}
          multiple={true}
          filterDebounce={0}
          open={true}
          includeFilter={true}
        />
      );
      const event = { target: { value: '1' } };
      expect(wrapper.state('filteredOptions')).toEqual([]);
      wrapper.find(sel('picky__filter__input')).simulate('change', event);
      expect(wrapper.state('filteredOptions')).toEqual([1]);
    });

    it('shouldnt filter if filter query is blank or empty string', () => {
      const wrapper = mount(
        <Picky
          options={[1, 2, 3, 4]}
          value={[]}
          multiple={true}
          filterDebounce={0}
          open={true}
          includeFilter={true}
        />
      );
      const event = { target: { value: '   ' } };
      expect(wrapper.state('filteredOptions')).toEqual([]);
      wrapper.find(sel('picky__filter__input')).simulate('change', event);
      expect(wrapper.state('filteredOptions')).toEqual([]);
    });

    it('should filter object arrays', () => {
      const options = [{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 3' }];
      const wrapper = mount(
        <Picky
          options={options}
          value={[]}
          multiple={true}
          filterDebounce={0}
          open={true}
          includeFilter={true}
          labelKey="name"
          valueKey="id"
        />
      );

      const event = { target: { value: '1' } };
      expect(wrapper.state('filteredOptions')).toEqual([]);
      wrapper.find(sel('picky__filter__input')).simulate('change', event);
      expect(wrapper.state('filteredOptions')).toEqual([
        {
          id: 1,
          name: 'Item 1',
        },
      ]);
    });
  });

  describe('Callbacks', () => {
    it('should call onFiltered callback', () => {
      const onFilteredMock = jest.fn();
      const wrapper = mount(
        <Picky
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
    // const wrapper = mount(<Picky open={true} options={[1, 2, 3]} />);
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
        options={[]}
        virtual={false}
        open={true}
        includeSelectAll={true}
        multiple={true}
      />
    );
    const dropdown = wrapper.find(sel('dropdown')).first();
    expect(dropdown.find(sel('select-all-text'))).toHaveLength(1);
  });
  it('should not render custom selectall when renderSelectAll prop is not supplied', () => {
    const renderSelectAllMock = jest.fn();
    mount(
      <Picky
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
    describe('Issue #36', () => {
      it('should highlight selected items, isSelected should be true', () => {
        const items = Array.from(Array(10).keys()).map(v => {
          return {
            id: v + 1,
            name: `Label ${v + 1}`,
          };
        });
        const wrapper = mount(
          <Picky
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
        const renderedOptions = wrapper.find(sel('option'));
        expect(wrapper.state('selectedValue')).toHaveLength(5);
        expect(renderedOptions).toHaveLength(10);
        expect(renderedOptions.first().prop('aria-selected')).toEqual(true);
      });
    });

    describe('Issue #38', () => {
      test('should set selectedValue state when async value prop updates', done => {
        const wrapper = mount(<Picky multiple open value={[]} options={[]} />);
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
          expect(wrapper.state('selectedValue')).toHaveLength(2);
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
    /**
     * Select all - All selected not calculated properly
     */
    describe('Issue #68', () => {
      test('select all should be false when deslecting single value', () => {
        const onChangeMock = jest.fn();
        const ALL_SELECTED_TEXT = 'All selected';
        const wrapper = mount(
          <Picky
            multiple
            open
            value={[]}
            options={[1, 2, 3, 4]}
            onChange={onChangeMock}
            includeSelectAll
            allSelectedPlaceholder={ALL_SELECTED_TEXT}
          />
        );

        const selectAll = wrapper.find(sel('selectall')).first();
        selectAll.simulate('click');

        expect(wrapper.state('allSelected')).toEqual(true);
        // Deselect single option
        wrapper
          .find(sel('option'))
          .at(2)
          .simulate('click');

        expect(wrapper.state('allSelected')).toEqual(false);
      });
    });
    /**
     * Filter input gets cleared when the menu closes
     * so if the list is in a filtered state you can't recover
     */
    describe('Issue #73', () => {
      test('should retain the filter value after closing menu', () => {
        const onChangeMock = jest.fn();

        const { getByTestId } = rtlRender(
          <Picky
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
        expect(filterInput.value).toEqual('Item');
      });
    });

    describe('Issue #76', () => {
      test('should only call onChange once when pressing the checkbox', () => {
        const onChange = jest.fn();

        const { getByTestId } = rtlRender(
          <Picky
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
      test('should still call onChange when pressing the option', () => {
        const onChange = jest.fn();

        const { getByTestId } = rtlRender(
          <Picky
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
  });
});
