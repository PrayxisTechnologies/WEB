'use client';

import React, { useEffect, useState } from 'react';
import { ReactLenis } from 'lenis/react';
import { gsap, ScrollTrigger } from '@/animations/gsap';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CustomCursor } from '@/components/ui/CustomCursor';

// Course Overview Modular Components
import { CourseOverviewHero } from '@/components/academy/CourseOverviewHero';
import { CourseSkills } from '@/components/academy/CourseSkills';
import { CourseRoadmap } from '@/components/academy/CourseRoadmap';
import { LearningCycle } from '@/components/academy/LearningCycle';
import { CourseProjects } from '@/components/academy/CourseProjects';
import { CapstoneSection } from '@/components/academy/CapstoneSection';
import { CourseAudience } from '@/components/academy/CourseAudience';
import { CourseOutcome } from '@/components/academy/CourseOutcome';
import { CourseStartCTA } from '@/components/academy/CourseStartCTA';

export default function FullStackCourseOverviewPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);

    const updateLenis = (time: number) => {
      ScrollTrigger.update();
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion) {
      ScrollTrigger.batch('.reveal-section', {
        onEnter: (batch) => {
          gsap.fromTo(
            batch,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', stagger: 0.15 }
          );
        },
        once: true,
      });
    }

    return () => {
      gsap.ticker.remove(updateLenis);
    };
  }, []);

  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.2, smoothWheel: true }}>
      <div className="relative min-h-screen bg-prayxis-bg text-prayxis-offwhite selection:bg-prayxis-accent selection:text-black overflow-x-hidden">
        {/* Header Navigation */}
        <Navbar />

        {/* Main Overview Content */}
        <main className="relative z-10">
          <CourseOverviewHero />
          <CourseSkills />
          <CourseRoadmap />
          <LearningCycle />
          <CourseProjects />
          <CapstoneSection />
          <CourseAudience />
          <CourseOutcome />
          <CourseStartCTA />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </ReactLenis>
  );
}
