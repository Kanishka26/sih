import { DietChartWidget } from '@/components/dashboard/diet-chart-widget';
import { QuickLogWidget } from '@/components/dashboard/quick-log-widget';
import { RasaBalanceWidget } from '@/components/dashboard/rasa-balance-widget';
import { SeasonalSuggestionsWidget } from '@/components/dashboard/seasonal-suggestions-widget';

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
      <div className="flex flex-col gap-8 md:col-span-2">
        <DietChartWidget />
        <RasaBalanceWidget />
      </div>
      <div className="flex flex-col gap-8 md:col-span-1">
        <SeasonalSuggestionsWidget />
        <QuickLogWidget />
      </div>
    </div>
  );
}
