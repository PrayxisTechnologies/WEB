'use client';

import React from 'react';
import { PROJECTS_DATA } from '@/data/projects';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { Shield, Code2, Smartphone, Terminal } from 'lucide-react';

export const FeaturedWorkSection: React.FC = () => {
  return (
    <section
      id="work"
      aria-label="Featured Projects Showcase"
      className="relative w-full py-28 px-6 sm:px-12 lg:px-20 bg-prayxis-bg border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-16 space-y-4 max-w-4xl">
          <div className="label-eyebrow text-prayxis-accent">
            07 // FEATURED PROJECTS & PLATFORMS
          </div>
          <h2 className="heading-section font-extrabold text-prayxis-offwhite uppercase tracking-tight">
            SELECTED <br />
            <span className="text-prayxis-accent">ENGINEERING SHOWCASE.</span>
          </h2>
          <p className="body-large text-prayxis-muted font-normal max-w-xl pt-2">
            Self-built technology platforms and cybersecurity research environments engineered to test high-throughput software performance.
          </p>
        </div>

        {/* Editorial Alternating Project Cards */}
        <div className="space-y-12">
          {PROJECTS_DATA.map((proj, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <div
                key={proj.id}
                className="group p-8 sm:p-10 bg-prayxis-surface/80 border border-white/10 hover:border-prayxis-accent/60 transition-all duration-300 rounded-2xl backdrop-blur-md grid grid-cols-1 lg:grid-cols-12 gap-8 items-center cyan-glow-subtle"
              >
                {/* Content Side */}
                <div className={`lg:col-span-6 space-y-4 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="flex items-center gap-3 font-mono text-xs text-prayxis-accent">
                    <span>{proj.number}</span>
                    <span>//</span>
                    <span>{proj.category}</span>
                  </div>

                  <h3 className="font-mono text-2xl sm:text-3xl font-extrabold text-prayxis-offwhite uppercase group-hover:text-prayxis-accent transition-colors">
                    {proj.title}
                  </h3>

                  <p className="body-small text-prayxis-muted leading-relaxed">
                    {proj.description}
                  </p>

                  {/* Stack Badges */}
                  <div className="pt-2 flex flex-wrap gap-2 font-mono text-[10px] text-prayxis-subtle uppercase">
                    {proj.stack.frontend && <span className="px-2.5 py-1 bg-white/5 border border-white/10">{proj.stack.frontend}</span>}
                    {proj.stack.backend && <span className="px-2.5 py-1 bg-white/5 border border-white/10">{proj.stack.backend}</span>}
                    {proj.stack.security && <span className="px-2.5 py-1 bg-white/5 border border-prayxis-accent/40 text-prayxis-accent">{proj.stack.security}</span>}
                  </div>
                </div>

                {/* Visual Telemetry Card Side */}
                <div className={`lg:col-span-6 p-6 bg-black/50 border border-white/10 rounded-xl space-y-4 font-mono text-xs ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="flex items-center justify-between text-[10px] text-prayxis-muted border-b border-white/10 pb-3">
                    <span className="text-prayxis-accent font-bold">{proj.status}</span>
                    <span>SELF-BUILT PROJECT</span>
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-center">
                    {proj.metrics?.map((m) => (
                      <div key={m.label} className="p-3 bg-white/5 border border-white/10">
                        <div className="text-prayxis-subtle text-[9px]">{m.label}</div>
                        <div className="text-prayxis-offwhite font-bold mt-1 text-[11px]">{m.value}</div>
                      </div>
                    ))}
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
