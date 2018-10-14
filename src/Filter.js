import React, { Component } from 'react';
import PropTypes from 'prop-types';
class Filter extends Component {
  render() {
    return (
      <div className="picky__filter">
        <input
          type="text"
          ref={input => (this.filterInput = input)}
          className="picky__filter__input"
          data-test="picky__filter__input"
          placeholder="Filter..."
          tabIndex={this.props.tabIndex}
          aria-label="filter options"
          onChange={event => this.props.onFilterChange(event.target.value)}
        />
      </div>
    );
  }
}

Filter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  tabIndex: PropTypes.number,
};

export default Filter;
