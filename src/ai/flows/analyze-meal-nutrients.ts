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
import { foodDatabase } from '@/lib/data';

const AnalyzeMealNutrientsInputSchema = z.object({
  foodItems: z.array(z.string()).describe("A list of food item names or IDs from the database, e.g., ['apple', 'lentils', 'ghee']"),
});
export type AnalyzeMealNutrientsInput = z.infer<
  typeof AnalyzeMealNutrientsInputSchema
>;

const AnalyzeMealNutrientsOutputSchema = z.object({
    totalCalories: z.number().describe("The sum total of calories for all food items."),
    totalProtein: z.number().describe("The sum total of protein in grams."),
    totalCarbs: z.number().describe("The sum total of carbohydrates in grams."),
    totalFat: z.number().describe("The sum total of fat in grams. Note: This requires estimation as it is not in the source data."),
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
  input: {schema: z.object({
    foodDetails: z.string().describe("A JSON string of the detailed nutritional and Ayurvedic properties of the foods in the meal.")
  })},
  output: {schema: AnalyzeMealNutrientsOutputSchema},
  prompt: `You are an expert Ayurvedic nutritionist. Based on the following JSON data for a meal, calculate the total nutritional values and provide a detailed Ayurvedic summary.

The data provided does not contain fat content. You must estimate it based on the ingredients. For example, Ghee and Almonds are high in fat.

Food Data:
{{{foodDetails}}}

Analyze the data and provide the total calories, protein, carbs, and your estimated fat content.
Then, provide an Ayurvedic summary. Describe the dominant rasas (tastes), gunas (qualities), and virya (potency) of the combined meal. Conclude with an analysis of the likely effect of this meal on the Vata, Pitta, and Kapha doshas.`,
});

const analyzeMealNutrientsFlow = ai.defineFlow(
  {
    name: 'analyzeMealNutrientsFlow',
    inputSchema: AnalyzeMealNutrientsInputSchema,
    outputSchema: AnalyzeMealNutrientsOutputSchema,
  },
  async ({ foodItems }) => {
    // In a real app, you might have a more sophisticated database lookup.
    // For now, we'll filter the in-memory data.
    const mealDetails = foodDatabase.filter(food => foodItems.includes(food.id) || foodItems.includes(food.name));

    if (mealDetails.length === 0) {
        throw new Error("None of the provided food items were found in the database.");
    }
    
    // We pass the fetched details to the prompt.
    // The AI will handle the aggregation and analysis.
    const {output} = await prompt({
        foodDetails: JSON.stringify(mealDetails, null, 2)
    });
    return output!;
  }
);
