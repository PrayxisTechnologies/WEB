'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from '@/animations/gsap';
import { Shield, Zap, Server, Lock, ArrowUpRight } from 'lucide-react';

const STATS = [
  {
    icon: Shield,
    value: '99.999%',
    label: 'SYSTEM UPTIME SLA',
    description: 'Autonomous failover with zero-downtime geo-distributed node replication.',
  },
  {
    icon: Zap,
    value: '0.4ms',
    label: 'GLOBAL EDGE LATENCY',
    description: 'Sub-millisecond packet routing via custom high-frequency edge architecture.',
  },
  {
    icon: Server,
    value: '10M+',
    label: 'THREATS NEUTRALIZED',
    description: 'Real-time AI neural threat matrix inspecting 50B+ data points daily.',
  },
  {
    icon: Lock,
    value: '256-bit',
    label: 'QUANTUM-RESISTANT CYCLING',
    description: 'Post-quantum cryptographic key exchange & automated zero-trust authorization.',
  },
];

export const SpecsOverview: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
          },
        }
      );

      if (cardsRef.current) {
        const cards = Array.from(cardsRef.current.children);
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full py-32 px-6 sm:px-12 lg:px-20 bg-prayxis-bg border-t border-white/10"
      aria-label="Prayxis Architecture Specifications"
    >
      {/* Background Subtle Tech Grid */}
      <div className="absolute inset-0 bg-tech-grid opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div ref={titleRef} className="mb-20 max-w-3xl opacity-0">
          <div className="inline-flex items-center gap-2 font-mono text-xs tracking-superwide text-prayxis-accent uppercase mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-prayxis-accent cyan-glow" />
            <span>ENTERPRISE SPECIFICATIONS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-prayxis-offwhite uppercase leading-tight">
            ENGINEERED WITHOUT COMPROMISE.
          </h2>
          <p className="mt-4 text-prayxis-muted text-base sm:text-lg max-w-xl font-normal leading-relaxed">
            We build digital products, software and security solutions that power high-scale global technology organizations.
          </p>
        </div>

        {/* 4-Card Specification Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {STATS.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="group relative bg-prayxis-surface/90 border border-white/10 hover:border-prayxis-accent/60 p-8 transition-all duration-500 hover:-translate-y-1 cyan-glow-subtle flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="p-3 bg-white/5 border border-white/10 text-prayxis-accent group-hover:bg-prayxis-accent/10 transition-colors">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="font-mono text-[10px] tracking-superwide text-prayxis-subtle">
                      0{idx + 1} // SPEC
                    </span>
                  </div>

                  <div className="font-extrabold text-4xl sm:text-5xl text-prayxis-offwhite tracking-tight group-hover:text-prayxis-accent transition-colors mb-2">
                    {stat.value}
                  </div>

                  <div className="font-mono text-xs font-semibold tracking-wider text-prayxis-offwhite uppercase mb-3">
                    {stat.label}
                  </div>

                  <p className="text-xs text-prayxis-muted leading-relaxed">
                    {stat.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between font-mono text-[9px] text-prayxis-subtle">
                  <span>ACTIVE PROTOCOL</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-prayxis-accent opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Brand Manifesto Quote */}
        <div className="mt-28 p-10 md:p-14 bg-prayxis-surface/50 border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 font-mono text-[9px] tracking-superwide text-prayxis-subtle uppercase hidden sm:block">
            PRAYXIS MANIFESTO // 2026
          </div>
          <blockquote className="max-w-4xl font-mono text-lg sm:text-2xl md:text-3xl text-prayxis-offwhite font-medium leading-relaxed uppercase">
            &ldquo;WE DO NOT BUILD TEMPLATES. WE ENGINEER GLOBAL DIGITAL INFRASTRUCTURE.&rdquo;
          </blockquote>
          <div className="mt-6 flex items-center gap-3 font-mono text-xs text-prayxis-accent tracking-superwide uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-prayxis-accent cyan-glow" />
            <span>PRAYXIS EXECUTIVE ENGINEERING TEAM</span>
          </div>
        </div>
      </div>
    </section>
  );
};
