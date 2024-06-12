import React, { useEffect, useState } from 'react';
import styles from '$editor/container/style/error-list.module.css';
import PropTypes from 'prop-types';
import { ParsingError } from '$editor/type/parsing-error';
import { connect } from 'react-redux';
import { ErrorListItem } from '$editor/component/error-list-item';

export const ErrorListImpl = ({ parseErrors }) => {
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

ErrorListImpl.propTypes = {
  parseErrors: PropTypes.arrayOf(ParsingError),
};

const mapStateToProps = (state) => ({
  parseErrors: state.parserResult.errors,
});

export const ErrorList = connect(mapStateToProps)(ErrorListImpl);
