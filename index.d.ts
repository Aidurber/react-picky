declare module 'react-picky' {
  export type PickyValue = any[] | string | number | Object;

  export type PickyTabIndex = string | number;

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
    render?: (...args: any[]) => any;
    tabIndex?: PickyTabIndex;
    keepOpen?: boolean;
    manySelectedPlaceholder?: string;
    allSelectedPlaceholder?: string;
    selectAllText?: string;
    renderSelectAll: (...args: any[]) => any;
    defaultFocusFilter?: boolean;
    className?: string;
  }

  export default class Picky extends React.PureComponent<PickyProps, any> {
    render(): JSX.Element;
  }
}
