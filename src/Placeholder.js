// NEEDS REFACTOR
import React from 'react';
import PropTypes from 'prop-types';
import format from './lib/format';
import { isDataObject } from './lib/utils';
import includes from './lib/includes';
const isEmptyValue = value =>
  value === null ||
  value === undefined ||
  (Array.isArray(value) && !value.length);

class Placeholder extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      placeholder,
      value,
      numberDisplayed,
      multiple,
      valueKey,
      labelKey,
      manySelectedPlaceholder,
      allSelectedPlaceholder,
      allSelected
    } = this.props;

    let message = '';
    if (isEmptyValue(this.props.value)) {
      message = placeholder;
    } else {
      if (Array.isArray(value) && multiple) {
        // If type is array and values length less than number displayed
        // join the values
        if (value.length <= numberDisplayed) {
          message = value
            .map(opt => {
              if (isDataObject(opt, valueKey, labelKey)) {
                return opt[labelKey];
              }
              return opt;
            })
            .join(', ');
        } else {
          // if many selected and not all selected then use the placeholder
          if (manySelectedPlaceholder && !allSelected) {
            // if it doesn't include the sprintf token then just use the placeholder
            message = includes(manySelectedPlaceholder, '%s')
              ? format(manySelectedPlaceholder, value.length)
              : manySelectedPlaceholder;
            //If all selected and there is an allselectedplaceholder use that
          } else if (allSelected && allSelectedPlaceholder) {
            // if it doesn't include the sprintf token then just use the placeholder
            message = includes(allSelectedPlaceholder, '%s')
              ? format(allSelectedPlaceholder, value.length)
              : allSelectedPlaceholder;
          }
        }
      } else {
        let tempValue = Array.isArray(value) ? value[0] : value;
        if (isDataObject(tempValue, valueKey, labelKey)) {
          message = tempValue[labelKey];
        } else {
          message = tempValue;
        }
      }
    }

    return (
      <span className="picky__placeholder" data-test="picky_placeholder">
        {message}
      </span>
    );
  }
}

Placeholder.defaultProps = {
  placeholder: 'None selected',
  allSelectedPlaceholder: '%s selected',
  manySelectedPlaceholder: '%s selected',
  allSelected: false
};
Placeholder.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
    PropTypes.number,
    PropTypes.object
  ]),
  numberDisplayed: PropTypes.number,
  multiple: PropTypes.bool,
  valueKey: PropTypes.string,
  labelKey: PropTypes.string,
  manySelectedPlaceholder: PropTypes.string,
  allSelectedPlaceholder: PropTypes.string,
  allSelected: PropTypes.bool
};

export default Placeholder;
