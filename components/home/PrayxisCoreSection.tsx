'use client';

import React, { useState } from 'react';
import { Cpu, ShieldCheck, Server, Sparkles, Microchip } from 'lucide-react';

interface CorePillar {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  items: string[];
}

const CORE_PILLARS: CorePillar[] = [
  {
    id: 'software',
    name: 'SOFTWARE',
    icon: Cpu,
    items: ['Web Applications', 'Mobile Suite', 'Backend Microservices', 'High-Throughput APIs'],
  },
  {
    id: 'security',
    name: 'SECURITY',
    icon: ShieldCheck,
    items: ['Web Security', 'API Security Audits', 'Cloud Security Engineering', 'Security Research'],
  },
  {
    id: 'cloud',
    name: 'CLOUD',
    icon: Server,
    items: ['Infrastructure as Code', 'Automated CI/CD', 'DevOps Orchestration', 'Edge Mesh'],
  },
  {
    id: 'ai',
    name: 'AI & AUTOMATION',
    icon: Sparkles,
    items: ['Intelligent Automation', 'Data Processing Pipelines', 'Neural Workflows', 'System Integration'],
  },
  {
    id: 'research',
    name: 'RESEARCH',
    icon: Microchip,
    items: ['Cyber Labs & CTFs', 'Experimental Prototypes', 'Open Source Tools', 'Technical Whitepapers'],
  },
];

export const PrayxisCoreSection: React.FC = () => {
  const [activePillarId, setActivePillarId] = useState<string>('software');

  const activePillar = CORE_PILLARS.find((p) => p.id === activePillarId) || CORE_PILLARS[0];

  return (
    <section
      id="core"
      aria-label="PRAYXIS Interactive Core Architecture"
      className="relative w-full py-28 px-6 sm:px-12 lg:px-20 bg-prayxis-bg border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-16">
          <div className="label-eyebrow text-prayxis-accent mb-3">
            02 // PRAYXIS ECOSYSTEM ARCHITECTURE
          </div>
          <h2 className="heading-section font-extrabold text-prayxis-offwhite uppercase tracking-tight">
            INTERACTIVE <br />
            <span className="text-prayxis-accent">PRAYXIS CORE.</span>
          </h2>
        </div>

        {/* 12-Column Interactive Core Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Pillar Selectors (5 Cols) */}
          <div className="lg:col-span-5 space-y-3">
            {CORE_PILLARS.map((pillar) => {
              const IconComp = pillar.icon;
              const isSelected = activePillarId === pillar.id;

              return (
                <button
                  key={pillar.id}
                  type="button"
                  onMouseEnter={() => setActivePillarId(pillar.id)}
                  onClick={() => setActivePillarId(pillar.id)}
                  className={`w-full text-left p-5 border transition-all duration-300 flex items-center justify-between font-mono text-sm tracking-wider uppercase ${
                    isSelected
                      ? 'border-prayxis-accent bg-prayxis-surface text-prayxis-accent cyan-glow-subtle'
                      : 'border-white/10 bg-prayxis-surface/40 text-prayxis-offwhite hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <IconComp className={`h-4 w-4 ${isSelected ? 'text-prayxis-accent' : 'text-prayxis-muted'}`} />
                    <span className="font-bold">{pillar.name}</span>
                  </div>

                  <span className="text-[10px] text-prayxis-subtle">
                    {isSelected ? '[ ACTIVE ]' : '[ SELECT ]'}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right: Central Architecture Visual Display (7 Cols) */}
          <div className="lg:col-span-7 p-8 bg-prayxis-surface/90 border border-prayxis-accent/40 rounded-2xl backdrop-blur-md min-h-[380px] flex flex-col justify-between relative overflow-hidden cyan-glow-subtle">
            <div className="absolute inset-0 bg-tech-grid opacity-15 pointer-events-none" />

            {/* Top Bar */}
            <div className="relative z-10 flex items-center justify-between font-mono text-[10px] text-prayxis-muted border-b border-white/10 pb-4">
              <span className="text-prayxis-accent font-bold uppercase">SELECTED ARCHITECTURE // {activePillar.name}</span>
              <span className="text-prayxis-subtle">STATUS: NOMINAL</span>
            </div>

            {/* Content Display */}
            <div className="relative z-10 my-auto py-6">
              <h3 className="font-mono text-xl font-bold text-prayxis-offwhite uppercase mb-6 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-prayxis-accent cyan-glow" />
                <span>{activePillar.name} CAPABILITIES</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activePillar.items.map((item) => (
                  <div
                    key={item}
                    className="p-4 bg-white/5 border border-white/10 hover:border-prayxis-accent/60 transition-all font-mono text-xs text-prayxis-offwhite flex items-center justify-between"
                  >
                    <span>{item}</span>
                    <span className="text-prayxis-accent font-bold">→</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between font-mono text-[9px] text-prayxis-subtle uppercase">
              <span>INTEGRATED INFRASTRUCTURE</span>
              <span className="text-prayxis-accent">PRAYXIS CORE CONNECTED</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
