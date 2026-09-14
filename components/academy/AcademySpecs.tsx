'use client';

import React from 'react';

const SPECS = [
  { label: 'DURATION', value: '45 DAYS' },
  { label: 'TOTAL LEARNING', value: '120 HOURS' },
  { label: 'DAILY ACTIVE LEARNING', value: '2H 40M' },
  { label: 'LEVEL', value: 'BEGINNER → FULL STACK' },
  { label: 'FORMAT', value: 'PRACTICAL / PROJECT BASED' },
  { label: 'STACK', value: 'HTML / CSS / JS / REACT / NODE / EXPRESS / DATABASE' },
];

export const AcademySpecs: React.FC = () => {
  return (
    <section
      aria-label="Prayxis Program Technical Specifications"
      className="relative w-full py-20 px-6 sm:px-12 lg:px-20 bg-prayxis-bg border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-10 flex items-center justify-between font-mono text-xs text-prayxis-accent uppercase tracking-wider">
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-prayxis-accent cyan-glow" />
            <span>04 // PROGRAM SPECIFICATIONS & REQUIREMENTS</span>
          </span>
          <span className="text-prayxis-subtle">[ VERIFIED STRUCTURE ]</span>
        </div>

        {/* Technical Specs Matrix */}
        <div className="p-8 bg-prayxis-surface/90 border border-white/10 rounded-2xl backdrop-blur-md grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-mono text-xs cyan-glow-subtle">
          {SPECS.map((spec) => (
            <div key={spec.label} className="p-4 bg-white/5 border border-white/10 rounded space-y-1">
              <div className="text-prayxis-subtle text-[10px] uppercase">{spec.label}</div>
              <div className="text-prayxis-offwhite font-bold text-sm leading-snug">{spec.value}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
