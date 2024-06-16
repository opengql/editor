import { useSelector } from 'react-redux';

export const useCurrentGrammar = () => useSelector((state) => state.language.grammars[state.language.selectedGrammar]);
