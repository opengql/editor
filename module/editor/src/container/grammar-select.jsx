import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import css from '$editor/container/style/grammar-select.module.css';
import { languageActions } from '$editor/store/slice/language-slice';

export const WorkerSelect = () => {
  const selectedGrammar = useSelector((state) => state.language.selectedGrammar);
  const grammars = useSelector((state) => Object.values(state.language.grammars));
  const dispatch = useDispatch();

  const getOptions = useCallback(
    () =>
      grammars.map((value) => (
        <option
          className={css.selectOption}
          key={`worker-options-${value.name}`}
          value={value.name}
          data-testid="ti-worker-select--option"
        >
          {value.label}
        </option>
      )),
    [grammars],
  );

  const handleChange = (event) => {
    const targetGrammar = event.currentTarget?.value ?? '';
    dispatch(languageActions.setSelectedGrammar(targetGrammar));
  };

  return (
    <div className={css.selectWrapper} data-testid="ti-worker-select--wrapper">
      <select value={selectedGrammar} onChange={handleChange} className={css.select} data-testid="ti-worker-select">
        {getOptions()}
      </select>
    </div>
  );
};
