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
  Camera
} from 'lucide-react';
import { Logo } from './logo';
import { useLanguage } from '@/context/language-context';

const menuItems = [
  { href: '/', label: {en: 'Dashboard', hi: 'डैशबोर्ड'}, icon: LayoutDashboard },
  { href: '/prakriti-scan', label: {en: 'PrakritiScan', hi: 'प्रकृति स्कैन'}, icon: HeartPulse },
  { href: '/rasa-balance', label: {en: 'RasaBalance', hi: 'रस संतुलन'}, icon: Scale },
  { href: '/diet-genie', label: {en: 'DietGenie', hi: 'आहार जिन्न'}, icon: ClipboardEdit },
  { href: '/recipe-guru', label: {en: 'RecipeGuru', hi: 'विधान गुरु'}, icon: ChefHat },
  { href: '/nutrient-vault', label: {en: 'NutrientVault', hi: 'पोषण भंडार'}, icon: BookOpen },
  { href: '/health-log', label: {en: 'HealthLog', hi: 'स्वास्थ्य लॉग'}, icon: ClipboardList },
  { href: '/seasonal-bhojan', label: {en: 'SeasonalBhojan', hi: 'ऋतु आहार'}, icon: SunSnow },
  { href: '/dietician-connect', label: {en: 'Dietician Connect', hi: 'आहार विशेषज्ञ से जुड़ें'}, icon: Stethoscope },
  { href: '/nutriscan', label: {en: 'NutriScan', hi: 'पोषण स्कैन'}, icon: Camera },
];

export function AppSidebar() {
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
        <p>© 2024 AhaarSetu. All rights reserved.</p>
      </SidebarFooter>
    </>
  );
}
