'use client';

import React from 'react';
import { Activity, Terminal } from 'lucide-react';

export const AcademyHero: React.FC = () => {
  return (
    <section
      aria-label="Prayxis Academy Hero"
      className="relative w-full pt-32 pb-16 px-6 sm:px-12 lg:px-20 bg-prayxis-bg border-b border-white/10 overflow-hidden"
    >
      {/* Ambient Tech Grid Background */}
      <div className="absolute inset-0 bg-tech-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-prayxis-accent/5 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Eyebrow Label */}
        <div className="inline-flex items-center gap-2.5 font-mono text-xs tracking-superwide text-prayxis-accent uppercase mb-4">
          <span className="h-1.5 w-1.5 rounded-full bg-prayxis-accent cyan-glow" />
          <span>PRAYXIS / ACADEMY & KNOWLEDGE SYSTEM</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-[clamp(40px,5vw,76px)] font-extrabold text-prayxis-offwhite uppercase tracking-tight leading-[1.03] mb-6 max-w-4xl">
          BUILD WHAT <br />
          <span className="text-prayxis-accent">COMES NEXT.</span>
        </h1>

        {/* Supporting Text */}
        <p className="body-large text-prayxis-muted font-normal max-w-2xl leading-relaxed mb-10">
          Practical technology education built around understanding, coding, building and shipping real systems. No generic tutorials—only production engineering principles.
        </p>

        {/* System Telemetry Metadata Strip */}
        <div className="p-4 bg-prayxis-surface/90 border border-white/10 rounded-xl backdrop-blur-md grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs max-w-3xl">
          <div className="p-3 bg-white/5 border border-white/10 rounded">
            <div className="text-prayxis-subtle text-[10px]">PROGRAMS</div>
            <div className="text-prayxis-offwhite font-bold mt-1 text-sm">03 TOTAL</div>
          </div>

          <div className="p-3 bg-white/5 border border-prayxis-accent/60 rounded">
            <div className="text-prayxis-accent text-[10px]">ACTIVE CURRICULUM</div>
            <div className="text-prayxis-offwhite font-bold mt-1 text-sm">FULL STACK</div>
          </div>

          <div className="p-3 bg-white/5 border border-white/10 rounded">
            <div className="text-prayxis-subtle text-[10px]">LEARNING MODE</div>
            <div className="text-prayxis-offwhite font-bold mt-1 text-sm">PRACTICAL</div>
          </div>

          <div className="p-3 bg-white/5 border border-prayxis-accent/60 rounded">
            <div className="text-prayxis-accent text-[10px]">STATUS</div>
            <div className="text-prayxis-accent font-bold mt-1 text-sm">IN DEVELOPMENT</div>
          </div>
        </div>

      </div>
    </section>
  );
};
