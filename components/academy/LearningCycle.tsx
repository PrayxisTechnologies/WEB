'use client';

import React from 'react';
import { DAILY_BUILD_STEPS } from '@/data/courses';
import { Clock, CheckCircle2 } from 'lucide-react';

export const LearningCycle: React.FC = () => {
  return (
    <section
      id="learning-cycle"
      aria-label="Daily Build Cycle and Time Structure"
      className="relative w-full py-24 px-6 sm:px-12 lg:px-20 bg-prayxis-bg border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-16 space-y-4 max-w-4xl">
          <div className="label-eyebrow text-prayxis-accent">
            03 // DAILY METHODOLOGY & TIME STRUCTURE
          </div>
          <h2 className="heading-section font-extrabold text-prayxis-offwhite uppercase tracking-tight">
            EVERY DAY IS A <br />
            <span className="text-prayxis-accent">BUILD CYCLE.</span>
          </h2>
          <p className="body-large text-prayxis-muted font-normal max-w-xl pt-2">
            Each day follows a structured 6-step build cycle. Learning is active and practical—not passive video watching.
          </p>
        </div>

        {/* 6 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {DAILY_BUILD_STEPS.map((step) => (
            <div
              key={step.step}
              className="p-6 bg-prayxis-surface/80 border border-white/10 hover:border-prayxis-accent/60 transition-all duration-300 rounded-2xl space-y-3 backdrop-blur-md cyan-glow-subtle"
            >
              <div className="font-mono text-xs text-prayxis-accent font-bold">
                STEP {step.step} // {step.title}
              </div>
              <p className="body-small text-prayxis-muted leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Time Structure Specification Panel */}
        <div className="p-8 bg-prayxis-surface/90 border border-prayxis-accent/40 rounded-2xl backdrop-blur-md grid grid-cols-1 lg:grid-cols-12 gap-8 items-center cyan-glow-subtle">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2 font-mono text-xs text-prayxis-accent uppercase">
              <Clock className="h-4 w-4" />
              <span>ACTIVE LEARNING TIME FORMULA</span>
            </div>
            <h3 className="font-mono text-2xl font-extrabold text-prayxis-offwhite uppercase">
              45 DAYS × 2H 40M = 120 ACTIVE HOURS
            </h3>
            <p className="body-small text-prayxis-muted leading-relaxed">
              Every day requires 2 hours and 40 minutes of active coding, problem-solving, and system building to complete the 120-hour curriculum.
            </p>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-3 font-mono text-xs">
            <div className="p-3 bg-white/5 border border-white/10 rounded">
              <div className="text-prayxis-subtle text-[10px]">DAILY TARGET</div>
              <div className="text-prayxis-offwhite font-bold mt-1">2H 40M / DAY</div>
            </div>
            <div className="p-3 bg-white/5 border border-prayxis-accent/60 rounded">
              <div className="text-prayxis-accent text-[10px]">TOTAL DURATION</div>
              <div className="text-prayxis-accent font-bold mt-1">120 HOURS</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
