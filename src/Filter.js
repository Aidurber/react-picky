import React, { Component } from 'react';
import PropTypes from 'prop-types';
class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterTerm: '',
    };

    this.onFilterChange = this.onFilterChange.bind(this);
  }
  onFilterChange(event) {
    const query = event.target.value;
    this.setState(
      {
        filterTerm: query,
      },
      () => {
        this.props.onFilterChange(query);
      }
    );
  }
  render() {
    return (
      <div className="picky__filter">
        <input
          type="text"
          ref={input => (this.filterInput = input)}
          className="picky__filter__input"
          data-testid="picky__filter__input"
          placeholder="Filter..."
          tabIndex={this.props.tabIndex}
          aria-label="filter options"
          value={this.state.filterTerm}
          onChange={this.onFilterChange}
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
