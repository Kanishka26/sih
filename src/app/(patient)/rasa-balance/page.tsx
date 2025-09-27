
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
import { Loader2, Sparkles, Trash2, XIcon, PlusCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { analyzeMealRasasAction } from '@/lib/actions';
import { type AnalyzeMealRasasOutput } from '@/ai/flows/analyze-meal-rasas';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const initialChartData = {
  'Madhura (Sweet)': 0,
  'Amla (Sour)': 0,
  'Lavana (Salty)': 0,
  'Katu (Pungent)': 0,
  'Tikta (Bitter)': 0,
  'Kashaya (Astringent)': 0,
};

const chartConfig = {
  value: { label: 'Balance' },
  'Madhura (Sweet)': { color: '#FF6B9D' },        // Sweet pink for sweetness
  'Amla (Sour)': { color: '#FFA500' },           // Orange for sourness (citrus)
  'Lavana (Salty)': { color: '#4A90E2' },        // Blue for saltiness (ocean)
  'Katu (Pungent)': { color: '#FF4444' },        // Red for heat/pungency
  'Tikta (Bitter)': { color: '#8B4513' },        // Brown for bitterness (coffee/chocolate)
  'Kashaya (Astringent)': { color: '#9B59B6' },  // Purple for astringency
};

const commonFoods = ['Rice', 'Lentils (Dal)', 'Ghee', 'Apple', 'Spinach', 'Milk', 'Ginger', 'Turmeric'];

export default function RasaBalancePage() {
  const [foodInput, setFoodInput] = useState('');
  const [foodItems, setFoodItems] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const [analysisResult, setAnalysisResult] = useState<AnalyzeMealRasasOutput | null>(null);

  const addFoodItem = (food: string) => {
    if (food.trim() && !foodItems.includes(food.trim().toLowerCase())) {
      setFoodItems([...foodItems, food.trim().toLowerCase()]);
    }
  };

  const handleAddFood = () => {
    addFoodItem(foodInput);
    setFoodInput('');
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
      setAnalysisResult(null);
      try {
        const result = await analyzeMealRasasAction({ foodItems });
        setAnalysisResult(result);
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
    const rasaBalance = analysisResult ? {
        'Madhura (Sweet)': analysisResult['Madhura (Sweet)'],
        'Amla (Sour)': analysisResult['Amla (Sour)'],
        'Lavana (Salty)': analysisResult['Lavana (Salty)'],
        'Katu (Pungent)': analysisResult['Katu (Pungent)'],
        'Tikta (Bitter)': analysisResult['Tikta (Bitter)'],
        'Kashaya (Astringent)': analysisResult['Kashaya (Astringent)'],
    } : initialChartData;

    const data = Object.entries(rasaBalance).map(([name, value]) => ({
      name,
      value: value || 0,
      fill: (chartConfig[name as keyof typeof chartConfig] as any)?.color || 'hsl(var(--muted))',
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
  }, [analysisResult]);

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
          <CardTitle>Log Your Meal</CardTitle>
          <CardDescription>Enter the foods you ate to see the rasa balance.</CardDescription>
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
            <Label>Quick Add Common Foods</Label>
            <div className="flex flex-wrap gap-2">
              {commonFoods.map(food => (
                <Button key={food} variant="outline" size="sm" onClick={() => addFoodItem(food)} disabled={foodItems.includes(food.toLowerCase())}>
                   <PlusCircle className="mr-2 h-4 w-4"/> {food}
                </Button>
              ))}
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
        <CardFooter className="flex-col gap-4">
              <Button onClick={handleAnalyzeMeal} disabled={isPending || foodItems.length === 0} className="w-full">
                {isPending ? <Loader2 className="animate-spin mr-2"/> : <Sparkles className="mr-2"/>}
                Analyze Rasa Balance
            </Button>
            {foodItems.length > 0 && (
                <Button variant="outline" className="w-full" onClick={() => {
                setFoodItems([]);
                setAnalysisResult(null);
              }}>
                <Trash2 className="mr-2" />
                Clear Meal
              </Button>
            )}
        </CardFooter>
      </Card>

      {isPending ? (
        <Card>
            <CardContent className="flex items-center justify-center h-[400px] flex-col gap-4">
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
                <p className="text-muted-foreground">Analyzing your meal...</p>
            </CardContent>
        </Card>
      ) : (
          <Card>
              <CardHeader>
              <CardTitle>Your Rasa Balance</CardTitle>
              <CardDescription>
                  {analysisResult ? (
                    <>
                      Your six-taste balance score for this meal is{' '}
                      <span className="text-primary font-bold text-lg">{balanceScore}</span>.
                    </>
                  ) : (
                       "Add food items to your meal to see your balance score."
                  )}
              </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
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

                   {analysisResult?.recommendation && (
                    <Alert>
                      <Sparkles className="h-4 w-4" />
                      <AlertTitle>Recommendation</AlertTitle>
                      <AlertDescription>
                        {analysisResult.recommendation}
                      </AlertDescription>
                    </Alert>
                  )}
              </CardContent>
          </Card>
      )}

    </div>
  );
}
