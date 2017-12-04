import React from 'react';
import PropTypes from 'prop-types';
import { Trigger, Select } from 'react-aria';
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
      <Select.Manager className="react-select" multiple={this.props.multiple}>
        <Trigger>
          {currentValues.length > 0 ? currentValues.join(', ') : placeholder}
        </Trigger>
        <div className="react-select-menu">
          {this.props.children ? (
            <ul className="react-select-options">{this.props.children}</ul>
          ) : null}
        </div>
      </Select.Manager>
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
