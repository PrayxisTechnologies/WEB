'use client';

import React from 'react';

const CAPABILITIES = [
  'SOFTWARE ENGINEERING',
  'WEB & APP DEVELOPMENT',
  'CYBERSECURITY',
  'CLOUD & INFRASTRUCTURE',
  'AI & AUTOMATION',
  'SECURITY RESEARCH',
];

// Duplicate items 3 times for a seamless, 100% continuous infinite loop
const MARQUEE_ITEMS = [...CAPABILITIES, ...CAPABILITIES, ...CAPABILITIES];

export const CapabilityStrip: React.FC = () => {
  return (
    <div
      aria-label="Core Technical Capabilities Ticker"
      className="w-full bg-prayxis-bg border-y border-white/10 py-3.5 overflow-hidden select-none relative"
    >
      {/* Infinite Right-to-Left Ticker Container */}
      <div className="flex items-center gap-12 min-w-max animate-marquee font-mono text-[11px] tracking-superwide text-prayxis-muted uppercase">
        {MARQUEE_ITEMS.map((cap, index) => (
          <React.Fragment key={`${cap}-${index}`}>
            <div className="flex items-center gap-2.5 text-prayxis-offwhite/90 hover:text-prayxis-accent transition-colors whitespace-nowrap">
              <span className="h-1.5 w-1.5 rounded-full bg-prayxis-accent cyan-glow" />
              <span>{cap}</span>
            </div>
            <span className="text-prayxis-subtle opacity-40">//</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
