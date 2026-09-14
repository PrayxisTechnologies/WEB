import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth/session';
import { db } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required. Please login first to enroll.', authenticated: false },
        { status: 401 }
      );
    }

    const body = await req.json();
    let { courseId, courseSlug, courseTitle, price = 99, offer = 'GANESH CHATURTHI OFFER' } = body;

    if (!courseSlug && courseId) {
      if (courseId === 'full-stack-web' || courseId === 'full-stack') {
        courseSlug = 'full-stack';
        courseTitle = courseTitle || 'Full Stack Web Development';
      } else if (courseId === 'basic-ethical-hacking') {
        courseSlug = 'basic-ethical-hacking';
        courseTitle = courseTitle || 'Basic Ethical Hacking';
      } else if (courseId === 'python-basics') {
        courseSlug = 'python-basics';
        courseTitle = courseTitle || 'Python Basics';
      } else {
        courseSlug = courseId;
      }
    }

    if (!courseSlug) {
      return NextResponse.json({ error: 'Course identifier is required' }, { status: 400 });
    }

    const enrollment = await db.enrollments.requestEnrollment(
      user.id,
      courseSlug,
      courseTitle || 'Prayxis Course Program',
      price,
      offer
    );

    return NextResponse.json({
      success: true,
      message: 'Enrollment requested successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        isApproved: user.isApproved,
      },
      enrollment,
    });
  } catch (err: any) {
    console.error('Error handling course enrollment request:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to process enrollment request' },
      { status: 500 }
    );
  }
}
