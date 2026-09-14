'use client';

import React from 'react';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { ShieldCheck, Terminal, Cpu, Lock, Network, CheckCircle2 } from 'lucide-react';

const CYBER_SERVICES = [
  { title: 'Security Research', desc: 'Vulnerability assessment & zero-day exploitation research.' },
  { title: 'Security Testing', desc: 'Penetration testing & automated SAST/DAST continuous analysis.' },
  { title: 'Cyber Labs', desc: 'Isolated sandbox environment testing for untrusted binaries.' },
  { title: 'Security Engineering', desc: 'Zero-trust architecture, identity, and cryptographic protocols.' },
];

export const CyberShowcase: React.FC = () => {
  return (
    <section
      id="services"
      aria-label="Cybersecurity Architecture Showcase"
      className="relative w-full py-28 px-6 sm:px-12 lg:px-20 bg-prayxis-bg border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="label-eyebrow text-prayxis-accent mb-3">
              03 // CYBERSECURITY
            </div>
            <h2 className="heading-section font-extrabold text-prayxis-offwhite uppercase tracking-tight">
              SECURITY, <br />
              <span className="text-prayxis-accent">BUILT IN.</span>
            </h2>
          </div>

          <p className="body-large text-prayxis-muted font-normal max-w-md">
            We engineer defense-grade security protocols into software applications from day one, not as a reactionary patch.
          </p>
        </div>

        {/* Main Panel & Services Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Large Visual Cyber Console Panel (7 Cols) */}
          <div className="lg:col-span-7 relative bg-prayxis-surface/90 border border-white/10 p-6 sm:p-8 flex flex-col justify-between backdrop-blur-md overflow-hidden cyan-glow-subtle">
            
            {/* Top Bar Terminal Details */}
            <div className="flex items-center justify-between font-mono text-[10px] text-prayxis-muted pb-4 border-b border-white/10">
              <div className="flex items-center gap-2 text-prayxis-accent">
                <Terminal className="h-3.5 w-3.5" />
                <span>PRAYXIS_CYBER_LABS // CONSOLE</span>
              </div>
              <span>PORT: 443 // TLS 1.3</span>
            </div>

            {/* Middle Visual Mesh Console */}
            <div className="my-8 space-y-4 font-mono text-xs text-prayxis-muted">
              <div className="p-4 bg-black/50 border border-white/10 rounded-none">
                <div className="text-prayxis-accent mb-1 flex items-center gap-2">
                  <Lock className="h-3.5 w-3.5" />
                  <span>INITIALIZING ZERO-TRUST MESH PROTOCOL...</span>
                </div>
                <div className="text-prayxis-subtle text-[11px]">
                  [0.001s] RSA-4096 / ECC-256 KEYPAIR GENERATED <br />
                  [0.003s] POLICY_ENGINE // VERIFICATION: 100% NOMINAL <br />
                  [0.006s] THREAT_MATRIX // 0 ANOMALIES DETECTED
                </div>
              </div>

              {/* Topology Signals Graphic */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 bg-white/5 border border-white/10 flex items-center gap-2">
                  <Network className="h-4 w-4 text-prayxis-accent" />
                  <div className="text-[10px]">
                    <div className="text-prayxis-offwhite font-bold">NODE TOPOLOGY</div>
                    <div className="text-prayxis-subtle">142 ACTIVE</div>
                  </div>
                </div>

                <div className="p-3 bg-white/5 border border-white/10 flex items-center gap-2">
                  <Cpu className="h-4 w-4 text-prayxis-accent" />
                  <div className="text-[10px]">
                    <div className="text-prayxis-offwhite font-bold">NEURAL SCAN</div>
                    <div className="text-prayxis-subtle">CONTINUOUS</div>
                  </div>
                </div>

                <div className="p-3 bg-white/5 border border-white/10 flex items-center gap-2 col-span-2 sm:col-span-1">
                  <ShieldCheck className="h-4 w-4 text-prayxis-accent" />
                  <div className="text-[10px]">
                    <div className="text-prayxis-offwhite font-bold">ENCRYPTION</div>
                    <div className="text-prayxis-subtle">AES-256-GCM</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Status */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between font-mono text-[10px]">
              <span className="text-prayxis-accent flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5" />
                DEFENSE INFRASTRUCTURE ONLINE
              </span>
              <span className="text-prayxis-subtle">PRAYXIS SECURITY LABS</span>
            </div>

          </div>

          {/* Right: 4 Security Sub-Services List (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            {CYBER_SERVICES.map((svc) => (
              <div
                key={svc.title}
                className="group p-6 bg-prayxis-surface/50 border border-white/10 hover:border-prayxis-accent/60 transition-all duration-300"
              >
                <div className="font-mono text-sm font-bold text-prayxis-offwhite group-hover:text-prayxis-accent transition-colors uppercase mb-1">
                  {svc.title}
                </div>
                <p className="body-small text-prayxis-muted">
                  {svc.desc}
                </p>
              </div>
            ))}

            <div className="pt-2">
              <MagneticButton href="#contact" variant="primary" showArrow={true} className="w-full text-center py-3">
                EXPLORE CYBER →
              </MagneticButton>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
