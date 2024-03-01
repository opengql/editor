import PropTypes from 'prop-types';

export const VisNode = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  borderWidth: PropTypes.number,
  borderWidthSelected: PropTypes.number,
  brokenImage: PropTypes.string,
  color: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      background: PropTypes.string,
      border: PropTypes.string,
      highlight: PropTypes.shape({
        border: PropTypes.string,
        background: PropTypes.string,
      }),
      hover: PropTypes.shape({
        border: PropTypes.string,
        background: PropTypes.string,
      }),
    }),
  ]),
  chosen: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      label: PropTypes.bool,
      node: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
      edge: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
    }),
  ]),
  opacity: PropTypes.number,
  fixed: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      x: PropTypes.bool,
      y: PropTypes.bool,
    }),
  ]),
  font: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      color: PropTypes.string,
      size: PropTypes.number,
      face: PropTypes.string,
      mod: PropTypes.string,
    }),
  ]),
  group: PropTypes.string,
  hidden: PropTypes.bool,
  icon: PropTypes.shape({
    face: PropTypes.string,
    code: PropTypes.string,
    size: PropTypes.number,
    color: PropTypes.string,
    weight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }),
  image: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      selected: PropTypes.string,
      unselected: PropTypes.string,
    }),
  ]),
  imagePadding: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      top: PropTypes.number,
      right: PropTypes.number,
      bottom: PropTypes.number,
      left: PropTypes.number,
    }),
  ]),
  label: PropTypes.string,
  labelHighlightBold: PropTypes.bool,
  level: PropTypes.number,
  margin: PropTypes.shape({
    top: PropTypes.number,
    right: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number,
  }),
  mass: PropTypes.number,
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
  shape: PropTypes.string,
  shapeProperties: PropTypes.shape({
    borderDashes: PropTypes.oneOfType([PropTypes.bool, PropTypes.arrayOf(PropTypes.number)]),
    borderRadius: PropTypes.number,
    interpolation: PropTypes.bool,
    useImageSize: PropTypes.bool,
    useBorderWithImage: PropTypes.bool,
    coordinateOrigin: PropTypes.string,
  }),
  size: PropTypes.number,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  value: PropTypes.number,
  widthConstraint: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.bool,
    PropTypes.shape({
      minimum: PropTypes.number,
      maximum: PropTypes.number,
    }),
  ]),
  x: PropTypes.number,
  y: PropTypes.number,
});
