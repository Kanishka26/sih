
'use client';

import { DietChartWidget } from '@/components/dashboard/diet-chart-widget';
import { PrakritiProfileWidget } from '@/components/dashboard/prakriti-profile-widget';
import { QuickLogWidget } from '@/components/dashboard/quick-log-widget';
import { RasaBalanceWidget } from '@/components/dashboard/rasa-balance-widget';
import { SeasonalSuggestionsWidget } from '@/components/dashboard/seasonal-suggestions-widget';
import { useAuth } from '@/context/auth-context';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function DashboardPage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <h1 className="text-3xl font-headline font-bold">Welcome to AhaarSetu</h1>
        <p className="text-muted-foreground mt-2 mb-6">
          Please log in to access your personalized Ayurvedic diet companion.
        </p>
        <Button asChild>
          <Link href="/login">Login</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PrakritiProfileWidget />
        </div>
        <div className="space-y-6">
          <RasaBalanceWidget />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
           <DietChartWidget />
        </div>
        <div className="space-y-6">
          <SeasonalSuggestionsWidget />
          <QuickLogWidget />
        </div>
      </div>
    </div>
  );
}
