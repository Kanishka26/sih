
import type { ReactNode } from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
} from '@/components/ui/sidebar';
import { AppHeader } from '@/components/app-header';
import { AppFooter } from '@/components/app-footer';
import { DieticianSidebar } from '@/components/dietician-sidebar';

export default function DieticianLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar>
        <DieticianSidebar />
      </Sidebar>
      <SidebarInset className="min-h-screen flex flex-col">
        <AppHeader />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
        <AppFooter />
      </SidebarInset>
    </SidebarProvider>
  );
}
