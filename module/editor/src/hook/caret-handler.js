import { useDispatch, useSelector } from 'react-redux';
import { caretDataActions } from '../state/slice/caret-data-slice';

export const useCaretHandler = () => {
  const caretIndex = useSelector((state) => state.caretData.index);
  const caretPosition = useSelector((state) => state.caretData.position);
  const dispatch = useDispatch();

  const getCaretCoordinates = (textAreaElement) => {
    const selectionStart = textAreaElement.selectionStart;
    const linesInTextArea = textAreaElement.value.substring(0, selectionStart).split('\n');
    const x = linesInTextArea.length;
    const y = linesInTextArea[linesInTextArea.length - 1].length;
    return { x, y };
  };

  const getCaretIndex = (textAreaElement) => textAreaElement.selectionStart;

  const update = (textAreaElement) => {
    const currentPosition = getCaretCoordinates(textAreaElement);
    const currentIndex = getCaretIndex(textAreaElement);
    dispatch(caretDataActions.setPosition(currentPosition));
    dispatch(caretDataActions.setIndex(currentIndex));
  };

  return { caretIndex, caretPosition, update };
};
