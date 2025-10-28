// baseNode.js
// Base abstraction for all node types

import { Handle, Position } from 'reactflow';

/**
 * Base component for all custom nodes
 * Provides common styling and structure
 */
export const BaseNode = ({ 
  id, 
  data,
  title,
  handles = [],
  children,
  width = 200,
  height = 80,
  additionalStyles = {}
}) => {
  const containerStyle = {
    width,
    height,
    border: '1px solid black',
    backgroundColor: '#fff',
    borderRadius: '4px',
    padding: '8px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    ...additionalStyles
  };

  const titleStyle = {
    fontWeight: 'bold',
    fontSize: '14px',
    borderBottom: '1px solid #eee',
    paddingBottom: '4px'
  };

  const contentStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  };

  return (
    <>
      {/* Render handles based on configuration */}
      {handles.map((handle, index) => {
        return (
          <Handle
            key={handle.id || `${handle.type}-${index}`}
            type={handle.type}
            position={handle.position}
            id={handle.id}
            style={handle.style || {}}
          />
        );
      })}
      
      <div style={containerStyle}>
        {/* Title */}
        <div style={titleStyle}>
          <span>{title}</span>
        </div>

        {/* Content area - can be any React elements */}
        <div style={contentStyle}>
          {children}
        </div>
      </div>
    </>
  );
};

