// components/SQLForm/ColumnEditor.tsx
'use client';

import React from 'react';
import { Column } from './types';

type ColumnEditorProps = {
  tableId: number;
  column: Column;
  onUpdate: (field: keyof Column, value: unknown) => void;
  onRemove: () => void;
};

export function ColumnEditor({column, onUpdate, onRemove }: ColumnEditorProps) {
  return (
    <div className="flex flex-col space-y-2 mb-2 border p-2 rounded">
      <div className="flex flex-col md:flex-row md:space-x-2 text-black">
        <input
          type="text"
          value={column.name}
          onChange={(e) => onUpdate('name', e.target.value)}
          placeholder="Column name"
          className="p-2 border rounded flex-1"
          required
        />
        <select
          value={column.type}
          onChange={(e) => onUpdate('type', e.target.value)}
          className="p-2 border rounded flex-1"
          required
        >
          <option value="">Select type</option>
          <option value="INT">INT</option>
          <option value="VARCHAR(255)">VARCHAR(255)</option>
          <option value="TEXT">TEXT</option>
          <option value="DATE">DATE</option>
          <option value="BOOLEAN">BOOLEAN</option>
          <option value="FLOAT">FLOAT</option>
        </select>
      </div>
      <div className="flex flex-col md:flex-row md:space-x-2 items-center">
        <label className="flex items-center space-x-1">
          <input
            type="checkbox"
            checked={column.primaryKey}
            onChange={(e) => onUpdate('primaryKey', e.target.checked)}
          />
          <span>Primary Key</span>
        </label>
        <input
          type="text"
          value={column.foreignKeyTable}
          onChange={(e) => onUpdate('foreignKeyTable', e.target.value)}
          placeholder="Foreign Key Table"
          className="p-2 border rounded text-black"
        />
        <input
          type="text"
          value={column.foreignKeyColumn}
          onChange={(e) => onUpdate('foreignKeyColumn', e.target.value)}
          placeholder="Foreign Key Column"
          className="p-2 border rounded text-black"
        />
        <button type="button" onClick={onRemove} className="text-red-500">
          Remove Column
        </button>
      </div>
    </div>
  );
}
