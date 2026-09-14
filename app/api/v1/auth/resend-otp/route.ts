import { NextRequest, NextResponse } from 'next/server';
import { otpStore } from '@/lib/db/otpStore';
import { OtpType } from '@/lib/email/mailer';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, type, name } = body;

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email address is required.' }, { status: 400 });
    }

    const otpType: OtpType = type === 'RESET_PASSWORD' ? 'RESET_PASSWORD' : type === 'LOGIN' ? 'LOGIN' : 'SIGNUP';
    const normalizedEmail = email.toLowerCase().trim();

    const result = await otpStore.generateAndSend(normalizedEmail, otpType, name);

    return NextResponse.json({
      success: true,
      message: `A fresh 6-digit OTP code has been generated for ${normalizedEmail}. Code expires in 10 minutes.`,
      email: normalizedEmail,
      devOtp: result.otp,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
