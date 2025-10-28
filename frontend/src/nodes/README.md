# Node Abstraction

## Overview
The `BaseNode` component provides a reusable abstraction for creating custom nodes in the flow diagram. This reduces code duplication and makes it easier to create new node types.

## Benefits
1. **Reduced Code Duplication**: Common styling and structure are centralized
2. **Consistent Appearance**: All nodes share the same base styling
3. **Easy Customization**: Can override styles, dimensions, and behavior
4. **Flexible Handle Configuration**: Easily configure multiple input/output handles
5. **Faster Development**: New nodes can be created with minimal code

## How to Use BaseNode

### Basic Structure
```javascript
import { BaseNode } from './baseNode';

export const MyCustomNode = ({ id, data }) => {
  return (
    <BaseNode 
      id={id} 
      data={data} 
      title="My Node"
      handles={[...]}
      width={200}
      height={100}
    >
      {/* Your custom content */}
    </BaseNode>
  );
}
```

### Parameters
- `id`: Node identifier (required)
- `data`: Node data object (required)
- `title`: Display title for the node (required)
- `handles`: Array of handle configurations (required)
- `width`: Node width in pixels (default: 200)
- `height`: Node height in pixels (default: 80)
- `children`: Custom content/components
- `additionalStyles`: Object of additional CSS styles

### Handle Configuration
Each handle is defined as an object with:
- `type`: 'target' (input) or 'source' (output)
- `position`: Position.Left, Position.Right, Position.Top, or Position.Bottom
- `id`: Unique identifier for the handle
- `style`: Optional styling object

Example:
```javascript
handles={[
  {
    type: 'target',
    position: Position.Left,
    id: `${id}-input`
  },
  {
    type: 'source',
    position: Position.Right,
    id: `${id}-output`,
    style: { top: '50%' }
  }
]}
```

## Node Examples

### 1. Number Node
A node for processing numeric operations with configurable operations.

### 2. Condition Node
A conditional node with two outputs (true/false branches) and customizable comparison operators.

### 3. Transform Node
A text transformation node with multiple transformation options.

### 4. Aggregate Node
An aggregation node that accepts multiple inputs and performs various aggregation functions.

### 5. File Processor Node
A file processing node for various file operations with format selection.

## Migration of Existing Nodes
All existing nodes (Input, Output, LLM, Text) have been refactored to use the `BaseNode` abstraction, reducing code by approximately 50% while maintaining the same functionality.

## Adding a New Node

1. Create a new file in `/nodes/`
2. Import `BaseNode` and any necessary dependencies
3. Define your handle configuration
4. Return `<BaseNode>` with your custom content as children
5. Add the node to `ui.js` nodeTypes
6. Add a toolbar button in `toolbar.js`

Example (creating a "Data Filter" node):
```javascript
import { BaseNode } from './baseNode';
import { Handle, Position } from 'reactflow';

export const DataFilterNode = ({ id, data }) => {
  return (
    <BaseNode 
      id={id} 
      data={data} 
      title="Data Filter"
      handles={[
        { type: 'target', position: Position.Left, id: `${id}-input` },
        { type: 'source', position: Position.Right, id: `${id}-output` }
      ]}
      width={220}
      height={100}
    >
      <input type="text" placeholder="Filter criteria..." />
    </BaseNode>
  );
}
```

