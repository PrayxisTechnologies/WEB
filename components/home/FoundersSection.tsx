'use client';

import React from 'react';
import { FOUNDERS_DATA } from '@/data/founders';
import { Code, ShieldCheck, Terminal } from 'lucide-react';

export const FoundersSection: React.FC = () => {
  return (
    <section
      id="founders"
      aria-label="Prayxis Founders Leadership"
      className="relative w-full py-28 px-6 sm:px-12 lg:px-20 bg-prayxis-bg border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-16">
          <div className="label-eyebrow text-prayxis-accent mb-3">
            15 // ENGINEERING LEADERSHIP
          </div>
          <h2 className="heading-section font-extrabold text-prayxis-offwhite uppercase tracking-tight">
            BUILT BY <br />
            <span className="text-prayxis-accent">TECHNICAL MINDS.</span>
          </h2>
        </div>

        {/* Founder Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {FOUNDERS_DATA.map((founder) => (
            <div
              key={founder.id}
              className="p-8 sm:p-10 bg-prayxis-surface/80 border border-white/10 hover:border-prayxis-accent/60 transition-all duration-300 rounded-2xl flex flex-col justify-between space-y-6 backdrop-blur-md cyan-glow-subtle"
            >
              <div className="space-y-4">
                <div className="font-mono text-xs text-prayxis-accent font-bold">
                  {founder.role}
                </div>

                <h3 className="font-mono text-2xl font-extrabold text-prayxis-offwhite uppercase">
                  {founder.name}
                </h3>

                <div className="font-mono text-xs text-prayxis-subtle pb-4 border-b border-white/10">
                  {founder.title}
                </div>

                <p className="body-small text-prayxis-muted leading-relaxed">
                  {founder.bio}
                </p>
              </div>

              {/* Focus Pills */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap gap-2 font-mono text-[10px] text-prayxis-subtle uppercase">
                {founder.focus.map((f) => (
                  <span key={f} className="px-3 py-1 bg-white/5 border border-white/10 text-prayxis-offwhite">{f}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
