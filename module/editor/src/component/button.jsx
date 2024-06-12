import React from 'react';
import css from '$editor/component/style/button.module.css';
import { ButtonIconPos } from '$editor/component/const/button-icon-pos';
import PropTypes from 'prop-types';
import { SpinnerIcon } from '$editor/icon/spinner-icon';
import { CopySuccessIcon } from '$editor/icon/copy-success-icon';

export const Button = ({
  label,
  icon,
  onClick,
  iconPlacement = ButtonIconPos.LEFT,
  isLoading = false,
  isCopied = false,
  testId = 'ti-button',
}) => {
  const drawLabelWithIcon = (label, icon) => {
    if (icon === undefined) {
      return (
        <div className={css.buttonContentWrapper} data-testid={`${testId}--btn-content`}>
          <div className={css.buttonLabelWrapper} data-testid={`${testId}--btn-label`}>
            {label}
          </div>
        </div>
      );
    }

    switch (iconPlacement) {
      case ButtonIconPos.LEFT: {
        return (
          <div className={css.buttonContentWrapper} data-testid={`${testId}--btn-content`}>
            <div className={css.buttonIconWrapper} data-testid={`${testId}--btn-icon-left`}>
              {icon}
            </div>
            <div className={css.buttonLabelWrapper} data-testid={`${testId}--btn-label`}>
              {label}
            </div>
          </div>
        );
      }

      case ButtonIconPos.RIGHT: {
        return (
          <div className={css.buttonContentWrapper} data-testid={`${testId}--btn-content`}>
            <div className={css.buttonLabelWrapper} data-testid={`${testId}--btn-label`}>
              {label}
            </div>
            <div className={css.buttonIconWrapper} data-testid={`${testId}--btn-icon-right`}>
              {icon}
            </div>
          </div>
        );
      }

      default: {
        return (
          <div className={css.buttonContentWrapper} data-testid={`${testId}--btn-content`}>
            <div className={css.buttonLabelWrapper} data-testid={`${testId}--btn-label`}>
              {label}
            </div>
          </div>
        );
      }
    }
  };

  const drawButtonContent = () => {
    if (isLoading) {
      return drawLabelWithIcon('', <SpinnerIcon testId="ti-button-spinner-icon" width="0.8rem" height="0.8rem" />);
    }

    if (isCopied) {
      return drawLabelWithIcon(
        'Copied!',
        <CopySuccessIcon testId="ti-button-copy-success-icon" width="0.8rem" height="0.8rem" />,
      );
    }

    return drawLabelWithIcon(label, icon);
  };

  return (
    <button className={css.button} onClick={onClick} data-testid={testId}>
      {drawButtonContent()}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  onClick: PropTypes.func.isRequired,
  iconPlacement: PropTypes.oneOf(Object.values(ButtonIconPos)),
  isLoading: PropTypes.bool,
  isCopied: PropTypes.bool,
  testId: PropTypes.string,
};
