import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Leaf } from 'lucide-react';

const seasonalFoods = [
  { name: 'Mango', reason: 'Cools the body' },
  { name: 'Cucumber', reason: 'Hydrating' },
  { name: 'Watermelon', reason: 'Rich in water content' },
  { name: 'Mint', reason: 'Refreshing' },
];

export function SeasonalSuggestionsWidget() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>SeasonalBhojan (ऋतु आहार)</CardTitle>
        <CardDescription>Summer Recommendations</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-40 rounded-lg overflow-hidden mb-4">
          <Image
            src="https://picsum.photos/600/400"
            alt="Summer fruits"
            data-ai-hint="summer fruits"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <ul className="space-y-3">
          {seasonalFoods.map((food) => (
            <li key={food.name} className="flex items-center gap-3">
              <div className="bg-accent/50 p-2 rounded-full">
                <Leaf className="w-5 h-5 text-accent-foreground" />
              </div>
              <div>
                <p className="font-semibold">{food.name}</p>
                <p className="text-sm text-muted-foreground">{food.reason}</p>
              </div>
            </li>
          ))}
        </ul>
        <Button asChild className="w-full mt-4">
          <Link href="/seasonal-bhojan">Get More Suggestions</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
