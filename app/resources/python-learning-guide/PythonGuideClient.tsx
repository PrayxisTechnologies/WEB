'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { ArrowLeft, CheckCircle2, Code, Terminal } from 'lucide-react';

export default function PythonGuideClient() {
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
            <span>PYTHON GUIDE & PROJECTS</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight leading-tight">
            PYTHON PROGRAMMING GUIDE & PROJECT IDEAS FOR STUDENTS
          </h1>

          <p className="text-base text-slate-400 font-sans leading-relaxed">
            Python is one of the most versatile and beginner-friendly programming languages. Here is how to master Python efficiently and build real projects.
          </p>
        </div>

        {/* Article Body */}
        <div className="space-y-10 text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
          
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold font-mono text-white uppercase flex items-center gap-2">
              <span className="text-amber-400">01.</span> MASTER CORE PYTHON SYNTAX
            </h2>
            <p>
              Focus on fundamental building blocks: variables, data types, conditional logic (if-else), loops (for, while), functions, and error handling with try-except blocks.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold font-mono text-white uppercase flex items-center gap-2">
              <span className="text-amber-400">02.</span> DATA STRUCTURES & OOPS
            </h2>
            <p>
              Learn Python native data structures: lists, tuples, dictionaries, and sets. Progress to Object-Oriented Programming (OOPs) to structure maintainable code with classes and inheritance.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold font-mono text-white uppercase flex items-center gap-2">
              <span className="text-amber-400">03.</span> 3 RESUME-READY PYTHON PROJECTS
            </h2>
            <ul className="space-y-2 font-mono text-xs sm:text-sm text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0" />
                <span>CLI Student Management System (File I/O & OOPs)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0" />
                <span>Automated Web Scraper & Data Parser</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0" />
                <span>REST API Consumer & Weather Dashboard</span>
              </li>
            </ul>
          </section>

        </div>

        {/* CTA Box */}
        <div className="p-8 bg-[#0d1117] border border-amber-500/30 rounded-2xl space-y-4 text-center">
          <h3 className="text-xl font-bold font-mono text-white uppercase">
            ENROLL IN PRAYXIS PYTHON INTERNSHIP
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            Get hands-on mentorship, structured curriculum, and a verified certificate by joining the <Link href="/courses/python" className="text-amber-400 underline font-bold">Python Virtual Internship Track</Link>.
          </p>
          <div>
            <MagneticButton href="/register" variant="primary" showArrow={true} className="py-3 px-8 text-sm">
              Apply for Python Track Now
            </MagneticButton>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
