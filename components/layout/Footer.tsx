'use client';

import React from 'react';
import Link from 'next/link';

const FOOTER_NAV = [
  { label: 'HOME', href: '/' },
  { label: 'INTERNSHIPS', href: '/internship' },
  { label: 'ACADEMY', href: '/courses' },
  { label: 'FULL STACK TRACK', href: '/courses/full-stack' },
  { label: 'PYTHON TRACK', href: '/courses/python' },
  { label: 'CYBER SECURITY', href: '/courses/cyber-security' },
  { label: 'RESOURCES HUB', href: '/resources' },
  { label: 'REGISTER', href: '/register' },
  { label: 'LOGIN', href: '/login' },
  { label: 'VERIFY CERTIFICATE', href: '/#verify' },
];

const SOCIAL_LINKS = [
  { label: 'GITHUB', href: 'https://github.com' },
  { label: 'LINKEDIN', href: 'https://linkedin.com' },
  { label: 'INSTAGRAM', href: 'https://instagram.com' },
  { label: 'YOUTUBE', href: 'https://youtube.com' },
];

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#050507] border-t border-white/10 pt-20 pb-12 px-6 sm:px-12 lg:px-20 select-none">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Brand Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 border-b border-white/10">
          <div>
            <Link href="/" className="font-extrabold text-3xl sm:text-4xl tracking-ultra text-prayxis-offwhite uppercase">
              PRAYXIS
            </Link>
            <div className="font-mono text-xs tracking-superwide text-prayxis-accent uppercase mt-2">
              BUILD. SECURE. INNOVATE.
            </div>
          </div>

          <div className="font-mono text-xs text-prayxis-subtle">
            © {new Date().getFullYear()} PRAYXIS TECHNOLOGY LABS // ALL RIGHTS RESERVED
          </div>
        </div>

        {/* Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 font-mono text-xs">
          
          {/* Column 1: Navigation */}
          <div className="space-y-4">
            <div className="text-prayxis-accent font-bold uppercase pb-2 border-b border-white/10">NAVIGATION</div>
            <div className="grid grid-cols-2 gap-2 text-prayxis-muted">
              {FOOTER_NAV.map((item) => (
                <Link key={item.label} href={item.href} className="hover:text-prayxis-accent transition-colors">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 2: Social */}
          <div className="space-y-4">
            <div className="text-prayxis-accent font-bold uppercase pb-2 border-b border-white/10">CONNECT</div>
            <div className="flex flex-col space-y-2 text-prayxis-muted">
              {SOCIAL_LINKS.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-prayxis-accent transition-colors">
                  {s.label} →
                </a>
              ))}
            </div>
          </div>

          {/* Column 3: Legal & Status */}
          <div className="space-y-4">
            <div className="text-prayxis-accent font-bold uppercase pb-2 border-b border-white/10">LEGAL & STATUS</div>
            <div className="flex flex-col space-y-2 text-prayxis-muted">
              <Link href="#" className="hover:text-prayxis-accent transition-colors">PRIVACY POLICY</Link>
              <Link href="#" className="hover:text-prayxis-accent transition-colors">TERMS OF SERVICE</Link>
              <div className="pt-2 text-prayxis-subtle text-[10px]">PRAYXIS / INDIA</div>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
};
