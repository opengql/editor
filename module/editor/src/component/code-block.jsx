import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import css from '$editor/component/style/code-block.module.css';
import { CodeLine } from '$editor/component/code-line';
import { ParseErrorShape } from '$editor/prop-type/parse-error-shape';

/***
 * Component that represents the group of lines.
 * This component takes two parameters.
 * First parameter is a parsing errors that are used to draw special code line with different colors.
 * Second parameter is a highlight result which consists from html code generated to match the syntax coloring..
 *
 * @param {import('$editor/store/type/parse-error').ParseError[]} parserErrors
 * @param {string[]} highlightResult
 * @returns {JSX.Element}
 * @constructor
 */
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
  parserErrors: PropTypes.arrayOf(ParseErrorShape).isRequired,
  highlightResult: PropTypes.arrayOf(PropTypes.string).isRequired,
};
