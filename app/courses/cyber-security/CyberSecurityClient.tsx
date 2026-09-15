'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MagneticButton } from '@/components/ui/MagneticButton';
import {
  Shield,
  CheckCircle2,
  Clock,
  Award,
  Terminal,
  ChevronDown,
  ArrowRight,
  Lock,
  Server,
  Key,
  HelpCircle,
} from 'lucide-react';

const MODULES = [
  {
    title: 'MODULE 01: NETWORKING & SYSTEM SECURITY BASICS',
    topics: ['OSI Model & TCP/IP Fundamentals', 'Linux Command Line Security', 'Port Scanning & Nmap Basics', 'Network Traffic Analysis with Wireshark'],
  },
  {
    title: 'MODULE 02: VULNERABILITY ASSESSMENT & RECON',
    topics: ['Information Gathering & OSINT', 'Vulnerability Scanning Concepts', 'Web Security: OWASP Top 10 Basics', 'Authentication & Access Control'],
  },
  {
    title: 'MODULE 03: DEFENSIVE ARCHITECTURE & CRYPTOGRAPHY',
    topics: ['Symmetric & Asymmetric Encryption', 'SSL/TLS Protocols & PKI Basics', 'Firewalls, IDS/IPS & Network Segmentation', 'Incident Response & Log Auditing'],
  },
  {
    title: 'MODULE 04: CAPSTONE REPORT & VIRTUAL LAB',
    topics: ['Configuring Secure Environment', 'Writing Security Audit Reports', 'Vulnerability Assessment Lab Capstone', 'Final Certification Submission'],
  },
];

const FAQS = [
  {
    q: 'Is this internship compliant with ethical guidelines?',
    a: 'Yes. All material and practical labs focus strictly on defensive cybersecurity, ethical standards, security awareness, and authorized testing environments.',
  },
  {
    q: 'What prerequisites are required for the Cyber Security Track?',
    a: 'Basic knowledge of computers and operating systems is recommended. Prior networking experience is helpful but not mandatory.',
  },
  {
    q: 'What certificate will I receive upon completion?',
    a: 'You will receive an official QR-verified Cyber Security & Ethical Hacking Internship Certificate issued by PRAYXIS Internship Portal.',
  },
];

export default function CyberSecurityClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="relative min-h-screen bg-[#050507] text-slate-100 flex flex-col justify-between select-none font-sans">
      <Navbar />

      <main className="relative z-10 flex-1 pt-32 pb-24 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto w-full space-y-20">
        
        {/* Hero */}
        <div className="space-y-6 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-amber-500/10 border border-amber-500/30 rounded-full text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
            <Shield className="h-4 w-4" />
            <span>PRAYXIS INTERNSHIP PORTAL // CYBER DEFENSE TRACK</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight uppercase text-white leading-tight">
            CYBER SECURITY & ETHICAL HACKING VIRTUAL INTERNSHIP
          </h1>

          <p className="text-base sm:text-lg text-slate-400 font-sans max-w-3xl mx-auto leading-relaxed">
            Master network defense fundamentals, security audits, Linux command line tools, and web security protocols in an industry-aligned virtual environment.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton href="/register" variant="primary" showArrow={true} className="py-3 px-8 text-sm">
              Enroll Now (₹99)
            </MagneticButton>
            <Link
              href="/internship"
              className="px-6 py-3 bg-white/5 border border-white/10 hover:border-amber-400/50 text-slate-300 font-mono text-xs font-bold uppercase rounded-xl transition-all flex items-center gap-2"
            >
              <span>Explore All Internships</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-mono">
          <div className="p-6 bg-[#0d1117] border border-white/10 rounded-2xl space-y-2">
            <Clock className="h-6 w-6 text-amber-400" />
            <div className="text-sm font-bold text-white uppercase">45 DAYS DURATION</div>
            <div className="text-xs text-slate-400">Structured Virtual Track</div>
          </div>
          <div className="p-6 bg-[#0d1117] border border-white/10 rounded-2xl space-y-2">
            <Lock className="h-6 w-6 text-amber-400" />
            <div className="text-sm font-bold text-white uppercase">ETHICAL DEFENSE</div>
            <div className="text-xs text-slate-400">Defensive Security Focus</div>
          </div>
          <div className="p-6 bg-[#0d1117] border border-white/10 rounded-2xl space-y-2">
            <Award className="h-6 w-6 text-amber-400" />
            <div className="text-sm font-bold text-white uppercase">VERIFIED CREDENTIAL</div>
            <div className="text-xs text-slate-400">Digital Certificate & QR</div>
          </div>
          <div className="p-6 bg-[#0d1117] border border-white/10 rounded-2xl space-y-2">
            <Server className="h-6 w-6 text-amber-400" />
            <div className="text-sm font-bold text-white uppercase">LAB AUDIT REPORTS</div>
            <div className="text-xs text-slate-400">Practical Assessment</div>
          </div>
        </div>

        {/* Modules */}
        <div className="space-y-10">
          <div className="text-center space-y-2 font-mono">
            <div className="text-xs font-bold text-amber-400 uppercase tracking-widest">MODULE BREAKDOWN</div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white uppercase">CYBER SECURITY CURRICULUM</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MODULES.map((m) => (
              <div key={m.title} className="p-6 bg-[#0d1117] border border-white/10 rounded-2xl space-y-4">
                <div className="font-mono text-xs font-bold text-amber-400 uppercase tracking-wider">
                  {m.title}
                </div>
                <ul className="space-y-2.5 font-sans text-xs sm:text-sm text-slate-300">
                  {m.topics.map((t) => (
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

        {/* FAQs */}
        <div className="space-y-8 max-w-4xl mx-auto">
          <div className="text-center space-y-2 font-mono">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest">
              <HelpCircle className="h-4 w-4" />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white uppercase">CYBER SECURITY FAQS</h2>
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

        {/* Internal Links CTA */}
        <div className="p-8 bg-gradient-to-r from-amber-500/10 via-[#0d1117] to-amber-500/10 border border-amber-500/30 rounded-3xl text-center space-y-6">
          <h3 className="text-xl sm:text-2xl font-bold font-mono text-white uppercase">
            START YOUR CYBER DEFENSE JOURNEY TODAY
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto">
            Check out our <Link href="/courses/python" className="text-amber-400 underline font-bold">Python Programming Track</Link> or visit the <Link href="/internship" className="text-amber-400 underline font-bold">PRAYXIS Internship Portal Main Directory</Link>.
          </p>
          <div>
            <MagneticButton href="/register" variant="primary" showArrow={true} className="py-3 px-8 text-sm">
              Apply for Cyber Track Now
            </MagneticButton>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
