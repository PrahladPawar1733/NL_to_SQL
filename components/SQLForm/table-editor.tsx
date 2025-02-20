// components/SQLForm/TableEditor.tsx
'use client';

import React from 'react';
import { Table, Column } from './types';
import { ColumnEditor } from './column-editor';

type TableEditorProps = {
  table: Table;
  onUpdateTableName: (name: string) => void;
  onRemoveTable: () => void;
  onAddColumn: () => void;
  onUpdateColumn: (columnId: number, field: keyof Column, value: unknown) => void;
  onRemoveColumn: (columnId: number) => void;
};

export function TableEditor({
  table,
  onUpdateTableName,
  onRemoveTable,
  onAddColumn,
  onUpdateColumn,
  onRemoveColumn,
}: TableEditorProps) {
  return (
    <div className="border p-4 rounded">
      <div className="flex justify-between items-center mb-2 text-black">
        <input
          type="text"
          value={table.name}
          onChange={(e) => onUpdateTableName(e.target.value)}
          placeholder="Table name"
          className="p-2 border rounded"
          required
        />
        <button type="button" onClick={onRemoveTable} className="text-red-500">
          Remove Table
        </button>
      </div>
      <div>
        <h4 className="font-semibold mb-1">Columns</h4>
        {table.columns.map((column) => (
          <ColumnEditor
            key={column.id}
            tableId={table.id}
            column={column}
            onUpdate={(field, value) => onUpdateColumn(column.id, field, value)}
            onRemove={() => onRemoveColumn(column.id)}
          />
        ))}
        <button type="button" onClick={onAddColumn} className="text-blue-500">
          Add Column
        </button>
      </div>
    </div>
  );
}