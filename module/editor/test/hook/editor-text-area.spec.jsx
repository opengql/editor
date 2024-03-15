import '@testing-library/jest-dom';
import { renderHook } from '@testing-library/react';
import { useEditorTextArea } from '../../src/hook/editor-text-area';

describe('useEditorTextArea', () => {
  it('should return textarea element when exists', () => {
    const textarea = document.createElement('textarea');
    textarea.setAttribute('id', 'code-textarea--input');
    document.body.appendChild(textarea);

    const { result } = renderHook(() => useEditorTextArea());

    expect(result.current).toBe(textarea);
  });
});
