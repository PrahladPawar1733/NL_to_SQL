'use server';

import { redirect } from 'next/navigation';

export async function generateSQL(prevState: unknown, formData: FormData) {
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

  const handleSubmit = async () => { 
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/saveSchema`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        schema,
        prompt: question,
        response: sql
      }),
    });
  
    const result = await response.json()
    console.log(result);
    if (response.ok) {
      console.log("Schema saved successfully!");
    } else {
      console.log("Error: " + result.error);
    }
  };
  handleSubmit();
  
  redirect(`/result?sql=${encodeURIComponent(sql ?? '')}`);
}
