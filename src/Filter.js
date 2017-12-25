import React, { Component } from 'react';
import PropTypes from 'prop-types';
class Filter extends Component {
  render() {
    return (
      <div className="picky__filter">
        <input
          type="text"
          className="picky__filter__input"
          placeholder="Filter..."
          onChange={event => this.props.onFilterChange(event.target.value)}
        />
      </div>
    );
  }
}

Filter.propTypes = {
  onFilterChange: PropTypes.func.isRequired
};

export default Filter;
