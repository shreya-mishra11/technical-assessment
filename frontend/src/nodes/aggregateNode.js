// aggregateNode.js

import { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const AggregateNode = ({ id, data }) => {
  const [aggregationType, setAggregationType] = useState(data?.aggregationType || 'sum');

  return (
    <BaseNode 
      id={id} 
      data={data} 
      title="Aggregate"
      handles={[
        {
          type: 'target',
          position: Position.Left,
          id: `${id}-input1`,
          style: { top: '25%' }
        },
        {
          type: 'target',
          position: Position.Left,
          id: `${id}-input2`,
          style: { top: '50%' }
        },
        {
          type: 'target',
          position: Position.Left,
          id: `${id}-input3`,
          style: { top: '75%' }
        },
        {
          type: 'source',
          position: Position.Right,
          id: `${id}-output`
        }
      ]}
      width={240}
      height={140}
      additionalStyles={{ backgroundColor: '#e6f3ff' }}
    >
      <label>
        Aggregation Type:
        <select value={aggregationType} onChange={(e) => setAggregationType(e.target.value)}>
          <option value="sum">Sum</option>
          <option value="average">Average</option>
          <option value="max">Maximum</option>
          <option value="min">Minimum</option>
          <option value="concat">Concatenate</option>
        </select>
      </label>
    </BaseNode>
  );
}

