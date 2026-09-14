'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { Code2, Cpu, Database, Server, Layers, Shield, MessageCircle, Loader2 } from 'lucide-react';
import { COURSES_DATA } from '@/data/courses';
import { getWhatsAppEnrollUrl } from '@/lib/whatsapp';

export const FeaturedCourse: React.FC = () => {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = React.useState(false);
  const featured = COURSES_DATA.find((c) => c.isFeatured) || COURSES_DATA[0];

  const handleEnrollClick = async () => {
    try {
      setIsProcessing(true);
      const authRes = await fetch('/api/auth/me');
      if (!authRes.ok) {
        router.push(`/login?redirect=${encodeURIComponent('/courses')}&enroll=${encodeURIComponent(featured.id)}`);
        return;
      }

      const authData = await authRes.json();
      const currentUser = authData.user;
      if (!currentUser) {
        router.push(`/login?redirect=${encodeURIComponent('/courses')}&enroll=${encodeURIComponent(featured.id)}`);
        return;
      }

      await fetch('/api/courses/enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseId: featured.id,
          courseSlug: 'full-stack',
          courseTitle: featured.title,
          price: featured.discountPrice ?? 99,
          offer: featured.offerTag ?? 'GANESH CHATURTHI OFFER',
        }),
      });

      const waUrl = getWhatsAppEnrollUrl({
        userId: currentUser.id,
        userName: currentUser.name,
        userEmail: currentUser.email,
        courseTitle: featured.title,
        price: featured.discountPrice ?? 99,
        offer: 'Ganesh Chaturthi Special Offer',
      });

      if (typeof window !== 'undefined') {
        window.open(waUrl, '_blank');
      }

      router.push('/student/profile');
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <section
      id="featured-program"
      aria-label="Featured Academy Program"
      className="relative w-full py-20 px-6 sm:px-12 lg:px-20 bg-prayxis-bg border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Title */}
        <div className="mb-10 flex items-center justify-between font-mono text-xs text-prayxis-accent uppercase tracking-wider">
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-prayxis-accent cyan-glow" />
            <span>01 // PRIMARY ACTIVE PROGRAM</span>
          </span>
          <span className="text-prayxis-subtle">[ STATUS: {featured.status} ]</span>
        </div>

        {/* Large Featured Program Card */}
        <div className="p-8 sm:p-12 bg-prayxis-surface/90 border border-prayxis-accent/50 rounded-2xl backdrop-blur-md grid grid-cols-1 lg:grid-cols-12 gap-10 items-center cyan-glow-subtle relative overflow-hidden">
          <div className="absolute inset-0 bg-tech-grid opacity-15 pointer-events-none" />

          {/* Left Column: Program Information & Metadata */}
          <div className="lg:col-span-6 space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-prayxis-accent/10 border border-prayxis-accent/40 rounded-full font-mono text-[10px] text-prayxis-accent tracking-wider uppercase">
              <span>{featured.code}</span>
              <span>//</span>
              <span>{featured.duration}</span>
              <span>//</span>
              <span>{featured.hours}</span>
            </div>

            <h2 className="font-mono text-3xl sm:text-4xl font-extrabold text-prayxis-offwhite uppercase tracking-tight leading-tight">
              {featured.title}
            </h2>

            <p className="body-large text-prayxis-muted font-normal leading-relaxed">
              {featured.description}
            </p>

            {/* Program Specs Metadata Grid */}
            <div className="grid grid-cols-2 gap-3 font-mono text-xs pt-2">
              <div className="p-3 bg-white/5 border border-white/10 rounded">
                <div className="text-prayxis-subtle text-[10px]">LEVEL</div>
                <div className="text-prayxis-offwhite font-bold mt-1">{featured.level}</div>
              </div>
              <div className="p-3 bg-white/5 border border-white/10 rounded">
                <div className="text-prayxis-subtle text-[10px]">FORMAT</div>
                <div className="text-prayxis-accent font-bold mt-1">PROJECT BASED</div>
              </div>
            </div>

            {/* Tech Stack Pills */}
            <div className="space-y-2 pt-2">
              <div className="font-mono text-[10px] text-prayxis-subtle uppercase">
                CURRICULUM TECH STACK:
              </div>
              <div className="flex flex-wrap gap-2 font-mono text-[10px] text-prayxis-subtle uppercase">
                {featured.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-white/5 border border-white/10 hover:border-prayxis-accent/60 transition-colors text-prayxis-offwhite"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Offer & Pricing Badge */}
            <div className="p-4 rounded-xl bg-prayxis-bg/60 border border-amber-500/30 space-y-3">
              <div className="flex items-center justify-between text-amber-300 font-mono text-[11px] font-bold">
                <span className="flex items-center gap-1.5">
                  <span className="animate-pulse">🪔</span>
                  <span>GANESH CHATURTHI SPECIAL OFFER</span>
                </span>
                <span className="px-2 py-0.5 bg-amber-500/20 rounded text-[10px] text-amber-300">
                  90% OFF
                </span>
              </div>
              <div className="flex items-baseline justify-between font-mono">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl sm:text-4xl font-extrabold text-prayxis-accent">
                    ₹{featured.discountPrice ?? 99}
                  </span>
                  <span className="text-base text-prayxis-subtle line-through opacity-70">
                    ₹{featured.originalPrice ?? 999}
                  </span>
                </div>
                <span className="text-[10px] text-prayxis-muted uppercase tracking-wider">
                  ALL-INCLUSIVE ACCESS
                </span>
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={handleEnrollClick}
                disabled={isProcessing}
                className="px-6 py-3.5 bg-prayxis-accent hover:bg-white text-black font-mono text-xs font-extrabold uppercase rounded-lg transition-all duration-300 flex items-center justify-center gap-2 cyan-glow cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>PROCESSING...</span>
                  </>
                ) : (
                  <>
                    <MessageCircle className="h-4 w-4 fill-black text-black" />
                    <span>ENROLL NOW (₹99) →</span>
                  </>
                )}
              </button>
              <MagneticButton href="#curriculum-preview" variant="secondary" showArrow={true}>
                EXPLORE ROADMAP
              </MagneticButton>
            </div>
          </div>

          {/* Right Column: High-Tech Full Stack SVG Architecture Visual */}
          <div className="lg:col-span-6 p-6 bg-[#050607] border border-white/10 rounded-xl space-y-4 font-mono text-xs relative z-10">
            <div className="flex items-center justify-between text-[10px] text-prayxis-muted border-b border-white/10 pb-3">
              <span className="text-prayxis-accent font-bold">FULL STACK ARCHITECTURE MAP</span>
              <span className="text-prayxis-subtle">45-DAY CURRICULUM</span>
            </div>

            {/* Interactive SVG Diagram */}
            <div className="py-4 flex flex-col items-center justify-center space-y-4">
              <div className="w-full grid grid-cols-3 gap-3 text-center text-[10px]">
                <div className="p-3 bg-white/5 border border-prayxis-accent/60 rounded">
                  <Code2 className="h-4 w-4 text-prayxis-accent mx-auto mb-1" />
                  <div className="text-prayxis-accent font-bold">FRONTEND</div>
                  <div className="text-prayxis-subtle text-[9px] mt-0.5">HTML / CSS / JS / REACT</div>
                </div>

                <div className="p-3 bg-white/5 border border-white/10 rounded">
                  <Server className="h-4 w-4 text-prayxis-offwhite mx-auto mb-1" />
                  <div className="text-prayxis-offwhite font-bold">BACKEND API</div>
                  <div className="text-prayxis-subtle text-[9px] mt-0.5">NODE.JS / EXPRESS</div>
                </div>

                <div className="p-3 bg-white/5 border border-prayxis-accent/60 rounded">
                  <Database className="h-4 w-4 text-prayxis-accent mx-auto mb-1" />
                  <div className="text-prayxis-accent font-bold">DATABASE</div>
                  <div className="text-prayxis-subtle text-[9px] mt-0.5">SQL / REST AUTH</div>
                </div>
              </div>

              {/* Data Flow Line */}
              <div className="w-full p-3 bg-white/5 border border-white/10 rounded flex items-center justify-between text-[9px] text-prayxis-subtle">
                <span>STAGE 01: CLIENT</span>
                <span className="text-prayxis-accent font-bold">────── REST API ──────</span>
                <span>STAGE 45: PRODUCTION</span>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[9px] text-prayxis-subtle">
              <span>STATUS: ACADEMY PROGRAM / IN DEVELOPMENT</span>
              <span className="text-prayxis-accent">PRAYXIS LABS</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
