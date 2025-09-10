
import { NextResponse } from 'next/server';
import { patients } from '@/lib/data';
import { foodDatabase } from '@/lib/data';
import { recipes } from '@/lib/data';

// GET /api/admin/stats
export async function GET(request: Request) {
  // =================================================================
  // DEVELOPER NOTE: System Statistics Logic
  // This is a placeholder for generating system-wide statistics.
  //
  // In a real application, these would be complex database queries.
  // For example:
  // - `SELECT COUNT(*) FROM users;`
  // - `SELECT food_id, COUNT(*) as usage_count FROM meal_logs GROUP BY food_id ORDER BY usage_count DESC;`
  // - `SELECT role, COUNT(*) FROM users GROUP BY role;`
  //
  // For now, we are returning simple counts from our in-memory data arrays.
  // =================================================================

  const stats = {
    patientCount: patients.length,
    foodItemCount: foodDatabase.length,
    recipeCount: recipes.length,
    // Placeholder for more complex stats
    mostUsedFoods: [
      { name: 'Ghee', count: 150 },
      { name: 'Turmeric', count: 120 },
      { name: 'Moong Dal', count: 90 },
    ],
    userRoles: [
      { role: 'doctor', count: 5 },
      { role: 'dietitian', count: 12 },
      { role: 'staff', count: 8 },
    ]
  };

  return NextResponse.json(stats);
}
