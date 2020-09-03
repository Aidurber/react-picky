import * as React from 'react';
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
const SelectAll: React.FunctionComponent<SelectAllProps> = ({
  tabIndex,
  disabled,
  allSelected,
  id,
  selectAllText,
  toggleSelectAll,
  visible,
}) => {
  const checkboxRef = React.useRef<HTMLInputElement | null>(null);
  React.useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = allSelected === 'partial';
    }
  }, [allSelected]);

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

export { SelectAll };
