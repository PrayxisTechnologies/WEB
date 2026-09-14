'use client';

import React from 'react';

const STEPS = [
  { num: '01', title: 'DISCOVER', desc: 'System requirements & security threat surface analysis.' },
  { num: '02', title: 'DEFINE', desc: 'Architectural specifications & technical scope definition.' },
  { num: '03', title: 'DESIGN', desc: 'Sub-second UI/UX & microservices topology design.' },
  { num: '04', title: 'BUILD', desc: 'Full-stack software engineering & database implementation.' },
  { num: '05', title: 'SECURE', desc: 'Zero-trust integration, SAST/DAST testing & encryption.' },
  { num: '06', title: 'TEST', desc: 'High-concurrency load testing & vulnerability auditing.' },
  { num: '07', title: 'DEPLOY', desc: 'Containerized CI/CD automated cloud deployment.' },
  { num: '08', title: 'EVOLVE', desc: 'Continuous monitoring, optimization & performance evolution.' },
];

export const HowWeWorkSection: React.FC = () => {
  return (
    <section
      id="process"
      aria-label="How We Work Process Methodology"
      className="relative w-full py-28 px-6 sm:px-12 lg:px-20 bg-prayxis-bg border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-16">
          <div className="label-eyebrow text-prayxis-accent mb-3">
            09 // METHODOLOGY & PROCESS
          </div>
          <h2 className="heading-section font-extrabold text-prayxis-offwhite uppercase tracking-tight">
            HOW WE <br />
            <span className="text-prayxis-accent">ENGINEER SYSTEMS.</span>
          </h2>
        </div>

        {/* 8 Step Process Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {STEPS.map((s) => (
            <div
              key={s.num}
              className="p-6 bg-prayxis-surface/60 border border-white/10 hover:border-prayxis-accent/60 transition-all duration-300 flex flex-col justify-between space-y-4"
            >
              <div className="font-mono text-xs text-prayxis-accent font-bold">
                {s.num} // STEP
              </div>

              <div>
                <h3 className="font-mono text-lg font-bold text-prayxis-offwhite uppercase mb-2">
                  {s.title}
                </h3>
                <p className="body-small text-prayxis-muted">
                  {s.desc}
                </p>
              </div>

              <div className="pt-2 border-t border-white/10 font-mono text-[9px] text-prayxis-subtle uppercase">
                STATUS: VERIFIED
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
