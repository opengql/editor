import * as base64 from 'base64-js';
import pako from 'pako';
import { TextDecoder } from 'text-encoding-utf-8';

/***
 * Hook that provides methods useful to encode and decode string.
 *
 * @returns {{encode: (function(string): string), decode: (function(string): string)}}
 */
export const useEncoding = () => {
  /***
   * Method that encodes the provided string with the pako library and base64.
   *
   * @param value
   * @returns {string}
   */
  const encode = (value) => {
    const compressed = pako.gzip(value);
    return base64.fromByteArray(compressed);
  };

  /***
   * Method that reverts the result of the encodes method.
   * It also uses the pako and base64 libraries with proper order.
   *
   * @param value
   * @returns {string}
   */
  const decode = (value) => {
    let validValue = value;

    if (validValue.length % 4 !== 0) {
      const length = validValue.length / 4;
      const lengthRound = Math.floor(length);
      const missingSignsCount = (length - lengthRound) * 4;

      for (let i = 0; i < missingSignsCount; i++) {
        validValue += '=';
      }
    }

    const decoded = base64.toByteArray(validValue);
    const decompressed = pako.ungzip(decoded);
    return new TextDecoder().decode(decompressed);
  };

  return { decode, encode };
};
