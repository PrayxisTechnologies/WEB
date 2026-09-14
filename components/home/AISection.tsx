'use client';

import React from 'react';
import { Sparkles, Cpu, ArrowRight } from 'lucide-react';

const AI_FLOW = [
  { step: 'INPUT', desc: 'Raw Event & Log Ingestion' },
  { step: 'PROCESS', desc: 'Deterministic Pipeline Analysis' },
  { step: 'DECISION', desc: 'Pattern Classification' },
  { step: 'ACTION', desc: 'Automated System Trigger' },
];

export const AISection: React.FC = () => {
  return (
    <section
      id="ai"
      aria-label="AI and Intelligent Automation"
      className="relative w-full py-28 px-6 sm:px-12 lg:px-20 bg-prayxis-bg border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-16">
          <div className="label-eyebrow text-prayxis-accent mb-3">
            06 // AI & INTELLIGENT AUTOMATION
          </div>
          <h2 className="heading-section font-extrabold text-prayxis-offwhite uppercase tracking-tight">
            INTELLIGENT <br />
            <span className="text-prayxis-accent">AUTOMATION PIPELINES.</span>
          </h2>
        </div>

        {/* Processing Canvas Box */}
        <div className="p-8 bg-prayxis-surface/90 border border-prayxis-accent/40 rounded-2xl backdrop-blur-md overflow-hidden cyan-glow-subtle">
          
          <div className="font-mono text-xs text-prayxis-accent mb-8 flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              <span className="font-bold">NEURAL DATA PROCESSING PIPELINE</span>
            </div>
            <span className="text-prayxis-subtle">SYSTEM INTEGRATION</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 font-mono text-xs">
            {AI_FLOW.map((f, idx) => (
              <div key={f.step} className="p-6 bg-white/5 border border-white/10 hover:border-prayxis-accent/60 transition-all">
                <div className="text-prayxis-accent text-[10px] font-bold mb-1">STAGE 0{idx + 1}</div>
                <div className="text-prayxis-offwhite font-extrabold text-base mb-2">{f.step}</div>
                <div className="text-prayxis-muted text-[11px]">{f.desc}</div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
