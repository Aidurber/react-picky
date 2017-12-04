import React from 'react';
import { shallow, mount } from 'enzyme';
import Picky from 'index';

describe('Picky', () => {
  it('should select initial values on load', () => {
    const initialValues = [1, 2, 3];
    const wrapper = mount(<Picky selectedValues={initialValues} />);

    expect(wrapper.state('selectedValues')).toHaveLength(initialValues.length);
  });
  it('should show placeholder if no initial values', () => {
    const placeholder = 'Please select...';
    const wrapper = mount(<Picky placeholder={placeholder} />);
    expect(
      wrapper
        .find('button')
        .first()
        .text(),
    ).toEqual(placeholder);
  });

  it('should accept multiple prop', () => {
    const wrapper = shallow(<Picky multiple={true} />);
    expect(wrapper.prop('multiple')).toEqual(true);

    expect(wrapper.find('.react-select').prop('multiple')).toEqual(true);
  });
});
