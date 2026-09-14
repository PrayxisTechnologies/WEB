import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth/session';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const url = new URL(req.url);
    const date = url.searchParams.get('date') || new Date().toISOString().split('T')[0];
    const fetchAll = url.searchParams.get('all') === 'true';
    const courseSlug = url.searchParams.get('courseSlug') || 'python-basics';
    const dayNumber = Number(url.searchParams.get('dayNumber')) || 1;

    // Admin view for all logs & compliance stats (Approved Students Only)
    if (user.role === 'ADMIN' && fetchAll) {
      const allUsers = await db.users.getAll();

      // Only include approved students with unlocked courses (exclude Admin and unapproved users)
      const approvedStudentIds = new Set(
        allUsers.filter((u) => u.role === 'STUDENT' && u.isApproved).map((u) => u.id)
      );

      const rawDailyLogs = await db.dailyLogs.getByDate(date);
      const studentDailyLogs = rawDailyLogs.filter((l) => approvedStudentIds.has(l.userId));

      // Calculate summary for approved students only
      const totalActiveStudents = new Set(studentDailyLogs.map((l) => l.userId)).size;
      const targetMetCount = studentDailyLogs.filter((l) => l.isTargetMet).length;
      const inProgressCount = studentDailyLogs.filter((l) => !l.isTargetMet && l.activeSeconds > 0).length;
      const totalSecondsLogged = studentDailyLogs.reduce((sum, l) => sum + l.activeSeconds, 0);

      const summary = {
        date,
        totalActiveStudents,
        targetMetCount,
        inProgressCount,
        totalSecondsLogged,
        totalHoursLogged: (totalSecondsLogged / 3600).toFixed(1),
        targetMetPercentage: totalActiveStudents > 0 ? Math.round((targetMetCount / totalActiveStudents) * 100) : 0,
      };

      const allHistoricalLogs = (await db.dailyLogs.getAllLogs()).filter((l) => approvedStudentIds.has(l.userId));

      return NextResponse.json({
        success: true,
        date,
        summary,
        dailyLogs: studentDailyLogs,
        totalHistoricalRecords: allHistoricalLogs.length,
      });
    }

    // Student view for their personal today log & streak
    const todayLog = await db.dailyLogs.getTodayLog(user.id, courseSlug, dayNumber);
    const userLogs = await db.dailyLogs.getUserLogs(user.id);
    const streak = await db.dailyLogs.getUserStreak(user.id);

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      todayLog,
      streak,
      history: userLogs.slice(0, 14), // Last 14 days
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
