'use client';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Label } from '@/components/ui/label';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { useState, useMemo, useTransition } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, Sparkles, Trash2, XIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { analyzeMealRasasAction } from '@/lib/actions';
import { type RasaBalance } from '@/ai/flows/analyze-meal-rasas';

const initialChartData: RasaBalance = {
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
  const [foodInput, setFoodInput] = useState('');
  const [foodItems, setFoodItems] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const [rasaResult, setRasaResult] = useState<RasaBalance | null>(null);

  const handleAddFood = () => {
    if (foodInput.trim() && !foodItems.includes(foodInput.trim().toLowerCase())) {
      setFoodItems([...foodItems, foodInput.trim().toLowerCase()]);
      setFoodInput('');
    }
  };

  const handleRemoveFood = (itemToRemove: string) => {
    setFoodItems(foodItems.filter(item => item !== itemToRemove));
  };
  
  const handleAnalyzeMeal = () => {
    if (foodItems.length === 0) {
      toast({
        title: 'No foods to analyze',
        description: 'Please add at least one food item.',
        variant: 'destructive',
      });
      return;
    }
    startTransition(async () => {
      setRasaResult(null);
      try {
        const result = await analyzeMealRasasAction({ foodItems });
        setRasaResult(result.rasaBalance);
      } catch (error) {
        toast({
          title: 'Error Analyzing Meal',
          description: 'Could not get the rasa balance. Please try again.',
          variant: 'destructive',
        });
      }
    });
  };

  const { chartData, balanceScore } = useMemo(() => {
    const data = Object.entries(rasaResult || initialChartData).map(([name, value]) => ({
      name,
      value,
      fill: chartConfig[name as keyof typeof chartConfig]?.color,
    }));
    
    const totalPoints = data.reduce((acc, curr) => acc + curr.value, 0);
    const numRasasPresent = data.filter(d => d.value > 0).length;

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
  }, [rasaResult]);

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
              <CardDescription>Enter the foods you ate.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="food-input">Food Item</Label>
                <div className="flex gap-2">
                  <Input 
                    id="food-input"
                    placeholder="e.g., Apple, Rice"
                    value={foodInput}
                    onChange={(e) => setFoodInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddFood()}
                  />
                  <Button onClick={handleAddFood} size="sm">Add</Button>
                </div>
              </div>
              <div className="space-y-2">
                  <Label>Your Meal Items</Label>
                  <div className="flex flex-wrap gap-2 min-h-[40px] p-2 border rounded-md bg-background">
                      {foodItems.length === 0 && <p className="text-sm text-muted-foreground">No items added yet.</p>}
                      {foodItems.map(item => (
                          <Badge key={item} variant="secondary" className="capitalize">
                              {item}
                              <button onClick={() => handleRemoveFood(item)} className="ml-2 rounded-full hover:bg-muted-foreground/20">
                                  <XIcon className="h-3 w-3" />
                              </button>
                          </Badge>
                      ))}
                  </div>
              </div>
            </CardContent>
            <CardFooter>
                 <Button onClick={handleAnalyzeMeal} disabled={isPending || foodItems.length === 0} className="w-full">
                    {isPending ? <Loader2 className="animate-spin mr-2"/> : <Sparkles className="mr-2"/>}
                    Analyze Rasa Balance
                </Button>
            </CardFooter>
          </Card>
        </div>
        <div className="md:col-span-3">
            <Card>
                <CardHeader>
                <CardTitle>Today's Rasa Balance</CardTitle>
                <CardDescription>
                    Your six-taste balance score for this meal is{' '}
                    <span className="text-primary font-bold text-lg">{balanceScore}</span>.
                </CardDescription>
                </CardHeader>
                <CardContent>
                {isPending ? (
                    <div className="flex items-center justify-center h-[400px]">
                        <Loader2 className="w-10 h-10 animate-spin text-primary" />
                    </div>
                ) : (
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
                )}
                </CardContent>
                 <CardFooter>
                  <Button variant="outline" className="ml-auto" onClick={() => {
                    setFoodItems([]);
                    setRasaResult(null);
                  }}>
                    <Trash2 className="mr-2" />
                    Clear Meal
                  </Button>
                </CardFooter>
            </Card>
        </div>
      </div>
    </div>
  );
}
