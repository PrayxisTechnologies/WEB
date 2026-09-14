'use client';

import React from 'react';
import Link from 'next/link';

export const CourseStartCTA: React.FC = () => {
  return (
    <section
      aria-label="Course Gateway Final CTA"
      className="relative w-full py-32 px-6 sm:px-12 lg:px-20 bg-prayxis-bg overflow-hidden"
    >
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 bg-tech-grid opacity-20 pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-prayxis-accent/5 blur-[200px] pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center relative z-10 space-y-8">
        <div className="inline-flex items-center gap-2 font-mono text-xs tracking-superwide text-prayxis-accent uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-prayxis-accent cyan-glow" />
          <span>FULL STACK PROGRAM GATEWAY</span>
        </div>

        <h2 className="text-[clamp(36px,5vw,72px)] font-extrabold text-prayxis-offwhite uppercase tracking-tight leading-none">
          READY TO <span className="text-prayxis-accent">START?</span>
        </h2>

        <p className="font-mono text-base text-prayxis-muted uppercase tracking-widest max-w-xl mx-auto">
          45 DAYS. 120 HOURS. ONE COMPLETE JOURNEY.
        </p>

        <div className="pt-4 flex items-center justify-center gap-4">
          <Link
            href="/student/courses/full-stack/day/1"
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-prayxis-accent text-black font-mono text-xs tracking-wider uppercase font-extrabold rounded cyan-glow hover:bg-white transition-all duration-300 cursor-pointer"
          >
            <span>START DAY 01 LESSON →</span>
          </Link>

          <Link
            href="/student/courses/full-stack"
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-prayxis-surface border border-prayxis-accent/60 text-prayxis-offwhite hover:border-prayxis-accent font-mono text-xs tracking-wider uppercase font-bold rounded transition-all duration-300 cursor-pointer"
          >
            <span>VIEW 45-DAY CURRICULUM →</span>
          </Link>
        </div>

        <div className="pt-8 font-mono text-[10px] text-prayxis-subtle uppercase tracking-widest">
          PRAYXIS ACADEMY // PROGRAM OVERVIEW
        </div>
      </div>
    </section>
  );
};
