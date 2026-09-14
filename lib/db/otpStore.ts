// OTP Store Helper - Handles 6-Digit Codes, Expiry Timers, and MongoDB Atlas Sync
import fs from 'fs';
import path from 'path';
import { getMongoDb } from './mongodb';
import { sendOtpEmail, OtpType } from '../email/mailer';

export interface OtpRecord {
  id: string;
  email: string;
  otp: string;
  type: OtpType;
  createdAt: string;
  expiresAt: string;
}

// Global In-Memory Map
const globalStore = global as unknown as {
  __prayxis_otps?: Map<string, OtpRecord>;
};

if (!globalStore.__prayxis_otps) {
  globalStore.__prayxis_otps = new Map();
}

const otpsMap = globalStore.__prayxis_otps;

const OTP_EXPIRY_MINUTES = parseInt(process.env.OTP_EXPIRY_MINUTES || '10');

export const otpStore = {
  /**
   * Generates a 6-digit OTP, saves it in memory/DB, and dispatches the email.
   */
  generateAndSend: async (email: string, type: OtpType, name?: string): Promise<{ success: boolean; otp: string; expiresAt: string }> => {
    const normalizedEmail = email.toLowerCase().trim();
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const now = new Date();
    const expiresAtDate = new Date(now.getTime() + OTP_EXPIRY_MINUTES * 60 * 1000);
    const createdAt = now.toISOString();
    const expiresAt = expiresAtDate.toISOString();

    const key = `${normalizedEmail}_${type}`;
    const record: OtpRecord = {
      id: `otp_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      email: normalizedEmail,
      otp,
      type,
      createdAt,
      expiresAt,
    };

    otpsMap.set(key, record);

    // Sync to MongoDB Atlas Cloud
    try {
      const mongoDb = await getMongoDb();
      if (mongoDb) {
        const otpsCol = mongoDb.collection('otps');
        await otpsCol.updateOne({ email: normalizedEmail, type }, { $set: record }, { upsert: true });
      }
    } catch (err) {
      // Failover to memory
    }

    // Send Email via Nodemailer
    let mailSent = false;
    let mailError: string | undefined;

    try {
      const mailResult = await sendOtpEmail({ to: normalizedEmail, otp, type, name });
      mailSent = mailResult.success;
      mailError = mailResult.error;
    } catch (err: any) {
      mailError = err.message || 'SMTP connection error';
    }

    if (!mailSent) {
      console.warn(`⚠️ [OTP STORE] Email dispatch warning for ${normalizedEmail} (${mailError}). Saved active OTP in DB: ${otp}`);
    } else {
      console.log(`✅ [OTP STORE] Email sent successfully to ${normalizedEmail}`);
    }

    return {
      success: true,
      otp,
      expiresAt,
    };
  },

  /**
   * Verifies if the provided OTP is valid and not expired.
   */
  verify: async (email: string, otp: string, type: OtpType): Promise<{ valid: boolean; reason?: string }> => {
    const normalizedEmail = email.toLowerCase().trim();
    const key = `${normalizedEmail}_${type}`;
    let record = otpsMap.get(key);

    // Try fetching from MongoDB Atlas if not in memory
    if (!record) {
      try {
        const mongoDb = await getMongoDb();
        if (mongoDb) {
          const otpsCol = mongoDb.collection('otps');
          const doc = await otpsCol.findOne({ email: normalizedEmail, type });
          if (doc) {
            record = doc as unknown as OtpRecord;
          }
        }
      } catch (err) {
        // Ignore DB read error
      }
    }

    if (!record) {
      return { valid: false, reason: 'No OTP requested for this email. Please click Resend OTP.' };
    }

    if (new Date() > new Date(record.expiresAt)) {
      otpsMap.delete(key);
      return { valid: false, reason: 'OTP has expired (10 minute limit). Please request a new code.' };
    }

    if (record.otp.trim() !== otp.trim()) {
      return { valid: false, reason: 'Invalid 6-digit OTP code. Please check your email and try again.' };
    }

    // Valid single-use OTP — delete after verification
    otpsMap.delete(key);
    try {
      const mongoDb = await getMongoDb();
      if (mongoDb) {
        await mongoDb.collection('otps').deleteOne({ email: normalizedEmail, type });
      }
    } catch (e) {}

    return { valid: true };
  },

  /**
   * Helper to retrieve latest active OTP (for DEV notice fallback).
   */
  getLatest: (email: string, type: OtpType): OtpRecord | null => {
    const key = `${email.toLowerCase().trim()}_${type}`;
    return otpsMap.get(key) || null;
  },
};
