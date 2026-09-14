'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from '@/animations/gsap';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { Shield, Terminal } from 'lucide-react';

export const FinalCTA: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const meshRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.to(meshRef.current, {
        rotate: 360,
        duration: 40,
        repeat: -1,
        ease: 'none',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={containerRef}
      aria-label="Start A Project CTA"
      className="relative w-full py-32 px-6 sm:px-12 lg:px-20 bg-prayxis-bg overflow-hidden border-b border-white/10"
    >
      {/* Background Moving Ambient Vector Mesh */}
      <div className="absolute inset-0 bg-tech-grid opacity-20 pointer-events-none" />
      <div
        ref={meshRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-prayxis-accent/5 blur-[160px] pointer-events-none"
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 label-eyebrow text-prayxis-accent mb-4">
          <span className="h-1.5 w-1.5 rounded-full bg-prayxis-accent cyan-glow" />
          <span>INITIATE PARTNERSHIP</span>
        </div>

        {/* Refined Heading */}
        <h2 className="heading-section font-extrabold text-prayxis-offwhite uppercase tracking-tight mb-6">
          HAVE SOMETHING <br />
          <span className="text-prayxis-accent">WORTH BUILDING?</span>
        </h2>

        {/* Supporting Copy */}
        <p className="body-large text-prayxis-muted font-normal max-w-xl mx-auto mb-10 leading-relaxed">
          Let’s turn the idea into a system that works, scales and stays secure.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <MagneticButton href="mailto:info@prayxis.in" variant="primary" showArrow={true} className="py-3.5 px-8 text-sm">
            START A PROJECT →
          </MagneticButton>
          <MagneticButton href="#work" variant="secondary" showArrow={false} className="py-3.5 px-8 text-sm">
            EXPLORE OUR WORK →
          </MagneticButton>
        </div>

        {/* Technical Guarantee Badge */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-8 font-mono text-[10px] text-prayxis-subtle uppercase">
          <div className="flex items-center gap-1.5 text-prayxis-accent">
            <Shield className="h-3.5 w-3.5" />
            <span>CONFIDENTIAL ADVISORY</span>
          </div>
          <span>//</span>
          <div className="flex items-center gap-1.5">
            <Terminal className="h-3.5 w-3.5 text-prayxis-accent" />
            <span>24H ENGINEERING RESPONSE</span>
          </div>
          <span>//</span>
          <span>PRAYXIS / INDIA</span>
        </div>

      </div>
    </section>
  );
};
