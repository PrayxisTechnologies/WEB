'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from '@/animations/gsap';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { NeuralCore } from '@/components/hero/NeuralCore';
import { CapabilityStrip } from '@/components/hero/CapabilityStrip';
import { ArrowDown, Activity } from 'lucide-react';

interface HeroProps {
  isLoaded: boolean;
}

export const Hero: React.FC<HeroProps> = ({ isLoaded }) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textColRef = useRef<HTMLDivElement>(null);
  const visualColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoaded) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        textColRef.current,
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 1 }
      ).fromTo(
        visualColRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 1.2 },
        '-=0.7'
      );
    }, heroRef);

    return () => ctx.revert();
  }, [isLoaded]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[92vh] w-full flex flex-col justify-between pt-28 pb-0 bg-prayxis-bg overflow-hidden border-b border-white/10"
      aria-label="Prayxis Technology Hero"
    >
      {/* Ambient Tech Grid Background */}
      <div className="absolute inset-0 bg-tech-grid opacity-25 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-prayxis-accent/5 blur-[150px] pointer-events-none" />

      {/* Main 12-Column Desktop Asymmetrical Layout */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto px-6 sm:px-12 lg:px-20 relative z-10 py-12">
        
        {/* Left Column: Refined Editorial Typography & CTAs (6 Cols) */}
        <div ref={textColRef} className="lg:col-span-6 flex flex-col justify-center opacity-0">
          
          {/* Eyebrow Tag */}
          <div className="inline-flex items-center gap-2.5 font-mono text-xs tracking-superwide text-prayxis-accent uppercase mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-prayxis-accent cyan-glow" />
            <span>PRAYXIS / TECHNOLOGY + SECURITY</span>
          </div>

          {/* Refined Proportional Heading (Clamp 48px-82px) */}
          <h1 className="text-[clamp(44px,5.2vw,80px)] font-extrabold text-prayxis-offwhite uppercase tracking-tight leading-[1.03] mb-6">
            WE ENGINEER <br />
            DIGITAL SYSTEMS <br />
            BUILT FOR <br />
            <span className="text-prayxis-accent">WHAT COMES NEXT.</span>
          </h1>

          {/* Supporting Copy */}
          <p className="body-large text-prayxis-muted font-normal max-w-lg mb-8">
            From software engineering to cybersecurity, cloud infrastructure and intelligent automation — we design, build and secure technology for ambitious ideas.
          </p>

          {/* Compact CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <MagneticButton href="#work" variant="primary">
              EXPLORE OUR WORK →
            </MagneticButton>
            <MagneticButton href="#contact" variant="secondary" showArrow={false}>
              WORK WITH US →
            </MagneticButton>
          </div>

          {/* Brand Statement & Technical Status Indicator */}
          <div className="mt-12 flex items-center justify-between font-mono text-[10px] tracking-superwide text-prayxis-subtle pt-6 border-t border-white/10 uppercase">
            <div className="flex items-center gap-1.5 text-prayxis-accent">
              <Activity className="h-3.5 w-3.5" />
              <span>BUILD / SECURE / INNOVATE</span>
            </div>
            <div className="flex items-center gap-3">
              <span>VER: 2026.1</span>
              <span>//</span>
              <span>PRAYXIS / INDIA</span>
            </div>
          </div>

        </div>

        {/* Right Column: Premium Interactive PRAYXIS NEURAL CORE Panel (6 Cols) */}
        <div
          ref={visualColRef}
          className="lg:col-span-6 relative w-full min-h-[440px] sm:min-h-[500px] flex items-center justify-center opacity-0"
        >
          <NeuralCore className="w-full h-full" />
        </div>

      </div>

      {/* Capability Strip Banner at Lower Hero */}
      <CapabilityStrip />
    </section>
  );
};
