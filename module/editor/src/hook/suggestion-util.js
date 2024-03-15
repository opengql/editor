export const useSuggestionUtil = () => {
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

  const assemblySuggestionForWords = (word1, word2) => ({
    word: word2,
    accuracy: calculateAccuracy(word2, word1),
  });

  const getSimilarWords = (inputWord, wordsList) =>
    wordsList
      .map((word) => assemblySuggestionForWords(inputWord, word))
      .sort((a, b) => b.accuracy - a.accuracy)
      .filter((suggestion) => suggestion.accuracy > 0.75);

  return { getSimilarWords };
};
