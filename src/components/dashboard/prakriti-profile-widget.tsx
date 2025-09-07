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

export function PrakritiProfileWidget() {
  const prakriti = "Pitta";
  const recommendation = "Focus on cooling foods like cucumber, milk, and rice. Avoid spicy and oily foods.";

  const getPrakritiIcon = () => {
    switch (prakriti) {
      case 'Vata':
        return <Wind className="w-8 h-8 text-primary" />;
      case 'Pitta':
        return <Flame className="w-8 h-8 text-primary" />;
      case 'Kapha':
        return <Leaf className="w-8 h-8 text-primary" />;
      default:
        return <Leaf className="w-8 h-8 text-primary" />;
    }
  };

  return (
    <Card className="bg-card text-card-foreground">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-4">
            <div className='p-3 bg-primary/10 rounded-full'>
                {getPrakritiIcon()}
            </div>
            <div>
                <CardTitle>Your Prakriti Profile</CardTitle>
                <CardDescription>Your dominant dosha is Pitta.</CardDescription>
            </div>
        </div>
        <Badge variant="secondary" className="text-lg bg-primary/20 text-primary">{prakriti}</Badge>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          {recommendation}
        </p>
      </CardContent>
      <CardFooter>
          <Button asChild variant="outline">
              <Link href="/prakriti-scan">Re-take the PrakritiScan Test</Link>
          </Button>
      </CardFooter>
    </Card>
  );
}
