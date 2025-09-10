
import { NextResponse } from 'next/server';
import { recipes, type Recipe } from '@/lib/data';

export async function GET() {
  return NextResponse.json(recipes);
}

export async function POST(request: Request) {
  const newRecipe: Recipe = await request.json();
  recipes.push(newRecipe);
  return NextResponse.json(newRecipe, { status: 201 });
}
