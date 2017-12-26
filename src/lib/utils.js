export const isDataObject = (obj, valueKey, labelKey) => {
  return (
    typeof obj === 'object' &&
    obj.hasOwnProperty(valueKey) &&
    obj.hasOwnProperty(labelKey)
  );
};
