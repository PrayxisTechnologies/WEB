'use client';

import React from 'react';
import { Award, CheckCircle2 } from 'lucide-react';

const OUTCOMES = [
  'HTML5 Semantic Structure & Modern Web Standards',
  'CSS3 Flexbox, Grid, & Responsive Design Systems',
  'JavaScript Core Logic, ES6+ & Asynchronous Promises',
  'DOM Manipulation, Event Handling & Fetch API Data',
  'Git Version Control, Branching & GitHub Repositories',
  'React Component Trees, Hooks & Client-Side State',
  'Node.js Runtime & Express Server REST API Routing',
  'Database Data Persistence & CRUD Operations',
  'User Authentication Concepts & Session Security',
  'Full-Stack End-to-End Application Architecture',
];

export const CourseOutcome: React.FC = () => {
  return (
    <section
      id="course-outcome"
      aria-label="Course Learning Outcomes After 45 Days"
      className="relative w-full py-24 px-6 sm:px-12 lg:px-20 bg-prayxis-bg border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-16 space-y-4 max-w-4xl">
          <div className="label-eyebrow text-prayxis-accent">
            06 // PROGRAM OUTCOMES
          </div>
          <h2 className="heading-section font-extrabold text-prayxis-offwhite uppercase tracking-tight">
            AFTER <br />
            <span className="text-prayxis-accent">45 DAYS.</span>
          </h2>
          <p className="body-large text-prayxis-muted font-normal max-w-xl pt-2">
            Upon completing the 45-day program, you will possess a verified practical understanding of the complete full-stack web software stack.
          </p>
        </div>

        {/* 10 Skill Outcomes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
          {OUTCOMES.map((outcome, idx) => (
            <div
              key={idx}
              className="p-4 bg-prayxis-surface/80 border border-white/10 hover:border-prayxis-accent/40 rounded-xl flex items-center gap-3 backdrop-blur-md transition-all text-prayxis-offwhite"
            >
              <CheckCircle2 className="h-4 w-4 text-prayxis-accent shrink-0" />
              <span>{outcome}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
