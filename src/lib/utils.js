export const isDataObject = (obj, valueKey, labelKey) => {
  return (
    typeof obj === 'object' &&
    obj.hasOwnProperty(valueKey) &&
    obj.hasOwnProperty(labelKey)
  );
};

export const generateGuid = () => {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return (
    s4() +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    s4() +
    s4()
  );
};

export const hasItem = (all, item, valueKey, labelKey) => {
  if (!all || !item) return false;
  if (Array.isArray(all)) {
    if (isDataObject(item, valueKey, labelKey)) {
      const find = all.filter(opt => opt['id'] === item['id']);
      return find.length > 0;
    } else {
      return all.indexOf(item) > -1;
    }
  } else {
    return all === item;
  }
};
