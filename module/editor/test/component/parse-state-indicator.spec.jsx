import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ParseStateIndicator } from '../../src/component/parse-state-indicator';
import { ParseState } from '../../src/const/parse-state';

describe('ParseStateIndicator', () => {
  const mockParsingError = {
    lineIndex: 1,
    charPosition: 3,
    message: 'Syntax error',
  };

  it('renders ParseStateIndicator component when parse state is INITIALIZING', () => {
    render(<ParseStateIndicator parseState={ParseState.INITIALIZING} parseErrors={[]} />);

    const parsingStatusLabel = screen.getByTestId('ti-parsing-status--label-init');
    expect(parsingStatusLabel).toBeInTheDocument();

    const spinnerIcon = screen.getByTestId('ti-parsing-status--label-init').previousSibling;
    expect(spinnerIcon).toBeInTheDocument();
  });

  it('renders ParseStateIndicator component when parse state is PARSING', () => {
    render(<ParseStateIndicator parseState={ParseState.PARSING} parseErrors={[]} />);

    const parsingStatusLabel = screen.getByTestId('ti-parsing-status--label-parsing');
    expect(parsingStatusLabel).toBeInTheDocument();

    const spinnerIcon = screen.getByTestId('ti-parsing-status--label-parsing').previousSibling;
    expect(spinnerIcon).toBeInTheDocument();
  });

  it('renders ParseStateIndicator component when parse state is IDLE and no errors', () => {
    render(<ParseStateIndicator parseState={ParseState.IDLE} parseErrors={[]} />);

    const noErrorsLabel = screen.getByTestId('ti-parsing-status--label-no-errors');
    expect(noErrorsLabel).toBeInTheDocument();

    const checkIcon = screen.getByTestId('ti-parsing-status--label-no-errors').previousSibling;
    expect(checkIcon).toBeInTheDocument();
  });

  it('renders ParseStateIndicator component when parse state is IDLE and there are errors', () => {
    render(<ParseStateIndicator parseState={ParseState.IDLE} parseErrors={[mockParsingError]} />);

    const errorsLabel = screen.getByTestId('ti-parsing-status--label-errors');
    expect(errorsLabel).toBeInTheDocument();

    const exclamationIcon = screen.getByTestId('ti-parsing-status--label-errors').previousSibling;
    expect(exclamationIcon).toBeInTheDocument();

    const errorCount = screen.getByText(`Found '1' parser errors`);
    expect(errorCount).toBeInTheDocument();
  });
});
