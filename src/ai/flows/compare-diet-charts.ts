'use server';
/**
 * @fileOverview Compares two diet charts for a patient and provides an analysis.
 *
 * - compareDietCharts - A function that takes two diet charts and returns a comparison.
 * - CompareDietChartsInput - The input type for the function.
 * - CompareDietChartsOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CompareDietChartsInputSchema = z.object({
  chartOneContent: z.string().describe("The content of the first diet chart in markdown format."),
  chartTwoContent: z.string().describe("The content of the second (newer) diet chart in markdown format."),
  healthGoals: z.string().describe("The patient's health goals, e.g., 'weight loss', 'pitta balance'.")
});
export type CompareDietChartsInput = z.infer<
  typeof CompareDietChartsInputSchema
>;

const CompareDietChartsOutputSchema = z.object({
  comparisonReport: z.string().describe("A detailed report in markdown format comparing the two diet charts, highlighting differences, improvements, and alignment with the patient's health goals.")
});
export type CompareDietChartsOutput = z.infer<
  typeof CompareDietChartsOutputSchema
>;

export async function compareDietCharts(
  input: CompareDietChartsInput
): Promise<CompareDietChartsOutput> {
  return compareDietChartsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'compareDietChartsPrompt',
  input: {schema: CompareDietChartsInputSchema},
  output: {schema: CompareDietChartsOutputSchema},
  prompt: `You are an expert Ayurvedic nutritionist. Your task is to compare two diet charts for a patient and provide a detailed analysis of the changes and their impact relative to the patient's health goals.

Patient's Health Goals: "{{healthGoals}}"

Diet Chart 1 (Older):
---
{{{chartOneContent}}}
---

Diet Chart 2 (Newer):
---
{{{chartTwoContent}}}
---

Please generate a comparison report in markdown format. The report should cover:
1.  **Key Differences:** What are the main changes in food items, meal timings, or preparation?
2.  **Progress Towards Goals:** How do the changes in Chart 2 better align with the patient's stated health goals?
3.  **Ayurvedic Impact:** Analyze the shift in rasas, gunas, and overall dosha-balancing effects between the two charts.
4.  **Recommendations:** Provide any concluding remarks or suggestions for the patient based on this comparison.`,
});

const compareDietChartsFlow = ai.defineFlow(
  {
    name: 'compareDietChartsFlow',
    inputSchema: CompareDietChartsInputSchema,
    outputSchema: CompareDietChartsOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
