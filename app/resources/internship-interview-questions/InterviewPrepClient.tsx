'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { ArrowLeft, CheckCircle2, FileText, Award } from 'lucide-react';

export default function InterviewPrepClient() {
  return (
    <div className="relative min-h-screen bg-[#050507] text-slate-100 flex flex-col justify-between select-none font-sans">
      <Navbar />

      <main className="relative z-10 flex-1 pt-32 pb-24 px-4 sm:px-8 lg:px-12 max-w-4xl mx-auto w-full space-y-12">
        
        <Link
          href="/resources"
          className="inline-flex items-center gap-2 font-mono text-xs font-bold text-amber-400 hover:text-white uppercase transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>BACK TO ALL RESOURCES</span>
        </Link>

        {/* Article Header */}
        <div className="space-y-4 border-b border-white/10 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded text-xs font-mono font-bold text-amber-400 uppercase">
            <span>INTERVIEW PREPARATION</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight leading-tight">
            VIRTUAL INTERNSHIP TECHNICAL INTERVIEW GUIDE
          </h1>

          <p className="text-base text-slate-400 font-sans leading-relaxed">
            Ace your software engineering virtual internship applications by preparing core technical topics, structuring your resume, and demonstrating real project work.
          </p>
        </div>

        {/* Article Body */}
        <div className="space-y-10 text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
          
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold font-mono text-white uppercase flex items-center gap-2">
              <span className="text-amber-400">01.</span> KEY TECHNICAL TOPICS TO REVIEW
            </h2>
            <p>
              Be prepared to explain basic data structures (arrays, hash maps, linked lists), HTTP methods (GET, POST, PUT, DELETE), version control with Git, and database queries.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold font-mono text-white uppercase flex items-center gap-2">
              <span className="text-amber-400">02.</span> HOW TO STRUCTURE A STUDENT RESUME
            </h2>
            <p>
              Highlight hands-on internship projects, live GitHub repository links, technical skills, and verified certificates. Keep the format clean, ATS-friendly, and concise.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold font-mono text-white uppercase flex items-center gap-2">
              <span className="text-amber-400">03.</span> SHOWCASING INTERNSHIP CERTIFICATES
            </h2>
            <p>
              When applying for full-time junior positions, present your verified internship certificate with its unique QR link to validate your industry training.
            </p>
          </section>

        </div>

        {/* CTA Box */}
        <div className="p-8 bg-[#0d1117] border border-amber-500/30 rounded-2xl space-y-4 text-center">
          <h3 className="text-xl font-bold font-mono text-white uppercase">
            BUILD YOUR RESUME WITH PRAYXIS INTERNSHIPS
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            Get practical project experience and earn a QR-verified certificate. Explore all available tracks on the <Link href="/internship" className="text-amber-400 underline font-bold">PRAYXIS Internship Portal</Link>.
          </p>
          <div>
            <MagneticButton href="/register" variant="primary" showArrow={true} className="py-3 px-8 text-sm">
              Apply for Internship Today
            </MagneticButton>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
