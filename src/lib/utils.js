export const isDataObject = (obj, valueKey, labelKey) => {
  return (
    typeof obj === 'object' &&
    obj.hasOwnProperty(valueKey) &&
    obj.hasOwnProperty(labelKey)
  );
};

export const hasItem = (all, item, valueKey, labelKey, returnIndex) => {
  if (!all || !item) return false;
  if (Array.isArray(all)) {
    if (isDataObject(item, valueKey, labelKey)) {
      const find = all.findIndex(opt => opt[valueKey] === item[valueKey]);
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
      return all[valueKey] === item[valueKey];
    }
    return all === item;
  }
};

export const hasItemIndex = (all, item, valueKey, labelKey) =>
  hasItem(all, item, valueKey, labelKey, true);

export const keyExtractor = (item, valueKey, labelKey) =>
  isDataObject(item, valueKey, labelKey) ? item[valueKey] : item;
export const labelExtractor = (item, valueKey, labelKey) =>
  isDataObject(item, valueKey, labelKey) ? item[labelKey] : item;

export const sortCollection = (array, valueKey) => {
  if (valueKey) {
    return array.sort((a, b) => a[valueKey] < b[valueKey] ? -1 : 1);
  } else {
    return array.sort((a, b) => a < b ? -1 : 1);
  }
};

export function arraysEqual(left, right) {
  if (left.length !== right.length) return false;
  const leftLen = left.length;
  let i = leftLen;
  while (i) {
    if (left[i] !== right[i]) return false;
    i--;
  }
  return true;
}
