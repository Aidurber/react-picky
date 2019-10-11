import * as React from 'react';
import { onlyUpdateForKeys } from 'recompose';
import { OptionType } from './types';

type OptionProps = {
  isSelected: boolean;
  label: string;
  id: string;
  item: OptionType;
  style?: React.CSSProperties;
  selectValue(option: OptionType): void;
  multiple: boolean;
  tabIndex: number | undefined;
  disabled: boolean;
};
const Option: React.FC<OptionProps> = props => {
  const {
    id,
    item,
    isSelected,
    label,
    selectValue,
    style,
    multiple,
    tabIndex,
    disabled,
  } = props;
  const cssClass = isSelected ? 'option selected' : 'option';
  const inputType = multiple ? 'checkbox' : 'radio';
  const select = () => !disabled && selectValue(item);

  return (
    <div
      tabIndex={tabIndex}
      id={id}
      role="option"
      style={style}
      data-testid="option"
      data-selected={isSelected ? 'selected' : ''}
      aria-selected={isSelected}
      className={cssClass}
      onClick={select}
      onKeyPress={e => {
        e.preventDefault();
        if (!disabled) {
          selectValue(item);
        }
      }}
    >
      <input
        type={inputType}
        readOnly
        tabIndex={-1}
        disabled={disabled}
        checked={isSelected}
        aria-label={label}
        data-testid={'option-checkbox'}
      />
      {label}
    </div>
  );
};

Option.displayName = 'Picky(Option)';

export default onlyUpdateForKeys([
  'multiple',
  'isSelected',
  'id',
  'item',
  'tabIndex',
])(Option);
