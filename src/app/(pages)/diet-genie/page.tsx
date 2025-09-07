'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useState, useTransition } from 'react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { generateDietChartAction } from '@/lib/actions';
import { type GenerateAyurvedaDietChartOutput } from '@/ai/flows/generate-ayurveda-diet-chart';
import { Loader2, Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  age: z.coerce.number().min(1, 'Age must be at least 1').max(120),
  gender: z.enum(['male', 'female'], {
    required_error: 'Please select a gender.',
  }),
  prakriti: z.enum(['Vata', 'Pitta', 'Kapha'], {
    required_error: 'Please select a prakriti.',
  }),
});

export default function DietGeniePage() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<GenerateAyurvedaDietChartOutput | null>(
    null
  );
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: 30,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      setResult(null);
      try {
        const res = await generateDietChartAction(values);
        setResult(res);
      } catch (error) {
        toast({
          title: 'Error generating diet chart',
          description:
            'There was a problem with the AI service. Please try again later.',
          variant: 'destructive',
        });
      }
    });
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="text-center">
        <h1 className="text-3xl font-headline font-bold">
          DietGenie (आहार चार्ट)
        </h1>
        <p className="text-muted-foreground">
          Auto-generate an Ayurveda-compliant diet chart.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Personalize Your Diet Chart</CardTitle>
          <CardDescription>
            Enter your details below to get a personalized diet plan.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 30" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="prakriti"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prakriti (Dosha)</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your prakriti" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Vata">Vata</SelectItem>
                          <SelectItem value="Pitta">Pitta</SelectItem>
                          <SelectItem value="Kapha">Kapha</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="mr-2 h-4 w-4" />
                )}
                Generate Diet Chart
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {isPending && (
        <Card>
          <CardContent className="p-6 flex flex-col items-center justify-center space-y-4 min-h-[200px]">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">
              The DietGenie is crafting your personalized plan...
            </p>
          </CardContent>
        </Card>
      )}

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Your Custom Diet Chart</CardTitle>
            <CardDescription>
              Generated for a {form.getValues('age')}-year-old{' '}
              {form.getValues('gender')} with {form.getValues('prakriti')}{' '}
              prakriti.
            </CardDescription>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none text-foreground dark:prose-invert prose-headings:font-headline">
            <div
              dangerouslySetInnerHTML={{ __html: result.dietChart.replace(/\n/g, '<br />') }}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
