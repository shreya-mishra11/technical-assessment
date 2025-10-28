// transformNode.js

import { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const TransformNode = ({ id, data }) => {
  const [transformType, setTransformType] = useState(data?.transformType || 'uppercase');

  return (
    <BaseNode 
      id={id} 
      data={data} 
      title="Transform"
      handles={[
        {
          type: 'target',
          position: Position.Left,
          id: `${id}-input`
        },
        {
          type: 'source',
          position: Position.Right,
          id: `${id}-output`
        }
      ]}
      width={220}
      height={90}
      additionalStyles={{ backgroundColor: '#fffacd' }}
    >
      <label>
        Transform Type:
        <select value={transformType} onChange={(e) => setTransformType(e.target.value)}>
          <option value="uppercase">To Uppercase</option>
          <option value="lowercase">To Lowercase</option>
          <option value="reverse">Reverse</option>
          <option value="trim">Trim</option>
          <option value="replace">Find & Replace</option>
        </select>
      </label>
    </BaseNode>
  );
}

