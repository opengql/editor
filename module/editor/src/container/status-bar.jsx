import React from 'react';
import css from '$editor/container/style/status-bar.module.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CaretData } from '$editor/component/caret-data';
import { ParsingError } from '$editor/type/parsing-error';
import { ParseState } from '$editor/const/parse-state';
import { ParseStateIndicator } from '$editor/component/parse-state-indicator';

const StatusBarImpl = ({ parseErrors, parseState, caretPosition }) => (
  <div className={css.statusBar} data-testid="ti-status-bar">
    <ParseStateIndicator parseErrors={parseErrors} parseState={parseState} />
    <div className={css.statusBarSeparator} />
    <CaretData position={caretPosition} />
  </div>
);

StatusBarImpl.propTypes = {
  parseErrors: PropTypes.arrayOf(ParsingError),
  parseState: PropTypes.oneOf(Object.values(ParseState)),
  caretPosition: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
};

const mapStateToProps = (state) => ({
  parseErrors: state.parserResult.errors,
  parseState: state.editor.state,
  caretPosition: state.caretData.position,
});

export const StatusBar = connect(mapStateToProps)(StatusBarImpl);
