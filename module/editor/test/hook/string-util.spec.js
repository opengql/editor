import { useStringUtil } from '$editor/hook/string-util';

describe('useStringUtil', () => {
  describe('isWhiteSpace', () => {
    it('should return true for whitespace characters', () => {
      const { isWhiteSpace } = useStringUtil();

      expect(isWhiteSpace(' ')).toBe(true);
      expect(isWhiteSpace('\t')).toBe(true);
      expect(isWhiteSpace('\n')).toBe(true);
      expect(isWhiteSpace('\r')).toBe(true);
    });

    it('should return false for non-whitespace characters', () => {
      const { isWhiteSpace } = useStringUtil();

      expect(isWhiteSpace('a')).toBe(false);
      expect(isWhiteSpace('1')).toBe(false);
      expect(isWhiteSpace('')).toBe(false);
    });
  });

  describe('getLastWordByIndex', () => {
    it('should return the last word and its data by index', () => {
      const { getInputWordDataFromSelectionStart } = useStringUtil();
      const input = 'This is a test.';
      const index = input.length - 1;

      const { word, wordData } = getInputWordDataFromSelectionStart(input, index);

      expect(word).toBe('test');
      expect(wordData).toEqual({ startIndex: 10, length: 4 });
    });

    it('should handle cases with no previous word', () => {
      const { getInputWordDataFromSelectionStart } = useStringUtil();
      const input = 'No whitespace';

      const { word, wordData } = getInputWordDataFromSelectionStart(input, 2);

      expect(word).toBe('No');
      expect(wordData).toEqual({ startIndex: 0, length: 2 });
    });

    it('should handle cases with whitespace at the start', () => {
      const { getInputWordDataFromSelectionStart } = useStringUtil();
      const input = '  This is a test.';
      const index = input.length - 1;

      const { word, wordData } = getInputWordDataFromSelectionStart(input, index);

      expect(word).toBe('test');
      expect(wordData).toEqual({ startIndex: 12, length: 4 });
    });

    it('should handle cases with whitespace at the end', () => {
      const { getInputWordDataFromSelectionStart } = useStringUtil();
      const input = 'This is a test.   ';
      const index = input.length - 4;

      const { word, wordData } = getInputWordDataFromSelectionStart(input, index);

      expect(word).toBe('test');
      expect(wordData).toEqual({ startIndex: 10, length: 4 });
    });
  });
});
