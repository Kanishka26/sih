
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Users,
  BarChart,
  Home,
} from 'lucide-react';
import { Logo } from './logo';
import { useLanguage } from '@/context/language-context';

const menuItems = [
  { href: '/', label: { en: 'Home', hi: 'होम' }, icon: Home },
  { href: '/dietician-dashboard', label: {en: 'Dashboard', hi: 'डैशबोर्ड'}, icon: LayoutDashboard },
  { href: '#', label: {en: 'Patients', hi: 'मरीजों'}, icon: Users },
  { href: '#', label: {en: 'Reports', hi: 'रिपोर्ट'}, icon: BarChart },
];

export function DieticianSidebar() {
  const pathname = usePathname();
  const { t } = useLanguage();

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Logo className="w-9 h-9 text-primary" />
          <span className="font-headline text-2xl font-bold tracking-tight">AhaarSetu</span>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={t(item.label)}
                className="justify-start"
              >
                <Link href={item.href}>
                  <item.icon />
                  <span className="font-medium text-base">
                    {t(item.label)}
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4 text-center text-xs text-muted-foreground/80">
        <p>🌿 Dietician Portal</p>
      </SidebarFooter>
    </>
  );
}
