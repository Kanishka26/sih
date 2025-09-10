
import { NextResponse } from 'next/server';
import { foodDatabase } from '@/lib/data';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const food = foodDatabase.find((f) => f.id === params.id);
  if (food) {
    return NextResponse.json(food);
  }
  return new NextResponse('Food not found', { status: 404 });
}
