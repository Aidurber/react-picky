import React from 'react';
import PropTypes from 'prop-types';
import debounce from './lib/debounce';
import includes from './lib/includes';
import {
  isDataObject,
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
import SelectAll from './SelectAll';
import Button from './Button';

class Picky extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: props.value || (props.multiple ? [] : null),
      open: props.open,
      filtered: false,
      filteredOptions: [],
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
      let valuesEqual = Array.isArray(nextProps.value)
        ? arraysEqual(nextProps.value, this.props.value)
        : nextProps.value === this.props.value;

      let optsEqual = arraysEqual(nextProps.options, this.props.options);

      this.setState({
        allSelected: !(valuesEqual && optsEqual)
          ? this.allSelected(nextProps.value, nextProps.options)
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
  allSelected(overrideSelected, overrideOptions) {
    const { value, options } = this.props;
    const selectedValue = overrideSelected || value;
    const selectedOptions = overrideOptions || options;

    // If there are no options we are getting a false positive for all items being selected
    if (selectedOptions && selectedOptions.length === 0) {
      return false;
    }
    let copiedOptions = selectedOptions.map(this.getValue);
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

  renderOptions() {
    const items = this.state.filtered
      ? this.state.filteredOptions
      : this.props.options;

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
            id={this.props.id + '-option-' + index}
          />
        );
      }
    });
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
      this.props.getFilterValue(term);
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
        return includes(
          option[this.props.labelKey],
          term,
          this.props.caseSensitiveFilter
        );
      }
      return includes(option, term, this.props.caseSensitiveFilter);
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

  get filterDebounce() {
    const { filterDebounce } = this.props;
    return filterDebounce > 0
      ? debounce(this.onFilterChange, filterDebounce)
      : this.onFilterChange;
  }

  get showSelectAll() {
    const { renderSelectAll, multiple, includeSelectAll } = this.props;
    return (
      !renderSelectAll && includeSelectAll && multiple && !this.state.filtered
    );
  }
  render() {
    const {
      className,
      placeholder,
      value,
      multiple,
      numberDisplayed,
      includeFilter,
      valueKey,
      labelKey,
      tabIndex,
      dropdownHeight,
      renderSelectAll,
      filterPlaceholder,
      disabled,
      buttonProps,
    } = this.props;
    const { open } = this.state;
    let ariaOwns = '';
    if (open) {
      ariaOwns += this.props.id + '-list';
    }
    const buttonId = `${this.props.id}__button`;
    const dropdownStyle = { maxHeight: dropdownHeight, overflowY: 'scroll' };
    return (
      <div
        ref={node => {
          this.node = node;
        }}
        className={['picky', className].join(' ')}
        id={this.props.id}
        role="combobox"
        aria-controls={buttonId}
        aria-expanded={open}
        aria-haspopup={open}
        aria-owns={ariaOwns}
        tabIndex={tabIndex}
      >
        <Button
          id={`${this.props.id}__button`}
          disabled={disabled}
          onClick={this.toggleDropDown}
          {...buttonProps}
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
        </Button>
        <div
          className="picky__dropdown"
          id={this.props.id + '-list'}
          aria-hidden={!open}
          hidden={!open}
          style={open ? dropdownStyle : { visibility: 'hidden' }}
        >
          {includeFilter && (
            <Filter
              ref={filter => (this.filter = filter)}
              placeholder={filterPlaceholder}
              onFilterChange={this.filterDebounce}
            />
          )}
          {renderSelectAll ? (
            renderSelectAll({
              filtered: this.state.filtered,
              allSelected: this.state.allSelected,
              toggleSelectAll: this.toggleSelectAll,
              tabIndex,
              multiple,
              disabled,
            })
          ) : (
            <SelectAll
              visible={this.showSelectAll}
              tabIndex={tabIndex}
              disabled={disabled}
              allSelected={this.state.allSelected}
              id={this.props.id}
              selectAllText={this.props.selectAllText}
              toggleSelectAll={this.toggleSelectAll}
            />
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
  id: PropTypes.string.isRequired,
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
  caseSensitiveFilter: PropTypes.bool,
  buttonProps: PropTypes.object,
};

export default Picky;
