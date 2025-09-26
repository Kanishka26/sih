
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
    .enum(['Vata', 'Pitta', 'Kapha', 'Vata-Pitta', 'Pitta-Kapha', 'Vata-Kapha', 'Tridoshic'])
    .describe(
      'The prakriti (body constitution) of the user, e.g., Vata, Pitta, Kapha, Vata-Pitta.'
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
  input: {schema: GenerateAyurvedaDietChartInputSchema},
  prompt: `You are an experienced Ayurvedic nutritionist. Your task is to generate a comprehensive, personalized 7-day diet chart based on the user's profile.

User Profile:
- Age: {{age}}
- Gender: {{gender}}
- Prakriti (Dosha): {{prakriti}}

Your response MUST be a JSON object with a single key "dietChart". The value of "dietChart" must be a string containing the diet plan as a complete HTML document.

Example response format:
{
  "dietChart": "<h3>Day 1</h3><h4>Breakfast (8:00 AM)</h4><ul><li>Oatmeal</li></ul>..."
}

The HTML should be well-structured and styled using TailwindCSS classes to be clean and readable. Use headings (h3, h4) for days and meal times, and unordered lists (ul, li) for food items.
  
The diet must be tailored to the user's prakriti, age, and gender, adhering to Ayurvedic principles. For example, for a Pitta person, suggest cooling foods. For a Vata person, suggest warm, grounding foods. For a Kapha person, suggest light, stimulating foods. For dual-dosha types, provide a balanced plan that pacifies both doshas involved.`,
});

const generateAyurvedaDietChartFlow = ai.defineFlow(
  {
    name: 'generateAyurvedaDietChartFlow',
    inputSchema: GenerateAyurvedaDietChartInputSchema,
    outputSchema: GenerateAyurvedaDietChartOutputSchema,
  },
  async input => {
    const { text } = await ai.generate({ prompt: await prompt.render(input) });
    
    try {
        // The model should return a JSON string, so we parse it.
        const parsed = JSON.parse(text);
        if (parsed.dietChart) {
            return { dietChart: parsed.dietChart };
        }
    } catch (e) {
        // If parsing fails, it's likely the model returned raw HTML.
        // We'll wrap it in the expected object structure.
        return { dietChart: text };
    }
    
    // Fallback in case of unexpected structure
    return { dietChart: text };
  }
);
