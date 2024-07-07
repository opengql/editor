import React from 'react';
import { act, screen } from '@testing-library/react';
import { ErrorList } from '$editor/container/error-list';
import { storeRender } from '$editor-test/helper/store-render';
import { parseResultActions } from '$editor/store/slice/parse-result-slice';

describe('ErrorList', () => {
  const initializeStore = (store, state) => {
    act(() => {
      store.dispatch(parseResultActions.update(state.parserResult));
    });
  };

  const renderErrorList = (state) => {
    const result = storeRender(<ErrorList />);

    initializeStore(result.store, state);
    return result;
  };

  it('should render no items when no results', () => {
    renderErrorList({ parserResult: { errors: [] } });

    const errorListWrapper = screen.getByTestId('ti-parsing-status-errors--wrapper');
    const errorList = screen.getByTestId('ti-parsing-status-errors--errors-list');

    expect(errorListWrapper).toBeInTheDocument();
    expect(errorList.childElementCount).toBe(0);
  });

  it('should render with multiple errors', () => {
    const errors = [
      { lineIndex: 1, charPosition: 5, message: 'Syntax error' },
      { lineIndex: 3, charPosition: 10, message: 'Undefined variable' },
    ];

    renderErrorList({ parserResult: { errors } });

    const errorListWrapper = screen.getByTestId('ti-parsing-status-errors--wrapper');
    const errorList = screen.getByTestId('ti-parsing-status-errors--errors-list');

    expect(errorListWrapper).toBeInTheDocument();
    expect(errorList.childElementCount).toBe(errors.length);
  });

  it('should render each error item correctly', () => {
    const errors = [
      { lineIndex: 1, charPosition: 5, message: 'Syntax error' },
      { lineIndex: 3, charPosition: 10, message: 'Undefined variable' },
    ];

    renderErrorList({ parserResult: { errors } });

    const errorListItems = screen.getAllByTestId(/ti-parsing-status-errors--errors-list-element-\d+/);

    expect(errorListItems.length).toBe(errors.length);

    errorListItems.forEach((item, index) => {
      const error = errors[index];
      expect(item).toHaveTextContent(`error at ${error.lineIndex}:${error.charPosition}`);
      expect(item).toHaveTextContent(error.message);
    });
  });
});
