// Email Transporter & Branded HTML Templates Helper
// GoDaddy SMTP Integration (info@prayxis.in / smtpout.secureserver.net:465)

export type OtpType = 'SIGNUP' | 'LOGIN' | 'RESET_PASSWORD';

export interface SendOtpParams {
  to: string;
  otp: string;
  type: OtpType;
  name?: string;
}

export async function sendOtpEmail({ to, otp, type, name }: SendOtpParams): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const host = process.env.SMTP_HOST || 'smtpout.secureserver.net';
  const port = parseInt(process.env.SMTP_PORT || '465');
  const user = process.env.SMTP_USER || 'info@prayxis.in';
  const pass = process.env.SMTP_PASS || '@1234asdfG';
  const from = process.env.EMAIL_FROM || 'info@prayxis.in';

  let subject = 'Prayxis Verification Code';
  let headerTitle = 'PRAYXIS SECURITY VERIFICATION';
  let subtitle = 'Use the verification code below to complete your request:';

  if (type === 'SIGNUP') {
    subject = `[${otp}] Verify your Prayxis Account`;
    headerTitle = 'WELCOME TO PRAYXIS ACADEMY';
    subtitle = `Hello ${name || 'Student'}, thank you for registering with Prayxis. Please verify your email address to complete your account setup:`;
  } else if (type === 'RESET_PASSWORD') {
    subject = `[${otp}] Password Reset Request - Prayxis`;
    headerTitle = 'PASSWORD RESET VERIFICATION';
    subtitle = `Hello ${name || 'User'}, we received a request to reset your Prayxis account password. Enter the code below:`;
  } else if (type === 'LOGIN') {
    subject = `[${otp}] Security Login Code - Prayxis`;
    headerTitle = 'PRAYXIS ACCOUNT LOGIN CODE';
    subtitle = `Hello ${name || 'User'}, enter this single-use code to authenticate your session:`;
  }

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${subject}</title>
  <style>
    body { margin: 0; padding: 0; background-color: #050507; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #E2E8F0; }
    .container { max-width: 540px; margin: 30px auto; background-color: #0B0C10; border: 1.5px solid #F59E0B; border-radius: 16px; overflow: hidden; box-shadow: 0 0 30px rgba(245, 158, 11, 0.25); }
    .header { background-color: #0F111A; padding: 24px; text-align: center; border-bottom: 1px solid rgba(255, 255, 255, 0.1); }
    .logo { color: #FFFFFF; font-size: 24px; font-weight: 900; letter-spacing: 3px; margin: 0; }
    .logo span { color: #F59E0B; }
    .badge { display: inline-block; padding: 4px 14px; margin-top: 8px; background-color: rgba(245, 158, 11, 0.15); border: 1px solid rgba(245, 158, 11, 0.5); border-radius: 20px; color: #F59E0B; font-size: 11px; font-weight: bold; text-transform: uppercase; }
    .content { padding: 32px 24px; text-align: center; }
    .title { font-size: 18px; font-weight: bold; color: #FFFFFF; text-transform: uppercase; margin-bottom: 12px; }
    .subtitle { font-size: 14px; color: #94A3B8; line-height: 1.6; margin-bottom: 24px; }
    .otp-box { background-color: #050507; border: 2px dashed #F59E0B; border-radius: 10px; padding: 18px; font-size: 34px; font-weight: 900; letter-spacing: 8px; color: #F59E0B; margin: 20px 0; }
    .warning { font-size: 12px; color: #F59E0B; margin-top: 20px; padding: 10px; background-color: rgba(245, 158, 11, 0.1); border-radius: 8px; }
    .footer { background-color: #0F111A; padding: 18px; text-align: center; font-size: 11px; color: #64748B; border-top: 1px solid rgba(255, 255, 255, 0.08); }
    .footer a { color: #F59E0B; text-decoration: none; font-weight: bold; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">PRAY<span>XIS</span></div>
      <div class="badge">${headerTitle}</div>
    </div>
    <div class="content">
      <div class="subtitle">${subtitle}</div>
      <div class="otp-box">${otp}</div>
      <div class="warning">⏱️ This 6-digit code will expire in <strong>10 minutes</strong>. Do not share this OTP with anyone.</div>
    </div>
    <div class="footer">
      <div>PRAYXIS GLOBAL TECHNOLOGY & RESEARCH LABS</div>
      <div style="margin-top: 6px;">Need support? Email us at <a href="mailto:info@prayxis.in">info@prayxis.in</a></div>
    </div>
  </div>
</body>
</html>
  `;

  const nodemailer = await import('nodemailer');

  // List of connection strategies to ensure 100% email delivery across hosting environments
  const configs = [
    // 1. Primary GoDaddy SSL (Port 465)
    {
      host,
      port: 465,
      secure: true,
      auth: { user, pass },
      tls: { rejectUnauthorized: false },
      connectionTimeout: 8000,
    },
    // 2. GoDaddy TLS (Port 587)
    {
      host,
      port: 587,
      secure: false,
      auth: { user, pass },
      tls: { rejectUnauthorized: false },
      connectionTimeout: 8000,
    },
    // 3. Microsoft 365 / GoDaddy Exchange fallback
    {
      host: 'smtp.office365.com',
      port: 587,
      secure: false,
      auth: { user, pass },
      tls: { rejectUnauthorized: false },
      connectionTimeout: 8000,
    },
  ];

  let lastError: any = null;

  for (const transportConfig of configs) {
    try {
      const transporter = nodemailer.createTransport(transportConfig);
      const info = await transporter.sendMail({
        from: `"PRAYXIS Academy" <${from}>`,
        to,
        subject,
        html: htmlContent,
      });

      console.log(`✉️ [SMTP SUCCESS via ${transportConfig.host}:${transportConfig.port}] OTP sent to ${to} (ID: ${info.messageId})`);
      return { success: true, messageId: info.messageId };
    } catch (err: any) {
      lastError = err;
      console.warn(`[SMTP Attempt Failed on ${transportConfig.host}:${transportConfig.port}]:`, err.message || err);
    }
  }

  console.error(`❌ [SMTP FATAL ERROR] All delivery strategies failed for ${to}:`, lastError?.message || lastError);
  return { success: false, error: lastError?.message || 'Failed to connect to email server' };
}
