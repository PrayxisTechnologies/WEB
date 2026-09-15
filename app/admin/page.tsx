'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CustomCursor } from '@/components/ui/CustomCursor';
import {
  Shield,
  Users,
  Radio,
  Clock,
  CheckCircle2,
  RefreshCw,
  LogOut,
  UserCheck,
  UserX,
  Database,
  Lock,
  AlertTriangle,
  Calendar,
  Target,
  Flame,
  Award,
  Zap,
  TrendingUp,
  FileSpreadsheet,
} from 'lucide-react';

interface AdminUserRecord {
  id: string;
  name: string;
  email: string;
  role: string;
  isApproved: boolean;
  isOnline: boolean;
  lastActiveAt: string;
  lastActiveFormatted?: string;
  createdAt: string;
  todayActiveSeconds: number;
  totalCourseSeconds: number;
  completedDays?: number[];
  completedCount?: number;
  completionPercentage?: number;
  streak?: number;
  dailyLog?: any;
  enrollments?: Array<{
    id: string;
    courseSlug: string;
    courseTitle?: string;
    status: 'REQUESTED' | 'ENROLLED' | 'REJECTED';
    price?: number;
    offer?: string;
    [key: string]: any;
  }>;
  [key: string]: any;
}

interface AdminDailyLog {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  courseSlug: string;
  dayNumber: number;
  date: string;
  activeSeconds: number;
  targetSeconds: number;
  targetHours: number;
  completionPercentage: number;
  isTargetMet: boolean;
  status: 'IN_PROGRESS' | 'COMPLETED';
  firstActiveAt: string;
  lastActiveAt: string;
  [key: string]: any;
}

