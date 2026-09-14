'use client';

import React from 'react';
import { GraduationCap, ShieldCheck, Code, Terminal, CheckCircle2 } from 'lucide-react';

const ACADEMY_AREAS = [
  'CYBERSECURITY & DEFENSE',
  'WEB DEVELOPMENT',
  'APP DEVELOPMENT',
  'SOFTWARE ENGINEERING',
  'SECURITY RESEARCH LABS',
];

const FUTURE_PROGRAMS = [
  'PRACTICAL WORKSHOPS',
  'HANDS-ON BOOTCAMPS',
  'LIVE TECHNICAL PROJECTS',
  'INTERNSHIP INITIATIVES',
];

export const AcademySection: React.FC = () => {
  return (
    <section
      id="academy"
      aria-label="PRAYXIS Academy Training Division"
      className="relative w-full py-28 px-6 sm:px-12 lg:px-20 bg-prayxis-bg border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-16 space-y-4 max-w-4xl">
          <div className="label-eyebrow text-prayxis-accent">
            14 // CYBER & SOFTWARE TRAINING
          </div>
          <h2 className="heading-section font-extrabold text-prayxis-offwhite uppercase tracking-tight">
            PRAYXIS <br />
            <span className="text-prayxis-accent">ACADEMY.</span>
          </h2>
          <p className="body-large text-prayxis-muted font-normal max-w-xl pt-2">
            Specialized hands-on cyber training, secure coding workshops, and practical software engineering labs designed to empower developers and engineering teams.
          </p>
        </div>

        {/* Academy Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Core Training Focus Areas (6 Cols) */}
          <div className="lg:col-span-6 p-8 bg-prayxis-surface/80 border border-white/10 rounded-2xl space-y-4">
            <div className="font-mono text-xs font-bold text-prayxis-accent uppercase mb-4 flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              <span>CORE TECHNICAL TRAINING AREAS</span>
            </div>

            <div className="space-y-3 font-mono text-xs text-prayxis-offwhite">
              {ACADEMY_AREAS.map((area) => (
                <div key={area} className="p-3.5 bg-white/5 border border-white/10 flex items-center justify-between">
                  <span>{area}</span>
                  <span className="text-prayxis-accent font-bold">✓</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Upcoming Initiatives (6 Cols) */}
          <div className="lg:col-span-6 p-8 bg-prayxis-surface/80 border border-prayxis-accent/40 rounded-2xl flex flex-col justify-between space-y-6 cyan-glow-subtle">
            <div>
              <div className="font-mono text-xs font-bold text-prayxis-accent uppercase mb-4 flex items-center gap-2">
                <Terminal className="h-4 w-4" />
                <span>UPCOMING ACADEMY INITIATIVES</span>
              </div>

              <div className="space-y-3 font-mono text-xs text-prayxis-offwhite">
                {FUTURE_PROGRAMS.map((prog) => (
                  <div key={prog} className="p-3.5 bg-white/5 border border-white/10 flex items-center justify-between">
                    <span>{prog}</span>
                    <span className="text-prayxis-subtle text-[10px]">[ UPCOMING ]</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 font-mono text-[10px] text-prayxis-subtle uppercase">
              STATUS: PROGRAM IN DEVELOPMENT // PRAYXIS ACADEMY
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
