'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ReactLenis } from 'lenis/react';
import { gsap, ScrollTrigger } from '@/animations/gsap';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import {
  Terminal,
  CheckCircle2,
  BookOpen,
  Shield,
  Code2,
  Award,
  ArrowRight,
  Sparkles,
  HelpCircle,
  Users,
  Clock,
  Layers,
  FileCheck,
} from 'lucide-react';
import { getWhatsAppEnrollUrl } from '@/lib/whatsapp';

const FAQS = [
  {
    question: 'Who is eligible to apply on the PRAYXIS Internship Portal?',
    answer:
      'Students enrolled in B.Tech, M.Tech, BCA, MCA, BBA, MBA, or Diploma programs across all engineering branches and academic years are eligible to apply.',
  },
  {
    question: 'What internship durations are available on PRAYXIS Internship Portal?',
    answer:
      'We offer 3 distinct duration tracks: 15-Day Fast-Track (₹99), 45-Day Production Master (₹199), and 3 to 6-Month Flagship Live Class Specialization (₹5,999).',
  },
  {
    question: 'Are PRAYXIS internship certificates official and verifiable?',
    answer:
      'Yes! Every certificate issued by Prayxis Foundation contains a unique SHA-256 cryptographic hash ID that can be verified live on our verification portal at prayxis.in.',
  },
  {
    question: 'Do I need prior coding experience to join?',
    answer:
      'No. Our internship tracks are beginner-friendly and designed to take you from foundational basics up to production-grade project execution.',
  },
  {
    question: 'How do I get mentor support during the internship?',
    answer:
      'All interns get direct 1:1 mentor assistance via WhatsApp and daily learning console code reviews for instant bug resolution.',
  },
];

