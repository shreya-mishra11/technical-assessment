// nodeFactory.js
// Advanced node abstraction factory that simplifies node creation
// ------------------------------------------------------------

import { useState, useMemo } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

/**
 * A powerful factory for creating custom nodes with minimal code
 * 
 * Features:
 * - Automatic state management for form fields
 * - Pre-built form components (input, select, textarea, etc.)
 * - Flexible handle configuration
 * - Simple field definitions
 * - Style customization
 */
export const createNode = ({
  title,
  handles = [],
  fields = [],
  width = 200,
  height = 80,
  backgroundColor = '#fff',
  onFieldChange,
  children
}) => {
  return ({ id, data }) => {
    // Initialize state for all fields
    const fieldStates = fields.reduce((acc, field) => {
      const [value, setValue] = useState(
        data?.[field.name] || field.defaultValue || ''
      );
      acc[field.name] = { value, setValue };
      return acc;
    }, {});

    // Generate handle configurations from shorthand notation
    const processedHandles = useMemo(() => {
      return handles.map(handle => {
        // Allow string shorthand: "source" -> { type: 'source', position: Right, id: auto-generated }
        if (typeof handle === 'string') {
          return {
            type: handle,
            position: handle === 'source' ? Position.Right : Position.Left,
            id: `${id}-${handle}`,
          };
        }
        // Handle custom positioning for multiple handles (BEFORE other checks)
        if (handle.verticalPosition) {
          return {
            type: handle.type || 'source',
            position: handle.position || Position.Right,
            id: `${id}-${handle.id || handle.type || 'handle'}`,
            style: { top: `${handle.verticalPosition}%` }
          };
        }
        // Allow simplified object: { type: 'source' } -> full handle config
        if (handle.type && !handle.position) {
          return {
            ...handle,
            position: handle.type === 'source' ? Position.Right : Position.Left,
            id: `${id}-${handle.id || handle.type}`,
          };
        }
        // Full handle configuration
        return {
          ...handle,
          id: `${id}-${handle.id || 'default'}`,
        };
      });
    }, [id, handles]);

    // Default field renderer
    const renderField = (field) => {
      const { value, setValue } = fieldStates[field.name];
      
      const handleChange = (e) => {
        const newValue = field.type === 'number' ? parseFloat(e.target.value) : e.target.value;
        setValue(newValue);
        if (onFieldChange) {
          onFieldChange(id, field.name, newValue);
        }
      };

      switch (field.type) {
        case 'text':
        case 'string':
        case 'input':
          return (
            <label key={field.name}>
              {field.label}:
              <input
                type="text"
                value={value}
                onChange={handleChange}
                placeholder={field.placeholder}
              />
            </label>
          );

        case 'number':
          return (
            <label key={field.name}>
              {field.label}:
              <input
                type="number"
                value={value}
                onChange={handleChange}
                placeholder={field.placeholder}
              />
            </label>
          );

        case 'select':
        case 'dropdown':
          return (
            <label key={field.name}>
              {field.label}:
              <select value={value} onChange={handleChange}>
                {field.options?.map(opt => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </label>
          );

        case 'textarea':
          return (
            <label key={field.name}>
              {field.label}:
              <textarea
                value={value}
                onChange={handleChange}
                placeholder={field.placeholder}
                rows={field.rows || 3}
              />
            </label>
          );

        case 'checkbox':
          return (
            <label key={field.name}>
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => {
                  setValue(e.target.checked);
                  if (onFieldChange) {
                    onFieldChange(id, field.name, e.target.checked);
                  }
                }}
              />
              {field.label}
            </label>
          );

        case 'range':
          return (
            <label key={field.name}>
              {field.label}: {value}
              <input
                type="range"
                min={field.min || 0}
                max={field.max || 100}
                value={value}
                onChange={handleChange}
              />
            </label>
          );

        case 'color':
          return (
            <label key={field.name}>
              {field.label}:
              <input
                type="color"
                value={value}
                onChange={handleChange}
              />
            </label>
          );

        default:
          return null;
      }
    };

    return (
      <BaseNode
        id={id}
        data={data}
        title={title}
        handles={processedHandles}
        width={width}
        height={height}
        additionalStyles={{ backgroundColor }}
      >
        {fields.map(renderField)}
        {children && children({ id, data, fieldStates })}
      </BaseNode>
    );
  };
};


