'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { ArrowLeft, CheckCircle2, Code, Terminal, Layers, ArrowRight } from 'lucide-react';

export default function ArticleClient() {
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
            <span>FULL STACK ROADMAP 2026</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight leading-tight">
            FULL STACK DEVELOPER ROADMAP FOR STUDENTS
          </h1>

          <p className="text-base text-slate-400 font-sans leading-relaxed">
            Becoming a full-stack engineer requires mastering foundational web technologies, building server APIs, managing databases, and deploying applications to cloud environments.
          </p>
        </div>

        {/* Article Body Content */}
        <div className="space-y-10 text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
          
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold font-mono text-white uppercase flex items-center gap-2">
              <span className="text-amber-400">01.</span> FRONTEND FUNDAMENTALS
            </h2>
            <p>
              Start with HTML5 semantics, responsive CSS3 styling (Flexbox & Grid), and modern JavaScript (ES6+ async/await, DOM manipulation, promises). Learn React component lifecycles, state hooks, and client-side routing.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold font-mono text-white uppercase flex items-center gap-2">
              <span className="text-amber-400">02.</span> BACKEND & REST APIS
            </h2>
            <p>
              Understand server-side runtime environments with Node.js and Express. Learn how to design RESTful API endpoints, handle HTTP status codes, implement JSON web tokens (JWT), and validate incoming user requests.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold font-mono text-white uppercase flex items-center gap-2">
              <span className="text-amber-400">03.</span> DATABASE MANAGEMENT
            </h2>
            <p>
              Master Document-Oriented NoSQL databases like MongoDB Atlas or SQL relational databases like PostgreSQL. Practice CRUD operations, database schema indexing, and ORM/ODM modeling.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold font-mono text-white uppercase flex items-center gap-2">
              <span className="text-amber-400">04.</span> VIRTUAL INTERNSHIP & PROJECTS
            </h2>
            <p>
              Theory alone is not enough for software engineering roles. Build 2 to 3 real-world full-stack web applications and gain verifiable industry experience through guided internship programs.
            </p>
          </section>

        </div>

        {/* CTA Box */}
        <div className="p-8 bg-[#0d1117] border border-amber-500/30 rounded-2xl space-y-4 text-center">
          <h3 className="text-xl font-bold font-mono text-white uppercase">
            PUT THIS ROADMAP INTO PRACTICE AT PRAYXIS
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            Join the 45-day <Link href="/courses/full-stack" className="text-amber-400 underline font-bold">Full Stack Web Development Internship Track</Link> at PRAYXIS Internship Portal and work on production web projects under mentor guidance.
          </p>
          <div>
            <MagneticButton href="/register" variant="primary" showArrow={true} className="py-3 px-8 text-sm">
              Enroll in Full Stack Track (₹99)
            </MagneticButton>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
