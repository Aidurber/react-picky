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
    tabIndex
  } = props;
  const cssClass = isSelected ? 'option selected' : 'option';
  const body = isDataObject(item, labelKey, valueKey) ? item[labelKey] : item;
  const inputType = multiple ? 'checkbox' : 'radio';
  const select = () => selectValue(item);
  return (
    <div
      tabIndex={tabIndex}
      id={id}
      role="option"
      style={style}
      data-test="option"
      aria-selected={isSelected}
      className={cssClass}
      onClick={select}
      onKeyPress={e => {
        e.preventDefault();
        selectValue(item);
      }}
    >
      <input
        type={inputType}
        readOnly
        onClick={select}
        tabIndex={-1}
        checked={isSelected}
        aria-label={body}
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
    PropTypes.object
  ]).isRequired,
  style: PropTypes.object,
  selectValue: PropTypes.func.isRequired,
  multiple: PropTypes.bool,
  tabIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
export default Option;
