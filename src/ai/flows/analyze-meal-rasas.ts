
'use server';
/**
 * @fileOverview Analyzes a list of food items to determine the balance of the six
 * Ayurvedic tastes (rasas).
 *
 * - analyzeMealRasas - A function that takes a list of foods and returns the rasa analysis.
 * - AnalyzeMealRasasInput - The input type for the function.
 * - AnalyzeMealRasasOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeMealRasasInputSchema = z.object({
  foodItems: z.array(z.string()).describe("A list of food item names, e.g., ['apple', 'lentils', 'rice']"),
});
export type AnalyzeMealRasasInput = z.infer<
  typeof AnalyzeMealRasasInputSchema
>;

const AnalyzeMealRasasOutputSchema = z.object({
    "Madhura (Sweet)": z.number().describe("The relative strength of the Sweet taste (Madhura) in the meal, on a scale of 0 to 10."),
    "Amla (Sour)": z.number().describe("The relative strength of the Sour taste (Amla) in the meal, on a scale of 0 to 10."),
    "Lavana (Salty)": z.number().describe("The relative strength of the Salty taste (Lavana) in the meal, on a scale of 0 to 10."),
    "Katu (Pungent)": z.number().describe("The relative strength of the Pungent taste (Katu) in the meal, on a scale of 0 to 10."),
    "Tikta (Bitter)": z.number().describe("The relative strength of the Bitter taste (Tikta) in the meal, on a scale of 0 to 10."),
    "Kashaya (Astringent)": z.number().describe("The relative strength of the Astringent taste (Kashaya) in the meal, on a scale of 0 to 10."),
    recommendation: z.string().describe("A brief, actionable recommendation to improve the balance of the meal, e.g., 'Consider adding a squeeze of lemon for some Sour taste.'")
});

export type AnalyzeMealRasasOutput = z.infer<
  typeof AnalyzeMealRasasOutputSchema
>;

export async function analyzeMealRasas(
  input: AnalyzeMealRasasInput
): Promise<AnalyzeMealRasasOutput> {
  return analyzeMealRasasFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeMealRasasPrompt',
  input: {schema: AnalyzeMealRasasInputSchema},
  output: {schema: AnalyzeMealRasasOutputSchema},
  prompt: `You are an expert Ayurvedic chef. Your task is to analyze the six tastes (rasas) present in a given list of food items.

Food Items:
{{#each foodItems}}
- {{{this}}}
{{/each}}

Based on your knowledge of Ayurvedic principles, determine the relative strength of each of the six tastes: Madhura (Sweet), Amla (Sour), Lavana (Salty), Katu (Pungent), Tikta (Bitter), and Kashaya (Astringent).

Your response MUST be a JSON object. For each taste, provide a score from 0 to 10, where 0 means it's absent and 10 means it's extremely dominant. The scores should reflect the combined taste profile of the entire meal.

Then, provide one simple, actionable 'recommendation' to improve the balance of the meal.`,
});

const analyzeMealRasasFlow = ai.defineFlow(
  {
    name: 'analyzeMealRasasFlow',
    inputSchema: AnalyzeMealRasasInputSchema,
    outputSchema: AnalyzeMealRasasOutputSchema,
  },
  async (input) => {
    if (input.foodItems.length === 0) {
        throw new Error("Please provide at least one food item for analysis.");
    }
    
    const {output} = await prompt(input);
    return output!;
  }
);
