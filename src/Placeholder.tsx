// NEEDS REFACTOR
import * as React from 'react';
// import { onlyUpdateForKeys } from 'recompose';
import { format } from './lib/format';
import { includes } from './lib/includes';
import { OptionsType, OptionType } from './types';

const isEmptyValue = (value: any) =>
  value === null ||
  value === undefined ||
  (Array.isArray(value) && !value.length);

type PlaceholderProps<TOptionType> = {
  placeholder?: string;
  value: OptionsType<TOptionType> | OptionType<TOptionType> | undefined;
  numberDisplayed: number;
  multiple: boolean;
  manySelectedPlaceholder?: string;
  allSelectedPlaceholder?: string;
  allSelected: boolean;
  getLabel: (opt: OptionType<TOptionType>) => any;
};
function Placeholder<T>({
  placeholder,
  value,
  numberDisplayed,
  multiple,
  getLabel,
  manySelectedPlaceholder,
  allSelectedPlaceholder,
  allSelected,
}: PlaceholderProps<T>) {
  let message: string = '';
  if (isEmptyValue(value)) {
    message = placeholder || '';
  } else {
    if (Array.isArray(value) && multiple) {
      // If type is array and values length less than number displayed
      // join the values
      if (value.length <= numberDisplayed) {
        message = value.map(getLabel).join(', ');
      } else {
        // if many selected and not all selected then use the placeholder
        if (manySelectedPlaceholder && !allSelected) {
          // if it doesn't include the sprintf token then just use the placeholder
          message = includes(manySelectedPlaceholder, '%s')
            ? format(manySelectedPlaceholder, value.length)
            : manySelectedPlaceholder;
          //If all selected and there is an allselectedplaceholder use that
        } else if (allSelected && allSelectedPlaceholder) {
          // if it doesn't include the sprintf token then just use the placeholder
          message = includes(allSelectedPlaceholder, '%s')
            ? format(allSelectedPlaceholder, value.length)
            : allSelectedPlaceholder;
        }
      }
    } else {
      let tempValue = Array.isArray(value) ? value[0] : value;
      message = String(getLabel((tempValue as any)!));
    }
  }

  return (
    <span className="picky__placeholder" data-testid="picky_placeholder">
      {message}
    </span>
  );
}

Placeholder.defaultProps = {
  placeholder: 'None selected',
  allSelectedPlaceholder: '%s selected',
  manySelectedPlaceholder: '%s selected',
  allSelected: false,
};
Placeholder.displayName = 'Picky(Placeholder)';
export default Placeholder;
// onlyUpdateForKeys([
//   'multiple',
//   'value',
//   'numberDisplayed',
//   'allSelected',
//   'allSelectedPlaceholder',
// ])();
