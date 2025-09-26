
'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '../ui/input';
import { Send } from 'lucide-react';
import { useHealthLog } from '@/context/health-log-context';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';


export function QuickLogWidget() {
  const { addLog } = useHealthLog();
  const { toast } = useToast();
  const [foodLog, setFoodLog] = useState('');
  const [waterLog, setWaterLog] = useState('');

  const handleQuickLog = () => {
     if (!foodLog && !waterLog) {
        toast({
            title: "Empty Log",
            description: "Please fill out at least one field to save your log.",
            variant: "destructive"
        });
        return;
    }

    const newLog = {
      date: new Date().toISOString().split('T')[0],
      foodIntake: foodLog,
      waterIntake: waterLog ? `${waterLog}L` : '',
      symptoms: '',
      sleepHours: '',
      bowelMovement: '',
      energyLevel: '',
    };
    
    addLog(newLog);

    setFoodLog('');
    setWaterLog('');

    toast({
        title: "Quick Log Saved!",
        description: "Your habits for today have been logged.",
    });
  }

  return (
    <Card className="bg-card text-card-foreground">
      <CardHeader>
        <CardTitle>Quick HealthLog</CardTitle>
        <CardDescription>Log your intake for today.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="food-log">Food Intake</Label>
            <Textarea
              id="food-log"
              placeholder="What did you eat today?"
              rows={3}
              className="bg-background"
              value={foodLog}
              onChange={(e) => setFoodLog(e.target.value)}
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
              value={waterLog}
              onChange={(e) => setWaterLog(e.target.value)}
            />
          </div>
          <Button onClick={handleQuickLog} className="w-full">
              <Send className="mr-2"/>
              Log Habits
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
