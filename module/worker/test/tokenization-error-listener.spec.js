import { TokenizationErrorListener } from '../src/tokenization-error-listener';

describe('TokenizationErrorListener', () => {
  describe('syntaxError', () => {
    it('should set the textNotTokenized property correctly', () => {
      const inputStr = 'This is a sample input';
      const column = 5;
      const listener = new TokenizationErrorListener(inputStr);

      const recognizerMock = {};
      const offendingSymbol = 123;

      listener.syntaxError(recognizerMock, offendingSymbol, 1, column);

      expect(listener.textNotTokenized).toBe('is a sample input');
    });
  });

  describe('reportAmbiguity', () => {
    it('should not throw any error', () => {
      const listener = new TokenizationErrorListener('');

      expect(() => {
        listener.reportAmbiguity();
      }).not.toThrow();
    });
  });

  describe('reportAttemptingFullContext', () => {
    it('should not throw any error', () => {
      const listener = new TokenizationErrorListener('');

      expect(() => {
        listener.reportAttemptingFullContext();
      }).not.toThrow();
    });
  });

  describe('reportContextSensitivity', () => {
    it('should not throw any error', () => {
      const listener = new TokenizationErrorListener('');

      expect(() => {
        listener.reportContextSensitivity();
      }).not.toThrow();
    });
  });
});
