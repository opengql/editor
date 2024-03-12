import { useEffect, useState } from 'react';

export const useEditorTextArea = () => {
  const [textArea, setTextArea] = useState(undefined);

  useEffect(() => {
    const tmpTextArea = document.getElementById('code-textarea--input');

    if (tmpTextArea === null) {
      return;
    }

    setTextArea(tmpTextArea);
  }, []);

  return textArea;
};
