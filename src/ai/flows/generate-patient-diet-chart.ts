
'use server';
/**
 * @fileOverview Generates a personalized Ayurveda-compliant diet chart for a patient.
 *
 * - generatePatientDietChart - A function that generates a diet chart.
 * - GeneratePatientDietChartInput - The input type for the function.
 * - GeneratePatientDietChartOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { Patient, patients } from '@/lib/data';

const GeneratePatientDietChartInputSchema = z.object({
  patientId: z.string().describe('The ID of the patient for whom to generate the diet chart.'),
  healthGoals: z.string().describe('The specific health goals for the patient, e.g., "weight loss", "pitta balance".')
});
export type GeneratePatientDietChartInput = z.infer<
  typeof GeneratePatientDietChartInputSchema
>;

const GeneratePatientDietChartOutputSchema = z.object({
  dietChart: z
    .string()
    .describe(
      'A detailed, personalized Ayurveda-compliant diet chart in a readable markdown format.'
    ),
});
export type GeneratePatientDietChartOutput = z.infer<
  typeof GeneratePatientDietChartOutputSchema
>;

export async function generatePatientDietChart(
  input: GeneratePatientDietChartInput
): Promise<GeneratePatientDietChartOutput> {
  return generatePatientDietChartFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePatientDietChartPrompt',
  input: {schema: z.object({
      patientProfile: z.string().describe("A JSON string representing the patient's profile."),
      healthGoals: z.string()
  })},
  output: {schema: GeneratePatientDietChartOutputSchema},
  prompt: `You are an expert Ayurvedic nutritionist. Your task is to generate a comprehensive, personalized diet chart for a patient based on their profile and health goals.

Patient Profile:
{{{patientProfile}}}

Health Goals:
"{{{healthGoals}}}"

Please provide a detailed 7-day diet chart in markdown format. The chart should include meal timings (e.g., Breakfast, Lunch, Dinner, Snacks), specific food recommendations for each meal, and preparation notes where necessary. The diet must be tailored to the patient's prakriti, age, gender, and address their specific health goals. Explain why certain foods are recommended.
`,
});

const generatePatientDietChartFlow = ai.defineFlow(
  {
    name: 'generatePatientDietChartFlow',
    inputSchema: GeneratePatientDietChartInputSchema,
    outputSchema: GeneratePatientDietChartOutputSchema,
  },
  async ({ patientId, healthGoals }) => {
    const patient = patients.find(p => p.id === patientId);

    if (!patient) {
        throw new Error(`Patient with ID ${patientId} not found.`);
    }

    const {output} = await prompt({
        patientProfile: JSON.stringify(patient, null, 2),
        healthGoals: healthGoals,
    });
    return output!;
  }
);
