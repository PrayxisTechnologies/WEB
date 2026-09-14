import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { otpStore } from '@/lib/db/otpStore';
import { createSessionToken, setSessionCookie } from '@/lib/auth/session';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password, otp } = body;

    if (!name || !email || !password || !otp) {
      return NextResponse.json({ error: 'Name, email, password, and 6-digit OTP are required.' }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Verify OTP code
    const verification = await otpStore.verify(normalizedEmail, otp, 'SIGNUP');
    if (!verification.valid) {
      return NextResponse.json({ error: verification.reason }, { status: 400 });
    }

    // Double-check existing user
    const existingUser = await db.users.findByEmail(normalizedEmail);
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists.' }, { status: 400 });
    }

    // Create New User Account in Database
    const newUser = await db.users.create({
      name: name.trim(),
      email: normalizedEmail,
      passwordHash: password, // In production, hash with bcrypt
      role: 'STUDENT',
      isApproved: false, // New registrations require Master Admin approval
    });

    // Create session cookie
    await setSessionCookie(newUser);

    return NextResponse.json({
      success: true,
      message: 'ID CREATED // PENDING ADMIN VERIFICATION',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        isApproved: newUser.isApproved,
        createdAt: newUser.createdAt,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
