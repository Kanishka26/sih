import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '../ui/input';

export function QuickLogWidget() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick HealthLog (स्वास्थ्य लॉग)</CardTitle>
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
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="water-log">Water Intake (in liters)</Label>
            <Input
              id="water-log"
              type="number"
              placeholder="e.g., 2.5"
              step="0.1"
            />
          </div>
          <Button type="submit" className="w-full">
            Log Habits
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
