import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth/session';
import { db } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized session' }, { status: 401 });
    }

    const body = await req.json();
    const { courseSlug = 'full-stack', dayNumber = 1, incrementSeconds = 30, isActive = true } = body;

    // Validate integer range (prevent arbitrary client manipulation)
    const validIncrement = isActive ? Math.min(60, Math.max(0, Number(incrementSeconds) || 30)) : 0;

    const stats = await db.timeLogs.recordHeartbeat(
      user.id,
      courseSlug,
      Number(dayNumber) || 1,
      validIncrement
    );

    return NextResponse.json({
      success: true,
      user: { id: user.id, email: user.email },
      recordedIncrement: validIncrement,
      stats: {
        todayActiveSeconds: stats.todaySeconds,
        totalCourseSeconds: stats.courseSeconds,
        dayActiveSeconds: stats.daySeconds,
      },
      dailyLog: stats.dailyLog,
      isDailyTargetMet: stats.dailyLog?.isTargetMet || false,
      dailyCompletionPercentage: stats.dailyLog?.completionPercentage || 0,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
