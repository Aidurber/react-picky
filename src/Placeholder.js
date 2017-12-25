import React from 'react';
import PropTypes from 'prop-types';
const Placeholder = ({ placeholder, value, numberDisplayed, multiple }) => {
  let message = '';
  // Show placeholder if no value
  if (!value || !value.length) {
    message = placeholder;
  } else if (Array.isArray(value)) {
    // If type is array and values length less than number displayed
    // join the values
    if (multiple) {
      if (value.length <= numberDisplayed) {
        message = value.join(', ');
      } else {
        //If more than numberDisplayed then show "length selected"
        message = `${value.length} selected`;
      }
    } else {
      message = value[0].toString();
    }
  } else {
    message = value;
  }
  return <span className="picky__placeholder">{message}</span>;
};

Placeholder.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
    PropTypes.number
  ]),
  numberDisplayed: PropTypes.number,
  multiple: PropTypes.bool
};

export default Placeholder;
