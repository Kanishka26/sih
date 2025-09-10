
import { NextRequest, NextResponse } from 'next/server';
import { users, type User } from '@/lib/data'; 

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Name, email, and password are required' }, { status: 400 });
    }

    // Check if user already exists
    if (users.find(u => u.email === email)) {
      return NextResponse.json({ error: 'User with this email already exists' }, { status: 409 });
    }

    const newUser: User = {
      id: `user${Date.now()}`,
      name,
      email,
      password,
      role: 'patient', // Default role
    };

    users.push(newUser);

    return NextResponse.json({ message: 'User registered successfully', userId: newUser.id }, { status: 201 });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
