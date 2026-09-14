'use client';

import React from 'react';
import { FULL_STACK_SKILLS } from '@/data/courses';

export const CourseSkills: React.FC = () => {
  return (
    <section
      id="skills-matrix"
      aria-label="Technical Skills Matrix"
      className="relative w-full py-24 px-6 sm:px-12 lg:px-20 bg-prayxis-bg border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-16 space-y-4 max-w-4xl">
          <div className="label-eyebrow text-prayxis-accent">
            01 // TECHNICAL SKILLS MATRIX
          </div>
          <h2 className="heading-section font-extrabold text-prayxis-offwhite uppercase tracking-tight">
            WHAT YOU <br />
            <span className="text-prayxis-accent">WILL LEARN.</span>
          </h2>
          <p className="body-large text-prayxis-muted font-normal max-w-xl pt-2">
            Learn from first principles. Progress step-by-step through core web technologies, frontend frameworks, backend API engines, and database persistence.
          </p>
        </div>

        {/* 8 Category Matrix Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FULL_STACK_SKILLS.map((cat) => (
            <div
              key={cat.num}
              className="p-6 bg-prayxis-surface/80 border border-white/10 hover:border-prayxis-accent/60 transition-all duration-300 rounded-2xl flex flex-col justify-between space-y-4 backdrop-blur-md cyan-glow-subtle"
            >
              <div className="space-y-3">
                <div className="font-mono text-xs text-prayxis-accent font-bold">
                  {cat.num} // {cat.title}
                </div>

                <ul className="space-y-1.5 font-mono text-xs text-prayxis-muted pt-2 border-t border-white/10">
                  {cat.skills.map((skill, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="h-1 w-1 rounded-full bg-prayxis-accent shrink-0" />
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-white/10 font-mono text-[9px] text-prayxis-subtle uppercase">
                CURRICULUM MODULE
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
