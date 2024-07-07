import PropTypes from 'prop-types';
import { VisNode } from '$editor/hook/type/vis-node';
import { VisEdge } from '$editor/hook/type/vis-edge';

export const ConvertResult = PropTypes.shape({
  nodes: PropTypes.arrayOf(VisNode).isRequired,
  edges: PropTypes.arrayOf(VisEdge).isRequired,
});
