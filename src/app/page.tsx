
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    // For this mock app, we always redirect to the login page from the root.
    // A real app would have more complex logic to check for an existing auth session.
    router.replace('/login');
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <p>Redirecting to login...</p>
    </div>
  );
}
