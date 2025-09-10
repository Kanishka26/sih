
'use client';

import { DietChartWidget } from '@/components/dashboard/diet-chart-widget';
import { PrakritiProfileWidget } from '@/components/dashboard/prakriti-profile-widget';
import { QuickLogWidget } from '@/components/dashboard/quick-log-widget';
import { RasaBalanceWidget } from '@/components/dashboard/rasa-balance-widget';
import { SeasonalSuggestionsWidget } from '@/components/dashboard/seasonal-suggestions-widget';

export default function DashboardPage() {
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
