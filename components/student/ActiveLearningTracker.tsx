'use client';

import React, { useEffect, useState, useRef } from 'react';

export type ActivityState = 'ACTIVE' | 'IDLE' | 'PAUSED' | 'OFFLINE';

interface ActiveLearningTrackerProps {
  courseSlug?: string;
  dayNumber?: number;
  initialTodaySeconds?: number;
  onTimeUpdate?: (stats: { todaySeconds: number; courseSeconds: number }) => void;
  onStateChange?: (state: ActivityState) => void;
}

const IDLE_TIMEOUT_MS = 2 * 60 * 1000; // 2 Minutes idle threshold
const HEARTBEAT_INTERVAL_MS = 30 * 1000; // 30 Seconds heartbeat ping

export const ActiveLearningTracker: React.FC<ActiveLearningTrackerProps> = ({
  courseSlug = 'full-stack',
  dayNumber = 1,
  initialTodaySeconds = 0,
  onTimeUpdate,
  onStateChange,
}) => {
  const [activityState, setActivityState] = useState<ActivityState>('ACTIVE');
  const [todaySeconds, setTodaySeconds] = useState(initialTodaySeconds);

  const lastActivityRef = useRef<number>(Date.now());
  const stateRef = useRef<ActivityState>('ACTIVE');

  // Update activity state ref synchronously
  const updateState = (newState: ActivityState) => {
    stateRef.current = newState;
    setActivityState(newState);
    if (onStateChange) onStateChange(newState);
  };

  // Activity & Window Focus Event Handler (Strict Site-Live Watch Time Rule)
  useEffect(() => {
    const handleUserActivity = () => {
      lastActivityRef.current = Date.now();
      const isLiveOnSite = !document.hidden && document.hasFocus();
      if ((stateRef.current === 'IDLE' || stateRef.current === 'PAUSED') && isLiveOnSite) {
        updateState('ACTIVE');
      }
    };

    const handleFocusChange = () => {
      const isLiveOnSite = !document.hidden && document.hasFocus();
      if (!isLiveOnSite) {
        updateState('PAUSED');
      } else {
        lastActivityRef.current = Date.now();
        updateState('ACTIVE');
      }
    };

    window.addEventListener('mousemove', handleUserActivity, { passive: true });
    window.addEventListener('keydown', handleUserActivity, { passive: true });
    window.addEventListener('scroll', handleUserActivity, { passive: true });
    window.addEventListener('click', handleUserActivity, { passive: true });
    window.addEventListener('pointerdown', handleUserActivity, { passive: true });
    document.addEventListener('visibilitychange', handleFocusChange);
    window.addEventListener('blur', handleFocusChange);
    window.addEventListener('focus', handleFocusChange);

    return () => {
      window.removeEventListener('mousemove', handleUserActivity);
      window.removeEventListener('keydown', handleUserActivity);
      window.removeEventListener('scroll', handleUserActivity);
      window.removeEventListener('click', handleUserActivity);
      window.removeEventListener('pointerdown', handleUserActivity);
      document.removeEventListener('visibilitychange', handleFocusChange);
      window.removeEventListener('blur', handleFocusChange);
      window.removeEventListener('focus', handleFocusChange);
    };
  }, []);

  // Idle Check & Heartbeat Interval Loop
  useEffect(() => {
    const idleCheckTimer = setInterval(() => {
      const timeSinceLastActivity = Date.now() - lastActivityRef.current;
      if (timeSinceLastActivity >= IDLE_TIMEOUT_MS && stateRef.current === 'ACTIVE') {
        updateState('IDLE');
      }
    }, 5000);

    const heartbeatTimer = setInterval(async () => {
      // Watch time ONLY increments if tab is visible AND window is actively focused
      const isLiveOnSite = !document.hidden && document.hasFocus();
      const isActive = stateRef.current === 'ACTIVE' && isLiveOnSite;

      try {
        const res = await fetch('/api/time-tracking/heartbeat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            courseSlug,
            dayNumber,
            incrementSeconds: isActive ? 30 : 0,
            isActive,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          if (data.stats) {
            setTodaySeconds(data.stats.todayActiveSeconds);
            if (onTimeUpdate) {
              onTimeUpdate({
                todaySeconds: data.stats.todayActiveSeconds,
                courseSeconds: data.stats.totalCourseSeconds,
              });
            }
          }
        }
      } catch (err) {
        // Silent catch for offline or network issues
      }
    }, HEARTBEAT_INTERVAL_MS);

    return () => {
      clearInterval(idleCheckTimer);
      clearInterval(heartbeatTimer);
    };
  }, [courseSlug, dayNumber, onTimeUpdate]);

  return null; // Headless component
};
