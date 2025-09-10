
import { NextResponse } from 'next/server';
import { patients } from '@/lib/data';

// GET /api/patients/{id} - Get a single patient
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const patient = patients.find((p) => p.id === params.id);
  if (patient) {
    return NextResponse.json(patient);
  }
  return new NextResponse('Patient not found', { status: 404 });
}

// PUT /api/patients/{id} - Update a patient
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const patientIndex = patients.findIndex((p) => p.id === params.id);
  if (patientIndex === -1) {
    return new NextResponse('Patient not found', { status: 404 });
  }

  try {
    const updatedData = await request.json();
    patients[patientIndex] = { ...patients[patientIndex], ...updatedData };
    return NextResponse.json(patients[patientIndex]);
  } catch (e) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}

// DELETE /api/patients/{id} - Delete a patient
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const patientIndex = patients.findIndex((p) => p.id === params.id);
  if (patientIndex === -1) {
    return new NextResponse('Patient not found', { status: 404 });
  }

  const deletedPatient = patients.splice(patientIndex, 1);
  return NextResponse.json(deletedPatient[0]);
}
