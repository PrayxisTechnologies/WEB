'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from '@/animations/gsap';

interface LoaderProps {
  onComplete: () => void;
}

export const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  const [counterValue, setCounterValue] = useState('00');
  const [isDone, setIsDone] = useState(false);

  // Keep latest onComplete in ref to prevent useEffect re-runs
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    // Check prefers-reduced-motion
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsDone(true);
      onCompleteRef.current();
      return;
    }

    const ctx = gsap.context(() => {
      const countObj = { val: 0 };

      const mainTl = gsap.timeline({
        onComplete: () => {
          // Exit transition: fade counter & line, expand wordmark, clip overlay
          gsap.timeline({
            onComplete: () => {
              setIsDone(true);
              onCompleteRef.current();
            },
          })
            .to([counterRef.current, subtitleRef.current, lineRef.current], {
              opacity: 0,
              y: -10,
              duration: 0.3,
              ease: 'power2.in',
            })
            .to(wordmarkRef.current, {
              scale: 1.08,
              letterSpacing: '0.3em',
              opacity: 0,
              duration: 0.5,
              ease: 'power3.inOut',
            })
            .to(containerRef.current, {
              clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
              duration: 0.7,
              ease: 'expo.inOut',
            });
        },
      });

      mainTl.to(countObj, {
        val: 100,
        duration: 1.5,
        ease: 'power1.inOut',
        onUpdate: () => {
          const current = Math.floor(countObj.val);
          const displayVal =
            current < 25
              ? '00'
              : current < 50
              ? '25'
              : current < 75
              ? '50'
              : current < 100
              ? '75'
              : '100';
          setCounterValue(displayVal);

          if (lineRef.current) {
            lineRef.current.style.width = `${current}%`;
          }
        },
      });
    }, containerRef);

    // Safety fallback timeout to ensure website never remains blocked
    const fallbackTimer = setTimeout(() => {
      setIsDone(true);
      onCompleteRef.current();
    }, 3500);

    return () => {
      ctx.revert();
      clearTimeout(fallbackTimer);
    };
  }, []);

  if (isDone) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-prayxis-bg text-prayxis-offwhite select-none overflow-hidden"
      style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
      aria-label="Loading Prayxis experience"
      role="alert"
      aria-busy="true"
    >
      {/* Background Subtle Tech Grid */}
      <div className="absolute inset-0 bg-tech-grid opacity-20 pointer-events-none" />

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4">
        {/* Brand Wordmark */}
        <div
          ref={wordmarkRef}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-ultra text-prayxis-offwhite mb-6 uppercase"
        >
          PRAYXIS
        </div>

        {/* Status Subtitle */}
        <div
          ref={subtitleRef}
          className="text-[10px] sm:text-xs font-mono tracking-superwide text-prayxis-muted uppercase mb-8 flex items-center gap-2"
        >
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-prayxis-accent animate-pulse-subtle" />
          <span>INITIALIZING EXPERIENCE</span>
        </div>

        {/* Minimal Progress Bar */}
        <div className="w-48 sm:w-64 h-[1px] bg-white/10 relative overflow-hidden mb-6">
          <div
            ref={lineRef}
            className="absolute top-0 left-0 h-full bg-prayxis-accent transition-all duration-75"
            style={{ width: '0%' }}
          />
        </div>

        {/* Numerical Counter */}
        <div
          ref={counterRef}
          className="font-mono text-2xl sm:text-3xl font-bold tracking-widest text-prayxis-accent"
        >
          {counterValue}
          <span className="text-xs text-prayxis-muted ml-0.5">%</span>
        </div>
      </div>

      {/* Footer Technical Coordinates Tag */}
      <div className="absolute bottom-8 left-0 right-0 text-center font-mono text-[9px] tracking-superwide text-prayxis-subtle uppercase">
        SYS.VER // 1.0.0 — ALL SYSTEMS NOMINAL
      </div>
    </div>
  );
};
