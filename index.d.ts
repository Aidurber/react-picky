declare module 'react-picky' {
  export type PickyValue = any[] | string | number | Object;

  export type PickyTabIndex = string | number;

  export interface PickyProps {
    onChange: (...args: any[]) => any;
    onFiltered?: (...args: any[]) => any;
    onOpen?: (...args: any[]) => any;
    onClose?: (...args: any[]) => any;
    options: any[];
    placeholder?: string;
    value?: PickyValue;
    numberDisplayed?: number;
    multiple?: boolean;
    open?: boolean;
    includeSelectAll?: boolean;
    includeFilter?: boolean;
    filterDebounce?: number;
    dropdownHeight?: number;
    valueKey?: string;
    labelKey?: string;
    render?: (...args: any[]) => any;
    itemHeight?: number;
    tabIndex?: PickyTabIndex;
    keepOpen?: boolean;
  }

  export default class Picky extends React.PureComponent<PickyProps, any> {
    render(): JSX.Element;
  }
}
