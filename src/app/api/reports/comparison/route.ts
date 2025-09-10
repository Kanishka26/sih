import { NextResponse } from 'next/server';
import { compareDietCharts } from '@/ai/flows/compare-diet-charts';
import { dietCharts } from '@/lib/data';
import { z } from 'zod';

const comparisonRequestSchema = z.object({
  chartOneId: z.string(),
  chartTwoId: z.string(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = comparisonRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid request body', details: parsed.error.errors }, { status: 400 });
    }

    const { chartOneId, chartTwoId } = parsed.data;

    const chartOne = dietCharts.find(c => c.id === chartOneId);
    const chartTwo = dietCharts.find(c => c.id === chartTwoId);

    if (!chartOne || !chartTwo) {
        return NextResponse.json({ error: 'One or both diet charts not found' }, { status: 404 });
    }
    
    // In a real app, you would fetch patient goals. For now, we'll use the goals from the newer chart.
    const result = await compareDietCharts({
        chartOneContent: chartOne.chartContent,
        chartTwoContent: chartTwo.chartContent,
        healthGoals: chartTwo.healthGoals,
    });
    
    return NextResponse.json(result);

  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'An unexpected error occurred' }, { status: 500 });
  }
}
