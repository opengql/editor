import React from 'react';
import { act, fireEvent } from '@testing-library/react';
import { viewActions } from '$editor/store/slice/view-slice';
import { storeRender } from '$editor-test/helper/store-render';
import { ViewSelect } from '$editor/container/view-select';
import { CodeEditorViewType } from '$editor/component/const/code-editor-view-type';

describe('ViewSelect', () => {
  const initState = (store, { viewType }) => {
    act(() => {
      store.dispatch(viewActions.changeView(viewType ?? CodeEditorViewType.EDITOR));
    });
  };

  const renderViewSelect = (state = {}) => {
    const result = storeRender(<ViewSelect />);
    initState(result.store, state);
    return result;
  };

  it('renders without crashing', () => {
    const { getByTestId } = renderViewSelect();

    expect(getByTestId('ti-view-select--wrapper')).toBeInTheDocument();
  });

  it('should change view type in store after clicks', () => {
    const { getByTestId, store } = renderViewSelect();

    act(() => fireEvent.click(getByTestId('ti-view-select--parse-tree')));

    expect(store.getState().view.type).toEqual(CodeEditorViewType.PARSE_TREE);

    act(() => fireEvent.click(getByTestId('ti-view-select--editor-button')));

    expect(store.getState().view.type).toEqual(CodeEditorViewType.EDITOR);
  });

  it('changes className based on selected view', () => {
    const { getByTestId } = renderViewSelect();

    expect(getByTestId('ti-view-select--editor-button')).toHaveClass('selectedOption');

    act(() => fireEvent.click(getByTestId('ti-view-select--parse-tree')));

    expect(getByTestId('ti-view-select--parse-tree')).toHaveClass('selectedOption');
  });
});
