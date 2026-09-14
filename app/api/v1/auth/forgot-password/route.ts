import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { otpStore } from '@/lib/db/otpStore';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email address is required.' }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Verify user exists in database
    const user = await db.users.findByEmail(normalizedEmail);
    if (!user) {
      return NextResponse.json({ error: 'No registered Prayxis account found with this email address.' }, { status: 404 });
    }

    // Generate & Dispatch Reset OTP
    const result = await otpStore.generateAndSend(normalizedEmail, 'RESET_PASSWORD', user.name);

    return NextResponse.json({
      success: true,
      message: `A 6-digit password reset OTP has been generated for ${normalizedEmail}. Code expires in 10 minutes.`,
      email: normalizedEmail,
      devOtp: result.otp,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
