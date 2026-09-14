'use client';

import React from 'react';
import { EXPERIMENTS_DATA } from '@/data/experiments';
import { Sparkles, Microchip, Cpu } from 'lucide-react';

export const ExperimentsSection: React.FC = () => {
  return (
    <section
      id="experiments"
      aria-label="Experimental R&D Prototypes"
      className="relative w-full py-28 px-6 sm:px-12 lg:px-20 bg-prayxis-bg border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-16">
          <div className="label-eyebrow text-prayxis-accent mb-3">
            13 // EXPERIMENTAL R&D PROTOTYPES
          </div>
          <h2 className="heading-section font-extrabold text-prayxis-offwhite uppercase tracking-tight">
            FUTURE <br />
            <span className="text-prayxis-accent">RESEARCH PROTOTYPES.</span>
          </h2>
        </div>

        {/* Experiments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {EXPERIMENTS_DATA.map((exp) => (
            <div
              key={exp.id}
              className="p-6 bg-prayxis-surface/80 border border-white/10 hover:border-prayxis-accent/60 transition-all duration-300 rounded-2xl flex flex-col justify-between space-y-4 cyan-glow-subtle"
            >
              <div>
                <div className="flex items-center justify-between font-mono text-[10px] text-prayxis-accent mb-3">
                  <span>{exp.code} // {exp.category}</span>
                  <span className="px-2 py-0.5 bg-prayxis-accent/10 border border-prayxis-accent/40 font-bold">
                    {exp.status}
                  </span>
                </div>

                <h3 className="font-mono text-base font-bold text-prayxis-offwhite mb-3">
                  {exp.title}
                </h3>

                <p className="body-small text-prayxis-muted leading-relaxed">
                  {exp.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-wrap gap-1.5 font-mono text-[9px] text-prayxis-subtle uppercase">
                {exp.tech.map((t) => (
                  <span key={t} className="px-2 py-0.5 bg-white/5 border border-white/10">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
