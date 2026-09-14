'use client';

import React, { useState } from 'react';
import { Globe, Smartphone, Cloud, Cpu, Shield, Server, Database, Bot } from 'lucide-react';

const NODES = [
  { id: 'web', label: 'Web Systems', icon: Globe, angle: 0, desc: 'React, Next.js, WebGL & Canvas engines' },
  { id: 'mobile', label: 'Mobile Apps', icon: Smartphone, angle: 45, desc: 'iOS, Android & biometric auth hardware' },
  { id: 'cloud', label: 'Cloud Infra', icon: Cloud, angle: 90, desc: 'AWS, GCP, Kubernetes & geo-replication' },
  { id: 'ai', label: 'AI & Neural', icon: Cpu, angle: 135, desc: 'Threat detection models & LLM microservices' },
  { id: 'security', label: 'Zero-Trust', icon: Shield, angle: 180, desc: 'Quantum-resistant cryptosystems & SAST' },
  { id: 'infra', label: 'Edge Mesh', icon: Server, angle: 225, desc: 'Sub-millisecond packet routing & WAF' },
  { id: 'data', label: 'Data Pipelines', icon: Database, angle: 270, desc: 'High-throughput Kafka & Rust event streams' },
  { id: 'automation', label: 'CI/CD DevSecOps', icon: Bot, angle: 315, desc: 'Automated policy enforcement & audit trails' },
];

export const TechEcosystem: React.FC = () => {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  return (
    <section
      aria-label="Prayxis Technology Ecosystem Map"
      className="relative w-full py-28 px-6 sm:px-12 lg:px-20 bg-prayxis-bg border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <div className="label-eyebrow text-prayxis-accent mb-3">
            07 // ECOSYSTEM ARCHITECTURE
          </div>
          <h2 className="heading-section font-extrabold text-prayxis-offwhite uppercase tracking-tight">
            INTEGRATED TECHNOLOGY MAP.
          </h2>
          <p className="body-small text-prayxis-muted mt-3">
            Hover over any ecosystem node to inspect our unified engineering integration matrix.
          </p>
        </div>

        {/* Radial Interactive Ecosystem Canvas */}
        <div className="relative w-full max-w-4xl mx-auto h-[480px] sm:h-[540px] flex items-center justify-center">
          
          {/* Radial Connection Vectors */}
          <svg className="absolute inset-0 w-full h-full text-white/10 pointer-events-none" viewBox="0 0 600 600">
            <circle cx="300" cy="300" r="200" stroke="currentColor" strokeWidth="1" strokeDasharray="4 8" />
            <circle cx="300" cy="300" r="120" stroke="#00F0FF" strokeWidth="1" strokeOpacity="0.3" />
            
            {NODES.map((node) => {
              const rad = (node.angle * Math.PI) / 180;
              const x2 = 300 + 200 * Math.cos(rad);
              const y2 = 300 + 200 * Math.sin(rad);
              const isActive = activeNode === node.id;
              return (
                <line
                  key={node.id}
                  x1="300"
                  y1="300"
                  x2={x2}
                  y2={y2}
                  stroke={isActive ? '#00F0FF' : 'rgba(255, 255, 255, 0.15)'}
                  strokeWidth={isActive ? '2' : '1'}
                  className="transition-colors duration-300"
                />
              );
            })}
          </svg>

          {/* Central PRAYXIS Core Emblem */}
          <div className="relative z-20 w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-prayxis-surface border border-prayxis-accent flex flex-col items-center justify-center cyan-glow text-center">
            <span className="font-extrabold text-lg tracking-ultra text-prayxis-offwhite uppercase">
              PRAYXIS
            </span>
            <span className="font-mono text-[8px] tracking-superwide text-prayxis-accent uppercase mt-1">
              CORE MATRIX
            </span>
          </div>

          {/* Radial Outer Nodes */}
          {NODES.map((node) => {
            const Icon = node.icon;
            const rad = (node.angle * Math.PI) / 180;
            // Radius ~200px
            const x = Math.cos(rad) * 190;
            const y = Math.sin(rad) * 190;
            const isActive = activeNode === node.id;

            return (
              <div
                key={node.id}
                onMouseEnter={() => setActiveNode(node.id)}
                onMouseLeave={() => setActiveNode(null)}
                style={{
                  transform: `translate(${x}px, ${y}px)`,
                }}
                className={`absolute z-30 p-3 sm:p-4 rounded-xl border transition-all duration-300 cursor-pointer backdrop-blur-md flex items-center gap-2.5 ${
                  isActive
                    ? 'bg-prayxis-surface border-prayxis-accent cyan-glow scale-110'
                    : 'bg-prayxis-surface/80 border-white/10 hover:border-white/40'
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? 'text-prayxis-accent' : 'text-prayxis-muted'}`} />
                <span className="font-mono text-xs font-semibold text-prayxis-offwhite whitespace-nowrap">
                  {node.label}
                </span>
              </div>
            );
          })}

        </div>

        {/* Hover Description Bar */}
        <div className="mt-8 text-center h-12 flex items-center justify-center font-mono text-xs text-prayxis-accent">
          {activeNode ? (
            <span className="bg-prayxis-surface border border-prayxis-accent/40 px-4 py-2 cyan-glow-subtle">
              {NODES.find((n) => n.id === activeNode)?.desc}
            </span>
          ) : (
            <span className="text-prayxis-subtle">HOVER OVER A NODE TO INSPECT INTEGRATION DETAILS</span>
          )}
        </div>

      </div>
    </section>
  );
};
