'use client';

import React from 'react';
import { Code, Terminal, Github } from 'lucide-react';

const OPEN_SOURCE_TOOLS = [
  { name: 'PRAYXIS CLI Security Scanner', lang: 'TypeScript / Node', status: 'COMING SOON', desc: 'Command-line tool for scanning local package dependency AST trees for CVE vulnerability disclosures.' },
  { name: 'React Security Hooks Library', lang: 'TypeScript / React', status: 'COMING SOON', desc: 'Utility hooks for enforcing client-side XSS input sanitization and secure local storage encryption.' },
];

export const OpenSourceSection: React.FC = () => {
  return (
    <section
      id="opensource"
      aria-label="Open Source Developer Tools"
      className="relative w-full py-28 px-6 sm:px-12 lg:px-20 bg-prayxis-bg border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-16">
          <div className="label-eyebrow text-prayxis-accent mb-3">
            12 // OPEN SOURCE DEVELOPER UTILITIES
          </div>
          <h2 className="heading-section font-extrabold text-prayxis-offwhite uppercase tracking-tight">
            DEVELOPER <br />
            <span className="text-prayxis-accent">TOOLS & UTILITIES.</span>
          </h2>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {OPEN_SOURCE_TOOLS.map((t) => (
            <div
              key={t.name}
              className="p-8 bg-prayxis-surface/80 border border-white/10 hover:border-prayxis-accent/60 transition-all duration-300 rounded-2xl flex flex-col justify-between space-y-4 cyan-glow-subtle"
            >
              <div>
                <div className="flex items-center justify-between font-mono text-xs text-prayxis-accent mb-4">
                  <span className="font-bold">{t.name}</span>
                  <span className="px-2.5 py-0.5 bg-prayxis-accent/10 border border-prayxis-accent/40 text-[10px]">
                    {t.status}
                  </span>
                </div>

                <p className="body-small text-prayxis-muted leading-relaxed mb-4">
                  {t.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between font-mono text-[10px] text-prayxis-subtle uppercase">
                <span>LANGUAGE: {t.lang}</span>
                <span className="text-prayxis-accent">OPEN SOURCE REPO</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
