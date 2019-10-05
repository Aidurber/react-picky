export type SimpleOptionType = string | number;
export type ComplexOptionType = { [key: string]: any };
export type OptionType<T = any> = T extends string
  ? SimpleOptionType
  : T extends number
  ? SimpleOptionType
  : ComplexOptionType;
export type OptionsType = OptionType[];

export type SelectAllMode = 'default' | 'filtered';
/**
 * Properties returned from render
 *
 * @export
 * @interface RenderProps
 */
export interface RenderProps {
  disabled?: boolean;
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
  tabIndex: number | undefined;

  /**
   * True if supplied to Picky component
   *
   * @type {boolean}
   * @memberof RenderSelectAllProps
   */
  multiple: boolean;
  disabled?: boolean;
}

/**
 * Properties returned from renderList
 *
 * @export
 * @interface RenderListProps
 */
export interface RenderListProps {
  disabled?: boolean;
  tabIndex: number | undefined;
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
  selected: OptionsType | OptionType | undefined;

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
