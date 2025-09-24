
'use server';

import {
  generateAyurvedaDietChart,
  type GenerateAyurvedaDietChartInput,
} from '@/ai/flows/generate-ayurveda-diet-chart';
import {
  suggestSeasonalFoods,
  type SuggestSeasonalFoodsInput,
} from '@/ai/flows/suggest-seasonal-foods';
import {
  chatWithDietician,
  type ChatWithDieticianInput,
} from '@/ai/flows/chat-with-dietician';
import {
    analyzeMealRasas,
    type AnalyzeMealRasasInput,
} from '@/ai/flows/analyze-meal-rasas';
import { z } from 'zod';

const dietChartSchema = z.object({
  age: z.coerce.number().min(1).max(120),
  gender: z.enum(['male', 'female']),
  prakriti: z.enum(['Vata', 'Pitta', 'Kapha']),
});

export async function generateDietChartAction(input: GenerateAyurvedaDietChartInput) {
  const parsedInput = dietChartSchema.safeParse(input);
  if (!parsedInput.success) {
    throw new Error('Invalid input');
  }
  return await generateAyurvedaDietChart(parsedInput.data);
}

const seasonalFoodsSchema = z.object({
  currentSeason: z.enum(['spring', 'summer', 'fall', 'winter']),
  userPrakriti: z.enum(['Vata', 'Pitta', 'Kapha']),
  location: z.string().min(2, 'Location must be at least 2 characters.'),
});

export async function suggestSeasonalFoodsAction(
  input: SuggestSeasonalFoodsInput
) {
  const parsedInput = seasonalFoodsSchema.safeParse(input);
  if (!parsedInput.success) {
    throw new Error('Invalid input');
  }
  return await suggestSeasonalFoods(parsedInput.data);
}


const chatWithDieticianSchema = z.object({
  dieticianName: z.string(),
  dieticianSpecialization: z.string(),
  message: z.string(),
  history: z.array(z.any()),
});

export async function chatWithDieticianAction(input: ChatWithDieticianInput) {
    const parsedInput = chatWithDieticianSchema.safeParse(input);
    if (!parsedInput.success) {
        throw new Error('Invalid input for chat');
    }
    return await chatWithDietician(parsedInput.data);
}

const analyzeMealRasasSchema = z.object({
    foodItems: z.array(z.string()).min(1, "Please provide at least one food item."),
});

export async function analyzeMealRasasAction(input: AnalyzeMealRasasInput) {
    const parsedInput = analyzeMealRasasSchema.safeParse(input);
    if (!parsedInput.success) {
        throw new Error('Invalid input for rasa analysis');
    }
    return await analyzeMealRasas(parsedInput.data);
}
