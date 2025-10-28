// numberNode.js

import { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const NumberNode = ({ id, data }) => {
  const [value, setValue] = useState(data?.value || 0);
  const [operation, setOperation] = useState(data?.operation || 'none');

  return (
    <BaseNode 
      id={id} 
      data={data} 
      title="Number"
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
      height={100}
    >
      <label>
        Value:
        <input 
          type="number" 
          value={value} 
          onChange={(e) => setValue(e.target.value)} 
        />
      </label>
      <label>
        Operation:
        <select value={operation} onChange={(e) => setOperation(e.target.value)}>
          <option value="none">None</option>
          <option value="add">Add</option>
          <option value="multiply">Multiply</option>
          <option value="round">Round</option>
        </select>
      </label>
    </BaseNode>
  );
}

