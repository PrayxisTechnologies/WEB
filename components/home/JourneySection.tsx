'use client';

import React from 'react';

const MILESTONES = [
  { year: '2026', title: 'PRAYXIS FOUNDATION', desc: 'Established as a focused software engineering, cybersecurity research, and digital products technology studio.' },
];

export const JourneySection: React.FC = () => {
  return (
    <section
      id="journey"
      aria-label="PRAYXIS Foundation Timeline Journey"
      className="relative w-full py-28 px-6 sm:px-12 lg:px-20 bg-prayxis-bg border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-16">
          <div className="label-eyebrow text-prayxis-accent mb-3">
            16 // CHRONOLOGY & MILESTONES
          </div>
          <h2 className="heading-section font-extrabold text-prayxis-offwhite uppercase tracking-tight">
            PRAYXIS <br />
            <span className="text-prayxis-accent">TIMELINE.</span>
          </h2>
        </div>

        {/* Timeline Items */}
        <div className="space-y-6">
          {MILESTONES.map((m) => (
            <div
              key={m.year}
              className="p-8 bg-prayxis-surface/80 border border-prayxis-accent/40 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 backdrop-blur-md cyan-glow-subtle"
            >
              <div className="flex items-center gap-6">
                <div className="font-mono text-3xl sm:text-4xl font-extrabold text-prayxis-accent">
                  {m.year}
                </div>
                <div>
                  <h3 className="font-mono text-xl font-bold text-prayxis-offwhite uppercase mb-1">
                    {m.title}
                  </h3>
                  <p className="body-small text-prayxis-muted">
                    {m.desc}
                  </p>
                </div>
              </div>

              <div className="font-mono text-[10px] text-prayxis-subtle uppercase">
                MILESTONE VERIFIED
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
