'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from '@/animations/gsap';
import { ShieldCheck, Network, Cpu, CheckCircle2, Lock } from 'lucide-react';

export const ScrollCinematic: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  const graphicRef = useRef<HTMLDivElement>(null);
  const networkLayerRef = useRef<HTMLDivElement>(null);
  const securityLayerRef = useRef<HTMLDivElement>(null);
  const brandLayerRef = useRef<HTMLDivElement>(null);

  const stepTextRef = useRef<HTMLHeadingElement>(null);
  const progressPercentRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const pinElement = pinRef.current;
    const container = containerRef.current;
    if (!pinElement || !container) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=450%',
          pin: pinElement,
          scrub: 0.8,
          onUpdate: (self) => {
            const p = self.progress;
            const progressPercent = Math.round(p * 100);
            if (progressPercentRef.current) {
              progressPercentRef.current.innerText = `${progressPercent < 10 ? '0' : ''}${progressPercent}%`;
            }

            if (stepTextRef.current) {
              if (p < 0.20) {
                stepTextRef.current.innerText = '01 // ABSTRACT COMPUTATIONAL MESH';
              } else if (p < 0.40) {
                stepTextRef.current.innerText = '02 // NETWORK ECOSYSTEM FORMATION';
              } else if (p < 0.60) {
                stepTextRef.current.innerText = '03 // SYSTEM ORCHESTRATION & OPTIMIZATION';
              } else if (p < 0.80) {
                stepTextRef.current.innerText = '04 // ZERO-TRUST SECURITY ENFORCEMENT';
              } else {
                stepTextRef.current.innerText = '05 // PRAYXIS SYSTEM INSTANTIATED';
              }
            }
          },
        },
      });

      // Initial tilted starting state
      gsap.set(graphicRef.current, {
        rotateX: 45,
        rotateZ: -25,
        scale: 0.9,
      });

      // 0% -> 25%: Stage 1 -> Stage 2 (Network forms)
      scrollTl
        .to(graphicRef.current, {
          rotateX: 28,
          rotateZ: -12,
          scale: 1.0,
          duration: 0.25,
        })
        .to(networkLayerRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.25,
        }, '<')

      // 25% -> 50%: Stage 2 -> Stage 3 (System Orchestration)
      .to(graphicRef.current, {
        rotateX: 14,
        rotateZ: -5,
        scale: 1.05,
        duration: 0.25,
      })

      // 50% -> 75%: Stage 3 -> Stage 4 (Zero-Trust Security)
      .to(graphicRef.current, {
        rotateX: 4,
        rotateZ: 0,
        scale: 1.1,
        duration: 0.25,
      })
      .to(securityLayerRef.current, {
        opacity: 1,
        scale: 1,
        borderColor: '#00F0FF',
        duration: 0.25,
      }, '<')

      // 75% -> 100%: Stage 5 (100% Straight, Flat, Upright PRAYXIS Core)
      .to(graphicRef.current, {
        rotateX: 0,
        rotateZ: 0,
        rotateY: 0,
        scale: 1.15,
        duration: 0.25,
      })
      .to(brandLayerRef.current, {
        opacity: 1,
        scale: 1.0,
        duration: 0.25,
      }, '<');

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-prayxis-bg"
      aria-label="Cinematic Transformation Architecture"
    >
      <div
        ref={pinRef}
        className="relative h-screen w-full flex flex-col items-center justify-between pt-24 pb-10 overflow-hidden border-t border-white/10"
      >
        {/* Background Grids */}
        <div className="absolute inset-0 bg-tech-grid opacity-20 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-prayxis-accent/5 blur-[160px] pointer-events-none" />

        {/* Header Title */}
        <div className="relative z-20 text-center px-6 max-w-4xl">
          <div className="label-eyebrow text-prayxis-accent mb-2">
            05 // CINEMATIC SYSTEM TRANSFORMATION
          </div>
          <h2
            ref={stepTextRef}
            className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-prayxis-offwhite uppercase transition-all duration-300"
          >
            01 // ABSTRACT COMPUTATIONAL MESH
          </h2>
        </div>

        {/* Central Sleek Transformation Visual (No Side Box Clutter) */}
        <div className="relative z-10 w-full max-w-4xl h-[420px] flex items-center justify-center px-6">
          <div className="relative w-80 h-80 sm:w-96 sm:h-96 perspective-1000 flex items-center justify-center">
            
            <div
              ref={graphicRef}
              className="relative w-full h-full border border-white/20 rounded-3xl bg-prayxis-surface/90 backdrop-blur-xl flex items-center justify-center style-3d cyan-glow-subtle overflow-hidden"
            >
              {/* SVG Radial Vector Canvas */}
              <svg className="absolute inset-0 w-full h-full text-white/20 pointer-events-none" viewBox="0 0 400 400" fill="none">
                <circle cx="200" cy="200" r="160" stroke="currentColor" strokeWidth="1" strokeDasharray="4 6" />
                <circle cx="200" cy="200" r="110" stroke="#00F0FF" strokeWidth="1" strokeOpacity="0.3" />
                <line x1="200" y1="20" x2="200" y2="380" stroke="currentColor" strokeWidth="1" strokeOpacity="0.2" />
                <line x1="20" y1="200" x2="380" y2="200" stroke="currentColor" strokeWidth="1" strokeOpacity="0.2" />
              </svg>

              {/* Layer 2: Network Topology Layer (Fades in at 25%) */}
              <div
                ref={networkLayerRef}
                className="absolute inset-0 opacity-0 scale-90 transition-all flex items-center justify-center pointer-events-none"
              >
                <div className="absolute top-6 left-6 flex items-center gap-2 font-mono text-[10px] text-prayxis-accent tracking-wider uppercase bg-black/60 px-3 py-1.5 border border-prayxis-accent/40 rounded-full">
                  <Network className="h-3 w-3" />
                  <span>EDGE MESH ACTIVE</span>
                </div>
                <div className="absolute bottom-6 right-6 flex items-center gap-2 font-mono text-[10px] text-prayxis-accent tracking-wider uppercase bg-black/60 px-3 py-1.5 border border-prayxis-accent/40 rounded-full">
                  <Cpu className="h-3 w-3" />
                  <span>NODES REPLICATED</span>
                </div>
              </div>

              {/* Layer 3: Security Perimeter Layer (Fades in at 75%) */}
              <div
                ref={securityLayerRef}
                className="absolute inset-8 border-2 border-prayxis-accent/40 rounded-2xl opacity-0 scale-95 transition-all flex items-center justify-center pointer-events-none"
              >
                <ShieldCheck className="h-20 w-20 text-prayxis-accent/40" />
              </div>

              {/* Layer 4: Final PRAYXIS System Core (Fades in at 100%) */}
              <div
                ref={brandLayerRef}
                className="relative z-30 opacity-0 scale-90 transition-all flex flex-col items-center justify-center p-8 bg-prayxis-bg border border-prayxis-accent rounded-2xl cyan-glow text-center"
              >
                <CheckCircle2 className="h-10 w-10 text-prayxis-accent mb-3" />
                <div className="font-extrabold text-2xl tracking-ultra text-prayxis-offwhite uppercase">
                  PRAYXIS
                </div>
                <div className="font-mono text-[10px] tracking-superwide text-prayxis-accent uppercase mt-2">
                  SYSTEM INSTANTIATED // 100% NOMINAL
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Footer Progress */}
        <div className="relative z-20 w-full max-w-5xl px-6 flex items-center justify-between font-mono text-[10px] text-prayxis-muted border-t border-white/10 pt-4">
          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-prayxis-accent cyan-glow" />
            <span>TRANSFORMATION PROGRESS // </span>
            <span ref={progressPercentRef} className="text-prayxis-accent font-bold">
              00%
            </span>
          </div>

          <div className="hidden sm:block text-prayxis-subtle tracking-superwide uppercase">
            5-STAGE CINEMATIC TIMELINE
          </div>
        </div>

      </div>
    </div>
  );
};
