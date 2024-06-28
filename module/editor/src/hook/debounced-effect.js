import { useEffect, useRef, useState } from 'react';

/***
 * Hook that works like the useEffect hook but with delayed dependencies change detection.
 * When values are changing under the provided delay in milliseconds then the callback is not called.
 * But when the deps will not change for delay there is a callback invocation.
 *
 * @param {function(): void} callback
 * @param {number} delay
 * @param {DependencyList} deps
 */
export const useDebouncedEffect = (callback, delay = 100, deps = []) => {
  const [destructorCallback, setDestructorCallback] = useState(() => {});
  const timerRef = useRef(undefined);

  if (!Array.isArray(deps)) {
    return;
  }

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      if (typeof destructorCallback === 'function') {
        destructorCallback();
      }

      const result = callback();

      if (typeof result === 'function') {
        setDestructorCallback(result);
      } else {
        setDestructorCallback(undefined);
      }
    }, delay);

    return () => clearTimeout(timerRef.current);
  }, [callback, delay, ...deps]);
};
