import { OptionsType, OptionType, ComplexOptionType } from 'types';

export const isDataObject = (
  obj: OptionType | undefined,
  valueKey: string | undefined,
  labelKey: string | undefined
): boolean => {
  if (typeof labelKey === 'undefined' || typeof valueKey === 'undefined') {
    return false;
  }
  return (
    typeof obj === 'object' &&
    obj.hasOwnProperty(valueKey) &&
    obj.hasOwnProperty(labelKey)
  );
};

export const hasItem = (
  all: OptionsType | OptionType | undefined,
  item: OptionType,
  valueKey?: string,
  labelKey?: string,
  returnIndex: boolean = false
) => {
  if (!all || !item) return false;
  if (Array.isArray(all)) {
    if (isDataObject(item, valueKey, labelKey)) {
      const find = all.findIndex(
        opt =>
          (opt as ComplexOptionType)[valueKey!] ===
          (item as ComplexOptionType)[valueKey!]
      );
      if (returnIndex) {
        return find;
      }
      return find > -1;
    } else {
      const indexOfItem = all.indexOf(item);
      if (returnIndex) {
        return indexOfItem;
      }
      return indexOfItem > -1;
    }
  } else {
    if (isDataObject(item, valueKey, labelKey)) {
      return (
        (all as ComplexOptionType)[valueKey!] ===
        (item as ComplexOptionType)[valueKey!]
      );
    }
    return all === item;
  }
};

export const hasItemIndex = (
  all: OptionsType | OptionType,
  item: OptionType,
  valueKey?: string,
  labelKey?: string
): number => hasItem(all, item, valueKey, labelKey, true) as number;

export const keyExtractor = (
  item: OptionType,
  valueKey?: string,
  labelKey?: string
) =>
  isDataObject(item, valueKey, labelKey)
    ? (item as ComplexOptionType)[valueKey!]
    : item;
export const labelExtractor = (
  item: OptionType,
  valueKey?: string,
  labelKey?: string
) =>
  isDataObject(item, valueKey, labelKey)
    ? (item as ComplexOptionType)[labelKey!]
    : item;

export function sortCollection(array: any[], valueKey?: string): any[] {
  if (valueKey) {
    return array.sort((a, b) => (a[valueKey] < b[valueKey] ? -1 : 1));
  } else {
    return array.sort((a, b) => (a < b ? -1 : 1));
  }
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
