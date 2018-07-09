export default (str, term) =>
  String(str)
    .toLowerCase()
    .indexOf(String(term).toLowerCase()) > -1;
