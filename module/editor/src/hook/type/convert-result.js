import PropTypes from 'prop-types';
import { VisNode } from './vis-node';
import { VisEdge } from './vis-edge';

export const ConvertResult = PropTypes.shape({
  nodes: PropTypes.arrayOf(VisNode).isRequired,
  edges: PropTypes.arrayOf(VisEdge).isRequired,
});
