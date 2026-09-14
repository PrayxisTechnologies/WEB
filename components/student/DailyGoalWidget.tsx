'use client';

import React, { useEffect, useState } from 'react';
import { Target, Flame, CheckCircle2, Clock, Zap, Award } from 'lucide-react';

interface DailyGoalWidgetProps {
  courseSlug?: string;
  dayNumber?: number;
  compact?: boolean;
}

export const DailyGoalWidget: React.FC<DailyGoalWidgetProps> = ({
  courseSlug = 'python-basics',
  dayNumber = 1,
  compact = false,
}) => {
  const [loading, setLoading] = useState(true);
  const [todaySeconds, setTodaySeconds] = useState(0);
  const [targetSeconds, setTargetSeconds] = useState(10800); // 3 Hours default
  const [streak, setStreak] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);

  const fetchDailyLog = async () => {
    try {
      const res = await fetch(`/api/student/daily-logs?courseSlug=${courseSlug}&dayNumber=${dayNumber}`);
      if (res.ok) {
        const data = await res.json();
        if (data.todayLog) {
          setTodaySeconds(data.todayLog.activeSeconds || 0);
          setTargetSeconds(data.todayLog.targetSeconds || 10800);
          setIsCompleted(data.todayLog.isTargetMet || false);
        }
        if (data.streak) {
          setStreak(data.streak);
        }
      }
    } catch (err) {
      console.error('Failed to fetch daily goal log:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDailyLog();
    // Poll every 15 seconds to stay in sync with active learning tracker heartbeat
    const interval = setInterval(fetchDailyLog, 15000);
    return () => clearInterval(interval);
  }, [courseSlug, dayNumber]);

  const percentage = Math.min(100, Math.round((todaySeconds / targetSeconds) * 100));
  const hoursSpent = Math.floor(todaySeconds / 3600);
  const minsSpent = Math.floor((todaySeconds % 3600) / 60);
  const targetHours = Math.round(targetSeconds / 3600);

  const remainingSeconds = Math.max(0, targetSeconds - todaySeconds);
  const remainingHours = Math.floor(remainingSeconds / 3600);
  const remainingMins = Math.ceil((remainingSeconds % 3600) / 60);

  if (compact) {
    return (
      <div className="flex items-center gap-3 px-3 py-1.5 bg-prayxis-surface/90 border border-prayxis-accent/30 rounded-lg font-mono text-xs">
        <div className="flex items-center gap-1.5 text-prayxis-accent font-bold">
          <Target className="h-3.5 w-3.5" />
          <span>DAILY TARGET:</span>
        </div>
        <div className="text-prayxis-offwhite font-bold">
          {hoursSpent}h {minsSpent}m / {targetHours}h
        </div>
        <div className="w-20 bg-white/10 rounded-full h-1.5 overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ${
              isCompleted ? 'bg-emerald-400' : 'bg-prayxis-accent'
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className={`text-[10px] font-bold ${isCompleted ? 'text-emerald-400' : 'text-prayxis-muted'}`}>
          {percentage}%
        </span>
        <div className="flex items-center gap-1 text-amber-400 font-bold text-[10px]">
          <Flame className="h-3 w-3 fill-amber-400" />
          <span>{streak}d STREAK</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-5 sm:p-6 bg-prayxis-surface/95 border border-prayxis-accent/40 rounded-2xl backdrop-blur-md font-mono space-y-4 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 bg-prayxis-accent/10 border border-prayxis-accent/50 rounded-xl flex items-center justify-center text-prayxis-accent">
            <Target className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-extrabold text-prayxis-offwhite uppercase tracking-wider">
                DAILY ATTENDANCE & TIME GOAL
              </h3>
              <span className="px-2 py-0.5 bg-prayxis-accent/20 border border-prayxis-accent/40 rounded text-[9px] font-bold text-prayxis-accent">
                {targetHours} HOURS / DAY
              </span>
            </div>
            <p className="text-[11px] text-prayxis-muted">
              Live tracking verified in MongoDB Atlas cloud (`prayxis_db.daily_logs`)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="px-3 py-1 bg-amber-500/10 border border-amber-500/40 rounded-full flex items-center gap-1.5 text-amber-400 font-bold text-xs">
            <Flame className="h-4 w-4 fill-amber-400 animate-bounce" />
            <span>{streak} DAY STREAK</span>
          </div>

          {isCompleted ? (
            <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/40 rounded-full flex items-center gap-1.5 text-emerald-400 font-bold text-xs">
              <CheckCircle2 className="h-4 w-4" />
              <span>TARGET MET! 🎉</span>
            </div>
          ) : (
            <div className="px-3 py-1 bg-yellow-500/10 border border-yellow-500/40 rounded-full flex items-center gap-1.5 text-yellow-400 font-bold text-xs">
              <Clock className="h-4 w-4 animate-spin" />
              <span>IN PROGRESS</span>
            </div>
          )}
        </div>
      </div>

      {/* Progress Bar & Numerical Metrics */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <div className="text-prayxis-muted flex items-center gap-1.5">
            <Zap className="h-3.5 w-3.5 text-prayxis-accent" />
            <span>Time Completed Today:</span>
            <span className="text-prayxis-offwhite font-bold text-sm">
              {hoursSpent}h {minsSpent}m
            </span>
          </div>

          <div className="text-prayxis-muted">
            Target: <span className="text-prayxis-offwhite font-bold">{targetHours}h 00m</span> ({percentage}%)
          </div>
        </div>

        {/* Bar */}
        <div className="w-full bg-white/5 border border-white/10 rounded-full h-3 p-0.5 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ${
              isCompleted
                ? 'bg-gradient-to-r from-emerald-500 to-teal-400 shadow-[0_0_12px_rgba(52,211,153,0.6)]'
                : 'bg-gradient-to-r from-cyan-500 to-prayxis-accent shadow-[0_0_12px_rgba(0,240,255,0.6)]'
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-[11px] text-prayxis-subtle pt-1">
          {isCompleted ? (
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <Award className="h-3.5 w-3.5" /> Congratulations! You completed today's 3-hour learning target!
            </span>
          ) : (
            <span>
              Remaining today: <span className="text-prayxis-offwhite font-bold">{remainingHours > 0 ? `${remainingHours}h ` : ''}{remainingMins}m</span>
            </span>
          )}
          <span className="text-prayxis-accent font-bold">Auto-Syncing ⚡</span>
        </div>
      </div>
    </div>
  );
};
