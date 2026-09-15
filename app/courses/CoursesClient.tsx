'use client';

import React, { useEffect, useState } from 'react';
import { ReactLenis } from 'lenis/react';
import { gsap, ScrollTrigger } from '@/animations/gsap';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

// Academy Hub Modular Sections
import { AcademyHero } from '@/components/academy/AcademyHero';
import { FeaturedCourse } from '@/components/academy/FeaturedCourse';
import { LearningMethod } from '@/components/academy/LearningMethod';
import { CurriculumPreview } from '@/components/academy/CurriculumPreview';
import { AcademySpecs } from '@/components/academy/AcademySpecs';
import { CourseGrid } from '@/components/academy/CourseGrid';
import { AcademyCTA } from '@/components/academy/AcademyCTA';

export default function CoursesClient() {
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

        {/* Main Content Sections */}
        <main className="relative z-10">
          <AcademyHero />
          <FeaturedCourse />
          <LearningMethod />
          <CurriculumPreview />
          <AcademySpecs />
          <CourseGrid />
          <AcademyCTA />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </ReactLenis>
  );
}
