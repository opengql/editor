import PropTypes from 'prop-types';

export const DebouncedEffectConfig = PropTypes.shape({
  delay: PropTypes.number,
  deps: PropTypes.arrayOf(PropTypes.any),
  skipInitCall: PropTypes.bool,
});

export const DefaultDebouncedEffectConfig = {
  delay: 100,
  deps: [],
  skipInitCall: false,
};
