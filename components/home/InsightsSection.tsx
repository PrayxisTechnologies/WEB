'use client';

import React from 'react';
import { RESEARCH_DATA } from '@/data/research';
import { BookOpen, ArrowUpRight } from 'lucide-react';

export const InsightsSection: React.FC = () => {
  return (
    <section
      id="insights"
      aria-label="PRAYXIS Research and Insights Feed"
      className="relative w-full py-28 px-6 sm:px-12 lg:px-20 bg-prayxis-bg border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-16 space-y-4 max-w-4xl">
          <div className="label-eyebrow text-prayxis-accent">
            11 // RESEARCH & WHITEPAPERS
          </div>
          <h2 className="heading-section font-extrabold text-prayxis-offwhite uppercase tracking-tight">
            TECHNICAL <br />
            <span className="text-prayxis-accent">INSIGHTS & PAPERS.</span>
          </h2>
          <p className="body-large text-prayxis-muted font-normal max-w-xl pt-2">
            Data-driven research whitepapers covering cybersecurity architecture, microservices engineering, and AI automation boundaries.
          </p>
        </div>

        {/* Research Feed List */}
        <div className="space-y-6">
          {RESEARCH_DATA.map((res) => (
            <div
              key={res.id}
              className="group p-6 sm:p-8 bg-prayxis-surface/60 border border-white/10 hover:border-prayxis-accent/60 transition-all duration-300 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 backdrop-blur-md cyan-glow-subtle"
            >
              <div className="space-y-2 max-w-3xl">
                <div className="flex items-center gap-3 font-mono text-xs text-prayxis-accent">
                  <span>{res.category}</span>
                  <span>//</span>
                  <span>{res.readTime}</span>
                  <span>//</span>
                  <span className="text-prayxis-subtle">{res.date}</span>
                </div>

                <h3 className="font-mono text-lg sm:text-xl font-bold text-prayxis-offwhite group-hover:text-prayxis-accent transition-colors leading-snug">
                  {res.title}
                </h3>

                <p className="body-small text-prayxis-muted">
                  {res.summary}
                </p>
              </div>

              <div className="flex items-center gap-3 font-mono text-xs font-bold text-prayxis-accent uppercase whitespace-nowrap">
                <span>AUTHOR: {res.author}</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
