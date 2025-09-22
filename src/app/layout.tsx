import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { AppLayout } from '@/components/app-layout';
import { LanguageProvider } from '@/context/language-context';

export const metadata: Metadata = {
  title: 'AhaarSetu - Your Ayurvedic Diet Companion',
  description: 'A modern, beautiful, and feature-rich Ayurvedic diet planning web app.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Alegreya:ital,wght@0,400..900;1,400..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={cn('antialiased')}>
        <LanguageProvider>
          <AppLayout>{children}</AppLayout>
        </LanguageProvider>
        <Toaster />
      </body>
    </html>
  );
}
