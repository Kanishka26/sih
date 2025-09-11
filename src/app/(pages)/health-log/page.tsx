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
import { Save, History, Calendar, Droplets, Bed, Smile, Pizza } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useState } from 'react';

const initialPastLogs = [
  {
    date: '2024-07-20',
    foodIntake: 'Oats with berries for breakfast, lentil soup for lunch, grilled vegetables for dinner.',
    symptoms: 'Felt energetic and clear-headed.',
    waterIntake: '2.5',
    sleepHours: '8',
    bowelMovement: 'normal',
    energyLevel: '5',
  },
  {
    date: '2024-07-19',
    foodIntake: 'Rice with yogurt for lunch, kichdi for dinner.',
    symptoms: 'A bit of bloating in the evening.',
    waterIntake: '2',
    sleepHours: '6.5',
    bowelMovement: 'normal',
    energyLevel: '3',
  },
  {
    date: '2024-07-18',
    foodIntake: 'Skipped breakfast. Had a heavy lunch with fried food.',
    symptoms: 'Felt sluggish and sleepy after lunch.',
    waterIntake: '1.5',
    sleepHours: '7',
    bowelMovement: 'constipated',
    energyLevel: '2',
  },
];

type Log = typeof initialPastLogs[0];

export default function HealthLogPage() {
    const { toast } = useToast();
    const [pastLogs, setPastLogs] = useState<Log[]>(initialPastLogs);
    const [foodIntake, setFoodIntake] = useState('');
    const [symptoms, setSymptoms] = useState('');
    const [waterIntake, setWaterIntake] = useState('');
    const [sleepHours, setSleepHours] = useState('');
    const [bowelMovement, setBowelMovement] = useState('');
    const [energyLevel, setEnergyLevel] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if(!foodIntake && !symptoms && !waterIntake && !sleepHours && !bowelMovement && !energyLevel) {
          toast({
            title: "Empty Log",
            description: "Please fill out at least one field to save a log.",
            variant: "destructive"
          });
          return;
        }

        const newLog: Log = {
          date: new Date().toISOString().split('T')[0],
          foodIntake,
          symptoms,
          waterIntake,
          sleepHours,
          bowelMovement,
          energyLevel,
        }

        setPastLogs([newLog, ...pastLogs]);

        // Reset form
        setFoodIntake('');
        setSymptoms('');
        setWaterIntake('');
        setSleepHours('');
        setBowelMovement('');
        setEnergyLevel('');

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
                    value={foodIntake}
                    onChange={(e) => setFoodIntake(e.target.value)}
                />
                </div>
                <div className="space-y-2">
                <Label htmlFor="symptoms">Symptoms or Feelings</Label>
                <Textarea
                    id="symptoms"
                    placeholder="Any discomfort, energy levels, mood..."
                    rows={4}
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                />
                </div>
                <div className="space-y-2">
                <Label htmlFor="water-intake">Water Intake (liters)</Label>
                <Input id="water-intake" type="number" step="0.1" placeholder="e.g., 2.5" value={waterIntake} onChange={(e) => setWaterIntake(e.target.value)} />
                </div>
                <div className="space-y-2">
                <Label htmlFor="sleep-hours">Sleep (hours)</Label>
                <Input id="sleep-hours" type="number" step="0.1" placeholder="e.g., 7.5" value={sleepHours} onChange={(e) => setSleepHours(e.target.value)} />
                </div>
                <div className="space-y-2">
                <Label htmlFor="bowel-movement">Bowel Movement</Label>
                <Select value={bowelMovement} onValueChange={setBowelMovement}>
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
                <Select value={energyLevel} onValueChange={setEnergyLevel}>
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
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="w-6 h-6 text-primary" />
            Past Health Logs
          </CardTitle>
          <CardDescription>
            Review your previously saved logs.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {pastLogs.map((log) => (
              <AccordionItem value={log.date} key={log.date}>
                <AccordionTrigger>
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="font-semibold">{new Date(log.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })}</span>
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 text-sm text-foreground/90">
                    <div className="flex items-start gap-3">
                      <Pizza className="w-4 h-4 mt-1 text-primary" />
                      <div>
                        <p className="font-semibold">Food Intake</p>
                        <p className="text-muted-foreground">{log.foodIntake || 'Not logged'}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Smile className="w-4 h-4 mt-1 text-primary" />
                      <div>
                        <p className="font-semibold">Symptoms/Feelings</p>
                        <p className="text-muted-foreground">{log.symptoms || 'Not logged'}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-3">
                            <Droplets className="w-4 h-4 text-primary" />
                            <p><span className="font-semibold">Water:</span> {log.waterIntake ? `${log.waterIntake}L` : 'N/A'}</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Bed className="w-4 h-4 text-primary" />
                            <p><span className="font-semibold">Sleep:</span> {log.sleepHours ? `${log.sleepHours} hrs` : 'N/A'}</p>
                        </div>
                        <div className="flex items-center gap-3">
                             <p><span className="font-semibold">Bowel Movement:</span> <span className="capitalize">{log.bowelMovement || 'N/A'}</span></p>
                        </div>
                        <div className="flex items-center gap-3">
                            <p><span className="font-semibold">Energy Level:</span> {log.energyLevel ? `${log.energyLevel}/5` : 'N/A'}</p>
                        </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
