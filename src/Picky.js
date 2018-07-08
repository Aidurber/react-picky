import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import includes from 'lodash.includes';

import {
  CellMeasurer,
  CellMeasurerCache,
  List,
  AutoSizer
} from 'react-virtualized';

import {
  isDataObject,
  generateGuid,
  hasItem,
  keyExtractor,
  hasItemIndex
} from './lib/utils';
import isEqual from 'lodash.isequal';
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
      allSelected: false
    };
    this.cellMeasurerCache = new CellMeasurerCache({
      defaultHeight: props.itemHeight || 35,
      fixedWidth: true
    });
    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.toggleSelectAll = this.toggleSelectAll.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);
    this.selectValue = this.selectValue.bind(this);
    this.allSelected = this.allSelected.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.isItemSelected = this.isItemSelected.bind(this);
    this.focusFilterInput = this.focusFilterInput.bind(this);
  }
  componentWillMount() {
    const allSelected = this.allSelected();

    this.setState({
      allSelected
    });
  }

  componentDidMount() {
    this.focusFilterInput(this.state.open);
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
    if (!isEqual(nextProps.value, this.state.selectedValue)) {
      this.setState({
        selectedValue: nextProps.value,
        allSelected: this.allSelected(nextProps.value)
      });
    }
  }

  selectValue(val) {
    const valueLookup = this.isControlled()
      ? this.props.value
      : this.state.selectedValue;

    if (this.props.multiple && Array.isArray(valueLookup)) {
      const itemIndex = hasItemIndex(
        valueLookup,
        val,
        this.props.valueKey,
        this.props.labelKey
      );
      if (itemIndex > -1) {
        // Remove
        this.setState(
          {
            selectedValue: [
              ...valueLookup.slice(0, itemIndex),
              ...valueLookup.slice(itemIndex + 1)
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

  /**
   * Determine whether all items are selected
   *
   * @returns {Boolean}
   * @memberof Picky
   */
  allSelected(overrideSelected) {
    const selectedValue = overrideSelected || this.state.selectedValue;
    const { options } = this.props;
    const copiedOptions = options.slice(0);
    const copiedSelectedValue = Array.isArray(selectedValue)
      ? selectedValue.slice(0)
      : [];
    return isEqual(copiedOptions, copiedSelectedValue);
  }

  /**
   * Toggles select all
   *
   * @memberof Picky
   */
  toggleSelectAll() {
    this.setState(
      {
        selectedValue: !this.state.allSelected ? this.props.options : [],
        allSelected: !this.state.allSelected
      },
      () => {
        // Call onChange prop with new values
        this.props.onChange(this.state.selectedValue);
      }
    );
  }
  /**
   * Determine whether the user is treating this as a controlled component or not.
   *
   * @returns
   * @memberof Picky
   */
  isControlled() {
    return this.props.value != null;
  }

  isItemSelected(item) {
    const value = this.isControlled()
      ? this.props.value
      : this.state.selectedValue;
    return hasItem(value, item, this.props.labelKey, this.props.valueKey);
  }
  /**
   * Render virtual list
   *
   * @param {any} items
   * @returns
   * @memberof Picky
   */
  renderVirtualList(items) {
    return (
      <AutoSizer>
        {({ width, height }) => {
          let actualWidth = width;
          // Used to reduce warning when in test env.
          if (process.env.NODE_ENV === 'test') {
            actualWidth = window.innerWidth;
          }
          return (
            <List
              defaultHeight={height}
              height={this.props.dropdownHeight || 300}
              width={actualWidth}
              rowCount={items.length}
              rowHeight={this.cellMeasurerCache.rowHeight}
              rowRenderer={({ index, key, parent, style }) => {
                const item = items[index];

                const isSelected = this.isItemSelected(item);

                return (
                  <CellMeasurer
                    cache={this.cellMeasurerCache}
                    columnIndex={0}
                    key={key}
                    parent={parent}
                    rowIndex={index}
                  >
                    {this.props.render ? (
                      this.props.render({
                        index,
                        style,
                        item,
                        isSelected,
                        selectValue: this.selectValue,
                        labelKey: this.props.labelKey,
                        valueKey: this.props.valueKey,
                        multiple: this.props.multiple
                      })
                    ) : (
                      <Option
                        key={key}
                        style={style}
                        item={item}
                        isSelected={isSelected}
                        selectValue={this.selectValue}
                        labelKey={this.props.labelKey}
                        valueKey={this.props.valueKey}
                        multiple={this.props.multiple}
                        tabIndex={this.props.tabIndex}
                        id={this.state.id + '-option-' + index}
                      />
                    )}
                  </CellMeasurer>
                );
              }}
            />
          );
        }}
      </AutoSizer>
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
    return items.map((item, index) => {
      // Create a key based on the options value
      const key = keyExtractor(item, this.props.valueKey, this.props.labelKey);

      const isSelected = this.isItemSelected(item);
      // If render prop supplied for items call that.
      if (typeof this.props.render === 'function') {
        return this.props.render({
          index,
          style: {},
          item,
          isSelected,
          selectValue: this.selectValue,
          labelKey: this.props.labelKey,
          valueKey: this.props.valueKey,
          multiple: this.props.multiple
        });
      } else {
        // Render a simple option
        return (
          <Option
            key={key}
            item={item}
            isSelected={isSelected}
            selectValue={this.selectValue}
            labelKey={this.props.labelKey}
            valueKey={this.props.valueKey}
            multiple={this.props.multiple}
            tabIndex={this.props.tabIndex}
            id={this.state.id + '-option-' + index}
          />
        );
      }
    });
  }
  renderOptions() {
    const { options, virtual } = this.props;
    const items = this.state.filtered ? this.state.filteredOptions : options;

    if (virtual) {
      return this.renderVirtualList(items);
    } else {
      return this.renderPlainList(items);
    }
  }
  /**
   * Called when Filter term changes. Sets filteredOptions and filtered state.
   *
   * @param {any} term
   * @returns
   * @memberof Picky
   */
  onFilterChange(term) {
    if (!term.trim()) {
      return this.setState({
        filtered: false,
        filteredOptions: []
      });
    }
    const filteredOptions = this.props.options.filter(option => {
      if (isDataObject(option, this.props.labelKey, this.props.valueKey)) {
        return includes(
          String(option[this.props.labelKey]).toLowerCase(),
          term.toLowerCase()
        );
      }
      return includes(String(option).toLowerCase(), term.toLowerCase());
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
    const keepOpen = this.props.keepOpen || this.props.multiple;
    if (this.node && this.node.contains(e.target) && keepOpen) {
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
      {
        // Toggle open state
        open: !this.state.open
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
      renderSelectAll
    } = this.props;
    const { open } = this.state;
    let ariaOwns = '';
    if (open) {
      ariaOwns += this.state.id + '-list';
    }

    let dropdownStyle = {};
    if (!this.props.virtual) {
      dropdownStyle = { maxHeight: dropdownHeight, overflowY: 'scroll' };
    }
    return (
      <div
        ref={node => {
          this.node = node;
        }}
        className={['picky', className].join(' ')}
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
          data-test="picky-input"
          onClick={this.toggleDropDown}
        >
          <Placeholder
            allSelected={this.state.allSelected}
            placeholder={placeholder}
            manySelectedPlaceholder={this.props.manySelectedPlaceholder}
            allSelectedPlaceholder={this.props.allSelectedPlaceholder}
            value={this.isControlled() ? value : this.state.selectedValue}
            multiple={multiple}
            numberDisplayed={numberDisplayed}
            valueKey={valueKey}
            labelKey={labelKey}
          />
        </button>
        {open && (
          <div
            className="picky__dropdown"
            data-test="dropdown"
            id={this.state.id + '-list'}
            style={dropdownStyle}
          >
            {includeFilter && (
              <Filter
                ref={filter => (this.filter = filter)}
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
                multiple
              })}
            {!renderSelectAll &&
              includeSelectAll &&
              multiple &&
              !this.state.filtered && (
                <div
                  tabIndex={tabIndex}
                  role="option"
                  data-test="selectall"
                  id={this.state.id + '-option-' + 'selectall'}
                  data-selectall="true"
                  aria-selected={this.state.allSelected}
                  className={
                    this.state.allSelected ? 'option selected' : 'option'
                  }
                  onClick={this.toggleSelectAll}
                  onKeyPress={this.toggleSelectAll}
                >
                  <input
                    type="checkbox"
                    readOnly
                    onClick={this.toggleSelectAll}
                    tabIndex={-1}
                    checked={this.state.allSelected}
                    aria-label="select all"
                  />
                  <span data-test="select-all-text">
                    {this.props.selectAllText}
                  </span>
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
  keepOpen: true,
  virtual: true,
  selectAllText: 'Select all'
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
  keepOpen: PropTypes.bool,
  virtual: PropTypes.bool,
  manySelectedPlaceholder: PropTypes.string,
  allSelectedPlaceholder: PropTypes.string,
  selectAllText: PropTypes.string,
  renderSelectAll: PropTypes.func,
  defaultFocusFilter: PropTypes.bool,
  className: PropTypes.string
};

export default Picky;
