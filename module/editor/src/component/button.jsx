import React, { useCallback } from 'react';
import css from '$editor/component/style/button.module.css';
import { ButtonIconPos } from '$editor/component/const/button-icon-pos';
import PropTypes from 'prop-types';
import { SpinnerIcon } from '$editor/icon/spinner-icon';
import { CopySuccessIcon } from '$editor/icon/copy-success-icon';

/***
 * Component that renders the button with set styles.
 * It contains option to set the icon in specified position.
 *
 * @param {string} label represents the text rendered in the button component
 * @param {JSX.Element} icon represents the component that is rendered in place of icon in set position
 * @param {function} onClick represents method called on button click
 * @param {ButtonIconPos} iconPlacement represents the position on which the icon is rendered
 * @param {boolean} isLoading indicates that spinner should be rendered on the button instead of normal content
 * @param {boolean} isCopied special implementation of button that instead of spinner shows the copy success/error message
 * @param {string} testId represents the id of component that may be used in the tests
 * @returns {JSX.Element}
 * @constructor
 */
export const Button = ({
  label,
  icon,
  onClick,
  iconPlacement = ButtonIconPos.LEFT,
  isLoading = false,
  isCopied = false,
  testId = 'ti-button',
}) => {
  const drawLabelWithIcon = useCallback(
    /***
     * Function that handles the logic of icon and label placement
     *
     * @function
     * @param {string} label represents the label rendered in the middle of the button
     * @param {JSX.Element | undefined} icon represent the icon that will be rendered in assigned position
     * @returns {JSX.Element}
     */
    (label, icon) => {
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
    },
    [iconPlacement, testId],
  );

  const drawButtonContent = useCallback(
    /***
     * Logic that handles custom state with loading flag and copied flag
     *
     * @function
     * @returns {JSX.Element}
     */
    () => {
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
    },
    [isLoading, isCopied],
  );

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
