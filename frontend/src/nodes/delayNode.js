// delayNode.js
// A delay/timer node created with the nodeFactory abstraction

import { createNode } from './nodeFactory';

export const DelayNode = createNode({
  title: 'Delay',
  width: 220,
  height: 110,
  backgroundColor: '#e1f5fe',
  handles: ['target', 'source'],
  fields: [
    {
      name: 'duration',
      label: 'Duration (ms)',
      type: 'range',
      defaultValue: 1000,
      min: 0,
      max: 10000
    },
    {
      name: 'delayType',
      label: 'Delay Type',
      type: 'select',
      defaultValue: 'fixed',
      options: [
        { value: 'fixed', label: 'Fixed' },
        { value: 'random', label: 'Random' },
        { value: 'exponential', label: 'Exponential' }
      ]
    }
  ]
});

