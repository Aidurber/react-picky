import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import VirtualList from 'react-tiny-virtual-list';
import { isDataObject, generateGuid } from './lib/utils';
import isEqual from 'lodash.isequal';
import Placeholder from './Placeholder';
import Filter from './Filter';
import Option from './Option';
import './Picky.scss';
class Picky extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: props.value || (props.multiple ? [] : null),
      open: props.open,
      filtered: false,
      filteredOptions: [],
      id: generateGuid(),
      allSelected: false
    };

    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.selectAll = this.selectAll.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);
    this.selectValue = this.selectValue.bind(this);
    this.allSelected = this.allSelected.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }
  componentWillMount() {
    const allSelected = this.allSelected();
    this.setState({
      allSelected
    });
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.options !== nextProps.options ||
      this.state.selectedValue !== nextProps.value
    ) {
      this.setState({
        allSelected: this.allSelected()
      });
    }
  }

  selectValue(val) {
    const valueLookup = this.isControlled()
      ? this.props.value
      : this.state.selectedValue;

    if (this.props.multiple && Array.isArray(valueLookup)) {
      if (valueLookup.includes(val)) {
        const currIndex = valueLookup.indexOf(val);
        // Remove
        this.setState(
          {
            selectedValue: [
              ...valueLookup.slice(0, currIndex),
              ...valueLookup.slice(currIndex + 1)
            ]
          },
          () => {
            this.props.onChange(this.state.selectedValue);
          }
        );
      } else {
        this.setState(
          {
            selectedValue: [...this.state.selectedValue, val]
          },
          () => {
            this.props.onChange(this.state.selectedValue);
          }
        );
      }
    } else {
      this.setState(
        {
          selectedValue: val
        },
        () => {
          this.props.onChange(this.state.selectedValue);
        }
      );
    }
  }
  allSelected() {
    const { selectedValue } = this.state;
    const { options } = this.props;
    const copiedOptions = options.slice(0);
    const copiedSelectedValue = Array.isArray(selectedValue)
      ? selectedValue.slice(0)
      : [];
    return isEqual(copiedOptions, copiedSelectedValue);
  }
  selectAll() {
    this.setState(
      {
        selectedValue: !this.state.allSelected ? this.props.options : [],
        allSelected: !this.state.allSelected
      },
      () => {
        this.props.onChange(this.state.selectedValue);
      }
    );
  }
  isControlled() {
    return this.props.value != null;
  }

  renderOptions() {
    const {
      options,
      value,
      dropdownHeight,
      labelKey,
      valueKey,
      itemHeight,
      multiple,
      tabIndex
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
          let isSelected = false;
          if (this.isControlled()) {
            isSelected =
              (Array.isArray(value) && value.includes(item)) ||
              (!Array.isArray(value) && value === item);
          } else {
            isSelected =
              (Array.isArray(this.state.selectedValue) &&
                this.state.selectedValue.includes(item)) ||
              (!Array.isArray(this.state.selectedValue) &&
                this.state.selectedValue === item);
          }

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
                tabIndex={tabIndex}
                id={this.state.id + '-option-' + index}
              />
            );
          }
        }}
      />
    );
  }
  onFilterChange(term) {
    if (!term.trim()) {
      return this.setState({
        filtered: false,
        filteredOptions: []
      });
    }
    const filteredOptions = this.props.options.filter(option => {
      if (isDataObject(option, this.props.labelKey, this.props.valueKey)) {
        return String(option[this.props.labelKey])
          .toLowerCase()
          .includes(term.toLowerCase());
      }
      return String(option)
        .toLowerCase()
        .includes(term.toLowerCase());
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

  handleOutsideClick(e) {
    // If keep open then don't toggle dropdown
    // If radio and not keepOpen then auto close it on selecting a value
    const keepOpen = this.props.keepOpen || this.props.multiple;
    if (this.node && this.node.contains(e.target) && keepOpen) {
      return;
    }
    this.toggleDropDown();
  }
  toggleDropDown() {
    if (!this.state.open) {
      // attach/remove event handler
      document.addEventListener('click', this.handleOutsideClick, false);
    } else {
      document.removeEventListener('click', this.handleOutsideClick, false);
    }

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
      labelKey,
      tabIndex
    } = this.props;
    const { open } = this.state;
    let ariaOwns = '';
    if (open) {
      ariaOwns += this.state.id + '-list';
    }
    return (
      <div
        ref={node => {
          this.node = node;
        }}
        className="picky"
        id={this.state.id}
        role="combobox"
        aria-controls={`${this.state.id}__button`}
        aria-expanded={open}
        aria-haspopup={open}
        aria-owns={ariaOwns}
        tabIndex={tabIndex}
      >
        <button
          id={`${this.state.id}__button`}
          type="button"
          className="picky__input"
          onClick={this.toggleDropDown}
        >
          <Placeholder
            placeholder={placeholder}
            value={this.isControlled() ? value : this.state.selectedValue}
            multiple={multiple}
            numberDisplayed={numberDisplayed}
            valueKey={valueKey}
            labelKey={labelKey}
          />
        </button>
        {open && (
          <div className="picky__dropdown" id={this.state.id + '-list'}>
            {includeFilter && (
              <Filter
                onFilterChange={
                  filterDebounce > 0
                    ? debounce(this.onFilterChange, filterDebounce)
                    : this.onFilterChange
                }
              />
            )}

            {includeSelectAll &&
              multiple &&
              !this.state.filtered && (
                <div
                  tabIndex={tabIndex}
                  role="option"
                  id={this.state.id + '-option-' + 'selectall'}
                  data-selectall="true"
                  aria-selected={this.state.allSelected}
                  className={
                    this.state.allSelected ? 'option selected' : 'option'
                  }
                  onClick={this.selectAll}
                  onKeyPress={this.selectAll}
                >
                  <input
                    type="checkbox"
                    readOnly
                    onClick={this.selectAll}
                    tabIndex={-1}
                    checked={this.state.allSelected}
                    aria-label="select all"
                  />
                  Select All
                </div>
              )}
            {this.renderOptions()}
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
  itemHeight: 35,
  tabIndex: 0,
  keepOpen: true
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
  itemHeight: PropTypes.number,
  tabIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  keepOpen: PropTypes.bool
};

export default Picky;
