'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Save } from 'lucide-react';

export default function HealthLogPage() {
    const { toast } = useToast();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: "Log Saved!",
            description: "Your health log for today has been successfully saved.",
        })
    }
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold">
          HealthLog (स्वास्थ्य लॉग)
        </h1>
        <p className="text-muted-foreground">
          Log your daily habits to track your wellness journey.
        </p>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
            <CardHeader>
            <CardTitle>Daily Health Log</CardTitle>
            <CardDescription>
                Fill in the details for today. Consistency is key!
            </CardDescription>
            </CardHeader>
            <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                <Label htmlFor="food-intake">Food Intake</Label>
                <Textarea
                    id="food-intake"
                    placeholder="List the meals and snacks you had..."
                    rows={4}
                />
                </div>
                <div className="space-y-2">
                <Label htmlFor="symptoms">Symptoms or Feelings</Label>
                <Textarea
                    id="symptoms"
                    placeholder="Any discomfort, energy levels, mood..."
                    rows={4}
                />
                </div>
                <div className="space-y-2">
                <Label htmlFor="water-intake">Water Intake (liters)</Label>
                <Input id="water-intake" type="number" placeholder="e.g., 2.5" />
                </div>
                <div className="space-y-2">
                <Label htmlFor="sleep-hours">Sleep (hours)</Label>
                <Input id="sleep-hours" type="number" placeholder="e.g., 7.5" />
                </div>
                <div className="space-y-2">
                <Label htmlFor="bowel-movement">Bowel Movement</Label>
                <Select>
                    <SelectTrigger id="bowel-movement">
                    <SelectValue placeholder="Select quality" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="constipated">Constipated</SelectItem>
                    <SelectItem value="loose">Loose</SelectItem>
                    <SelectItem value="not-today">Not Today</SelectItem>
                    </SelectContent>
                </Select>
                </div>
                <div className="space-y-2">
                <Label htmlFor="energy-level">Energy Level (1-5)</Label>
                <Select>
                    <SelectTrigger id="energy-level">
                    <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="1">1 (Very Low)</SelectItem>
                    <SelectItem value="2">2 (Low)</SelectItem>
                    <SelectItem value="3">3 (Moderate)</SelectItem>
                    <SelectItem value="4">4 (High)</SelectItem>
                    <SelectItem value="5">5 (Very High)</SelectItem>
                    </SelectContent>
                </Select>
                </div>
            </div>
            </CardContent>
            <CardFooter>
            <Button type="submit" className="w-full md:w-auto ml-auto">
                <Save className="mr-2"/>
                Save Log for Today
            </Button>
            </CardFooter>
        </form>
      </Card>
    </div>
  );
}
