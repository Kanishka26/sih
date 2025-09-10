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
  BookOpen,
  ClipboardList,
  SunSnow,
  Stethoscope,
} from 'lucide-react';
import { Logo } from './logo';

const menuItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/prakriti-scan', label: 'PrakritiScan', icon: HeartPulse },
  { href: '/rasa-balance', label: 'RasaBalance', icon: Scale },
  { href: '/diet-genie', label: 'DietGenie', icon: ClipboardEdit },
  { href: '/recipe-guru', label: 'RecipeGuru', icon: ChefHat },
  { href: '/nutrient-vault', label: 'NutrientVault', icon: BookOpen },
  { href: '/health-log', label: 'HealthLog', icon: ClipboardList },
  { href: '/seasonal-bhojan', label: 'SeasonalBhojan', icon: SunSnow },
  { href: '/dietician-connect', label: 'Dietician Connect', icon: Stethoscope },
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
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={item.label}
                className="justify-start"
              >
                <Link href={item.href}>
                  <item.icon />
                  <span className="font-medium text-base">
                    {item.label}
                  </span>
                </Link>
              </SidebarMenuButton>
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
