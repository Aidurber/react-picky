import * as React from 'react';
export type FilterProps = {
  onFilterChange(term: string): void;
  tabIndex: number | undefined;
  placeholder?: string;
} & React.RefAttributes<HTMLInputElement>;

const Filter: React.FC<FilterProps> = React.forwardRef(
  (
    { placeholder, tabIndex, onFilterChange },
    ref: React.Ref<HTMLInputElement>
  ) => {
    return (
      <div className="picky__filter">
        <input
          ref={ref}
          type="text"
          className="picky__filter__input"
          data-testid="picky__filter__input"
          placeholder={placeholder}
          tabIndex={tabIndex}
          aria-label="filter options"
          onChange={e => onFilterChange(e.target.value)}
        />
      </div>
    );
  }
);

Filter.defaultProps = {
  placeholder: 'Filter...',
};

Filter.displayName = 'Picky(Filter)';

export { Filter };
