'use client';

import React from 'react';
import { BookOpen, Code2, Cpu, Rocket } from 'lucide-react';

const STAGES = [
  {
    num: '01',
    title: 'UNDERSTAND',
    desc: 'Learn the concept from first principles before writing a single line of code.',
    icon: BookOpen,
  },
  {
    num: '02',
    title: 'CODE',
    desc: 'Write the code yourself from scratch rather than copying pre-made templates.',
    icon: Code2,
  },
  {
    num: '03',
    title: 'BUILD',
    desc: 'Apply the concept to practical engineering tasks, challenges and real projects.',
    icon: Cpu,
  },
  {
    num: '04',
    title: 'SHIP',
    desc: 'Turn your work into a complete, secure, production-ready digital application.',
    icon: Rocket,
  },
];

export const LearningMethod: React.FC = () => {
  return (
    <section
      aria-label="Prayxis Academy Learning Philosophy"
      className="relative w-full py-24 px-6 sm:px-12 lg:px-20 bg-prayxis-bg border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-16 space-y-4 max-w-4xl">
          <div className="label-eyebrow text-prayxis-accent">
            02 // LEARNING PHILOSOPHY
          </div>
          <h2 className="heading-section font-extrabold text-prayxis-offwhite uppercase tracking-tight">
            HOW WE <br />
            <span className="text-prayxis-accent">BUILD SKILL.</span>
          </h2>
          <p className="body-large text-prayxis-muted font-normal max-w-xl pt-2">
            Engineering competence isn’t built by watching video tutorials—it is forged by building, breaking, fixing, and shipping real digital systems.
          </p>
        </div>

        {/* 4 Stage Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {STAGES.map((s) => {
            const IconComp = s.icon;

            return (
              <div
                key={s.num}
                className="group p-6 bg-prayxis-surface/80 border border-white/10 hover:border-prayxis-accent/60 transition-all duration-300 rounded-2xl flex flex-col justify-between space-y-6 backdrop-blur-md cyan-glow-subtle"
              >
                <div className="flex items-center justify-between font-mono text-xs text-prayxis-accent">
                  <span className="font-bold">{s.num} // STAGE</span>
                  <IconComp className="h-5 w-5 text-prayxis-muted group-hover:text-prayxis-accent transition-colors" />
                </div>

                <div>
                  <h3 className="font-mono text-xl font-extrabold text-prayxis-offwhite uppercase mb-3 group-hover:text-prayxis-accent transition-colors">
                    {s.title}
                  </h3>
                  <p className="body-small text-prayxis-muted leading-relaxed">
                    {s.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 font-mono text-[9px] text-prayxis-subtle uppercase">
                  PRACTICAL METHODOLOGY
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
