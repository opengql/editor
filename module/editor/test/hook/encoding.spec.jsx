import { renderHook } from '@testing-library/react';
import { useEncoding } from '../../src/hook/encoding';

describe('useEncoding', () => {
  const { result } = renderHook(() => useEncoding());
  const { encode, decode } = result.current;

  describe('encode', () => {
    it('should encode a string', () => {
      const originalString = 'Hello, World!';
      const encodedString = encode(originalString);

      expect(encodedString).toBeTruthy();

      expect(encodedString).not.toBe(originalString);
    });
  });

  describe('decode', () => {
    it('should decode an encoded string', () => {
      const originalString = 'Hello, World!';
      const encodedString = encode(originalString);
      const decodedString = decode(encodedString);

      expect(decodedString).toBe(originalString);
    });

    it('should decode a string with missing padding characters', () => {
      const originalString = 'Hello, World!';
      const encodedString = encode(originalString);

      const encodedWithoutPadding = encodedString.replace(/=+$/, '');
      const decodedString = decode(encodedWithoutPadding);

      expect(decodedString).toBe(originalString);
    });

    it('should encode string that is not dividable by 4', () => {
      const encodedString = 'H4sIAAAAAAAAA0tMAQBY7eB3AgAAAA';
      const decodedString = decode(encodedString);
      expect(decodedString).toBe('ad');
    });
  });
});
