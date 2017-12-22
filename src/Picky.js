import React from 'react';
import PropTypes from 'prop-types';
import Placeholder from './Placeholder';
class Picky extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: props.value
    };
  }

  componentDidMount() {}

  render() {
    const { placeholder, value, multiple, numberDisplayed } = this.props;
    return (
      <div className="picky">
        <button type="button" className="picky__input">
          <Placeholder
            placeholder={placeholder}
            value={value}
            multiple={multiple}
            numberDisplayed={numberDisplayed}
          />
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
