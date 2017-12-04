import React from 'react';
import PropTypes from 'prop-types';
import { Select, Trigger } from 'selectly';

class Picky extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentValues: [],
    };
  }

  componentDidMount() {}

  render() {
    const { currentValues } = this.state;
    const { placeholder } = this.props;
    return (
      <Select classPrefix="react-picky" multiple={this.props.multiple}>
        <Trigger>
          {currentValues.length > 0 ? currentValues.join(', ') : placeholder}
        </Trigger>
        <div className="react-select-menu">
          <ul className="react-select-options">{this.props.children}</ul>
        </div>
      </Select>
    );
  }
}

Picky.propTypes = {
  placeholder: PropTypes.string,
  multiple: PropTypes.bool,
  disabled: PropTypes.bool,
  values: PropTypes.array,
  children: PropTypes.any,
};

export default Picky;
