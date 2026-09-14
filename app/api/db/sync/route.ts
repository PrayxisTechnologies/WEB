import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getMongoHealth, getMongoDb } from '@/lib/db/mongodb';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const health = await getMongoHealth();
    const allUsers = await db.users.getAll();
    const enrollments = await db.enrollments.getAll();

    let atlasSynced = health.isAtlasConnected;
    let syncError = health.connectionError;

    return NextResponse.json({
      success: true,
      mongoAtlasStatus: health.status,
      isAtlasConnected: health.isAtlasConnected,
      connectionError: health.connectionError,
      cluster: health.cluster,
      database: health.database,
      atlasSynced,
      syncError,
      localStoreUsersCount: allUsers.length,
      localStoreEnrollmentsCount: enrollments.length,
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        error: err.message || 'Database status check error',
      },
      { status: 500 }
    );
  }
}
