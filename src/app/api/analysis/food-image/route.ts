
import { NextResponse } from 'next/server';
import { analyzeFoodImage } from '@/ai/flows/analyze-food-image';
import { z } from 'zod';

const analyzeRequestSchema = z.object({
  photoDataUri: z.string().startsWith('data:image/'),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = analyzeRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid request body. A valid data URI for an image is required.', details: parsed.error.errors }, { status: 400 });
    }

    const result = await analyzeFoodImage(parsed.data);
    return NextResponse.json(result);
  } catch (e: any) {
    console.error('Food image analysis failed:', e);
    return NextResponse.json({ error: e.message || 'An unexpected error occurred during analysis.' }, { status: 500 });
  }
}

    