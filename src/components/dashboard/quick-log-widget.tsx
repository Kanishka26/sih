import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '../ui/input';
import { Send } from 'lucide-react';
import Link from 'next/link';

export function QuickLogWidget() {
  return (
    <Card className="bg-card text-card-foreground">
      <CardHeader>
        <CardTitle>Quick HealthLog</CardTitle>
        <CardDescription>Log your intake for today.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="food-log">Food Intake</Label>
            <Textarea
              id="food-log"
              placeholder="What did you eat today?"
              rows={3}
              className="bg-background"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="water-log">Water Intake (in liters)</Label>
            <Input
              id="water-log"
              type="number"
              placeholder="e.g., 2.5"
              step="0.1"
              className="bg-background"
            />
          </div>
          <Button asChild type="submit" className="w-full">
            <Link href="/health-log">
              <Send className="mr-2"/>
              Log Habits
            </Link>
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
