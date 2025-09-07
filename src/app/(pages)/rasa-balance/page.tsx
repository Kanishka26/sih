'use client';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

const chartData = [
  { name: 'Madhura (Sweet)', value: 86, fill: 'var(--color-sweet)' },
  { name: 'Amla (Sour)', value: 65, fill: 'var(--color-sour)' },
  { name: 'Lavana (Salty)', value: 45, fill: 'var(--color-salty)' },
  { name: 'Katu (Pungent)', value: 73, fill: 'var(--color-pungent)' },
  { name: 'Tikta (Bitter)', value: 90, fill: 'var(--color-bitter)' },
  { name: 'Kashaya (Astringent)', value: 55, fill: 'var(--color-astringent)' },
];

const chartConfig = {
  value: {
    label: 'Balance',
  },
  sweet: {
    label: 'Sweet',
    color: 'hsl(var(--chart-1))',
  },
  sour: {
    label: 'Sour',
    color: 'hsl(var(--chart-2))',
  },
  salty: {
    label: 'Salty',
    color: 'hsl(var(--chart-3))',
  },
  pungent: {
    label: 'Pungent',
    color: 'hsl(var(--chart-4))',
  },
  bitter: {
    label: 'Bitter',
    color: 'hsl(var(--chart-5))',
  },
  astringent: {
    label: 'Astringent',
    color: 'hsl(var(--primary))',
  },
};

export default function RasaBalancePage() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
       <div className="text-center">
        <h1 className="text-3xl font-headline font-bold">
          RasaBalance (रस संतुलन)
        </h1>
        <p className="text-muted-foreground">
          Track the six tastes in your meals to maintain harmony.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Today's Rasa Balance</CardTitle>
          <CardDescription>
            Your six-taste balance score for today is{' '}
            <span className="text-primary font-bold text-lg">72</span>.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="w-full h-[400px]">
            <BarChart
              data={chartData}
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
