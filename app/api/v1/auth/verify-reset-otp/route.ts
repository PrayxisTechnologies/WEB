import { NextRequest, NextResponse } from 'next/server';
import { otpStore } from '@/lib/db/otpStore';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, otp } = body;

    if (!email || !otp) {
      return NextResponse.json({ error: 'Email and 6-digit OTP code are required.' }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const verification = await otpStore.verify(normalizedEmail, otp, 'RESET_PASSWORD');
    if (!verification.valid) {
      return NextResponse.json({ error: verification.reason }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: 'OTP code verified successfully. You may now enter your new password.',
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
