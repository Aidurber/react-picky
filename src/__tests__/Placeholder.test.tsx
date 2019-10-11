import React from 'react';
import { mount } from 'enzyme';
import Placeholder from '../Placeholder';
import { defaultAccessor, __labelAccessor } from '../accessors';

//@ts-ignore
const sel = id => `[data-testid="${id}"]`;
//@ts-ignore
const getPlaceholderFromWrapper = wrapper =>
  wrapper.find(sel('picky_placeholder'));

describe('Placeholder', () => {
  it('should show placeholder if no initial values', () => {
    //@ts-ignore
    const wrapper = mount(<Placeholder placeholder="No selected values" />);
    const placeholder = getPlaceholderFromWrapper(wrapper);
    expect(placeholder.text()).toEqual('No selected values');
  });

  it('should default to None Selected if no placeholder supplied', () => {
    //@ts-ignore
    const wrapper = mount(<Placeholder />);
    const placeholder = getPlaceholderFromWrapper(wrapper);
    expect(placeholder.text()).toEqual('None selected');
  });

  it('should show numberDisplayed if selected values', () => {
    const wrapper = mount(
      //@ts-ignore
      <Placeholder
        numberDisplayed={2}
        value={[1, 2]}
        getLabel={defaultAccessor}
        multiple
      />
    );
    const placeholder = getPlaceholderFromWrapper(wrapper);

    expect(placeholder.text()).toEqual('1, 2');
  });
  it('should cut off if more values than  numberDisplayed', () => {
    const wrapper = mount(
      //@ts-ignore
      <Placeholder numberDisplayed={2} value={[1, 2, 3]} multiple />
    );
    const placeholder = getPlaceholderFromWrapper(wrapper);

    expect(placeholder.text()).toEqual('3 selected');
  });

  it('should use manySelectedPlaceholder if supplied and number of selected items greater than number displayed', () => {
    const wrapper = mount(
      //@ts-ignore
      <Placeholder
        numberDisplayed={2}
        value={[1, 2, 3]}
        multiple
        manySelectedPlaceholder="Thats %s selected"
      />
    );
    const placeholder = getPlaceholderFromWrapper(wrapper);

    expect(placeholder.text()).toEqual('Thats 3 selected');
  });

  it('should use allSelectedPlaceholder prop if supplied and all items selected', () => {
    const wrapper = mount(
      <Placeholder
        numberDisplayed={2}
        getLabel={defaultAccessor}
        value={[1, 2, 3]}
        allSelected={true}
        multiple
        allSelectedPlaceholder="All selected"
      />
    );
    const placeholder = getPlaceholderFromWrapper(wrapper);

    expect(placeholder.text()).toEqual('All selected');
  });

  it('should x selected if all items selected and no allSelectedPlaceholder specified', () => {
    const wrapper = mount(
      <Placeholder
        getLabel={defaultAccessor}
        numberDisplayed={2}
        value={[1, 2, 3]}
        allSelected={true}
        multiple
      />
    );
    const placeholder = getPlaceholderFromWrapper(wrapper);

    expect(placeholder.text()).toEqual('3 selected');
  });
  it('should cut off if more values than  numberDisplayed', () => {
    const wrapper = mount(
      //@ts-ignore
      <Placeholder numberDisplayed={2} value={[1, 2, 3]} multiple />
    );
    const placeholder = getPlaceholderFromWrapper(wrapper);

    expect(placeholder.text()).toEqual('3 selected');
  });

  it('should show value if not multiple and a value specified', () => {
    const wrapper = mount(
      //@ts-ignore
      <Placeholder value={'one'} getLabel={defaultAccessor} />
    );
    const placeholder = getPlaceholderFromWrapper(wrapper);

    expect(placeholder.text()).toEqual('one');
  });
  it('should show first value if multiple value and not multiple set', () => {
    const wrapper = mount(
      //@ts-ignore
      <Placeholder value={[1, 2, 3]} getLabel={defaultAccessor} />
    );
    const placeholder = getPlaceholderFromWrapper(wrapper);

    expect(placeholder.text()).toEqual('1');
  });

  it('should show label if object array supplied', () => {
    const wrapper = mount(
      //@ts-ignore
      <Placeholder
        getLabel={__labelAccessor}
        value={[{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }]}
        multiple={true}
        labelKey="name"
        valueKey="id"
        numberDisplayed={3}
      />
    );
    const placeholder = getPlaceholderFromWrapper(wrapper);

    expect(placeholder.text()).toEqual('Item 1, Item 2');
  });
  it('should show label if object supplied', () => {
    const wrapper = mount(
      //@ts-ignore
      <Placeholder
        getLabel={__labelAccessor}
        value={[{ id: 1, name: 'Item 1' }]}
        numberDisplayed={3}
      />
    );
    const placeholder = getPlaceholderFromWrapper(wrapper);

    expect(placeholder.text()).toEqual('Item 1');
  });
});
