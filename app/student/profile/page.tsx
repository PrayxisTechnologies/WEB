'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CustomCursor } from '@/components/ui/CustomCursor';
import {
  User,
  Mail,
  Shield,
  CheckCircle2,
  Clock,
  BookOpen,
  Play,
  LogOut,
  Home,
  LayoutDashboard,
  Lock,
  RefreshCw,
  Award,
  Terminal,
  Calendar,
  KeyRound,
  AlertTriangle,
  MessageCircle,
} from 'lucide-react';
import { getWhatsAppEnrollUrl } from '@/lib/whatsapp';
import { DailyGoalWidget } from '@/components/student/DailyGoalWidget';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  isApproved: boolean;
  createdAt?: string;
  lastActiveAt?: string;
  enrollments?: any[];
  streak?: number;
  [key: string]: any;
}

interface UserStats {
  todayActiveSeconds: number;
  totalCourseSeconds: number;
  completedDays?: number[];
  completedCount?: number;
  completionPercentage?: number;
  streak?: number;
  [key: string]: any;
}

export default function StudentProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchProfileData = async () => {
    try {
      setRefreshing(true);
      const res = await fetch('/api/auth/me');
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        if (data.stats) {
          setStats(data.stats);
        }
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error('Failed to load profile data', err);
      setUser(null);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch {}
    window.location.href = '/login';
  };

  const formatTime = (totalSecs: number) => {
    const hours = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    if (hours > 0) return `${hours}h ${mins}m`;
    return `${mins}m`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-prayxis-bg flex items-center justify-center font-mono text-xs text-prayxis-accent">
        <div className="flex items-center gap-3">
          <RefreshCw className="h-4 w-4 animate-spin text-prayxis-accent" />
          <span>LOADING STUDENT SECURITY PROFILE...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="relative min-h-screen bg-prayxis-bg text-prayxis-offwhite flex flex-col justify-between select-none">
        <Navbar />

        <main className="relative z-10 flex-1 pt-32 pb-20 px-6 max-w-xl mx-auto w-full flex items-center justify-center">
          <div className="p-8 bg-prayxis-surface/90 border border-white/10 rounded-2xl backdrop-blur-md space-y-6 text-center shadow-2xl">
            <div className="h-14 w-14 bg-red-500/10 border border-red-500/30 rounded-full flex items-center justify-center mx-auto text-red-400">
              <KeyRound className="h-7 w-7" />
            </div>

            <h1 className="font-mono text-2xl font-extrabold text-prayxis-offwhite uppercase">
              AUTHENTICATION REQUIRED
            </h1>

            <p className="body-small text-prayxis-muted font-normal">
              You must be logged in to access your Prayxis Student Profile.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                href="/login"
                className="w-full sm:w-auto px-6 py-3 bg-prayxis-accent text-black font-mono text-xs font-bold uppercase tracking-wider rounded hover:bg-white transition-all cyan-glow"
              >
                LOGIN TO ACCOUNT
              </Link>
              <Link
                href="/"
                className="w-full sm:w-auto px-6 py-3 bg-white/5 border border-white/10 hover:border-white/40 font-mono text-xs uppercase tracking-wider rounded transition-all"
              >
                BACK TO HOME PAGE
              </Link>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  const isApprovedUser = user.isApproved || user.role === 'ADMIN';
  const completedCount = stats?.completedCount || 0;
  const completionPct = stats?.completionPercentage || 0;
  const createdDateFormatted = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : 'Active Account';

  return (
    <div className="relative min-h-screen bg-prayxis-bg text-prayxis-offwhite flex flex-col justify-between select-none">
      <Navbar />

      <main className="relative z-10 flex-1 pt-32 pb-20 px-6 sm:px-12 lg:px-20 max-w-6xl mx-auto w-full space-y-10">
        
        {/* Top Header Banner */}
        <div className="p-6 sm:p-8 bg-prayxis-surface/90 border border-white/10 rounded-2xl backdrop-blur-md flex flex-col md:flex-row md:items-center justify-between gap-6 cyan-glow-subtle">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-prayxis-accent/10 border border-prayxis-accent/40 rounded-full font-mono text-[10px] text-prayxis-accent uppercase tracking-wider font-bold">
              <Terminal className="h-3.5 w-3.5" />
              <span>PRAYXIS STUDENT PROFILE CONSOLE</span>
            </div>

            <h1 className="font-mono text-2xl sm:text-3xl font-extrabold text-prayxis-offwhite uppercase tracking-tight">
              {user.name}
            </h1>

            <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs text-prayxis-muted">
              <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-prayxis-offwhite flex items-center gap-2 text-[11px]">
                <Mail className="h-3.5 w-3.5 text-prayxis-accent" />
                <span>{user.email}</span>
              </div>
              <div className="px-3 py-1 bg-prayxis-accent/10 border border-prayxis-accent/40 rounded-md text-prayxis-accent font-bold text-[10px] uppercase">
                {user.role} ACCOUNT
              </div>
              <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-prayxis-subtle text-[10px] uppercase flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-prayxis-subtle" />
                <span>REGISTERED: {createdDateFormatted}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">
            <button
              type="button"
              onClick={fetchProfileData}
              disabled={refreshing}
              className="px-4 py-2.5 bg-prayxis-accent/10 border border-prayxis-accent/40 text-prayxis-accent hover:bg-prayxis-accent hover:text-black font-mono text-xs tracking-wider uppercase transition-all rounded-lg flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
              <span>REFRESH</span>
            </button>

            <Link
              href="/student"
              className="px-4 py-2.5 bg-prayxis-accent text-black font-mono text-xs font-bold tracking-wider uppercase transition-all rounded-lg flex items-center gap-2 cyan-glow cursor-pointer"
            >
              <LayoutDashboard className="h-4 w-4" />
              <span>DASHBOARD</span>
            </Link>

            <Link
              href="/"
              className="px-4 py-2.5 bg-white/5 border border-white/10 hover:border-white/40 text-prayxis-offwhite font-mono text-xs tracking-wider uppercase transition-all rounded-lg flex items-center gap-2 cursor-pointer"
            >
              <Home className="h-4 w-4" />
              <span>HOME</span>
            </Link>
          </div>
        </div>

        {/* Section 1: Account Verification Status Banner */}
        <div className="p-6 sm:p-8 bg-prayxis-surface/90 border border-white/10 rounded-2xl backdrop-blur-md space-y-4">
          <div className="font-mono text-xs text-prayxis-muted uppercase font-bold tracking-wider">
            ACCOUNT VERIFICATION & SECURITY LEVEL
          </div>

          {user.role === 'ADMIN' ? (
            <div className="p-5 bg-prayxis-accent/10 border border-prayxis-accent/60 rounded-xl flex items-center justify-between gap-4 cyan-glow-subtle">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-prayxis-accent/20 border border-prayxis-accent rounded-full flex items-center justify-center text-prayxis-accent">
                  <Shield className="h-6 w-6" />
                </div>
                <div>
                  <div className="font-mono text-sm font-extrabold text-prayxis-accent uppercase">
                    MASTER ADMIN LEVEL ACCESS
                  </div>
                  <div className="text-xs text-prayxis-muted font-normal mt-0.5">
                    Full security authority to manage system users, toggle approvals, and inspect activity logs.
                  </div>
                </div>
              </div>
              <span className="hidden sm:inline-block px-3 py-1 bg-prayxis-accent text-black font-mono text-[10px] font-bold uppercase rounded">
                FULL ACCESS
              </span>
            </div>
          ) : user.isApproved ? (
            <div className="p-5 bg-emerald-500/10 border border-emerald-500/50 rounded-xl flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-emerald-500/20 border border-emerald-500/60 rounded-full flex items-center justify-center text-emerald-400">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <div>
                  <div className="font-mono text-sm font-extrabold text-emerald-400 uppercase flex items-center gap-2">
                    <span>ACCOUNT VERIFIED & APPROVED</span>
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                  </div>
                  <div className="text-xs text-prayxis-muted font-normal mt-0.5">
                    Your student account is verified. You have full access to enrolled curriculum lessons.
                  </div>
                </div>
              </div>
              <span className="hidden sm:inline-block px-3 py-1 bg-emerald-500/20 border border-emerald-500/60 text-emerald-400 font-mono text-[10px] font-bold uppercase rounded">
                🟢 UNLOCKED
              </span>
            </div>
          ) : (
            <div className="p-5 bg-yellow-500/10 border border-yellow-500/50 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-yellow-500/20 border border-yellow-500/60 rounded-full flex items-center justify-center text-yellow-400">
                  <Lock className="h-6 w-6" />
                </div>
                <div>
                  <div className="font-mono text-sm font-extrabold text-yellow-400 uppercase flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    <span>PENDING ADMIN VERIFICATION</span>
                  </div>
                  <div className="text-xs text-prayxis-muted font-normal mt-0.5">
                    Your registration is active in the database. Master Admin approval is pending.
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={fetchProfileData}
                className="px-4 py-2 bg-yellow-500 text-black font-mono text-xs font-bold uppercase tracking-wider rounded hover:bg-white transition-all cursor-pointer flex items-center gap-1.5"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? 'animate-spin' : ''}`} />
                <span>CHECK APPROVAL</span>
              </button>
            </div>
          )}
        </div>

        {/* Daily 3-Hour Time Goal Widget */}
        <DailyGoalWidget courseSlug="python-basics" dayNumber={1} />

        {/* Section 2: Learning Metrics & Active Time */}
        <div className="space-y-4 font-mono">
          <div className="text-xs text-prayxis-accent uppercase font-bold tracking-wider">
            LEARNING TIME & PROGRESS METRICS
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="p-5 bg-prayxis-surface/90 border border-white/10 rounded-xl space-y-2">
              <div className="flex items-center justify-between text-prayxis-muted text-xs uppercase font-bold">
                <span>TODAY&apos;S ACTIVE WATCH TIME</span>
                <Clock className="h-4 w-4 text-prayxis-accent" />
              </div>
              <div className="text-3xl font-extrabold text-prayxis-offwhite">
                {formatTime(stats?.todayActiveSeconds || 0)}
              </div>
              <div className="text-[10px] text-prayxis-subtle">LOGGED TODAY</div>
            </div>

            <div className="p-5 bg-prayxis-surface/90 border border-prayxis-accent/40 rounded-xl space-y-2">
              <div className="flex items-center justify-between text-prayxis-accent text-xs uppercase font-bold">
                <span>TOTAL COURSE WATCH TIME</span>
                <Clock className="h-4 w-4 text-prayxis-accent" />
              </div>
              <div className="text-3xl font-extrabold text-prayxis-accent">
                {formatTime(stats?.totalCourseSeconds || 0)}
              </div>
              <div className="text-[10px] text-prayxis-accent/80 font-bold">CUMULATIVE ENGAGEMENT</div>
            </div>

            <div className="p-5 bg-prayxis-surface/90 border border-white/10 rounded-xl space-y-2">
              <div className="flex items-center justify-between text-prayxis-muted text-xs uppercase font-bold">
                <span>CURRICULUM DAY PROGRESS</span>
                <Award className="h-4 w-4 text-prayxis-accent" />
              </div>
              <div className="text-3xl font-extrabold text-prayxis-offwhite">
                {completedCount} / 45 <span className="text-sm font-normal text-prayxis-muted">DAYS</span>
              </div>
              <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/10 mt-1">
                <div
                  className="h-full bg-prayxis-accent transition-all duration-300 cyan-glow"
                  style={{ width: `${completionPct}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Enrolled & Allowed Courses Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between font-mono text-xs text-prayxis-accent uppercase">
            <span className="font-bold">ALL ACADEMY COURSES & ENROLLMENT STATUS</span>
            <span className="text-prayxis-subtle">
              {user.role === 'ADMIN' ? 'MASTER ADMIN' : `${user.enrollments?.length || 1} ENROLLED`}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {/* Course 1: Full Stack Web Development */}
            {(() => {
              const fullStackEnr = user.enrollments?.find((e: any) => e.courseSlug === 'full-stack');
              const isEnrolled = (fullStackEnr?.status === 'ENROLLED' || user.role === 'ADMIN') && isApprovedUser;
              const isRequested = fullStackEnr?.status === 'REQUESTED' || (!isApprovedUser && fullStackEnr);

              return (
                <div className="p-8 bg-prayxis-surface/90 border border-white/10 rounded-2xl backdrop-blur-md space-y-6 hover:border-prayxis-accent/40 transition-all">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
                    <div className="space-y-2">
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-prayxis-accent/10 border border-prayxis-accent/40 rounded-full font-mono text-[10px] text-prayxis-accent tracking-wider uppercase font-bold">
                        <BookOpen className="h-3.5 w-3.5" />
                        <span>PROG-01 // FULL STACK WEB DEVELOPMENT</span>
                      </div>
                      <h2 className="font-mono text-2xl font-extrabold text-prayxis-offwhite uppercase">
                        FULL STACK WEB DEVELOPMENT (45 DAYS)
                      </h2>
                    </div>

                    <div>
                      {isEnrolled ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/40 rounded text-emerald-400 font-mono font-bold text-xs uppercase">
                          <CheckCircle2 className="h-4 w-4" />
                          <span>UNLOCKED — ACCESS GRANTED</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-yellow-500/10 border border-yellow-500/40 rounded text-yellow-400 font-mono font-bold text-xs uppercase">
                          <Lock className="h-4 w-4" />
                          <span>REQUESTED — PENDING ADMIN APPROVAL</span>
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="body-medium text-prayxis-muted font-normal leading-relaxed">
                    Master fundamental web technologies from first principles: HTML5, CSS3, JavaScript ES6+, React.js, Node.js, Express, MongoDB Atlas, RESTful APIs, JWT Authentication, and production deployments.
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
                    <div className="p-3 bg-white/5 border border-white/10 rounded">
                      <div className="text-prayxis-subtle text-[10px]">DURATION</div>
                      <div className="text-prayxis-offwhite font-bold mt-1">45 DAYS (120H)</div>
                    </div>

                    <div className="p-3 bg-white/5 border border-white/10 rounded">
                      <div className="text-prayxis-subtle text-[10px]">OFFER PRICE</div>
                      <div className="text-prayxis-accent font-bold mt-1">₹99 <span className="line-through text-prayxis-subtle text-[10px]">₹999</span></div>
                    </div>

                    <div className="p-3 bg-white/5 border border-white/10 rounded">
                      <div className="text-prayxis-subtle text-[10px]">STATUS</div>
                      <div className="text-prayxis-offwhite font-bold mt-1">
                        {isEnrolled ? 'ACTIVE / UNLOCKED' : 'PENDING APPROVAL'}
                      </div>
                    </div>

                    <div className="p-3 bg-white/5 border border-white/10 rounded">
                      <div className="text-prayxis-subtle text-[10px]">OFFER</div>
                      <div className="text-amber-300 font-bold mt-1">GANESH CHATURTHI</div>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center gap-4">
                    {isEnrolled ? (
                      <>
                        <Link
                          href="/student/courses/full-stack/day/1"
                          className="w-full sm:w-auto px-6 py-3 bg-prayxis-accent text-black font-mono text-xs font-bold uppercase tracking-wider rounded hover:bg-white transition-all flex items-center justify-center gap-2 cyan-glow cursor-pointer"
                        >
                          <Play className="h-4 w-4 fill-black" />
                          <span>ENTER DAY 01 LESSON →</span>
                        </Link>

                        <Link
                          href="/student/courses/full-stack"
                          className="w-full sm:w-auto px-6 py-3 bg-white/5 border border-white/10 hover:border-prayxis-accent/60 text-prayxis-offwhite font-mono text-xs font-bold uppercase tracking-wider rounded transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <span>OPEN COURSE DASHBOARD →</span>
                        </Link>
                      </>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => {
                            const waUrl = getWhatsAppEnrollUrl({
                              userId: user.id,
                              userName: user.name,
                              userEmail: user.email,
                              courseTitle: 'Full Stack Web Development',
                              price: 99,
                              offer: 'Ganesh Chaturthi Special Offer',
                            });
                            window.open(waUrl, '_blank');
                          }}
                          className="w-full sm:w-auto px-6 py-3 bg-emerald-500 hover:bg-white text-black font-mono text-xs font-extrabold uppercase tracking-wider rounded transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                        >
                          <span>AGAIN REQUEST / RESEND ON WHATSAPP (7877716367) 📲</span>
                        </button>

                        <button
                          type="button"
                          onClick={fetchProfileData}
                          className="w-full sm:w-auto px-6 py-3 bg-yellow-500 text-black font-mono text-xs font-bold uppercase tracking-wider rounded hover:bg-white transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
                          <span>CHECK APPROVAL STATUS</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })()}

            {/* Course 2: Basic Ethical Hacking */}
            {(() => {
              const hackingEnr = user.enrollments?.find((e: any) => e.courseSlug === 'basic-ethical-hacking');
              const isEnrolled = (hackingEnr?.status === 'ENROLLED' || user.role === 'ADMIN') && isApprovedUser;
              const isRequested = Boolean(hackingEnr && (hackingEnr.status === 'REQUESTED' || !isApprovedUser));

              return (
                <div className="p-8 bg-prayxis-surface/90 border border-white/10 rounded-2xl backdrop-blur-md space-y-6 hover:border-prayxis-accent/40 transition-all">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
                    <div className="space-y-2">
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-prayxis-accent/10 border border-prayxis-accent/40 rounded-full font-mono text-[10px] text-prayxis-accent tracking-wider uppercase font-bold">
                        <Shield className="h-3.5 w-3.5" />
                        <span>PROG-02 // CYBERSECURITY & ETHICAL HACKING</span>
                      </div>
                      <h2 className="font-mono text-2xl font-extrabold text-prayxis-offwhite uppercase">
                        BASIC ETHICAL HACKING (30 DAYS)
                      </h2>
                    </div>

                    <div>
                      {isEnrolled ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/40 rounded text-emerald-400 font-mono font-bold text-xs uppercase">
                          <CheckCircle2 className="h-4 w-4" />
                          <span>UNLOCKED — ACCESS GRANTED</span>
                        </span>
                      ) : isRequested ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-yellow-500/10 border border-yellow-500/40 rounded text-yellow-400 font-mono font-bold text-xs uppercase">
                          <Lock className="h-4 w-4" />
                          <span>REQUESTED — PENDING ADMIN APPROVAL</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-prayxis-accent/10 border border-prayxis-accent/40 rounded text-prayxis-accent font-mono font-bold text-xs uppercase">
                          <span>SPECIAL OFFER ₹99</span>
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="body-medium text-prayxis-muted font-normal leading-relaxed">
                    Learn core ethical hacking fundamentals, network scanning with Nmap/Wireshark, vulnerability assessment, web application security, Linux defense, and cyber safety practices.
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
                    <div className="p-3 bg-white/5 border border-white/10 rounded">
                      <div className="text-prayxis-subtle text-[10px]">DURATION</div>
                      <div className="text-prayxis-offwhite font-bold mt-1">30 DAYS (80H)</div>
                    </div>

                    <div className="p-3 bg-white/5 border border-white/10 rounded">
                      <div className="text-prayxis-subtle text-[10px]">OFFER PRICE</div>
                      <div className="text-prayxis-accent font-bold mt-1">₹99 <span className="line-through text-prayxis-subtle text-[10px]">₹999</span></div>
                    </div>

                    <div className="p-3 bg-white/5 border border-white/10 rounded">
                      <div className="text-prayxis-subtle text-[10px]">STATUS</div>
                      <div className="text-prayxis-offwhite font-bold mt-1">
                        {isEnrolled ? 'ACTIVE / UNLOCKED' : isRequested ? 'PENDING APPROVAL' : 'NOT ENROLLED'}
                      </div>
                    </div>

                    <div className="p-3 bg-white/5 border border-white/10 rounded">
                      <div className="text-prayxis-subtle text-[10px]">OFFER</div>
                      <div className="text-amber-300 font-bold mt-1">GANESH CHATURTHI</div>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center gap-4">
                    {isEnrolled ? (
                      <Link
                        href="/student/courses"
                        className="w-full sm:w-auto px-6 py-3 bg-prayxis-accent text-black font-mono text-xs font-bold uppercase tracking-wider rounded hover:bg-white transition-all flex items-center justify-center gap-2 cyan-glow cursor-pointer"
                      >
                        <Play className="h-4 w-4 fill-black" />
                        <span>OPEN COURSE CONSOLE →</span>
                      </Link>
                    ) : isRequested ? (
                      <>
                        <button
                          type="button"
                          onClick={() => {
                            const waUrl = getWhatsAppEnrollUrl({
                              userId: user.id,
                              userName: user.name,
                              userEmail: user.email,
                              courseTitle: 'Basic Ethical Hacking',
                              price: 99,
                              offer: 'Ganesh Chaturthi Special Offer',
                            });
                            window.open(waUrl, '_blank');
                          }}
                          className="w-full sm:w-auto px-6 py-3 bg-emerald-500 hover:bg-white text-black font-mono text-xs font-extrabold uppercase tracking-wider rounded transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                        >
                          <span>AGAIN REQUEST / RESEND ON WHATSAPP (7877716367) 📲</span>
                        </button>

                        <button
                          type="button"
                          onClick={fetchProfileData}
                          className="w-full sm:w-auto px-6 py-3 bg-yellow-500 text-black font-mono text-xs font-bold uppercase tracking-wider rounded hover:bg-white transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
                          <span>CHECK APPROVAL STATUS</span>
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={async () => {
                          await fetch('/api/courses/enroll', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                              courseSlug: 'basic-ethical-hacking',
                              courseTitle: 'Basic Ethical Hacking',
                              price: 99,
                              offer: 'GANESH CHATURTHI OFFER',
                            }),
                          });
                          const waUrl = getWhatsAppEnrollUrl({
                            userId: user.id,
                            userName: user.name,
                            userEmail: user.email,
                            courseTitle: 'Basic Ethical Hacking',
                            price: 99,
                            offer: 'Ganesh Chaturthi Special Offer',
                          });
                          window.open(waUrl, '_blank');
                          fetchProfileData();
                        }}
                        className="w-full sm:w-auto px-6 py-3 bg-prayxis-accent text-black font-mono text-xs font-extrabold uppercase tracking-wider rounded hover:bg-white transition-all flex items-center justify-center gap-2 cyan-glow cursor-pointer"
                      >
                        <span>ENROLL NOW FOR ₹99 (WHATSAPP 7877716367) →</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })()}

            {/* Course 3: Python Basics */}
            {(() => {
              const pythonEnr = user.enrollments?.find((e: any) => e.courseSlug === 'python-basics');
              const isEnrolled = (pythonEnr?.status === 'ENROLLED' || user.role === 'ADMIN') && isApprovedUser;
              const isRequested = Boolean(pythonEnr && (pythonEnr.status === 'REQUESTED' || !isApprovedUser));

              return (
                <div className="p-8 bg-prayxis-surface/90 border border-white/10 rounded-2xl backdrop-blur-md space-y-6 hover:border-prayxis-accent/40 transition-all">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
                    <div className="space-y-2">
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-prayxis-accent/10 border border-prayxis-accent/40 rounded-full font-mono text-[10px] text-prayxis-accent tracking-wider uppercase font-bold">
                        <Terminal className="h-3.5 w-3.5" />
                        <span>PROG-03 // PYTHON DEVELOPMENT</span>
                      </div>
                      <h2 className="font-mono text-2xl font-extrabold text-prayxis-offwhite uppercase">
                        PYTHON BASICS (30 DAYS)
                      </h2>
                    </div>

                    <div>
                      {isEnrolled ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/40 rounded text-emerald-400 font-mono font-bold text-xs uppercase">
                          <CheckCircle2 className="h-4 w-4" />
                          <span>UNLOCKED — ACCESS GRANTED</span>
                        </span>
                      ) : isRequested ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-yellow-500/10 border border-yellow-500/40 rounded text-yellow-400 font-mono font-bold text-xs uppercase">
                          <Lock className="h-4 w-4" />
                          <span>REQUESTED — PENDING ADMIN APPROVAL</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-prayxis-accent/10 border border-prayxis-accent/40 rounded text-prayxis-accent font-mono font-bold text-xs uppercase">
                          <span>SPECIAL OFFER ₹99</span>
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="body-medium text-prayxis-muted font-normal leading-relaxed">
                    Master Python programming from the ground up: syntax, variables, lists & dictionaries, functions, Object-Oriented Programming (OOP), file operations, and practical automation scripts.
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
                    <div className="p-3 bg-white/5 border border-white/10 rounded">
                      <div className="text-prayxis-subtle text-[10px]">DURATION</div>
                      <div className="text-prayxis-offwhite font-bold mt-1">30 DAYS (80H)</div>
                    </div>

                    <div className="p-3 bg-white/5 border border-white/10 rounded">
                      <div className="text-prayxis-subtle text-[10px]">OFFER PRICE</div>
                      <div className="text-prayxis-accent font-bold mt-1">₹99 <span className="line-through text-prayxis-subtle text-[10px]">₹999</span></div>
                    </div>

                    <div className="p-3 bg-white/5 border border-white/10 rounded">
                      <div className="text-prayxis-subtle text-[10px]">STATUS</div>
                      <div className="text-prayxis-offwhite font-bold mt-1">
                        {isEnrolled ? 'ACTIVE / UNLOCKED' : isRequested ? 'PENDING APPROVAL' : 'NOT ENROLLED'}
                      </div>
                    </div>

                    <div className="p-3 bg-white/5 border border-white/10 rounded">
                      <div className="text-prayxis-subtle text-[10px]">OFFER</div>
                      <div className="text-amber-300 font-bold mt-1">GANESH CHATURTHI</div>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center gap-4">
                    {isEnrolled ? (
                      <>
                        <Link
                          href="/student/courses/python-basics/day/1"
                          className="w-full sm:w-auto px-6 py-3 bg-prayxis-accent text-black font-mono text-xs font-bold uppercase tracking-wider rounded hover:bg-white transition-all flex items-center justify-center gap-2 cyan-glow cursor-pointer"
                        >
                          <Play className="h-4 w-4 fill-black" />
                          <span>ENTER DAY 01 LESSON →</span>
                        </Link>

                        <Link
                          href="/student/courses/python-basics"
                          className="w-full sm:w-auto px-6 py-3 bg-white/5 border border-white/10 hover:border-prayxis-accent/60 text-prayxis-offwhite font-mono text-xs font-bold uppercase tracking-wider rounded transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <span>OPEN COURSE DASHBOARD →</span>
                        </Link>
                      </>
                    ) : isRequested ? (
                      <>
                        <button
                          type="button"
                          onClick={() => {
                            const waUrl = getWhatsAppEnrollUrl({
                              userId: user.id,
                              userName: user.name,
                              userEmail: user.email,
                              courseTitle: 'Python Basics',
                              price: 99,
                              offer: 'Ganesh Chaturthi Special Offer',
                            });
                            window.open(waUrl, '_blank');
                          }}
                          className="w-full sm:w-auto px-6 py-3 bg-emerald-500 hover:bg-white text-black font-mono text-xs font-extrabold uppercase tracking-wider rounded transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                        >
                          <span>AGAIN REQUEST / RESEND ON WHATSAPP (7877716367) 📲</span>
                        </button>

                        <button
                          type="button"
                          onClick={fetchProfileData}
                          className="w-full sm:w-auto px-6 py-3 bg-yellow-500 text-black font-mono text-xs font-bold uppercase tracking-wider rounded hover:bg-white transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
                          <span>CHECK APPROVAL STATUS</span>
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={async () => {
                          await fetch('/api/courses/enroll', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                              courseSlug: 'python-basics',
                              courseTitle: 'Python Basics',
                              price: 99,
                              offer: 'GANESH CHATURTHI OFFER',
                            }),
                          });
                          const waUrl = getWhatsAppEnrollUrl({
                            userId: user.id,
                            userName: user.name,
                            userEmail: user.email,
                            courseTitle: 'Python Basics',
                            price: 99,
                            offer: 'Ganesh Chaturthi Special Offer',
                          });
                          window.open(waUrl, '_blank');
                          fetchProfileData();
                        }}
                        className="w-full sm:w-auto px-6 py-3 bg-prayxis-accent text-black font-mono text-xs font-extrabold uppercase tracking-wider rounded hover:bg-white transition-all flex items-center justify-center gap-2 cyan-glow cursor-pointer"
                      >
                        <span>ENROLL NOW FOR ₹99 (WHATSAPP 7877716367) →</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })()}
          </div>
        </div>

        {/* Section 4: Navigation & Account Actions */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/student"
              className="px-5 py-2.5 bg-white/5 border border-white/10 hover:border-prayxis-accent/60 text-prayxis-offwhite font-bold uppercase tracking-wider rounded transition-all flex items-center gap-2 cursor-pointer"
            >
              <LayoutDashboard className="h-4 w-4 text-prayxis-accent" />
              <span>BACK TO DASHBOARD</span>
            </Link>

            <Link
              href="/"
              className="px-5 py-2.5 bg-white/5 border border-white/10 hover:border-white/40 text-prayxis-offwhite font-bold uppercase tracking-wider rounded transition-all flex items-center gap-2 cursor-pointer"
            >
              <Home className="h-4 w-4" />
              <span>BACK TO HOME PAGE</span>
            </Link>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full sm:w-auto px-5 py-2.5 bg-white/5 border border-white/10 hover:border-red-500/60 hover:text-red-400 font-bold uppercase tracking-wider rounded transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
            <span>LOGOUT ACCOUNT</span>
          </button>
        </div>

      </main>

      <Footer />
    </div>
  );
}
