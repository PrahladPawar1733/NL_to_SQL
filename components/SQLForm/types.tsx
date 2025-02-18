// components/SQLForm/types.ts

export type Column = {
    id: number;
    name: string;
    type: string;
    primaryKey: boolean;
    foreignKeyTable: string;
    foreignKeyColumn: string;
  };
  
  export type Table = {
    id: number;
    name: string;
    columns: Column[];
  };
  