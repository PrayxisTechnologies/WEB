import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getMongoHealth } from '@/lib/db/mongodb';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const testEmailTarget = url.searchParams.get('email') || url.searchParams.get('testEmail');

    let emailResult: any = null;

    if (testEmailTarget) {
      const host = process.env.SMTP_HOST || 'smtpout.secureserver.net';
      const port = parseInt(process.env.SMTP_PORT || '465');
      const user = process.env.SMTP_USER || 'info@prayxis.in';
      const pass = process.env.SMTP_PASS || '@1234asdfG';
      const otp = Math.floor(100000 + Math.random() * 900000).toString();

      try {
        const nodemailer = await import('nodemailer');
        const transporter = nodemailer.createTransport({
          host,
          port,
          secure: true,
          auth: {
            user,
            pass,
          },
          tls: {
            rejectUnauthorized: false,
          },
        });

        // Verify connection
        await transporter.verify();

        // Send Test Mail
        const info = await transporter.sendMail({
          from: `"PRAYXIS Academy" <${user}>`,
          to: testEmailTarget,
          subject: `[${otp}] Your Prayxis Verification Code`,
          html: `
            <div style="background-color: #0b0c10; color: #ffffff; padding: 30px; font-family: sans-serif; border-radius: 12px; border: 1.5px solid #f59e0b; max-width: 520px; margin: auto;">
              <h2 style="color: #fbbf24; text-align: center; margin-bottom: 8px; letter-spacing: 2px;">PRAYXIS ACADEMY</h2>
              <div style="text-align: center; margin-bottom: 20px;">
                <span style="background: rgba(245,158,11,0.2); color: #fbbf24; padding: 4px 12px; border-radius: 12px; font-size: 11px; font-weight: bold;">LIVE EMAIL TEST VERIFICATION</span>
              </div>
              <p style="color: #e2e8f0; font-size: 14px; text-align: center;">Hello <strong>Prashant Singh</strong>, your Prayxis 6-digit test OTP is:</p>
              <div style="background-color: #050507; border: 2px dashed #fbbf24; border-radius: 8px; padding: 16px; font-size: 34px; font-weight: 900; letter-spacing: 8px; color: #fbbf24; text-align: center; margin: 20px 0;">
                ${otp}
              </div>
              <p style="color: #94a3b8; font-size: 12px; text-align: center;">This code is valid for 10 minutes. Sent from <strong>${user}</strong>.</p>
            </div>
          `,
        });

        emailResult = {
          success: true,
          status: 'EMAIL_DISPATCHED',
          to: testEmailTarget,
          otp,
          messageId: info.messageId,
          accepted: info.accepted,
          smtpServer: `${host}:${port}`,
          from: user,
        };
      } catch (mailErr: any) {
        emailResult = {
          success: false,
          status: 'EMAIL_FAILED',
          error: mailErr.message || String(mailErr),
          smtpServer: `${host}:${port}`,
          from: user,
        };
      }
    }

    const health = await db.getHealthStatus();
    const atlasHealth = await getMongoHealth();

    return NextResponse.json({
      success: true,
      emailTest: emailResult,
      atlas: atlasHealth,
      health,
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        error: err.message || 'Database connection error',
      },
      { status: 500 }
    );
  }
}

