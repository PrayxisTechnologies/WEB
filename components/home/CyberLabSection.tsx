'use client';

import React, { useState } from 'react';
import { CYBER_LABS_DATA } from '@/data/labs';
import { ShieldAlert, Terminal, Lock, Code2 } from 'lucide-react';

const FILTERS = ['ALL', 'WEB', 'API', 'AUTH', 'CLOUD', 'MOBILE'];

export const CyberLabSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('ALL');

  const filteredLabs = activeFilter === 'ALL'
    ? CYBER_LABS_DATA
    : CYBER_LABS_DATA.filter((l) => l.category === activeFilter);

  return (
    <section
      id="labs"
      aria-label="PRAYXIS Cyber Labs and CTFs"
      className="relative w-full py-28 px-6 sm:px-12 lg:px-20 bg-prayxis-bg border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-16 space-y-4 max-w-4xl">
          <div className="label-eyebrow text-prayxis-accent">
            10 // CYBER RESEARCH LABS & CTFS
          </div>
          <h2 className="heading-section font-extrabold text-prayxis-offwhite uppercase tracking-tight">
            WE BREAK <br />
            <span className="text-prayxis-accent">WHAT WE BUILD.</span>
          </h2>
          <p className="body-large text-prayxis-muted font-normal max-w-xl pt-2">
            Self-created security labs, writeups, capture-the-flag challenges, and proof-of-concept tools base-tested in isolated educational environments.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-12 select-none">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 font-mono text-xs tracking-wider uppercase transition-all border ${
                activeFilter === f
                  ? 'border-prayxis-accent bg-prayxis-surface text-prayxis-accent cyan-glow-subtle font-bold'
                  : 'border-white/10 bg-prayxis-surface/40 text-prayxis-muted hover:border-white/20'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Cyber Lab Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLabs.map((lab) => (
            <div
              key={lab.id}
              className="group p-6 bg-prayxis-surface/80 border border-white/10 hover:border-prayxis-accent/60 transition-all duration-300 rounded-2xl flex flex-col justify-between space-y-4 cyan-glow-subtle"
            >
              <div>
                <div className="flex items-center justify-between font-mono text-[10px] text-prayxis-accent mb-3">
                  <span>{lab.code} // {lab.category}</span>
                  <span className="px-2 py-0.5 bg-prayxis-accent/10 border border-prayxis-accent/40 text-prayxis-accent font-bold">
                    {lab.difficulty}
                  </span>
                </div>

                <h3 className="font-mono text-base font-bold text-prayxis-offwhite group-hover:text-prayxis-accent transition-colors leading-snug mb-3">
                  {lab.title}
                </h3>

                <p className="body-small text-prayxis-muted leading-relaxed">
                  {lab.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between font-mono text-[9px] text-prayxis-subtle uppercase">
                <span>{lab.environment}</span>
                <span className="text-prayxis-accent">{lab.status}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
