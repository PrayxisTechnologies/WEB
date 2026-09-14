'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from '@/animations/gsap';
import { ArrowUpRight, Code2, ShieldAlert, Lightbulb } from 'lucide-react';

const PILLARS = [
  {
    num: '01',
    title: 'BUILD.',
    category: 'SOFTWARE & ENGINEERING',
    icon: Code2,
    tagline: 'WE BUILD MISSION-CRITICAL DIGITAL PRODUCTS FOR GLOBAL TECH BRANDS.',
    details: [
      'Distributed Enterprise Cloud Architecture',
      'High-Throughput Reactive APIs & Microservices',
      'Modern Web Applications & Native Mobile Systems',
    ],
  },
  {
    num: '02',
    title: 'SECURE.',
    category: 'CYBERSECURITY & RESILIENCE',
    icon: ShieldAlert,
    tagline: 'WE PROTECT DIGITAL ASSETS WITH ZERO-TRUST QUANTUM-PROOF ARCHITECTURE.',
    details: [
      'Autonomous Neural Threat Intelligence',
      'Penetration Testing & Red Teaming Infrastructure',
      'Immutable Cryptographic Ledger & Audit Trails',
    ],
  },
  {
    num: '03',
    title: 'INNOVATE.',
    category: 'R&D & ADVANCED LABS',
    icon: Lightbulb,
    tagline: 'WE RESEARCH NEXT-GEN ALGORITHMS AND DISRUPTIVE EMERGENCE.',
    details: [
      'Artificial Intelligence & Deep Learning Models',
      'Quantum-Resistant Key Exchange Research',
      'High-Performance Realtime WebGL & Canvas Engines',
    ],
  },
];

export const PillarsStream: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const pillarItems = gsap.utils.toArray<HTMLElement>('.pillar-item');

      pillarItems.forEach((pillar) => {
        gsap.fromTo(
          pillar,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: pillar,
              start: 'top 80%',
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full py-32 px-6 sm:px-12 lg:px-20 bg-prayxis-bg border-t border-white/10"
      aria-label="Prayxis Core Engineering Pillars"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 bg-tech-grid opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-20">
          <div className="inline-flex items-center gap-2 font-mono text-xs tracking-superwide text-prayxis-accent uppercase mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-prayxis-accent cyan-glow" />
            <span>CORE CAPABILITIES STREAM</span>
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-prayxis-offwhite uppercase leading-none">
            ENGINEERING PILLARS
          </h2>
        </div>

        {/* Sequential Pillars List */}
        <div className="flex flex-col divide-y divide-white/10">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="pillar-item group py-16 transition-colors hover:bg-white/[0.02] px-4 md:px-8"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Column: Number & Big Title */}
                  <div className="lg:col-span-5 flex flex-col justify-between h-full">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="font-mono text-xs text-prayxis-accent tracking-widest bg-prayxis-accent/10 px-2 py-1">
                        {pillar.num} // PILLAR
                      </span>
                      <span className="font-mono text-xs text-prayxis-subtle tracking-superwide uppercase">
                        {pillar.category}
                      </span>
                    </div>

                    <h3 className="text-5xl sm:text-7xl md:text-8xl font-extrabold text-prayxis-offwhite group-hover:text-prayxis-accent transition-colors tracking-tighter uppercase leading-none">
                      {pillar.title}
                    </h3>
                  </div>

                  {/* Right Column: Tagline & Details */}
                  <div className="lg:col-span-7 flex flex-col justify-between h-full pt-2">
                    <p className="font-mono text-base sm:text-xl text-prayxis-offwhite font-medium uppercase leading-relaxed mb-6">
                      {pillar.tagline}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-white/10 pt-6">
                      {pillar.details.map((detail) => (
                        <div key={detail} className="font-mono text-xs text-prayxis-muted leading-normal flex items-start gap-2">
                          <span className="text-prayxis-accent mt-1">▸</span>
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
