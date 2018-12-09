import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
class Filter extends PureComponent {
  render() {
    return (
      <div className="picky__filter">
        <input
          type="text"
          ref={input => (this.filterInput = input)}
          className="picky__filter__input"
          data-testid="picky__filter__input"
          placeholder={this.props.placeholder}
          tabIndex={this.props.tabIndex}
          aria-label="filter options"
          onChange={e => this.props.onFilterChange(e.target.value)}
        />
      </div>
    );
  }
}
Filter.defaultProps = {
  placeholder: 'Filter...',
};
Filter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  tabIndex: PropTypes.number,
  placeholder: PropTypes.string,
};

export default Filter;
