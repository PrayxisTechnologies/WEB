'use client';

import React from 'react';
import { Layers, Database, Server, ShieldCheck } from 'lucide-react';

const CAPSTONE_DIRECTIONS = [
  'Internship Management System',
  'Learning Management System (LMS)',
  'Service Booking & Scheduling Platform',
  'Employee & Resource Management System',
  'Helpdesk & Support Ticket Platform',
  'E-Commerce & Inventory Admin System',
];

export const CapstoneSection: React.FC = () => {
  return (
    <section
      id="capstone-highlight"
      aria-label="Day 45 Final Capstone System"
      className="relative w-full py-24 px-6 sm:px-12 lg:px-20 bg-prayxis-bg border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Highlight Panel Container */}
        <div className="p-8 sm:p-12 bg-prayxis-surface/90 border border-prayxis-accent/60 rounded-2xl backdrop-blur-md grid grid-cols-1 lg:grid-cols-12 gap-10 items-center cyan-glow-subtle relative overflow-hidden">
          <div className="absolute inset-0 bg-tech-grid opacity-15 pointer-events-none" />

          {/* Left Column */}
          <div className="lg:col-span-7 space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-prayxis-accent/10 border border-prayxis-accent/40 rounded-full font-mono text-[10px] text-prayxis-accent tracking-wider uppercase">
              <span>DAY 45</span>
              <span>//</span>
              <span>FINAL SYSTEM INTEGRATION</span>
            </div>

            <h2 className="font-mono text-3xl sm:text-4xl font-extrabold text-prayxis-offwhite uppercase tracking-tight leading-tight">
              FINAL CAPSTONE <br />
              <span className="text-prayxis-accent">SYSTEM ARCHITECTURE.</span>
            </h2>

            <p className="body-large text-prayxis-muted font-normal leading-relaxed">
              At the end of the 45-day journey, you will engineer a complete full-stack web application combining React components, Express API servers, database persistence, and secure authentication.
            </p>

            {/* System Architecture Highlights */}
            <div className="grid grid-cols-2 gap-3 font-mono text-xs pt-2">
              <div className="p-3 bg-white/5 border border-white/10 rounded flex items-center gap-2">
                <Layers className="h-4 w-4 text-prayxis-accent shrink-0" />
                <span className="text-prayxis-offwhite">React SPA Frontend</span>
              </div>
              <div className="p-3 bg-white/5 border border-white/10 rounded flex items-center gap-2">
                <Server className="h-4 w-4 text-prayxis-accent shrink-0" />
                <span className="text-prayxis-offwhite">Express REST API</span>
              </div>
              <div className="p-3 bg-white/5 border border-white/10 rounded flex items-center gap-2">
                <Database className="h-4 w-4 text-prayxis-accent shrink-0" />
                <span className="text-prayxis-offwhite">Database Persistence</span>
              </div>
              <div className="p-3 bg-white/5 border border-white/10 rounded flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-prayxis-accent shrink-0" />
                <span className="text-prayxis-offwhite">Session Auth Security</span>
              </div>
            </div>
          </div>

          {/* Right Column: Capstone System Directions List */}
          <div className="lg:col-span-5 p-6 bg-[#050607] border border-white/10 rounded-xl space-y-4 font-mono text-xs relative z-10">
            <div className="flex items-center justify-between text-[10px] text-prayxis-muted border-b border-white/10 pb-3">
              <span className="text-prayxis-accent font-bold">CAPSTONE PROJECT DIRECTIONS</span>
              <span className="text-prayxis-subtle">SELECTABLE</span>
            </div>

            <ul className="space-y-2 text-xs text-prayxis-muted">
              {CAPSTONE_DIRECTIONS.map((dir, idx) => (
                <li key={idx} className="p-2.5 bg-white/5 border border-white/10 rounded flex items-center justify-between text-prayxis-offwhite hover:border-prayxis-accent/40 transition-all">
                  <span>{dir}</span>
                  <span className="text-prayxis-accent font-bold text-[10px]">[ OPTION 0{idx + 1} ]</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
};
