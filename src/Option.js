import React from 'react';
import PropTypes from 'prop-types';
import { isDataObject } from './lib/utils';
const Option = props => {
  const {
    id,
    item,
    isSelected,
    labelKey,
    valueKey,
    selectValue,
    style,
    multiple,
    tabIndex,
    disabled,
  } = props;
  const cssClass = isSelected ? 'option selected' : 'option';
  const body = isDataObject(item, labelKey, valueKey) ? item[labelKey] : item;
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
        aria-label={body}
        data-testid={'option-checkbox'}
      />
      {body}
    </div>
  );
};

Option.propTypes = {
  isSelected: PropTypes.bool,
  valueKey: PropTypes.string,
  labelKey: PropTypes.string,
  id: PropTypes.string,
  item: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]).isRequired,
  style: PropTypes.object,
  selectValue: PropTypes.func.isRequired,
  multiple: PropTypes.bool,
  tabIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
};
export default Option;
