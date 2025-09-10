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
    analyzeFoodImage,
    type AnalyzeFoodImageInput,
} from '@/ai/flows/analyze-food-image';
import { z } from 'zod';

const dietChartSchema = z.object({
  age: z.coerce.number().min(1).max(120),
  gender: z.enum(['male', 'female']),
  prakriti: z.string().min(2),
});

export async function generateDietChartAction(input: GenerateAyurvedaDietChartInput) {
  const parsedInput = dietChartSchema.safeParse(input);
  if (!parsedInput.success) {
    throw new Error('Invalid input');
  }
  return await generateAyurvedaDietChart(parsedInput.data);
}

const seasonalFoodsSchema = z.object({
  currentSeason: z.string().min(2),
  userPrakriti: z.string().min(2),
  location: z.string().min(2),
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

const chatSchema = z.object({
    dieticianName: z.string(),
    dieticianSpecialization: z.string(),
    message: z.string(),
    history: z.array(z.object({
        role: z.enum(['user', 'model']),
        parts: z.array(z.object({
            text: z.string()
        }))
    }))
});

export async function chatWithDieticianAction(input: ChatWithDieticianInput) {
    const parsedInput = chatSchema.safeParse(input);
    if (!parsedInput.success) {
        throw new Error('Invalid input: ' + parsedInput.error.message);
    }
    return await chatWithDietician(parsedInput.data);
}

const analyzeFoodImageSchema = z.object({
    photoDataUri: z.string(),
});

export async function analyzeFoodImageAction(input: AnalyzeFoodImageInput) {
    const parsedInput = analyzeFoodImageSchema.safeParse(input);
    if (!parsedInput.success) {
        throw new Error('Invalid input: ' + parsedInput.error.message);
    }
    return await analyzeFoodImage(parsedInput.data);
}
