declare module 'react-picky' {
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
    placeholder?: string;
    value?: PickyValue;
    numberDisplayed?: number;
    multiple?: boolean;
    options: any[];
    onChange: (...args: any[]) => any;
    open?: boolean;
    includeSelectAll?: boolean;
    includeFilter?: boolean;
    filterDebounce?: number;
    dropdownHeight?: number;
    onFiltered?: (...args: any[]) => any;
    onOpen?: (...args: any[]) => any;
    onClose?: (...args: any[]) => any;
    valueKey?: string;
    labelKey?: string;
    render?: (props: RenderProps) => any;
    tabIndex?: PickyTabIndex;
    keepOpen?: boolean;
    manySelectedPlaceholder?: string;
    allSelectedPlaceholder?: string;
    selectAllText?: string;
    renderSelectAll: (...args: any[]) => any;
    defaultFocusFilter?: boolean;
    className?: string;
    renderList?: (props: RenderListProps) => any;
  }

  export default class Picky extends React.PureComponent<PickyProps, any> {
    render(): JSX.Element;
  }
}
