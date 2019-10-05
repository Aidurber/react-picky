function split(str: string): string {
  let a: number = 1;
  let res: string = '';

  const parts = (str || '').split('%');
  const len: number = parts.length;

  if (len > 0) {
    res += parts[0];
  }

  for (let i = 1; i < len; i++) {
    if (parts[i][0] === 's' || parts[i][0] === 'd') {
      let value = arguments[a++];
      res += parts[i][0] === 'd' ? Math.floor(value) : value;
    } else if (parts[i][0]) {
      res += '%' + parts[i][0];
    } else {
      i++;
      res += '%' + parts[i][0];
    }

    res += parts[i].substring(1);
  }

  return res;
}

const regex = /%[sdj]/;

export function format(message: string, ...args: any[]) {
  if (regex.test(message)) {
    return split.apply(null, arguments as any);
  }
  return Array.from(args).join(' ');
}
