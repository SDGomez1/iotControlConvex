/**
 * Generates a formatted URL-friendly string by converting a given title into camelCase
 * and appending an identifier. This function transforms the input title into camelCase, where
 * the first word is in lowercase and subsequent words start with an uppercase letter. The
 * identifier is then appended to this camelCase string, separated by an underscore.
 *
 * @param {string} title - The title to be converted into camelCase.
 * @param {string} id - The identifier to be appended to the formatted title.
 * @returns {string} A string that combines the camelCase title and the identifier, suitable
 *          for use in URLs or other contexts where a concise, unique identifier is needed.
 *
 * @example
 * const urlTitle = formatUrl("Hello World", "123");
 * console.log(urlTitle);
 * // Output: "helloWorld_123"
 */

export function formatUrl(title: string, id: string) {
  const camelCaseTitle = title
    .toLowerCase()
    .split(" ")
    .map((word, index) => {
      if (index === 0) {
        return word;
      } else {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }
    })
    .join("");

  return `${camelCaseTitle}_${id}`;
}
/**
 * Extracts the identifier portion from a formatted URL string that has been created by the `formatUrl` function.
 * This function assumes the URL string is formatted with a title in camelCase followed by an underscore and
 * then an identifier. It returns the part of the string after the underscore, which represents the identifier.
 *
 * @param {string} url - The formatted URL string from which to extract the identifier.
 * @returns {string} The identifier extracted from the formatted URL string.
 *
 * @example
 * const identifier = deFormatUrl("helloWorld_123");
 * console.log(identifier);
 * // Output: "123"
 */
export function deFormatUrl(url: string) {
  return url.split("_")[1];
}
