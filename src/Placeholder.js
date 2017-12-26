// NEEDS REFACTOR
import React from 'react';
import PropTypes from 'prop-types';
import { isDataObject } from './lib/utils';

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
      labelKey
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
          //If more than numberDisplayed then show "length selected"
          message = `${value.length} selected`;
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

    return <span className="picky__placeholder">{message}</span>;
  }
}

Placeholder.defaultProps = {
  placeholder: 'None selected'
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
  labelKey: PropTypes.string
};

export default Placeholder;
