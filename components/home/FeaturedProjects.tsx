'use client';

import React from 'react';
import { ArrowUpRight, Terminal, Shield, Smartphone } from 'lucide-react';

const PROJECTS = [
  {
    num: '01',
    title: 'QUANTUM SECURITY LAB',
    category: 'Cybersecurity / Research / Web',
    layout: 'left-image',
    icon: Shield,
    desc: 'Autonomous threat detection suite engineered for zero-trust cloud enterprise security with post-quantum key management.',
    tags: ['Cybersecurity', 'Web Architecture', 'Rust'],
  },
  {
    num: '02',
    title: 'ENTERPRISE SAAS PLATFORM',
    category: 'Cloud / High-Scale / Microservices',
    layout: 'right-image',
    icon: Terminal,
    desc: 'Real-time collaborative analytics platform processing 10B+ events daily with sub-millisecond query performance.',
    tags: ['Next.js', 'Go', 'Kubernetes'],
  },
  {
    num: '03',
    title: 'SECURE MOBILE SUITE',
    category: 'iOS / Android / Hardware Auth',
    layout: 'full-width',
    icon: Smartphone,
    desc: 'Hardware-backed biometric vault and end-to-end encrypted messaging application for confidential enterprise communications.',
    tags: ['Mobile Security', 'React Native', 'C++ Cryptography'],
  },
];

export const FeaturedProjects: React.FC = () => {
  return (
    <section
      id="work"
      aria-label="Featured Engineering Projects"
      className="relative w-full py-28 px-6 sm:px-12 lg:px-20 bg-prayxis-bg border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-20">
          <div className="label-eyebrow text-prayxis-accent mb-3">
            06 // FEATURED WORK
          </div>
          <h2 className="heading-section font-extrabold text-prayxis-offwhite uppercase tracking-tight">
            SELECTED PROJECTS.
          </h2>
        </div>

        {/* Alternating Editorial Projects Stream */}
        <div className="space-y-24">
          {PROJECTS.map((proj) => {
            const Icon = proj.icon;
            if (proj.layout === 'full-width') {
              return (
                <div
                  key={proj.num}
                  className="group relative bg-prayxis-surface/90 border border-white/10 hover:border-prayxis-accent/60 p-8 sm:p-12 transition-all duration-500 cyan-glow-subtle"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-white/10 mb-8">
                    <div>
                      <span className="font-mono text-xs text-prayxis-accent tracking-widest uppercase bg-prayxis-accent/10 px-2 py-0.5 mb-2 inline-block">
                        PROJECT {proj.num}
                      </span>
                      <h3 className="heading-sub font-extrabold text-prayxis-offwhite group-hover:text-prayxis-accent transition-colors tracking-tight uppercase">
                        {proj.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2">
                      {proj.tags.map((t) => (
                        <span key={t} className="font-mono text-[10px] bg-white/5 border border-white/10 px-2.5 py-1 text-prayxis-muted">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Full-Width Visual Canvas */}
                  <div className="h-64 sm:h-80 w-full bg-black/60 border border-white/10 p-6 flex flex-col justify-between mb-8 relative overflow-hidden group-hover:border-prayxis-accent/40 transition-colors">
                    <div className="flex items-center justify-between font-mono text-xs text-prayxis-accent">
                      <span className="flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        {proj.category}
                      </span>
                      <span>FULL CANVAS MOCKUP</span>
                    </div>

                    <div className="space-y-3 my-auto">
                      <div className="h-3 bg-prayxis-accent/20 rounded-none w-2/3 animate-pulse-subtle" />
                      <div className="h-3 bg-white/10 rounded-none w-1/2" />
                      <div className="h-3 bg-white/10 rounded-none w-4/5" />
                    </div>

                    <div className="font-mono text-[10px] text-prayxis-subtle">
                      SYSTEM INTEGRITY: 100% // PRODUCTION DEPLOYED
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="body-small text-prayxis-muted max-w-2xl font-normal">
                      {proj.desc}
                    </p>
                    <div className="font-mono text-xs text-prayxis-accent flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      <span>CASE STUDY</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={proj.num}
                className="group grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-prayxis-surface/50 border border-white/10 hover:border-prayxis-accent/60 p-8 sm:p-12 transition-all duration-500"
              >
                {/* Left or Right Image/Canvas */}
                <div
                  className={`lg:col-span-6 h-72 w-full bg-black/60 border border-white/10 p-6 flex flex-col justify-between relative overflow-hidden group-hover:border-prayxis-accent/40 transition-colors ${
                    proj.layout === 'right-image' ? 'lg:order-2' : ''
                  }`}
                >
                  <div className="flex items-center justify-between font-mono text-xs text-prayxis-accent">
                    <span className="flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      {proj.category}
                    </span>
                    <span>0{proj.num}</span>
                  </div>

                  <div className="space-y-3 my-auto">
                    <div className="h-3 bg-prayxis-accent/20 rounded-none w-3/4 animate-pulse-subtle" />
                    <div className="h-3 bg-white/10 rounded-none w-1/2" />
                  </div>

                  <div className="font-mono text-[10px] text-prayxis-subtle">
                    ACTIVE ARCHITECTURE // VERIFIED
                  </div>
                </div>

                {/* Details Content */}
                <div className={`lg:col-span-6 ${proj.layout === 'right-image' ? 'lg:order-1' : ''}`}>
                  <span className="font-mono text-xs text-prayxis-accent tracking-widest uppercase bg-prayxis-accent/10 px-2 py-0.5 mb-3 inline-block">
                    PROJECT {proj.num}
                  </span>

                  <h3 className="heading-sub font-extrabold text-prayxis-offwhite group-hover:text-prayxis-accent transition-colors tracking-tight uppercase mb-4">
                    {proj.title}
                  </h3>

                  <p className="body-small text-prayxis-muted font-normal leading-relaxed mb-6">
                    {proj.desc}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {proj.tags.map((t) => (
                      <span key={t} className="font-mono text-[10px] bg-white/5 border border-white/10 px-2.5 py-1 text-prayxis-muted">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="font-mono text-xs text-prayxis-accent flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>EXPLORE PROJECT</span>
                    <ArrowUpRight className="h-4 w-4" />
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
