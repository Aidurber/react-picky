import * as React from 'react';
import { onlyUpdateForKeys } from 'recompose';

type SelectAllProps = {
  tabIndex: number | undefined;
  disabled: boolean;
  allSelected: boolean;
  id: string;
  selectAllText?: string;
  toggleSelectAll(): void;
  visible: boolean;
};
const SelectAll: React.FC<SelectAllProps> = ({
  tabIndex,
  disabled,
  allSelected,
  id,
  selectAllText,
  toggleSelectAll,
  visible,
}) => {
  if (!visible) {
    return null;
  }
  return (
    <div
      tabIndex={tabIndex}
      role="option"
      data-testid="selectall"
      id={id + '-option-' + 'selectall'}
      data-selectall="true"
      aria-selected={allSelected}
      className={allSelected ? 'option selected' : 'option'}
      onClick={toggleSelectAll}
      onKeyPress={toggleSelectAll}
    >
      <input
        type="checkbox"
        readOnly
        data-testid="selectall-checkbox"
        tabIndex={-1}
        checked={allSelected}
        aria-label="select all"
        disabled={disabled}
      />
      <span data-testid="select-all-text">{selectAllText}</span>
    </div>
  );
};

SelectAll.displayName = 'Picky(SelectAll)';

export default onlyUpdateForKeys([
  'tabIndex',
  'disabled',
  'allSelected',
  'selectAllText',
  'visible',
])(SelectAll);
