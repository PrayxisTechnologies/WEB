'use client';

import React, { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/animations/gsap';
import { ShieldCheck, Cpu, Activity, Lock, Terminal } from 'lucide-react';

export const ScrollHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const graphicCoreRef = useRef<HTMLDivElement>(null);
  const innerRingRef = useRef<HTMLDivElement>(null);
  const outerRadarRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
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
          end: '+=400%',
          pin: pinElement,
          scrub: 0.8,
          onUpdate: (self) => {
            const progress = Math.round(self.progress * 100);
            if (progressPercentRef.current) {
              progressPercentRef.current.innerText = `${progress < 10 ? '0' : ''}${progress}%`;
            }
          },
        },
      });

      // 0% -> 25%: 3D Isometric Tilt & Circuit Ignition
      scrollTl
        .to(graphicCoreRef.current, {
          rotateX: 45,
          rotateZ: -20,
          scale: 1.15,
          duration: 0.25,
        })
        .to(
          outerRadarRef.current,
          {
            rotate: 90,
            scale: 1.25,
            opacity: 0.8,
            duration: 0.25,
          },
          '<'
        )
        .to(
          card1Ref.current,
          {
            x: -40,
            y: -30,
            opacity: 1,
            duration: 0.25,
          },
          '<'
        )
        // 25% -> 50%: Layer Separation & HUD Telemetry Manifestation
        .to(graphicCoreRef.current, {
          rotateX: 60,
          rotateZ: -35,
          scale: 1.35,
          duration: 0.25,
        })
        .to(
          innerRingRef.current,
          {
            rotate: -180,
            scale: 1.3,
            borderColor: '#00F0FF',
            duration: 0.25,
          },
          '<'
        )
        .to(
          card2Ref.current,
          {
            x: 50,
            y: 20,
            opacity: 1,
            duration: 0.25,
          },
          '<'
        )
        .to(
          card3Ref.current,
          {
            y: -80,
            opacity: 1,
            duration: 0.25,
          },
          '<'
        )
        .to(
          headlineRef.current,
          {
            y: -30,
            scale: 1.05,
            duration: 0.25,
          },
          '<'
        )
        // 50% -> 75%: Cybernetic Core Lock & Cyan Energy Expansion
        .to(graphicCoreRef.current, {
          rotateX: 70,
          rotateZ: -45,
          scale: 1.5,
          duration: 0.25,
        })
        .to(
          [card1Ref.current, card2Ref.current, card3Ref.current],
          {
            borderColor: 'rgba(0, 240, 255, 0.4)',
            boxShadow: '0 0 30px rgba(0, 240, 255, 0.15)',
            duration: 0.25,
          },
          '<'
        )
        // 75% -> 100%: Smooth Dissolve & Transition Preparation
        .to(
          [graphicCoreRef.current, card1Ref.current, card2Ref.current, card3Ref.current, headlineRef.current],
          {
            opacity: 0,
            y: -100,
            duration: 0.25,
          }
        );
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-prayxis-bg"
      aria-label="Interactive Cybersecurity Architecture Showcase"
    >
      {/* Pinned Viewport Container */}
      <div
        ref={pinRef}
        className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden border-t border-white/5"
      >
        {/* Deep Tech Grid & Radial Ambient Background */}
        <div className="absolute inset-0 bg-tech-grid opacity-25 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-prayxis-accent/5 blur-[160px] pointer-events-none" />

        {/* Central High-Tech Vector Graphics Suite */}
        <div className="relative z-10 w-full max-w-6xl h-[450px] flex items-center justify-center perspective-1000">
          
          {/* 3D Isometric Cybernetic Matrix Core */}
          <div
            ref={graphicCoreRef}
            className="relative w-80 h-80 sm:w-96 sm:h-96 md:w-[440px] md:h-[440px] flex items-center justify-center transition-transform duration-100 style-3d"
          >
            {/* SVG Circuit Traces & Radar Mesh */}
            <svg
              className="absolute inset-0 w-full h-full text-prayxis-accent/30 pointer-events-none animate-pulse-subtle"
              viewBox="0 0 400 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Outer Radar Rings with Degree Marks */}
              <circle cx="200" cy="200" r="190" stroke="currentColor" strokeWidth="1" strokeDasharray="4 8" />
              <circle cx="200" cy="200" r="140" stroke="#00F0FF" strokeWidth="1" strokeOpacity="0.4" />
              <circle cx="200" cy="200" r="90" stroke="currentColor" strokeWidth="1" strokeDasharray="12 6" />

              {/* Crosshair Axes */}
              <line x1="200" y1="0" x2="200" y2="400" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
              <line x1="0" y1="200" x2="400" y2="200" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />

              {/* Hexagonal Cyber Mesh Path */}
              <path
                d="M200 50 L330 125 L330 275 L200 350 L70 275 L70 125 Z"
                stroke="#00F0FF"
                strokeWidth="1.5"
                strokeOpacity="0.6"
              />

              {/* Circuit Vector Lines & Nodes */}
              <path d="M70 125 L120 125 L150 150" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="150" cy="150" r="4" fill="#00F0FF" />

              <path d="M330 125 L280 125 L250 150" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="250" cy="150" r="4" fill="#00F0FF" />

              <path d="M200 350 L200 300" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="200" cy="300" r="4" fill="#00F0FF" />
            </svg>

            {/* Rotating Outer Radar Frame */}
            <div
              ref={outerRadarRef}
              className="absolute inset-0 rounded-full border border-prayxis-accent/20 flex items-center justify-center"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-[8px] tracking-widest text-prayxis-accent bg-prayxis-bg px-2">
                000° RADAR
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 font-mono text-[8px] tracking-widest text-prayxis-accent bg-prayxis-bg px-2">
                180° SWEEP
              </div>
            </div>

            {/* Inner Concentric Ring */}
            <div
              ref={innerRingRef}
              className="absolute w-52 h-52 sm:w-64 sm:h-64 rounded-full border border-white/20 flex items-center justify-center cyan-glow-subtle"
            >
              {/* Central Quantum Shield Emblem */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-prayxis-surface/90 border border-prayxis-accent/60 flex flex-col items-center justify-center cyan-glow">
                <ShieldCheck className="h-10 w-10 text-prayxis-accent mb-1 animate-pulse" />
                <span className="font-mono text-[8px] tracking-widest text-prayxis-offwhite uppercase">
                  PRAYXIS CORE
                </span>
              </div>
            </div>
          </div>

          {/* Floating High-Tech Telemetry Cards */}
          
          {/* Card 1: Zero-Trust Security */}
          <div
            ref={card1Ref}
            className="absolute top-4 left-4 sm:left-12 z-20 opacity-0 transition-shadow bg-prayxis-surface/95 border border-white/10 p-4 rounded-none w-64 backdrop-blur-md"
          >
            <div className="flex items-center gap-2 mb-2">
              <Lock className="h-4 w-4 text-prayxis-accent" />
              <span className="font-mono text-xs font-bold text-prayxis-offwhite tracking-wider">
                ZERO-TRUST MESH
              </span>
            </div>
            <div className="font-mono text-[10px] text-prayxis-muted leading-tight mb-2">
              TLS 1.3 // AES-256-GCM <br />
              SHA-256: e3b0c44298fc...
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-white/10 font-mono text-[9px]">
              <span className="text-prayxis-accent">STATUS // ENCRYPTED</span>
              <span className="text-prayxis-subtle">PORT: 443</span>
            </div>
          </div>

          {/* Card 2: Neural Threat Matrix */}
          <div
            ref={card2Ref}
            className="absolute bottom-4 right-4 sm:right-12 z-20 opacity-0 transition-shadow bg-prayxis-surface/95 border border-white/10 p-4 rounded-none w-64 backdrop-blur-md"
          >
            <div className="flex items-center gap-2 mb-2">
              <Cpu className="h-4 w-4 text-prayxis-accent" />
              <span className="font-mono text-xs font-bold text-prayxis-offwhite tracking-wider">
                NEURAL ENGINE
              </span>
            </div>
            <div className="font-mono text-[10px] text-prayxis-muted leading-tight mb-2">
              THREAT MATRIX // SCANNING <br />
              ANOMALY INDEX: 0.000%
            </div>
            <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden mb-2">
              <div className="bg-prayxis-accent h-full w-4/5 animate-pulse" />
            </div>
            <div className="flex items-center justify-between font-mono text-[9px] text-prayxis-accent">
              <span>LATENCY: 0.4ms</span>
              <span>100% NOMINAL</span>
            </div>
          </div>

          {/* Card 3: Cloud Infrastructure */}
          <div
            ref={card3Ref}
            className="absolute top-8 right-8 sm:right-24 z-20 opacity-0 transition-shadow bg-prayxis-surface/95 border border-white/10 p-3 rounded-none w-56 backdrop-blur-md hidden md:block"
          >
            <div className="flex items-center gap-2 mb-1">
              <Activity className="h-4 w-4 text-prayxis-accent" />
              <span className="font-mono text-xs font-bold text-prayxis-offwhite tracking-wider">
                REALTIME TELEMETRY
              </span>
            </div>
            <div className="font-mono text-[9px] text-prayxis-muted">
              GLOBAL EDGE // 142 NODES ACTIVE
            </div>
          </div>
        </div>

        {/* Dynamic Overlay Typography */}
        <div
          ref={headlineRef}
          className="relative z-20 text-center px-6 max-w-4xl mt-6 pointer-events-none"
        >
          <div className="inline-flex items-center gap-2 font-mono text-xs tracking-superwide text-prayxis-accent uppercase mb-3">
            <Terminal className="h-3.5 w-3.5" />
            <span>CYBERSECURITY & ENTERPRISE ARCHITECTURE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-prayxis-offwhite uppercase leading-tight">
            ENGINEERED FOR RESILIENCE. <br />
            <span className="text-prayxis-accent">SCALED FOR THE FUTURE.</span>
          </h2>
        </div>

        {/* Scroll Progress Indicator Tag */}
        <div className="absolute bottom-10 left-10 z-30 flex items-center gap-3 font-mono text-[10px] tracking-superwide text-prayxis-muted border border-white/10 px-4 py-2 bg-prayxis-surface/80 backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-prayxis-accent cyan-glow" />
          <span>HUD TELEMETRY TIMELINE // </span>
          <span ref={progressPercentRef} className="text-prayxis-accent font-bold">
            00%
          </span>
        </div>

        {/* Technical Asset Metadata Notice */}
        <div className="absolute bottom-10 right-10 z-30 font-mono text-[9px] tracking-superwide text-prayxis-subtle uppercase hidden sm:block">
          PRAYXIS ARCHITECTURE // QUANTUM ENCRYPTION CORE
        </div>
      </div>
    </div>
  );
};
