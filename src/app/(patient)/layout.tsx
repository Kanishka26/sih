

import { AppLayout } from '@/components/app-layout';
import { HealthLogProvider } from '@/context/health-log-context';
import { UserProvider } from '@/context/user-context';

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>
      <AppLayout>
        <HealthLogProvider>{children}</HealthLogProvider>
      </AppLayout>
    </UserProvider>
  );
}
