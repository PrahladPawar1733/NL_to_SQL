// components/SQLForm/SQLForm.tsx
'use client';

import React, { useState } from 'react';
import { useActionState } from 'react';
import { generateSQL } from '@/app/actions';
import { SubmitButton } from '@/components/submit-button';
import { Table, Column } from './types';
import { TableEditor } from './table-editor';
import { useSession } from 'next-auth/react';

export function SQLForm() {
    const { data: session } = useSession();

    if (!session) {
      return <p className="text-gray-600">Please sign in to use the tool.</p>;
    }
  const [state, formAction] = useActionState(generateSQL, { error: '' });
  const [tables, setTables] = useState<Table[]>([]);
  const [tableCounter, setTableCounter] = useState(1);

  // Table operations
  const addTable = () => {
    const newTable: Table = { id: tableCounter, name: '', columns: [] };
    setTables([...tables, newTable]);
    setTableCounter(tableCounter + 1);
  };

  const removeTable = (tableId: number) => {
    setTables(tables.filter((table) => table.id !== tableId));
  };

  const updateTableName = (tableId: number, name: string) => {
    setTables(
      tables.map((table) =>
        table.id === tableId ? { ...table, name } : table
      )
    );
  };

  // Column operations
  const addColumn = (tableId: number) => {
    const newColumn: Column = {
      id: Date.now(), // Simple unique ID
      name: '',
      type: '',
      primaryKey: false,
      foreignKeyTable: '',
      foreignKeyColumn: '',
    };
    setTables(
      tables.map((table) =>
        table.id === tableId
          ? { ...table, columns: [...table.columns, newColumn] }
          : table
      )
    );
  };

  const updateColumn = (
    tableId: number,
    columnId: number,
    field: keyof Column,
    value: any
  ) => {
    setTables(
      tables.map((table) => {
        if (table.id === tableId) {
          const updatedColumns = table.columns.map((column) =>
            column.id === columnId ? { ...column, [field]: value } : column
          );
          return { ...table, columns: updatedColumns };
        }
        return table;
      })
    );
  };

  const removeColumn = (tableId: number, columnId: number) => {
    setTables(
      tables.map((table) => {
        if (table.id === tableId) {
          return { ...table, columns: table.columns.filter((column) => column.id !== columnId) };
        }
        return table;
      })
    );
  };

  // Serialize the schema to pass to the LLM
  const serializedSchema = JSON.stringify({ tables });
  
  return (
    <form action={formAction} className="space-y-6">
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Database Schema</h3>
        <div className="space-y-4">
          {tables.map((table) => (
            <TableEditor
              key={table.id}
              table={table}
              onUpdateTableName={(name) => updateTableName(table.id, name)}
              onRemoveTable={() => removeTable(table.id)}
              onAddColumn={() => addColumn(table.id)}
              onUpdateColumn={(columnId, field, value) => updateColumn(table.id, columnId, field, value)}
              onRemoveColumn={(columnId) => removeColumn(table.id, columnId)}
            />
          ))}
          <button type="button" onClick={addTable} className="text-blue-500">
            Add Table
          </button>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-lg font-semibold mb-2">
          Natural Language Query
        </label>
        <input
          type="text"
          name="question"
          className="w-full p-3 border rounded text-black"
          placeholder="Enter your question (e.g., Show users with orders in January)"
          required
        />
      </div>

      {/* Hidden field with the serialized schema */}
      <input type="hidden" name="schema" value={serializedSchema} />

      {state?.error && <div className="text-red-500 mt-2">Error: {state.error}</div>}

      <SubmitButton />
    </form>
  );
}
