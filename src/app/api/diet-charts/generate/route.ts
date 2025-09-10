
import { NextResponse } from 'next/server';
import { generatePatientDietChart } from '@/ai/flows/generate-patient-diet-chart';
import { z } from 'zod';
import { dietCharts, type DietChart } from '@/lib/data';

const generateRequestSchema = z.object({
  patientId: z.string(),
  healthGoals: z.string(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = generateRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid request body', details: parsed.error.errors }, { status: 400 });
    }

    const { patientId, healthGoals } = parsed.data;

    // Call the AI flow to generate the diet chart content
    const result = await generatePatientDietChart({ patientId, healthGoals });

    // Create a new diet chart object and save it (in-memory)
    const newDietChart: DietChart = {
      id: `chart${Date.now()}`,
      patientId,
      healthGoals,
      chartContent: result.dietChart,
      createdAt: new Date().toISOString(),
    };
    dietCharts.push(newDietChart);

    return NextResponse.json(newDietChart, { status: 201 });

  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ error: e.message || 'An unexpected error occurred' }, { status: 500 });
  }
}
