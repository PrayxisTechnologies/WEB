'use client';

import React from 'react';
import { MagneticButton } from '@/components/ui/MagneticButton';

export const AcademyCTA: React.FC = () => {
  return (
    <section
      aria-label="Prayxis Academy Final CTA"
      className="relative w-full py-32 px-6 sm:px-12 lg:px-20 bg-prayxis-bg overflow-hidden"
    >
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 bg-tech-grid opacity-20 pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-prayxis-accent/5 blur-[200px] pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center relative z-10 space-y-8">
        <div className="inline-flex items-center gap-2 font-mono text-xs tracking-superwide text-prayxis-accent uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-prayxis-accent cyan-glow" />
          <span>START YOUR JOURNEY</span>
        </div>

        <h2 className="text-[clamp(36px,5vw,72px)] font-extrabold text-prayxis-offwhite uppercase tracking-tight leading-none">
          READY TO <span className="text-prayxis-accent">BUILD?</span>
        </h2>

        <p className="body-large text-prayxis-muted max-w-xl mx-auto font-normal leading-relaxed">
          Start with the fundamentals. Finish with a working, secure production digital system.
        </p>

        <div className="pt-4 flex items-center justify-center gap-4">
          <MagneticButton href="#featured-program" variant="primary" showArrow={true}>
            EXPLORE FULL STACK PROGRAM →
          </MagneticButton>
        </div>

        <div className="pt-8 font-mono text-[10px] text-prayxis-subtle uppercase tracking-widest">
          PRAYXIS ACADEMY // KNOWLEDGE & SYSTEM ARCHITECTURE
        </div>
      </div>
    </section>
  );
};
