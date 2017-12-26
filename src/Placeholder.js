// NEEDS REFACTOR
import React from 'react';
import PropTypes from 'prop-types';
class Placeholder extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      props: {
        placeholder,
        value,
        numberDisplayed,
        multiple,
        valueKey,
        labelKey
      }
    } = this;

    let message = '';
    // Show placeholder if no value

    if (
      value === null ||
      value === undefined ||
      (Array.isArray(value) && !value.length)
    ) {
      message = placeholder;
    } else if (Array.isArray(value)) {
      // If type is array and values length less than number displayed
      // join the values
      if (multiple) {
        if (value.length <= numberDisplayed) {
          message = value
            .map(opt => {
              if (
                typeof opt === 'object' &&
                opt.hasOwnProperty(valueKey) &&
                opt.hasOwnProperty(labelKey)
              ) {
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
        if (
          typeof value === 'object' &&
          value.hasOwnProperty(valueKey) &&
          value.hasOwnProperty(labelKey)
        ) {
          message = value[labelKey];
        }
        message = value[0].toString();
      }
    } else {
      if (
        typeof value === 'object' &&
        value.hasOwnProperty(valueKey) &&
        value.hasOwnProperty(labelKey)
      ) {
        message = value[labelKey];
      } else {
        message = value;
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
