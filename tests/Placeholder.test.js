import React from 'react';
import { mount } from 'enzyme';
import Placeholder from '../src/Placeholder';

describe('Placeholder', () => {
  it('should show placeholder if no initial values', () => {
    const wrapper = mount(<Placeholder placeholder="No selected values" />);
    expect(wrapper.find('.picky__placeholder').text()).toEqual(
      'No selected values'
    );
  });

  it('should default to None Selected if no placeholder supplied', () => {
    const wrapper = mount(<Placeholder />);
    expect(wrapper.find('.picky__placeholder').text()).toEqual('None selected');
  });

  it('should show numberDisplayed if selected values', () => {
    const wrapper = mount(
      <Placeholder numberDisplayed={2} value={[1, 2]} multiple />
    );
    expect(wrapper.find('.picky__placeholder').text()).toEqual('1, 2');
  });
  it('should cut off if more values than  numberDisplayed', () => {
    const wrapper = mount(
      <Placeholder numberDisplayed={2} value={[1, 2, 3]} multiple />
    );
    expect(wrapper.find('.picky__placeholder').text()).toEqual('3 selected');
  });

  it('should use manySelectedPlaceholder if supplied and number of selected items greater than number displayed', () => {
    const wrapper = mount(
      <Placeholder
        numberDisplayed={2}
        value={[1, 2, 3]}
        multiple
        manySelectedPlaceholder="Thats %s selected"
      />
    );
    expect(wrapper.find('.picky__placeholder').text()).toEqual(
      'Thats 3 selected'
    );
  });

  it('should use allSelectedPlaceholder prop if supplied and all items selected', () => {
    const wrapper = mount(
      <Placeholder
        numberDisplayed={2}
        value={[1, 2, 3]}
        allSelected={true}
        multiple
        allSelectedPlaceholder="All selected"
      />
    );
    expect(wrapper.find('.picky__placeholder').text()).toEqual('All selected');
  });

  it('should x selected if all items selected and no allSelectedPlaceholder specified', () => {
    const wrapper = mount(
      <Placeholder
        numberDisplayed={2}
        value={[1, 2, 3]}
        allSelected={true}
        multiple
      />
    );
    expect(wrapper.find('.picky__placeholder').text()).toEqual('3 selected');
  });
  it('should cut off if more values than  numberDisplayed', () => {
    const wrapper = mount(
      <Placeholder numberDisplayed={2} value={[1, 2, 3]} multiple />
    );
    expect(wrapper.find('.picky__placeholder').text()).toEqual('3 selected');
  });

  it('should show value if not multiple and a value specified', () => {
    const wrapper = mount(<Placeholder value={'one'} />);
    expect(wrapper.find('.picky__placeholder').text()).toEqual('one');
  });
  it('should show first value if multiple value and not multiple set', () => {
    const wrapper = mount(<Placeholder value={[1, 2, 3]} />);
    expect(wrapper.find('.picky__placeholder').text()).toEqual('1');
  });

  it('should show label if object array supplied', () => {
    const wrapper = mount(
      <Placeholder
        value={[{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }]}
        multiple={true}
        labelKey="name"
        valueKey="id"
        numberDisplayed={3}
      />
    );
    expect(wrapper.find('.picky__placeholder').text()).toEqual(
      'Item 1, Item 2'
    );
  });
  it('should show label if object supplied', () => {
    const wrapper = mount(
      <Placeholder
        value={[{ id: 1, name: 'Item 1' }]}
        labelKey="name"
        valueKey="id"
        numberDisplayed={3}
      />
    );
    expect(wrapper.find('.picky__placeholder').text()).toEqual('Item 1');
  });
});
