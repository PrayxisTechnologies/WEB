'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Play, Lock, CheckCircle2, RefreshCw, MessageCircle } from 'lucide-react';
import { COURSES_DATA } from '@/data/courses';
import { getWhatsAppEnrollUrl } from '@/lib/whatsapp';

export default function StudentCoursesClient() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchUserData = async () => {
    try {
      setRefreshing(true);
      const res = await fetch('/api/auth/me');
      if (res.ok) {
        const data = await res.json();
        setCurrentUser(data.user);
      } else {
        setCurrentUser(null);
      }
    } catch (err) {
      setCurrentUser(null);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-prayxis-bg flex items-center justify-center font-mono text-xs text-prayxis-accent">
        <span>LOADING ACADEMY COURSES...</span>
      </div>
    );
  }

  const isApprovedUser = currentUser?.isApproved || currentUser?.role === 'ADMIN';

  return (
    <div className="relative min-h-screen bg-prayxis-bg text-prayxis-offwhite flex flex-col justify-between select-none">
      <Navbar />

      <main className="relative z-10 flex-1 pt-32 pb-20 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto w-full space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="font-mono text-xs text-prayxis-accent font-bold uppercase">
              PRAYXIS / ACADEMY PORTAL
            </div>
            <h1 className="font-mono text-3xl font-extrabold text-prayxis-offwhite uppercase">
              MY COURSES & ENROLLMENT
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={fetchUserData}
              className="px-4 py-2 bg-white/5 border border-white/10 hover:border-prayxis-accent/50 text-prayxis-offwhite font-mono text-xs uppercase rounded flex items-center gap-2 cursor-pointer"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? 'animate-spin' : ''}`} />
              <span>REFRESH STATUS</span>
            </button>
            <Link
              href="/student/profile"
              className="px-4 py-2 bg-prayxis-accent/10 border border-prayxis-accent/40 text-prayxis-accent font-mono text-xs font-bold uppercase rounded hover:bg-prayxis-accent hover:text-black transition-all cursor-pointer"
            >
              VIEW PROFILE →
            </Link>
          </div>
        </div>

        {/* Courses List */}
        <div className="space-y-6">
          {COURSES_DATA.map((course) => {
            let courseSlug = 'full-stack';
            if (course.id === 'basic-ethical-hacking') courseSlug = 'basic-ethical-hacking';
            else if (course.id === 'python-basics') courseSlug = 'python-basics';

            const enr = currentUser?.enrollments?.find((e: any) => e.courseSlug === courseSlug);
            const isEnrolled = (enr?.status === 'ENROLLED' || currentUser?.role === 'ADMIN') && isApprovedUser;
            const isRequested = Boolean(enr && (enr.status === 'REQUESTED' || !isApprovedUser));

            return (
              <div
                key={course.id}
                className="p-8 bg-prayxis-surface/90 border border-white/10 hover:border-prayxis-accent/40 rounded-2xl backdrop-blur-md grid grid-cols-1 md:grid-cols-12 gap-8 items-center cyan-glow-subtle transition-all group"
              >
                <div className="md:col-span-8 space-y-4">
                  <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase">
                    <span className="px-3 py-1 bg-prayxis-accent/10 border border-prayxis-accent/40 rounded-full text-prayxis-accent font-bold">
                      {course.code}
                    </span>
                    <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-prayxis-offwhite">
                      {course.duration}
                    </span>
                    <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-300 font-bold">
                      {course.priceHidden ? 'EXECUTIVE ACCESS' : `SPECIAL OFFER: ₹${course.discountPrice}`}
                    </span>
                  </div>

                  <h2 className="font-mono text-2xl font-extrabold text-prayxis-offwhite uppercase group-hover:text-prayxis-accent transition-colors">
                    {course.title}
                  </h2>

                  <p className="body-small text-prayxis-muted leading-relaxed">
                    {course.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 font-mono text-[9px] text-prayxis-subtle pt-1">
                    {course.technologies.map((t) => (
                      <span key={t} className="px-2 py-0.5 bg-white/5 border border-white/10 rounded-sm">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-4 flex flex-col gap-3 justify-end font-mono text-xs">
                  {isEnrolled ? (
                    <>
                      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/40 rounded text-emerald-400 font-bold text-center justify-center">
                        <CheckCircle2 className="h-4 w-4" />
                        <span>UNLOCKED / ACTIVE</span>
                      </div>
                      <Link
                        href={
                          courseSlug === 'full-stack'
                            ? '/student/courses/full-stack'
                            : courseSlug === 'python-basics'
                            ? '/student/courses/python-basics'
                            : '/student/profile'
                        }
                        className="w-full px-6 py-3.5 bg-prayxis-accent text-black font-bold uppercase rounded text-center hover:bg-white transition-colors flex items-center justify-center gap-2 cyan-glow cursor-pointer"
                      >
                        <Play className="h-4 w-4 fill-black" />
                        <span>OPEN CURRICULUM & DAYS →</span>
                      </Link>
                    </>
                  ) : isRequested ? (
                    <>
                      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-500/10 border border-yellow-500/40 rounded text-yellow-400 font-bold text-center justify-center">
                        <Lock className="h-4 w-4" />
                        <span>PENDING APPROVAL</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          if (!currentUser) return;
                          const waUrl = getWhatsAppEnrollUrl({
                            userId: currentUser.id,
                            userName: currentUser.name,
                            userEmail: currentUser.email,
                            courseTitle: course.title,
                            price: 99,
                            offer: 'Ganesh Chaturthi Special Offer',
                          });
                          window.open(waUrl, '_blank');
                        }}
                        className="w-full px-4 py-3 bg-emerald-500 text-black font-extrabold uppercase rounded text-center hover:bg-white transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                      >
                        <MessageCircle className="h-4 w-4 fill-black text-black" />
                        <span>AGAIN REQUEST (7877716367) 📲</span>
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={async () => {
                        if (!currentUser) {
                          router.push(`/login?redirect=/courses&enroll=${course.id}`);
                          return;
                        }
                        await fetch('/api/courses/enroll', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                            courseSlug,
                            courseTitle: course.title,
                            price: 99,
                            offer: 'GANESH CHATURTHI OFFER',
                          }),
                        });
                        const waUrl = getWhatsAppEnrollUrl({
                          userId: currentUser.id,
                          userName: currentUser.name,
                          userEmail: currentUser.email,
                          courseTitle: course.title,
                          price: 99,
                          offer: 'Ganesh Chaturthi Special Offer',
                        });
                        window.open(waUrl, '_blank');
                        fetchUserData();
                      }}
                      className="w-full px-4 py-3.5 bg-prayxis-accent text-black font-extrabold uppercase rounded text-center hover:bg-white transition-all flex items-center justify-center gap-2 cyan-glow cursor-pointer"
                    >
                      <MessageCircle className="h-4 w-4 fill-black text-black" />
                      <span>ENROLL FOR ₹99 →</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
