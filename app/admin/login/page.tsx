'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Shield, Lock, Mail, ArrowRight, Terminal, AlertCircle, ArrowLeft, RefreshCw } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password: password.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      if (data.user?.role !== 'ADMIN') {
        throw new Error('Access denied. Master Admin credentials required.');
      }

      router.push('/admin');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'An error occurred during authentication');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#07090e] text-slate-100 flex flex-col justify-between select-none">
      {/* Minimal Top Header with Back to Site */}
      <header className="w-full border-b border-white/10 bg-[#090b0f]/90 backdrop-blur-md px-6 py-4 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 text-decoration-none group">
            <div className="w-9 h-9 rounded-full overflow-hidden border border-amber-400/80 shadow-[0_0_10px_rgba(245,158,11,0.3)]">
              <img src="/assets/prayxis_logo.jpg" alt="PRAYXIS" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-base font-black tracking-wider text-white">
                PRAY<span className="text-amber-400">XIS</span>
              </span>
              <span className="text-[9.5px] uppercase font-bold text-amber-400/90 -mt-1 tracking-widest">Foundation</span>
            </div>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-amber-500/10 border border-white/15 hover:border-amber-400/50 rounded-xl text-xs font-mono text-slate-300 hover:text-amber-300 transition-all cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Site</span>
          </Link>
        </div>
      </header>

      {/* Main Admin Login Box */}
      <main className="relative z-10 flex-1 flex items-center justify-center py-12 px-6">
        <div className="w-full max-w-md p-8 sm:p-10 bg-[#0d1017]/95 border border-amber-500/30 hover:border-amber-500/50 rounded-3xl backdrop-blur-xl space-y-6 shadow-[0_0_50px_rgba(245,158,11,0.08)] transition-all">
          
          {/* Header Badge */}
          <div className="space-y-3 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full font-mono text-[10px] text-amber-400 uppercase tracking-wider font-bold">
              <Shield className="h-3.5 w-3.5" />
              <span>PRAYXIS // MASTER CONTROL</span>
            </div>

            <h1 className="font-mono text-2xl font-extrabold text-white uppercase tracking-tight">
              ADMINISTRATOR LOGIN
            </h1>

            <p className="text-xs text-slate-400 font-sans">
              Sign in to manage student approvals, daily attendance logs, and system settings.
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/40 rounded-xl text-red-400 font-mono text-xs flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
            <div className="space-y-1.5 text-left">
              <label className="text-slate-400 uppercase text-[10px] font-bold">ADMIN EMAIL</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@prayxis.tech"
                  className="w-full pl-11 pr-4 py-3 bg-[#080a11] border border-white/10 rounded-xl text-white placeholder-slate-600 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/50 transition-all font-sans text-sm"
                />
              </div>
            </div>

            <div className="space-y-1.5 text-left">
              <label className="text-slate-400 uppercase text-[10px] font-bold">ADMIN PASSWORD</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-11 pr-4 py-3 bg-[#080a11] border border-white/10 rounded-xl text-white placeholder-slate-600 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/50 transition-all font-sans text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer disabled:opacity-50 mt-2"
            >
              {loading ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>AUTHENTICATING...</span>
                </>
              ) : (
                <>
                  <span>ENTER MASTER ADMIN CONSOLE</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

        </div>
      </main>

      {/* Clean Minimal Footer Note */}
      <footer className="py-6 text-center text-xs text-slate-500 font-mono border-t border-white/5">
        © 2024–2026 PRAYXIS FOUNDATION. Master Control Environment.
      </footer>
    </div>
  );
}
