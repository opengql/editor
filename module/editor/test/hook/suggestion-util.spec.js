import { useSuggestionUtil } from '../../src/hook/suggestion-util';

describe('useSuggestionUtil', () => {
  describe('getSimilarWords', () => {
    it('should return similar words with high accuracy', () => {
      const { getSimilarWords } = useSuggestionUtil();
      const inputWord = 'apple';
      const wordsList = ['apricot', 'application', 'applesauce', 'banana'];

      const similarWords = getSimilarWords(inputWord, wordsList);

      expect(similarWords).toEqual([{ word: 'applesauce', accuracy: 1 }]);
    });

    it('should handle empty words list', () => {
      const { getSimilarWords } = useSuggestionUtil();
      const inputWord = 'apple';
      const wordsList = [];

      const similarWords = getSimilarWords(inputWord, wordsList);

      expect(similarWords).toEqual([]);
    });

    it('should handle no similar words', () => {
      const { getSimilarWords } = useSuggestionUtil();
      const inputWord = 'apple';
      const wordsList = ['banana', 'cherry', 'grape'];

      const similarWords = getSimilarWords(inputWord, wordsList);

      expect(similarWords).toEqual([]);
    });

    it('should handle words with lower accuracy', () => {
      const { getSimilarWords } = useSuggestionUtil();
      const inputWord = 'apple';
      const wordsList = ['applause', 'apricot', 'application', 'applesauce', 'banana'];

      const similarWords = getSimilarWords(inputWord, wordsList);

      expect(similarWords).toEqual([{ word: 'applesauce', accuracy: 1 }]);
    });
  });
});
