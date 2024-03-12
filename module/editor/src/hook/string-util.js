export const useStringUtil = () => {
  const isWhiteSpace = (char) => /[\s \r\n]/.test(char);

  const getLastWordByIndex = (input, startIndex) => {
    let word = '';
    let lastIndex = startIndex;

    for (let i = startIndex - 1; i >= 0; i--) {
      if (isWhiteSpace(input[i])) {
        break;
      }

      word = input[i] + word;
      lastIndex = i;
    }

    const wordData = {
      startIndex: lastIndex,
      length: startIndex - lastIndex,
    };

    return { word, wordData };
  };

  return { isWhiteSpace, getLastWordByIndex };
};
