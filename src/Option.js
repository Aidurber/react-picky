import React from 'react';
import PropTypes from 'prop-types';
import { isDataObject } from './lib/utils';
const Option = props => {
  const {
    item,
    isSelected,
    labelKey,
    valueKey,
    selectValue,
    style,
    multiple
  } = props;
  const cssClass = isSelected ? 'selected' : '';
  const body = isDataObject(item, labelKey, valueKey) ? item[labelKey] : item;

  return (
    <li style={style} className={cssClass} onClick={() => selectValue(item)}>
      <input
        type={multiple ? 'checkbox' : 'radio'}
        checked={isSelected}
        readOnly
      />
      {body}
    </li>
  );
};

Option.propTypes = {
  isSelected: PropTypes.bool,
  valueKey: PropTypes.string,
  labelKey: PropTypes.string,
  item: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object
  ]).isRequired,
  style: PropTypes.object,
  selectValue: PropTypes.func.isRequired,
  multiple: PropTypes.bool
};
export default Option;
