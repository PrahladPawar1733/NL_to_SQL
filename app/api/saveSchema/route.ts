import { NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';
import SchemaModel from '@/models/SchemaModel';
import { connectDB } from '@/lib/mongodb';

export async function POST(req: Request) {
  await connectDB();

  // Retrieve the session using the server-side helper
  const session = await getServerSession(authOptions);
  // console.log(session);
  // if (!session || !session.user) {
  //   console.log('Unauthorized session:', session);
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // }

  try {
    const { tables, prompt, response: sqlResponse } = await req.json();
    // const userId = session.user.email; // Use email as a unique identifier
    const userId ="aa";
    const newSchema = new SchemaModel({
      userId,
      tables,
      prompt,
      response: sqlResponse,
    });
    await newSchema.save();

    return NextResponse.json({ message: "Schema saved successfully!" });
  } catch (error) {
    console.error("Error saving schema:", error);
    return NextResponse.json({ error: "Failed to save schema" }, { status: 500 });
  }
}
