'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { ActiveLearningTracker, ActivityState } from '@/components/student/ActiveLearningTracker';
import { ActiveLearningTimer } from '@/components/student/ActiveLearningTimer';
import { DailyGoalWidget } from '@/components/student/DailyGoalWidget';
import { Terminal, Lock, ArrowLeft, AlertCircle, Calendar, Play, MessageCircle } from 'lucide-react';
import {
  calculateDayUnlockInfo,
  getCourseEnrollmentStatus,
  DayUnlockInfo,
} from '@/lib/utils/dayUnlock';
import { getWhatsAppEnrollUrl } from '@/lib/whatsapp';

export default function PythonDayModuleDynamicPage() {
  const router = useRouter();
  const params = useParams();
  const dayNum = Number(params?.dayNum) || 1;

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [todaySeconds, setTodaySeconds] = useState(0);
  const [activityState, setActivityState] = useState<ActivityState>('ACTIVE');
  const [completedDays, setCompletedDays] = useState<number[]>([]);

  // If day 1, automatically redirect to dedicated interactive day 1 page
  useEffect(() => {
    if (dayNum === 1) {
      router.replace('/student/courses/python-basics/day/1');
    }
  }, [dayNum, router]);

  useEffect(() => {
    async function checkAuth() {
      try {
        const [userRes, progRes] = await Promise.all([
          fetch('/api/auth/me'),
          fetch('/api/courses/progress?courseSlug=python-basics'),
        ]);

        if (userRes.ok) {
          const data = await userRes.json();
          if (data.user) setUser(data.user);
          if (data.stats) {
            setTodaySeconds(data.stats.todayActiveSeconds || 0);
          }
        }

        if (progRes.ok) {
          const progData = await progRes.json();
          if (progData.completedDays) setCompletedDays(progData.completedDays);
        }
      } catch (err) {
        // Allow guest access
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, [router]);

  if (loading || dayNum === 1) {
    return (
      <div className="min-h-screen bg-prayxis-bg flex items-center justify-center font-mono text-xs text-prayxis-accent">
        <span>LOADING PYTHON MODULE...</span>
      </div>
    );
  }

  const courseStatus = getCourseEnrollmentStatus(user, 'python-basics');
  const isAdmin = user?.role === 'ADMIN';

  // 1. CHECK COURSE LEVEL ENROLLMENT
  if (!courseStatus.isEnrolled && !isAdmin) {
    return (
      <div className="relative min-h-screen bg-prayxis-bg text-prayxis-offwhite flex flex-col justify-between select-none">
        <Navbar />
        <main className="relative z-10 flex-1 pt-32 pb-20 px-6 sm:px-12 lg:px-20 max-w-4xl mx-auto w-full flex items-center justify-center">
          <div className="p-8 sm:p-12 bg-prayxis-surface/90 border border-yellow-500/50 rounded-3xl backdrop-blur-md space-y-6 text-center shadow-2xl w-full">
            <div className="h-16 w-16 bg-yellow-500/10 border border-yellow-500/40 rounded-full flex items-center justify-center mx-auto text-yellow-400">
              <Lock className="h-8 w-8" />
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-yellow-500/10 border border-yellow-500/40 rounded-full font-mono text-xs text-yellow-400 uppercase tracking-wider font-bold">
              <AlertCircle className="h-4 w-4" />
              <span>COURSE ACCESS REQUIRED</span>
            </div>

            <h1 className="font-mono text-2xl sm:text-3xl font-extrabold text-prayxis-offwhite uppercase tracking-tight">
              DAY {String(dayNum).padStart(2, '0')} LESSON LOCKED
            </h1>

            <p className="body-medium text-prayxis-muted leading-relaxed max-w-xl mx-auto font-normal">
              {courseStatus.isRequested
                ? 'Your enrollment request is pending Admin verification. Contact our support desk on WhatsApp for immediate approval.'
                : 'Aapne abhi tak is course me enroll nahi kiya hai. Ganesh Chaturthi Offer me enroll karke learning start karein.'}
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => {
                  if (!user) {
                    router.push(`/login?redirect=/student/courses/python-basics/day/${dayNum}`);
                    return;
                  }
                  const waUrl = getWhatsAppEnrollUrl({
                    userId: user.id,
                    userName: user.name,
                    userEmail: user.email,
                    courseTitle: 'Python Basics: Zero Se',
                    price: 99,
                    offer: 'Ganesh Chaturthi Special Offer',
                  });
                  window.open(waUrl, '_blank');
                }}
                className="w-full sm:w-auto px-8 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-black font-mono text-xs font-black uppercase rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                <MessageCircle className="h-4 w-4 fill-black text-black" />
                <span>PING ON WHATSAPP (+91 78777 16367)</span>
              </button>

              <Link
                href="/student/courses"
                className="w-full sm:w-auto px-6 py-3.5 bg-white/5 border border-white/10 hover:border-prayxis-accent text-prayxis-offwhite font-mono text-xs uppercase rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>VIEW ALL COURSES</span>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // 2. CHECK DAY UNLOCK DATE (4:00 AM CYCLING)
  const dayUnlockInfo = calculateDayUnlockInfo(
    courseStatus.enrolledAt,
    dayNum,
    isAdmin,
    completedDays
  );

  if (!dayUnlockInfo.isUnlocked) {
    return (
      <div className="relative min-h-screen bg-prayxis-bg text-prayxis-offwhite flex flex-col justify-between select-none">
        <Navbar />

        <main className="relative z-10 flex-1 pt-32 pb-20 px-6 sm:px-12 lg:px-20 max-w-4xl mx-auto w-full flex items-center justify-center">
          <div className="p-8 sm:p-12 bg-prayxis-surface/90 border border-amber-500/50 rounded-3xl backdrop-blur-md space-y-6 text-center shadow-2xl w-full">
            <div className="h-16 w-16 bg-amber-500/10 border border-amber-500/40 rounded-full flex items-center justify-center mx-auto text-amber-400">
              <Lock className="h-8 w-8" />
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/10 border border-amber-500/40 rounded-full font-mono text-xs text-amber-400 uppercase tracking-wider font-bold">
              <Calendar className="h-4 w-4" />
              <span>SESSION CURRENTLY LOCKED</span>
            </div>

            <h1 className="font-mono text-2xl sm:text-3xl font-extrabold text-prayxis-offwhite uppercase tracking-tight">
              DAY {String(dayNum).padStart(2, '0')} LESSON LOCKED
            </h1>

            <div className="p-6 bg-white/[0.03] border border-amber-500/30 rounded-2xl max-w-md mx-auto space-y-2 font-mono">
              <div className="text-xs text-prayxis-muted uppercase tracking-wider">
                Scheduled Unlock Date:
              </div>
              <div className="text-2xl font-black text-amber-300">
                {dayUnlockInfo.unlockDateFormatted}
              </div>
              <div className="text-[11px] text-prayxis-subtle pt-1">
                (Unlocks automatically at 04:00 AM IST)
              </div>
            </div>

            <p className="body-medium text-prayxis-muted leading-relaxed max-w-xl mx-auto font-normal font-sans">
              Aapka yeh session <strong>{dayUnlockInfo.unlockDateFormatted}</strong> ko subah 4:00 AM par automatically unlock ho jayega. Tab tak aap Day 01 ke interactive coding exercises aur quiz practice kar sakte hain!
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/student/courses/python-basics/day/1"
                className="w-full sm:w-auto px-8 py-3.5 bg-prayxis-accent text-black font-mono text-xs font-bold uppercase rounded-xl hover:bg-white transition-all flex items-center justify-center gap-2 cyan-glow cursor-pointer"
              >
                <Play className="h-4 w-4 fill-black" />
                <span>PRACTICE DAY 01 LESSON →</span>
              </Link>

              <Link
                href="/student/courses/python-basics"
                className="w-full sm:w-auto px-6 py-3.5 bg-white/5 border border-white/10 hover:border-prayxis-accent text-prayxis-offwhite font-mono text-xs uppercase rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>ALL PYTHON MODULES</span>
              </Link>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  // 3. DAY IS UNLOCKED -> RENDER DAY CONTENT
  return (
    <div className="relative min-h-screen bg-prayxis-bg text-prayxis-offwhite flex flex-col justify-between select-none">
      {/* Live Active Learning Tracker attributed to Day */}
      <ActiveLearningTracker
        courseSlug="python-basics"
        dayNumber={dayNum}
        initialTodaySeconds={todaySeconds}
        onTimeUpdate={({ todaySeconds: tSecs }) => setTodaySeconds(tSecs)}
        onStateChange={(state) => setActivityState(state)}
      />

      <Navbar />

      <main className="relative z-10 flex-1 pt-32 pb-20 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto w-full space-y-8">
        {/* Navigation Breadcrumb */}
        <nav className="font-mono text-xs text-prayxis-muted flex items-center gap-2 select-none">
          <Link href="/student" className="hover:text-prayxis-offwhite transition-colors">STUDENT CONSOLE</Link>
          <span>/</span>
          <Link href="/student/courses/python-basics" className="hover:text-prayxis-offwhite transition-colors">PYTHON BASICS</Link>
          <span>/</span>
          <span className="text-prayxis-accent font-bold">DAY {String(dayNum).padStart(2, '0')}</span>
        </nav>

        {/* Live Active Timer */}
        <ActiveLearningTimer
          todayActiveSeconds={todaySeconds}
          activityState={activityState}
          targetDailySeconds={10800}
        />

        {/* Lesson Module Container */}
        <div className="p-8 sm:p-12 bg-prayxis-surface/90 border border-prayxis-accent/60 rounded-3xl backdrop-blur-md space-y-6 cyan-glow-subtle text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-prayxis-accent/10 border border-prayxis-accent/40 rounded-full font-mono text-xs text-prayxis-accent tracking-wider uppercase">
            <Terminal className="h-4 w-4" />
            <span>DAY {String(dayNum).padStart(2, '0')} // PYTHON CURRICULUM</span>
          </div>

          <h1 className="font-mono text-3xl sm:text-4xl font-extrabold text-prayxis-offwhite uppercase">
            DAY {String(dayNum).padStart(2, '0')} LESSON ACTIVE
          </h1>

          <p className="body-large text-prayxis-muted max-w-xl mx-auto leading-relaxed font-normal">
            Welcome to Day {String(dayNum).padStart(2, '0')}. Maintain your 3-Hour daily goal streak and complete all interactive exercises.
          </p>

          <div className="pt-4 flex items-center justify-center gap-4">
            <Link
              href="/student/courses/python-basics/day/1"
              className="px-6 py-3 bg-prayxis-accent text-black font-mono text-xs font-bold uppercase rounded-xl hover:bg-white transition-all flex items-center gap-2 cyan-glow cursor-pointer"
            >
              <span>BACK TO DAY 01 INTERACTIVE PLAYGROUND →</span>
            </Link>

            <Link
              href="/student/courses/python-basics"
              className="px-6 py-3 bg-white/5 border border-white/10 hover:border-prayxis-accent font-mono text-xs text-prayxis-offwhite uppercase rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>RETURN TO CURRICULUM</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
