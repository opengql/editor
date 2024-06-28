import React, { act } from 'react';
import { screen } from '@testing-library/react';
import PropTypes from 'prop-types';
import { useHighlights } from '$editor/hook/highlights';
import { mockGrammarEventResultInit } from '$editor-test/mock/grammar-event-result-init';
import { storeRender } from '$editor-test/helper/store-render';

jest.mock('prismjs', () => ({
  highlight: jest.fn().mockImplementation((code) => `<span>${code}</span>`),
}));

jest.mock('html-react-parser', () => jest.fn().mockImplementation((code) => code));

const MockComponent = ({ specification, parseResult }) => {
  const { highlight } = useHighlights({ specification, parseResult });
  const code = 'test code';
  return <div>{highlight(code)}</div>;
};

MockComponent.propTypes = {
  specification: PropTypes.object,
  parseResult: PropTypes.arrayOf(PropTypes.object),
};

describe('useHighlights', () => {
  it('should render with highlighted code', () => {
    const specification = mockGrammarEventResultInit();
    const { rerender } = storeRender(<MockComponent specification={specification} parseResult={undefined} />);

    act(() => rerender(<MockComponent specification={specification} parseResult={undefined} />));

    expect(screen.getByText(/test code/)).toBeInTheDocument();
  });

  it('should render with default grammar when specification is not provided', () => {
    const { rerender } = storeRender(<MockComponent specification={undefined} parseResult={undefined} />);

    act(() => rerender(<MockComponent specification={undefined} parseResult={undefined} />));

    expect(screen.getByText(/test code/)).toBeInTheDocument();
  });
});
