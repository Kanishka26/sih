
import { NextResponse } from 'next/server';
import { dietCharts } from '@/lib/data';

// GET /api/diet-charts/{id} - Get a single diet chart
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const chart = dietCharts.find((c) => c.id === params.id);
  if (chart) {
    return NextResponse.json(chart);
  }
  return new NextResponse('Diet chart not found', { status: 404 });
}

// PUT /api/diet-charts/{id} - Update a diet chart
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const chartIndex = dietCharts.findIndex((c) => c.id === params.id);
  if (chartIndex === -1) {
    return new NextResponse('Diet chart not found', { status: 404 });
  }

  try {
    const updatedData = await request.json();
    // We only allow modifying the content or goals, not patientId or id
    if (updatedData.chartContent) {
        dietCharts[chartIndex].chartContent = updatedData.chartContent;
    }
    if (updatedData.healthGoals) {
        dietCharts[chartIndex].healthGoals = updatedData.healthGoals;
    }
    
    return NextResponse.json(dietCharts[chartIndex]);
  } catch (e) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}

// DELETE /api/diet-charts/{id} - Delete a diet chart
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const chartIndex = dietCharts.findIndex((c) => c.id === params.id);
  if (chartIndex === -1) {
    return new NextResponse('Diet chart not found', { status: 404 });
  }

  const deletedChart = dietCharts.splice(chartIndex, 1);
  return NextResponse.json(deletedChart[0]);
}
