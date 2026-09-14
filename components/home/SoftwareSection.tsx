'use client';

import React from 'react';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { Layout, Smartphone, Server, Database, Cloud, Code } from 'lucide-react';

const TECH_METADATA = [
  { label: 'FRONTEND', value: 'REACT / NEXT.JS' },
  { label: 'BACKEND', value: 'NODE / PYTHON / FASTAPI' },
  { label: 'DATABASE', value: 'POSTGRESQL / REDIS' },
  { label: 'INFRASTRUCTURE', value: 'DOCKER / CLOUD MESH' },
];

export const SoftwareSection: React.FC = () => {
  return (
    <section
      id="software"
      aria-label="Software Engineering Showcase"
      className="relative w-full py-28 px-6 sm:px-12 lg:px-20 bg-prayxis-bg border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-16 space-y-4 max-w-4xl">
          <div className="label-eyebrow text-prayxis-accent">
            03 // SOFTWARE ENGINEERING
          </div>
          <h2 className="heading-section font-extrabold text-prayxis-offwhite uppercase tracking-tight">
            SOFTWARE <br />
            ENGINEERED <br />
            <span className="text-prayxis-accent">WITH INTENT.</span>
          </h2>
          <p className="body-large text-prayxis-muted font-normal max-w-xl pt-2">
            We build enterprise web platforms, high-concurrency microservices, and mobile application ecosystems designed around real-world performance.
          </p>
        </div>

        {/* Large Browser & Dashboard Mockup Visual Canvas */}
        <div className="mb-16 p-6 sm:p-8 bg-prayxis-surface/90 border border-white/10 rounded-2xl backdrop-blur-md overflow-hidden cyan-glow-subtle">
          
          {/* Top Browser Bar */}
          <div className="flex items-center justify-between font-mono text-[10px] text-prayxis-muted pb-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-white/10" />
              <span className="h-3 w-3 rounded-full bg-white/10" />
              <span className="h-3 w-3 rounded-full bg-white/10" />
              <span className="ml-2 text-prayxis-subtle">https://platform.prayxis.com/dashboard</span>
            </div>
            <span className="text-prayxis-accent">ENV: PRODUCTION // HIGH THROUGHPUT</span>
          </div>

          {/* Interface Mockup Layout Preview */}
          <div className="my-8 space-y-6">
            
            {/* Telemetry Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full font-mono text-xs">
              <div className="p-4 bg-white/5 border border-white/10 rounded min-w-0">
                <div className="text-prayxis-subtle text-[10px] truncate">AVG LATENCY</div>
                <div className="text-prayxis-accent font-extrabold text-lg mt-1 truncate">11.4ms</div>
              </div>

              <div className="p-4 bg-white/5 border border-white/10 rounded min-w-0">
                <div className="text-prayxis-subtle text-[10px] truncate">REQUESTS/SEC</div>
                <div className="text-prayxis-offwhite font-extrabold text-lg mt-1 truncate">14,280</div>
              </div>

              <div className="p-4 bg-white/5 border border-white/10 rounded min-w-0">
                <div className="text-prayxis-subtle text-[10px] truncate">DB POOL</div>
                <div className="text-prayxis-offwhite font-extrabold text-lg mt-1 truncate">99.4%</div>
              </div>

              <div className="p-4 bg-white/5 border border-white/10 rounded min-w-0">
                <div className="text-prayxis-subtle text-[10px] truncate">CACHE HIT</div>
                <div className="text-prayxis-accent font-extrabold text-lg mt-1 truncate">98.2%</div>
              </div>
            </div>

            {/* Graphical Canvas Wireframe */}
            <div className="p-6 bg-black/50 border border-white/10 rounded h-48 flex flex-col justify-between w-full">
              <div className="font-mono text-xs text-prayxis-muted flex justify-between items-center">
                <span>THROUGHPUT GRAPH // CONTINUOUS MONITORING</span>
                <span className="text-prayxis-accent font-bold">[ LIVE VIEW ]</span>
              </div>

              <div className="w-full h-24 flex items-end gap-1.5 pt-4">
                {[40, 65, 45, 80, 95, 60, 75, 90, 85, 100, 70, 85, 95, 110, 90, 100].map((height, i) => (
                  <div
                    key={i}
                    style={{ height: `${height}%` }}
                    className="flex-1 bg-prayxis-accent/30 hover:bg-prayxis-accent transition-all duration-300 rounded-t-sm"
                  />
                ))}
              </div>
            </div>

          </div>

          {/* Technical Metadata Row */}
          <div className="pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-[10px]">
            {TECH_METADATA.map((meta) => (
              <div key={meta.label}>
                <div className="text-prayxis-subtle">{meta.label}</div>
                <div className="text-prayxis-offwhite font-bold mt-0.5">{meta.value}</div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
