'use server';

import {
  generateAyurvedaDietChart,
  type GenerateAyurvedaDietChartInput,
} from '@/ai/flows/generate-ayurveda-diet-chart';
import {
  suggestSeasonalFoods,
  type SuggestSeasonalFoodsInput,
} from '@/ai/flows/suggest-seasonal-foods';
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
