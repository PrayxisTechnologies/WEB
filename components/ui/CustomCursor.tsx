'use client';

import React, { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from '@/animations/gsap';

interface CustomCursorProps {
  variant?: 'gold' | 'cyan' | 'auto';
}

export const CustomCursor: React.FC<CustomCursorProps> = ({ variant = 'auto' }) => {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // If user is on authenticated student or admin pages, cursor is BLUE/CYAN
    const isAuthPage = pathname?.startsWith('/student') || pathname?.startsWith('/admin');
    if (isAuthPage) {
      setIsLoggedIn(true);
      return;
    }

    if (variant === 'auto') {
      fetch('/api/auth/me')
        .then((res) => res.json())
        .then((data) => {
          if (data && data.user) {
            setIsLoggedIn(true);
          } else {
            setIsLoggedIn(false);
          }
        })
        .catch(() => setIsLoggedIn(false));
    }
  }, [variant, pathname]);

  // Determine active cursor theme color: GOLD before login (landing), CYAN/BLUE after login (student/admin)
  const isGoldTheme = variant === 'gold' || (variant === 'auto' && !isLoggedIn);
  const themeColorHex = isGoldTheme ? '#FFD700' : '#00F0FF';

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isFinePointer || prefersReducedMotion) {
      return;
    }

    document.body.classList.add('custom-cursor-active');

    const container = containerRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;

    if (!container || !dot || !ring) return;

    // GSAP quickTo setters for 60fps performance
    const setDotX = gsap.quickTo(dot, 'x', { duration: 0.01, ease: 'none' });
    const setDotY = gsap.quickTo(dot, 'y', { duration: 0.01, ease: 'none' });

    const setRingX = gsap.quickTo(ring, 'x', { duration: 0.18, ease: 'power2.out' });
    const setRingY = gsap.quickTo(ring, 'y', { duration: 0.18, ease: 'power2.out' });

    let hasMoved = false;
    let currentMode: 'default' | 'precision' | 'text' | 'interactive' = 'default';

    const onMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      if (!hasMoved) {
        hasMoved = true;
        container.style.display = 'block';
        gsap.set(dot, { x, y });
        gsap.set(ring, { x, y });
        gsap.to(container, { opacity: 1, duration: 0.15 });
      } else if (container.style.opacity !== '1') {
        gsap.to(container, { opacity: 1, duration: 0.15 });
      }

      setDotX(x);
      setDotY(y);
      setRingX(x);
      setRingY(y);
    };

    const onMouseDown = () => {
      gsap.to(ring, { scale: 0.75, duration: 0.09, ease: 'power2.in', yoyo: true, repeat: 1 });
    };

    const onMouseLeave = () => {
      gsap.to(container, { opacity: 0, duration: 0.25 });
    };

    const onMouseEnter = () => {
      gsap.to(container, { opacity: 1, duration: 0.2 });
    };

    const handleMouseOver = (e: MouseEvent) => {
      try {
        const target = e.target as HTMLElement | null;
        if (!target) return;

        const cursorAttr = target.closest('[data-cursor]')?.getAttribute('data-cursor');

        if (cursorAttr === 'precision') {
          if (currentMode !== 'precision') {
            currentMode = 'precision';
            gsap.to(ring, { width: 40, height: 40, borderRadius: '50%', borderColor: themeColorHex, duration: 0.25 });
            gsap.to(dot, { width: 4, height: 4, opacity: 1, duration: 0.2 });
          }
          return;
        }

        const isText = !!target.closest('input, textarea, [contenteditable="true"]');
        if (isText) {
          if (currentMode !== 'text') {
            currentMode = 'text';
            gsap.to(ring, { width: 4, height: 24, borderRadius: '2px', borderColor: themeColorHex, duration: 0.2 });
            gsap.to(dot, { opacity: 0, duration: 0.15 });
          }
          return;
        }

        const isInteractive = !!target.closest(
          'a, button, [role="button"], select, [data-cursor="interactive"]'
        );
        if (isInteractive) {
          if (currentMode !== 'interactive') {
            currentMode = 'interactive';
            gsap.to(ring, { width: 50, height: 50, borderRadius: '50%', borderColor: themeColorHex, duration: 0.25 });
            gsap.to(dot, { width: 4, height: 4, opacity: 1, duration: 0.2 });
          }
          return;
        }

        // Default state
        if (currentMode !== 'default') {
          currentMode = 'default';
          gsap.to(ring, { width: 32, height: 32, borderRadius: '50%', borderColor: themeColorHex, duration: 0.25 });
          gsap.to(dot, { width: 6, height: 6, opacity: 1, duration: 0.2 });
        }
      } catch (err) {}
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [themeColorHex]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-[9999] opacity-0"
      style={{ display: 'none', pointerEvents: 'none' }}
      aria-hidden="true"
    >
      {/* Outer Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border bg-transparent pointer-events-none transition-colors duration-300 will-change-transform"
        style={{
          width: 32,
          height: 32,
          borderColor: isGoldTheme ? 'rgba(255, 215, 0, 0.65)' : 'rgba(0, 240, 255, 0.65)',
          boxShadow: isGoldTheme ? '0 0 15px rgba(255, 215, 0, 0.3)' : '0 0 15px rgba(0, 240, 255, 0.3)',
          pointerEvents: 'none',
        }}
      />

      {/* Immediate Solid Center Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none will-change-transform"
        style={{
          width: 6,
          height: 6,
          backgroundColor: isGoldTheme ? '#FFD700' : '#00F0FF',
          boxShadow: isGoldTheme ? '0 0 8px #FFD700' : '0 0 8px #00F0FF',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};
