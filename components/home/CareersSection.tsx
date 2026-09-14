'use client';

import React from 'react';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { Users, ArrowRight } from 'lucide-react';

const CAREER_AREAS = [
  'SOFTWARE ENGINEERING',
  'CYBERSECURITY RESEARCH',
  'CLOUD INFRASTRUCTURE',
  'AI & AUTOMATION',
  'UI/UX & PRODUCT DESIGN',
  'INTERNSHIP INITIATIVES',
];

export const CareersSection: React.FC = () => {
  return (
    <section
      id="careers"
      aria-label="Prayxis Careers and Talent Network"
      className="relative w-full py-28 px-6 sm:px-12 lg:px-20 bg-prayxis-bg border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-16 space-y-4 max-w-4xl">
          <div className="label-eyebrow text-prayxis-accent">
            17 // CAREERS & TALENT NETWORK
          </div>
          <h2 className="heading-section font-extrabold text-prayxis-offwhite uppercase tracking-tight">
            BUILD <br />
            <span className="text-prayxis-accent">WITH US.</span>
          </h2>
          <p className="body-large text-prayxis-muted font-normal max-w-xl pt-2">
            We are always interested in connecting with extraordinary software engineers, security researchers, and systems designers.
          </p>
        </div>

        {/* Talent Network Card */}
        <div className="p-8 sm:p-12 bg-prayxis-surface/90 border border-white/10 rounded-2xl backdrop-blur-md flex flex-col lg:flex-row lg:items-center justify-between gap-8 cyan-glow-subtle">
          
          <div className="space-y-4 max-w-2xl">
            <div className="font-mono text-xs text-prayxis-accent font-bold uppercase flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>PRAYXIS TALENT NETWORK</span>
            </div>

            <h3 className="font-mono text-2xl font-bold text-prayxis-offwhite uppercase">
              JOIN OUR ENGINEERING TALENT NETWORK
            </h3>

            <p className="body-small text-prayxis-muted leading-relaxed">
              While we evaluate specific openings on an ongoing basis, we encourage passionate technical minds to get in touch for future opportunities, research projects, and internships.
            </p>

            <div className="flex flex-wrap gap-2 pt-2 font-mono text-[10px] text-prayxis-subtle uppercase">
              {CAREER_AREAS.map((a) => (
                <span key={a} className="px-3 py-1 bg-white/5 border border-white/10">{a}</span>
              ))}
            </div>
          </div>

          <div>
            <MagneticButton href="mailto:info@prayxis.in" variant="primary" showArrow={true} className="py-3.5 px-8">
              JOIN OUR TALENT NETWORK →
            </MagneticButton>
          </div>

        </div>

      </div>
    </section>
  );
};
