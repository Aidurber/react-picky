import * as React from 'react';
import { debounce } from './lib/debounce';
import { includes } from './lib/includes';
import {
  isDataObject,
  hasItem,
  keyExtractor,
  hasItemIndex,
  sortCollection,
  arraysEqual,
  asArray,
} from './lib/utils';
import { Placeholder } from './Placeholder';
import { Filter } from './Filter';
import { Option } from './Option';
import './Picky.css';
import { SelectAll } from './SelectAll';
import { Button } from './Button';
import {
  RenderListProps,
  SelectAllMode,
  RenderSelectAllProps,
  RenderProps,
  OptionsType,
  OptionType,
  ComplexOptionType,
  SelectionState,
} from './types';

type PickyState = {
  selectedValue: OptionsType | OptionType | null;
  open?: boolean;
  filtered?: boolean;
  filteredOptions: OptionsType;
  allSelected: SelectionState;
};

type PickyProps = {
  /**
   * The ID for the component, used for accessibility
   *
   * @type {string}
   * @memberof PickyProps
   */
  id: string;
  /**
   * Default placeholder text
   *
   * @type {string}
   * @memberof PickyProps
   */
  placeholder?: string;

  /**
   * The value of the Picky.
   * Picky is a controlled component so use this in conjunction with onChange and update the value accordingly
   *
   * @type {PickyValue}
   * @memberof PickyProps
   */
  value?: OptionsType | OptionType;

  /**
   * The number of items to be displayed before the placeholder turns to "5 selected"
   *
   * @type {number} [3]
   * @memberof PickyProps
   */
  numberDisplayed?: number;

  /**
   * True if multiple options can be selected
   *
   * @type {boolean}
   * @memberof PickyProps
   */
  multiple?: boolean;

  /**
   * Options for the Picky component either [1, 2, 3] or [{label: "1", value: 1}] in conjunction with valueKey and labelKey props
   *
   * @type {any[]} [[]]
   * @memberof PickyProps
   */
  options: any[];

  /**
   * Called when the selected value changes, use this to re-set the value prop
   *
   * @memberof PickyProps
   */
  onChange: (value: OptionsType | OptionType) => any;

  /**
   * Used to control whether the Picky is open by default
   *
   * @type {boolean}
   * @memberof PickyProps
   */
  open?: boolean;

  /**
   * True if you want a select all option at the top of the dropdown.
   * Won't appear if multiple is false
   *
   * @type {boolean}
   * @memberof PickyProps
   */
  includeSelectAll?: boolean;

  /**
   * True if you want a filter input at the top of the dropdown, used to filter items.
   *
   * @type {boolean}
   * @memberof PickyProps
   */
  includeFilter?: boolean;

  /**
   * Used to debounce onFilterChange events. Set value to zero to disable debounce. Duration is in milliseconds.
   *
   * @type {number} [300]
   * @memberof PickyProps
   */
  filterDebounce?: number;

  /**
   * The max height of the dropdown, height is in px.
   *
   * @type {number} [300]
   * @memberof PickyProps
   */
  dropdownHeight?: number;

  /**
   * Callback when options have been filtered.
   *
   * @memberof PickyProps
   */
  onFiltered?: (filteredOptions: any[]) => any;

  /**
   * Called when dropdown is opened
   *
   * @memberof PickyProps
   */
  onOpen?: () => any;

  /**
   * Called when dropdown is closed
   *
   * @memberof PickyProps
   */
  onClose?: () => any;

  /**
   *  Indicates which key is the value in an object. Used when supplied options are objects.
   *
   * @type {string}
   * @memberof PickyProps
   */
  valueKey?: string;
  /**
   *  Indicates which key is the label in an object. Used when supplied options are objects.
   *
   * @type {string}
   * @memberof PickyProps
   */
  labelKey?: string;

  /**
   * Render prop for individual options
   *
   * @memberof PickyProps
   */
  render?: (props: RenderProps) => any;

  /**
   * Tab index for accessibility
   *
   * @type {PickyTabIndex} [0]
   * @memberof PickyProps
   */
  tabIndex?: number | undefined;

  /**
   * True if the dropdown should be permanently open.
   *
   * @type {boolean}
   * @memberof PickyProps
   */
  keepOpen?: boolean;

  /**
   * The placeholder when the number of items are higher than {numberDisplayed} and all aren't selected.
   * Default "%s selected" where %s is the number of items selected.
   *
   * @type {string} ["%s selected"]
   * @memberof PickyProps
   */
  manySelectedPlaceholder?: string;

  /**
   * Default "%s selected" where %s is the number of items selected. This gets used when all options are selected.
   *
   * @type {string} ["%s selected"]
   * @memberof PickyProps
   */
  allSelectedPlaceholder?: string;

  /**
   * Default select all text
   *
   * @type {string} ["Select all"]
   * @memberof PickyProps
   */
  selectAllText?: string;

  /**
   * Render prop for rendering a custom select all component
   *
   * @memberof PickyProps
   */
  renderSelectAll?: (props: RenderSelectAllProps) => any;

  /**
   * If set to true, will focus the filter by default when opened.
   *
   * @type {boolean}
   * @memberof PickyProps
   */
  defaultFocusFilter?: boolean;

  /**
   * Used to supply a class to the root picky component. Helps when using Picky with a CSS-in-JS library like styled-components
   *
   * @type {string}
   * @memberof PickyProps
   */
  className?: string;

  /**
   * Render prop for whole list, you can use this to add virtualization/windowing if necessary.
   *
   * @memberof PickyProps
   */
  renderList?: (props: RenderListProps) => any;

  /**
   * Override the placeholder of the filter
   *
   * @type {string}
   * @memberof PickyProps
   */
  filterPlaceholder?: string;
  /**
   * Will provide the input value of filter to the picky dropdown, so that if we have a larger list of options then we can only supply the matching options based on this value.
   */
  getFilterValue?: (term: string) => any;
  /**
   *  If true options will be returned when they match case, defaults to false
   */
  caseSensitiveFilter?: boolean;

  /**
   * Pass additional props the the button component
   *
   * @type {React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>}
   * @memberof PickyProps
   */
  buttonProps?: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >;

  /**
   * True if you want a disabled Picky
   */
  disabled?: boolean;

  /**
   * Allows for additional functionalty with select all and filtering, see the docs.
   */
  selectAllMode?: SelectAllMode;
  /**
   * When true the filter input will be cleared when the dropdown is closed
   *
   * @type {boolean}
   */
  clearFilterOnClose?: boolean;
  /**
   * A string function which takes the filter term and returns a new filter term.
   *
   * Useful for trimming the filter term.
   *
   * @type {StringFunc}
   */
  filterTermProcessor?: (term: string) => string;
};

