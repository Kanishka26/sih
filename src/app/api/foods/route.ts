
import { NextResponse } from 'next/server';
import { foodDatabase, type Food } from '@/lib/data';

export async function GET() {
  return NextResponse.json(foodDatabase);
}

export async function POST(request: Request) {
  const newFood: Food = await request.json();
  foodDatabase.push(newFood);
  return NextResponse.json(newFood, { status: 201 });
}
