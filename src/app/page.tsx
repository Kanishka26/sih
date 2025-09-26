
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // In a real app, you would check for an authentication token.
    // For this mock app, we'll just redirect to the login page.
    router.replace('/login');
  }, [router]);

  // You can show a loader here while redirecting
  return (
    <div className="flex h-screen items-center justify-center">
      <p>Loading...</p>
    </div>
  );
}
