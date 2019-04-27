declare module 'react-picky' {
  import * as React from 'react';
  export type PickyValue = any[] | string | number | Object;

  export type PickyTabIndex = string | number;

  /**
   * Properties returned from render
   *
   * @export
   * @interface RenderProps
   */
  export interface RenderProps {
    /**
     * Index of the item
     *
     * @type {number}
     * @memberof RenderProps
     */
    index: number;

    /**
     * Option to render
     *
     * @type {*}
     * @memberof RenderProps
     */
    item: any;

    /**
     * Is option selected
     *
     * @type {boolean}
     * @memberof RenderProps
     */
    isSelected: boolean;

    /**
     * Callback to select an option
     *
     * @memberof RenderProps
     */
    selectValue: (item: any) => void;

    /**
     * Used to determine the label of an option if options supplied are objects
     *
     * @type {string}
     * @memberof RenderProps
     */
    labelKey?: string;

    /**
     * Used to determine the value of an option if options supplied are objects
     *
     * @type {string}
     * @memberof RenderProps
     */
    valueKey?: string;

    /**
     * True if Picky allows multiple selection
     *
     * @type {boolean}
     * @memberof RenderProps
     */
    multiple?: boolean;
  }

  /**
   * Props provided to {renderSelectAll}
   *
   * @export
   * @interface RenderSelectAllProps
   */
  export interface RenderSelectAllProps {
    /**
     * True if the current options have been filtered.
     *
     * @type {boolean}
     * @memberof RenderSelectAllProps
     */
    filtered: boolean;

    /**
     * True of all items are selected
     *
     * @type {boolean}
     * @memberof RenderSelectAllProps
     */
    allSelected: boolean;

    /**
     * Used to trigger a select all
     *
     * @memberof RenderSelectAllProps
     */
    toggleSelectAll: () => void;

    /**
     * Tab index
     *
     * @type {PickyTabIndex}
     * @memberof RenderSelectAllProps
     */
    tabIndex: PickyTabIndex;

    /**
     * True if supplied to Picky component
     *
     * @type {boolean}
     * @memberof RenderSelectAllProps
     */
    multiple: boolean;
  }

  /**
   * Properties returned from renderList
   *
   * @export
   * @interface RenderListProps
   */
  export interface RenderListProps {
    /**
     * Array of options to render
     *
     * @type {any[]}
     * @memberof RenderListProps
     */
    items: any[];

    /**
     * Current selected value(s)
     *
     * @type {PickyValue}
     * @memberof RenderListProps
     */
    selected: PickyValue;

    /**
     *  True if Picky allows multiple selection
     *
     * @type {boolean}
     * @memberof RenderListProps
     */
    multiple?: boolean;

    /**
     * Utility function for determining whether an option is selected or not
     *
     * @memberof RenderListProps
     */
    getIsSelected: (item: any) => boolean;

    /**
     * Callback to select an option
     *
     * @memberof RenderListProps
     */
    selectValue: (item: any) => void;
  }

  /**
   * All supported props in React Picky
   *
   * @export
   * @interface PickyProps
   */
  export interface PickyProps {
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
    value?: PickyValue;

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
    onChange: (value: PickyValue) => any;

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
    tabIndex?: PickyTabIndex;

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
  }

  export default class Picky extends React.PureComponent<PickyProps, any> {
    render(): JSX.Element;
  }
}
