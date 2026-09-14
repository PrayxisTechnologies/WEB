/**
 * Day-wise 4:00 AM Sequential Unlocking Utility
 *
 * Rules:
 * - Day 01: Unlocked on the day of enrollment/approval.
 * - Day 02: Unlocks on (Enrolled Date + 1 day) at 04:00:00 AM.
 * - Day N:  Unlocks on (Enrolled Date + (N - 1) days) at 04:00:00 AM.
 * - UI shows formatted date: "DD MMM YYYY" (e.g. "16 Sep 2026").
 */

export interface DayUnlockInfo {
  dayNumber: number;
  isUnlocked: boolean;
  unlockDate: Date;
  unlockDateFormatted: string; // e.g. "16 Sep 2026"
  isEnrolled: boolean;
  status: 'UNLOCKED' | 'LOCKED' | 'COMPLETED';
}

const MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

export function formatUnlockDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0');
  const month = MONTH_NAMES[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

export function calculateDayUnlockInfo(
  enrolledAt: string | Date | undefined | null,
  dayNumber: number,
  isUserAdmin: boolean = false,
  completedDays: number[] = []
): DayUnlockInfo {
  // If master admin, everything is unlocked
  if (isUserAdmin) {
    const today = new Date();
    return {
      dayNumber,
      isUnlocked: true,
      unlockDate: today,
      unlockDateFormatted: formatUnlockDate(today),
      isEnrolled: true,
      status: completedDays.includes(dayNumber) ? 'COMPLETED' : 'UNLOCKED',
    };
  }

  // If no enrollment date, default to locked today
  if (!enrolledAt) {
    const fallback = new Date();
    return {
      dayNumber,
      isUnlocked: false,
      unlockDate: fallback,
      unlockDateFormatted: formatUnlockDate(fallback),
      isEnrolled: false,
      status: 'LOCKED',
    };
  }

  const enrDate = new Date(enrolledAt);
  const now = new Date();

  // Day 1 unlocks on the day of enrollment
  // Day N unlocks on Enrolled Date + (dayNumber - 1) days at 04:00:00 AM
  const unlockDate = new Date(
    enrDate.getFullYear(),
    enrDate.getMonth(),
    enrDate.getDate() + (dayNumber - 1),
    4, // 04:00 AM
    0,
    0,
    0
  );

  // Day 1 is always unlocked if enrolled
  let isUnlocked = false;
  if (dayNumber === 1) {
    isUnlocked = true;
  } else {
    // Check if current time is >= unlockDate (i.e. 4:00 AM on the target date)
    isUnlocked = now.getTime() >= unlockDate.getTime();
  }

  const isCompleted = completedDays.includes(dayNumber);

  return {
    dayNumber,
    isUnlocked,
    unlockDate,
    unlockDateFormatted: formatUnlockDate(unlockDate),
    isEnrolled: true,
    status: isCompleted ? 'COMPLETED' : isUnlocked ? 'UNLOCKED' : 'LOCKED',
  };
}

export function getCourseEnrollmentStatus(
  user: any,
  courseSlug: string
): {
  isEnrolled: boolean;
  isRequested: boolean;
  enrolledAt: string | null;
  status: 'ENROLLED' | 'REQUESTED' | 'NOT_ENROLLED';
} {
  if (!user) {
    return { isEnrolled: false, isRequested: false, enrolledAt: null, status: 'NOT_ENROLLED' };
  }

  if (user.role === 'ADMIN') {
    return { isEnrolled: true, isRequested: false, enrolledAt: user.createdAt || new Date().toISOString(), status: 'ENROLLED' };
  }

  const isApprovedUser = Boolean(user.isApproved);
  const enr = user.enrollments?.find((e: any) => e.courseSlug === courseSlug);

  if (!enr) {
    return { isEnrolled: false, isRequested: false, enrolledAt: null, status: 'NOT_ENROLLED' };
  }

  if (enr.status === 'ENROLLED' && isApprovedUser) {
    return {
      isEnrolled: true,
      isRequested: false,
      enrolledAt: enr.enrolledAt || enr.requestedAt || user.createdAt || new Date().toISOString(),
      status: 'ENROLLED',
    };
  }

  if (enr.status === 'REQUESTED' || !isApprovedUser) {
    return {
      isEnrolled: false,
      isRequested: true,
      enrolledAt: enr.requestedAt || null,
      status: 'REQUESTED',
    };
  }

  return { isEnrolled: false, isRequested: false, enrolledAt: null, status: 'NOT_ENROLLED' };
}
