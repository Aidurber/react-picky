export type SimpleOptionType = string | number;
export type ComplexOptionType<T = any> = { [key in Partial<keyof T>]: any };
export type OptionType<T = any> = T extends string
  ? SimpleOptionType
  : T extends number
  ? SimpleOptionType
  : ComplexOptionType<T>;
export type OptionsType<T = any> = OptionType<T>[];

export type SelectAllMode = 'default' | 'filtered';
/**
 * Properties returned from render
 *
 * @export
 * @interface RenderProps
 */
export interface RenderProps<TOptionType = any> {
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
   *  Indicates which key is the value in an object. Used when supplied options are objects.
   *
   * @type {string}
   * @memberof PickyProps
   */
  getValue: (item: OptionType<TOptionType>) => any;
  /**
   *  Indicates which key is the label in an object. Used when supplied options are objects.
   *
   * @type {string}
   * @memberof PickyProps
   */
  getLabel: (item: OptionType<TOptionType>) => any;

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
