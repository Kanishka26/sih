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
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { useState, useMemo } from 'react';

const foodItems = [
  { id: 'apple', name: 'Apple', rasas: { Madhura: 5, Kashaya: 2 } },
  { id: 'lentils', name: 'Lentils', rasas: { Madhura: 4, Kashaya: 3 } },
  { id: 'rice', name: 'Rice', rasas: { Madhura: 6 } },
  { id: 'spinach', name: 'Spinach', rasas: { Kashaya: 4, Tikta: 2 } },
  { id: 'lemon', name: 'Lemon', rasas: { Amla: 6 } },
  { id: 'salt', name: 'Salt', rasas: { Lavana: 7 } },
  { id: 'chilli', name: 'Chilli', rasas: { Katu: 7 } },
  { id: 'gourd', name: 'Bitter Gourd', rasas: { Tikta: 8 } },
];

const initialRasaTotals = {
  'Madhura (Sweet)': 0,
  'Amla (Sour)': 0,
  'Lavana (Salty)': 0,
  'Katu (Pungent)': 0,
  'Tikta (Bitter)': 0,
  'Kashaya (Astringent)': 0,
};

const chartConfig = {
  value: { label: 'Balance' },
  'Madhura (Sweet)': { color: 'hsl(var(--chart-1))' },
  'Amla (Sour)': { color: 'hsl(var(--chart-2))' },
  'Lavana (Salty)': { color: 'hsl(var(--chart-3))' },
  'Katu (Pungent)': { color: 'hsl(var(--chart-4))' },
  'Tikta (Bitter)': { color: 'hsl(var(--chart-5))' },
  'Kashaya (Astringent)': { color: 'hsl(var(--primary))' },
};

export default function RasaBalancePage() {
  const [selectedFoods, setSelectedFoods] = useState<string[]>([]);
  
  const handleFoodToggle = (foodId: string) => {
    setSelectedFoods(prev => 
      prev.includes(foodId) ? prev.filter(id => id !== foodId) : [...prev, foodId]
    );
  };
  
  const { chartData, balanceScore } = useMemo(() => {
    const rasaTotals = { ...initialRasaTotals };
    let totalPoints = 0;
    let numRasasPresent = 0;

    selectedFoods.forEach(foodId => {
      const food = foodItems.find(f => f.id === foodId);
      if (food) {
        for (const [rasa, value] of Object.entries(food.rasas)) {
          const key = Object.keys(rasaTotals).find(k => k.startsWith(rasa)) as keyof typeof rasaTotals;
          if (key) {
            rasaTotals[key] += value;
          }
        }
      }
    });

    const data = Object.entries(rasaTotals).map(([name, value]) => {
      if (value > 0) {
        totalPoints += value;
        numRasasPresent++;
      }
      return { name, value, fill: chartConfig[name as keyof typeof chartConfig]?.color };
    });

    // Balance Score Calculation
    const idealValue = totalPoints / (numRasasPresent || 1);
    let deviation = 0;
    if (totalPoints > 0) {
      data.forEach(d => {
        if(d.value > 0) deviation += Math.abs(d.value - idealValue);
      });
    }
    const maxDeviation = totalPoints * (numRasasPresent -1) / numRasasPresent + (numRasasPresent > 1 ? totalPoints / numRasasPresent : 0)
    const score = totalPoints === 0 ? 0 : Math.max(0, Math.round(100 - (deviation / (maxDeviation || 1)) * 100));

    return { chartData: data, balanceScore: score };
  }, [selectedFoods]);

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
       <div className="text-center">
        <h1 className="text-3xl font-headline font-bold">
          RasaBalance (रस संतुलन)
        </h1>
        <p className="text-muted-foreground">
          Track the six tastes in your meals to maintain harmony.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Log Your Meal</CardTitle>
              <CardDescription>Select foods you ate today.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {foodItems.map(food => (
                <div key={food.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={food.id} 
                    onCheckedChange={() => handleFoodToggle(food.id)}
                    checked={selectedFoods.includes(food.id)}
                  />
                  <Label htmlFor={food.id} className="cursor-pointer">{food.name}</Label>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-3">
            <Card>
                <CardHeader>
                <CardTitle>Today's Rasa Balance</CardTitle>
                <CardDescription>
                    Your six-taste balance score for today is{' '}
                    <span className="text-primary font-bold text-lg">{balanceScore}</span>.
                </CardDescription>
                </CardHeader>
                <CardContent>
                <ChartContainer config={chartConfig} className="w-full h-[400px]">
                    <BarChart
                    data={chartData}
                    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                    >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="name"
                        stroke="hsl(var(--foreground))"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis
                        stroke="hsl(var(--foreground))"
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
      </div>
    </div>
  );
}
