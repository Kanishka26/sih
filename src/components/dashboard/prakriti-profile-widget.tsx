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
  const prakriti: string = "Pitta"; 
  
  const getRecommendation = (prakritiType: string) => {
    switch (prakritiType) {
      case 'Vata':
        return "Focus on warm, moist, grounding foods like soups, stews, and cooked grains. Avoid cold, dry, and raw foods.";
      case 'Pitta':
        return "Focus on cooling foods like cucumber, milk, and rice. Avoid spicy and oily foods.";
      case 'Kapha':
        return "Choose light, warm, and spicy foods. Limit dairy, sweets, and heavy foods.";
      case 'Vata-Pitta':
        return "Balance cooling foods for Pitta with warm preparations for Vata. Avoid extremes of hot/cold and dry foods.";
      case 'Pitta-Kapha':
        return "Use cooling, light foods with warming spices. Avoid heavy, oily, and overly spicy dishes.";
      case 'Vata-Kapha':
        return "Focus on warm, light, easily digestible foods with moderate spicing. Avoid cold, heavy foods.";
      case 'Tridoshic':
        return "Maintain balance with seasonal eating - cooling foods in summer, warming in winter, and light foods in spring.";
      default:
        return "Consult an Ayurvedic practitioner for personalized dietary recommendations.";
    }
  };
  
  const recommendation = getRecommendation(prakriti);

  const getPrakritiInfo = () => {
    switch (prakriti) {
      case 'Vata':
        return { icon: <Wind className="w-8 h-8 text-teal" />, color: 'bg-teal/10' };
      case 'Pitta':
        return { icon: <Flame className="w-8 h-8 text-rose" />, color: 'bg-rose/10' };
      case 'Kapha':
        return { icon: <Leaf className="w-8 h-8 text-sunny-yellow" />, color: 'bg-sunny-yellow/10' };
      case 'Vata-Pitta':
        return { icon: <div className="flex -space-x-2"><Wind className="w-6 h-6 text-teal" /><Flame className="w-6 h-6 text-rose" /></div>, color: 'bg-gradient-to-r from-teal/10 to-rose/10' };
      case 'Pitta-Kapha':
        return { icon: <div className="flex -space-x-2"><Flame className="w-6 h-6 text-rose" /><Leaf className="w-6 h-6 text-sunny-yellow" /></div>, color: 'bg-gradient-to-r from-rose/10 to-sunny-yellow/10' };
      case 'Vata-Kapha':
        return { icon: <div className="flex -space-x-2"><Wind className="w-6 h-6 text-teal" /><Leaf className="w-6 h-6 text-sunny-yellow" /></div>, color: 'bg-gradient-to-r from-teal/10 to-sunny-yellow/10' };
      case 'Tridoshic':
        return { icon: <div className="flex -space-x-1"><Wind className="w-5 h-5 text-teal" /><Flame className="w-5 h-5 text-rose" /><Leaf className="w-5 h-5 text-sunny-yellow" /></div>, color: 'bg-gradient-to-r from-teal/10 via-rose/10 to-sunny-yellow/10' };
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
