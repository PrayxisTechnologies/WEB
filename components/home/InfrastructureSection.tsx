'use client';

import React from 'react';
import { Server, Cloud, Shield, Database, ArrowRight } from 'lucide-react';

const INFRA_NODES = [
  { label: 'USER', sub: 'TLS 1.3 CLIENT' },
  { label: 'EDGE', sub: 'GLOBAL CDN MESH' },
  { label: 'API GATEWAY', sub: 'OAUTH2 / RATE LIMIT' },
  { label: 'APPLICATION', sub: 'MICROSERVICES POOL' },
  { label: 'DATABASE', sub: 'POSTGRES REPLICAS' },
  { label: 'BACKUP', sub: 'ENCRYPTED ARCHIVE' },
];

export const InfrastructureSection: React.FC = () => {
  return (
    <section
      id="infrastructure"
      aria-label="Cloud and Infrastructure Architecture"
      className="relative w-full py-28 px-6 sm:px-12 lg:px-20 bg-prayxis-bg border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-16">
          <div className="label-eyebrow text-prayxis-accent mb-3">
            05 // CLOUD & INFRASTRUCTURE
          </div>
          <h2 className="heading-section font-extrabold text-prayxis-offwhite uppercase tracking-tight">
            ARCHITECTURE <br />
            <span className="text-prayxis-accent">BUILT TO SCALE.</span>
          </h2>
        </div>

        {/* Flow Visualization Box */}
        <div className="p-8 bg-prayxis-surface/90 border border-white/10 rounded-2xl backdrop-blur-md overflow-hidden cyan-glow-subtle">
          
          <div className="font-mono text-xs text-prayxis-muted mb-8 flex items-center justify-between border-b border-white/10 pb-4">
            <span className="text-prayxis-accent font-bold">SYSTEM TOPOLOGY FLOW // END-TO-END DATA PATH</span>
            <span>AUTOMATED DEPLOYMENT & DEVOPS</span>
          </div>

          {/* Flow Nodes Line */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 font-mono text-xs text-center">
            {INFRA_NODES.map((node, i) => (
              <div key={node.label} className="relative">
                <div className="p-4 bg-white/5 border border-white/10 hover:border-prayxis-accent/60 transition-all">
                  <div className="text-prayxis-accent font-bold text-[10px]">0{i + 1} // STEP</div>
                  <div className="text-prayxis-offwhite font-extrabold mt-1">{node.label}</div>
                  <div className="text-prayxis-subtle text-[9px] mt-1">{node.sub}</div>
                </div>

                {i < INFRA_NODES.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 -translate-y-1/2 z-10 text-prayxis-accent font-bold">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 pt-4 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-[10px] text-prayxis-subtle uppercase">
            <div>DEPLOYMENT: CONTAINERIZED</div>
            <div>MONITORING: CONTINUOUS</div>
            <div>AUTOMATION: CI/CD PIPELINES</div>
            <div className="text-prayxis-accent">SECURITY: ZERO TRUST</div>
          </div>

        </div>

      </div>
    </section>
  );
};
