/**
 * Check if a string contains a value
 */
function includes(str, term, caseSensitive) {
  if (!caseSensitive) {
    return (
      String(str)
        .toLowerCase()
        .indexOf(String(term).toLowerCase()) > -1
    );
  } else {
    return String(str).indexOf(String(term)) > -1;
  }
}

export default includes;
