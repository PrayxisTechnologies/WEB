'use client';

import React from 'react';
import { Activity, ShieldCheck, Lock, Globe, Cpu, Zap } from 'lucide-react';

export interface TelemetryData {
  latency: string;
  nodes: number;
  uptime: string;
  threatLevel: string;
  securityLayer: string;
  encryption: string;
  zeroTrust: string;
  location: string;
}

export const DEMO_TELEMETRY: TelemetryData = {
  latency: '12.4ms',
  nodes: 142,
  uptime: '99.98%',
  threatLevel: 'LOW',
  securityLayer: 'ACTIVE',
  encryption: 'ENABLED',
  zeroTrust: 'READY',
  location: 'PRAYXIS / INDIA',
};

interface TelemetryProps {
  data?: TelemetryData;
  activeNode?: string | null;
}

export const Telemetry: React.FC<TelemetryProps> = ({ data = DEMO_TELEMETRY, activeNode }) => {
  return (
    <div className="w-full space-y-3 font-mono text-[10px] select-none">
      {/* Primary Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-white/10 text-prayxis-muted">
        <div className="p-2 bg-white/5 border border-white/10 rounded flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Zap className="h-3 w-3 text-prayxis-accent" />
            <span className="text-prayxis-subtle">LATENCY</span>
          </div>
          <span className="text-prayxis-offwhite font-bold">{data.latency}</span>
        </div>

        <div className="p-2 bg-white/5 border border-white/10 rounded flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Cpu className="h-3 w-3 text-prayxis-accent" />
            <span className="text-prayxis-subtle">NODES</span>
          </div>
          <span className="text-prayxis-offwhite font-bold">{data.nodes}</span>
        </div>

        <div className="p-2 bg-white/5 border border-white/10 rounded flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Activity className="h-3 w-3 text-prayxis-accent" />
            <span className="text-prayxis-subtle">UPTIME</span>
          </div>
          <span className="text-prayxis-offwhite font-bold">{data.uptime}</span>
        </div>

        <div className="p-2 bg-white/5 border border-white/10 rounded flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="h-3 w-3 text-prayxis-accent" />
            <span className="text-prayxis-subtle">THREAT</span>
          </div>
          <span className="text-prayxis-accent font-bold">{data.threatLevel}</span>
        </div>
      </div>

      {/* Security Status Line & Location */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-[9px] text-prayxis-subtle tracking-wider uppercase border-t border-white/5">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1 text-prayxis-accent">
            <Lock className="h-3 w-3" />
            <span>SECURITY: {data.securityLayer}</span>
          </div>
          <span>//</span>
          <span>ENCRYPTION: {data.encryption}</span>
          <span>//</span>
          <span>ZERO TRUST: {data.zeroTrust}</span>
        </div>

        <div className="flex items-center gap-1 text-prayxis-muted">
          <Globe className="h-3 w-3 text-prayxis-accent/70" />
          <span>{data.location}</span>
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="pt-2 flex items-center justify-between text-[9px] text-prayxis-subtle border-t border-white/10">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-prayxis-accent cyan-glow" />
          <span className="text-prayxis-offwhite font-semibold">SYSTEM READY</span>
        </div>
        <div>// PRAYXIS CORE</div>
        <div className="hidden sm:block text-prayxis-accent/80">// SECURE CONNECTION</div>
      </div>
    </div>
  );
};
