'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { Menu, X, ArrowRight, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Academy', href: '/courses' },
  { label: 'Full Stack Track', href: '/courses/full-stack' },
  { label: 'About Us', href: '/#about-us' },
  { label: 'Verify Certificate', href: '/#verify' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out px-4 sm:px-8 lg:px-12',
          isScrolled ? 'py-3' : 'py-5 sm:py-6'
        )}
      >
        <div className="mx-auto max-w-7xl">
          <nav
            aria-label="Main Navigation"
            className={cn(
              'flex items-center justify-between transition-all duration-300 rounded-none px-5 py-2.5',
              isScrolled
                ? 'bg-prayxis-bg/80 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/90'
                : 'bg-transparent border border-transparent'
            )}
          >
            {/* Left: Brand Wordmark */}
            <Link
              href="/"
              className="group flex items-center gap-2.5 focus:outline-none"
              aria-label="PRAYXIS Homepage"
            >
              <div className="h-2 w-2 rounded-full bg-prayxis-accent group-hover:scale-125 transition-transform duration-300 cyan-glow-subtle" />
              <span className="font-extrabold text-base tracking-ultra text-prayxis-offwhite group-hover:text-prayxis-accent transition-colors duration-300 uppercase">
                PRAYXIS
              </span>
            </Link>

            {/* Desktop Center Navigation Links */}
            <div className="hidden md:flex items-center gap-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="font-mono text-xs tracking-wider text-prayxis-muted hover:text-prayxis-offwhite transition-colors duration-300 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-prayxis-accent hover:after:w-full after:transition-all after:duration-300"
                >
                  {link.label}
                </Link>
              ))}

              {/* Profile Link in Nav */}
              <Link
                href="/student/profile"
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-prayxis-accent/10 border border-prayxis-accent/40 rounded text-prayxis-accent font-mono text-xs font-bold uppercase tracking-wider hover:bg-prayxis-accent hover:text-black transition-all cursor-pointer"
              >
                <User className="h-3.5 w-3.5" />
                <span>PROFILE</span>
              </Link>
            </div>

            {/* Right: Contact CTA Button */}
            <div className="hidden md:flex items-center gap-3">
              <MagneticButton href="#contact" variant="primary" showArrow={true} className="py-2 px-4 text-[11px]">
                Let&apos;s Talk
              </MagneticButton>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-prayxis-offwhite hover:text-prayxis-accent focus:outline-none transition-colors"
              aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div
        className={cn(
          'fixed inset-0 z-40 md:hidden bg-prayxis-bg/95 backdrop-blur-2xl transition-all duration-300 flex flex-col justify-between p-8 pt-28',
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-4'
        )}
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="flex flex-col gap-5">
          <div className="font-mono text-[10px] tracking-ultra text-prayxis-accent uppercase mb-2">
            NAVIGATION
          </div>

          <Link
            href="/student/profile"
            onClick={() => setIsMobileMenuOpen(false)}
            className="group flex items-center justify-between text-2xl font-bold tracking-tight text-prayxis-accent hover:text-white transition-colors border-b border-prayxis-accent/30 pb-3"
          >
            <span className="flex items-center gap-2">
              <User className="h-5 w-5" />
              <span>MY PROFILE</span>
            </span>
            <ArrowRight className="h-4 w-4 opacity-100" />
          </Link>

          {NAV_LINKS.map((link, idx) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="group flex items-center justify-between text-2xl font-bold tracking-tight text-prayxis-offwhite hover:text-prayxis-accent transition-colors border-b border-white/10 pb-3"
              style={{ transitionDelay: `${idx * 40}ms` }}
            >
              <span>{link.label}</span>
              <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-4 mt-8">
          <MagneticButton
            href="#contact"
            variant="primary"
            showArrow={true}
            className="w-full text-center py-3"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Let&apos;s Talk
          </MagneticButton>

          <div className="font-mono text-[9px] tracking-superwide text-prayxis-muted text-center pt-3">
            PRAYXIS GLOBAL TECHNOLOGY & RESEARCH LABS
          </div>
        </div>
      </div>
    </>
  );
};
