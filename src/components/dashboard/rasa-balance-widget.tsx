'use client';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PieChart, Pie, Cell } from 'recharts';

const chartData = [
  { name: 'Madhura (Sweet)', value: 400, color: 'hsl(var(--chart-1))' },
  { name: 'Amla (Sour)', value: 300, color: 'hsl(var(--chart-2))' },
  { name: 'Lavana (Salty)', value: 200, color: 'hsl(var(--chart-3))' },
  { name: 'Katu (Pungent)', value: 280, color: 'hsl(var(--chart-4))' },
  { name: 'Tikta (Bitter)', value: 189, color: 'hsl(var(--chart-5))' },
  { name: 'Kashaya (Astringent)', value: 239, color: 'hsl(var(--primary))' },
];

const chartConfig = {
  value: { label: 'Rasa' },
  'Madhura (Sweet)': { label: 'Sweet', color: 'hsl(var(--chart-1))' },
  'Amla (Sour)': { label: 'Sour', color: 'hsl(var(--chart-2))' },
  'Lavana (Salty)': { label: 'Salty', color: 'hsl(var(--chart-3))' },
  'Katu (Pungent)': { label: 'Pungent', color: 'hsl(var(--chart-4))' },
  'Tikta (Bitter)': { label: 'Bitter', color: 'hsl(var(--chart-5))' },
  'Kashaya (Astringent)': { label: 'Astringent', color: 'hsl(var(--primary))' },
};

export function RasaBalanceWidget() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>RasaBalance (रस संतुलन)</CardTitle>
        <CardDescription>
          Today's taste profile. Score: <span className="text-primary font-bold">78/100</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square h-[200px]"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="name" hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={50}
              outerRadius={80}
              strokeWidth={2}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
       <CardFooter>
          <Button asChild className="w-full" variant="ghost">
             <Link href="/rasa-balance">View Detailed Balance</Link>
          </Button>
      </CardFooter>
    </Card>
  );
}
