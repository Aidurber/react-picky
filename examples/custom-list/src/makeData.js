const genRange = (n = 10) => Array.from(Array(n).keys());

export const options = genRange(25).map(i => ({
  label: `Option ${i + 1}`,
  value: i + 1,
}));