class Picky extends React.PureComponent<PickyProps, PickyState> {
  static defaultProps = {
    id: 'picky',
    numberDisplayed: 3,
    options: [],
    filterDebounce: 150,
    dropdownHeight: 300,
    onChange: () => {},
    tabIndex: 0,
    keepOpen: true,
    selectAllText: 'Select all',
    selectAllMode: 'default',
    filterTermProcessor: (term: string) => term,
  };
  node: HTMLDivElement | null = null;
  filter: HTMLInputElement | null = null;
  constructor(props: PickyProps) {
    super(props);
    this.state = {
      selectedValue: props.value || (props.multiple ? [] : null),
      open: props.open,
      filtered: false,
      filteredOptions: [],
      allSelected: 'none',
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
    this.focusFilterInput(!!this.state.open);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleOutsideClick, false);
  }

  UNSAFE_componentWillReceiveProps(nextProps: PickyProps) {
    if (
      this.props.options !== nextProps.options ||
      this.props.value !== nextProps.value
    ) {
      let valuesEqual = Array.isArray(nextProps.value)
        ? arraysEqual(nextProps.value, this.props.value as OptionsType)
        : nextProps.value === this.props.value;

      let optsEqual = arraysEqual(nextProps.options, this.props.options);
      const currentOptions = this.state.filtered
        ? this.state.filteredOptions
        : nextProps.options;
      const currentValues = this.state.filtered
        ? this.state.filteredOptions.filter(value => {
            if (Array.isArray(nextProps.value)) {
              return nextProps.value.includes(value);
            }
            return true;
          })
        : nextProps.value;
      this.setState({
        allSelected: !(valuesEqual && optsEqual)
          ? // FIXME
            //@ts-ignore
            this.allSelected(currentValues, currentOptions)
          : this.allSelected(),
      });
    }
  }

