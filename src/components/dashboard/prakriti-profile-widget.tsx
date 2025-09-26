'use client';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Flame, Leaf, Wind } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export function PrakritiProfileWidget() {
  // In a real app, this would come from the user's profile
  const prakriti = "Pitta"; 
  const recommendation = "Focus on cooling foods like cucumber, milk, and rice. Avoid spicy and oily foods.";

  const getPrakritiInfo = () => {
    switch (prakriti) {
      case 'Vata':
        return { icon: <Wind className="w-8 h-8 text-teal" />, color: 'bg-teal/10' };
      case 'Pitta':
        return { icon: <Flame className="w-8 h-8 text-rose" />, color: 'bg-rose/10' };
      case 'Kapha':
        return { icon: <Leaf className="w-8 h-8 text-sunny-yellow" />, color: 'bg-sunny-yellow/10' };
      default:
        return { icon: <Leaf className="w-8 h-8 text-primary" />, color: 'bg-primary/10' };
    }
  };

  const prakritiInfo = getPrakritiInfo();

  return (
    <Card className="bg-card text-card-foreground">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-4">
            <div className={cn('p-3 rounded-full', prakritiInfo.color)}>
                {prakritiInfo.icon}
            </div>
            <div>
                <CardTitle>Your Prakriti Profile</CardTitle>
                <CardDescription>Your dominant dosha is {prakriti}.</CardDescription>
            </div>
        </div>
        <Badge variant="secondary" className="text-lg bg-accent text-accent-foreground capitalize">{prakriti}</Badge>
      </CardHeader>
      <CardContent>
        <p className="text-foreground/90">
          {recommendation}
        </p>
      </CardContent>
      <CardFooter>
          <Button asChild variant="outline" size="sm">
              <Link href="/prakriti-scan">Re-take the PrakritiScan Test</Link>
          </Button>
      </CardFooter>
    </Card>
  );
}
