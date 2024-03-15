import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CodeBlock } from '../../src/component/code-block';

describe('CodeBlock', () => {
  const mockParserErrors = [
    {
      lineIndex: 1,
      charPosition: 3,
      message: 'Syntax error',
    },
    {
      lineIndex: 2,
      charPosition: 3,
      message: 'Unexpected token',
    },
  ];

  const mockHighlightResult = ['Line 1', 'Line 2', 'Line 3'];

  it('should render code block component with parser errors and highlight result', () => {
    render(<CodeBlock parserErrors={mockParserErrors} highlightResult={mockHighlightResult} />);

    const highlightsBgElement = screen.getByTestId('ti-higlights--bg');

    expect(highlightsBgElement).toBeInTheDocument();

    const lineNumberBgElement = screen.getByTestId('ti-higlights--line-number-bg');

    expect(lineNumberBgElement).toBeInTheDocument();

    const lineBgElement = screen.getByTestId('ti-higlights--line-bg');

    expect(lineBgElement).toBeInTheDocument();

    const codeTableElement = screen.getByTestId('ti-higlights--code-table');

    expect(codeTableElement).toBeInTheDocument();

    const codeTableBodyElement = screen.getByTestId('ti-higlights--code-table-body');

    expect(codeTableBodyElement).toBeInTheDocument();

    const codeLines = [
      ...screen.getAllByTestId('ti-higlights-code-line'),
      ...screen.getAllByTestId('ti-higlights-code-line-error'),
    ];

    expect(codeLines).toHaveLength(mockHighlightResult.length);

    const errorCodeLines = screen.getAllByTestId('ti-higlights-code-line-error');

    expect(errorCodeLines.length).toBe(mockParserErrors.length);
  });
});
