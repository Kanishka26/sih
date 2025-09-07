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

const menuItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/prakriti-scan', label: 'PrakritiScan', hindi: 'प्रकृति स्कैन', icon: HeartPulse },
  { href: '/rasa-balance', label: 'RasaBalance', hindi: 'रस संतुलन', icon: Scale },
  { href: '/diet-genie', label: 'DietGenie', hindi: 'आहार चार्ट', icon: ClipboardEdit },
  { href: '/recipe-guru', label: 'RecipeGuru', hindi: 'विधान गुरु', icon: ChefHat },
  { href: '/nutrient-vault', label: 'NutrientVault', hindi: 'पोषण भंडार', icon: BookOpen },
  { href: '/health-log', label: 'HealthLog', hindi: 'स्वास्थ्य लॉग', icon: ClipboardList },
  { href: '/seasonal-bhojan', label: 'SeasonalBhojan', hindi: 'ऋतु आहार', icon: SunSnow },
];

export function AppSidebar() {
  const pathname = usePathname();

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
              <Link href={item.href} legacyBehavior passHref>
                <SidebarMenuButton
                  as="a"
                  isActive={pathname === item.href}
                  tooltip={item.label}
                  className="justify-start"
                >
                  <item.icon />
                  <span className="font-medium">
                    {item.label}{' '}
                    {item.hindi && (
                      <span className="text-muted-foreground/80 text-xs">
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
      <SidebarFooter className="p-4 text-center text-xs text-muted-foreground/80">
        <p>© 2024 AhaarSetu. All rights reserved.</p>
      </SidebarFooter>
    </>
  );
}
