import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editorActions } from '../state/slice/editor-slice';
import { ParseState } from '../const/parse-state';
import { languageActions } from '../state/slice/language-slice';
import { parseResultActions } from '../state/slice/parse-result-slice';
import { useDebouncedEffect } from './debounced-effect';

export const useParsing = () => {
  const value = useSelector((state) => state.editor.value);
  const dispatch = useDispatch();
  const grammarWorkerRef = useRef(null);
  const [parsedValue, setParsedValue] = useState();
  const [isInitialized, setIsInitialized] = useState(false);

  const handleInitResponse = ({ data }) => {
    const { grammarDefinition } = data;
    dispatch(languageActions.initialize({ grammarDefinition, examples: [] }));
    dispatch(editorActions.setState(ParseState.IDLE));
    setIsInitialized(true);
  };

  const handleParseResponse = ({ data }) => {
    dispatch(parseResultActions.update(data));
    dispatch(editorActions.setState(ParseState.IDLE));
  };

  useEffect(() => {
    if (grammarWorkerRef.current !== null) {
      grammarWorkerRef.current.terminate();
    }

    dispatch(editorActions.setState(ParseState.INITIALIZING));
    grammarWorkerRef.current = new Worker(`./js/worker.bundle.js`);
    grammarWorkerRef.current.postMessage({ type: 'initialize' });
    grammarWorkerRef.current.onmessage = handleInitResponse;

    return () => {
      if (grammarWorkerRef.current === null) {
        return;
      }

      grammarWorkerRef.current.terminate();
    };
  }, []);

  useDebouncedEffect(
    () => {
      if (grammarWorkerRef.current === null || !isInitialized || parsedValue === value) {
        return;
      }

      setParsedValue(value);
      dispatch(editorActions.setState(ParseState.PARSING));
      grammarWorkerRef.current.postMessage({ type: 'parse', payload: { text: value } });
      grammarWorkerRef.current.onmessage = handleParseResponse;
    },
    800,
    [value, isInitialized],
  );
};
