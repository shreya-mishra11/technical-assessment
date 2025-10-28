// calculatorNode.js
// A calculator node created with the nodeFactory abstraction

import { createNode } from './nodeFactory';

export const CalculatorNode = createNode({
  title: 'Calculator',
  width: 220,
  height: 120,
  backgroundColor: '#e8f5e9',
  handles: ['target', 'source'],
  fields: [
    {
      name: 'operation',
      label: 'Operation',
      type: 'select',
      defaultValue: 'add',
      options: [
        { value: 'add', label: 'Add' },
        { value: 'subtract', label: 'Subtract' },
        { value: 'multiply', label: 'Multiply' },
        { value: 'divide', label: 'Divide' },
        { value: 'power', label: 'Power' },
        { value: 'modulo', label: 'Modulo' }
      ]
    },
    {
      name: 'value',
      label: 'Value',
      type: 'number',
      defaultValue: 0
    }
  ]
});

