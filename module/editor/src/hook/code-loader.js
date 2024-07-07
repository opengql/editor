import { useEffect, useState } from 'react';
import { useEncoding } from '$editor/hook/encoding';

/***
 * Hook that implements the logic to read the hashed code from URL path param.
 * This hook is using the useEncoding hook to decode the path param value.
 * It returns the loaded code as string or undefined when there is no such path param.
 * Nem of the param that is loaded is 'code'.
 * @returns {string|undefined}
 */
export const useCodeLoader = () => {
  const { decode } = useEncoding();
  const [loadedCode, setLoadedCode] = useState(undefined);

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const encodedCode = urlParams.get('code');

    if (encodedCode === null) {
      return;
    }

    const t = decodeURIComponent(encodedCode);
    const decodedCode = decode(t);
    setLoadedCode(decodedCode);
  }, []);

  return loadedCode;
};
