import * as React from 'react';
export type FilterProps = {
  onFilterChange(term: string): void;
  tabIndex: number | undefined;
  placeholder?: string;
};
class Filter extends React.Component<FilterProps> {
  filterInput: HTMLInputElement | null = null;
  static displayName = 'Picky(Filter)';
  static defaultProps = {
    placeholder: 'Filter...',
  };
  shouldComponentUpdate(nextProps: FilterProps) {
    return (
      this.props.placeholder !== nextProps.placeholder ||
      this.props.tabIndex !== nextProps.tabIndex
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
          placeholder={this.props.placeholder}
          tabIndex={this.props.tabIndex}
          aria-label="filter options"
          onChange={e => this.props.onFilterChange(e.target.value)}
        />
      </div>
    );
  }
}

export default Filter;
