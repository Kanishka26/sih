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
  HeartPulse,
  Scale,
  ClipboardEdit,
  ChefHat,
  ClipboardList,
  SunSnow,
  BookOpen,
} from 'lucide-react';
import { Logo } from './logo';
import { Button } from './ui/button';

const menuItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/prakriti-scan', label: 'PrakritiScan', hindi: 'प्रकृति स्कैन', icon: HeartPulse },
  { href: '/diet-genie', label: 'DietGenie', hindi: 'आहार चार्ट', icon: ClipboardEdit },
  { href: '/seasonal-bhojan', label: 'SeasonalBhojan', hindi: 'ऋतु आहार', icon: SunSnow },
  { href: '/recipe-guru', label: 'RecipeGuru', hindi: 'विधान गुरु', icon: ChefHat },
  { href: '/nutrient-vault', label: 'NutrientVault', hindi: 'पोषण भंडार', icon: BookOpen },
  { href: '/health-log', label: 'HealthLog', hindi: 'स्वास्थ्य लॉग', icon: ClipboardList },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Logo className="w-8 h-8 text-primary" />
          <span className="font-headline text-xl font-semibold">Sentinix</span>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} legacyBehavior passHref>
                <SidebarMenuButton
                  as="a"
                  isActive={pathname === item.href}
                  tooltip={item.label}
                >
                  <item.icon />
                  <span>
                    {item.label}{' '}
                    {item.hindi && (
                      <span className="text-muted-foreground text-xs">
                        ({item.hindi})
                      </span>
                    )}
                  </span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
         <SidebarMenu>
            <SidebarMenuItem>
                <Link href="/rasa-balance-info" legacyBehavior passHref>
                    <SidebarMenuButton as="a" isActive={pathname === '/rasa-balance-info'} tooltip="RasaBalance">
                        <Scale/>
                        <span>RasaBalance <span className="text-muted-foreground text-xs">(रस संतुलन)</span></span>
                    </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
         </SidebarMenu>
      </SidebarFooter>
    </>
  );
}
