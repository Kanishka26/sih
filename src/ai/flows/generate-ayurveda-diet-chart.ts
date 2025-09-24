
'use server';
/**
 * @fileOverview Generates a personalized Ayurveda-compliant diet chart based on user inputs.
 *
 * - generateAyurvedaDietChart - A function that generates a diet chart based on user's age, gender and prakriti.
 * - GenerateAyurvedaDietChartInput - The input type for the generateAyurvedaDietChart function.
 * - GenerateAyurvedaDietChartOutput - The return type for the generateAyurvedaDietChart function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAyurvedaDietChartInputSchema = z.object({
  age: z.number().describe('The age of the user in years.'),
  gender: z.enum(['male', 'female']).describe('The gender of the user.'),
  prakriti: z
    .string()
    .describe(
      'The prakriti (body constitution) of the user, e.g., Vata, Pitta, Kapha.'
    ),
});
export type GenerateAyurvedaDietChartInput = z.infer<
  typeof GenerateAyurvedaDietChartInputSchema
>;

const GenerateAyurvedaDietChartOutputSchema = z.object({
  dietChart: z
    .string()
    .describe(
      'A personalized Ayurveda-compliant diet chart in a readable markdown format.'
    ),
});
export type GenerateAyurvedaDietChartOutput = z.infer<
  typeof GenerateAyurvedaDietChartOutputSchema
>;

export async function generateAyurvedaDietChart(
  input: GenerateAyurvedaDietChartInput
): Promise<GenerateAyurvedaDietChartOutput> {
  return generateAyurvedaDietChartFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateAyurvedaDietChartPrompt',
  input: {schema: GenerateAyurvedaDietChartInputSchema},
  output: {schema: GenerateAyurvedaDietChartOutputSchema},
  prompt: `You are an experienced Ayurvedic nutritionist. Your task is to generate a comprehensive, personalized 7-day diet chart based on the user's profile.

  User Profile:
  - Age: {{{age}}}
  - Gender: {{{gender}}}
  - Prakriti (Dosha): {{{prakriti}}}

  Please provide a detailed 7-day diet chart in markdown format. The chart should be easy to read and follow. For each day, include:
  1.  **Meal Timings:** (e.g., Early Morning, Breakfast, Lunch, Mid-Afternoon, Dinner).
  2.  **Food Recommendations:** Specific and simple food items for each meal.
  3.  **Preparation Notes:** Brief notes on how to prepare the food where necessary (e.g., "soaked almonds", "lightly spiced").
  
  The diet must be tailored to the user's prakriti, age, and gender, adhering to Ayurvedic principles. For example, for a Pitta person, suggest cooling foods. For a Vata person, suggest warm, grounding foods. For a Kapha person, suggest light, stimulating foods.`,
});

const generateAyurvedaDietChartFlow = ai.defineFlow(
  {
    name: 'generateAyurvedaDietChartFlow',
    inputSchema: GenerateAyurvedaDietChartInputSchema,
    outputSchema: GenerateAyurvedaDietChartOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
