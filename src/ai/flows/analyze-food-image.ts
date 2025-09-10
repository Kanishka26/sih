'use server';
/**
 * @fileOverview Analyzes an image of food to determine its nutritional content.
 *
 * - analyzeFoodImage - A function that takes a food image and returns nutritional info.
 * - AnalyzeFoodImageInput - The input type for the analyzeFoodImage function.
 * - AnalyzeFoodImageOutput - The return type for the analyzeFoodImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeFoodImageInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a food dish, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type AnalyzeFoodImageInput = z.infer<
  typeof AnalyzeFoodImageInputSchema
>;

const AnalyzeFoodImageOutputSchema = z.object({
    dishName: z.string().describe("The name of the identified dish. If multiple dishes, name the primary one."),
    ingredients: z.array(z.string()).describe("A list of likely ingredients in the dish."),
    calories: z.number().describe("Estimated total calories for the dish."),
    protein: z.number().describe("Estimated grams of protein."),
    carbs: z.number().describe("Estimated grams of carbohydrates."),
    fat: z.number().describe("Estimated grams of fat."),
    ayurvedicPerspective: z.string().describe("A brief analysis from an Ayurvedic perspective, considering the likely gunas (qualities) and rasas (tastes).")
});
export type AnalyzeFoodImageOutput = z.infer<
  typeof AnalyzeFoodImageOutputSchema
>;

export async function analyzeFoodImage(
  input: AnalyzeFoodImageInput
): Promise<AnalyzeFoodImageOutput> {
  return analyzeFoodImageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeFoodImagePrompt',
  input: {schema: AnalyzeFoodImageInputSchema},
  output: {schema: AnalyzeFoodImageOutputSchema},
  prompt: `You are an expert nutritionist with deep knowledge of both modern nutritional science and ancient Ayurvedic principles.

Analyze the food in the image provided and provide a detailed nutritional breakdown and Ayurvedic analysis.

Identify the dish. List its primary ingredients. Estimate the calories, protein, carbohydrates, and fat content.
Finally, provide a brief Ayurvedic perspective on the dish.

Image: {{media url=photoDataUri}}`,
});

const analyzeFoodImageFlow = ai.defineFlow(
  {
    name: 'analyzeFoodImageFlow',
    inputSchema: AnalyzeFoodImageInputSchema,
    outputSchema: AnalyzeFoodImageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
