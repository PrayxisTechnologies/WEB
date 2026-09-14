'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { gsap } from '@/animations/gsap';
import { cn } from '@/lib/utils';
import { ArrowUpRight } from 'lucide-react';

interface MagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  showArrow?: boolean;
  className?: string;
  ariaLabel?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  href,
  onClick,
  variant = 'primary',
  showArrow = true,
  className,
  ariaLabel,
}) => {
  const buttonRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const btn = buttonRef.current;
    if (!btn) return;

    if (
      typeof window !== 'undefined' &&
      (window.matchMedia('(pointer: coarse)').matches ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    ) {
      return;
    }

    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const clamp = (val: number, max: number) => Math.max(-max, Math.min(max, val));

    gsap.to(btn, {
      x: clamp(x * 0.08, 4),
      y: clamp(y * 0.08, 4),
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    const btn = buttonRef.current;
    if (!btn) return;

    gsap.to(btn, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.4)',
    });
  };

  const baseStyles =
    'group relative inline-flex items-center justify-center gap-2.5 px-5 py-2.5 text-xs font-mono font-semibold tracking-wider uppercase transition-all duration-300 rounded-none overflow-hidden select-none focus:outline-none';

  const variantStyles = {
    primary:
      'bg-prayxis-offwhite text-prayxis-bg hover:bg-prayxis-accent hover:text-prayxis-bg border border-prayxis-offwhite hover:border-prayxis-accent cyan-glow-subtle',
    secondary:
      'bg-prayxis-surface/80 text-prayxis-offwhite border border-prayxis-border hover:border-prayxis-offwhite/40 hover:bg-prayxis-surface',
    ghost:
      'bg-transparent text-prayxis-offwhite hover:text-prayxis-accent border border-transparent hover:border-prayxis-border',
  };

  const content = (
    <div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(baseStyles, variantStyles[variant], className)}
    >
      <span className="relative z-10">{children}</span>
      {showArrow && (
        <ArrowUpRight
          aria-hidden="true"
          className="relative z-10 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-current"
        />
      )}
      <span className="absolute inset-0 z-0 bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </div>
  );

  if (href) {
    return (
      <Link href={href} aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
      className="inline-block bg-transparent p-0 border-none outline-none"
    >
      {content}
    </button>
  );
};
