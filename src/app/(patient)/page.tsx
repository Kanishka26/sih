
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PatientRootPage() {
  const router = useRouter();

  useEffect(() => {
    // In a real app, you would check for an authentication token.
    // For this mock app, we'll just redirect to the login page if not authenticated.
    // We are assuming a simple check here. A real app would have a robust auth state check.
    const isLoggedIn = true; // This would be a real check.
    
    if (!isLoggedIn) {
        router.replace('/login');
    } else {
        router.replace('/'); // Redirect to the main dashboard
    }
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <p>Loading...</p>
    </div>
  );
}
