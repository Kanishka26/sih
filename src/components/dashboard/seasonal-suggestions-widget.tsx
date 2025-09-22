import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Leaf, Sun } from 'lucide-react';

const seasonalFoods = [
  { name: 'Mango', reason: 'Cools the body' },
  { name: 'Cucumber', reason: 'Hydrating' },
  { name: 'Watermelon', reason: 'Rich in water content' },
];

export function SeasonalSuggestionsWidget() {
  return (
    <Card className="bg-card text-card-foreground">
      <CardHeader>
        <div className="flex items-center gap-2">
            <Sun className="w-6 h-6 text-primary"/>
            <CardTitle>SeasonalBhojan (ऋतु आहार)</CardTitle>
        </div>
        <CardDescription>Current Season: <span className="font-semibold text-primary">Summer</span></CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-32 rounded-lg overflow-hidden mb-4">
          <Image
            src="https://picsum.photos/seed/summer/600/400"
            alt="Summer fruits"
            data-ai-hint="summer fruits"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
           <p className="absolute bottom-2 left-3 text-white font-bold text-lg">Summer Bounty</p>
        </div>
        <ul className="space-y-3 mb-4">
          {seasonalFoods.slice(0, 3).map((food) => (
            <li key={food.name} className="flex items-center gap-3">
              <div className="bg-accent/50 p-2 rounded-full">
                <Leaf className="w-4 h-4 text-accent-foreground" />
              </div>
              <div>
                <p className="font-semibold">{food.name}</p>
                <p className="text-sm text-muted-foreground">{food.reason}</p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
          <Button asChild className="w-full" variant="outline">
              <Link href="/seasonal-bhojan">Get More Suggestions</Link>
          </Button>
      </CardFooter>
    </Card>
  );
}
