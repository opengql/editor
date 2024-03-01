export const ParseTreeViewOptions = {
  autoResize: true,
  nodes: {
    shape: 'box',
    borderWidth: 0.5,
    font: {
      multi: 'html',
      face: "'JetBrains Mono', monospace",
      color: '#FFF',
    },
    shapeProperties: {
      borderRadius: 0,
    },
    physics: false,
  },
  edges: {
    physics: false,
  },
  layout: {
    improvedLayout: true,
    clusterThreshold: 150,
    hierarchical: {
      direction: 'UD',
      nodeSpacing: 150,
      parentCentralization: false,
    },
  },
  interaction: {
    dragNodes: false,
    selectable: false,
  },
  manipulation: {
    enabled: false,
  },
};
