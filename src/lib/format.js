function split(str) {
  let a = 1;
  let res = '';

  var parts = str.split('%'),
    len = parts.length;

  if (len > 0) {
    res += parts[0];
  }

  for (let i = 1; i < len; i++) {
    if (parts[i][0] === 's' || parts[i][0] === 'd') {
      var value = arguments[a++];
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

function format(message) {
  if (regex.test(message)) return split.apply(null, arguments);
  return Array.from(arguments).join(' ');
}

export default format;
