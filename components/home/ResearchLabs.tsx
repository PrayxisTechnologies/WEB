'use client';

import React from 'react';
import { ArrowUpRight, BookOpen, FileText, FlaskConical, Code } from 'lucide-react';

const PAPERS = [
  {
    id: '01',
    category: 'Security Research',
    icon: ShieldIcon,
    title: 'Post-Quantum Key Exchange Algorithms in High-Latency Networks',
    date: '2026.04',
    readTime: '8 min read',
  },
  {
    id: '02',
    category: 'Engineering Notes',
    icon: FileText,
    title: 'Zero-Downtime Schema Migration Strategies for Distributed Databases',
    date: '2026.03',
    readTime: '12 min read',
  },
  {
    id: '03',
    category: 'Cyber Labs',
    icon: FlaskConical,
    title: 'Real-Time Anomaly Detection via Autonomous Neural Stream Inspection',
    date: '2026.02',
    readTime: '15 min read',
  },
  {
    id: '04',
    category: 'Open Source',
    icon: Code,
    title: 'PRAYXIS-Core: High-Throughput Microservice Framework in Rust',
    date: '2026.01',
    readTime: '5 min read',
  },
];

function ShieldIcon(props: React.SVGProps<SVGSVGElement>) {
  return <BookOpen {...props} />;
}

export const ResearchLabs: React.FC = () => {
  return (
    <section
      id="labs"
      aria-label="Research & Labs Division"
      className="relative w-full py-28 px-6 sm:px-12 lg:px-20 bg-prayxis-bg border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="label-eyebrow text-prayxis-accent mb-3">
              08 // RESEARCH & LABS
            </div>
            <h2 className="heading-section font-extrabold text-prayxis-offwhite uppercase tracking-tight">
              WE DON&apos;T JUST BUILD TECHNOLOGY. <br />
              <span className="text-prayxis-accent">WE STUDY IT.</span>
            </h2>
          </div>

          <p className="body-large text-prayxis-muted font-normal max-w-md">
            Our R&D division publishes security advisories, open-source utilities, and whitepapers on advanced computing systems.
          </p>
        </div>

        {/* Editorial Papers List */}
        <div className="divide-y divide-white/10">
          {PAPERS.map((paper) => {
            const Icon = paper.icon;
            return (
              <article
                key={paper.id}
                className="group py-8 first:pt-0 last:pb-0 grid grid-cols-1 md:grid-cols-12 gap-6 items-center hover:bg-white/[0.02] px-4 transition-colors"
              >
                <div className="md:col-span-3 flex items-center gap-3">
                  <span className="font-mono text-xs text-prayxis-accent bg-prayxis-accent/10 px-2 py-0.5">
                    {paper.id}
                  </span>
                  <span className="font-mono text-xs text-prayxis-subtle tracking-wider uppercase flex items-center gap-1.5">
                    <Icon className="h-3.5 w-3.5 text-prayxis-accent" />
                    {paper.category}
                  </span>
                </div>

                <div className="md:col-span-7">
                  <h3 className="text-lg sm:text-xl font-bold text-prayxis-offwhite group-hover:text-prayxis-accent transition-colors tracking-tight">
                    {paper.title}
                  </h3>
                </div>

                <div className="md:col-span-2 flex items-center justify-between md:justify-end gap-4 font-mono text-xs text-prayxis-muted">
                  <span>{paper.date}</span>
                  <ArrowUpRight className="h-4 w-4 text-prayxis-accent opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
};
