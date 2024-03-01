import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

export const useDebouncedEffect = (callback, delay, deps) => {
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

useDebouncedEffect.propTypes = {
  callback: PropTypes.func.isRequired,
  delay: PropTypes.number,
  deps: PropTypes.arrayOf(PropTypes.any),
};

useDebouncedEffect.defaultProps = {
  delay: 100,
  deps: [],
};
