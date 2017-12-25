import React from 'react';
import createTestContext from 'react-cosmos-test/enzyme';
import PickyFixture from '../__fixtures__/Picky.fixture';
import { shallow, mount } from 'enzyme';
import Picky from '../src/Picky';
// const { mount, getWrapper } = createTestContext({
//   fixture: PickyFixture
// });
describe('Picky', () => {
  it('should select initial values on load', () => {
    const wrapper = shallow(<Picky value={[1, 2, 3]} multiple />);
    expect(wrapper.state('selectedValue')).toEqual([1, 2, 3]);
  });

  describe('Placeholder', () => {
    it('should show placeholder if no initial values', () => {
      const wrapper = mount(<Picky placeholder="No selected values" />);
      expect(wrapper.find('.picky__placeholder').text()).toEqual(
        'No selected values'
      );
    });

    it('should default to None Selected if no placeholder supplied', () => {
      const wrapper = mount(<Picky />);
      expect(wrapper.find('.picky__placeholder').text()).toEqual(
        'None selected'
      );
    });

    it('should show numberDisplayed if selected values', () => {
      const wrapper = mount(
        <Picky numberDisplayed={2} value={[1, 2]} multiple />
      );
      expect(wrapper.find('.picky__placeholder').text()).toEqual('1, 2');
    });
    it('should cut off if more values than  numberDisplayed', () => {
      const wrapper = mount(
        <Picky numberDisplayed={2} value={[1, 2, 3]} multiple />
      );
      expect(wrapper.find('.picky__placeholder').text()).toEqual('3 selected');
    });
    it('should cut off if more values than  numberDisplayed', () => {
      const wrapper = mount(
        <Picky numberDisplayed={2} value={[1, 2, 3]} multiple />
      );
      expect(wrapper.find('.picky__placeholder').text()).toEqual('3 selected');
    });

    it('should show value if not multiple and a value specified', () => {
      const wrapper = mount(<Picky value={'one'} />);
      expect(wrapper.find('.picky__placeholder').text()).toEqual('one');
    });
    it('should show first value if multiple value and not multiple set', () => {
      const wrapper = mount(<Picky value={[1, 2, 3]} />);
      expect(wrapper.find('.picky__placeholder').text()).toEqual('1');
    });
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
      expect(wrapper.find('.picky__dropdown li')).toHaveLength(5);
    });

    it('should have items selected by default when supplied', () => {
      const wrapper = mount(
        <Picky value={[1, 2, 3]} options={[1, 2, 3, 4, 5]} open={true} />
      );
      const selected = wrapper.find('.picky__dropdown li.selected');
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
        wrapper.find('.picky__dropdown li[data-selectall="true"]')
      ).toHaveLength(1);
    });

    it('should select all options when select all is clicked', () => {
      const wrapper = mount(
        <Picky
          value={[1, 2, 3]}
          includeSelectAll={true}
          options={[1, 2, 3, 4, 5]}
          open={true}
          multiple={true}
        />
      );
      const selectAllItem = wrapper
        .find('.picky__dropdown li[data-selectall="true"]')
        .first();

      expect(wrapper.find('.picky__dropdown li.selected')).toHaveLength(3);
      selectAllItem.simulate('click');
      expect(wrapper.state('selectedValue')).toHaveLength(5);
      selectAllItem.simulate('click');
      expect(wrapper.state('selectedValue')).toHaveLength(0);
    });
  });
});
