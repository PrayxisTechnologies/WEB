'use client';

import React from 'react';
import { Layout, Smartphone, Globe, ArrowUpRight } from 'lucide-react';

const MOCKUPS = [
  {
    id: '01',
    category: 'ENTERPRISE DASHBOARD PLATFORM',
    title: 'NEXUS CLOUD ENGINE',
    type: 'Browser Mockup',
    icon: Layout,
    desc: 'Real-time telemetry and cloud infrastructure orchestration suite built with Next.js, WebGL and Rust microservices.',
    metrics: ['0.4ms Latency', '10M+ Requests/sec', 'Realtime Canvas'],
  },
  {
    id: '02',
    category: 'MOBILE SECURITY CLIENT',
    title: 'CIPHER PROTOCOL MOBILE',
    type: 'Mobile Interface',
    icon: Smartphone,
    desc: 'End-to-end encrypted mobile communication and hardware security key management app for iOS & Android.',
    metrics: ['Post-Quantum Encryption', 'Biometric Auth', 'Zero-Knowledge'],
  },
  {
    id: '03',
    category: 'GLOBAL API GATEWAY',
    title: 'HYDRA DISTRIBUTED MESH',
    type: 'Infrastructure Panel',
    icon: Globe,
    desc: 'Low-latency API gateway routing traffic across 142 edge locations with automated DDoS mitigation.',
    metrics: ['99.999% SLA', 'Edge Workers', 'WAF Protection'],
  },
];

export const SoftwareShowcase: React.FC = () => {
  return (
    <section
      id="software"
      aria-label="Software Product Showcase"
      className="relative w-full py-28 px-6 sm:px-12 lg:px-20 bg-prayxis-bg border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-16">
          <div className="label-eyebrow text-prayxis-accent mb-3">
            04 // SOFTWARE ENGINEERING
          </div>
          <h2 className="heading-section font-extrabold text-prayxis-offwhite uppercase tracking-tight max-w-2xl">
            SOFTWARE THAT MOVES <br />
            <span className="text-prayxis-accent">IDEAS FORWARD.</span>
          </h2>
        </div>

        {/* Large Visual Mockup Canvases Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {MOCKUPS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="group relative bg-prayxis-surface/90 border border-white/10 hover:border-prayxis-accent/60 transition-all duration-500 overflow-hidden flex flex-col justify-between p-6 sm:p-8 backdrop-blur-md cyan-glow-subtle"
              >
                <div>
                  {/* Top Bar / Mockup Window Chrome Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                    <div className="flex items-center gap-2">
                      <div className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                      <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                      <div className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
                    </div>
                    <span className="font-mono text-[10px] tracking-superwide text-prayxis-subtle uppercase">
                      {item.type}
                    </span>
                  </div>

                  {/* Mockup Canvas Interface Body */}
                  <div className="h-44 w-full bg-black/60 border border-white/10 p-4 rounded-none mb-6 relative flex flex-col justify-between overflow-hidden group-hover:border-prayxis-accent/40 transition-colors">
                    <div className="flex items-center justify-between font-mono text-[10px] text-prayxis-accent">
                      <span className="flex items-center gap-1.5">
                        <Icon className="h-3.5 w-3.5" />
                        {item.category}
                      </span>
                      <span>ACTIVE</span>
                    </div>

                    {/* Abstract UI Lines / Wireframe Representation */}
                    <div className="space-y-2 my-auto">
                      <div className="h-2 bg-prayxis-accent/30 rounded-none w-3/4 animate-pulse-subtle" />
                      <div className="h-2 bg-white/10 rounded-none w-1/2" />
                      <div className="h-2 bg-white/10 rounded-none w-5/6" />
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      {item.metrics.map((m) => (
                        <span
                          key={m}
                          className="font-mono text-[8px] bg-white/5 border border-white/10 px-1.5 py-0.5 text-prayxis-muted"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-extrabold text-xl sm:text-2xl text-prayxis-offwhite group-hover:text-prayxis-accent transition-colors tracking-tight uppercase mb-2">
                    {item.title}
                  </h3>

                  <p className="body-small text-prayxis-muted mb-6">
                    {item.desc}
                  </p>
                </div>

                {/* Footer Action Bar */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between font-mono text-[10px] text-prayxis-subtle group-hover:text-prayxis-accent transition-colors">
                  <span>VIEW ARCHITECTURE</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
