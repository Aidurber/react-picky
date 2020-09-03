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

class SelectAll extends React.PureComponent<SelectAllProps> {
  static displayName = 'Picky(SelectAll)';
  checkboxRef = React.createRef<HTMLInputElement>();

  componentDidUpdate(prevProps: SelectAllProps) {
    if (prevProps.allSelected !== this.props.allSelected) {
      if (this.checkboxRef && this.checkboxRef.current) {
        this.checkboxRef.current.indeterminate =
          this.props.allSelected === 'partial';
      }
    }
  }
  render() {
    const {
      tabIndex,
      disabled,
      allSelected,
      id,
      selectAllText,
      toggleSelectAll,
      visible,
    } = this.props;

    if (!visible) return null;
    return (
      <div
        tabIndex={tabIndex}
        role="option"
        data-testid="selectall"
        id={`${id}-option-selectall`}
        data-selectall="true"
        aria-selected={allSelected === 'all'}
        className={allSelected === 'all' ? 'option selected' : 'option'}
        onClick={toggleSelectAll}
        onKeyPress={toggleSelectAll}
      >
        <input
          type="checkbox"
          ref={this.checkboxRef}
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
  }
}

export { SelectAll };
