import { useEffect, useState } from 'react';

/***
 * Hook that stores changeable value with debounce.
 * It's similar to the useState but with reduced count of emitted changes.
 * This hook requires two parameters, the value to store that change in the application work time and the delay of debounce.
 *
 * @param {unknown} value
 * @param {number} delay
 * @returns {unknown}
 */
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};
