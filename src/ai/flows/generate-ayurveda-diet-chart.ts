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
      'A personalized Ayurveda-compliant diet chart in a readable format.'
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
  prompt: `You are an experienced Ayurvedic nutritionist. Generate a personalized Ayurveda-compliant diet chart based on the user's age, gender, and prakriti.

  Age: {{{age}}}
  Gender: {{{gender}}}
  Prakriti: {{{prakriti}}}

  Provide a detailed diet chart with recommended foods and meal timings that aligns with Ayurvedic principles for the given characteristics.`,
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
