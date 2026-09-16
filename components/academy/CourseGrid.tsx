'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { COURSES_DATA, CourseProgram } from '@/data/courses';
import { ArrowRight, Sparkles, Loader2, MessageCircle, AlertCircle } from 'lucide-react';
import { getWhatsAppEnrollUrl } from '@/lib/whatsapp';

const CATEGORIES = ['ALL', 'DEVELOPMENT', 'CYBERSECURITY', 'AI'] as const;

export const CourseGrid: React.FC = () => {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<typeof CATEGORIES[number]>('ALL');
  const [enrollingCourseId, setEnrollingCourseId] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);

  const filteredCourses = COURSES_DATA.filter((course) => {
    if (activeCategory === 'ALL') return true;
    if (activeCategory === 'AI' && (course.category === 'AI' || course.id === 'python-basics')) return true;
    return course.category === activeCategory;
  });

  const handleEnrollClick = async (course: CourseProgram) => {
    try {
      setEnrollingCourseId(course.id);
      setAuthError(null);

      // Check current session
      const authRes = await fetch('/api/auth/me');
      if (!authRes.ok) {
        // User is not logged in -> redirect to login with callback
        router.push(`/login?redirect=${encodeURIComponent('/courses')}&enroll=${encodeURIComponent(course.id)}`);
        return;
      }

      const authData = await authRes.json();
      const currentUser = authData.user;

      if (!currentUser) {
        router.push(`/login?redirect=${encodeURIComponent('/courses')}&enroll=${encodeURIComponent(course.id)}`);
        return;
      }

      // Request course enrollment in Database
      let courseSlug = 'full-stack';
      if (course.id === 'basic-ethical-hacking') courseSlug = 'basic-ethical-hacking';
      else if (course.id === 'python-basics') courseSlug = 'python-basics';

      await fetch('/api/courses/enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseId: course.id,
          courseSlug,
          courseTitle: course.title,
          price: course.discountPrice ?? 99,
          offer: course.offerTag ?? 'SPECIAL OFFER',
        }),
      });

      // Generate WhatsApp Direct URL
      const waUrl = getWhatsAppEnrollUrl({
        userId: currentUser.id,
        userName: currentUser.name,
        userEmail: currentUser.email,
        courseTitle: course.title,
        price: course.discountPrice ?? 99,
        offer: course.offerTag ?? 'Special Student Offer',
      });

      // Open WhatsApp in new tab for Admin (7877716367)
      if (typeof window !== 'undefined') {
        window.open(waUrl, '_blank');
      }

      // Redirect student to profile page to view requested course status
      router.push('/student/profile');
    } catch (err: any) {
      console.error('Enrollment error:', err);
      setAuthError('Unable to process enrollment. Please try again.');
    } finally {
      setEnrollingCourseId(null);
    }
  };

  return (
    <section
      id="all-programs"
      aria-label="All Academy Programs List"
      className="relative w-full py-24 px-6 sm:px-12 lg:px-20 bg-prayxis-bg border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-12 space-y-4 max-w-4xl">
          <div className="label-eyebrow text-prayxis-accent">
            05 // ACADEMY CATALOGUE
          </div>
          <h2 className="heading-section font-extrabold text-prayxis-offwhite uppercase tracking-tight">
            ALL ACADEMY <br />
            <span className="text-prayxis-accent">PROGRAMS.</span>
          </h2>
          {authError && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded font-mono text-xs text-red-400 flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              <span>{authError}</span>
            </div>
          )}
        </div>

        {/* Category Filter Chips */}
        <div className="flex flex-wrap items-center gap-2 mb-10 select-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 font-mono text-xs tracking-wider uppercase transition-all border ${
                activeCategory === cat
                  ? 'border-prayxis-accent bg-prayxis-surface text-prayxis-accent cyan-glow-subtle font-bold scale-105'
                  : 'border-white/10 bg-prayxis-surface/40 text-prayxis-muted hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {filteredCourses.map((course) => {
            const isProcessing = enrollingCourseId === course.id;

            return (
              <div
                key={course.id}
                className={`p-6 bg-prayxis-surface/80 border rounded-2xl flex flex-col justify-between space-y-6 backdrop-blur-md transition-all duration-300 relative group hover:border-prayxis-accent/60 ${
                  course.isFeatured
                    ? 'border-prayxis-accent/60 cyan-glow-subtle'
                    : 'border-white/10'
                }`}
              >
                <div className="space-y-4">
                  {/* Header: Code & Status */}
                  <div className="flex items-center justify-between font-mono text-[10px] text-prayxis-subtle">
                    <span className="tracking-widest">{course.code}</span>
                    <span
                      className={`px-2 py-0.5 rounded font-bold uppercase ${
                        course.status === 'ACTIVE PROGRAM' || course.status === 'PROGRAM IN DEVELOPMENT'
                          ? 'bg-prayxis-accent/10 border border-prayxis-accent/40 text-prayxis-accent'
                          : 'bg-white/5 border border-white/10 text-prayxis-subtle'
                      }`}
                    >
                      {course.status}
                    </span>
                  </div>

                  {/* Course Title */}
                  <h3 className="font-mono text-xl font-extrabold text-prayxis-offwhite uppercase group-hover:text-prayxis-accent transition-colors">
                    {course.id === 'full-stack' ? (
                      <Link href="/courses/full-stack" className="hover:underline">
                        {course.title}
                      </Link>
                    ) : course.id === 'python-basics' ? (
                      <Link href="/courses/python" className="hover:underline">
                        {course.title}
                      </Link>
                    ) : course.id === 'basic-ethical-hacking' ? (
                      <Link href="/courses/cyber-security" className="hover:underline">
                        {course.title}
                      </Link>
                    ) : (
                      course.title
                    )}
                  </h3>

                  {/* Course Description */}
                  <p className="body-small text-prayxis-muted leading-relaxed">
                    {course.description}
                  </p>

                  {/* Tech Pills */}
                  <div className="flex flex-wrap gap-1.5 font-mono text-[9px] text-prayxis-subtle pt-2">
                    {course.technologies.map((t) => (
                      <span key={t} className="px-2 py-0.5 bg-white/5 border border-white/10 rounded-sm">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Special Student Offer Badge */}
                <div className="space-y-4 pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between gap-2 p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-[10px] font-bold tracking-wide">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="h-3 w-3 text-amber-400 animate-pulse" />
                      <span>{course.offerTag || 'SPECIAL OFFER'}</span>
                    </span>
                    <span className="px-1.5 py-0.5 bg-amber-500/20 rounded text-[9px] text-amber-300 uppercase">
                      {course.originalPrice && course.discountPrice
                        ? `${Math.round(((course.originalPrice - course.discountPrice) / course.originalPrice) * 100)}% OFF`
                        : 'ACTIVE'}
                    </span>
                  </div>

                  {/* Pricing Display */}
                  <div className="flex items-baseline justify-between font-mono">
                    <div className="flex items-baseline gap-2.5">
                      {course.priceHidden ? (
                        <span className="text-xl font-extrabold text-amber-400 tracking-tight">
                          PRICE UPON REQUEST
                        </span>
                      ) : (
                        <>
                          <span className="text-3xl font-extrabold text-prayxis-accent tracking-tight">
                            ₹{course.discountPrice}
                          </span>
                          <span className="text-sm font-semibold text-prayxis-subtle line-through opacity-70">
                            ₹{course.originalPrice ?? 999}
                          </span>
                        </>
                      )}
                    </div>
                    <span className="text-[10px] text-prayxis-muted uppercase tracking-wider">
                      {course.priceHidden ? 'EXECUTIVE ACCESS' : 'LIMITED TIME'}
                    </span>
                  </div>

                  {/* Duration & Hours Meta */}
                  <div className="flex items-center justify-between font-mono text-xs text-prayxis-muted pt-1 border-t border-white/5">
                    <span className="text-prayxis-offwhite font-bold">{course.duration}</span>
                    <span className="text-prayxis-subtle">{course.hours}</span>
                  </div>

                  {/* Enroll Now Button (Triggers WhatsApp + Redirect to Profile) */}
                  <button
                    type="button"
                    onClick={() => handleEnrollClick(course)}
                    disabled={isProcessing}
                    className="w-full py-3 px-4 bg-prayxis-accent hover:bg-white text-black font-mono text-xs font-extrabold uppercase rounded-lg transition-all duration-300 flex items-center justify-center gap-2 cyan-glow cursor-pointer group/btn shadow-lg disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>PROCESSING...</span>
                      </>
                    ) : (
                      <>
                        <MessageCircle className="h-4 w-4 fill-black text-black" />
                        <span>ENROLL NOW →</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
