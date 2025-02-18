// app/api/generate/route.ts
import { NextResponse } from "next/server";
import { streamLLMResponse } from "@/lib/replicate-client";

export async function POST(request: Request) {
  try {
    const { schema, question } = await request.json();

    if (!schema || !question) {
      return NextResponse.json(
        { error: "Schema and question are required" },
        { status: 400 }
      );
    }

    const prompt = `Given this database schema:
${JSON.stringify(schema, null, 2)}

Generate a SQL query for: ${question}

Rules:
1. Use explicit JOIN syntax
2. Format dates as 'YYYY-MM-DD'
3. Use table aliases
4. Include only necessary columns
5. Use proper SQL formatting
6. Return ONLY the SQL query, no explanations`;

    const sql = await streamLLMResponse(prompt);

    return NextResponse.json({ sql });
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      { error: "Failed to generate SQL query" },
      { status: 500 }
    );
  }
}