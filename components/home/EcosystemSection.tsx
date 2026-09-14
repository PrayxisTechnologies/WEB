'use client';

import React, { useState } from 'react';

const NODES = [
  'FRONTEND', 'BACKEND', 'MOBILE', 'DATABASE', 'CLOUD', 'SECURITY', 'AI', 'DEVOPS', 'AUTOMATION'
];

export const EcosystemSection: React.FC = () => {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  return (
    <section
      id="ecosystem"
      aria-label="Technology Ecosystem Network"
      className="relative w-full py-28 px-6 sm:px-12 lg:px-20 bg-prayxis-bg border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-16">
          <div className="label-eyebrow text-prayxis-accent mb-3">
            08 // TECHNOLOGY ECOSYSTEM
          </div>
          <h2 className="heading-section font-extrabold text-prayxis-offwhite uppercase tracking-tight">
            INTEGRATED <br />
            <span className="text-prayxis-accent">TECH STACK NETWORK.</span>
          </h2>
        </div>

        {/* Interactive Radial Map */}
        <div className="p-8 sm:p-12 bg-prayxis-surface/90 border border-white/10 rounded-2xl backdrop-blur-md flex flex-col items-center justify-center min-h-[420px] relative cyan-glow-subtle select-none">
          <div className="absolute inset-0 bg-tech-grid opacity-15 pointer-events-none" />

          {/* Central PRAYXIS Emblem */}
          <div className="z-10 px-8 py-5 bg-prayxis-bg border-2 border-prayxis-accent rounded-2xl text-center cyan-glow mb-10">
            <div className="font-extrabold text-xl tracking-superwide text-prayxis-offwhite uppercase">PRAYXIS</div>
            <div className="font-mono text-[9px] text-prayxis-accent uppercase mt-1">NEURAL TECH HUB</div>
          </div>

          {/* Radial Nodes Grid */}
          <div className="z-10 grid grid-cols-2 sm:grid-cols-3 gap-4 font-mono text-xs w-full max-w-3xl">
            {NODES.map((node) => {
              const isHovered = activeNode === node;

              return (
                <div
                  key={node}
                  onMouseEnter={() => setActiveNode(node)}
                  onMouseLeave={() => setActiveNode(null)}
                  className={`p-4 text-center border transition-all duration-300 cursor-pointer rounded-lg ${
                    isHovered
                      ? 'border-prayxis-accent bg-prayxis-surface text-prayxis-accent cyan-glow-subtle font-bold scale-105'
                      : 'border-white/10 bg-white/5 text-prayxis-offwhite hover:border-white/30'
                  }`}
                >
                  <div>{node}</div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
