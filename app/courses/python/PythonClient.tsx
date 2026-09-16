'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MagneticButton } from '@/components/ui/MagneticButton';
import {
  Code,
  CheckCircle2,
  Clock,
  Award,
  Terminal,
  ChevronDown,
  ArrowRight,
  BookOpen,
  FileCode,
  Cpu,
  Layers,
  HelpCircle,
} from 'lucide-react';

const SYLLABUS_WEEKS = [
  {
    week: 'MODULE 01: PYTHON FUNDAMENTALS & LOGIC BUILDING',
    topics: ['Python Installation & VS Code Setup', 'Variables, Data Types & Operators', 'Control Flow: If-Else & Loops', 'Functional Programming Basics'],
  },
  {
    week: 'MODULE 02: DATA STRUCTURES & STRING PROCESSING',
    topics: ['Lists, Tuples, Sets & Dictionaries', 'String Manipulation & Regex Basics', 'List Comprehensions & Lambdas', 'Exception & Error Handling'],
  },
  {
    week: 'MODULE 03: OBJECT ORIENTED PROGRAMMING & FILE I/O',
    topics: ['Classes, Objects & Attributes', 'Inheritance & Polymorphism', 'File I/O: Reading & Writing Files', 'Module Architecture & Packages'],
  },
  {
    week: 'MODULE 04: AUTOMATION & MINI-PROJECT CAPSTONE',
    topics: ['Working with APIs & JSON Data', 'Basic Web Scraping & File Automation', 'Building a Capstone CLI Application', 'Code Documentation & Project Submission'],
  },
];

const FAQS = [
  {
    q: 'Do I need prior coding experience to join the Python internship?',
    a: 'No prior programming experience is required. The curriculum starts from absolute zero and builds foundational logic before progressing to advanced OOPs concepts.',
  },
  {
    q: 'What is the duration and fee for the Python Track?',
    a: 'The Python Internship offers flexible tracks: 15-Day Bootcamp (₹99) or 45-Day Internship Track (₹199 special offer price).',
  },
  {
    q: 'Will I receive a verified certificate upon completion?',
    a: 'Yes, after submitting the capstone project and completing the required learning modules, you will receive a QR-verified Internship Completion Certificate.',
  },
  {
    q: 'How are lessons and project assignments delivered?',
    a: 'All modules are delivered online through the PRAYXIS Internship Portal student console with daily progress tracking and mentor assistance.',
  },
];

export default function PythonClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="relative min-h-screen bg-[#050507] text-slate-100 flex flex-col justify-between select-none font-sans">
      <Navbar />

      <main className="relative z-10 flex-1 pt-32 pb-24 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto w-full space-y-20">
        
        {/* Hero Section */}
        <div className="space-y-6 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-amber-500/10 border border-amber-500/30 rounded-full text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
            <Code className="h-4 w-4" />
            <span>PRAYXIS INTERNSHIP PORTAL // PYTHON SPECIALIZATION</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight uppercase text-white leading-tight">
            PYTHON PROGRAMMING & DATA STRUCTURES VIRTUAL INTERNSHIP
          </h1>

          <p className="text-base sm:text-lg text-slate-400 font-sans max-w-3xl mx-auto leading-relaxed">
            Learn Python from first principles, master object-oriented programming, build practical automation tools, and earn a verified industrial internship certificate.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton href="/register" variant="primary" showArrow={true} className="py-3 px-8 text-sm">
              Enroll Now (₹99)
            </MagneticButton>
            <Link
              href="/internship"
              className="px-6 py-3 bg-white/5 border border-white/10 hover:border-amber-400/50 text-slate-300 font-mono text-xs font-bold uppercase rounded-xl transition-all flex items-center gap-2"
            >
              <span>Explore All Tracks</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Highlights Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-mono">
          <div className="p-6 bg-[#0d1117] border border-white/10 rounded-2xl space-y-2">
            <Clock className="h-6 w-6 text-amber-400" />
            <div className="text-sm font-bold text-white uppercase">45 DAYS / 15 DAYS</div>
            <div className="text-xs text-slate-400">Flexible Virtual Duration</div>
          </div>
          <div className="p-6 bg-[#0d1117] border border-white/10 rounded-2xl space-y-2">
            <Terminal className="h-6 w-6 text-amber-400" />
            <div className="text-sm font-bold text-white uppercase">HANDS-ON PROJECTS</div>
            <div className="text-xs text-slate-400">Real Python CLI & Automation</div>
          </div>
          <div className="p-6 bg-[#0d1117] border border-white/10 rounded-2xl space-y-2">
            <Award className="h-6 w-6 text-amber-400" />
            <div className="text-sm font-bold text-white uppercase">VERIFIED CERTIFICATE</div>
            <div className="text-xs text-slate-400">Unique Credential ID & QR</div>
          </div>
          <div className="p-6 bg-[#0d1117] border border-white/10 rounded-2xl space-y-2">
            <Cpu className="h-6 w-6 text-amber-400" />
            <div className="text-sm font-bold text-white uppercase">MENTOR SUPPORT</div>
            <div className="text-xs text-slate-400">Daily Progress & Code Review</div>
          </div>
        </div>

        {/* Curriculum Section */}
        <div className="space-y-10">
          <div className="text-center space-y-2 font-mono">
            <div className="text-xs font-bold text-amber-400 uppercase tracking-widest">CURRICULUM BREAKDOWN</div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white uppercase">WHAT YOU WILL LEARN</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SYLLABUS_WEEKS.map((mod, idx) => (
              <div key={mod.week} className="p-6 bg-[#0d1117] border border-white/10 rounded-2xl space-y-4">
                <div className="font-mono text-xs font-bold text-amber-400 uppercase tracking-wider">
                  {mod.week}
                </div>
                <ul className="space-y-2.5 font-sans text-xs sm:text-sm text-slate-300">
                  {mod.topics.map((t) => (
                    <li key={t} className="flex items-center gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="space-y-8 max-w-4xl mx-auto">
          <div className="text-center space-y-2 font-mono">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest">
              <HelpCircle className="h-4 w-4" />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white uppercase">PYTHON INTERNSHIP FAQS</h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <div key={faq.q} className="bg-[#0d1117] border border-white/10 rounded-2xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-mono text-sm font-bold text-white hover:text-amber-400 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`h-5 w-5 text-amber-400 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-6 text-xs sm:text-sm text-slate-300 font-sans leading-relaxed border-t border-white/5 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contextual Internal Links CTA */}
        <div className="p-8 bg-gradient-to-r from-amber-500/10 via-[#0d1117] to-amber-500/10 border border-amber-500/30 rounded-3xl text-center space-y-6">
          <h3 className="text-xl sm:text-2xl font-bold font-mono text-white uppercase">
            READY TO MASTER PYTHON PROGRAMMING?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto">
            Explore our <Link href="/courses/full-stack" className="text-amber-400 underline font-bold">Full Stack Web Development Track</Link> or view our <Link href="/resources" className="text-amber-400 underline font-bold">Student Career Resources</Link> to jumpstart your learning journey.
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
