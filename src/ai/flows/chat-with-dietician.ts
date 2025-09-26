'use server';
/**
 * @fileOverview A streaming chat flow to converse with an AI dietician.
 *
 * - chatWithDietician - A function that handles the streaming chat.
 * - ChatWithDieticianInput - The input type for the chatWithDietician function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatWithDieticianInputSchema = z.object({
  dieticianName: z.string().describe("The name of the dietician to chat with."),
  dieticianSpecialization: z
    .string()
    .describe("The specialization of the dietician."),
  message: z.string().describe("The user's message to the dietician."),
  history: z.array(
      z.object({
          role: z.enum(['user', 'model']),
          parts: z.array(z.object({
              text: z.string()
          }))
      })
  ).describe("The chat history between the user and the dietician.")
});

export type ChatWithDieticianInput = z.infer<
  typeof ChatWithDieticianInputSchema
>;

export async function chatWithDietician(
  input: ChatWithDieticianInput
): Promise<string> {
  return chatWithDieticianFlow(input);
}

const chatWithDieticianFlow = ai.defineFlow(
  {
    name: 'chatWithDieticianFlow',
    inputSchema: ChatWithDieticianInputSchema,
    outputSchema: z.string(),
  },
  async (input: ChatWithDieticianInput) => {
    const { dieticianName, dieticianSpecialization, message, history } = input;

    const systemPrompt = `You are ${dieticianName}, an experienced dietician specializing in ${dieticianSpecialization}. 
    Your goal is to provide helpful, accurate, and supportive advice to the user based on Ayurvedic principles.
    Keep your responses concise and easy to understand. You are talking to a user in a real-time chat.
    `;

    const response = await ai.generate({
        model: 'googleai/gemini-2.5-flash',
        prompt: message,
        system: systemPrompt,
    });

    return response.text;
  }
);
