'use server';
/**
 * @fileOverview Analyzes a patient's profile and diet to identify nutrient gaps
 * and dosha imbalances.
 *
 * - analyzePatientBalance - A function that takes a patient profile and returns an analysis.
 * - AnalyzePatientBalanceInput - The input type for the function.
 * - AnalyzePatientBalanceOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { foodDatabase } from '@/lib/data';

const AnalyzePatientBalanceInputSchema = z.object({
  patientPrakriti: z.string().describe("The patient's dominant prakriti (dosha), e.g., Vata, Pitta, Kapha, Vata-Pitta, Pitta-Kapha, Vata-Kapha, Tridoshic."),
  currentDiet: z.array(z.string()).describe("A list of food item names or IDs the patient has been consuming, e.g., ['apple', 'chilli', 'ghee']"),
});
export type AnalyzePatientBalanceInput = z.infer<
  typeof AnalyzePatientBalanceInputSchema
>;

const AnalyzePatientBalanceOutputSchema = z.object({
    doshaImbalanceReport: z.string().describe("A report on how the current diet is affecting the patient's specific prakriti, highlighting foods that may be causing imbalance and suggesting alternatives."),
    nutrientGapReport: z.string().describe("An analysis of potential nutrient gaps (e.g., lack of protein, specific tastes) based on the provided diet, with suggestions for foods to include.")
});
export type AnalyzePatientBalanceOutput = z.infer<
  typeof AnalyzePatientBalanceOutputSchema
>;

export async function analyzePatientBalance(
  input: AnalyzePatientBalanceInput
): Promise<AnalyzePatientBalanceOutput> {
  return analyzePatientBalanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzePatientBalancePrompt',
  input: {schema: z.object({
    patientPrakriti: z.string(),
    dietDetails: z.string()
  })},
  output: {schema: AnalyzePatientBalanceOutputSchema},
  prompt: `You are a master Ayurvedic physician. A patient has come to you for a consultation.

Patient's Dominant Prakriti (Dosha): {{{patientPrakriti}}}

Here is the JSON data for the food items in the patient's current diet:
{{{dietDetails}}}

Based on this information, please provide a two-part report:
1.  **Dosha Imbalance Report:** Analyze how the combination of these foods will affect the patient's specific prakriti. Point out which foods are beneficial and which might be causing an imbalance. For example, for a Pitta person, hot potency (virya) foods like Turmeric could increase their Pitta. Suggest simple alternatives.
2.  **Nutrient Gap Report:** Analyze the diet for any obvious nutritional or Ayurvedic gaps. For instance, is there a lack of a specific rasa (taste)? Is the protein content too low? Suggest specific foods from the database to fill these gaps.`,
});

const analyzePatientBalanceFlow = ai.defineFlow(
  {
    name: 'analyzePatientBalanceFlow',
    inputSchema: AnalyzePatientBalanceInputSchema,
    outputSchema: AnalyzePatientBalanceOutputSchema,
  },
  async ({ patientPrakriti, currentDiet }) => {
    const dietDetails = foodDatabase.filter(food => currentDiet.includes(food.id) || currentDiet.includes(food.name));

    if (dietDetails.length === 0) {
        throw new Error("None of the provided diet items were found in the database.");
    }
    
    const {output} = await prompt({
        patientPrakriti,
        dietDetails: JSON.stringify(dietDetails, null, 2)
    });
    return output!;
  }
);
