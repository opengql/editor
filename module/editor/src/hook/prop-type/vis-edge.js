import PropTypes from 'prop-types';
import { VisArrowHead } from '$editor/hook/type/vis-arrow-head';

export const VisEdge = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  from: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  to: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  arrows: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      to: PropTypes.oneOfType([PropTypes.bool, VisArrowHead]),
      middle: PropTypes.oneOfType([PropTypes.bool, VisArrowHead]),
      from: PropTypes.oneOfType([PropTypes.bool, VisArrowHead]),
    }),
  ]),
  arrowStrikethrough: PropTypes.bool,
  chosen: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      edge: PropTypes.bool,
      label: PropTypes.bool,
    }),
  ]),
  color: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      color: PropTypes.string,
      highlight: PropTypes.string,
      hover: PropTypes.string,
      inherit: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
      opacity: PropTypes.number,
    }),
  ]),
  dashes: PropTypes.oneOfType([PropTypes.bool, PropTypes.arrayOf(PropTypes.number)]),
  font: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      color: PropTypes.string,
      size: PropTypes.number,
      face: PropTypes.string,
      mod: PropTypes.string,
    }),
  ]),
  hidden: PropTypes.bool,
  hoverWidth: PropTypes.number,
  label: PropTypes.string,
  labelHighlightBold: PropTypes.bool,
  length: PropTypes.number,
  physics: PropTypes.bool,
  scaling: PropTypes.shape({
    label: PropTypes.shape({
      enabled: PropTypes.bool,
      min: PropTypes.number,
      max: PropTypes.number,
      maxVisible: PropTypes.number,
      drawThreshold: PropTypes.number,
    }),
    customScalingFunction: PropTypes.func,
  }),
  selectionWidth: PropTypes.number,
  selfReferenceSize: PropTypes.number,
  selfReference: PropTypes.shape({
    size: PropTypes.number,
    angle: PropTypes.number,
    renderBehindTheNode: PropTypes.bool,
  }),
  shadow: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      enabled: PropTypes.bool,
      color: PropTypes.string,
      size: PropTypes.number,
      x: PropTypes.number,
      y: PropTypes.number,
    }),
  ]),
  smooth: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      enabled: PropTypes.bool,
      type: PropTypes.string,
      forceDirection: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
      roundness: PropTypes.number,
    }),
  ]),
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  value: PropTypes.number,
  width: PropTypes.number,
  widthConstraint: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.bool,
    PropTypes.shape({
      maximum: PropTypes.number,
    }),
  ]),
});
