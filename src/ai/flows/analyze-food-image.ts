
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
    dishName: z.string().describe("Identify the name of the dish in the image. If there are multiple items, identify the main dish."),
    ingredients: z.array(z.string()).describe("List the likely ingredients you see or can infer are in this dish."),
    calories: z.number().describe("Provide an estimated total calorie count for the portion shown."),
    protein: z.number().describe("Provide an estimated protein amount in grams."),
    carbs: z.number().describe("Provide an estimated carbohydrate amount in grams."),
    fat: z.number().describe("Provide an estimated fat amount in grams."),
    ayurvedicPerspective: z.string().describe("Provide a brief analysis from an Ayurvedic perspective. Mention the likely dominant rasas (tastes) and gunas (qualities) and its likely effect on the doshas (Vata, Pitta, Kapha).")
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
  prompt: `You are an expert nutritionist with deep knowledge of both modern nutritional science and ancient Ayurvedic principles. Your task is to analyze the food in the provided image. Analyze the image and return a JSON object with the specified fields.
      
Image: {{media url=photoDataUri}}`,
});


const analyzeFoodImageFlow = ai.defineFlow(
  {
    name: 'analyzeFoodImageFlow',
    inputSchema: AnalyzeFoodImageInputSchema,
    outputSchema: AnalyzeFoodImageOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
