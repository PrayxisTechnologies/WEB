'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger } from '@/animations/gsap';
import { SystemGraph } from '@/components/sections/SystemGraph';

const STAGE_DETAILS = [
  {
    num: '01',
    title: 'FOUNDATION',
    desc: 'Every system begins with a resilient core.',
  },
  {
    num: '02',
    title: 'CONNECTION',
    desc: 'Interfaces become systems when everything communicates.',
  },
  {
    num: '03',
    title: 'INFRASTRUCTURE',
    desc: 'Software needs infrastructure built to carry it.',
  },
  {
    num: '04',
    title: 'SECURITY',
    desc: 'Security is part of the architecture, not an afterthought.',
  },
  {
    num: '05',
    title: 'SYSTEM',
    desc: 'Connected. Secure. Engineered to evolve.',
  },
];

export const SystemArchitecture: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const parallaxCanvasRef = useRef<HTMLDivElement>(null);

  const [progress, setProgress] = useState(0);
  const [activeHoverNode, setActiveHoverNode] = useState<string | null>(null);

  // Derive active stage index (0 to 4) continuously
  const currentStageIdx = Math.min(
    4,
    Math.floor(
      progress < 0.15
        ? 0
        : progress < 0.35
        ? 1
        : progress < 0.55
        ? 2
        : progress < 0.75
        ? 3
        : 4
    )
  );

  const activeStage = STAGE_DETAILS[currentStageIdx];

  // Mouse parallax setup
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (prefersReducedMotion || !isFinePointer) return;

    const canvas = parallaxCanvasRef.current;
    if (!canvas) return;

    const quickX = gsap.quickTo(canvas, 'x', { duration: 0.6, ease: 'power2.out' });
    const quickY = gsap.quickTo(canvas, 'y', { duration: 0.6, ease: 'power2.out' });

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const xOffset = ((e.clientX / innerWidth) - 0.5) * 12; // 6px max parallax
      const yOffset = ((e.clientY / innerHeight) - 0.5) * 12;

      quickX(xOffset);
      quickY(yOffset);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // GSAP ScrollTrigger Pinned Animation
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setProgress(1.0); // Show full system if reduced motion is enabled
      return;
    }

    const container = containerRef.current;
    const pinElement = pinRef.current;
    if (!container || !pinElement) return;

    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: 'bottom bottom',
        pin: pinElement,
        pinSpacing: false,
        scrub: 0.5,
        onUpdate: (self) => {
          setProgress(self.progress);
        },
      });

      ScrollTrigger.refresh();
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="system-architecture"
      aria-label="PRAYXIS System Architecture Visualization"
      className="relative w-full min-h-[350vh] bg-[#050507] text-[#F4F4F6]"
    >
      <div
        ref={pinRef}
        className="sticky top-0 h-screen w-full flex flex-col justify-between pt-24 pb-8 px-6 sm:px-12 lg:px-20 overflow-hidden select-none"
      >
        {/* Background Spatial Environment */}
        <div className="absolute inset-0 bg-tech-grid opacity-15 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-prayxis-accent/5 blur-[180px] pointer-events-none" />

        {/* Editorial Top-Left Header & Stage Column Layout */}
        <div className="relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Top-Left Title Header (8 Cols) */}
          <div className="lg:col-span-8 space-y-2">
            <div className="label-eyebrow text-prayxis-accent">
              05 / SYSTEM ARCHITECTURE
            </div>
            <h2 className="text-[clamp(32px,4.2vw,64px)] font-extrabold text-prayxis-offwhite uppercase tracking-tight leading-[1.05]">
              ENGINEERED <span className="text-prayxis-accent">TO CONNECT.</span>
            </h2>
          </div>

          {/* Side Stage Information Column (4 Cols) */}
          <div className="lg:col-span-4 bg-prayxis-surface/60 border border-white/10 p-5 rounded-xl backdrop-blur-md font-mono text-xs space-y-2 transition-all duration-300">
            <div className="text-prayxis-accent font-bold">
              {activeStage.num} / {activeStage.title}
            </div>
            <p className="text-prayxis-muted body-small leading-relaxed">
              {activeStage.desc}
            </p>
          </div>

        </div>

        {/* Central Full-Screen Floating SVG Architecture Canvas (No Card / No Framing) */}
        <div
          ref={parallaxCanvasRef}
          className="relative z-10 w-full h-[54vh] flex items-center justify-center my-auto"
        >
          <SystemGraph
            progress={progress}
            activeHoverNode={activeHoverNode}
            onHoverNode={setActiveHoverNode}
          />
        </div>

        {/* Bottom Bar: Stage Indicator & Technical Metadata */}
        <div className="relative z-20 w-full pt-4 border-t border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono text-[10px] text-prayxis-subtle">
          
          {/* Stage Indicator: 01 ── 02 ── 03 ── 04 ── 05 */}
          <div className="flex items-center gap-4">
            <span className="text-prayxis-accent font-bold uppercase">SYSTEM BUILD</span>
            <div className="flex items-center gap-2">
              {STAGE_DETAILS.map((st, i) => {
                const isActive = i === currentStageIdx;
                const isPassed = i < currentStageIdx;

                return (
                  <React.Fragment key={st.num}>
                    <span
                      className={`px-2 py-0.5 rounded transition-all ${
                        isActive
                          ? 'bg-prayxis-accent text-black font-extrabold'
                          : isPassed
                          ? 'text-prayxis-accent font-bold'
                          : 'text-prayxis-subtle opacity-40'
                      }`}
                    >
                      {isPassed ? `${st.num} ✓` : st.num}
                    </span>
                    {i < STAGE_DETAILS.length - 1 && (
                      <span className="text-prayxis-subtle opacity-30">──</span>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Bottom Right Metadata & Scroll Prompt */}
          <div className="flex items-center gap-4 uppercase tracking-wider text-prayxis-muted">
            <span>SOFTWARE</span>
            <span>//</span>
            <span>SECURITY</span>
            <span>//</span>
            <span>INFRASTRUCTURE</span>
            <span>//</span>
            <span className="text-prayxis-accent font-bold">RESEARCH</span>
          </div>

        </div>

      </div>
    </section>
  );
};
