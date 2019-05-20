import React from 'react';
import PropTypes from 'prop-types';
import { onlyUpdateForKeys } from 'recompose';
function SelectAll({
  tabIndex,
  disabled,
  allSelected,
  id,
  selectAllText,
  toggleSelectAll,
  visible,
}) {
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
      disabled={disabled}
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
}

SelectAll.propTypes = {
  tabIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  allSelected: PropTypes.bool,
  id: PropTypes.string.isRequired,
  selectAllText: PropTypes.string,
  toggleSelectAll: PropTypes.func.isRequired,
  visible: PropTypes.bool,
};

export default onlyUpdateForKeys([
  'tabIndex',
  'disabled',
  'allSelected',
  'selectAllText',
  'visible',
])(SelectAll);
