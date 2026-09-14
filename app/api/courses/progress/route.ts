import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth/session';
import { db } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const courseSlug = searchParams.get('courseSlug') || 'full-stack';

    const completedDays = await db.dayProgress.getCompletedDays(user.id, courseSlug);

    return NextResponse.json({
      success: true,
      completedDays,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { courseSlug = 'full-stack', dayNumber = 1 } = body;

    const record = await db.dayProgress.markCompleted(user.id, courseSlug, Number(dayNumber));

    return NextResponse.json({
      success: true,
      record,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
