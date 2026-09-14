'use client';

import React, { useState } from 'react';
import { FAQ_DATA } from '@/data/faq';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(FAQ_DATA[0].id);

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section
      id="faq"
      aria-label="Frequently Asked Questions"
      className="relative w-full py-28 px-6 sm:px-12 lg:px-20 bg-prayxis-bg border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-16">
          <div className="label-eyebrow text-prayxis-accent mb-3">
            18 // FREQUENTLY ASKED QUESTIONS
          </div>
          <h2 className="heading-section font-extrabold text-prayxis-offwhite uppercase tracking-tight">
            QUESTIONS & <br />
            <span className="text-prayxis-accent">TECHNICAL ANSWERS.</span>
          </h2>
        </div>

        {/* Accordion List */}
        <div className="space-y-4 max-w-4xl">
          {FAQ_DATA.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                className={`border transition-all duration-300 rounded-xl overflow-hidden ${
                  isOpen
                    ? 'border-prayxis-accent bg-prayxis-surface cyan-glow-subtle'
                    : 'border-white/10 bg-prayxis-surface/50 hover:border-white/20'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-mono text-base font-bold text-prayxis-offwhite uppercase focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-prayxis-accent text-xs">{faq.category} //</span>
                    <span>{faq.question}</span>
                  </div>

                  <ChevronDown className={`h-5 w-5 text-prayxis-accent transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 body-small text-prayxis-muted border-t border-white/10 leading-relaxed animate-fadeIn">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
