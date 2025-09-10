
import { NextRequest, NextResponse } from 'next/server';
import { users } from '@/lib/data'; // We'll use this for mock user data
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key';

export async function GET(request: NextRequest) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    
    // Find the user in our mock database
    const user = users.find(u => u.id === decoded.userId);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Don't send the password back
    const { password, ...userProfile } = user;

    return NextResponse.json({ user: userProfile });
  } catch (error) {
    console.error('Profile fetch error:', error);
    // This can happen if the token is invalid or expired
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}
