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
});
