
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
import { suggestSeasonalFoodsAction } from '@/lib/actions';
import { type SuggestSeasonalFoodsOutput } from '@/ai/flows/suggest-seasonal-foods';
import { Loader2, SunSnow } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  currentSeason: z.enum(['spring', 'summer', 'fall', 'winter']),
  userPrakriti: z.enum(['Vata', 'Pitta', 'Kapha']),
  location: z.string().min(2, 'Please enter a location.'),
});

// A simple markdown to HTML converter
const markdownToHtml = (markdown: string) => {
  if (!markdown) return '';
  // Convert markdown-style lists to HTML lists
  const html = markdown
    .replace(/^\s*-\s/gm, '<li>')
    .replace(/^\s*\*\s/gm, '<li>')
    .replace(/^\s*\d+\.\s/gm, '<li>')
    .replace(/<\/li>\n/g, '</li>')
    .replace(/<li>/g, '<li>')
    .replace(/$/gm, '</li>')
    .replace(/<li>/g, '<ul><li>')
    .replace(/<\/li>$/g, '</li></ul>')
    .replace(/<\/li>\n<ul>/g, '</li></ul>\n<ul>')
    .replace(/\n/g, '<br />')
    .replace(/<ul><br \/>/g, '<ul>')
    .replace(/<br \/><li>/g, '<li>')
    .replace(/<\/li><br \/>/g, '</li>')
    .replace(/<\/ul><br \/>/g, '</ul>');
  
  return html.replace(/<li>/g, '<li class="list-disc ml-4">');
};

export default function SeasonalBhojanPage() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<SuggestSeasonalFoodsOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: 'Northern India',
      currentSeason: 'summer',
      userPrakriti: 'Pitta',
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


  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="text-center">
        <h1 className="text-3xl font-headline font-bold">
          SeasonalBhojan (ऋतु आहार)
        </h1>
        <p className="text-muted-foreground">
          AI-powered suggestions for seasonal foods and diet changes.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Get Seasonal Recommendations</CardTitle>
          <CardDescription>
            Align your diet with the current season for optimal health.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <FormField
                  control={form.control}
                  name="currentSeason"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Season</FormLabel>
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
                          <SelectItem value="spring">Spring</SelectItem>
                          <SelectItem value="summer">Summer</SelectItem>
                          <SelectItem value="fall">Fall</SelectItem>
                          <SelectItem value="winter">Winter</SelectItem>
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
                          </Trigger>
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
                 <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location (City or State)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Mumbai or California" {...field} />
                      </FormControl>
                      <FormDescription>
                        Enter a city or state for better results.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <SunSnow className="mr-2 h-4 w-4" />
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
              Checking the season's bounty for you...
            </p>
          </CardContent>
        </Card>
      )}

      {result && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
            <CardHeader>
                <CardTitle>Seasonal Foods</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none dark:prose-invert">
                 <div dangerouslySetInnerHTML={{ __html: markdownToHtml(result.seasonalFoods) }} />
            </CardContent>
            </Card>
            <Card>
            <CardHeader>
                <CardTitle>Dietary Recommendations</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none dark:prose-invert">
                 <div dangerouslySetInnerHTML={{ __html: markdownToHtml(result.dietaryRecommendations) }} />
            </CardContent>
            </Card>
        </div>
      )}
    </div>
  );
}
