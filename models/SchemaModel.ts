import mongoose, { Schema, Document } from 'mongoose';

interface Column {
  name: string;
  type: string;
  primaryKey: boolean;
  foreignKeyTable?: string;
  foreignKeyColumn?: string;
}

interface Table {
  name: string;
  columns: Column[];
}

export interface SchemaDocument extends Document {
  userId: string;
  tables: string;
  prompt: string;
  response: string;
  createdAt: Date;
}

const SchemaSchema = new Schema<SchemaDocument>({
  userId: { type: String, required: true },
  tables: [
    {
      name: { type: String, required: true },
      columns: [
        {
          name: { type: String, required: true },
          type: { type: String, required: true },
          primaryKey: { type: Boolean, default: false },
          foreignKeyTable: String,
          foreignKeyColumn: String,
        },
      ],
    },
  ],
  prompt: { type: String, required: true },
  response: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const SchemaModel =
  mongoose.models.SchemaModel || mongoose.model<SchemaDocument>("SchemaModel", SchemaSchema);

export default SchemaModel;
