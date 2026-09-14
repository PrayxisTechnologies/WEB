'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from '@/animations/gsap';
import { Code2, Shield, Lightbulb } from 'lucide-react';

const ITEMS = [
  {
    num: '01',
    title: 'BUILD',
    icon: Code2,
    desc: 'Digital products and software engineered for real-world use and high-throughput reliability.',
  },
  {
    num: '02',
    title: 'SECURE',
    icon: Shield,
    desc: 'Security-first engineering, zero-trust protocol design, and proactive cyber threat mitigation.',
  },
  {
    num: '03',
    title: 'INNOVATE',
    icon: Lightbulb,
    desc: 'Tools, platforms, artificial intelligence models, and research experiments pushing technology forward.',
  },
];

export const InteractiveTech: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const graphicRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.to(graphicRef.current, {
        rotateX: 60,
        rotateZ: -45,
        scale: 1.25,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
          end: 'bottom 20%',
          scrub: 0.8,
        },
      });

      gsap.to(ringRef.current, {
        rotate: 180,
        borderColor: '#00F0FF',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 60%',
          end: 'bottom 30%',
          scrub: 0.8,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      aria-label="Interactive Core Capabilities"
      className="relative w-full py-28 px-6 sm:px-12 lg:px-20 bg-prayxis-bg border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Interactive 3D Vector Graphic (6 Cols) */}
        <div className="lg:col-span-6 relative h-[400px] flex items-center justify-center perspective-1000">
          <div
            ref={graphicRef}
            data-cursor="precision"
            className="relative w-72 h-72 sm:w-88 sm:h-88 border border-prayxis-accent/30 rounded-3xl bg-prayxis-surface/80 p-6 backdrop-blur-md flex items-center justify-center style-3d cyan-glow-subtle cursor-none"
          >
            {/* SVG Interactive Mesh Lines */}
            <svg
              className="absolute inset-0 w-full h-full text-prayxis-accent/40"
              viewBox="0 0 300 300"
              fill="none"
            >
              <circle cx="150" cy="150" r="130" stroke="currentColor" strokeWidth="1" strokeDasharray="6 6" />
              <line x1="150" y1="20" x2="150" y2="280" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
              <line x1="20" y1="150" x2="280" y2="150" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
              
              <polygon
                points="150,30 250,90 250,210 150,270 50,210 50,90"
                stroke="#00F0FF"
                strokeWidth="1.5"
                strokeOpacity="0.7"
              />
            </svg>

            <div
              ref={ringRef}
              className="w-40 h-40 rounded-full border border-white/20 flex items-center justify-center transition-colors"
            >
              <div className="w-16 h-16 rounded-xl bg-prayxis-bg border border-prayxis-accent flex items-center justify-center cyan-glow">
                <span className="font-mono text-xs font-bold text-prayxis-accent">PRAYXIS</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: 01 BUILD / 02 SECURE / 03 INNOVATE List (6 Cols) */}
        <div className="lg:col-span-6 flex flex-col gap-8">
          <div className="label-eyebrow text-prayxis-accent">
            02 // INTERACTIVE CAPABILITIES
          </div>

          <div className="flex flex-col divide-y divide-white/10">
            {ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.num} className="group py-6 first:pt-0 last:pb-0">
                  <div className="flex items-center gap-4 mb-2">
                    <span className="font-mono text-xs font-bold text-prayxis-accent bg-prayxis-accent/10 px-2 py-0.5">
                      {item.num}
                    </span>
                    <h3 className="heading-sub font-extrabold text-prayxis-offwhite group-hover:text-prayxis-accent transition-colors tracking-tight uppercase">
                      {item.title}
                    </h3>
                  </div>

                  <p className="body-small text-prayxis-muted font-normal leading-relaxed pl-10">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
