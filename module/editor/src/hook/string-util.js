/***
 * Hook that provides methods usable to manipulate strings.
 *
 * @returns {{getInputWordDataFromSelectionStart: (function(string, number): {word: string, wordData: {startIndex: number, length: number}}), isWhiteSpace: (function(string): boolean)}}
 */
export const useStringUtil = () => {
  /***
   * Method that verifies is provided char a whitespace.
   *
   * @param {string} char
   * @returns {boolean}
   */
  const isWhiteSpace = (char) => /[\s \r\n]/.test(char);

  /***
   * Method that
   *
   * @param {string} input
   * @param {number} selectionStartIndex
   * @returns {{word: string, wordData: {startIndex: number, length: number}}}
   */
  const getInputWordDataFromSelectionStart = (input, selectionStartIndex) => {
    let word = '';
    let lastIndex = selectionStartIndex;

    for (let i = selectionStartIndex - 1; i >= 0; i--) {
      if (isWhiteSpace(input[i])) {
        break;
      }

      word = input[i] + word;
      lastIndex = i;
    }

    const wordData = {
      startIndex: lastIndex,
      length: selectionStartIndex - lastIndex,
    };

    return { word, wordData };
  };

  return { isWhiteSpace, getInputWordDataFromSelectionStart };
};
