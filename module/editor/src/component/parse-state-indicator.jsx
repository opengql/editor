import React from 'react';
import PropTypes from 'prop-types';
import { ParsingError } from '$editor/type/parsing-error';
import { SpinnerIcon } from '$editor/icon/spinner-icon';
import { If } from '$editor/component/if';
import { CheckIcon } from '$editor/icon/check-icon';
import { ExclamationIcon } from '$editor/icon/exclamation-icon';
import css from '$editor/component/style/parse-state-indicator.module.css';
import { ParseState } from '$editor/const/parse-state';

const iconSize = 12;

export const ParseStateIndicator = ({ parseState, parseErrors }) => {
  const getStyles = () => {
    let color;

    if (parseState === ParseState.IDLE && parseErrors.length === 0) {
      color = '#004D10';
    } else if (parseState === ParseState.IDLE && parseErrors.length !== 0) {
      color = '#9b1c00';
    } else {
      color = '#484848';
    }

    return { color };
  };

  return (
    <span className={css.parseStateLabel} style={getStyles()} data-testid="ti-parsing-state">
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
  parseErrors: PropTypes.arrayOf(ParsingError),
  parseState: PropTypes.oneOf(Object.values(ParseState)),
};
