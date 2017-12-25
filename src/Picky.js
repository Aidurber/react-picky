import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import VirtualList from 'react-tiny-virtual-list';
import Placeholder from './Placeholder';
import Filter from './Filter';
import './Picky.css';

class Picky extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: props.value,
      open: props.open,
      filtered: false,
      filteredOptions: []
    };

    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.selectAll = this.selectAll.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);
  }

  componentDidMount() {}
  selectValue(value) {
    if (this.props.multiple && Array.isArray(this.props.value)) {
      if (this.props.value.includes(value)) {
        const currIndex = this.props.value.indexOf(value);
        // Remove
        this.setState(
          {
            selectedValue: [
              ...this.props.value.slice(0, currIndex),
              ...this.props.value.slice(currIndex + 1)
            ]
          },
          () => {
            this.props.onChange(this.state.selectedValue);
          }
        );
      } else {
        this.setState(
          {
            selectedValue: [...this.state.selectedValue, value]
          },
          () => {
            this.props.onChange(this.state.selectedValue);
          }
        );
      }
    } else {
      this.setState(
        {
          selectedValue: value
        },
        () => {
          this.props.onChange(this.state.selectedValue);
        }
      );
    }
  }
  allSelected() {
    return (
      this.props.options
        .map(opt => opt)
        .sort()
        .toString() == this.state.selectedValue.sort().toString()
    );
  }
  selectAll() {
    let selectedValue = this.props.options.map(opt => opt);

    if (this.allSelected()) {
      selectedValue = [];
    }
    this.setState(
      {
        selectedValue
      },
      () => {
        this.props.onChange(this.state.selectedValue);
      }
    );
  }
  renderOptions() {
    const { options, value, dropdownHeight } = this.props;
    const items = this.state.filtered ? this.state.filteredOptions : options;

    return (
      <VirtualList
        width="100%"
        height={dropdownHeight}
        itemCount={items.length}
        itemSize={35}
        renderItem={({ index, style }) => {
          let isSelected = false;
          const option = items[index];
          if (
            (Array.isArray(value) && value.includes(option)) ||
            (!Array.isArray(value) && value === option)
          ) {
            isSelected = true;
          }
          return (
            <li
              key={option}
              style={style}
              className={isSelected ? 'selected' : ''}
              onClick={() => this.selectValue(option)}
            >
              <input type="checkbox" checked={isSelected} readOnly />
              {option}
            </li>
          );
        }}
      />
    );
  }
  onFilterChange(value) {
    if (!value) {
      return this.setState({
        filtered: false,
        filteredOptions: []
      });
    }
    const filteredOptions = this.props.options.filter(option =>
      String(option).includes(value)
    );
    this.setState({
      filtered: true,
      filteredOptions
    });
  }
  toggleDropDown() {
    this.setState({
      open: !this.state.open
    });
  }
  render() {
    const {
      placeholder,
      value,
      multiple,
      numberDisplayed,
      includeSelectAll,
      includeFilter,
      filterDebounce
    } = this.props;
    const { open } = this.state;
    return (
      <div className="picky">
        <button
          type="button"
          className="picky__input"
          onClick={this.toggleDropDown}
        >
          <Placeholder
            placeholder={placeholder}
            value={value}
            multiple={multiple}
            numberDisplayed={numberDisplayed}
          />
        </button>
        {open && (
          <div className="picky__dropdown">
            {includeFilter && (
              <Filter
                onFilterChange={
                  filterDebounce > 0
                    ? debounce(this.onFilterChange, filterDebounce)
                    : this.onFilterChange
                }
              />
            )}
            <ul>
              {includeSelectAll &&
                !this.state.filtered && (
                  <li
                    data-selectall="true"
                    className={this.allSelected() ? 'selected' : ''}
                    onClick={this.selectAll}
                  >
                    <input
                      type="checkbox"
                      checked={this.allSelected()}
                      readOnly
                    />{' '}
                    Select All
                  </li>
                )}
              {this.renderOptions()}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

Picky.defaultProps = {
  numberDisplayed: 3,
  options: [],
  onChange: () => {},
  filterDebounce: 150,
  dropdownHeight: 300
};
Picky.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
    PropTypes.number
  ]),
  numberDisplayed: PropTypes.number,
  multiple: PropTypes.bool,
  options: PropTypes.array,
  onChange: PropTypes.func,
  open: PropTypes.bool,
  includeSelectAll: PropTypes.bool,
  includeFilter: PropTypes.bool,
  filterDebounce: PropTypes.number,
  dropdownHeight: PropTypes.number
};

export default Picky;
