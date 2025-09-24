
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
      'A personalized Ayurveda-compliant diet chart as an HTML string. Use TailwindCSS classes for styling within the HTML.'
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
  input: {schema: z.object({ prompt: GenerateAyurvedaDietChartInputSchema })},
  output: {schema: GenerateAyurvedaDietChartOutputSchema},
  prompt: `You are an experienced Ayurvedic nutritionist. Your task is to generate a comprehensive, personalized 7-day diet chart based on the user's profile.

User Profile:
- Age: {{prompt.age}}
- Gender: {{prompt.gender}}
- Prakriti (Dosha): {{prompt.prakriti}}

Your response MUST be a JSON object with a single key "dietChart". The value of "dietChart" must be a string containing the diet plan as an HTML document. Do not include markdown.

The HTML should be well-structured and styled using TailwindCSS classes to be clean and readable. Use headings (h3, h4) for days and meal times, and unordered lists (ul, li) for food items.
  
The diet must be tailored to the user's prakriti, age, and gender, adhering to Ayurvedic principles. For example, for a Pitta person, suggest cooling foods. For a Vata person, suggest warm, grounding foods. For a Kapha person, suggest light, stimulating foods.`,
});

const generateAyurvedaDietChartFlow = ai.defineFlow(
  {
    name: 'generateAyurvedaDietChartFlow',
    inputSchema: GenerateAyurvedaDietChartInputSchema,
    outputSchema: GenerateAyurvedaDietChartOutputSchema,
  },
  async input => {
    const {output} = await prompt({ prompt: input });
    return output!;
  }
);
