import React from 'react';
import { render, screen } from '@testing-library/react';
import { ExamplesListElementCode } from '$editor/component/examples-list-element-code';
import Prism from 'prismjs';

const mockGrammar = Prism.languages.javascript;

describe('ExamplesListElementCode', () => {
  it('should render examples list element code component with provided example and grammar', () => {
    const mockCode = `
    const greeting = "Hello, world!";
    console.log(greeting);
  `;

    const mockExample = {
      name: 'Example 1',
      code: mockCode,
    };

    render(<ExamplesListElementCode example={mockExample} grammar={mockGrammar} />);

    const exampleCodeElement = screen.getByTestId('ti-examples-list-item--code');

    expect(exampleCodeElement).toBeInTheDocument();

    const codeLines = screen.getAllByTestId(/^ti-code-line-\d+$/);

    expect(codeLines).toHaveLength(2);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('should handle multiline code properly', () => {
    const multilineCode = `
      <div>
        <p>This is a multiline</p>
        <p>HTML code</p>
      </div>
    `;

    const multilineExample = {
      name: 'Multiline Example',
      code: multilineCode,
    };

    render(<ExamplesListElementCode example={multilineExample} grammar={mockGrammar} />);

    const codeLines = screen.getAllByTestId(/^ti-code-line-\d+$/);

    expect(codeLines).toHaveLength(4);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });
});
