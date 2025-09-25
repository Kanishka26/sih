
'use server';
/**
 * @fileOverview Analyzes a single food item to determine its nutritional
 * and Ayurvedic properties.
 *
 * - analyzeSingleFood - A function that takes a food name and returns its properties.
 * - AnalyzeSingleFoodInput - The input type for the function.
 * - AnalyzeSingleFoodOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeSingleFoodInputSchema = z.object({
  foodName: z.string().describe("The name of the food item to analyze, e.g., 'avocado'"),
});
export type AnalyzeSingleFoodInput = z.infer<
  typeof AnalyzeSingleFoodInputSchema
>;

const AnalyzeSingleFoodOutputSchema = z.object({
    name: z.string().describe("The common name of the food."),
    calories: z.number().describe("The estimated calories per standard serving (e.g., per 100g or per item)."),
    rasa: z.string().describe("The dominant Ayurvedic tastes (rasas) of the food, e.g., 'Sweet, Astringent'."),
    guna: z.string().describe("The primary qualities (gunas) of the food, e.g., 'Heavy, Oily'."),
    virya: z.enum(['Hot', 'Cold']).describe("The potency (virya) of the food."),
    vipaka: z.enum(['Sweet', 'Sour', 'Pungent']).describe("The post-digestive effect (vipaka) of the food."),
    doshaEffect: z.string().describe("A brief summary of how the food affects the Vata, Pitta, and Kapha doshas."),
});
export type AnalyzeSingleFoodOutput = z.infer<
  typeof AnalyzeSingleFoodOutputSchema
>;

export async function analyzeSingleFood(
  input: AnalyzeSingleFoodInput
): Promise<AnalyzeSingleFoodOutput> {
  return analyzeSingleFoodFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeSingleFoodPrompt',
  input: {schema: AnalyzeSingleFoodInputSchema},
  output: {schema: AnalyzeSingleFoodOutputSchema},
  prompt: `You are an expert Ayurvedic nutritionist. Your task is to provide a detailed analysis of a single food item based on its name.

Food Name: {{{foodName}}}

Based on your knowledge, provide the following details for this food:
- Common name
- Estimated calories per standard serving
- Rasa (Dominant tastes)
- Guna (Primary qualities)
- Virya (Potency - Hot or Cold)
- Vipaka (Post-digestive effect - Sweet, Sour, or Pungent)
- A brief summary of its effect on the Vata, Pitta, and Kapha doshas.

Your response MUST be a single, valid JSON object that conforms to the output schema.`,
});

const analyzeSingleFoodFlow = ai.defineFlow(
  {
    name: 'analyzeSingleFoodFlow',
    inputSchema: AnalyzeSingleFoodInputSchema,
    outputSchema: AnalyzeSingleFoodOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
