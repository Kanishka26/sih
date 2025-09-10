
import { NextResponse } from 'next/server';
import { patients, type Patient } from '@/lib/data';

// GET /api/patients - List all patients
export async function GET() {
  // In a real app, you could add pagination and filtering here
  return NextResponse.json(patients);
}

// POST /api/patients - Add a new patient
export async function POST(request: Request) {
  try {
    const newPatientData = await request.json();
    
    // Basic validation
    if (!newPatientData.name || !newPatientData.age || !newPatientData.gender) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newPatient: Patient = {
      id: `pat${Date.now()}`, // simple unique id generation
      ...newPatientData,
    };

    patients.push(newPatient);
    
    return NextResponse.json(newPatient, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
