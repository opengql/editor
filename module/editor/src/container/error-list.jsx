import React, { useEffect, useState } from 'react';
import styles from '$editor/container/style/error-list.module.css';
import { ErrorListItem } from '$editor/component/error-list-item';
import { useParserResultErrors } from '$editor/store/hook/parser-result';

/***
 * Container that renders parsing errors from the latest parse result stored in application container.
 *
 * @returns {JSX.Element}
 * @constructor
 */
export const ErrorList = () => {
  const parseErrors = useParserResultErrors();

  const [errorListItems, setErrorListItems] = useState([]);

  useEffect(() => {
    const tmpErrorListItems = parseErrors.map((error, index) => (
      <ErrorListItem key={`code-error-${index + new Date().getUTCDate()}`} errorIndex={index} error={error} />
    ));

    setErrorListItems(tmpErrorListItems);
  }, [parseErrors]);

  return (
    <div className={styles.errorWrapper} data-testid="ti-parsing-status-errors--wrapper">
      <ul className={styles.errorList} data-testid="ti-parsing-status-errors--errors-list">
        {errorListItems}
      </ul>
    </div>
  );
};
