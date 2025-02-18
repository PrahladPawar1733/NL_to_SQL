"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { SQLForm } from "@/components/SQLForm/sql-form";

export default function Home() {
  const { data: session } = useSession();

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Natural Language to SQL Converter</h1>
        {session ? (
          <div className="flex items-center space-x-4">
            <span className="text-white">{session.user?.name}</span>
            <button
              onClick={() => signOut()}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <button
            onClick={() => signIn("google")}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Sign In with Google
          </button>
        )}
      </div>

      {session ? <SQLForm /> : <p className="text-gray-600">Please sign in to use the tool.</p>}
    </main>
  );
}
