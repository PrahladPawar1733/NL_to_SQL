'use server';

import { redirect } from 'next/navigation';

export async function generateSQL(prevState: any, formData: FormData) {
  const schema = formData.get('schema')?.toString();
  const question = formData.get('question')?.toString();

  if (!schema || !question) {
    return { error: 'Both schema and question are required' };
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ schema, question }),
  });

  if (!response.ok) {
    return { error: 'Failed to generate SQL' };
  }

  const { sql } = await response.json();
  redirect(`/result?sql=${encodeURIComponent(sql ?? '')}`);
}
