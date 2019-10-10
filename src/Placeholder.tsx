// NEEDS REFACTOR
import * as React from 'react';
import { onlyUpdateForKeys } from 'recompose';
import { format } from './lib/format';
import { isDataObject } from './lib/utils';
import { includes } from './lib/includes';
import {
  OptionsType,
  OptionType,
  ComplexOptionType,
  SimpleOptionType,
} from './types';

const isEmptyValue = (value: any) =>
  value === null ||
  value === undefined ||
  (Array.isArray(value) && !value.length);

type PlaceholderProps = {
  placeholder?: string;
  value: OptionsType | OptionType | undefined;
  numberDisplayed: number;
  multiple: boolean;
  valueKey?: string;
  labelKey?: string;
  manySelectedPlaceholder?: string;
  allSelectedPlaceholder?: string;
  allSelected: boolean;
};
const Placeholder: React.FC<PlaceholderProps> = ({
  placeholder,
  value,
  numberDisplayed,
  multiple,
  valueKey,
  labelKey,
  manySelectedPlaceholder,
  allSelectedPlaceholder,
  allSelected,
}) => {
  let message: string = '';
  if (isEmptyValue(value)) {
    message = placeholder || '';
  } else {
    if (Array.isArray(value) && multiple) {
      // If type is array and values length less than number displayed
      // join the values
      if (value.length <= numberDisplayed) {
        message = value
          .map(opt => {
            if (isDataObject(opt, valueKey, labelKey)) {
              return (opt as ComplexOptionType)[labelKey!];
            }
            return opt;
          })
          .join(', ');
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
      if (isDataObject(tempValue, valueKey, labelKey)) {
        message = (tempValue as ComplexOptionType)[labelKey!];
      } else {
        message = String(tempValue as SimpleOptionType);
      }
    }
  }

  return (
    <span className="picky__placeholder" data-testid="picky_placeholder">
      {message}
    </span>
  );
};

Placeholder.defaultProps = {
  placeholder: 'None selected',
  allSelectedPlaceholder: '%s selected',
  manySelectedPlaceholder: '%s selected',
  allSelected: false,
};
Placeholder.displayName = 'Picky(Placeholder)';
export default onlyUpdateForKeys([
  'multiple',
  'value',
  'numberDisplayed',
  'allSelected',
  'allSelectedPlaceholder',
])(Placeholder);
