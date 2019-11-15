import * as React from 'react';
import { render } from '@testing-library/react';
import { Placeholder } from '../Placeholder';

const PLACEHOLDER_TESTID = 'picky_placeholder';

describe('Placeholder', () => {
  it('should show placeholder if no initial values', () => {
    const { getByTestId } = render(
      //@ts-ignore
      <Placeholder placeholder="No selected values" />
    );
    const placeholder = getByTestId(PLACEHOLDER_TESTID);
    expect(placeholder.textContent).toEqual('No selected values');
  });

  it('should default to None Selected if no placeholder supplied', () => {
    const { getByTestId } = render(
      //@ts-ignore
      <Placeholder />
    );
    const placeholder = getByTestId(PLACEHOLDER_TESTID);
    expect(placeholder.textContent).toEqual('None selected');
  });

  it('should show numberDisplayed if selected values', () => {
    const { getByTestId } = render(
      //@ts-ignore
      <Placeholder numberDisplayed={2} value={[1, 2]} multiple />
    );
    const placeholder = getByTestId(PLACEHOLDER_TESTID);
    expect(placeholder.textContent).toEqual('1, 2');
  });
  it('should cut off if more values than  numberDisplayed', () => {
    const { getByTestId } = render(
      //@ts-ignore
      <Placeholder numberDisplayed={2} value={[1, 2, 3]} multiple />
    );
    const placeholder = getByTestId(PLACEHOLDER_TESTID);
    expect(placeholder.textContent).toEqual('3 selected');
  });

  it('should use manySelectedPlaceholder if supplied and number of selected items greater than number displayed', () => {
    const { getByTestId } = render(
      //@ts-ignore
      <Placeholder
        numberDisplayed={2}
        value={[1, 2, 3]}
        multiple
        manySelectedPlaceholder="Thats %s selected"
      />
    );
    const placeholder = getByTestId(PLACEHOLDER_TESTID);
    expect(placeholder.textContent).toEqual('Thats 3 selected');
  });

  it('should use allSelectedPlaceholder prop if supplied and all items selected', () => {
    const { getByTestId } = render(
      //@ts-ignore
      <Placeholder
        numberDisplayed={2}
        value={[1, 2, 3]}
        allSelected={'all'}
        multiple
        allSelectedPlaceholder="All selected"
      />
    );
    const placeholder = getByTestId(PLACEHOLDER_TESTID);
    expect(placeholder.textContent).toEqual('All selected');
  });

  it('should x selected if all items selected and no allSelectedPlaceholder specified', () => {
    const { getByTestId } = render(
      //@ts-ignore
      <Placeholder
        numberDisplayed={2}
        value={[1, 2, 3]}
        allSelected={'all'}
        multiple
      />
    );
    const placeholder = getByTestId(PLACEHOLDER_TESTID);
    expect(placeholder.textContent).toEqual('3 selected');
  });
  it('should cut off if more values than  numberDisplayed', () => {
    const { getByTestId } = render(
      //@ts-ignore
      <Placeholder numberDisplayed={2} value={[1, 2, 3]} multiple />
    );
    const placeholder = getByTestId(PLACEHOLDER_TESTID);
    expect(placeholder.textContent).toEqual('3 selected');
  });

  it('should show value if not multiple and a value specified', () => {
    const { getByTestId } = render(
      //@ts-ignore
      <Placeholder value={'one'} />
    );
    const placeholder = getByTestId(PLACEHOLDER_TESTID);
    expect(placeholder.textContent).toEqual('one');
  });
  it('should show first value if multiple value and not multiple set', () => {
    const { getByTestId } = render(
      //@ts-ignore
      <Placeholder value={[1, 2, 3]} />
    );
    const placeholder = getByTestId(PLACEHOLDER_TESTID);
    expect(placeholder.textContent).toEqual('1');
  });

  it('should show label if object array supplied', () => {
    const { getByTestId } = render(
      //@ts-ignore
      <Placeholder
        value={[
          { id: 1, name: 'Item 1' },
          { id: 2, name: 'Item 2' },
        ]}
        multiple={true}
        labelKey="name"
        valueKey="id"
        numberDisplayed={3}
      />
    );
    const placeholder = getByTestId(PLACEHOLDER_TESTID);
    expect(placeholder.textContent).toEqual('Item 1, Item 2');
  });
  it('should show label if object supplied', () => {
    const { getByTestId } = render(
      //@ts-ignore
      <Placeholder
        value={[{ id: 1, name: 'Item 1' }]}
        labelKey="name"
        valueKey="id"
        numberDisplayed={3}
      />
    );
    const placeholder = getByTestId(PLACEHOLDER_TESTID);
    expect(placeholder.textContent).toEqual('Item 1');
  });

  it('should set class "picky__placeholder" with a non-empty value', () => {
    const { getByTestId } = render(
      //@ts-ignore
      <Placeholder value={'one'} />
    );
    const placeholder = getByTestId(PLACEHOLDER_TESTID);
    expect(placeholder.className).toEqual('picky__placeholder');
  });
});
