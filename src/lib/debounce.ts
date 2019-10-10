export const debounce = (fn: Function, delay: number) => {
  let timeoutID: NodeJS.Timer | null = null;
  return function(...args: any[]) {
    if (timeoutID) {
      clearTimeout(timeoutID);
    }
    //@ts-ignore
    const that: any = this as any;
    timeoutID = setTimeout(() => {
      fn.apply(that, args);
    }, delay);
  };
};
