'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { ActiveLearningTracker, ActivityState } from '@/components/student/ActiveLearningTracker';
import { ActiveLearningTimer } from '@/components/student/ActiveLearningTimer';
import { DailyGoalWidget } from '@/components/student/DailyGoalWidget';
import {
  Terminal,
  LogOut,
  BookOpen,
  Clock,
  Award,
  Shield,
  ArrowRight,
  Play,
  CheckCircle2,
  XCircle,
  UserCheck,
  UserX,
  RefreshCw,
  Users,
  Radio,
  Lock,
  AlertTriangle,
  Home,
  User,
  MessageCircle,
} from 'lucide-react';
import { getWhatsAppEnrollUrl } from '@/lib/whatsapp';

interface StudentUser {
  id: string;
  name: string;
  email: string;
  role: string;
  isApproved: boolean;
  createdAt: string;
  enrollments?: any[];
  streak?: number;
  [key: string]: any;
}

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
  enrollments?: any[];
  [key: string]: any;
}

export default function StudentDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<StudentUser | null>(null);
  const [todaySeconds, setTodaySeconds] = useState(0);
  const [courseSeconds, setCourseSeconds] = useState(0);
  const [activityState, setActivityState] = useState<ActivityState>('ACTIVE');
  const [loading, setLoading] = useState(true);

  // Admin state
  const [allUsers, setAllUsers] = useState<AdminUserRecord[]>([]);
  const [adminLoading, setAdminLoading] = useState(false);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [statusToast, setStatusToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  const fetchUserData = async (isManual: boolean = false) => {
    try {
      if (isManual) setRefreshing(true);
      const res = await fetch(`/api/auth/me?t=${Date.now()}`, {
        cache: 'no-store',
        headers: { 'Cache-Control': 'no-cache' },
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        if (data.stats) {
          setTodaySeconds(data.stats.todayActiveSeconds || 0);
          setCourseSeconds(data.stats.totalCourseSeconds || 0);
        }

        // If admin, fetch all registered users
        if (data.user?.role === 'ADMIN') {
          fetchAdminUserList();
        }

        if (isManual) {
          if (data.user?.isApproved || data.user?.role === 'ADMIN') {
            setStatusToast({
              message: '🎉 Congratulations! Your account & course are APPROVED & UNLOCKED!',
              type: 'success',
            });
          } else {
            setStatusToast({
              message: '⏳ Status checked: Your request is currently PENDING approval by Admin.',
              type: 'info',
            });
          }
          setTimeout(() => setStatusToast(null), 4500);
        }
      } else {
        setUser(null);
      }
    } catch (err) {
      if (isManual) {
        setStatusToast({
          message: '❌ Failed to refresh status. Please try again.',
          type: 'error',
        });
        setTimeout(() => setStatusToast(null), 4000);
      }
      setUser(null);
    } finally {
      setLoading(false);
      if (isManual) setRefreshing(false);
    }
  };

  const fetchAdminUserList = async () => {
    try {
      setAdminLoading(true);
      const res = await fetch('/api/auth/me?all=true');
      if (res.ok) {
        const data = await res.json();
        if (data.users) {
          setAllUsers(data.users);
        }
      }
    } catch (err) {
      console.error('Failed to fetch admin user list', err);
    } finally {
      setAdminLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  // Admin Live Polling every 10 seconds
  useEffect(() => {
    if (user?.role !== 'ADMIN') return;
    const interval = setInterval(() => {
      fetchAdminUserList();
    }, 10000);
    return () => clearInterval(interval);
  }, [user]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch {}
    window.location.href = '/login';
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

  const handleCardClick = () => {
    router.push('/student/courses/full-stack');
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
        <span>INITIALIZING SECURITY CONSOLE...</span>
      </div>
    );
  }

  // 1. MASTER ADMIN CONTROL CENTER
  if (user?.role === 'ADMIN') {
    const totalUsersCount = allUsers.length;
    const onlineUsersCount = allUsers.filter((u) => u.isOnline).length;
    const pendingUsersCount = allUsers.filter((u) => !u.isApproved && u.role !== 'ADMIN').length;
    const totalSystemSeconds = allUsers.reduce((sum, u) => sum + (u.totalCourseSeconds || 0), 0);

    return (
      <div className="relative min-h-screen bg-prayxis-bg text-prayxis-offwhite flex flex-col justify-between select-none">
        <Navbar />

        <main className="relative z-10 flex-1 pt-32 pb-20 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto w-full space-y-10">
          
          {/* Admin Banner Header */}
          <div className="p-6 sm:p-8 bg-prayxis-surface/90 border border-prayxis-accent/60 rounded-2xl backdrop-blur-md flex flex-col md:flex-row md:items-center justify-between gap-6 cyan-glow-subtle">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-prayxis-accent/10 border border-prayxis-accent/40 rounded-full font-mono text-[10px] text-prayxis-accent uppercase tracking-wider font-bold">
                <Shield className="h-3.5 w-3.5" />
                <span>MASTER ADMIN SECURITY CONTROL CENTER</span>
              </div>

              <h1 className="font-mono text-2xl sm:text-3xl font-extrabold text-prayxis-offwhite uppercase tracking-tight">
                SYSTEM DASHBOARD & USER APPROVALS
              </h1>

              <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs text-prayxis-muted">
                <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-prayxis-offwhite flex items-center gap-2 text-[11px]">
                  <span className="h-2 w-2 rounded-full bg-prayxis-accent cyan-glow-subtle" />
                  <span>{user.email}</span>
                </div>
                <div className="px-3 py-1 bg-prayxis-accent/20 border border-prayxis-accent/60 text-prayxis-accent font-bold text-[10px] uppercase">
                  MASTER ADMIN ROLE
                </div>
                <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 font-bold text-[10px] uppercase flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>DB: MONGODB ATLAS CONNECTED</span>
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
                <span>TOTAL USERS</span>
                <Users className="h-4 w-4 text-prayxis-accent" />
              </div>
              <div className="text-3xl font-extrabold text-prayxis-offwhite">{totalUsersCount}</div>
              <div className="text-[10px] text-prayxis-subtle">REGISTERED IN DATABASE</div>
            </div>

            <div className="p-5 bg-prayxis-surface/90 border border-emerald-500/30 rounded-xl space-y-2">
              <div className="flex items-center justify-between text-emerald-400 text-xs uppercase font-bold">
                <span>ONLINE NOW</span>
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
              <div className="text-[10px] text-yellow-400/80">REQUIRES ADMIN REVIEW</div>
            </div>

            <div className="p-5 bg-prayxis-surface/90 border border-prayxis-accent/30 rounded-xl space-y-2">
              <div className="flex items-center justify-between text-prayxis-accent text-xs uppercase font-bold">
                <span>SYSTEM WATCH TIME</span>
                <Clock className="h-4 w-4 text-prayxis-accent" />
              </div>
              <div className="text-3xl font-extrabold text-prayxis-accent">{formatTime(totalSystemSeconds)}</div>
              <div className="text-[10px] text-prayxis-accent/80 font-bold">TOTAL ACTIVE LEARNING LOGGED</div>
            </div>
          </div>

          {/* User Approval & Monitoring Management Table */}
          <div className="p-6 sm:p-8 bg-prayxis-surface/90 border border-white/10 rounded-2xl backdrop-blur-md space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 font-mono">
              <div className="space-y-1">
                <h2 className="text-lg font-bold text-prayxis-offwhite uppercase">USER ACCOUNTS & LIVE STATUS TRACKER</h2>
                <p className="text-xs text-prayxis-muted">Approve new student registrations or revoke access in real time.</p>
              </div>
              <span className="text-xs text-prayxis-accent font-bold uppercase">{allUsers.length} TOTAL ACCOUNTS</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-prayxis-muted uppercase text-[10px] tracking-wider">
                    <th className="pb-3 px-3">USER / EMAIL / ID</th>
                    <th className="pb-3 px-3">ENROLLED COURSES & ACCESS</th>
                    <th className="pb-3 px-3">LIVE STATUS & LAST ACTIVE</th>
                    <th className="pb-3 px-3">WATCH TIME & GOAL</th>
                    <th className="pb-3 px-3">DAY PROGRESS & %</th>
                    <th className="pb-3 px-3">GLOBAL ACCESS</th>
                    <th className="pb-3 px-3 text-right">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {allUsers.map((u) => {
                    const isMasterAdmin = u.role === 'ADMIN';
                    const isPending = !u.isApproved;
                    const compCount = u.completedCount || 0;
                    const compPercentage = u.completionPercentage || 0;
                    const todaySecs = u.todayActiveSeconds || 0;
                    const isDailyGoalMet = todaySecs >= 10800; // 3 Hours target

                    return (
                      <tr key={u.id} className="hover:bg-white/5 transition-colors">
                        {/* User / Email / ID */}
                        <td className="py-4 px-3 space-y-0.5">
                          <div className="font-bold text-prayxis-offwhite text-sm">{u.name}</div>
                          <div className="text-prayxis-muted text-xs font-normal">{u.email}</div>
                          <div className="text-[10px] text-prayxis-subtle">ID: {u.id}</div>
                        </td>

                        {/* Enrolled Courses & Status */}
                        <td className="py-4 px-3 space-y-1.5 min-w-[170px]">
                          {u.enrollments && u.enrollments.length > 0 ? (
                            u.enrollments.map((enr: any) => {
                              const isEnrUnlocked = enr.status === 'ENROLLED' && u.isApproved;
                              return (
                                <div key={enr.id || enr.courseSlug} className="space-y-0.5">
                                  <div className="text-[11px] font-bold text-prayxis-offwhite truncate max-w-[160px]">
                                    {enr.courseTitle || enr.courseSlug}
                                  </div>
                                  <div>
                                    {isEnrUnlocked ? (
                                      <span className="inline-flex items-center gap-1 text-[9.5px] font-extrabold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-1.5 py-0.5 rounded">
                                        ✔ APPROVED (UNLOCKED)
                                      </span>
                                    ) : (
                                      <span className="inline-flex items-center gap-1 text-[9.5px] font-extrabold text-yellow-400 bg-yellow-500/10 border border-yellow-500/30 px-1.5 py-0.5 rounded">
                                        🔒 PENDING (LOCKED)
                                      </span>
                                    )}
                                  </div>
                                </div>
                              );
                            })
                          ) : (
                            <div className="text-prayxis-muted text-[11px] font-bold">
                              {u.isApproved ? 'Full Stack (Unlocked)' : 'Full Stack (Locked)'}
                            </div>
                          )}
                        </td>

                        {/* Live Status & Last Active */}
                        <td className="py-4 px-3 space-y-1">
                          <div className="flex items-center gap-2">
                            {u.isOnline ? (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/40 rounded text-emerald-400 font-bold text-[10px] uppercase">
                                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                                🟢 ONLINE NOW
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

                        {/* Watch Time & Daily Target */}
                        <td className="py-4 px-3 space-y-1">
                          <div className="font-bold text-prayxis-accent text-sm">
                            {formatTime(u.totalCourseSeconds || 0)} Total
                          </div>
                          <div className="text-[10px] text-prayxis-subtle">
                            Today: <span className="text-prayxis-offwhite font-bold">{formatTime(todaySecs)} / 3h 00m</span>
                          </div>
                          <div>
                            {isDailyGoalMet ? (
                              <span className="inline-block text-[9px] font-extrabold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-1.5 py-0.5 rounded">
                                🏆 3H GOAL MET
                              </span>
                            ) : todaySecs > 0 ? (
                              <span className="inline-block text-[9px] font-extrabold text-yellow-400 bg-yellow-500/10 border border-yellow-500/30 px-1.5 py-0.5 rounded">
                                ⏳ IN PROGRESS
                              </span>
                            ) : (
                              <span className="inline-block text-[9px] font-bold text-prayxis-subtle bg-white/5 border border-white/10 px-1.5 py-0.5 rounded">
                                ⚪ NO WATCH TIME TODAY
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Day Progress & % */}
                        <td className="py-4 px-3 space-y-1.5 min-w-[140px]">
                          <div className="flex items-center justify-between text-[11px] font-bold">
                            <span className="text-prayxis-accent">DAY {compCount > 0 ? compCount : 1} / 45</span>
                            <span className="text-prayxis-subtle text-[10px]">{compPercentage}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/10">
                            <div
                              className="h-full bg-prayxis-accent transition-all duration-300 cyan-glow"
                              style={{ width: `${compPercentage}%` }}
                            />
                          </div>
                          {u.completedDays && u.completedDays.length > 0 ? (
                            <div className="text-[9px] text-prayxis-subtle truncate max-w-[140px]">
                              Completed: {u.completedDays.map(d => `Day ${String(d).padStart(2, '0')}`).join(', ')}
                            </div>
                          ) : (
                            <div className="text-[9px] text-prayxis-subtle">Day 01 In Progress</div>
                          )}
                        </td>

                        {/* Approval Status */}
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

                        {/* Action */}
                        <td className="py-4 px-3 text-right">
                          {isMasterAdmin ? (
                            <span className="text-[10px] text-prayxis-subtle italic">SYSTEM MASTER</span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleToggleApproval(u.id, u.isApproved)}
                              disabled={actionLoadingId === u.id}
                              className={`px-3 py-1.5 font-mono text-[11px] font-bold uppercase rounded tracking-wider transition-all flex items-center gap-1.5 ml-auto cursor-pointer ${
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
                                  <span>APPROVE USER</span>
                                </>
                              ) : (
                                <>
                                  <UserX className="h-3.5 w-3.5" />
                                  <span>REVOKE ACCESS</span>
                                </>
                              )}
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

        </main>

        <Footer />
      </div>
    );
  }

  // 3. APPROVED STUDENT DASHBOARD
  return (
    <div className="relative min-h-screen bg-prayxis-bg text-prayxis-offwhite flex flex-col justify-between select-none">
      
      {/* Real-Time Active Learning Tracker */}
      <ActiveLearningTracker
        courseSlug="full-stack"
        dayNumber={1}
        initialTodaySeconds={todaySeconds}
        onTimeUpdate={({ todaySeconds: tSecs, courseSeconds: cSecs }) => {
          setTodaySeconds(tSecs);
          setCourseSeconds(cSecs);
        }}
        onStateChange={(state) => setActivityState(state)}
      />

      <Navbar />

      <main className="relative z-10 flex-1 pt-32 pb-20 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto w-full space-y-10">
        
        {/* Header Console Banner */}
        <div className="p-6 sm:p-8 bg-prayxis-surface/90 border border-white/10 rounded-2xl backdrop-blur-md flex flex-col md:flex-row md:items-center justify-between gap-6 cyan-glow-subtle">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-prayxis-accent/10 border border-prayxis-accent/40 rounded-full font-mono text-[10px] text-prayxis-accent uppercase tracking-wider font-bold">
              <Terminal className="h-3.5 w-3.5" />
              <span>STUDENT ENGINEERING CONSOLE</span>
            </div>

            <h1 className="font-mono text-2xl sm:text-3xl font-extrabold text-prayxis-offwhite uppercase tracking-tight">
              WELCOME, {user?.name ? user.name : 'STUDENT'}
            </h1>

            <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs text-prayxis-muted">
              {user?.email && (
                <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-prayxis-offwhite flex items-center gap-2 text-[11px]">
                  <span className="h-2 w-2 rounded-full bg-prayxis-accent cyan-glow-subtle" />
                  <span>{user.email}</span>
                </div>
              )}
              <div className="px-3 py-1 bg-prayxis-accent/10 border border-prayxis-accent/40 rounded-md text-prayxis-accent font-bold text-[10px] uppercase">
                {user?.role ? `${user.role} ACCOUNT` : 'STUDENT ACCOUNT'}
              </div>
              {user?.isApproved || user?.role === 'ADMIN' ? (
                <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/40 rounded-md text-emerald-400 text-[10px] uppercase font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                  <span>ADMIN APPROVED</span>
                </div>
              ) : (
                <div className="px-3 py-1 bg-yellow-500/10 border border-yellow-500/40 rounded-md text-yellow-400 text-[10px] uppercase font-bold flex items-center gap-1.5">
                  <Clock className="h-3 w-3 text-yellow-400" />
                  <span>PENDING APPROVAL</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">
            <Link
              href="/student/profile"
              className="px-4 py-2.5 bg-prayxis-accent/10 border border-prayxis-accent/40 text-prayxis-accent hover:bg-prayxis-accent hover:text-black font-mono text-xs tracking-wider uppercase transition-all rounded-lg flex items-center gap-2 cursor-pointer"
            >
              <User className="h-4 w-4" />
              <span>PROFILE</span>
            </Link>

            <Link
              href="/"
              className="px-4 py-2.5 bg-white/5 border border-white/10 hover:border-white/40 text-prayxis-offwhite font-mono text-xs tracking-wider uppercase transition-all rounded-lg flex items-center gap-2 cursor-pointer"
            >
              <Home className="h-4 w-4" />
              <span>HOME</span>
            </Link>

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

        {/* Pending Verification Banner (if not approved yet) */}
        {user && !user.isApproved && user.role !== 'ADMIN' && (
          <div className="p-6 bg-yellow-500/10 border border-yellow-500/40 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-mono text-xs shadow-lg">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-yellow-400 font-bold text-sm uppercase">
                <Clock className="h-4 w-4 text-yellow-400" />
                <span>ENROLLMENT STATUS: PENDING MASTER ADMIN APPROVAL</span>
              </div>
              <p className="text-prayxis-muted text-xs font-normal">
                Your course enrollment has been registered. Once approved by admin, full lesson access will unlock immediately.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  const waUrl = getWhatsAppEnrollUrl({
                    userId: user.id,
                    userName: user.name,
                    userEmail: user.email,
                    courseTitle: 'Full Stack Web Development',
                    price: 199,
                    offer: 'Special Student Offer',
                  });
                  window.open(waUrl, '_blank');
                }}
                className="px-4 py-2.5 bg-emerald-500 hover:bg-white text-black font-extrabold uppercase rounded flex items-center gap-2 cursor-pointer shadow-lg"
              >
                <MessageCircle className="h-4 w-4 fill-black text-black" />
                <span>RESEND ON WHATSAPP (7877716367) 📲</span>
              </button>
              <button
                type="button"
                onClick={() => fetchUserData(true)}
                disabled={refreshing}
                className="px-4 py-2.5 bg-yellow-500 text-black font-bold uppercase rounded hover:bg-white transition-all cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? 'animate-spin' : ''}`} />
                <span>{refreshing ? 'CHECKING STATUS...' : 'CHECK STATUS'}</span>
              </button>
            </div>
          </div>
        )}

        {/* Daily Attendance & 3-Hour Time Goal Widget */}
        <DailyGoalWidget courseSlug="python-basics" dayNumber={1} />

        {/* Live Active Learning Timer */}
        <ActiveLearningTimer
          todayActiveSeconds={todaySeconds}
          activityState={activityState}
          targetDailySeconds={10800}
        />

        {/* Enrolled Programs Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between font-mono text-xs text-prayxis-accent uppercase">
            <span className="font-bold">MY ENROLLED PROGRAMS</span>
            <Link href="/student/courses" className="text-prayxis-subtle hover:text-prayxis-offwhite transition-colors cursor-pointer">
              VIEW ALL COURSES →
            </Link>
          </div>

          {/* Full Stack Course Card */}
          <div 
            className={`p-8 bg-prayxis-surface/90 border rounded-2xl backdrop-blur-md grid grid-cols-1 lg:grid-cols-12 gap-8 items-center cyan-glow-subtle transition-all group ${
              user?.isApproved || user?.role === 'ADMIN'
                ? 'border-prayxis-accent/50 cursor-pointer hover:border-prayxis-accent'
                : 'border-yellow-500/40'
            }`}
            onClick={() => {
              if (user?.isApproved || user?.role === 'ADMIN') {
                router.push('/student/courses/full-stack');
              } else {
                router.push('/student/profile');
              }
            }}
          >
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-prayxis-accent/10 border border-prayxis-accent/40 rounded-full font-mono text-[10px] text-prayxis-accent tracking-wider uppercase">
                <span>{user?.isApproved || user?.role === 'ADMIN' ? 'ENROLLED' : 'REQUESTED (PENDING)'}</span>
                <span>//</span>
                <span>45 DAYS</span>
                <span>//</span>
                <span>SPECIAL OFFER: ₹199</span>
              </div>

              <h2 className="font-mono text-2xl font-extrabold text-prayxis-offwhite uppercase group-hover:text-prayxis-accent transition-colors">
                FULL STACK WEB DEVELOPMENT
              </h2>

              <p className="body-small text-prayxis-muted leading-relaxed">
                Master HTML, CSS, JavaScript, React, Node.js, Express, databases, and session authentication from first principles.
              </p>

              {/* Progress & Target Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs pt-2">
                <div className="p-3 bg-white/5 border border-white/10 rounded">
                  <div className="text-prayxis-subtle text-[10px]">PROGRESS</div>
                  <div className="text-prayxis-offwhite font-bold mt-1">0%</div>
                </div>

                <div className="p-3 bg-white/5 border border-prayxis-accent/60 rounded">
                  <div className="text-prayxis-accent text-[10px]">CURRENT MODULE</div>
                  <div className="text-prayxis-offwhite font-bold mt-1">DAY 01</div>
                </div>

                <div className="p-3 bg-white/5 border border-prayxis-accent/60 rounded">
                  <div className="text-prayxis-accent text-[10px]">TOTAL LEARNING</div>
                  <div className="text-prayxis-offwhite font-bold mt-1">
                    {Math.floor(courseSeconds / 3600)}H {Math.floor((courseSeconds % 3600) / 60)}M
                  </div>
                </div>

                <div className="p-3 bg-white/5 border border-prayxis-accent/60 rounded">
                  <div className="text-prayxis-accent text-[10px]">APPROVAL STATUS</div>
                  <div className="text-prayxis-accent font-bold mt-1">
                    {user?.isApproved || user?.role === 'ADMIN' ? 'UNLOCKED / ACTIVE' : 'PENDING APPROVAL'}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="lg:col-span-4 flex flex-col justify-center space-y-3" onClick={(e) => e.stopPropagation()}>
              {user?.isApproved || user?.role === 'ADMIN' ? (
                <>
                  <Link
                    href="/student/courses/full-stack/day/1"
                    className="w-full py-3.5 bg-prayxis-accent text-black font-bold font-mono text-xs uppercase tracking-wider rounded text-center hover:bg-white transition-colors flex items-center justify-center gap-2 cyan-glow cursor-pointer"
                  >
                    <Play className="h-4 w-4 fill-black" />
                    <span>START DAY 01 LESSON →</span>
                  </Link>

                  <Link
                    href="/student/courses/full-stack"
                    className="w-full py-3.5 bg-white/5 border border-white/10 hover:border-prayxis-accent/60 text-prayxis-offwhite font-bold font-mono text-xs uppercase tracking-wider rounded text-center transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>OPEN COURSE DASHBOARD →</span>
                  </Link>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      if (!user) return;
                      const waUrl = getWhatsAppEnrollUrl({
                        userId: user.id,
                        userName: user.name,
                        userEmail: user.email,
                        courseTitle: 'Full Stack Web Development',
                        price: 199,
                        offer: 'Special Student Offer',
                      });
                      window.open(waUrl, '_blank');
                    }}
                    className="w-full py-3.5 bg-emerald-500 hover:bg-white text-black font-extrabold font-mono text-xs uppercase tracking-wider rounded text-center transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                  >
                    <MessageCircle className="h-4 w-4 fill-black text-black" />
                    <span>AGAIN REQUEST (7877716367) 📲</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => fetchUserData(true)}
                    disabled={refreshing}
                    className="w-full py-3 bg-yellow-500 text-black font-bold font-mono text-xs uppercase tracking-wider rounded text-center hover:bg-white transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? 'animate-spin' : ''}`} />
                    <span>{refreshing ? 'CHECKING APPROVAL STATUS...' : 'CHECK APPROVAL STATUS'}</span>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Python Basics Course Card */}
          {(() => {
            const pythonEnr = user?.enrollments?.find((e: any) => e.courseSlug === 'python-basics');
            const isPythonEnrolled = (pythonEnr?.status === 'ENROLLED' || user?.role === 'ADMIN') && (user?.isApproved || user?.role === 'ADMIN');
            const isPythonRequested = Boolean(pythonEnr && (pythonEnr.status === 'REQUESTED' || !user?.isApproved));

            return (
              <div
                onClick={() => router.push('/student/courses/python-basics')}
                className="p-6 sm:p-8 bg-prayxis-surface/90 border border-white/10 hover:border-prayxis-accent/40 rounded-2xl backdrop-blur-md grid grid-cols-1 lg:grid-cols-12 gap-6 items-center shadow-xl transition-all cursor-pointer group"
              >
                {/* Course Details */}
                <div className="lg:col-span-8 space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-xs text-prayxis-accent font-bold px-3 py-1 bg-prayxis-accent/10 rounded-full border border-prayxis-accent/30 uppercase">
                      PYTHON SPECIALIZATION // 15-30 DAYS // SPECIAL OFFER: ₹99
                    </span>
                  </div>

                  <div>
                    <h2 className="text-xl sm:text-2xl font-mono font-black text-prayxis-offwhite uppercase tracking-tight group-hover:text-prayxis-accent transition-colors flex items-center gap-2">
                      <span>PYTHON BASICS: ZERO SE MASTERY</span>
                      <ArrowRight className="h-5 w-5 text-prayxis-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h2>
                    <p className="text-xs sm:text-sm text-prayxis-muted font-normal mt-1 leading-relaxed">
                      Zero se advance tak Complete Python Roadmap. Real-time active learning timer compliance ke saath daily hands-on modules.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
                    <div className="p-3 bg-white/5 border border-white/10 rounded">
                      <div className="text-prayxis-muted text-[10px]">PROGRESS</div>
                      <div className="text-prayxis-accent font-bold mt-1">0%</div>
                    </div>

                    <div className="p-3 bg-white/5 border border-white/10 rounded">
                      <div className="text-prayxis-muted text-[10px]">CURRENT MODULE</div>
                      <div className="text-prayxis-offwhite font-bold mt-1">DAY 01</div>
                    </div>

                    <div className="p-3 bg-white/5 border border-white/10 rounded">
                      <div className="text-prayxis-muted text-[10px]">TOTAL LEARNING</div>
                      <div className="text-prayxis-offwhite font-bold mt-1">0H 0M</div>
                    </div>

                    <div className="p-3 bg-white/5 border border-prayxis-accent/60 rounded">
                      <div className="text-prayxis-accent text-[10px]">APPROVAL STATUS</div>
                      <div className="text-prayxis-accent font-bold mt-1">
                        {isPythonEnrolled ? 'UNLOCKED / ACTIVE' : isPythonRequested ? 'PENDING APPROVAL' : 'NOT ENROLLED'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="lg:col-span-4 flex flex-col justify-center space-y-3" onClick={(e) => e.stopPropagation()}>
                  {isPythonEnrolled ? (
                    <>
                      <Link
                        href="/student/courses/python-basics/day/1"
                        className="w-full py-3.5 bg-prayxis-accent text-black font-bold font-mono text-xs uppercase tracking-wider rounded text-center hover:bg-white transition-colors flex items-center justify-center gap-2 cyan-glow cursor-pointer"
                      >
                        <Play className="h-4 w-4 fill-black" />
                        <span>START PYTHON DAY 01 →</span>
                      </Link>

                      <Link
                        href="/student/courses/python-basics"
                        className="w-full py-3.5 bg-white/5 border border-white/10 hover:border-prayxis-accent/60 text-prayxis-offwhite font-bold font-mono text-xs uppercase tracking-wider rounded text-center transition-colors flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>OPEN COURSE DASHBOARD →</span>
                      </Link>
                    </>
                  ) : isPythonRequested ? (
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          if (!user) return;
                          const waUrl = getWhatsAppEnrollUrl({
                            userId: user.id,
                            userName: user.name,
                            userEmail: user.email,
                            courseTitle: 'Python Basics',
                            price: 99,
                            offer: 'Special Student Offer',
                          });
                          window.open(waUrl, '_blank');
                        }}
                        className="w-full py-3.5 bg-emerald-500 hover:bg-white text-black font-extrabold font-mono text-xs uppercase tracking-wider rounded text-center transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                      >
                        <MessageCircle className="h-4 w-4 fill-black text-black" />
                        <span>AGAIN REQUEST (7877716367) 📲</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => fetchUserData(true)}
                        disabled={refreshing}
                        className="w-full py-3 bg-yellow-500 text-black font-bold font-mono text-xs uppercase tracking-wider rounded text-center hover:bg-white transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? 'animate-spin' : ''}`} />
                        <span>{refreshing ? 'CHECKING APPROVAL STATUS...' : 'CHECK APPROVAL STATUS'}</span>
                      </button>
                    </>
                  ) : (
                    <Link
                      href="/student/courses"
                      className="w-full py-3.5 bg-prayxis-accent text-black font-extrabold font-mono text-xs uppercase tracking-wider rounded text-center hover:bg-white transition-all flex items-center justify-center gap-2 cyan-glow cursor-pointer"
                    >
                      <MessageCircle className="h-4 w-4 fill-black text-black" />
                      <span>ENROLL FOR ₹99 →</span>
                    </Link>
                  )}
                </div>
              </div>
            );
          })()}
        </div>

        {/* Floating Toast Notification */}
        {statusToast && (
          <div
            className={`fixed bottom-8 left-1/2 -translate-x-1/2 px-6 py-3.5 rounded-xl border font-mono text-xs font-bold shadow-2xl z-50 flex items-center gap-2.5 backdrop-blur-xl animate-bounce ${
              statusToast.type === 'success'
                ? 'bg-emerald-950/95 border-emerald-500 text-emerald-300'
                : statusToast.type === 'error'
                ? 'bg-red-950/95 border-red-500 text-red-300'
                : 'bg-yellow-950/95 border-yellow-500 text-yellow-300'
            }`}
          >
            <span>{statusToast.message}</span>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
