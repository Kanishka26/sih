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
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PieChart, Pie, Cell } from 'recharts';

const chartData = [
  { name: 'Sweet', value: 400, color: 'hsl(var(--chart-1))' },
  { name: 'Sour', value: 300, color: 'hsl(var(--chart-2))' },
  { name: 'Salty', value: 200, color: 'hsl(var(--chart-3))' },
  { name: 'Pungent', value: 280, color: 'hsl(var(--chart-4))' },
  { name: 'Bitter', value: 189, color: 'hsl(var(--chart-5))' },
  { name: 'Astringent', value: 239, color: 'hsl(var(--primary))' },
];

const chartConfig = {
  value: { label: 'Rasa' },
  'Sweet': { label: 'Sweet', color: 'hsl(var(--chart-1))' },
  'Sour': { label: 'Sour', color: 'hsl(var(--chart-2))' },
  'Salty': { label: 'Salty', color: 'hsl(var(--chart-3))' },
  'Pungent': { label: 'Pungent', color: 'hsl(var(--chart-4))' },
  'Bitter': { label: 'Bitter', color: 'hsl(var(--chart-5))' },
  'Astringent': { label: 'Astringent', color: 'hsl(var(--primary))' },
};

export function RasaBalanceWidget() {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>RasaBalance (रस संतुलन)</CardTitle>
        <CardDescription>
          Today's taste profile. Score: <span className="text-primary font-bold">78/100</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col items-center justify-center pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[250px]"
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
            <ChartLegend
              content={<ChartLegendContent nameKey="name" />}
              className="-mt-4"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
       <CardFooter className="flex-col gap-2 pt-2">
          <Button asChild className="w-full mt-2" variant="outline">
             <Link href="/rasa-balance">View Detailed Balance</Link>
          </Button>
      </CardFooter>
    </Card>
  );
}
