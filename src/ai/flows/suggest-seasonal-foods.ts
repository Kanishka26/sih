
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
    .array(z.string())
    .describe(
      'An array of 5-7 ideal seasonal food names for the user.'
    ),
  dietaryRecommendations: z
    .string()
    .describe(
      'A markdown list of 3-5 general dietary recommendations for this season and prakriti. Each item must start with a hyphen (-).'
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
  prompt: `You are an Ayurvedic expert. Your task is to provide seasonal food suggestions and dietary recommendations based on the user's location, the current season, and their prakriti.

Your response MUST be a JSON object with two keys: "seasonalFoods" and "dietaryRecommendations".
The value for "seasonalFoods" MUST be an array of strings.
The value for "dietaryRecommendations" MUST be a string containing a markdown-formatted list using hyphens (-) for each item.

User Profile:
- Current Season: {{{currentSeason}}}
- User Prakriti: {{{userPrakriti}}}
- User Location: {{{location}}}

Based on the above information, provide:
1.  **seasonalFoods**: An array of 5-7 ideal seasonal food names for the user.
2.  **dietaryRecommendations**: A markdown list of 3-5 general dietary recommendations for this season and prakriti.`,
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
