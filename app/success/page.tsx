// File: app/success/page.tsx (Submitted Data Page)
'use client';

import { useSearchParams } from 'next/navigation';

export default function SuccessPage() {
  const params = useSearchParams();

  return (
    <main className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Submitted Data</h1>
      <div className="bg-white shadow p-4 rounded space-y-2">
        <p><strong>Full Name:</strong> {params.get('fullName')}</p>
        <p><strong>Email:</strong> {params.get('email')}</p>
        <p><strong>Age:</strong> {params.get('age')}</p>
        <p><strong>Gender:</strong> {params.get('gender')}</p>
        <p><strong>Comments:</strong> {params.get('comments')}</p>
      </div>
    </main>
  );
}