export default function DedicatedAdminPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [allUsers, setAllUsers] = useState<AdminUserRecord[]>([]);
  const [adminLoading, setAdminLoading] = useState(false);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  // Tab & Daily Log State
  const [activeTab, setActiveTab] = useState<'users' | 'daily_logs'>('users');
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [dailyLogs, setDailyLogs] = useState<AdminDailyLog[]>([]);
  const [dailySummary, setDailySummary] = useState<any>(null);
  const [dailyLogsLoading, setDailyLogsLoading] = useState(false);

  const fetchDailyLogs = async (dateStr: string) => {
    try {
      setDailyLogsLoading(true);
      const res = await fetch(`/api/student/daily-logs?all=true&date=${dateStr}`);
      if (res.ok) {
        const data = await res.json();
        setDailyLogs(data.dailyLogs || []);
        setDailySummary(data.summary || null);
      }
    } catch (err) {
      console.error('Failed to fetch daily logs:', err);
    } finally {
      setDailyLogsLoading(false);
    }
  };

  const fetchAdminUserList = async () => {
    try {
      setAdminLoading(true);
      const res = await fetch('/api/auth/me?all=true');
      if (res.ok) {
        const data = await res.json();
        setCurrentUser(data.user);
        if (data.users) {
          setAllUsers(data.users);
        }
      } else {
        router.push('/admin/login');
      }
    } catch (err) {
      console.error('Failed to fetch admin user list', err);
    } finally {
      setAdminLoading(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminUserList();
    fetchDailyLogs(selectedDate);
  }, []);

  useEffect(() => {
    if (activeTab === 'daily_logs') {
      fetchDailyLogs(selectedDate);
    }
  }, [selectedDate, activeTab]);

  // Poll live user online status & watch time every 5 seconds
  useEffect(() => {
    if (!currentUser || currentUser.role !== 'ADMIN') return;
    const interval = setInterval(() => {
      fetchAdminUserList();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch {}
    window.location.href = '/admin/login';
  };

  const handleToggleApproval = async (targetUserId: string, currentStatus: boolean) => {
    try {
      setActionLoadingId(targetUserId);
      const res = await fetch('/api/auth/me', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetUserId,
          isApproved: !currentStatus,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.users) {
          setAllUsers(data.users);
        }
      }
    } catch (err) {
      console.error('Failed to toggle user approval status', err);
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleToggleCourseApproval = async (targetUserId: string, courseSlug: string, isApproved: boolean) => {
    try {
      setActionLoadingId(`${targetUserId}_${courseSlug}`);
      const res = await fetch('/api/auth/me', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetUserId,
          courseSlug,
          isApproved,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.users) {
          setAllUsers(data.users);
        }
      }
    } catch (err) {
      console.error('Failed to toggle course approval status', err);
    } finally {
      setActionLoadingId(null);
    }
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
        <span>INITIALIZING MASTER ADMIN SECURITY CONSOLE...</span>
      </div>
    );
  }

  // Access Guard: If not admin
  if (currentUser && currentUser.role !== 'ADMIN') {
    return (
      <div className="relative min-h-screen bg-prayxis-bg text-prayxis-offwhite flex flex-col justify-between select-none">
        <Navbar />
        <main className="relative z-10 flex-1 pt-32 pb-20 px-6 sm:px-12 max-w-xl mx-auto w-full flex items-center justify-center">
          <div className="p-8 sm:p-12 bg-prayxis-surface/90 border border-red-500/50 rounded-2xl backdrop-blur-md space-y-6 text-center">
            <div className="h-16 w-16 bg-red-500/10 border border-red-500/40 rounded-full flex items-center justify-center mx-auto text-red-400">
              <Lock className="h-8 w-8" />
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/40 rounded-full font-mono text-xs text-red-400 uppercase tracking-wider font-bold">
              <AlertTriangle className="h-4 w-4" />
              <span>UNAUTHORIZED ACCESS</span>
            </div>
            <h1 className="font-mono text-2xl font-extrabold text-prayxis-offwhite uppercase">
              MASTER ADMIN ACCESS REQUIRED
            </h1>
            <p className="text-xs text-prayxis-muted font-mono leading-relaxed">
              Your logged in account (<span className="text-prayxis-accent font-bold">{currentUser.email}</span>) does not have Master Admin permissions to access `/admin`.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 font-mono text-xs">
              <Link
                href="/admin/login"
                className="w-full sm:w-auto px-6 py-3 bg-prayxis-accent text-black font-bold uppercase rounded hover:bg-white transition-all cyan-glow"
              >
                LOGIN AS MASTER ADMIN →
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const studentUsers = allUsers.filter((u) => u.role === 'STUDENT');
  const totalUsersCount = studentUsers.length;
  const onlineUsersCount = studentUsers.filter((u) => u.isOnline).length;
  const pendingUsersCount = studentUsers.filter((u) => !u.isApproved).length;
  const totalSystemSeconds = studentUsers.reduce((sum, u) => sum + (u.totalCourseSeconds || 0), 0);

  return (
    <div className="relative min-h-screen bg-prayxis-bg text-prayxis-offwhite flex flex-col justify-between select-none">
      <Navbar />

      <main className="relative z-10 flex-1 pt-32 pb-20 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto w-full space-y-10">
        
        {/* Admin Banner Header */}
        <div className="p-6 sm:p-8 bg-prayxis-surface/90 border border-prayxis-accent/60 rounded-2xl backdrop-blur-md flex flex-col md:flex-row md:items-center justify-between gap-6 cyan-glow-subtle">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-prayxis-accent/10 border border-prayxis-accent/40 rounded-full font-mono text-[10px] text-prayxis-accent uppercase tracking-wider font-bold">
              <Shield className="h-3.5 w-3.5" />
              <span>MASTER ADMIN CONTROL PORTAL (/admin)</span>
            </div>

            <h1 className="font-mono text-2xl sm:text-3xl font-extrabold text-prayxis-offwhite uppercase tracking-tight">
              DATABASE & USER APPROVAL MANAGEMENT
            </h1>

            <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs text-prayxis-muted">
              <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-prayxis-offwhite flex items-center gap-2 text-[11px]">
                <span className="h-2 w-2 rounded-full bg-prayxis-accent cyan-glow-subtle" />
                <span>{currentUser?.email || 'admin@prayxis.tech'}</span>
              </div>
              <div className="px-3 py-1 bg-prayxis-accent/20 border border-prayxis-accent/60 text-prayxis-accent font-bold text-[10px] uppercase">
                MASTER ADMIN ROLE
              </div>
              <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 font-bold text-[10px] uppercase flex items-center gap-1.5">
                <Database className="h-3.5 w-3.5 text-emerald-400" />
                <span>MONGODB ATLAS: CONNECTED (prayxis_db)</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={fetchAdminUserList}
              disabled={adminLoading}
              className="px-4 py-2.5 bg-prayxis-accent/10 border border-prayxis-accent/50 text-prayxis-accent hover:bg-prayxis-accent hover:text-black font-mono text-xs uppercase tracking-wider transition-all rounded-lg flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${adminLoading ? 'animate-spin' : ''}`} />
              <span>REFRESH LOGS</span>
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="px-4 py-2.5 bg-white/5 border border-white/10 hover:border-red-500/60 hover:text-red-400 font-mono text-xs tracking-wider uppercase transition-all rounded-lg flex items-center gap-2 cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
              <span>LOGOUT</span>
            </button>
          </div>
        </div>


        {/* Metric Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 font-mono">
          <div className="p-5 bg-prayxis-surface/90 border border-white/10 rounded-xl space-y-2">
            <div className="flex items-center justify-between text-prayxis-muted text-xs uppercase font-bold">
              <span>REGISTERED USERS</span>
              <Users className="h-4 w-4 text-prayxis-accent" />
            </div>
            <div className="text-3xl font-extrabold text-prayxis-offwhite">{totalUsersCount}</div>
            <div className="text-[10px] text-prayxis-subtle">STORED IN DATABASE</div>
          </div>

          <div className="p-5 bg-prayxis-surface/90 border border-emerald-500/30 rounded-xl space-y-2">
            <div className="flex items-center justify-between text-emerald-400 text-xs uppercase font-bold">
              <span>ONLINE STUDENTS</span>
              <Radio className="h-4 w-4 text-emerald-400 animate-pulse" />
            </div>
            <div className="text-3xl font-extrabold text-emerald-400">{onlineUsersCount}</div>
            <div className="text-[10px] text-emerald-400/80">ACTIVE WITHIN 2 MINUTES</div>
          </div>

          <div className="p-5 bg-prayxis-surface/90 border border-yellow-500/30 rounded-xl space-y-2">
            <div className="flex items-center justify-between text-yellow-400 text-xs uppercase font-bold">
              <span>PENDING APPROVALS</span>
              <Clock className="h-4 w-4 text-yellow-400" />
            </div>
            <div className="text-3xl font-extrabold text-yellow-400">{pendingUsersCount}</div>
            <div className="text-[10px] text-yellow-400/80">WAITING FOR ADMIN REVIEW</div>
          </div>

          <div className="p-5 bg-prayxis-surface/90 border border-prayxis-accent/30 rounded-xl space-y-2">
            <div className="flex items-center justify-between text-prayxis-accent text-xs uppercase font-bold">
              <span>TOTAL SYSTEM WATCH TIME</span>
              <Clock className="h-4 w-4 text-prayxis-accent" />
            </div>
            <div className="text-3xl font-extrabold text-prayxis-accent">{formatTime(totalSystemSeconds)}</div>
            <div className="text-[10px] text-prayxis-accent/80 font-bold">ACTIVE LEARNING SECONDS LOGGED</div>
          </div>
        </div>

        {/* Tab Switcher Controls */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-2 font-mono text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('users')}
            className={`px-5 py-2.5 rounded-xl font-bold uppercase transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'users'
                ? 'bg-prayxis-accent text-black cyan-glow font-extrabold'
                : 'bg-white/5 border border-white/10 text-prayxis-muted hover:text-prayxis-offwhite'
            }`}
          >
            <Users className="h-4 w-4" />
            <span>STUDENT COURSE & ACCOUNT APPROVALS ({studentUsers.length})</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('daily_logs');
              fetchDailyLogs(selectedDate);
            }}
            className={`px-5 py-2.5 rounded-xl font-bold uppercase transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'daily_logs'
                ? 'bg-prayxis-accent text-black cyan-glow font-extrabold'
                : 'bg-white/5 border border-white/10 text-prayxis-muted hover:text-prayxis-offwhite'
            }`}
          >
            <Calendar className="h-4 w-4" />
            <span>DAILY ATTENDANCE & TIME GOAL LOGS ({dailyLogs.length})</span>
          </button>
        </div>

        {/* TAB 1: User Approval & Account Management */}
        {activeTab === 'users' && (
          <div className="p-6 sm:p-8 bg-prayxis-surface/90 border border-white/10 rounded-2xl backdrop-blur-md space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 font-mono">
              <div className="space-y-1">
                <h2 className="text-lg font-bold text-prayxis-offwhite uppercase">STUDENT ACCOUNTS & APPROVAL CONTROL TABLE</h2>
                <p className="text-xs text-prayxis-muted">Approve new student registrations or unlock requested courses in real time.</p>
              </div>
              <span className="text-xs text-prayxis-accent font-bold uppercase">{studentUsers.length} TOTAL STUDENTS</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-prayxis-muted uppercase text-[10px] tracking-wider">
                    <th className="pb-3 px-3">STUDENT / EMAIL / ID</th>
                    <th className="pb-3 px-3">ROLE</th>
                    <th className="pb-3 px-3">LIVE STATUS & LAST ACTIVE</th>
                    <th className="pb-3 px-3">WATCH TIME & STREAK</th>
                    <th className="pb-3 px-3">REQUESTED COURSES (₹99)</th>
                    <th className="pb-3 px-3">APPROVAL STATUS</th>
                    <th className="pb-3 px-3 text-right">APPROVAL ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {studentUsers.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-prayxis-muted font-mono">
                        No registered students found yet.
                      </td>
                    </tr>
                  ) : (
                    studentUsers.map((u) => {
                      const isMasterAdmin = u.role === 'ADMIN';
                      const isPending = !u.isApproved;
                      const enrollments = u.enrollments || [];

                      return (
                      <tr key={u.id} className="hover:bg-white/5 transition-colors">
                        <td className="py-4 px-3 space-y-0.5">
                          <div className="font-bold text-prayxis-offwhite text-sm">{u.name}</div>
                          <div className="text-prayxis-muted text-xs font-normal">{u.email}</div>
                          <div className="text-[10px] text-prayxis-subtle">ID: {u.id}</div>
                        </td>

                        <td className="py-4 px-3">
                          <span
                            className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase ${
                              isMasterAdmin
                                ? 'bg-prayxis-accent/20 text-prayxis-accent border border-prayxis-accent/50'
                                : 'bg-white/5 text-prayxis-muted border border-white/10'
                            }`}
                          >
                            {u.role}
                          </span>
                        </td>

                        <td className="py-4 px-3 space-y-1">
                          <div className="flex items-center gap-2">
                            {u.isOnline ? (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/40 rounded text-emerald-400 font-bold text-[10px] uppercase">
                                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                                🟢 ONLINE
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/5 border border-white/10 rounded text-prayxis-subtle font-bold text-[10px] uppercase">
                                🔴 OFFLINE
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-prayxis-subtle">
                            Last active: <span className="text-prayxis-offwhite font-bold">{u.lastActiveFormatted || 'Never'}</span>
                          </div>
                        </td>

                        <td className="py-4 px-3 space-y-1">
                          <div className="font-bold text-prayxis-accent text-sm">{formatTime(u.totalCourseSeconds || 0)}</div>
                          <div className="text-[10px] text-prayxis-subtle">
                            Today: <span className="text-prayxis-offwhite font-bold">{formatTime(u.todayActiveSeconds || 0)}</span>
                          </div>
                          {u.streak ? (
                            <div className="inline-flex items-center gap-1 text-[10px] text-amber-400 font-bold">
                              <Flame className="h-3 w-3 fill-amber-400" />
                              <span>{u.streak} Day Streak</span>
                            </div>
                          ) : null}
                        </td>

                        {/* Course Requests & Approvals */}
                        <td className="py-4 px-3 space-y-1.5 min-w-[200px]">
                          {enrollments.length > 0 ? (
                            <div className="space-y-1.5">
                              {enrollments.map((enr) => {
                                const isCourseApproved = enr.status === 'ENROLLED';
                                const isLoadingThis = actionLoadingId === `${u.id}_${enr.courseSlug}`;

                                return (
                                  <div
                                    key={enr.id || enr.courseSlug}
                                    className="p-1.5 rounded bg-white/5 border border-white/10 flex items-center justify-between gap-2"
                                  >
                                    <div className="truncate text-[11px]">
                                      <div className="font-bold text-prayxis-offwhite truncate">
                                        {enr.courseTitle || enr.courseSlug}
                                      </div>
                                      <div className="text-[9px] text-amber-400">
                                        {enr.offer || 'Offer ₹99'}
                                      </div>
                                    </div>

                                    {!isMasterAdmin && (
                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleToggleCourseApproval(u.id, enr.courseSlug, !isCourseApproved)
                                        }
                                        disabled={isLoadingThis}
                                        className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase transition-all flex items-center gap-1 shrink-0 ${
                                          isCourseApproved
                                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-red-500/20 hover:text-red-400'
                                            : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/40 hover:bg-prayxis-accent hover:text-black'
                                        }`}
                                      >
                                        {isLoadingThis ? (
                                          <RefreshCw className="h-3 w-3 animate-spin" />
                                        ) : isCourseApproved ? (
                                          '🟢 UNLOCKED'
                                        ) : (
                                          '⏳ APPROVE'
                                        )}
                                      </button>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          ) : (
                            <div className="text-[10px] text-prayxis-subtle italic">No enrollments yet</div>
                          )}
                        </td>

                        <td className="py-4 px-3">
                          {u.isApproved ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-prayxis-accent/10 border border-prayxis-accent/40 rounded text-prayxis-accent font-bold text-[10px] uppercase">
                              <CheckCircle2 className="h-3 w-3 text-prayxis-accent" />
                              <span>APPROVED</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-yellow-500/10 border border-yellow-500/40 rounded text-yellow-400 font-bold text-[10px] uppercase">
                              <Clock className="h-3 w-3 text-yellow-400" />
                              <span>PENDING</span>
                            </span>
                          )}
                        </td>

                        <td className="py-4 px-3 text-right">
                          {isMasterAdmin ? (
                            <span className="text-[10px] text-prayxis-subtle italic">SYSTEM MASTER</span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleToggleApproval(u.id, u.isApproved)}
                              disabled={actionLoadingId === u.id}
                              className={`px-3.5 py-2 font-mono text-[11px] font-bold uppercase rounded tracking-wider transition-all flex items-center gap-1.5 ml-auto cursor-pointer ${
                                isPending
                                  ? 'bg-prayxis-accent text-black hover:bg-white cyan-glow'
                                  : 'bg-red-500/10 border border-red-500/40 text-red-400 hover:bg-red-500 hover:text-white'
                              }`}
                            >
                              {actionLoadingId === u.id ? (
                                <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                              ) : isPending ? (
                                <>
                                  <UserCheck className="h-3.5 w-3.5" />
                                  <span>APPROVE ALL</span>
                                </>
                              ) : (
                                <>
                                  <UserX className="h-3.5 w-3.5" />
                                  <span>REVOKE ALL</span>
                                </>
                              )}
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: Daily Attendance & Time Goal Compliance Verification */}
        {activeTab === 'daily_logs' && (
          <div className="space-y-6 font-mono">
            {/* Date Filter & Control Bar */}
            <div className="p-6 bg-prayxis-surface/90 border border-prayxis-accent/40 rounded-2xl backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-prayxis-accent/10 border border-prayxis-accent/40 rounded-full text-[10px] text-prayxis-accent font-bold uppercase">
                  <Target className="h-3.5 w-3.5" />
                  <span>3-HOUR DAILY REQUIREMENT VERIFICATION</span>
                </div>
                <h2 className="text-xl font-extrabold text-prayxis-offwhite uppercase">
                  STUDENT DAILY ATTENDANCE & TIME LOGS
                </h2>
                <p className="text-xs text-prayxis-muted">
                  Persisted directly in MongoDB Atlas collection: <span className="text-prayxis-accent font-bold">`prayxis_db.daily_logs`</span>
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-black/60 border border-white/10 px-3 py-2 rounded-xl text-xs">
                  <Calendar className="h-4 w-4 text-prayxis-accent" />
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="bg-transparent text-prayxis-offwhite focus:outline-none cursor-pointer"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => fetchDailyLogs(selectedDate)}
                  disabled={dailyLogsLoading}
                  className="px-4 py-2 bg-prayxis-accent text-black font-bold text-xs uppercase rounded-xl hover:bg-white transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <RefreshCw className={`h-3.5 w-3.5 ${dailyLogsLoading ? 'animate-spin' : ''}`} />
                  <span>RELOAD DATE</span>
                </button>
              </div>
            </div>

            {/* Daily Compliance KPI Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="p-5 bg-prayxis-surface/90 border border-emerald-500/40 rounded-xl space-y-1.5">
                <div className="flex items-center justify-between text-emerald-400 text-xs font-bold uppercase">
                  <span>TARGET MET (3 HOURS)</span>
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                </div>
                <div className="text-3xl font-extrabold text-emerald-400">
                  {dailySummary?.targetMetCount || 0}
                </div>
                <div className="text-[10px] text-emerald-400/80">STUDENTS COMPLETED 100%</div>
              </div>

              <div className="p-5 bg-prayxis-surface/90 border border-yellow-500/40 rounded-xl space-y-1.5">
                <div className="flex items-center justify-between text-yellow-400 text-xs font-bold uppercase">
                  <span>IN PROGRESS TODAY</span>
                  <Clock className="h-4 w-4 text-yellow-400" />
                </div>
                <div className="text-3xl font-extrabold text-yellow-400">
                  {dailySummary?.inProgressCount || 0}
                </div>
                <div className="text-[10px] text-yellow-400/80">STUDYING TOWARDS 3 HOURS</div>
              </div>

              <div className="p-5 bg-prayxis-surface/90 border border-prayxis-accent/40 rounded-xl space-y-1.5">
                <div className="flex items-center justify-between text-prayxis-accent text-xs font-bold uppercase">
                  <span>TOTAL HOURS LOGGED TODAY</span>
                  <Zap className="h-4 w-4 text-prayxis-accent" />
                </div>
                <div className="text-3xl font-extrabold text-prayxis-accent">
                  {dailySummary?.totalHoursLogged || '0.0'}h
                </div>
                <div className="text-[10px] text-prayxis-accent/80 font-bold">
                  {dailySummary?.totalSecondsLogged || 0} SECONDS TOTAL
                </div>
              </div>

              <div className="p-5 bg-prayxis-surface/90 border border-cyan-500/40 rounded-xl space-y-1.5">
                <div className="flex items-center justify-between text-cyan-400 text-xs font-bold uppercase">
                  <span>COMPLIANCE RATE</span>
                  <TrendingUp className="h-4 w-4 text-cyan-400" />
                </div>
                <div className="text-3xl font-extrabold text-cyan-400">
                  {dailySummary?.targetMetPercentage || 0}%
                </div>
                <div className="text-[10px] text-cyan-400/80">DAILY COMPLETION RATIO</div>
              </div>
            </div>

            {/* Daily Logs Table */}
            <div className="p-6 sm:p-8 bg-prayxis-surface/90 border border-white/10 rounded-2xl backdrop-blur-md space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-prayxis-offwhite uppercase">
                    DAILY ACTIVITY LOGS FOR: <span className="text-prayxis-accent">{selectedDate}</span>
                  </h3>
                  <p className="text-xs text-prayxis-muted">
                    Verified real-time logs checking each student's daily 3-hour learning commitment.
                  </p>
                </div>
                <span className="text-xs text-prayxis-accent font-bold uppercase">
                  {dailyLogs.length} LOGGED SESSIONS
                </span>
              </div>

              {dailyLogs.length === 0 ? (
                <div className="p-12 text-center space-y-3 bg-black/40 border border-dashed border-white/10 rounded-xl">
                  <div className="text-prayxis-muted text-xs">
                    No active student sessions logged on <span className="text-prayxis-accent font-bold">{selectedDate}</span> yet.
                  </div>
                  <div className="text-[11px] text-prayxis-subtle">
                    When students start learning on Python Basics Day 01 or other modules, their logs will appear here automatically in real time!
                  </div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left font-mono text-xs">
                    <thead>
                      <tr className="border-b border-white/10 text-prayxis-muted uppercase text-[10px] tracking-wider">
                        <th className="pb-3 px-3">STUDENT & EMAIL</th>
                        <th className="pb-3 px-3">COURSE & DAY</th>
                        <th className="pb-3 px-3">TIME COMPLETED / TARGET</th>
                        <th className="pb-3 px-3">3-HOUR PROGRESS</th>
                        <th className="pb-3 px-3">STATUS & COMPLIANCE</th>
                        <th className="pb-3 px-3">SESSION TIMESTAMPS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {dailyLogs.map((log) => {
                        const hours = Math.floor(log.activeSeconds / 3600);
                        const mins = Math.floor((log.activeSeconds % 3600) / 60);
                        const targetHours = log.targetHours || 3;
                        const percentage = log.completionPercentage || 0;
                        const isMet = log.isTargetMet;

                        return (
                          <tr key={log.id} className="hover:bg-white/5 transition-colors">
                            <td className="py-4 px-3 space-y-0.5">
                              <div className="font-bold text-prayxis-offwhite text-sm">{log.userName}</div>
                              <div className="text-prayxis-muted text-xs">{log.userEmail}</div>
                              <div className="text-[9px] text-prayxis-subtle">ID: {log.userId}</div>
                            </td>

                            <td className="py-4 px-3 space-y-0.5">
                              <div className="font-bold text-prayxis-offwhite capitalize">
                                {log.courseSlug.replace('-', ' ')}
                              </div>
                              <div className="text-[10px] text-prayxis-accent font-bold">
                                Day {String(log.dayNumber).padStart(2, '0')} Module
                              </div>
                            </td>

                            <td className="py-4 px-3 space-y-0.5">
                              <div className="font-bold text-prayxis-offwhite text-sm">
                                {hours}h {mins}m <span className="text-prayxis-muted text-xs font-normal">/ {targetHours}h 00m</span>
                              </div>
                              <div className="text-[10px] text-prayxis-subtle">
                                {log.activeSeconds} seconds active
                              </div>
                            </td>

                            <td className="py-4 px-3 space-y-1.5 min-w-[160px]">
                              <div className="flex items-center justify-between text-[11px]">
                                <span className={isMet ? 'text-emerald-400 font-bold' : 'text-prayxis-offwhite'}>
                                  {percentage}%
                                </span>
                                <span className="text-[10px] text-prayxis-subtle">
                                  {isMet ? 'Completed' : `${Math.max(0, Math.ceil((log.targetSeconds - log.activeSeconds) / 60))}m left`}
                                </span>
                              </div>
                              <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                                <div
                                  className={`h-full transition-all duration-500 ${
                                    isMet ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]' : 'bg-prayxis-accent'
                                  }`}
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                            </td>

                            <td className="py-4 px-3">
                              {isMet ? (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/40 rounded-full text-emerald-400 font-bold text-[10px] uppercase">
                                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                                  <span>✅ TARGET MET (100%)</span>
                                </span>
                              ) : log.activeSeconds > 0 ? (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-500/10 border border-yellow-500/40 rounded-full text-yellow-400 font-bold text-[10px] uppercase">
                                  <Clock className="h-3.5 w-3.5 text-yellow-400 animate-spin" />
                                  <span>⏳ IN PROGRESS</span>
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-prayxis-subtle font-bold text-[10px] uppercase">
                                  <span>NOT STARTED</span>
                                </span>
                              )}
                            </td>

                            <td className="py-4 px-3 text-[10px] text-prayxis-subtle space-y-0.5">
                              <div>First active: <span className="text-prayxis-offwhite font-bold">{new Date(log.firstActiveAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span></div>
                              <div>Last active: <span className="text-prayxis-offwhite font-bold">{new Date(log.lastActiveAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span></div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
