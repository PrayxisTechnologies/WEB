'use client';

import React, { useState } from 'react';
import { ShieldCheck, Cpu, RefreshCw, ArrowUpRight } from 'lucide-react';

const PRINCIPLES = [
  {
    num: '01',
    title: 'BUILD',
    desc: 'Engineering systems designed around real problems, resilient architecture, and sub-second performance.',
    icon: Cpu,
    svgPath: (
      <svg className="w-full h-24 text-prayxis-accent/30" viewBox="0 0 200 80" fill="none">
        <rect x="20" y="20" width="40" height="40" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
        <rect x="80" y="20" width="40" height="40" stroke="#00F0FF" strokeWidth="1.5" />
        <rect x="140" y="20" width="40" height="40" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="60" y1="40" x2="80" y2="40" stroke="#00F0FF" strokeWidth="1.5" />
        <line x1="120" y1="40" x2="140" y2="40" stroke="#00F0FF" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'SECURE',
    desc: 'Security integrated directly into the architecture from day one, enforcing zero-trust micro-segmentation.',
    icon: ShieldCheck,
    svgPath: (
      <svg className="w-full h-24 text-prayxis-accent/30" viewBox="0 0 200 80" fill="none">
        <polygon points="100,10 140,30 140,60 100,75 60,60 60,30" stroke="#00F0FF" strokeWidth="1.5" />
        <circle cx="100" cy="42" r="12" stroke="currentColor" strokeWidth="1" strokeDasharray="2 4" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'EVOLVE',
    desc: 'Technology designed to adapt, scale across high-concurrency microservices, and continuously improve.',
    icon: RefreshCw,
    svgPath: (
      <svg className="w-full h-24 text-prayxis-accent/30" viewBox="0 0 200 80" fill="none">
        <circle cx="60" cy="40" r="22" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
        <circle cx="140" cy="40" r="22" stroke="#00F0FF" strokeWidth="1.5" />
        <path d="M 82 40 Q 100 20, 118 40" stroke="#00F0FF" strokeWidth="1.5" fill="none" />
      </svg>
    ),
  },
];

export const ManifestoSection: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  return (
    <section
      id="about"
      aria-label="Prayxis Engineering Manifesto"
      className="relative w-full py-28 px-6 sm:px-12 lg:px-20 bg-prayxis-bg border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Statement */}
        <div className="mb-16 space-y-4 max-w-4xl">
          <div className="label-eyebrow text-prayxis-accent">
            01 // MANIFESTO & PHILOSOPHY
          </div>
          <h2 className="heading-section font-extrabold text-prayxis-offwhite uppercase tracking-tight">
            TECHNOLOGY SHOULD DO <br />
            <span className="text-prayxis-accent">MORE THAN WORK.</span>
          </h2>
          <p className="body-large text-prayxis-muted font-normal max-w-xl pt-2 leading-relaxed">
            It should solve meaningful problems, adapt to change and remain secure as the world evolves.
          </p>
        </div>

        {/* 3 Interactive Principle Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRINCIPLES.map((p, idx) => {
            const IconComponent = p.icon;
            const isHovered = activeIdx === idx;

            return (
              <div
                key={p.num}
                onMouseEnter={() => setActiveIdx(idx)}
                onMouseLeave={() => setActiveIdx(null)}
                className={`group relative p-8 bg-prayxis-surface/80 border transition-all duration-300 backdrop-blur-md flex flex-col justify-between overflow-hidden ${
                  isHovered
                    ? 'border-prayxis-accent bg-prayxis-surface cyan-glow-subtle'
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between font-mono text-xs text-prayxis-accent mb-6">
                    <span>{p.num} // PRINCIPLE</span>
                    <IconComponent className={`h-5 w-5 transition-colors ${isHovered ? 'text-prayxis-accent' : 'text-prayxis-muted'}`} />
                  </div>

                  <h3 className="font-mono text-2xl font-extrabold text-prayxis-offwhite uppercase tracking-wider mb-4 group-hover:text-prayxis-accent transition-colors">
                    {p.title}
                  </h3>

                  <p className="body-small text-prayxis-muted leading-relaxed mb-6">
                    {p.desc}
                  </p>
                </div>

                {/* Animated Technical Diagram Layer */}
                <div className="mt-4 pt-4 border-t border-white/10 flex flex-col items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity">
                  {p.svgPath}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
