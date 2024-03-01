import React, { useCallback, useEffect, useState } from 'react';
import { ParseError } from '../const/parse-error';
import PropTypes from 'prop-types';
import css from './style/code-block.module.css';
import { CodeLine } from './code-line';

export const CodeBlock = ({ parserErrors, highlightResult }) => {
  const [codeLines, setCodeLines] = useState([]);

  const assemblyLine = useCallback(
    (line, index) => {
      const lineIndex = index + 1;
      const hasError = (parserErrors ?? []).some((error) => error.lineIndex === lineIndex);
      return <CodeLine key={`line-${lineIndex}`} line={line} index={index} hasError={hasError} />;
    },
    [parserErrors],
  );

  useEffect(() => {
    const tmpCodeLines = highlightResult.map(assemblyLine);
    setCodeLines(tmpCodeLines);
  }, [highlightResult]);

  return (
    <>
      <div className={css.highlightBackground} data-testid="ti-higlights--bg">
        <div className={css.highlightLineNumberBackground} data-testid="ti-higlights--line-number-bg" />
        <div className={css.highlightLineBackground} data-testid="ti-higlights--line-bg" />
      </div>
      <table className={css.table} data-testid="ti-higlights--code-table">
        <tbody data-testid="ti-higlights--code-table-body">{codeLines}</tbody>
      </table>
    </>
  );
};

CodeBlock.propTypes = {
  parserErrors: PropTypes.arrayOf(ParseError).isRequired,
  highlightResult: PropTypes.arrayOf(PropTypes.string).isRequired,
};
