'use server';
/**
 * @fileOverview Analyzes a list of food items to provide a consolidated nutritional
 * and Ayurvedic analysis.
 *
 * - analyzeMealNutrients - A function that takes a list of foods and returns the analysis.
 * - AnalyzeMealNutrientsInput - The input type for the function.
 * - AnalyzeMealNutrientsOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeMealNutrientsInputSchema = z.object({
  foodItems: z.array(z.string()).describe("A list of food item names, e.g., ['apple', 'lentils', 'ghee']"),
});
export type AnalyzeMealNutrientsInput = z.infer<
  typeof AnalyzeMealNutrientsInputSchema
>;

const AnalyzeMealNutrientsOutputSchema = z.object({
    totalCalories: z.number().describe("The sum total of calories for all food items."),
    totalProtein: z.number().describe("The sum total of protein in grams."),
    totalCarbs: z.number().describe("The sum total of carbohydrates in grams."),
    totalFat: z.number().describe("The sum total of fat in grams."),
    ayurvedicSummary: z.string().describe("A summary of the meal's Ayurvedic properties, including dominant rasa, guna, virya, and overall effect on Vata, Pitta, and Kapha doshas.")
});
export type AnalyzeMealNutrientsOutput = z.infer<
  typeof AnalyzeMealNutrientsOutputSchema
>;

export async function analyzeMealNutrients(
  input: AnalyzeMealNutrientsInput
): Promise<AnalyzeMealNutrientsOutput> {
  return analyzeMealNutrientsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeMealNutrientsPrompt',
  input: {schema: AnalyzeMealNutrientsInputSchema},
  output: {schema: AnalyzeMealNutrientsOutputSchema},
  prompt: `You are an expert Ayurvedic nutritionist. Based on the following list of food items in a meal, calculate the total nutritional values and provide a detailed Ayurvedic summary.

You must estimate the nutritional values (calories, protein, carbs, fat) based on your knowledge of these foods.

Food Items:
{{#each foodItems}}
- {{{this}}}
{{/each}}

Analyze the list and provide the total calories, protein, carbs, and fat content.
Then, provide an Ayurvedic summary. Describe the dominant rasas (tastes), gunas (qualities), and virya (potency) of the combined meal. Conclude with an analysis of the likely effect of this meal on the Vata, Pitta, and Kapha doshas.`,
});

const analyzeMealNutrientsFlow = ai.defineFlow(
  {
    name: 'analyzeMealNutrientsFlow',
    inputSchema: AnalyzeMealNutrientsInputSchema,
    outputSchema: AnalyzeMealNutrientsOutputSchema,
  },
  async (input) => {
    if (input.foodItems.length === 0) {
        throw new Error("Please provide at least one food item for analysis.");
    }
    
    // The AI will handle the aggregation and analysis directly from the names.
    const {output} = await prompt(input);
    return output!;
  }
);
