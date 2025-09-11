
'use server';

/**
 * @fileOverview A seasonal food suggestion AI agent based on Ayurvedic principles.
 *
 * - suggestSeasonalFoods - A function that suggests seasonal foods and diet changes.
 * - SuggestSeasonalFoodsInput - The input type for the suggestSeasonalFoods function.
 * - SuggestSeasonalFoodsOutput - The return type for the suggestSeasonalFoods function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestSeasonalFoodsInputSchema = z.object({
  currentSeason: z
    .string()
    .describe('The current season (e.g., spring, summer, fall, winter).'),
  userPrakriti: z
    .string()
    .describe(
      'The user’s prakriti (body constitution) according to Ayurveda (e.g., Vata, Pitta, Kapha).'
    ),
  location: z
    .string()
    .describe(
      'The user’s general location, to help determine seasonal food availability.'
    ),
});
export type SuggestSeasonalFoodsInput = z.infer<
  typeof SuggestSeasonalFoodsInputSchema
>;

const SuggestSeasonalFoodsOutputSchema = z.object({
  seasonalFoods: z
    .string()
    .describe(
      'A list of foods that are beneficial to eat during the current season according to Ayurveda, in markdown format.'
    ),
  dietaryRecommendations: z
    .string()
    .describe(
      'Dietary recommendations for the current season based on the user’s prakriti and Ayurvedic principles, in markdown format.'
    ),
});
export type SuggestSeasonalFoodsOutput = z.infer<
  typeof SuggestSeasonalFoodsOutputSchema
>;

export async function suggestSeasonalFoods(
  input: SuggestSeasonalFoodsInput
): Promise<SuggestSeasonalFoodsOutput> {
  return suggestSeasonalFoodsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestSeasonalFoodsPrompt',
  input: {schema: SuggestSeasonalFoodsInputSchema},
  output: {schema: SuggestSeasonalFoodsOutputSchema},
  prompt: `You are an Ayurvedic expert. Provide seasonal food suggestions and dietary recommendations based on the user's location, the current season, and their prakriti.

Current Season: {{{currentSeason}}}
User Prakriti: {{{userPrakriti}}}
User Location: {{{location}}}

Based on the above information, provide:
1.  A markdown list of seasonal foods that are ideal.
2.  A markdown list of general dietary recommendations for this season and prakriti.`,
});

const suggestSeasonalFoodsFlow = ai.defineFlow(
  {
    name: 'suggestSeasonalFoodsFlow',
    inputSchema: SuggestSeasonalFoodsInputSchema,
    outputSchema: SuggestSeasonalFoodsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
