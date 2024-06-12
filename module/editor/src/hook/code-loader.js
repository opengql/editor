import { useEffect, useState } from 'react';
import { useEncoding } from '$editor/hook/encoding';

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
