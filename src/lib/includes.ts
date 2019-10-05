/**
 * Check if a string contains a value
 */
export function includes(
  str: string,
  term: string,
  caseSensitive: boolean = false
): boolean {
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
