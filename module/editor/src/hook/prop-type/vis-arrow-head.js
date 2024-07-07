import PropTypes from 'prop-types';

export const VisArrowHead = PropTypes.shape({
  enabled: PropTypes.bool,
  scaleFactor: PropTypes.number,
  type: PropTypes.oneOf(['arrow', 'circle', 'bar', 'diamond', 'box', 'crow', 'curve', 'inv_curve', 'vee']),
});
