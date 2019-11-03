import * as React from 'react';
import { onlyUpdateForKeys } from 'recompose';
import { SelectionState } from './types';

type SelectAllProps = {
  tabIndex: number | undefined;
  disabled: boolean;
  allSelected: SelectionState;
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
  const checkboxRef = React.createRef<HTMLInputElement>();
  if (!visible) {
    return null;
  }

  React.useEffect(() => {
    if (checkboxRef.current === null) return;
    checkboxRef.current.indeterminate = allSelected === 'partial';
  }, [allSelected]);
  return (
    <div
      tabIndex={tabIndex}
      role="option"
      data-testid="selectall"
      id={id + '-option-' + 'selectall'}
      data-selectall="true"
      aria-selected={allSelected === 'all'}
      className={allSelected === 'all' ? 'option selected' : 'option'}
      onClick={toggleSelectAll}
      onKeyPress={toggleSelectAll}
    >
      <input
        type="checkbox"
        ref={checkboxRef}
        readOnly
        data-testid="selectall-checkbox"
        tabIndex={-1}
        checked={allSelected === 'all'}
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
