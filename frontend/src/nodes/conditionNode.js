// conditionNode.js

import { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const ConditionNode = ({ id, data }) => {
  const [operator, setOperator] = useState(data?.operator || 'equals');
  const [compareValue, setCompareValue] = useState(data?.compareValue || '');

  return (
    <BaseNode 
      id={id} 
      data={data} 
      title="Condition"
      handles={[
        {
          type: 'target',
          position: Position.Left,
          id: `${id}-input`
        },
        {
          type: 'source',
          position: Position.Right,
          id: `${id}-true`,
          style: { top: '40%' }
        },
        {
          type: 'source',
          position: Position.Right,
          id: `${id}-false`,
          style: { top: '60%' }
        }
      ]}
      width={220}
      height={120}
      additionalStyles={{ backgroundColor: '#f0f8ff' }}
    >
      <label>
        Operator:
        <select value={operator} onChange={(e) => setOperator(e.target.value)}>
          <option value="equals">Equals</option>
          <option value="greater">Greater Than</option>
          <option value="less">Less Than</option>
          <option value="contains">Contains</option>
        </select>
      </label>
      <label>
        Compare Value:
        <input 
          type="text" 
          value={compareValue} 
          onChange={(e) => setCompareValue(e.target.value)} 
        />
      </label>
    </BaseNode>
  );
}

