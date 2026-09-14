import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getMongoDb } from '@/lib/db/mongodb';
import { hashPassword } from '@/lib/auth/session';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, newPassword } = body;

    if (!email || !newPassword || typeof newPassword !== 'string' || newPassword.length < 4) {
      return NextResponse.json({ error: 'Email and new password (minimum 4 characters) are required.' }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await db.users.findByEmail(normalizedEmail);
    if (!user) {
      return NextResponse.json({ error: 'No account found with this email address.' }, { status: 404 });
    }

    const passwordHash = hashPassword(newPassword);
    const mongoDb = await getMongoDb();
    if (mongoDb) {
      await mongoDb.collection('users').updateOne(
        { id: user.id },
        { $set: { passwordHash, updatedAt: new Date().toISOString() } }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Password reset successfully! You can now log in with your new password.',
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
