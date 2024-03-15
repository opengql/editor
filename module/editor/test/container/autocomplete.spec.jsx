import React from 'react';
import { act, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Autocomplete } from '../../src/container/autocomplete';
import { editorActions } from '../../src/state/slice/editor-slice';
import { storeRender } from '../helper/store-render';
import { languageActions } from '../../src/state/slice/language-slice';
import { caretDataActions } from '../../src/state/slice/caret-data-slice';

jest.useFakeTimers();

describe('Autocomplete', () => {
  const initialState = {
    caretData: { position: { x: 2, y: 3 }, index: 5 },
    editor: { value: 'const fruits = "apple";' },
    language: { grammarDefinition: { keywords: ['apple', 'banana', 'cherry'] }, examples: [] },
  };

  const initializeStore = (store, state) => {
    act(() => {
      store.dispatch(editorActions.setValue(state.editor.value));
      store.dispatch(languageActions.initialize(state.language));
      store.dispatch(caretDataActions.update({ selectionStart: 5, value: state.editor.value }));
    });
  };

  const Textarea = () => {
    const value = useSelector((state) => state.editor.value);
    const dispatch = useDispatch();

    const setValue = (event) => {
      event.preventDefault();
      dispatch(editorActions.setValue(event.target.value));
    };

    return (
      <textarea id="code-textarea--input" data-testid="ti-code-textarea--input" value={value} onChange={setValue} />
    );
  };

  const renderModal = (state = initialState) => {
    const result = storeRender(
      <>
        <Textarea />
        <Autocomplete />
      </>,
    );

    initializeStore(result.store, state);

    const rerender = () => {
      result.rerender(
        <>
          <Textarea />
          <Autocomplete />
        </>,
      );
    };

    return { ...result, rerender };
  };

  it('should render the component without suggestions and hidden modal', () => {
    const { queryByTestId, queryAllByTestId } = renderModal();

    const modalElement = queryByTestId('ti-autocomplete-modal');
    const suggestionElements = queryAllByTestId(/^ti-autocomplete-option-/);

    expect(modalElement).toBeInTheDocument();
    expect(modalElement).not.toBeVisible();
    expect(suggestionElements).toHaveLength(0);
  });

  it('should render the component with suggestions and visible modal', () => {
    const { queryByTestId, queryAllByTestId, store } = storeRender(<Autocomplete />);

    act(() => store.dispatch(editorActions.setValue('ap')));
    act(() => store.dispatch(caretDataActions.update({ selectionStart: 2, value: 'ap' })));

    const modalElement = queryByTestId('ti-autocomplete-modal');
    const suggestionElements = queryAllByTestId(/^ti-autocomplete-option-/);

    expect(modalElement).toBeInTheDocument();
    expect(suggestionElements).toHaveLength(1);
  });

  it('should add keyword on option click', () => {
    const { getAllByTestId, store } = renderModal();

    act(() => store.dispatch(editorActions.setValue('ap')));
    act(() => store.dispatch(caretDataActions.update({ selectionStart: 2, value: 'ap' })));

    act(() => {
      const suggestionElements = getAllByTestId(/^ti-autocomplete-option-/);

      fireEvent.click(suggestionElements[0]);
    });

    const editorValue = store.getState().editor.value;
    expect(editorValue).toEqual('apple ');
  });

  it('should add keyword on enter click', () => {
    const { getByTestId, store } = renderModal();

    act(() => store.dispatch(editorActions.setValue('ap')));
    act(() => store.dispatch(caretDataActions.update({ selectionStart: 2, value: 'ap' })));

    act(() => {
      const autocompleteList = getByTestId('ti-autocomplete-list');

      fireEvent.focus(autocompleteList);
      fireEvent.keyDown(autocompleteList, { key: 'Enter', code: 13, charCode: 13 });
    });

    const editorValue = store.getState().editor.value;
    expect(editorValue).toEqual('apple ');
  });

  it('should handle arrow up key press', () => {
    const { getByTestId, getAllByTestId, store } = renderModal({
      ...initialState,
      language: { grammarDefinition: { keywords: ['apple', 'banana', 'cherry', 'apple1', 'apple2'] }, examples: [] },
    });

    act(() => store.dispatch(editorActions.setValue('app')));
    act(() => store.dispatch(caretDataActions.update({ selectionStart: 3, value: 'app' })));

    const autocompleteList = getByTestId('ti-autocomplete-list');

    const suggestionElements = getAllByTestId(/^ti-autocomplete-option-/);
    const option1 = suggestionElements[0];
    const option2 = suggestionElements[1];
    const option3 = suggestionElements[2];

    expect(option1).toHaveClass('autocompleteModalSelectedElement');
    expect(option2).not.toHaveClass('autocompleteModalSelectedElement');
    expect(option3).not.toHaveClass('autocompleteModalSelectedElement');

    fireEvent.keyDown(autocompleteList, { key: 'ArrowUp' });

    expect(option1).not.toHaveClass('autocompleteModalSelectedElement');
    expect(option2).not.toHaveClass('autocompleteModalSelectedElement');
    expect(option3).toHaveClass('autocompleteModalSelectedElement');

    fireEvent.keyDown(autocompleteList, { key: 'ArrowUp' });

    expect(option1).not.toHaveClass('autocompleteModalSelectedElement');
    expect(option2).toHaveClass('autocompleteModalSelectedElement');
    expect(option3).not.toHaveClass('autocompleteModalSelectedElement');
  });

  it('should handle arrow down key press', () => {
    const { getByTestId, getAllByTestId, store } = renderModal({
      ...initialState,
      language: { grammarDefinition: { keywords: ['apple', 'banana', 'cherry', 'apple1', 'apple2'] }, examples: [] },
    });

    act(() => store.dispatch(editorActions.setValue('app')));
    act(() => store.dispatch(caretDataActions.update({ selectionStart: 3, value: 'app' })));

    const autocompleteList = getByTestId('ti-autocomplete-list');

    const suggestionElements = getAllByTestId(/^ti-autocomplete-option-/);
    const option1 = suggestionElements[0];
    const option2 = suggestionElements[1];
    const option3 = suggestionElements[2];

    expect(option1).toHaveClass('autocompleteModalSelectedElement');
    expect(option2).not.toHaveClass('autocompleteModalSelectedElement');
    expect(option3).not.toHaveClass('autocompleteModalSelectedElement');

    fireEvent.keyDown(autocompleteList, { key: 'ArrowDown' });

    expect(option1).not.toHaveClass('autocompleteModalSelectedElement');
    expect(option2).toHaveClass('autocompleteModalSelectedElement');
    expect(option3).not.toHaveClass('autocompleteModalSelectedElement');

    fireEvent.keyDown(autocompleteList, { key: 'ArrowDown' });

    expect(option1).not.toHaveClass('autocompleteModalSelectedElement');
    expect(option2).not.toHaveClass('autocompleteModalSelectedElement');
    expect(option3).toHaveClass('autocompleteModalSelectedElement');

    fireEvent.keyDown(autocompleteList, { key: 'ArrowDown' });

    expect(option1).toHaveClass('autocompleteModalSelectedElement');
    expect(option2).not.toHaveClass('autocompleteModalSelectedElement');
    expect(option3).not.toHaveClass('autocompleteModalSelectedElement');
  });

  it('should hide the modal on escape key press', () => {
    const { getByTestId, store } = renderModal();
    const modalElement = getByTestId('ti-autocomplete-modal');

    act(() => store.dispatch(editorActions.setValue('app')));
    act(() => store.dispatch(caretDataActions.update({ selectionStart: 3, value: 'app' })));

    fireEvent.keyDown(modalElement, { key: 'Escape' });

    expect(modalElement).not.toBeVisible();
  });

  it('should show the modal when Ctrl + Enter keys are pressed', () => {
    const { getByTestId, getAllByTestId, store } = renderModal();
    const modalElement = getByTestId('ti-autocomplete-modal');

    act(() => store.dispatch(editorActions.setValue('app')));
    act(() => store.dispatch(caretDataActions.update({ selectionStart: 3, value: 'app' })));

    fireEvent.keyDown(modalElement, { key: 'Escape' });

    expect(modalElement).not.toBeVisible();

    fireEvent.keyDown(document, { key: 'Enter', ctrlKey: true });

    const suggestionElements = getAllByTestId(/^ti-autocomplete-option-/);

    expect(modalElement).toBeInTheDocument();
    expect(suggestionElements).toHaveLength(1);
  });

  it('should remove event listeners on unmount', () => {
    const addEventListenerSpy = jest.spyOn(document, 'addEventListener');
    const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');

    const { unmount } = renderModal();

    expect(addEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));

    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });

  it('should not show modal when typed word has length lesser or equals 1', () => {
    const { getByTestId, store } = renderModal();

    act(() => store.dispatch(editorActions.setValue('a')));
    act(() => store.dispatch(caretDataActions.update({ selectionStart: 1, value: 'a' })));

    const modalElement = getByTestId('ti-autocomplete-modal');

    expect(modalElement).not.toBeVisible();

    act(() => store.dispatch(editorActions.setValue('ap')));
    act(() => store.dispatch(caretDataActions.update({ selectionStart: 2, value: 'ap' })));

    expect(modalElement).toBeVisible();
  });
});
