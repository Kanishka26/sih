import { NextResponse } from 'next/server';
import { analyzePatientBalance } from '@/ai/flows/analyze-patient-balance';
import { z } from 'zod';

const patientBalanceRequestSchema = z.object({
  patientPrakriti: z.string(),
  currentDiet: z.array(z.string()),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = patientBalanceRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid request body', details: parsed.error.errors }, { status: 400 });
    }

    const result = await analyzePatientBalance(parsed.data);
    return NextResponse.json(result);
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'An unexpected error occurred' }, { status: 500 });
  }
}
