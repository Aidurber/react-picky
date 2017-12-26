import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import VirtualList from 'react-tiny-virtual-list';
import Placeholder from './Placeholder';
import Filter from './Filter';
import './Picky.scss';
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
    this.isDataObject = this.isDataObject.bind(this);
  }

  selectValue(value) {
    if (this.props.multiple && Array.isArray(this.props.value)) {
      if (this.props.value.includes(value)) {
        const currIndex = this.props.value.indexOf(value);
        // Remove
        const start = this.props.value.slice(0, currIndex);
        const end = this.props.value.slice(currIndex + 1);
        this.setState(
          {
            selectedValue: start.concat(end)
          },
          () => {
            this.props.onChange(this.state.selectedValue);
          }
        );
      } else {
        this.setState(
          {
            selectedValue: [value, ...this.state.selectedValue]
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
    if (!this.props.multiple) return false;
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
  isDataObject(obj) {
    const { valueKey, labelKey } = this.props;
    return (
      typeof obj === 'object' &&
      obj.hasOwnProperty(valueKey) &&
      obj.hasOwnProperty(labelKey)
    );
  }
  renderOptions() {
    const {
      options,
      value,
      dropdownHeight,
      valueKey,
      labelKey,
      multiple
    } = this.props;
    const items = this.state.filtered ? this.state.filteredOptions : options;
    return (
      <VirtualList
        width="100%"
        height={dropdownHeight}
        itemCount={items.length}
        itemSize={35}
        renderItem={({ index, style }) => {
          let isSelected = false;
          const current = items[index];
          if (Array.isArray(value) && value.includes(current)) {
            isSelected = true;
          } else if (!Array.isArray(value) && value === current) {
            isSelected = true;
          } else if (Array.isArray(value) && value.includes(current)) {
            return true;
          }
          let body = '';
          if (this.isDataObject(current)) {
            body = current[labelKey];
          } else {
            body = current;
          }
          return (
            <li
              key={this.isDataObject(current) ? current[valueKey] : current}
              style={style}
              className={isSelected ? 'selected' : ''}
              onClick={() => this.selectValue(current)}
            >
              {multiple && (
                <input type="checkbox" checked={isSelected} readOnly />
              )}
              {body}
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
    const filteredOptions = this.props.options.filter(option => {
      if (this.isDataObject(option)) {
        return String(option[this.props.labelKey])
          .toLowerCase()
          .includes(value.toLowerCase());
      }
      return String(option)
        .toLowerCase()
        .includes(value.toLowerCase());
    });
    this.setState(
      {
        filtered: true,
        filteredOptions
      },
      () => {
        if (this.props.onFiltered) {
          this.props.onFiltered(filteredOptions);
        }
      }
    );
  }
  toggleDropDown() {
    this.setState(
      {
        open: !this.state.open
      },
      () => {
        const isOpen = this.state.open;
        if (isOpen && this.props.onOpen) {
          this.props.onOpen();
        } else if (!isOpen && this.props.onClose) {
          this.props.onClose();
        }
      }
    );
  }
  render() {
    const {
      placeholder,
      value,
      multiple,
      numberDisplayed,
      includeSelectAll,
      includeFilter,
      filterDebounce,
      valueKey,
      labelKey
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
            valueKey={valueKey}
            labelKey={labelKey}
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
                    {multiple && (
                      <input
                        type="checkbox"
                        checked={this.allSelected()}
                        readOnly
                      />
                    )}
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
  filterDebounce: 150,
  dropdownHeight: 300,
  onChange: () => {}
};
Picky.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
    PropTypes.number,
    PropTypes.object
  ]),
  numberDisplayed: PropTypes.number,
  multiple: PropTypes.bool,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  open: PropTypes.bool,
  includeSelectAll: PropTypes.bool,
  includeFilter: PropTypes.bool,
  filterDebounce: PropTypes.number,
  dropdownHeight: PropTypes.number,
  onFiltered: PropTypes.func,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  valueKey: PropTypes.string,
  labelKey: PropTypes.string
};

export default Picky;
