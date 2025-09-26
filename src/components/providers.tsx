'use client';

import { ReactNode } from 'react';
import { UserProvider } from '@/context/user-context';
import { LanguageProvider } from '@/context/language-context';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <UserProvider>
      <LanguageProvider>
        {children}
      </LanguageProvider>
    </UserProvider>
  );
}