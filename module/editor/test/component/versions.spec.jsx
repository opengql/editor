import React from 'react';
import { render, screen } from '@testing-library/react';
import { Versions } from '$editor/component/versions';

describe('Versions', () => {
  it('should render component with correct versions', () => {
    const mockEditorVersion = '1.0.0';
    const mockGrammarVersion = '2.0.0';

    global.editor = { VERSION: mockEditorVersion };
    global.grammar = { VERSION: mockGrammarVersion };

    render(<Versions />);

    const versionsElement = screen.getByTestId('ti-versions');
    const editorVersionLabel = screen.getByTestId('ti-editor-version-label');
    const grammarVersionLabel = screen.getByTestId('ti-grammar-version-label');

    expect(versionsElement).toBeInTheDocument();
    expect(editorVersionLabel).toBeInTheDocument();
    expect(editorVersionLabel.innerHTML).toEqual(global.editor.VERSION);
    expect(grammarVersionLabel).toBeInTheDocument();
    expect(grammarVersionLabel.innerHTML).toEqual(global.grammar.VERSION);
  });
});
