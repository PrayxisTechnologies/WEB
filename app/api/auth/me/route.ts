import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth/session';
import { db } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ authenticated: false, user: null }, { status: 200 });
    }

    // Touch last active timestamp for logged in user (non-blocking)
    db.users.updateLastActive(user.id).catch(() => {});

    const url = new URL(req.url);
    const fetchAll = url.searchParams.get('all') === 'true';

    if (fetchAll && user.role === 'ADMIN') {
      const allUsers = await db.users.getAll();
      const studentUsers = allUsers.filter((u) => u.role !== 'ADMIN' && u.email !== 'admin@prayxis.tech');
      const userListWithStats = await Promise.all(
        studentUsers.map(async (u) => {
          const stats = await db.timeLogs.getUserTimeStats(u.id, 'full-stack');
          const completedDays = await db.dayProgress.getCompletedDays(u.id, 'full-stack');
          const enrollments = await db.enrollments.getUserEnrollments(u.id);
          const dailyLog = await db.dailyLogs.getTodayLog(u.id, 'python-basics', 1);
          const streak = await db.dailyLogs.getUserStreak(u.id);
          const isOnline = Boolean(u.lastActiveAt && Date.now() - new Date(u.lastActiveAt).getTime() < 120000);
          
          let lastActiveFormatted = 'Never';
          if (u.lastActiveAt) {
            const diffMs = Date.now() - new Date(u.lastActiveAt).getTime();
            if (diffMs < 60000) lastActiveFormatted = 'Just now';
            else if (diffMs < 3600000) lastActiveFormatted = `${Math.floor(diffMs / 60000)}m ago`;
            else lastActiveFormatted = new Date(u.lastActiveAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          }

          return {
            id: u.id,
            name: u.name,
            email: u.email,
            role: u.role,
            isApproved: u.isApproved,
            isOnline,
            lastActiveAt: u.lastActiveAt,
            lastActiveFormatted,
            createdAt: u.createdAt,
            todayActiveSeconds: stats.todayActiveSeconds,
            totalCourseSeconds: stats.totalCourseSeconds,
            completedDays,
            completedCount: completedDays.length,
            completionPercentage: Math.round((completedDays.length / 45) * 100),
            enrollments,
            dailyLog,
            streak,
          };
        })
      );

      return NextResponse.json({
        authenticated: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          isApproved: user.isApproved,
        },
        users: userListWithStats,
      });
    }

    const { todayActiveSeconds, totalCourseSeconds } = await db.timeLogs.getUserTimeStats(
      user.id,
      'full-stack'
    );
    const completedDays = await db.dayProgress.getCompletedDays(user.id, 'full-stack');
    const userEnrollments = await db.enrollments.getUserEnrollments(user.id);
    const todayLog = await db.dailyLogs.getTodayLog(user.id, 'python-basics', 1);
    const streak = await db.dailyLogs.getUserStreak(user.id);

    const isOnline = Boolean(user.lastActiveAt && Date.now() - new Date(user.lastActiveAt).getTime() < 120000);

    return NextResponse.json({
      authenticated: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        isApproved: user.isApproved,
        isOnline,
        lastActiveAt: user.lastActiveAt,
        createdAt: user.createdAt,
        enrollments: userEnrollments,
      },
      stats: {
        todayActiveSeconds,
        totalCourseSeconds,
        completedDays,
        completedCount: completedDays.length,
        completionPercentage: Math.round((completedDays.length / 45) * 100),
        todayLog,
        streak,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized. Admin privileges required.' }, { status: 403 });
    }

    const body = await req.json();
    const { targetUserId, isApproved, courseSlug } = body;

    if (!targetUserId || typeof isApproved !== 'boolean') {
      return NextResponse.json({ error: 'targetUserId and boolean isApproved are required' }, { status: 400 });
    }

    if (courseSlug) {
      await db.enrollments.setCourseApproval(targetUserId, courseSlug, isApproved);
    } else {
      const updatedUser = await db.users.setApproved(targetUserId, isApproved);
      if (!updatedUser) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
    }

    const allUsers = await db.users.getAll();
    const studentUsers = allUsers.filter((u) => u.role !== 'ADMIN' && u.email !== 'admin@prayxis.tech');
    const userListWithStats = await Promise.all(
      studentUsers.map(async (u) => {
        const stats = await db.timeLogs.getUserTimeStats(u.id, 'full-stack');
        const completedDays = await db.dayProgress.getCompletedDays(u.id, 'full-stack');
        const enrollments = await db.enrollments.getUserEnrollments(u.id);
        const isOnline = Boolean(u.lastActiveAt && Date.now() - new Date(u.lastActiveAt).getTime() < 120000);
        
        let lastActiveFormatted = 'Never';
        if (u.lastActiveAt) {
          const diffMs = Date.now() - new Date(u.lastActiveAt).getTime();
          if (diffMs < 60000) lastActiveFormatted = 'Just now';
          else if (diffMs < 3600000) lastActiveFormatted = `${Math.floor(diffMs / 60000)}m ago`;
          else lastActiveFormatted = new Date(u.lastActiveAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }

        return {
          id: u.id,
          name: u.name,
          email: u.email,
          role: u.role,
          isApproved: u.isApproved,
          isOnline,
          lastActiveAt: u.lastActiveAt,
          lastActiveFormatted,
          createdAt: u.createdAt,
          todayActiveSeconds: stats.todayActiveSeconds,
          totalCourseSeconds: stats.totalCourseSeconds,
          completedDays,
          completedCount: completedDays.length,
          completionPercentage: Math.round((completedDays.length / 45) * 100),
          enrollments,
        };
      })
    );

    return NextResponse.json({
      success: true,
      message: `User access ${isApproved ? 'approved' : 'revoked'} successfully`,
      users: userListWithStats,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
