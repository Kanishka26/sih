import { DietChartWidget } from '@/components/dashboard/diet-chart-widget';
import { PrakritiProfileWidget } from '@/components/dashboard/prakriti-profile-widget';
import { QuickLogWidget } from '@/components/dashboard/quick-log-widget';
import { RasaBalanceWidget } from '@/components/dashboard/rasa-balance-widget';
import { SeasonalSuggestionsWidget } from '@/components/dashboard/seasonal-suggestions-widget';

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <PrakritiProfileWidget />
        <DietChartWidget />
      </div>
      <div className="space-y-6">
        <RasaBalanceWidget />
        <SeasonalSuggestionsWidget />
        <QuickLogWidget />
      </div>
    </div>
  );
}
