export const useStringUtil = () => {
  const isWhiteSpace = (char) => /[\s \r\n]/.test(char);

  const getLastWordByIndex = (input, selectionStartIndex) => {
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

  return { isWhiteSpace, getInputWordDataFromSelectionStart: getLastWordByIndex };
};
