'use client';

import React from 'react';
import { CURRICULUM_PHASES } from '@/data/courses';

export const CurriculumPreview: React.FC = () => {
  return (
    <section
      id="curriculum-preview"
      aria-label="Full Stack 45-Day Curriculum Roadmap Preview"
      className="relative w-full py-24 px-6 sm:px-12 lg:px-20 bg-prayxis-bg border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-16 space-y-4 max-w-4xl">
          <div className="label-eyebrow text-prayxis-accent">
            03 // 45-DAY PROGRAM ROADMAP PREVIEW
          </div>
          <h2 className="heading-section font-extrabold text-prayxis-offwhite uppercase tracking-tight">
            CURRICULUM <br />
            <span className="text-prayxis-accent">PHASE STRUCTURE.</span>
          </h2>
          <p className="body-large text-prayxis-muted font-normal max-w-xl pt-2">
            A structured 9-phase trajectory designed to take learners from core web fundamentals to complete full-stack system deployment.
          </p>
        </div>

        {/* 9 Phase Roadmap Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CURRICULUM_PHASES.map((phase) => (
            <div
              key={phase.phaseNum}
              className="p-6 bg-prayxis-surface/80 border border-white/10 hover:border-prayxis-accent/60 transition-all duration-300 rounded-2xl flex flex-col justify-between space-y-4 backdrop-blur-md cyan-glow-subtle"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between font-mono text-[10px] text-prayxis-accent">
                  <span>PHASE {phase.phaseNum}</span>
                  <span className="px-2 py-0.5 bg-prayxis-accent/10 border border-prayxis-accent/40 text-prayxis-accent font-bold">
                    {phase.dayRange}
                  </span>
                </div>

                <h3 className="font-mono text-base font-extrabold text-prayxis-offwhite uppercase">
                  {phase.title}
                </h3>

                <ul className="space-y-1.5 font-mono text-xs text-prayxis-muted pt-2 border-t border-white/10">
                  {phase.topics.map((topic, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="h-1 w-1 rounded-full bg-prayxis-accent shrink-0" />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between font-mono text-[9px] text-prayxis-subtle uppercase">
                <span>ESTIMATED DURATION</span>
                <span className="text-prayxis-accent font-bold">{phase.daysCount}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
