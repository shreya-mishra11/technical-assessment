// constantNode.js
// Ultra-simple constant node - demonstrates the power of nodeFactory

import { createNode } from './nodeFactory';

export const ConstantNode = createNode({
  title: 'Constant',
  width: 200,
  height: 90,
  backgroundColor: '#f9f9f9',
  handles: ['source'],
  fields: [
    {
      name: 'value',
      label: 'Value',
      type: 'text',
      defaultValue: 'Hello World',
      placeholder: 'Enter constant value'
    }
  ]
});

// That's it! Just 15 lines for a fully functional node with state management.

