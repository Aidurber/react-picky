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
const SelectAll: React.FC<SelectAllProps> = React.memo(
  ({
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
  },
  areEqual
);

SelectAll.displayName = 'Picky(SelectAll)';

function areEqual(prevProps: SelectAllProps, nextProps: SelectAllProps) {
  return (
    prevProps.tabIndex === nextProps.tabIndex &&
    prevProps.disabled === nextProps.disabled &&
    prevProps.allSelected === nextProps.allSelected &&
    prevProps.selectAllText === nextProps.selectAllText &&
    prevProps.visible === nextProps.visible
  );
}
export { SelectAll };
