import React from 'react';
import PropTypes from 'prop-types';
import debounce from './lib/debounce';
import includes from './lib/includes';

import {
  isDataObject,
  generateGuid,
  hasItem,
  keyExtractor,
  hasItemIndex,
  sortCollection,
  arraysEqual,
} from './lib/utils';
import Placeholder from './Placeholder';
import Filter from './Filter';
import Option from './Option';
import './Picky.css';

class Picky extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: props.value || (props.multiple ? [] : null),
      open: props.open,
      filtered: false,
      filteredOptions: [],
      id: generateGuid(),
      allSelected: false,
    };
    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.toggleSelectAll = this.toggleSelectAll.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);
    this.selectValue = this.selectValue.bind(this);
    this.allSelected = this.allSelected.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.isItemSelected = this.isItemSelected.bind(this);
    this.focusFilterInput = this.focusFilterInput.bind(this);
    this.getValue = this.getValue.bind(this);
  }
  UNSAFE_componentWillMount() {
    this.setState({
      allSelected: this.allSelected(),
    });
  }

  componentDidMount() {
    this.focusFilterInput(this.state.open);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleOutsideClick, false);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      this.props.options !== nextProps.options ||
      this.props.value !== nextProps.value
    ) {
      let areEqual = Array.isArray(nextProps.value)
        ? arraysEqual(nextProps.value, this.props.value)
        : nextProps.value === this.props.value;

      this.setState({
        allSelected: !areEqual
          ? this.allSelected(nextProps.value)
          : this.allSelected(),
      });
    }
  }

  selectValue(val) {
    const valueLookup = this.props.value;
    if (this.props.multiple && Array.isArray(valueLookup)) {
      const itemIndex = hasItemIndex(
        valueLookup,
        val,
        this.props.valueKey,
        this.props.labelKey
      );

      let selectedValue = [];
      if (itemIndex > -1) {
        selectedValue = [
          ...valueLookup.slice(0, itemIndex),
          ...valueLookup.slice(itemIndex + 1),
        ];
      } else {
        selectedValue = [...this.props.value, val];
      }
      this.setState(
        {
          allSelected: this.allSelected(selectedValue),
        },
        () => {
          this.props.onChange(selectedValue);
        }
      );
    } else {
      this.props.onChange(val);
    }
  }
  /**
   * Get the value of a given option or value safely
   *
   * @param {*} option
   * @returns
   * @memberof Picky
   */
  getValue(option) {
    return typeof this.props.valueKey !== 'undefined'
      ? option[this.props.valueKey]
      : option;
  }
  /**
   * Determine whether all items are selected
   *
   * @returns {Boolean}
   * @memberof Picky
   */
  allSelected(overrideSelected) {
    const { value, valueKey, options } = this.props;
    const selectedValue = overrideSelected || value;

    // If there are no options we are getting a false positive for all items being selected
    if (options && options.length === 0) {
      return false;
    }
    let copiedOptions = options.map(this.getValue);
    let copiedValues = Array.isArray(selectedValue)
      ? selectedValue.map(this.getValue)
      : [];

    return arraysEqual(
      sortCollection(copiedValues),
      sortCollection(copiedOptions)
    );
  }
  /**
   * Toggles select all
   *
   * @memberof Picky
   */
  toggleSelectAll() {
    if (this.props.disabled) return;
    this.setState(
      state => {
        return {
          ...state,
          allSelected: !this.state.allSelected,
        };
      },
      () => {
        if (!this.state.allSelected) {
          this.props.onChange([]);
        } else {
          this.props.onChange(this.props.options);
        }
      }
    );
  }

  isItemSelected(item) {
    return hasItem(
      this.props.value,
      item,
      this.props.valueKey,
      this.props.labelKey
    );
  }

  /**
   * Renders a non-virtualised list.
   *
   * @param {any} items
   * @returns
   * @memberof Picky
   */
  renderPlainList(items) {
    const {
      labelKey,
      valueKey,
      multiple,
      render,
      tabIndex,
      renderList,
      disabled,
    } = this.props;
    if (renderList) {
      return renderList({
        items,
        selected: this.props.value,
        multiple,
        tabIndex,
        getIsSelected: this.isItemSelected,
        selectValue: this.selectValue,
        disabled,
      });
    }
    return items.map((item, index) => {
      // Create a key based on the options value
      const key = keyExtractor(item, valueKey, labelKey);

      const isSelected = this.isItemSelected(item);
      // If render prop supplied for items call that.
      if (typeof render === 'function') {
        return render({
          index,
          item,
          isSelected,
          selectValue: this.selectValue,
          labelKey: labelKey,
          valueKey: valueKey,
          multiple: multiple,
          disabled,
        });
      } else {
        // Render a simple option
        return (
          <Option
            key={key}
            item={item}
            isSelected={isSelected}
            selectValue={this.selectValue}
            labelKey={labelKey}
            valueKey={valueKey}
            multiple={multiple}
            tabIndex={tabIndex}
            disabled={disabled}
            id={this.state.id + '-option-' + index}
          />
        );
      }
    });
  }
  renderOptions() {
    return this.renderPlainList(
      this.state.filtered ? this.state.filteredOptions : this.props.options
    );
  }
  /**
   * Called when Filter term changes. Sets filteredOptions and filtered state.
   *
   * @param {any} term
   * @returns
   * @memberof Picky
   */
  onFilterChange(term) {
      /**
     * getFilterValue function will provide the input value of filter to the picky dropdown, so that if we have a larger list of options then we can only supply the matching options based on this value
       */

      if (this.props.getFilterValue) {
        this.props.getFilterValue(term)
      }
    if (!term.trim()) {
      return this.setState({
        filtered: false,
        filteredOptions: [],
      });
    }
    const isObject = isDataObject(
      this.props.options && this.props.options[0],
      this.props.valueKey,
      this.props.labelKey
    );
    const filteredOptions = this.props.options.filter(option => {
      if (isObject) {
        return includes(option[this.props.labelKey], term);
      }
      return includes(option, term);
    });
    this.setState(
      {
        filtered: true,
        filteredOptions,
      },
      () => {
        if (this.props.onFiltered) {
          this.props.onFiltered(filteredOptions);
        }
      }
    );
  }
  /**
   *
   * Called by a click event listener. Used to determine any clicks that occur outside of the component.
   * @param {MouseEvent} e
   * @returns
   * @memberof Picky
   */
  handleOutsideClick(e) {
    // If keep open then don't toggle dropdown
    // If radio and not keepOpen then auto close it on selecting a value
    // If radio and click to the filter input then don't toggle dropdown
    const keepOpen = this.props.keepOpen || this.props.multiple;
    if (this.node && this.node.contains(e.target) && keepOpen) {
      return;
    }
    if (
      this.filter &&
      this.filter.filterInput &&
      this.filter.filterInput.contains(e.target)
    ) {
      return;
    }
    this.toggleDropDown();
  }

  focusFilterInput(isOpen) {
    if (isOpen && this.props.defaultFocusFilter) {
      if (this.filter && this.filter.filterInput) {
        this.filter.filterInput.focus();
      }
    }
  }
  /**
   * Toggle state of dropdown
   *
   * @memberof Picky
   */
  toggleDropDown() {
    if (!this.state.open) {
      // Add event listener to listen for clicks to determine if click occured outside the component or not
      document.addEventListener('click', this.handleOutsideClick, false);
    } else {
      // Remove
      document.removeEventListener('click', this.handleOutsideClick, false);
    }

    this.setState(
      state => {
        return {
          ...state,
          // Toggle open state
          open: !state.open,
        };
      },
      () => {
        const isOpen = this.state.open;
        // Prop callbacks
        this.focusFilterInput(isOpen);
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
      className,
      placeholder,
      value,
      multiple,
      numberDisplayed,
      includeSelectAll,
      includeFilter,
      filterDebounce,
      valueKey,
      labelKey,
      tabIndex,
      dropdownHeight,
      renderSelectAll,
      filterPlaceholder,
      disabled,
    } = this.props;
    const { open } = this.state;
    let ariaOwns = '';
    if (open) {
      ariaOwns += this.state.id + '-list';
    }
    const buttonId = `${this.state.id}__button`;
    const dropdownStyle = { maxHeight: dropdownHeight, overflowY: 'scroll' };
    return (
      <div
        ref={node => {
          this.node = node;
        }}
        className={['picky', className].join(' ')}
        id={this.state.id}
        role="combobox"
        aria-controls={buttonId}
        aria-expanded={open}
        aria-haspopup={open}
        aria-owns={ariaOwns}
        tabIndex={tabIndex}
      >
        <button
          id={`${this.state.id}__button`}
          type="button"
          className={[
            'picky__input',
            disabled ? 'picky__input--disabled' : '',
          ].join(' ')}
          data-testid="picky-input"
          onClick={this.toggleDropDown}
        >
          <Placeholder
            allSelected={this.state.allSelected}
            placeholder={placeholder}
            manySelectedPlaceholder={this.props.manySelectedPlaceholder}
            allSelectedPlaceholder={this.props.allSelectedPlaceholder}
            value={value}
            multiple={multiple}
            numberDisplayed={numberDisplayed}
            valueKey={valueKey}
            labelKey={labelKey}
            data-testid="placeholder-component"
          />
        </button>
        <div
          className="picky__dropdown"
          id={this.state.id + '-list'}
          aria-hidden={!open}
          style={open ? dropdownStyle : { visibility: 'hidden' }}
        >
          {includeFilter && (
            <Filter
              ref={filter => (this.filter = filter)}
              placeholder={filterPlaceholder}
              onFilterChange={
                filterDebounce > 0
                  ? debounce(this.onFilterChange, filterDebounce)
                  : this.onFilterChange
              }
            />
          )}
          {renderSelectAll &&
            renderSelectAll({
              filtered: this.state.filtered,
              allSelected: this.state.allSelected,
              toggleSelectAll: this.toggleSelectAll,
              tabIndex,
              multiple,
              disabled,
            })}
          {!renderSelectAll &&
            includeSelectAll &&
            multiple &&
            !this.state.filtered && (
              <div
                tabIndex={tabIndex}
                role="option"
                data-testid="selectall"
                id={this.state.id + '-option-' + 'selectall'}
                data-selectall="true"
                aria-selected={this.state.allSelected}
                className={
                  this.state.allSelected ? 'option selected' : 'option'
                }
                onClick={this.toggleSelectAll}
                disabled={disabled}
                onKeyPress={this.toggleSelectAll}
              >
                <input
                  type="checkbox"
                  readOnly
                  data-testid="selectall-checkbox"
                  tabIndex={-1}
                  checked={this.state.allSelected}
                  aria-label="select all"
                  disabled={disabled}
                />
                <span data-testid="select-all-text">
                  {this.props.selectAllText}
                </span>
              </div>
            )}
          {open && <div data-testid="dropdown">{this.renderOptions()}</div>}
        </div>
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
  tabIndex: 0,
  keepOpen: true,
  selectAllText: 'Select all',
};
Picky.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
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
  tabIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  keepOpen: PropTypes.bool,
  manySelectedPlaceholder: PropTypes.string,
  allSelectedPlaceholder: PropTypes.string,
  selectAllText: PropTypes.string,
  renderSelectAll: PropTypes.func,
  defaultFocusFilter: PropTypes.bool,
  className: PropTypes.string,
  renderList: PropTypes.func,
  filterPlaceholder: PropTypes.string,
  disabled: PropTypes.bool,
  getFilterValue: PropTypes.func,
};

export default Picky;
