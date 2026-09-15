'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Next.js Global Root Error:', error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-[#07090e] text-slate-100 font-mono antialiased">
        <div className="min-h-screen flex flex-col items-center justify-center p-6 select-none">
          <div className="max-w-md w-full p-8 bg-[#0d1017] border border-amber-500/40 rounded-2xl text-center space-y-6 shadow-2xl">
            <div className="inline-flex items-center gap-2 font-mono text-[10px] text-amber-400 uppercase tracking-widest font-bold px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full">
              <span>PRAYXIS // GLOBAL ROOT BOUNDARY</span>
            </div>
            <h1 className="font-mono text-2xl font-extrabold text-white uppercase tracking-tight">
              ROOT SYSTEM EXCEPTION
            </h1>
            <p className="text-xs text-slate-400 font-sans leading-relaxed">
              A root system error occurred. Click below to reload the console.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => reset()}
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs uppercase rounded transition-all cursor-pointer shadow-lg"
              >
                RELOAD SYSTEM 🔄
              </button>
              <Link
                href="/"
                className="px-5 py-2.5 bg-white/5 border border-white/10 hover:border-white/30 text-slate-200 text-xs uppercase rounded transition-all"
              >
                GO HOME →
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
