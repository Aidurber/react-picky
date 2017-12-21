import React from 'react';
import PropTypes from 'prop-types';

class Picky extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: props.value
    };
  }

  componentDidMount() {}
  renderPlaceholder() {
    const { placeholder, value, numberDisplayed, multiple } = this.props;
    // Show placeholder if no value
    if (!value) return placeholder;

    if (Array.isArray(value)) {
      // If type is array and values length less than number displayed
      // join the values
      if (multiple) {
        if (value.length <= numberDisplayed) {
          return value.join(', ');
        } else {
          //If more than numberDisplayed then show "length selected"
          return `${value.length} selected`;
        }
      } else {
        return value[0].toString();
      }
    } else {
      return value;
    }
  }
  render() {
    //const { placeholder, value } = this.props;
    return (
      <div className="picky">
        <button type="button" className="picky__input">
          <span className="picky__placeholder">{this.renderPlaceholder()}</span>
        </button>
      </div>
    );
  }
}

Picky.defaultProps = {
  placeholder: 'None selected',
  numberDisplayed: 3
};
Picky.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
    PropTypes.number
  ]),
  numberDisplayed: PropTypes.number,
  multiple: PropTypes.bool
};

export default Picky;
