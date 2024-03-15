import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CodeLine } from '../../src/component/code-line';

describe('CodeLine', () => {
  const mockLine = '<div>Code line content</div>';
  const mockIndex = 2;

  it('should render code line component without error', () => {
    render(
      <table>
        <tbody>
          <CodeLine line={mockLine} index={mockIndex} />
        </tbody>
      </table>,
    );

    const codeLineElement = screen.getByTestId('ti-higlights-code-line');

    expect(codeLineElement).toBeInTheDocument();

    const lineNumberCellElement = screen.getByTestId('ti-higlights-code-line--number-cell');

    expect(lineNumberCellElement).toBeInTheDocument();
    expect(lineNumberCellElement).toHaveTextContent(`${mockIndex + 1}`);

    const codeCellElement = screen.getByTestId('ti-higlights-code-line--code-cell');

    expect(codeCellElement).toBeInTheDocument();
    expect(codeCellElement).toContainHTML('Code line content');
  });

  it('should render code line component with error', () => {
    render(
      <table>
        <tbody>
          <CodeLine line={mockLine} index={mockIndex} hasError />
        </tbody>
      </table>,
    );

    const errorLineElement = screen.getByTestId('ti-higlights-code-line-error');

    expect(errorLineElement).toBeInTheDocument();

    const lineNumberCellElement = screen.getByTestId('ti-higlights-code-line--number-cell');

    expect(lineNumberCellElement).toBeInTheDocument();
    expect(lineNumberCellElement).toHaveTextContent(`${mockIndex + 1}`);

    const codeCellElement = screen.getByTestId('ti-higlights-code-line--code-cell');

    expect(codeCellElement).toBeInTheDocument();
    expect(codeCellElement).toContainHTML('Code line content');
    expect(errorLineElement).toHaveClass('codeLineError');
  });
});
