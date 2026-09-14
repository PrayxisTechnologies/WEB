'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Home, Terminal } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col items-center justify-center p-6 text-center select-none font-mono">
      <div className="max-w-md bg-[#0d1117] border border-amber-500/30 rounded-2xl p-8 backdrop-blur-xl space-y-6 shadow-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-xs text-amber-400 font-bold uppercase">
          <Terminal className="h-3.5 w-3.5" />
          <span>404: RESOURCE NOT FOUND</span>
        </div>

        <h1 className="text-4xl font-black text-white uppercase tracking-wider">
          404
        </h1>

        <p className="text-xs text-slate-400 font-sans leading-relaxed">
          The requested path could not be found on Prayxis Foundation servers.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 text-xs">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 bg-amber-500 hover:bg-amber-400 text-black font-extrabold uppercase rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
          >
            <Home className="h-4 w-4" />
            <span>HOME PAGE</span>
          </Link>

          <Link
            href="/login"
            className="w-full sm:w-auto px-6 py-3 bg-white/5 border border-white/10 hover:border-amber-400 text-slate-300 font-bold uppercase rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>STUDENT LOGIN</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
