// fileProcessorNode.js

import { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const FileProcessorNode = ({ id, data }) => {
  const [fileAction, setFileAction] = useState(data?.fileAction || 'read');
  const [fileFormat, setFileFormat] = useState(data?.fileFormat || 'txt');

  return (
    <BaseNode 
      id={id} 
      data={data} 
      title="File Processor"
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
      width={240}
      height={120}
      additionalStyles={{ backgroundColor: '#ffe6f0' }}
    >
      <label>
        Action:
        <select value={fileAction} onChange={(e) => setFileAction(e.target.value)}>
          <option value="read">Read</option>
          <option value="write">Write</option>
          <option value="convert">Convert Format</option>
          <option value="compress">Compress</option>
        </select>
      </label>
      <label>
        Format:
        <select value={fileFormat} onChange={(e) => setFileFormat(e.target.value)}>
          <option value="txt">TXT</option>
          <option value="pdf">PDF</option>
          <option value="json">JSON</option>
          <option value="csv">CSV</option>
        </select>
      </label>
    </BaseNode>
  );
}

