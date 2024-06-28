import PropTypes from 'prop-types';

export const IconProps = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  testId: PropTypes.string,
};
