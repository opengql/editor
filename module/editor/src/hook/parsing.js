import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editorActions } from '$editor/store/slice/editor-slice';
import { ParseState } from '$editor/const/parse-state';
import { languageActions } from '$editor/store/slice/language-slice';
import { parseResultActions } from '$editor/store/slice/parse-result-slice';

export const useParsing = () => {
  const value = useSelector((state) => state.editor.value);
  const isInitialized = useSelector((state) => state.language.isInitialized);
  const dispatch = useDispatch();
  const grammarWorkerRef = useRef(null);

  const handleInitResponse = ({ data }) => {
    if ('errors' in data || 'tree' in data) {
      return;
    }

    const { grammarDefinition, examples } = data;
    dispatch(languageActions.initialize({ grammarDefinition, examples }));
    dispatch(editorActions.setState(ParseState.IDLE));
  };

  const handleParseResponse = ({ data }) => {
    if ('grammarDefinition' in data || 'examples' in data) {
      return;
    }

    dispatch(parseResultActions.update(data));
    dispatch(editorActions.setState(ParseState.IDLE));
  };

  useEffect(() => {
    if (grammarWorkerRef.current !== null) {
      grammarWorkerRef.current.terminate();
    }

    if (isInitialized) {
      return;
    }

    dispatch(editorActions.setState(ParseState.INITIALIZING));
    grammarWorkerRef.current = new Worker(`./js/main.worker.bundle.js`);
    grammarWorkerRef.current.postMessage({ type: 'initialize' });
    grammarWorkerRef.current.onmessage = handleInitResponse;

    return () => {
      if (grammarWorkerRef.current === null) {
        return;
      }

      grammarWorkerRef.current.terminate();
    };
  }, []);

  useEffect(() => {
    if (grammarWorkerRef.current === null || !isInitialized) {
      return;
    }

    dispatch(editorActions.setState(ParseState.PARSING));
    grammarWorkerRef.current.postMessage({ type: 'parse', payload: { text: value } });
    grammarWorkerRef.current.onmessage = handleParseResponse;
  }, [value, isInitialized]);
};
