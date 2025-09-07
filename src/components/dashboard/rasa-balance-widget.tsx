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
import {
  RadialBarChart,
  RadialBar,
  Legend,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from 'recharts';

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

export function RasaBalanceWidget() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>RasaBalance (रस संतुलन)</CardTitle>
        <CardDescription>
          Your six-taste balance score for today is 72.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[300px]"
        >
          <RadialBarChart
            data={chartData}
            innerRadius="20%"
            outerRadius="80%"
            startAngle={90}
            endAngle={-270}
          >
            <PolarGrid gridType="circle" />
            <PolarAngleAxis dataKey="name" tick={false} />
            <PolarRadiusAxis tick={false} axisLine={false} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <RadialBar dataKey="value" background cornerRadius={5} />
            <Legend
              iconSize={10}
              layout="vertical"
              verticalAlign="middle"
              align="right"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
