import React from 'react';
import PropTypes from 'prop-types';
import { SpinnerIcon } from '$editor/icon/spinner-icon';
import { If } from '$editor/component/if';
import { CheckIcon } from '$editor/icon/check-icon';
import { ExclamationIcon } from '$editor/icon/exclamation-icon';
import css from '$editor/component/style/parse-state-indicator.module.css';
import { ParseState } from '$editor/const/parse-state';
import { ParseErrorShape } from '$editor/prop-type/parse-error-shape';

const iconSize = 12;

/***
 * Component that renders with multiple states.
 * The states are related to current parsing process of the application.
 * Each state of the {@link ParseState} should have its representation in this component.
 *
 * @param {ParseState} parseState
 * @param {import('$editor/store/type/parse-error.js').ParseError[]} parseErrors
 * @returns {JSX.Element}
 * @constructor
 */
export const ParseStateIndicator = ({ parseState, parseErrors }) => {
  const getStatusClassName = () => {
    if (parseState === ParseState.IDLE && parseErrors.length === 0) {
      return css.parseStateLabelSuccess;
    } else if (parseState === ParseState.IDLE && parseErrors.length !== 0) {
      return css.parseStateLabelError;
    } else {
      return '';
    }
  };

  return (
    <span className={`${css.parseStateLabel} ${getStatusClassName()}`} data-testid="ti-parsing-state">
      <If condition={parseState === ParseState.INITIALIZING}>
        <SpinnerIcon width={iconSize} height={iconSize} />
        <span className={css.parsingLabel} data-testid="ti-parsing-status--label-init">
          Initializing...
        </span>
      </If>
      <If condition={parseState === ParseState.PARSING}>
        <SpinnerIcon width={iconSize} height={iconSize} />
        <span className={css.parsingLabel} data-testid="ti-parsing-status--label-parsing">
          Parsing...
        </span>
      </If>
      <If condition={parseState === ParseState.IDLE && parseErrors.length === 0}>
        <CheckIcon width={iconSize} height={iconSize} />
        <span className={css.noErrorsLabel} data-testid="ti-parsing-status--label-no-errors">
          No errors!
        </span>
      </If>
      <If condition={parseState === ParseState.IDLE && parseErrors.length !== 0}>
        <ExclamationIcon width={iconSize} height={iconSize} />
        <span
          className={css.foundErrorsLabel}
          data-testid="ti-parsing-status--label-errors"
        >{`Found '${parseErrors.length}' parser errors`}</span>
      </If>
    </span>
  );
};

ParseStateIndicator.propTypes = {
  parseErrors: PropTypes.arrayOf(ParseErrorShape),
  parseState: PropTypes.oneOf(Object.values(ParseState)),
};
