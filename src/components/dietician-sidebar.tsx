
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
  Calendar,
  FileText,
  MessageCircle,
  Settings,
  HelpCircle
} from 'lucide-react';
import { Logo } from './logo';
import { useLanguage } from '@/context/language-context';

const menuItems = [
  { href: '/dietician/dietician-dashboard', label: {en: 'Dashboard', hi: 'डैशबोर्ड'}, icon: LayoutDashboard },
  { href: '/dietician/patients', label: {en: 'Patients', hi: 'मरीजों'}, icon: Users },
  { href: '/dietician/consultations', label: {en: 'Consultations', hi: 'परामर्श'}, icon: Calendar },
  { href: '/dietician/diet-plans', label: {en: 'Diet Plans', hi: 'आहार योजना'}, icon: FileText },
  { href: '/dietician/analytics', label: {en: 'Analytics', hi: 'विश्लेषण'}, icon: BarChart },
  { href: '/dietician/messages', label: {en: 'Messages', hi: 'संदेश'}, icon: MessageCircle },
];

const bottomMenuItems = [
  { href: '/dietician/settings', label: {en: 'Settings', hi: 'सेटिंग्स'}, icon: Settings },
  { href: '/dietician/help', label: {en: 'Help & Support', hi: 'सहायता'}, icon: HelpCircle },
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
            <SidebarMenuItem key={`${item.href}-${item.label.en}`}>
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
        
        <div className="mt-auto pt-4">
          <SidebarMenu>
            {bottomMenuItems.map((item) => (
              <SidebarMenuItem key={`${item.href}-${item.label.en}`}>
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
        </div>
      </SidebarContent>
      <SidebarFooter className="p-4 text-center text-xs text-muted-foreground/80">
        <p>🌿 Dietician Portal</p>
      </SidebarFooter>
    </>
  );
}
