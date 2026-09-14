'use client';

import React from 'react';
import { UserCheck, Laptop, CheckCircle2 } from 'lucide-react';

const TARGET_GROUPS = [
  'Complete beginners starting their web development journey',
  'Computer science students wanting practical coding experience',
  'Self-taught developers looking to solidify core fundamentals',
  'Engineers wanting to transition into full-stack application development',
];

export const CourseAudience: React.FC = () => {
  return (
    <section
      id="course-audience"
      aria-label="Target Audience and Prerequisites"
      className="relative w-full py-24 px-6 sm:px-12 lg:px-20 bg-prayxis-bg border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-16 space-y-4 max-w-4xl">
          <div className="label-eyebrow text-prayxis-accent">
            05 // TARGET AUDIENCE & PREREQUISITES
          </div>
          <h2 className="heading-section font-extrabold text-prayxis-offwhite uppercase tracking-tight">
            WHO IS <br />
            <span className="text-prayxis-accent">THIS FOR?</span>
          </h2>
          <p className="body-large text-prayxis-muted font-normal max-w-xl pt-2">
            Designed for learners seeking true practical understanding. No prior web development experience is required.
          </p>
        </div>

        {/* 2 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Target Audience List (7 Cols) */}
          <div className="lg:col-span-7 p-8 bg-prayxis-surface/80 border border-white/10 rounded-2xl backdrop-blur-md space-y-6 cyan-glow-subtle">
            <div className="flex items-center gap-2 font-mono text-xs text-prayxis-accent font-bold uppercase">
              <UserCheck className="h-4 w-4" />
              <span>IDEAL PARTICIPANTS</span>
            </div>

            <ul className="space-y-4 font-mono text-xs text-prayxis-muted">
              {TARGET_GROUPS.map((group, idx) => (
                <li key={idx} className="p-4 bg-white/5 border border-white/10 rounded flex items-start gap-3 text-prayxis-offwhite">
                  <CheckCircle2 className="h-4 w-4 text-prayxis-accent shrink-0 mt-0.5" />
                  <span>{group}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Prerequisites Box (5 Cols) */}
          <div className="lg:col-span-5 p-8 bg-[#050607] border border-white/10 rounded-2xl flex flex-col justify-between space-y-6 font-mono text-xs">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-prayxis-accent font-bold uppercase">
                <Laptop className="h-4 w-4" />
                <span>PREREQUISITES</span>
              </div>

              <div className="p-4 bg-prayxis-accent/10 border border-prayxis-accent/40 rounded text-prayxis-accent font-bold text-sm">
                NO PRIOR WEB DEVELOPMENT EXPERIENCE REQUIRED
              </div>

              <p className="text-prayxis-muted leading-relaxed">
                Basic computer usage, internet access, and a text editor are all you need to start Day 01. Every web concept is built step-by-step from first principles.
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 text-[9px] text-prayxis-subtle uppercase">
              ZERO BARRIER ENTRY // STEP-BY-STEP TRAJECTORY
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
