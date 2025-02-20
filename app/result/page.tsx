'use client';

import { Suspense, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

function ResultContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sql = searchParams.get('sql');

  useEffect(() => {
    if (!sql) {
      router.push('/');
    }
  }, [sql, router]);

  if (!sql) {
    return <div>Redirecting...</div>;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Generated SQL</h2>
      <pre className="p-4 bg-gray-100 rounded overflow-x-auto">
        <code className="text-sm language-sql text-black">
          {decodeURIComponent(sql)}
        </code>
      </pre>
      
      <Link 
        href="/"
        className="mt-6 inline-block bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
      >
        New Query
      </Link>
    </div>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultContent />
    </Suspense>
  );
}