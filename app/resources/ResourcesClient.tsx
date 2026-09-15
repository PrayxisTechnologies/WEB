'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { BookOpen, ArrowRight, Code, Terminal, Award, Compass, FileText } from 'lucide-react';

const ARTICLES = [
  {
    slug: 'full-stack-developer-roadmap',
    title: 'Full Stack Developer Learning Roadmap 2026',
    description: 'A comprehensive step-by-step roadmap for engineering students to master frontend, backend, databases, REST APIs, and production deployment.',
    category: 'ROADMAP',
    readTime: '6 Min Read',
  },
  {
    slug: 'python-learning-guide',
    title: 'Python Programming Guide & Student Project Ideas',
    description: 'Learn how to master Python fundamentals, object-oriented concepts, and build 5 resume-ready projects for virtual internships.',
    category: 'GUIDE',
    readTime: '5 Min Read',
  },
  {
    slug: 'internship-interview-questions',
    title: 'Virtual Internship Technical Interview Guide',
    description: 'Essential technical questions, coding assessment tips, and resume structuring advice for engineering students applying for internships.',
    category: 'INTERVIEW PREP',
    readTime: '7 Min Read',
  },
];

export default function ResourcesClient() {
  return (
    <div className="relative min-h-screen bg-[#050507] text-slate-100 flex flex-col justify-between select-none font-sans">
      <Navbar />

      <main className="relative z-10 flex-1 pt-32 pb-24 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto w-full space-y-16">
        
        {/* Header */}
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-amber-500/10 border border-amber-500/30 rounded-full text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
            <Compass className="h-4 w-4" />
            <span>PRAYXIS INTERNSHIP PORTAL // RESOURCE HUB</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight uppercase text-white leading-tight">
            PRAYXIS STUDENT RESOURCES & CAREER GUIDES
          </h1>

          <p className="text-sm sm:text-base text-slate-400 font-sans leading-relaxed">
            Free developer roadmaps, internship preparation guides, coding project ideas, and career insights designed specifically for technology students.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ARTICLES.map((art) => (
            <Link
              key={art.slug}
              href={`/resources/${art.slug}`}
              className="group p-8 bg-[#0d1117] border border-white/10 hover:border-amber-400/50 rounded-2xl flex flex-col justify-between space-y-6 transition-all shadow-xl hover:-translate-y-1"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="px-2.5 py-1 bg-amber-500/10 border border-amber-500/30 rounded text-amber-400 font-bold uppercase">
                    {art.category}
                  </span>
                  <span className="text-slate-400">{art.readTime}</span>
                </div>

                <h2 className="text-xl font-bold font-mono text-white group-hover:text-amber-400 transition-colors uppercase leading-snug">
                  {art.title}
                </h2>

                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
                  {art.description}
                </p>
              </div>

              <div className="flex items-center gap-2 font-mono text-xs font-bold text-amber-400 uppercase pt-4 border-t border-white/5">
                <span>READ ARTICLE</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        {/* Hub Footer Link to Programs */}
        <div className="p-8 bg-[#0d1117] border border-white/10 rounded-2xl text-center space-y-4">
          <h3 className="font-mono text-lg font-bold text-white uppercase">LOOKING FOR HANDS-ON EXPERIENCE?</h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            Apply your knowledge directly by enrolling in our 15-day or 45-day virtual internships on the <Link href="/internship" className="text-amber-400 font-bold underline">PRAYXIS Internship Portal</Link>.
          </p>
        </div>

      </main>

      <Footer />
    </div>
  );
}