  selectValue(val: string | number) {
    const valueLookup = this.props.value;
    if (this.props.multiple && Array.isArray(valueLookup)) {
      const itemIndex = hasItemIndex(
        valueLookup,
        val,
        this.props.valueKey,
        this.props.labelKey
      );

      let selectedValue: OptionsType = [];
      if (itemIndex > -1) {
        selectedValue = [
          ...valueLookup.slice(0, itemIndex),
          ...valueLookup.slice(itemIndex + 1),
        ];
      } else {
        selectedValue = [...(this.props.value as OptionsType), val];
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
  getValue(option: OptionType) {
    return typeof this.props.valueKey !== 'undefined'
      ? (option as ComplexOptionType)[this.props.valueKey]
      : option;
  }
  /**
   * Determine whether all items are selected
   *
   * @returns {Boolean}
   * @memberof Picky
   */
  allSelected(
    overrideSelected?: any[],
    overrideOptions?: any[]
  ): SelectionState {
    const { value, options } = this.props;
    const selectedValue = overrideSelected || value;
    const selectedOptions = overrideOptions || options;

    // If there are no options we are getting a false positive for all items being selected
    if (selectedOptions && selectedOptions.length === 0) {
      return 'none';
    }
    let copiedOptions = selectedOptions.map(this.getValue);
    let copiedValues = Array.isArray(selectedValue)
      ? selectedValue.map(this.getValue)
      : [];

    const areEqual = arraysEqual(
      sortCollection(copiedValues),
      sortCollection(copiedOptions)
    );
    if (areEqual) {
      return 'all';
    } else if (copiedValues.length > 0) {
      return 'partial';
    } else {
      return 'none';
    }
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
          allSelected: this.state.allSelected === 'all' ? 'none' : 'all',
        };
      },
      () => {
        if (this.state.allSelected !== 'all') {
          if (this.state.filtered) {
            const diff = asArray(this.props.value).filter(
              item => !this.state.filteredOptions.includes(item)
            );
            this.props.onChange(diff);
          } else {
            this.props.onChange([]);
          }
        } else {
          if (this.state.filtered) {
            let newValues = [
              ...(this.props.value as any[]),
              ...this.state.filteredOptions,
            ];
            this.props.onChange(newValues);
          } else {
            this.props.onChange(this.props.options);
          }
        }
      }
    );
  }

  isItemSelected(item: OptionType): boolean {
    return hasItem(
      this.props.value,
      item,
      this.props.valueKey,
      this.props.labelKey
    ) as boolean;
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
            multiple={Boolean(multiple)}
            tabIndex={tabIndex}
            disabled={Boolean(disabled)}
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
  onFilterChange(term: string) {
    const processedTerm =
      typeof this.props.filterTermProcessor === 'function'
        ? this.props.filterTermProcessor(term)
        : term;

    /**
     * getFilterValue function will provide the input value of filter to the picky dropdown, so that if we have a larger list of options then we can only supply the matching options based on this value
     */
    if (this.props.getFilterValue) {
      this.props.getFilterValue(processedTerm);
    }
    if (!processedTerm.trim()) {
      return this.setState({
        filtered: false,
        filteredOptions: [],
        allSelected: asArray(this.props.value).length > 0 ? 'partial' : 'none',
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
          option[this.props.labelKey!],
          processedTerm,
          !!this.props.caseSensitiveFilter
        );
      }
      return includes(option, processedTerm, this.props.caseSensitiveFilter);
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
  handleOutsideClick(e: any) {
    // If keep open then don't toggle dropdown
    // If radio and not keepOpen then auto close it on selecting a value
    // If radio and click to the filter input then don't toggle dropdown
    const keepOpen = this.props.keepOpen || this.props.multiple;
    if (this.node && this.node.contains(e.target) && keepOpen) {
      return;
    }
    if (this.filter && this.filter.contains(e.target)) {
      return;
    }
    this.toggleDropDown();
  }

  focusFilterInput(isOpen: boolean) {
    if (!this.filter) return;
    if (isOpen && this.props.defaultFocusFilter) {
      this.filter.focus();
    }
    if (!isOpen && this.props.clearFilterOnClose === true) {
      this.filter.value = '';
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
          filtered: this.props.clearFilterOnClose ? false : state.filtered,
          filteredOptions: this.props.clearFilterOnClose
            ? []
            : state.filteredOptions,
        };
      },
      () => {
        const isOpen = !!this.state.open;
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
    const amount = filterDebounce || 0;
    return (amount || 0) > 0
      ? debounce(this.onFilterChange, amount)
      : this.onFilterChange;
  }

  get showSelectAll(): boolean {
    const { renderSelectAll, multiple, includeSelectAll } = this.props;
    return Boolean(
      !renderSelectAll &&
        includeSelectAll &&
        multiple &&
        ((this.props.selectAllMode === 'default' && !this.state.filtered) ||
          this.props.selectAllMode === 'filtered')
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
    const dropdownStyle: React.CSSProperties = {
      maxHeight: dropdownHeight,
      overflowY: 'scroll',
    };
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
            multiple={Boolean(multiple)}
            numberDisplayed={numberDisplayed!}
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
              tabIndex={tabIndex}
              ref={filter => (this.filter = filter)}
              placeholder={filterPlaceholder}
              onFilterChange={this.filterDebounce}
            />
          )}
          {renderSelectAll ? (
            renderSelectAll({
              filtered: Boolean(this.state.filtered),
              allSelected: this.state.allSelected,
              toggleSelectAll: this.toggleSelectAll,
              tabIndex,
              multiple: Boolean(multiple),
              disabled: Boolean(disabled),
            })
          ) : (
            <SelectAll
              visible={this.showSelectAll}
              tabIndex={tabIndex}
              disabled={!!disabled}
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

export { Picky };
