import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editorActions } from '$editor/store/slice/editor-slice';
import { ParseState } from '$editor/const/parse-state';
import { languageActions } from '$editor/store/slice/language-slice';
import { parseResultActions } from '$editor/store/slice/parse-result-slice';
import { isArray } from 'lodash';

/***
 * Hook that initializes and control the parse process for current language.
 * Should be used at the index entry of application.
 * It fixes problem with switching between pages.
 */
export const useParsing = () => {
  const value = useSelector((state) => state.editor.value);
  const isFetched = useSelector((state) => state.language.isFetched);
  const isInitialized = useSelector((state) => state.language.isInitialized);
  const selectedGrammar = useSelector((state) => state.language.selectedGrammar);
  const dispatch = useDispatch();
  const grammarWorkerRef = useRef(null);

  const handleFetchGrammarsResponse = ({ data }) => {
    if (!isArray(data)) {
      return;
    }

    const grammars = data.reduce(
      (acc, grammarDefinition) => ({
        ...acc,
        [grammarDefinition.name]: grammarDefinition,
      }),
      {},
    );

    dispatch(languageActions.initializeAfterFetching({ grammars }));
    dispatch(editorActions.setState(ParseState.IDLE));
  };

  const handleInitResponse = ({ data }) => {
    if ('errors' in data || 'tree' in data) {
      return;
    }

    const { name, grammarDefinition } = data;
    dispatch(languageActions.initializeGrammarDefinition({ name, grammarDefinition }));
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
    if (isFetched) {
      return;
    }

    if (grammarWorkerRef.current !== null) {
      grammarWorkerRef.current.terminate();
      grammarWorkerRef.current = null;
    }

    dispatch(editorActions.setState(ParseState.FETCHING));
    grammarWorkerRef.current = new Worker(`./js/main.worker.bundle.js`);
    grammarWorkerRef.current.postMessage({ type: 'fetch-grammars' });
    grammarWorkerRef.current.onmessage = handleFetchGrammarsResponse;

    return () => {
      if (grammarWorkerRef.current === null) {
        return;
      }

      grammarWorkerRef.current.terminate();
    };
  }, []);

  useEffect(() => {
    if (grammarWorkerRef.current === null || !isFetched || isInitialized) {
      return;
    }

    dispatch(editorActions.setState(ParseState.INITIALIZING));
    grammarWorkerRef.current.postMessage({ type: 'initialize', payload: { selectedGrammar } });
    grammarWorkerRef.current.onmessage = handleInitResponse;
  }, [selectedGrammar, isFetched, isInitialized]);

  useEffect(() => {
    if (grammarWorkerRef.current === null || !isFetched || !isInitialized) {
      return;
    }

    dispatch(editorActions.setState(ParseState.PARSING));
    grammarWorkerRef.current.postMessage({ type: 'parse', payload: { selectedGrammar, text: value } });
    grammarWorkerRef.current.onmessage = handleParseResponse;
  }, [selectedGrammar, value, isFetched, isInitialized]);
};
