import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import VirtualList from 'react-tiny-virtual-list';
import { isDataObject } from './lib/utils';

import Placeholder from './Placeholder';
import Filter from './Filter';
import Option from './Option';
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
    this.selectValue = this.selectValue.bind(this);
  }

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
    const copiedOptions = this.props.options.slice(0);
    const copiedSelectedValue = this.state.selectedValue.slice(0);
    return (
      copiedOptions.sort().toString() == copiedSelectedValue.sort().toString()
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
    const {
      options,
      value,
      dropdownHeight,
      labelKey,
      valueKey,
      itemHeight,
      multiple
    } = this.props;
    const items = this.state.filtered ? this.state.filteredOptions : options;
    return (
      <VirtualList
        width="100%"
        height={dropdownHeight}
        itemCount={items.length}
        itemSize={itemHeight}
        renderItem={({ index, style }) => {
          const item = items[index];
          const key = isDataObject(item, labelKey, valueKey)
            ? item[valueKey]
            : item;

          const isSelected =
            (Array.isArray(value) && value.includes(item)) ||
            (!Array.isArray(value) && value === item);

          if (typeof this.props.render === 'function') {
            return this.props.render({
              style,
              item,
              isSelected,
              selectValue: this.selectValue,
              labelKey,
              valueKey,
              multiple
            });
          } else {
            return (
              <Option
                key={key}
                style={style}
                item={item}
                isSelected={isSelected}
                selectValue={this.selectValue}
                labelKey={labelKey}
                valueKey={valueKey}
                multiple={multiple}
              />
            );
          }
        }}
      />
    );
  }
  onFilterChange(value) {
    if (!value.trim()) {
      return this.setState({
        filtered: false,
        filteredOptions: []
      });
    }
    const filteredOptions = this.props.options.filter(option => {
      if (isDataObject(option, this.props.labelKey, this.props.valueKey)) {
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
                multiple &&
                !this.state.filtered && (
                  <li
                    data-selectall="true"
                    className={this.allSelected() ? 'selected' : ''}
                    onClick={this.selectAll}
                  >
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
  onChange: () => {},
  itemHeight: 35
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
  labelKey: PropTypes.string,
  render: PropTypes.func,
  itemHeight: PropTypes.number
};

export default Picky;
