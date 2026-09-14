'use client';

import React from 'react';
import Link from 'next/link';

export const CourseOverviewHero: React.FC = () => {
  return (
    <section
      aria-label="Full Stack Course Overview Hero"
      className="relative w-full pt-32 pb-16 px-6 sm:px-12 lg:px-20 bg-prayxis-bg border-b border-white/10 overflow-hidden"
    >
      {/* Background Spatial Environment */}
      <div className="absolute inset-0 bg-tech-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-prayxis-accent/5 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-8 font-mono text-xs text-prayxis-muted flex items-center gap-2 select-none">
          <Link href="/" className="hover:text-prayxis-offwhite transition-colors">PRAYXIS</Link>
          <span>/</span>
          <Link href="/courses" className="text-prayxis-accent font-bold hover:underline transition-colors">ACADEMY</Link>
          <span>/</span>
          <span className="text-prayxis-offwhite">FULL STACK WEB DEVELOPMENT</span>
        </nav>

        {/* Eyebrow Label */}
        <div className="inline-flex items-center gap-2.5 font-mono text-xs tracking-superwide text-prayxis-accent uppercase mb-4">
          <span className="h-1.5 w-1.5 rounded-full bg-prayxis-accent cyan-glow" />
          <span>PRAYXIS / ACADEMY / PROGRAM OVERVIEW</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-[clamp(36px,5.2vw,72px)] font-extrabold text-prayxis-offwhite uppercase tracking-tight leading-[1.03] mb-6 max-w-4xl">
          FULL STACK <br />
          <span className="text-prayxis-accent">WEB DEVELOPMENT.</span>
        </h1>

        {/* Supporting Text */}
        <p className="body-large text-prayxis-muted font-normal max-w-2xl leading-relaxed mb-10">
          Take the journey from your first HTML tag to building complete production-ready full-stack web applications.
        </p>

        {/* Technical Telemetry Metadata Strip */}
        <div className="p-4 bg-prayxis-surface/90 border border-white/10 rounded-xl backdrop-blur-md grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs max-w-3xl">
          <div className="p-3 bg-white/5 border border-white/10 rounded">
            <div className="text-prayxis-subtle text-[10px]">PROGRAM DURATION</div>
            <div className="text-prayxis-offwhite font-bold mt-1 text-sm">45 DAYS</div>
          </div>

          <div className="p-3 bg-white/5 border border-prayxis-accent/60 rounded">
            <div className="text-prayxis-accent text-[10px]">TOTAL LEARNING</div>
            <div className="text-prayxis-offwhite font-bold mt-1 text-sm">120 HOURS</div>
          </div>

          <div className="p-3 bg-white/5 border border-white/10 rounded">
            <div className="text-prayxis-subtle text-[10px]">DIFFICULTY LEVEL</div>
            <div className="text-prayxis-offwhite font-bold mt-1 text-sm">BEGINNER → FULL STACK</div>
          </div>

          <div className="p-3 bg-white/5 border border-prayxis-accent/60 rounded">
            <div className="text-prayxis-accent text-[10px]">PROGRAM STATUS</div>
            <div className="text-prayxis-accent font-bold mt-1 text-sm">IN DEVELOPMENT</div>
          </div>
        </div>

      </div>
    </section>
  );
};
