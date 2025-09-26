
import { AppLayout } from '@/components/app-layout';
import { HealthLogProvider } from '@/context/health-log-context';

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppLayout>
      <HealthLogProvider>{children}</HealthLogProvider>
    </AppLayout>
  );
}
