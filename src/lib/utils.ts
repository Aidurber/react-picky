import { OptionsType, OptionType } from 'types';
export function hasItem<T = any>(
  all: OptionsType<T> | OptionType<T> | undefined,
  item: OptionType<T>,
  getValue: (opt: OptionType<T>) => any,
  returnIndex: boolean = false
) {
  if (!all || !item) return false;
  if (Array.isArray(all)) {
    const itemValue = getValue(item);
    const find = all.findIndex(opt => getValue(opt) === itemValue);
    if (returnIndex) {
      return find;
    }
    return find > -1;
  } else {
    return getValue(all) === getValue(item);
  }
}

export function hasItemIndex<T = any>(
  all: OptionsType<T> | OptionType<T>,
  item: OptionType<T>,
  getValue: (opt: OptionType<T>) => any
): number {
  return hasItem(all, item, getValue, true) as number;
}

export function sortCollection(array: any[]): any[] {
  return array.sort((a, b) => (a < b ? -1 : 1));
}

export function arraysEqual(left: any[], right: any[]): boolean {
  if (left.length !== right.length) return false;
  const leftLen = left.length;
  let i = leftLen;
  while (i) {
    if (left[i] !== right[i]) return false;
    i--;
  }
  return true;
}
