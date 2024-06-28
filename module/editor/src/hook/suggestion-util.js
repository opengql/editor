export const useSuggestionUtil = () => {
  /***
   * Method that returns the accuracy score of two strings.
   *
   * @param {string} word1
   * @param {string} word2
   * @returns {number}
   */
  const calculateAccuracy = (word1, word2) => {
    const word1Upper = word1.toUpperCase();
    const word2Upper = word2.toUpperCase();

    if (word1.length > word2.length && word1Upper.startsWith(word2Upper)) {
      return (word2.length / word1.length) * 2;
    }

    const set1 = new Set(word1Upper);
    const set2 = new Set(word2Upper);
    const intersection = new Set([...set1].filter((char) => set2.has(char)));
    const union = new Set([...set1, ...set2]);
    return intersection.size / union.size;
  };

  /***
   * Method that returns the accuracy of the word and target word that accuracy was estimated for.
   *
   * @param {string} word1
   * @param {string} word2
   * @returns {{accuracy: number, word: string}}
   */
  const assemblySuggestionForWords = (word1, word2) => ({
    word: word2,
    accuracy: calculateAccuracy(word2, word1),
  });

  /***
   * Method that returns the list of similar words with accuracy rate.
   *
   * @param {string} inputWord
   * @param {string[]} wordsList
   * @returns {{accuracy: number, word: string}[]}
   */
  const getSimilarWords = (inputWord, wordsList) =>
    (wordsList ?? [])
      .map((word) => assemblySuggestionForWords(inputWord, word))
      .sort((a, b) => b.accuracy - a.accuracy)
      .filter((suggestion) => suggestion.accuracy > 0.75);

  return { getSimilarWords };
};
