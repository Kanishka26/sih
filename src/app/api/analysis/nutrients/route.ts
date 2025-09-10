import { NextResponse } from 'next/server';
import { analyzeMealNutrients } from '@/ai/flows/analyze-meal-nutrients';
import { z } from 'zod';

const nutrientRequestSchema = z.object({
  foodItems: z.array(z.string()),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = nutrientRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid request body', details: parsed.error.errors }, { status: 400 });
    }

    const result = await analyzeMealNutrients(parsed.data);
    return NextResponse.json(result);
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'An unexpected error occurred' }, { status: 500 });
  }
}
