'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger } from '@/animations/gsap';
import { NetworkGraph, GraphNode } from '@/components/hero/NetworkGraph';
import { Telemetry, DEMO_TELEMETRY, TelemetryData } from '@/components/hero/Telemetry';
import { Terminal, Shield, Cpu } from 'lucide-react';

interface NeuralCoreProps {
  className?: string;
}

export const NeuralCore: React.FC<NeuralCoreProps> = ({ className = '' }) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const visualContentRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeNode, setActiveNode] = useState<GraphNode | null>(null);

  // QuickSetters for smooth mouse parallax
  const setParallaxXRef = useRef<((value: number) => void) | null>(null);
  const setParallaxYRef = useRef<((value: number) => void) | null>(null);

  useEffect(() => {
    const panel = panelRef.current;
    const visualContent = visualContentRef.current;
    if (!panel || !visualContent) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      // 1. Mouse Parallax (5px - 10px max subtle shift)
      if (!prefersReducedMotion) {
        setParallaxXRef.current = gsap.quickTo(visualContent, 'x', { duration: 0.4, ease: 'power2.out' });
        setParallaxYRef.current = gsap.quickTo(visualContent, 'y', { duration: 0.4, ease: 'power2.out' });
      }

      // 2. GSAP ScrollTrigger to track scroll progress stage
      ScrollTrigger.create({
        trigger: panel,
        start: 'top 80%',
        end: 'bottom top',
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        },
      });
    }, panelRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const panel = panelRef.current;
    if (!panel || !setParallaxXRef.current || !setParallaxYRef.current) return;

    const rect = panel.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Max movement: 8px
    const clamp = (val: number, max: number) => Math.max(-max, Math.min(max, val));
    setParallaxXRef.current(clamp(x * 0.04, 8));
    setParallaxYRef.current(clamp(y * 0.04, 8));
  };

  const handleMouseLeave = () => {
    if (setParallaxXRef.current && setParallaxYRef.current) {
      setParallaxXRef.current(0);
      setParallaxYRef.current(0);
    }
    setActiveNode(null);
  };

  return (
    <div
      ref={panelRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor="precision"
      className={`relative w-full h-full min-h-[420px] rounded-2xl bg-[#050607] border border-white/10 p-5 sm:p-6 flex flex-col justify-between backdrop-blur-xl overflow-hidden cyan-glow-subtle select-none ${className}`}
    >
      {/* Background Subtle Tech Grid Overlay */}
      <div className="absolute inset-0 bg-tech-grid opacity-15 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-prayxis-accent/5 blur-[100px] pointer-events-none" />

      {/* Header Bar */}
      <div className="relative z-10 flex items-center justify-between font-mono text-[10px] tracking-superwide text-prayxis-muted border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-prayxis-accent cyan-glow" />
          <span className="text-prayxis-offwhite font-bold uppercase">PRAYXIS / NEURAL CORE</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-prayxis-accent animate-pulse" />
          <span className="text-prayxis-accent font-semibold uppercase">SYSTEM / ONLINE</span>
        </div>
      </div>

      {/* Central Visual Stage with Parallax Wrapper */}
      <div
        ref={visualContentRef}
        className="relative z-10 my-auto w-full h-[240px] sm:h-[280px] flex items-center justify-center pointer-events-auto"
      >
        <NetworkGraph
          scrollProgress={scrollProgress}
          onHoverNode={(node) => setActiveNode(node)}
        />
      </div>

      {/* Active Node Detail Indicator Banner (Shown on hover) */}
      {activeNode && (
        <div className="relative z-20 mb-2 p-2 bg-prayxis-surface/90 border border-prayxis-accent/60 rounded font-mono text-[10px] flex items-center justify-between text-prayxis-accent animate-fadeIn">
          <div className="flex items-center gap-2">
            <Cpu className="h-3.5 w-3.5" />
            <span className="font-bold text-prayxis-offwhite">{activeNode.label}</span>
          </div>
          <span>LATENCY: {activeNode.latency} // STATUS: {activeNode.status}</span>
        </div>
      )}

      {/* Footer Telemetry Data & Status Bar */}
      <div className="relative z-10">
        <Telemetry data={DEMO_TELEMETRY} activeNode={activeNode?.label} />
      </div>
    </div>
  );
};
