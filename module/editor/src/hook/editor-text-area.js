import { useEffect, useState } from 'react';

/***
 * Hook that provides the editor element found by ID: 'code-textarea--input'.
 * If the text area element is not present it returns the undefined.
 *
 * @returns {HTMLTextAreaElement | undefined}
 */
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
