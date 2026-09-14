'use client';

import React from 'react';
import { Activity, Clock } from 'lucide-react';
import { ActivityState } from './ActiveLearningTracker';

interface ActiveLearningTimerProps {
  todayActiveSeconds: number;
  activityState: ActivityState;
  targetDailySeconds?: number; // 9600s = 2h 40m
}

export const ActiveLearningTimer: React.FC<ActiveLearningTimerProps> = ({
  todayActiveSeconds,
  activityState,
  targetDailySeconds = 9600,
}) => {
  // Format seconds to HH:MM:SS
  const formatTime = (totalSecs: number) => {
    const hours = Math.floor(totalSecs / 3600);
    const minutes = Math.floor((totalSecs % 3600) / 60);
    const seconds = totalSecs % 60;

    const hh = String(hours).padStart(2, '0');
    const mm = String(minutes).padStart(2, '0');
    const ss = String(seconds).padStart(2, '0');

    return `${hh}:${mm}:${ss}`;
  };

  const formattedCurrent = formatTime(todayActiveSeconds);
  const formattedTarget = formatTime(targetDailySeconds);
  const percentage = Math.min(100, Math.round((todayActiveSeconds / targetDailySeconds) * 100));

  return (
    <div className="p-4 bg-prayxis-surface/90 border border-prayxis-accent/40 rounded-xl backdrop-blur-md font-mono text-xs space-y-3 cyan-glow-subtle select-none">
      {/* Header & Status Indicator */}
      <div className="flex items-center justify-between text-[10px]">
        <div className="flex items-center gap-2 text-prayxis-accent font-bold">
          <Clock className="h-4 w-4" />
          <span>TODAY&apos;S ACTIVE LEARNING TIME</span>
        </div>

        {/* Status Badge */}
        <div
          className={`flex items-center gap-1.5 px-2 py-0.5 rounded font-bold uppercase ${
            activityState === 'ACTIVE'
              ? 'bg-prayxis-accent/10 text-prayxis-accent border border-prayxis-accent/40'
              : activityState === 'IDLE'
              ? 'bg-amber-500/10 text-amber-400 border border-amber-500/40'
              : 'bg-white/5 text-prayxis-muted border border-white/10'
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              activityState === 'ACTIVE'
                ? 'bg-prayxis-accent cyan-glow'
                : activityState === 'IDLE'
                ? 'bg-amber-400'
                : 'bg-prayxis-muted'
            }`}
          />
          <span>{activityState}</span>
        </div>
      </div>

      {/* Timer Value Display */}
      <div className="flex items-baseline justify-between border-t border-b border-white/10 py-2">
        <div className="text-2xl sm:text-3xl font-extrabold text-prayxis-offwhite tracking-tight">
          {formattedCurrent}
        </div>
        <div className="text-prayxis-subtle text-xs">
          / {formattedTarget} (2H 40M)
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1">
        <div className="flex justify-between text-[9px] text-prayxis-subtle uppercase">
          <span>DAILY TARGET PROGRESS</span>
          <span className="text-prayxis-accent font-bold">{percentage}%</span>
        </div>
        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/10">
          <div
            className="h-full bg-prayxis-accent transition-all duration-500 cyan-glow"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};
