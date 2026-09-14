'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { CURRICULUM_PHASES } from '@/data/courses';
import { Lock, Play, Clock, CheckCircle2, MessageCircle, AlertTriangle, Calendar, X, Terminal } from 'lucide-react';
import {
  calculateDayUnlockInfo,
  getCourseEnrollmentStatus,
  DayUnlockInfo,
} from '@/lib/utils/dayUnlock';
import { getWhatsAppEnrollUrl } from '@/lib/whatsapp';

export default function StudentFullStackDashboard() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const [selectedLockedDay, setSelectedLockedDay] = useState<DayUnlockInfo | null>(null);

  const fetchUserDataAndProgress = async () => {
    try {
      const [userRes, progRes] = await Promise.all([
        fetch('/api/auth/me'),
        fetch('/api/courses/progress?courseSlug=full-stack'),
      ]);

      if (userRes.ok) {
        const userData = await userRes.json();
        setCurrentUser(userData.user);
      } else {
        setCurrentUser(null);
      }

      if (progRes.ok) {
        const progData = await progRes.json();
        if (progData.completedDays) setCompletedDays(progData.completedDays);
      }
    } catch (err) {
      setCurrentUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDataAndProgress();
  }, []);

  const courseStatus = getCourseEnrollmentStatus(currentUser, 'full-stack');
  const isAdmin = currentUser?.role === 'ADMIN';

  // Generate 45 Days Array
  const daysArray = Array.from({ length: 45 }, (_, i) => {
    const dayNum = i + 1;
    const phase = CURRICULUM_PHASES.find((p) => {
      if (p.dayRange.includes('–')) {
        const [start, end] = p.dayRange.replace('DAYS ', '').split('–').map(Number);
        return dayNum >= start && dayNum <= end;
      }
      return dayNum === Number(p.dayRange.replace('DAY ', ''));
    }) || CURRICULUM_PHASES[0];

    const unlockInfo = calculateDayUnlockInfo(
      courseStatus.enrolledAt,
      dayNum,
      isAdmin,
      completedDays
    );

    return {
      ...unlockInfo,
      phaseTitle: phase.title,
    };
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-prayxis-bg flex items-center justify-center font-mono text-xs text-prayxis-accent">
        <span>LOADING FULL STACK CURRICULUM...</span>
      </div>
    );
  }

  // 1. IF NOT ENROLLED -> SHOW COURSE ACCESS LOCKED SCREEN
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
              <span>COURSE ACCESS REQUIRED</span>
            </div>

            <h1 className="font-mono text-2xl sm:text-3xl font-extrabold text-prayxis-offwhite uppercase tracking-tight">
              FULL STACK WEB DEVELOPMENT
            </h1>

            <p className="body-medium text-prayxis-muted leading-relaxed max-w-xl mx-auto font-normal">
              {courseStatus.isRequested
                ? 'Your enrollment request for Full Stack Web Development is pending Admin approval. Contact our support team on WhatsApp for quick activation.'
                : 'Aapne abhi tak is course me enroll nahi kiya hai. Ganesh Chaturthi Special Offer me sirf ₹99 me enroll karein aur 45-day complete production curriculum access karein.'}
            </p>

            <div className="pt-2 pb-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={async () => {
                  if (!currentUser) {
                    router.push('/login?redirect=/student/courses/full-stack');
                    return;
                  }
                  if (!courseStatus.isRequested) {
                    await fetch('/api/courses/enroll', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        courseSlug: 'full-stack',
                        courseTitle: 'Full Stack Web Development',
                        price: 99,
                        offer: 'GANESH CHATURTHI OFFER',
                      }),
                    });
                  }
                  const waUrl = getWhatsAppEnrollUrl({
                    userId: currentUser.id,
                    userName: currentUser.name,
                    userEmail: currentUser.email,
                    courseTitle: 'Full Stack Web Development',
                    price: 99,
                    offer: 'Ganesh Chaturthi Special Offer',
                  });
                  window.open(waUrl, '_blank');
                  fetchUserDataAndProgress();
                }}
                className="w-full sm:w-auto px-8 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-black font-mono text-xs font-black uppercase rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                <MessageCircle className="h-4 w-4 fill-black text-black" />
                <span>
                  {courseStatus.isRequested ? 'PING ON WHATSAPP (+91 78777 16367)' : 'ENROLL NOW FOR ₹99 →'}
                </span>
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

  // 2. USER IS ENROLLED -> RENDER 45 DAYS GRID
  return (
    <div className="relative min-h-screen bg-prayxis-bg text-prayxis-offwhite flex flex-col justify-between select-none">
      <Navbar />

      <main className="relative z-10 flex-1 pt-32 pb-20 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto w-full space-y-10">
        {/* Course Header */}
        <div className="space-y-4">
          <nav className="font-mono text-xs text-prayxis-muted flex items-center gap-2 select-none">
            <Link href="/student" className="hover:text-prayxis-offwhite transition-colors">STUDENT CONSOLE</Link>
            <span>/</span>
            <Link href="/student/courses" className="hover:text-prayxis-offwhite transition-colors">COURSES</Link>
            <span>/</span>
            <span className="text-prayxis-accent font-bold">FULL STACK WEB DEVELOPMENT</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-prayxis-accent/10 border border-prayxis-accent/40 rounded-full font-mono text-[10px] text-prayxis-accent tracking-wider uppercase font-bold">
                <Terminal className="h-3.5 w-3.5" />
                <span>PROG-01 // 45-DAY PRODUCTION CURRICULUM</span>
              </div>
              <h1 className="font-mono text-3xl sm:text-4xl font-extrabold text-prayxis-offwhite uppercase tracking-tight">
                FULL STACK WEB DEVELOPMENT
              </h1>
              <p className="body-medium text-prayxis-muted font-normal max-w-2xl leading-relaxed">
                45 Days master track covering modern React frontend, Node.js & FastAPI backend architectures, secure auth, and real-time MongoDB Atlas deployments.
              </p>
            </div>

            <div className="flex flex-col gap-3 shrink-0">
              <Link
                href="/student/courses/full-stack/day/1"
                className="px-6 py-3.5 bg-prayxis-accent text-black font-mono text-xs font-bold uppercase rounded text-center hover:bg-white transition-all flex items-center justify-center gap-2 cyan-glow cursor-pointer"
              >
                <Play className="h-4 w-4 fill-black" />
                <span>CONTINUE LEARNING (DAY 01) →</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Course Specs Overview */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
          <div className="p-4 bg-prayxis-surface/80 border border-white/10 rounded-xl space-y-1">
            <div className="text-prayxis-subtle text-[10px] uppercase">TOTAL DURATION</div>
            <div className="text-prayxis-offwhite font-bold text-sm">45 DAYS (120 HOURS)</div>
          </div>
          <div className="p-4 bg-prayxis-surface/80 border border-white/10 rounded-xl space-y-1">
            <div className="text-prayxis-subtle text-[10px] uppercase">DAILY TARGET</div>
            <div className="text-prayxis-accent font-bold text-sm">03:00:00 (3 HOURS)</div>
          </div>
          <div className="p-4 bg-prayxis-surface/80 border border-white/10 rounded-xl space-y-1">
            <div className="text-prayxis-subtle text-[10px] uppercase">DAILY UNLOCK CYCLE</div>
            <div className="text-amber-400 font-bold text-sm">04:00 AM (DAILY)</div>
          </div>
          <div className="p-4 bg-prayxis-surface/80 border border-white/10 rounded-xl space-y-1">
            <div className="text-prayxis-subtle text-[10px] uppercase">METHODOLOGY</div>
            <div className="text-emerald-400 font-bold text-sm">PRODUCTION PROJECTS</div>
          </div>
        </div>

        {/* 45 Days Module Grid */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-xs">
            <div className="flex items-center gap-2">
              <span className="text-prayxis-accent font-bold uppercase tracking-wider">
                DAY MODULE NAVIGATION (1 TO 45)
              </span>
              <span className="px-2 py-0.5 bg-amber-500/10 border border-amber-500/30 text-amber-300 rounded text-[10px]">
                ⚡ Next Day Unlocks at 4:00 AM
              </span>
            </div>
            <span className="text-prayxis-subtle">
              {completedDays.length} / 45 DAYS COMPLETED
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 font-mono text-xs">
            {daysArray.map((day) => (
              <div key={day.dayNumber}>
                {day.isUnlocked ? (
                  <Link
                    href={`/student/courses/full-stack/day/${day.dayNumber}`}
                    className={`p-4 bg-prayxis-surface border rounded-xl flex flex-col justify-between h-32 transition-all group cursor-pointer ${
                      day.status === 'COMPLETED'
                        ? 'border-emerald-500/80 bg-emerald-500/10'
                        : day.dayNumber === 1
                        ? 'border-prayxis-accent/90 bg-prayxis-accent/10 cyan-glow-subtle'
                        : 'border-white/10 hover:border-prayxis-accent/60'
                    }`}
                  >
                    <div className="flex items-center justify-between text-prayxis-accent">
                      <span className="font-bold">DAY {String(day.dayNumber).padStart(2, '0')}</span>
                      {day.status === 'COMPLETED' ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                      ) : (
                        <Play className="h-3.5 w-3.5 fill-prayxis-accent group-hover:scale-125 transition-transform" />
                      )}
                    </div>
                    <div className="text-[10px] text-prayxis-offwhite font-bold truncate mt-2">
                      {day.phaseTitle}
                    </div>
                    <div className="text-[9px] font-bold mt-1">
                      {day.status === 'COMPLETED' ? (
                        <span className="text-emerald-400">COMPLETED ✓</span>
                      ) : (
                        <span className="text-prayxis-accent">UNLOCKED →</span>
                      )}
                    </div>
                  </Link>
                ) : (
                  <div
                    onClick={() => setSelectedLockedDay(day)}
                    className="p-4 bg-white/[0.03] border border-white/10 hover:border-amber-500/50 hover:bg-amber-500/[0.04] rounded-xl flex flex-col justify-between h-32 cursor-pointer transition-all group"
                  >
                    <div className="flex items-center justify-between text-prayxis-subtle group-hover:text-amber-400 transition-colors">
                      <span className="font-bold">DAY {String(day.dayNumber).padStart(2, '0')}</span>
                      <Lock className="h-3.5 w-3.5 text-prayxis-subtle group-hover:text-amber-400 transition-colors" />
                    </div>
                    
                    <div className="text-[9px] text-prayxis-subtle truncate mt-1">
                      {day.phaseTitle}
                    </div>

                    <div className="pt-1.5 border-t border-white/5 space-y-0.5">
                      <div className="text-[8px] text-prayxis-subtle font-mono uppercase">
                        UNLOCK DATE:
                      </div>
                      <div className="text-[9.5px] text-amber-300 font-bold tracking-tight">
                        {day.unlockDateFormatted}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* LOCKED DAY NOTIFICATION MODAL */}
      {selectedLockedDay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-[#0d1017] border border-amber-500/50 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl text-center">
            <button
              type="button"
              onClick={() => setSelectedLockedDay(null)}
              className="absolute top-4 right-4 p-2 text-prayxis-subtle hover:text-white rounded-lg bg-white/5 cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="h-14 w-14 bg-amber-500/10 border border-amber-500/30 rounded-full flex items-center justify-center mx-auto text-amber-400">
              <Lock className="h-7 w-7" />
            </div>

            <div className="space-y-2">
              <div className="font-mono text-xs text-amber-400 uppercase tracking-widest font-bold">
                SESSION LOCKED
              </div>
              <h3 className="font-mono text-2xl font-extrabold text-prayxis-offwhite uppercase">
                DAY {String(selectedLockedDay.dayNumber).padStart(2, '0')} MODULE
              </h3>
            </div>

            <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-1 font-mono text-xs text-left">
              <div className="flex items-center justify-between text-prayxis-muted">
                <span>Unlock Date:</span>
                <strong className="text-amber-300 font-bold text-sm">
                  {selectedLockedDay.unlockDateFormatted}
                </strong>
              </div>
              <div className="flex items-center justify-between text-prayxis-subtle text-[10px] pt-1">
                <span>Daily Release Time:</span>
                <span>04:00 AM (IST)</span>
              </div>
            </div>

            <p className="text-xs text-prayxis-muted leading-relaxed font-sans">
              Aapka yeh session <strong>{selectedLockedDay.unlockDateFormatted}</strong> ko subah 4:00 AM par automatically unlock ho jayega. Tab tak aap previous days ke curriculum aur practicals practice kar sakte hain!
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setSelectedLockedDay(null)}
                className="w-full py-3 bg-prayxis-accent text-black font-mono text-xs font-bold uppercase rounded-xl hover:bg-white transition-all cursor-pointer"
              >
                GOT IT, CONTINUE LEARNING →
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
