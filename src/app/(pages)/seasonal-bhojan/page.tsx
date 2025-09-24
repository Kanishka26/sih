
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useState, useTransition } from 'react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
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
import { suggestSeasonalFoodsAction } from '@/lib/actions';
import { type SuggestSeasonalFoodsOutput } from '@/ai/flows/suggest-seasonal-foods';
import { Leaf, Loader2, Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

const formSchema = z.object({
  currentSeason: z.enum(['spring', 'summer', 'fall', 'winter'], {
    required_error: 'Please select a season.',
  }),
  userPrakriti: z.enum(['Vata', 'Pitta', 'Kapha'], {
    required_error: 'Please select a prakriti.',
  }),
  location: z
    .string()
    .min(2, 'Location must be at least 2 characters.')
    .max(50),
});

// Helper function to parse markdown lists
const parseMarkdownList = (markdown: string) => {
  if (!markdown) return [];
  return markdown.split('\n').map(item => item.replace(/^- /, '').trim()).filter(Boolean);
}

export default function SeasonalBhojanPage() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<SuggestSeasonalFoodsOutput | null>(
    null
  );
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: 'Mumbai, India',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      setResult(null);
      try {
        const res = await suggestSeasonalFoodsAction(values);
        setResult(res);
      } catch (error) {
        toast({
          title: 'Error getting suggestions',
          description:
            'There was a problem with the AI service. Please try again later.',
          variant: 'destructive',
        });
      }
    });
  }

  const seasonalFoodsList = result ? parseMarkdownList(result.seasonalFoods) : [];
  const recommendationsList = result ? parseMarkdownList(result.dietaryRecommendations) : [];


  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="text-center">
        <h1 className="text-3xl font-headline font-bold">
          SeasonalBhojan (ऋतु आहार)
        </h1>
        <p className="text-muted-foreground">
          Get food recommendations for the current season based on your prakriti.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Get Seasonal Suggestions</CardTitle>
          <CardDescription>
            Enter your details to get personalized food recommendations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Delhi, India" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="currentSeason"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Season</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a season" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="summer">Summer</SelectItem>
                          <SelectItem value="winter">Winter</SelectItem>
                          <SelectItem value="spring">Spring</SelectItem>
                          <SelectItem value="fall">Fall</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="userPrakriti"
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
                Get Suggestions
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
              Consulting the ancient texts for you...
            </p>
          </CardContent>
        </Card>
      )}

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Your Seasonal Suggestions</CardTitle>
            <CardDescription>
              For a {form.getValues('userPrakriti')} individual in{' '}
              {form.getValues('location')} during{' '}
              {form.getValues('currentSeason')}.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 bg-primary/10 rounded-lg">
                <h4 className="font-semibold text-lg mb-3 text-primary-foreground/90">Ideal Seasonal Foods</h4>
                <ul className="space-y-2">
                  {seasonalFoodsList.map((food, index) => (
                    <li key={index} className="flex items-center gap-3 text-sm text-foreground/90">
                      <Leaf className="w-4 h-4 text-accent" />
                      <span>{food}</span>
                    </li>
                  ))}
                </ul>
            </div>
            
            <Separator />
            
             <div className="p-4">
                <h4 className="font-semibold text-lg mb-3">Dietary Recommendations</h4>
                <ul className="space-y-2 list-disc list-outside pl-5">
                  {recommendationsList.map((rec, index) => (
                    <li key={index} className="text-sm text-muted-foreground">
                      {rec}
                    </li>
                  ))}
                </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
