'use client';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Soup, GlassWater, Utensils, Apple, Sunset } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Skeleton } from '../ui/skeleton';

// A mock diet plan, in a real app this would be fetched
const pittaDietPlan = [
    { time: '6:00 AM', meal: 'Wake Up', details: 'Drink a glass of warm water', icon: <GlassWater className="h-5 w-5 text-primary" /> },
    { time: '8:00 AM', meal: 'Breakfast', details: 'Oatmeal with sweet berries and a little maple syrup', icon: <Soup className="h-5 w-5 text-primary" /> },
    { time: '12:00 PM', meal: 'Lunch', details: 'Basmati rice with steamed vegetables (broccoli, zucchini) and lentil soup (dal)', icon: <Utensils className="h-5 w-5 text-primary" /> },
    { time: '4:00 PM', meal: 'Snack', details: 'A ripe pear and a handful of soaked (not roasted) almonds', icon: <Apple className="h-5 w-5 text-primary" /> },
    { time: '7:00 PM', meal: 'Dinner', details: 'Light vegetable soup with a side of quinoa', icon: <Sunset className="h-5 w-5 text-primary" /> },
];

const vataDietPlan = [
    { time: '6:30 AM', meal: 'Wake Up', details: 'Warm water with a slice of ginger', icon: <GlassWater className="h-5 w-5 text-primary" /> },
    { time: '8:30 AM', meal: 'Breakfast', details: 'Cooked cream of rice or wheat with ghee and cinnamon', icon: <Soup className="h-5 w-5 text-primary" /> },
    { time: '1:00 PM', meal: 'Lunch', details: 'Kichari (mung beans and rice) with root vegetables', icon: <Utensils className="h-5 w-5 text-primary" /> },
    { time: '4:30 PM', meal: 'Snack', details: 'Warm spiced milk with a date', icon: <Apple className="h-5 w-5 text-primary" /> },
    { time: '6:30 PM', meal: 'Dinner', details: 'Hearty vegetable stew with a piece of whole-wheat bread', icon: <Sunset className="h-5 w-5 text-primary" /> },
];

const kaphaDietPlan = [
    { time: '7:00 AM', meal: 'Wake Up', details: 'Warm water with lemon and honey', icon: <GlassWater className="h-5 w-5 text-primary" /> },
    { time: '9:00 AM', meal: 'Breakfast', details: 'Stewed apples with cinnamon and cloves (if hungry)', icon: <Soup className="h-5 w-5 text-primary" /> },
    { time: '1:00 PM', meal: 'Lunch', details: 'Millet with steamed greens (kale, spinach) and spicy lentil soup', icon: <Utensils className="h-5 w-5 text-primary" /> },
    { time: '5:00 PM', meal: 'Snack', details: 'Spiced herbal tea and a small handful of pumpkin seeds', icon: <Apple className="h-5 w-5 text-primary" /> },
    { time: '7:00 PM', meal: 'Dinner', details: 'Clear vegetable soup with lots of ginger and black pepper', icon: <Sunset className="h-5 w-5 text-primary" /> },
];

export function DietChartWidget() {
  const [dietPlan, setDietPlan] = useState<any[] | null>(null);

  useEffect(() => {
    // In a real app, you'd fetch the specific chart. Here we mock it based on a default.
    const prakriti: string = 'Pitta'; 
    
    // Handle combination doshas by using the primary dosha's plan
    if (prakriti === 'Vata' || prakriti === 'Vata-Pitta' || prakriti === 'Vata-Kapha') {
      setDietPlan(vataDietPlan);
    } else if (prakriti === 'Kapha' || prakriti === 'Pitta-Kapha') {
      setDietPlan(kaphaDietPlan);
    } else if (prakriti === 'Tridoshic') {
      // For Tridoshic, use a balanced approach (Pitta plan as baseline)
      setDietPlan(pittaDietPlan);
    } else {
      // Default to Pitta plan for Pitta and unknown types
      setDietPlan(pittaDietPlan);
    }
  }, []);


  return (
    <Card className="bg-card text-card-foreground">
      <CardHeader>
        <CardTitle>Today's Diet Chart</CardTitle>
        <CardDescription>
          A balanced plan for your Pitta-dominant prakriti.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!dietPlan ? (
             <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center gap-4 p-2">
                        <Skeleton className="h-8 w-20 rounded-md" />
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <div className="flex-1 space-y-2">
                           <Skeleton className="h-4 w-1/4" />
                           <Skeleton className="h-4 w-3/4" />
                        </div>
                    </div>
                ))}
             </div>
        ) : (
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead className="w-[100px]">Time</TableHead>
                <TableHead>Meal</TableHead>
                <TableHead>Details</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {dietPlan.map((item) => (
                <TableRow key={item.time}>
                    <TableCell>
                    <Badge variant="outline" className="text-sm font-normal">{item.time}</Badge>
                    </TableCell>
                    <TableCell>
                    <div className="flex items-center gap-3">
                        <div className='hidden sm:block p-2 bg-primary/10 rounded-full'>{item.icon}</div>
                        <p className="font-semibold">{item.meal}</p>
                    </div>
                    </TableCell>
                    <TableCell>
                    <p className="text-foreground/80">{item.details}</p>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        )}
      </CardContent>
    </Card>
  );
}