export default function InternshipClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    const updateLenis = () => {
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
      <div className="relative min-h-screen bg-prayxis-bg text-prayxis-offwhite selection:bg-prayxis-accent selection:text-black overflow-x-hidden font-sans">
        <Navbar />

        <main className="relative z-10 pt-32 pb-24">
          {/* HERO SECTION */}
          <section className="px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto mb-20">
            <nav aria-label="Breadcrumb" className="mb-6 font-mono text-xs text-prayxis-muted flex items-center gap-2 select-none">
              <Link href="/" className="hover:text-prayxis-offwhite transition-colors">PRAYXIS</Link>
              <span>/</span>
              <span className="text-prayxis-accent font-bold">PRAYXIS INTERNSHIP PORTAL</span>
            </nav>

            <div className="inline-flex items-center gap-2 px-3 py-1 bg-prayxis-accent/10 border border-prayxis-accent/40 rounded-full font-mono text-xs text-prayxis-accent uppercase tracking-wider font-bold mb-6">
              <Terminal className="h-3.5 w-3.5" />
              <span>OFFICIAL PRAYXIS INTERNSHIP PORTAL</span>
            </div>

            <h1 className="text-[clamp(32px,5vw,64px)] font-extrabold text-prayxis-offwhite uppercase tracking-tight leading-[1.08] mb-6 max-w-4xl">
              PRAYXIS INTERNSHIP PORTAL — <br />
              <span className="text-prayxis-accent">INDUSTRIAL VIRTUAL TRAINING</span>
            </h1>

            <p className="body-large text-prayxis-muted max-w-3xl leading-relaxed mb-10">
              Welcome to the official <strong>PRAYXIS Internship Portal</strong> by Prayxis Foundation. Gain hands-on, live project engineering training in Full Stack Development, Basic Ethical Hacking, Python &amp; DSA, and AI &amp; Generative AI with cryptographically verifiable certificates.
            </p>

            <div className="flex flex-wrap items-center gap-4 font-mono text-xs">
              <Link
                href="/register"
                className="px-8 py-4 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-extrabold uppercase tracking-wider rounded-full transition-all shadow-lg shadow-amber-500/25 flex items-center gap-2 cursor-pointer"
              >
                <span>APPLY NOW FOR INTERNSHIP →</span>
              </Link>

              <Link
                href="/courses/full-stack"
                className="px-6 py-4 bg-white/5 border border-white/10 hover:border-prayxis-accent/60 text-prayxis-offwhite font-bold uppercase tracking-wider rounded-full transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>FULL STACK SYLLABUS →</span>
              </Link>
            </div>
          </section>

          {/* INTERNSHIP PROGRAM DURATION TRACKS */}
          <section className="px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto mb-20">
            <div className="mb-12 space-y-3">
              <div className="font-mono text-xs text-prayxis-accent font-bold uppercase tracking-wider">
                01 // AVAILABLE INTERNSHIP TRACKS
              </div>
              <h2 className="font-mono text-3xl font-extrabold text-prayxis-offwhite uppercase">
                PRAYXIS INTERNSHIP DURATION TRACKS
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 font-mono">
              {/* 15 Days Track */}
              <div className="p-8 bg-prayxis-surface/90 border border-white/10 hover:border-prayxis-accent/50 rounded-2xl space-y-6 transition-all flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-prayxis-accent/10 border border-prayxis-accent/40 rounded-full text-prayxis-accent text-xs font-bold">
                      15 DAYS FAST-TRACK
                    </span>
                    <span className="text-amber-400 font-extrabold text-lg">₹99</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-prayxis-offwhite uppercase">
                    FAST-TRACK FOUNDATION
                  </h3>
                  <p className="text-xs text-prayxis-muted font-sans leading-relaxed">
                    Designed for students seeking quick hands-on project exposure and rapid certificate generation for academic submission.
                  </p>
                  <ul className="space-y-2 text-xs text-prayxis-muted font-sans pt-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-prayxis-accent flex-shrink-0" />
                      <span>15-Day Live Guided Curriculum</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-prayxis-accent flex-shrink-0" />
                      <span>Hands-on Capstone Module</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-prayxis-accent flex-shrink-0" />
                      <span>Verifiable Digital Certificate</span>
                    </li>
                  </ul>
                </div>
                <Link
                  href="/register"
                  className="w-full py-3 bg-prayxis-accent/10 border border-prayxis-accent/40 text-prayxis-accent hover:bg-prayxis-accent hover:text-black font-bold uppercase rounded text-center transition-all mt-4 block"
                >
                  ENROLL FOR ₹99 →
                </Link>
              </div>

              {/* 45 Days Master Track */}
              <div className="p-8 bg-prayxis-surface/90 border-2 border-prayxis-accent/80 rounded-2xl space-y-6 transition-all flex flex-col justify-between cyan-glow-subtle relative overflow-hidden">
                <div className="absolute top-3 right-3 px-2.5 py-0.5 bg-amber-500 text-black font-extrabold text-[9px] uppercase rounded">
                  MOST POPULAR
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-prayxis-accent/20 border border-prayxis-accent text-prayxis-accent text-xs font-bold">
                      45 DAYS MASTER TRACK
                    </span>
                    <span className="text-amber-400 font-extrabold text-2xl">₹199</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-prayxis-offwhite uppercase">
                    PRODUCTION MASTER INTERNSHIP
                  </h3>
                  <p className="text-xs text-prayxis-muted font-sans leading-relaxed">
                    Comprehensive full-stack &amp; cybersecurity training covering production API architecture, React, Node.js, and cloud deployment.
                  </p>
                  <ul className="space-y-2 text-xs text-prayxis-muted font-sans pt-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-prayxis-accent flex-shrink-0" />
                      <span>45-Day Production Architecture</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-prayxis-accent flex-shrink-0" />
                      <span>1:1 WhatsApp Mentor Assistance</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-prayxis-accent flex-shrink-0" />
                      <span>Live SHA-256 Verifiable Credential</span>
                    </li>
                  </ul>
                </div>
                <Link
                  href="/courses/full-stack"
                  className="w-full py-3.5 bg-prayxis-accent text-black font-extrabold uppercase rounded text-center hover:bg-white transition-all cyan-glow mt-4 block"
                >
                  EXPLORE MASTER TRACK (₹199) →
                </Link>
              </div>

              {/* 3 Months Track */}
              <div className="p-8 bg-prayxis-surface/90 border border-white/10 hover:border-prayxis-accent/50 rounded-2xl space-y-6 transition-all flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-prayxis-accent/10 border border-prayxis-accent/40 rounded-full text-prayxis-accent text-xs font-bold">
                      3-6 MONTHS LIVE SPECIALIZATION
                    </span>
                    <span className="text-amber-400 font-extrabold text-lg">₹5,999</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-prayxis-offwhite uppercase">
                    EXECUTIVE LIVE SPECIALIZATION
                  </h3>
                  <p className="text-xs text-prayxis-muted font-sans leading-relaxed">
                    Advanced engineering flagship track with interactive live classes, microservices, systems design, and capstone deployment.
                  </p>
                  <ul className="space-y-2 text-xs text-prayxis-muted font-sans pt-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-prayxis-accent flex-shrink-0" />
                      <span>Live Interactive Classes &amp; Mentorship</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-prayxis-accent flex-shrink-0" />
                      <span>Microservices &amp; System Design</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-prayxis-accent flex-shrink-0" />
                      <span>Honor Grade Verifiable Certificate</span>
                    </li>
                  </ul>
                </div>
                <Link
                  href="/register"
                  className="w-full py-3 bg-prayxis-accent/10 border border-prayxis-accent/40 text-prayxis-accent hover:bg-prayxis-accent hover:text-black font-bold uppercase rounded text-center transition-all mt-4 block"
                >
                  ENROLL FOR ₹5,999 →
                </Link>
              </div>
            </div>
          </section>

          {/* ELIGIBILITY & WHO CAN JOIN */}
          <section className="px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto mb-20">
            <div className="p-8 sm:p-12 bg-prayxis-surface/90 border border-white/10 rounded-3xl backdrop-blur-md grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-7 space-y-6">
                <div className="font-mono text-xs text-prayxis-accent font-bold uppercase tracking-wider">
                  02 // ELIGIBILITY CRITERIA
                </div>
                <h2 className="font-mono text-3xl font-extrabold text-prayxis-offwhite uppercase">
                  WHO CAN APPLY ON PRAYXIS INTERNSHIP PORTAL?
                </h2>
                <p className="body-medium text-prayxis-muted leading-relaxed font-sans">
                  The PRAYXIS Internship Portal is open to engineering students, IT graduates, and coding aspirants across India. We believe in practical merit and project execution over theoretical degrees.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                  <div className="p-3 bg-white/5 border border-white/10 rounded-lg flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-prayxis-accent" />
                    <span>B.Tech &amp; M.Tech Students</span>
                  </div>
                  <div className="p-3 bg-white/5 border border-white/10 rounded-lg flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-prayxis-accent" />
                    <span>BCA &amp; MCA Aspirants</span>
                  </div>
                  <div className="p-3 bg-white/5 border border-white/10 rounded-lg flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-prayxis-accent" />
                    <span>Diploma &amp; Polytechnic Candidates</span>
                  </div>
                  <div className="p-3 bg-white/5 border border-white/10 rounded-lg flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-prayxis-accent" />
                    <span>All Academic Years (1st to 4th Year)</span>
                  </div>
                </div>
              </div>

              <div className="md:col-span-5 flex justify-center">
                <div className="p-6 bg-[#07090e] border border-prayxis-accent/40 rounded-2xl space-y-4 font-mono text-xs text-prayxis-muted w-full max-w-sm">
                  <div className="text-prayxis-accent font-bold uppercase text-sm border-b border-white/10 pb-2">
                    APPLICATION SUMMARY
                  </div>
                  <div className="flex justify-between">
                    <span>Mode:</span>
                    <strong className="text-prayxis-offwhite">100% Online / Virtual</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Pre-requisites:</span>
                    <strong className="text-prayxis-offwhite">Basic Computer Literacy</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Certificate:</span>
                    <strong className="text-emerald-400">SHA-256 Verified</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Mentor Assistance:</span>
                    <strong className="text-amber-400">1:1 WhatsApp Daily</strong>
                  </div>
                  <Link
                    href="/register"
                    className="w-full py-3 bg-prayxis-accent text-black font-extrabold uppercase rounded text-center hover:bg-white transition-all block mt-2"
                  >
                    START APPLICATION →
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* 4-STEP APPLICATION PROCESS */}
          <section className="px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto mb-20">
            <div className="mb-12 space-y-3 text-center max-w-3xl mx-auto">
              <div className="font-mono text-xs text-prayxis-accent font-bold uppercase tracking-wider">
                03 // HOW IT WORKS
              </div>
              <h2 className="font-mono text-3xl font-extrabold text-prayxis-offwhite uppercase">
                4-STEP APPLICATION PROCESS
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-mono">
              <div className="p-6 bg-prayxis-surface/90 border border-white/10 rounded-2xl space-y-3">
                <div className="h-10 w-10 bg-prayxis-accent/10 border border-prayxis-accent/40 rounded-lg flex items-center justify-center text-prayxis-accent font-bold text-sm">
                  01
                </div>
                <h3 className="font-bold text-prayxis-offwhite uppercase text-sm">Select Track &amp; Duration</h3>
                <p className="text-xs text-prayxis-muted font-sans leading-relaxed">
                  Choose between Full Stack, Ethical Hacking, Python, or AI in 15D, 45D, or 3M options.
                </p>
              </div>

              <div className="p-6 bg-prayxis-surface/90 border border-white/10 rounded-2xl space-y-3">
                <div className="h-10 w-10 bg-prayxis-accent/10 border border-prayxis-accent/40 rounded-lg flex items-center justify-center text-prayxis-accent font-bold text-sm">
                  02
                </div>
                <h3 className="font-bold text-prayxis-offwhite uppercase text-sm">Create Free Account</h3>
                <p className="text-xs text-prayxis-muted font-sans leading-relaxed">
                  Register your student profile on the PRAYXIS Internship Portal to get immediate access.
                </p>
              </div>

              <div className="p-6 bg-prayxis-surface/90 border border-white/10 rounded-2xl space-y-3">
                <div className="h-10 w-10 bg-prayxis-accent/10 border border-prayxis-accent/40 rounded-lg flex items-center justify-center text-prayxis-accent font-bold text-sm">
                  03
                </div>
                <h3 className="font-bold text-prayxis-offwhite uppercase text-sm">Access Learning Console</h3>
                <p className="text-xs text-prayxis-muted font-sans leading-relaxed">
                  Complete daily modules, track your active learning timer, and interact with mentors.
                </p>
              </div>

              <div className="p-6 bg-prayxis-surface/90 border border-white/10 rounded-2xl space-y-3">
                <div className="h-10 w-10 bg-prayxis-accent/10 border border-prayxis-accent/40 rounded-lg flex items-center justify-center text-prayxis-accent font-bold text-sm">
                  04
                </div>
                <h3 className="font-bold text-prayxis-offwhite uppercase text-sm">Build &amp; Get Certified</h3>
                <p className="text-xs text-prayxis-muted font-sans leading-relaxed">
                  Submit your capstone project and receive a SHA-256 verifiable digital certificate.
                </p>
              </div>
            </div>
          </section>

          {/* FREQUENTLY ASKED QUESTIONS (FAQS) */}
          <section className="px-6 sm:px-12 lg:px-20 max-w-4xl mx-auto mb-20">
            <div className="mb-12 space-y-3 text-center">
              <div className="font-mono text-xs text-prayxis-accent font-bold uppercase tracking-wider">
                04 // FREQUENTLY ASKED QUESTIONS
              </div>
              <h2 className="font-mono text-3xl font-extrabold text-prayxis-offwhite uppercase">
                STUDENT INTERNSHIP FAQS
              </h2>
            </div>

            <div className="space-y-4">
              {FAQS.map((faq, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-prayxis-surface/90 border border-white/10 rounded-2xl space-y-3 transition-all cursor-pointer"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                >
                  <div className="flex items-center justify-between font-mono text-sm font-bold text-prayxis-offwhite">
                    <span className="flex items-center gap-2">
                      <HelpCircle className="h-4 w-4 text-prayxis-accent flex-shrink-0" />
                      <span>{faq.question}</span>
                    </span>
                    <span className="text-prayxis-accent text-lg">{openFaq === idx ? '−' : '+'}</span>
                  </div>
                  {openFaq === idx && (
                    <p className="text-xs text-prayxis-muted font-sans leading-relaxed pt-2 border-t border-white/5">
                      {faq.answer}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* FINAL CTA */}
          <section className="px-6 sm:px-12 lg:px-20 max-w-5xl mx-auto">
            <div className="p-10 sm:p-14 bg-gradient-to-r from-[#0d1017] via-[#111622] to-[#0d1017] border border-prayxis-accent/60 rounded-3xl text-center space-y-6 cyan-glow">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-prayxis-accent/10 border border-prayxis-accent/40 rounded-full font-mono text-xs text-prayxis-accent uppercase tracking-wider font-bold">
                <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                <span>SPECIAL STUDENT OFFER ACTIVE</span>
              </div>
              <h2 className="font-mono text-3xl sm:text-4xl font-extrabold text-prayxis-offwhite uppercase tracking-tight">
                READY TO START YOUR TECHNICAL INTERNSHIP?
              </h2>
              <p className="text-sm text-prayxis-muted font-sans max-w-xl mx-auto leading-relaxed">
                Join over 2,00,000+ engineering students building production-grade capstone projects on the <strong>PRAYXIS Internship Portal</strong>.
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-center gap-4 font-mono text-xs">
                <Link
                  href="/register"
                  className="px-8 py-4 bg-prayxis-accent text-black font-extrabold uppercase rounded-full hover:bg-white transition-all shadow-lg cyan-glow cursor-pointer"
                >
                  CREATE FREE ACCOUNT →
                </Link>
                <Link
                  href="/courses"
                  className="px-6 py-4 bg-white/5 border border-white/10 hover:border-prayxis-accent/60 text-prayxis-offwhite font-bold uppercase rounded-full transition-all cursor-pointer"
                >
                  VIEW ALL COURSES →
                </Link>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </ReactLenis>
  );
}
