import React from 'react';
import { shallow, mount } from 'enzyme';
import Placeholder from '../src/Placeholder';
import Picky from '../src/Picky';
import Filter from '../src/Filter';

describe('Picky', () => {
  it('should select initial values on load', () => {
    const wrapper = shallow(<Picky value={[1, 2, 3]} multiple />);
    expect(wrapper.state('selectedValue')).toEqual([1, 2, 3]);
  });

  it('should have Placeholder component', () => {
    const wrapper = mount(<Picky value={[]} />);
    expect(wrapper.find(Placeholder)).toHaveLength(1);
  });

  it('should accept render prop', () => {
    const renderPropMock = jest.fn();
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

  describe('Dropdown drawer', () => {
    it('should open if prop open is true', () => {
      const wrapper = mount(<Picky value={[1, 2, 3]} open={true} />);
      expect(wrapper.find('.picky__dropdown')).toHaveLength(1);
    });
    it('should not be open if prop open is false', () => {
      const wrapper = mount(<Picky value={[1, 2, 3]} open={false} />);
      expect(wrapper.find('.picky__dropdown')).toHaveLength(0);
    });

    it('should open on click of button', () => {
      const wrapper = mount(<Picky value={[1, 2, 3]} />);
      expect(wrapper.find('.picky__dropdown')).toHaveLength(0);
      wrapper.find('.picky__input').simulate('click');
      expect(wrapper.find('.picky__dropdown')).toHaveLength(1);
    });
    it('should open on click of button (open by prop)', () => {
      const wrapper = mount(<Picky value={[1, 2, 3]} open={true} />);
      expect(wrapper.find('.picky__dropdown')).toHaveLength(1);
      wrapper.find('.picky__input').simulate('click');
      expect(wrapper.find('.picky__dropdown')).toHaveLength(0);
    });
    it('should have items', () => {
      const wrapper = mount(
        <Picky value={[1, 2, 3]} options={[1, 2, 3, 4, 5]} open={true} />
      );
      expect(wrapper.find('.picky__dropdown .option')).toHaveLength(5);
    });

    it('should have items selected by default when supplied', () => {
      const wrapper = mount(
        <Picky value={[1, 2, 3]} options={[1, 2, 3, 4, 5]} open={true} />
      );
      const selected = wrapper.find('.picky__dropdown .option.selected');
      expect(selected).toHaveLength(3);
      expect(selected.at(0).text()).toEqual('1');
      expect(selected.at(1).text()).toEqual('2');
      expect(selected.at(2).text()).toEqual('3');
    });
    it('should show placeholder if value is an array and none selected', () => {
      const wrapper = mount(
        <Picky value={[]} options={[1, 2, 3, 4, 5]} open={true} multiple />
      );

      expect(wrapper.find('.picky__placeholder').text()).toEqual(
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
      expect(wrapper.find('.picky__placeholder').text()).toEqual('1');
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
      expect(wrapper.find('.picky__placeholder').text()).toEqual('1, 2, 3');

      const nextWrapper = mount(
        <Picky
          numberDisplayed={2}
          value={[1, 2, 3]}
          options={[1, 2, 3, 4, 5]}
          open={true}
          multiple={true}
        />
      );
      expect(nextWrapper.find('.picky__placeholder').text()).toEqual(
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
      expect(
        wrapper.find('.picky__dropdown .option[data-selectall="true"]')
      ).toHaveLength(1);
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
      const selectAllItem = wrapper
        .find('.picky__dropdown .option[data-selectall="true"]')
        .first();

      expect(wrapper.find('.picky__dropdown .option.selected')).toHaveLength(3);
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
        .find('.picky__dropdown .option')
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
        .find('.picky__dropdown .option')
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
        .find('.picky__dropdown .option')
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
        .find('.picky__dropdown .option')
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
        .find('.picky__dropdown .option')
        .at(1)
        .simulate('click');
      expect(onChange).lastCalledWith([]);
      expect(wrapper.state('selectedValue')).toEqual([]);
    });

    it('should support object options single select', () => {
      const options = [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
        { id: 3, name: 'Item 3' }
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
        .find('.picky__dropdown .option')
        .at(0)
        .simulate('click');

      expect(wrapper.state('selectedValue')).toEqual({ id: 1, name: 'Item 1' });
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

    it('should call onFilterChange prop when text has changed', () => {
      const onChange = jest.fn();
      const wrapper = mount(<Filter onFilterChange={onChange} />);
      const event = { target: { value: '123' } };
      wrapper.find('.picky__filter__input').simulate('change', event);
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
      wrapper.find('.picky__filter__input').simulate('change', event);
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
      wrapper.find('.picky__filter__input').simulate('change', event);
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
      wrapper.find('.picky__filter__input').simulate('change', event);
      expect(wrapper.state('filteredOptions')).toEqual([
        {
          id: 1,
          name: 'Item 1'
        }
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
      wrapper.find('.picky__filter__input').simulate('change', event);
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

      wrapper.find('.picky__input').simulate('click');
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

      wrapper.find('.picky__input').simulate('click');
      expect(onCloseMock).toHaveBeenCalled();
    });
  });
});
