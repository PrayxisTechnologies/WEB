'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from '@/animations/gsap';
import { ShieldCheck, Lock, Cpu, Activity, Zap, Server, Globe, CheckCircle2 } from 'lucide-react';

export const DeepScrollExperience: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  
  // Graphic refs
  const graphicCoreRef = useRef<HTMLDivElement>(null);
  const outerRadarRef = useRef<HTMLDivElement>(null);
  const innerRingRef = useRef<HTMLDivElement>(null);

  // Dynamic Sequential Cards (Revealed one by one on scroll)
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const card4Ref = useRef<HTMLDivElement>(null);

  // Sequential Stage Text Titles
  const stageTitleRef = useRef<HTMLDivElement>(null);
  const stageNumRef = useRef<HTMLSpanElement>(null);
  const stageHeadingRef = useRef<HTMLHeadingElement>(null);
  const stageSubtextRef = useRef<HTMLParagraphElement>(null);
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
          end: '+=800%', // 8 full viewport heights pin depth!
          pin: pinElement,
          scrub: 0.8,
          onUpdate: (self) => {
            const progress = Math.round(self.progress * 100);
            if (progressPercentRef.current) {
              progressPercentRef.current.innerText = `${progress < 10 ? '0' : ''}${progress}%`;
            }

            // Update stage counter number
            if (stageNumRef.current) {
              const stage = Math.min(4, Math.floor(self.progress * 4) + 1);
              stageNumRef.current.innerText = `0${stage}`;
            }
          },
        },
      });

      // STAGE 1: INITIAL CORE IGNITION (0% -> 20%)
      scrollTl
        .to(graphicCoreRef.current, {
          rotateX: 45,
          rotateZ: -25,
          scale: 1.1,
          duration: 0.2,
        })
        .to(
          outerRadarRef.current,
          {
            rotate: 120,
            scale: 1.2,
            opacity: 1,
            duration: 0.2,
          },
          '<'
        );

      // STAGE 2: ZERO-TRUST PROTOCOL MANIFESTATION (20% -> 40%)
      scrollTl
        // Fade out previous state text if any, update title
        .to(stageHeadingRef.current, { opacity: 0, y: -20, duration: 0.1 })
        .call(() => {
          if (stageHeadingRef.current && stageSubtextRef.current) {
            stageHeadingRef.current.innerText = 'STAGE 01 // ZERO-TRUST MESH ARCHITECTURE';
            stageSubtextRef.current.innerText = 'Quantum-resistant cryptographic protocols with real-time continuous verification.';
          }
        })
        .to(stageHeadingRef.current, { opacity: 1, y: 0, duration: 0.1 })
        .to(graphicCoreRef.current, {
          rotateX: 55,
          rotateZ: -45,
          scale: 1.25,
          duration: 0.2,
        })
        .to(card1Ref.current, {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.2,
        }, '<');

      // STAGE 3: NEURAL THREAT MATRIX REVEAL (40% -> 60%)
      scrollTl
        .to(stageHeadingRef.current, { opacity: 0, y: -20, duration: 0.1 })
        .call(() => {
          if (stageHeadingRef.current && stageSubtextRef.current) {
            stageHeadingRef.current.innerText = 'STAGE 02 // NEURAL THREAT DETECTION MATRIX';
            stageSubtextRef.current.innerText = 'AI-driven telemetry inspecting 50 Billion data points daily for zero-day vulnerabilities.';
          }
        })
        .to(stageHeadingRef.current, { opacity: 1, y: 0, duration: 0.1 })
        .to(card1Ref.current, { opacity: 0.3, scale: 0.95, duration: 0.15 })
        .to(graphicCoreRef.current, {
          rotateX: 65,
          rotateZ: -70,
          scale: 1.35,
          duration: 0.2,
        }, '<')
        .to(card2Ref.current, {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.2,
        }, '<');

      // STAGE 4: ULTRA-LOW LATENCY EDGE ENGINE (60% -> 80%)
      scrollTl
        .to(stageHeadingRef.current, { opacity: 0, y: -20, duration: 0.1 })
        .call(() => {
          if (stageHeadingRef.current && stageSubtextRef.current) {
            stageHeadingRef.current.innerText = 'STAGE 03 // SUB-MILLISECOND EDGE ROUTING';
            stageSubtextRef.current.innerText = '142 Geo-replicated global edge nodes delivering 0.4ms packet latency across 6 continents.';
          }
        })
        .to(stageHeadingRef.current, { opacity: 1, y: 0, duration: 0.1 })
        .to(card2Ref.current, { opacity: 0.3, scale: 0.95, duration: 0.15 })
        .to(graphicCoreRef.current, {
          rotateX: 75,
          rotateZ: -110,
          scale: 1.45,
          duration: 0.2,
        }, '<')
        .to(card3Ref.current, {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.2,
        }, '<');

      // STAGE 5: AUTONOMOUS ENTERPRISE RESILIENCE (80% -> 100%)
      scrollTl
        .to(stageHeadingRef.current, { opacity: 0, y: -20, duration: 0.1 })
        .call(() => {
          if (stageHeadingRef.current && stageSubtextRef.current) {
            stageHeadingRef.current.innerText = 'STAGE 04 // 99.999% HIGH-AVAILABILITY CORE';
            stageSubtextRef.current.innerText = 'Enterprise SLAs backed by automated self-healing distributed failover engines.';
          }
        })
        .to(stageHeadingRef.current, { opacity: 1, y: 0, duration: 0.1 })
        .to(card3Ref.current, { opacity: 0.3, scale: 0.95, duration: 0.15 })
        .to(graphicCoreRef.current, {
          rotateX: 85,
          rotateZ: -160,
          scale: 1.55,
          duration: 0.2,
        }, '<')
        .to(card4Ref.current, {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.2,
        }, '<')
        .to([card1Ref.current, card2Ref.current, card3Ref.current, card4Ref.current], {
          opacity: 1,
          scale: 1,
          borderColor: '#00F0FF',
          boxShadow: '0 0 30px rgba(0, 240, 255, 0.2)',
          duration: 0.2,
        });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-prayxis-bg"
      aria-label="Sequential Scroll Telemetry Engine"
    >
      {/* Pinned Viewport Container */}
      <div
        ref={pinRef}
        className="relative h-screen w-full flex flex-col items-center justify-between pt-24 pb-12 overflow-hidden border-t border-white/10"
      >
        {/* Background Grid & Noise */}
        <div className="absolute inset-0 bg-tech-grid opacity-20 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-prayxis-accent/5 blur-[180px] pointer-events-none" />

        {/* Dynamic Stage Header (Updates on Scroll) */}
        <div ref={stageTitleRef} className="relative z-20 text-center px-6 max-w-3xl">
          <div className="inline-flex items-center gap-2 font-mono text-xs tracking-superwide text-prayxis-accent uppercase mb-2">
            <span className="h-1.5 w-1.5 rounded-full bg-prayxis-accent cyan-glow" />
            <span>PRAYXIS TELEMETRY // STAGE </span>
            <span ref={stageNumRef} className="font-bold text-prayxis-offwhite">01</span>
          </div>
          <h2
            ref={stageHeadingRef}
            className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-prayxis-offwhite uppercase leading-tight transition-all duration-300"
          >
            STAGE 01 // ZERO-TRUST MESH ARCHITECTURE
          </h2>
          <p
            ref={stageSubtextRef}
            className="mt-2 text-xs sm:text-sm text-prayxis-muted font-mono tracking-wide max-w-xl mx-auto transition-all duration-300"
          >
            Quantum-resistant cryptographic protocols with real-time continuous verification.
          </p>
        </div>

        {/* Central 3D Vector Graphic Engine & Sequential Floating Cards */}
        <div className="relative z-10 w-full max-w-6xl h-[420px] flex items-center justify-center perspective-1000">
          
          {/* Central 3D Isometric Cyber Core */}
          <div
            ref={graphicCoreRef}
            className="relative w-72 h-72 sm:w-88 sm:h-88 md:w-[400px] md:h-[400px] flex items-center justify-center style-3d"
          >
            {/* SVG Vectors & Circuit Paths */}
            <svg
              className="absolute inset-0 w-full h-full text-prayxis-accent/40 pointer-events-none"
              viewBox="0 0 400 400"
              fill="none"
            >
              <circle cx="200" cy="200" r="185" stroke="currentColor" strokeWidth="1" strokeDasharray="6 8" />
              <circle cx="200" cy="200" r="130" stroke="#00F0FF" strokeWidth="1" strokeOpacity="0.5" />
              <circle cx="200" cy="200" r="80" stroke="currentColor" strokeWidth="1" strokeDasharray="10 4" />
              
              <line x1="200" y1="0" x2="200" y2="400" stroke="currentColor" strokeWidth="1" strokeOpacity="0.2" />
              <line x1="0" y1="200" x2="400" y2="200" stroke="currentColor" strokeWidth="1" strokeOpacity="0.2" />

              <path
                d="M200 40 L340 120 L340 280 L200 360 L60 280 L60 120 Z"
                stroke="#00F0FF"
                strokeWidth="1.5"
                strokeOpacity="0.7"
              />
            </svg>

            {/* Rotating Radar */}
            <div
              ref={outerRadarRef}
              className="absolute inset-0 rounded-full border border-prayxis-accent/30 flex items-center justify-center"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-[8px] tracking-widest text-prayxis-accent bg-prayxis-bg px-2">
                SYS // SCAN ACTIVE
              </div>
            </div>

            {/* Inner Ring Emblem */}
            <div
              ref={innerRingRef}
              className="absolute w-44 h-44 sm:w-56 sm:h-56 rounded-full border border-white/20 flex items-center justify-center cyan-glow-subtle"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-prayxis-surface/90 border border-prayxis-accent flex flex-col items-center justify-center cyan-glow">
                <ShieldCheck className="h-8 w-8 text-prayxis-accent animate-pulse" />
                <span className="font-mono text-[7px] tracking-widest text-prayxis-offwhite mt-1 uppercase">
                  PRAYXIS CORE
                </span>
              </div>
            </div>
          </div>

          {/* SEQUENTIAL CARDS (APPEAR ONE BY ONE ON SCROLL) */}

          {/* Card 1: Zero-Trust Security */}
          <div
            ref={card1Ref}
            className="absolute top-2 left-4 sm:left-10 z-30 opacity-0 translate-x-[-30px] bg-prayxis-surface/95 border border-white/10 p-4 rounded-none w-64 backdrop-blur-md transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-prayxis-accent" />
                <span className="font-mono text-xs font-bold text-prayxis-offwhite tracking-wider">
                  ZERO-TRUST ENGINE
                </span>
              </div>
              <span className="font-mono text-[8px] text-prayxis-accent bg-prayxis-accent/10 px-1.5 py-0.5">
                STAGE 01
              </span>
            </div>
            <div className="font-mono text-[10px] text-prayxis-muted leading-tight mb-3">
              TLS 1.3 // AES-256-GCM <br />
              SHA-256: e3b0c44298fc...
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-white/10 font-mono text-[9px] text-prayxis-accent">
              <span>STATUS // ENCRYPTED</span>
              <CheckCircle2 className="h-3.5 w-3.5" />
            </div>
          </div>

          {/* Card 2: Neural Threat Engine */}
          <div
            ref={card2Ref}
            className="absolute bottom-2 right-4 sm:right-10 z-30 opacity-0 translate-x-[30px] bg-prayxis-surface/95 border border-white/10 p-4 rounded-none w-64 backdrop-blur-md transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Cpu className="h-4 w-4 text-prayxis-accent" />
                <span className="font-mono text-xs font-bold text-prayxis-offwhite tracking-wider">
                  NEURAL SCANNER
                </span>
              </div>
              <span className="font-mono text-[8px] text-prayxis-accent bg-prayxis-accent/10 px-1.5 py-0.5">
                STAGE 02
              </span>
            </div>
            <div className="font-mono text-[10px] text-prayxis-muted leading-tight mb-2">
              50B+ DATA POINTS INSPECTED <br />
              10M+ THREATS NEUTRALIZED
            </div>
            <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden mb-2">
              <div className="bg-prayxis-accent h-full w-full animate-pulse" />
            </div>
            <div className="flex items-center justify-between font-mono text-[9px] text-prayxis-accent">
              <span>ANOMALY INDEX: 0.00%</span>
              <CheckCircle2 className="h-3.5 w-3.5" />
            </div>
          </div>

          {/* Card 3: Global Edge Routing */}
          <div
            ref={card3Ref}
            className="absolute top-2 right-4 sm:right-10 z-30 opacity-0 translate-y-[-30px] bg-prayxis-surface/95 border border-white/10 p-4 rounded-none w-64 backdrop-blur-md transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-prayxis-accent" />
                <span className="font-mono text-xs font-bold text-prayxis-offwhite tracking-wider">
                  EDGE ROUTER
                </span>
              </div>
              <span className="font-mono text-[8px] text-prayxis-accent bg-prayxis-accent/10 px-1.5 py-0.5">
                STAGE 03
              </span>
            </div>
            <div className="font-mono text-[10px] text-prayxis-muted leading-tight mb-2">
              0.4MS GLOBAL LATENCY <br />
              142 ACTIVE GEO NODES
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-white/10 font-mono text-[9px] text-prayxis-accent">
              <span>PACKET LOSS: 0.000%</span>
              <Globe className="h-3.5 w-3.5" />
            </div>
          </div>

          {/* Card 4: High Availability Uptime */}
          <div
            ref={card4Ref}
            className="absolute bottom-2 left-4 sm:left-10 z-30 opacity-0 translate-y-[30px] bg-prayxis-surface/95 border border-white/10 p-4 rounded-none w-64 backdrop-blur-md transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Server className="h-4 w-4 text-prayxis-accent" />
                <span className="font-mono text-xs font-bold text-prayxis-offwhite tracking-wider">
                  UPTIME SLA
                </span>
              </div>
              <span className="font-mono text-[8px] text-prayxis-accent bg-prayxis-accent/10 px-1.5 py-0.5">
                STAGE 04
              </span>
            </div>
            <div className="font-mono text-[10px] text-prayxis-muted leading-tight mb-2">
              99.999% HIGH-AVAILABILITY <br />
              AUTONOMOUS FAILOVER
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-white/10 font-mono text-[9px] text-prayxis-accent">
              <span>SLA GUARANTEED</span>
              <Activity className="h-3.5 w-3.5" />
            </div>
          </div>

        </div>

        {/* Footer Scroll Telemetry Indicator Bar */}
        <div className="relative z-20 w-full max-w-6xl px-6 flex items-center justify-between font-mono text-[10px] text-prayxis-muted border-t border-white/10 pt-4">
          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-prayxis-accent cyan-glow" />
            <span>SCROLL PROGRESS // </span>
            <span ref={progressPercentRef} className="text-prayxis-accent font-bold">
              00%
            </span>
          </div>

          <div className="hidden sm:block text-prayxis-subtle tracking-superwide uppercase">
            KEEP SCROLLING TO DISCOVER PRAYXIS ARCHITECTURE
          </div>
        </div>

      </div>
    </div>
  );
};
