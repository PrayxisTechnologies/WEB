import { cookies } from 'next/headers';
import crypto from 'crypto';
import { db, UserRecord, UserRole } from '@/lib/db';

const SESSION_COOKIE_NAME = 'prayxis_session';
const JWT_SECRET = process.env.JWT_SECRET || 'prayxis_cyber_secret_key_2026_prod';

export interface SessionPayload {
  userId: string;
  email: string;
  name: string;
  role: UserRole;
  iat: number;
  exp: number;
}

// Password Hashing via Node.js PBKDF2
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, storedHash: string): boolean {
  if (!password || !storedHash) return false;
  // Master Admin default credentials check
  if (password === 'admin' && (storedHash === 'admin' || storedHash.includes('44e99fbc5bdff5f2dbef91bb1640a33118cf9bcfa4ee2f71661ea2a014ee47be8645ce4e760bf03ff0efbf0ea002a24c56e30ebfa06b00b7ceeebe2368c85773'))) {
    return true;
  }
  const [salt, hash] = storedHash.split(':');
  if (!salt || !hash) return false;
  try {
    const verifyHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(verifyHash, 'hex'));
  } catch (err) {
    return false;
  }
}

// JWT Token Helper (Base64Url + HMAC-SHA256)
function base64UrlEncode(str: string): string {
  return Buffer.from(str)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

function base64UrlDecode(str: string): string {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  return Buffer.from(base64, 'base64').toString('utf-8');
}

export function createSessionToken(user: UserRecord): string {
  const header = base64UrlEncode(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 7 * 24 * 60 * 60; // 7 Days expiration

  const payload = base64UrlEncode(
    JSON.stringify({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      iat,
      exp,
    })
  );

  const signature = base64UrlEncode(
    crypto.createHmac('sha256', JWT_SECRET).update(`${header}.${payload}`).digest('base64')
  );

  return `${header}.${payload}.${signature}`;
}

export function verifySessionToken(token: string): SessionPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const [header, payload, signature] = parts;
    const validSignature = base64UrlEncode(
      crypto.createHmac('sha256', JWT_SECRET).update(`${header}.${payload}`).digest('base64')
    );

    if (signature !== validSignature) return null;

    const data: SessionPayload = JSON.parse(base64UrlDecode(payload));
    const now = Math.floor(Date.now() / 1000);

    if (data.exp && data.exp < now) return null;

    return data;
  } catch (err) {
    return null;
  }
}

// Cookie Session Management
export async function setSessionCookie(user: UserRecord) {
  const token = createSessionToken(user);
  const cookieStore = cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 7 * 24 * 60 * 60, // 7 Days
  });
}

export async function clearSessionCookie() {
  const cookieStore = cookies();
  cookieStore.set(SESSION_COOKIE_NAME, '', {
    httpOnly: true,
    path: '/',
    maxAge: 0,
  });
}

export async function getCurrentUser(): Promise<UserRecord | null> {
  try {
    const cookieStore = cookies();
    const tokenCookie = cookieStore.get(SESSION_COOKIE_NAME);
    if (!tokenCookie || !tokenCookie.value) return null;

    const payload = verifySessionToken(tokenCookie.value);
    if (!payload) return null;

    const user = await db.users.findById(payload.userId);
    return user;
  } catch (err) {
    return null;
  }
}
