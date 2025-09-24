import { AppLayout } from '@/components/app-layout';

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppLayout>{children}</AppLayout>;
}
