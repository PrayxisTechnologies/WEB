'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from '@/animations/gsap';

export const IntroStatement: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 85%',
          },
        }
      );

      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.2,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: lineRef.current,
              start: 'top 90%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Prayxis Philosophy Statement"
      className="relative w-full py-28 px-6 sm:px-12 lg:px-20 bg-prayxis-bg border-b border-white/10"
    >
      <div className="max-w-5xl mx-auto relative z-10">
        <div ref={textRef} className="opacity-0">
          
          <div className="inline-flex items-center gap-2 label-eyebrow text-prayxis-accent mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-prayxis-accent cyan-glow" />
            <span>01 // MISSION STATEMENT</span>
          </div>

          <h2 className="heading-section font-extrabold text-prayxis-offwhite uppercase tracking-tight leading-tight mb-8">
            WE BUILD DIGITAL SYSTEMS THAT ARE DESIGNED TO PERFORM, SCALE AND STAY SECURE.
          </h2>

          <p className="body-large text-prayxis-muted font-normal leading-relaxed max-w-3xl">
            PRAYXIS is an independent technology and cybersecurity research company. We partner with forward-thinking enterprises, engineering leaders, and founders to architect software products, cloud infrastructures, and zero-trust security ecosystems.
          </p>

        </div>

        {/* Subtle Animated Vector System Line */}
        <div className="mt-16 pt-8 relative">
          <div
            ref={lineRef}
            className="w-full h-[1px] bg-gradient-to-r from-transparent via-prayxis-accent to-transparent origin-left"
          />
          <div className="mt-4 flex items-center justify-between font-mono text-[10px] text-prayxis-subtle uppercase">
            <span>ENGINEERED FOR RESILIENCE</span>
            <span>HIGH-SCALE REPLICATION</span>
          </div>
        </div>
      </div>
    </section>
  );
};
