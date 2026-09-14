'use client';

import React from 'react';
import { PLANNED_PROJECTS } from '@/data/courses';
import { FolderGit2 } from 'lucide-react';

export const CourseProjects: React.FC = () => {
  return (
    <section
      id="course-projects"
      aria-label="Planned Projects Progression"
      className="relative w-full py-24 px-6 sm:px-12 lg:px-20 bg-prayxis-bg border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-16 space-y-4 max-w-4xl">
          <div className="label-eyebrow text-prayxis-accent">
            04 // PRACTICAL APPLICATION
          </div>
          <h2 className="heading-section font-extrabold text-prayxis-offwhite uppercase tracking-tight">
            BUILD WHILE <br />
            <span className="text-prayxis-accent">YOU LEARN.</span>
          </h2>
          <p className="body-large text-prayxis-muted font-normal max-w-xl pt-2">
            Build 5 progressive real-world projects as you advance through the curriculum—culminating in a complete full-stack capstone system.
          </p>
        </div>

        {/* 5 Projects Roadmap Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PLANNED_PROJECTS.map((proj) => (
            <div
              key={proj.num}
              className="p-6 bg-prayxis-surface/80 border border-white/10 hover:border-prayxis-accent/60 transition-all duration-300 rounded-2xl flex flex-col justify-between space-y-4 backdrop-blur-md cyan-glow-subtle"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between font-mono text-[10px] text-prayxis-accent">
                  <span className="font-bold">{proj.num} // PROJECT</span>
                  <FolderGit2 className="h-4 w-4 text-prayxis-muted" />
                </div>

                <h3 className="font-mono text-base font-extrabold text-prayxis-offwhite uppercase">
                  {proj.title}
                </h3>

                <p className="body-small text-prayxis-muted leading-relaxed">
                  {proj.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between font-mono text-[9px] text-prayxis-subtle uppercase">
                <span>TECH STACK</span>
                <span className="text-prayxis-accent font-bold">{proj.tech}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
