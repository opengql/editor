import PropTypes from 'prop-types';

export const IconProps = PropTypes.shape({
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  testId: PropTypes.string,
});

export const DefaultIconProps = {
  width: 16,
  height: 16,
  testId: 'ti-icon',
};
