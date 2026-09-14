'use client';

import React from 'react';
import { Globe, Sparkles, CheckCircle2, AlertTriangle, Eye, EyeOff, Layers, FileCode, Cpu, ArrowRight } from 'lucide-react';
import { VisualType } from './LearningVisual';

interface BrowserMockupProps {
  type: VisualType;
  stage: number;
}

export const BrowserMockup: React.FC<BrowserMockupProps> = ({ type, stage }) => {
  return (
    <div className="w-full border border-white/20 rounded-xl overflow-hidden bg-[#0A0C10] shadow-2xl flex flex-col justify-between">
      
      {/* Browser Chrome Header */}
      <div className="bg-[#12151D] px-3 py-2 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-2">
          {/* Window Control Buttons */}
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
          </div>

          {/* Browser Tab Title */}
          <div className={`px-3 py-0.5 rounded text-[10px] font-bold flex items-center gap-1.5 transition-all ${
            type === 'head-title-tab' && stage >= 1
              ? 'bg-prayxis-accent text-black cyan-glow scale-105'
              : 'bg-white/10 text-prayxis-offwhite'
          }`}>
            <Globe className="h-3 w-3" />
            <span className="truncate max-w-[150px]">
              {type === 'head-title-tab' && stage >= 1 ? 'Prayxis Academy' : 'My First Webpage'}
            </span>
          </div>
        </div>

        {/* Address Bar URL */}
        <div className="hidden sm:flex items-center px-3 py-0.5 bg-black/40 border border-white/10 rounded text-[9px] text-prayxis-subtle font-mono">
          http://localhost:3000
        </div>
      </div>

      {/* Rendered Webpage Canvas */}
      <div className="p-4 sm:p-6 bg-[#0E1017] text-prayxis-offwhite font-sans min-h-[280px] flex flex-col justify-between space-y-4 relative overflow-hidden">
        
        {/* Animated Pipeline Stage Overlay Banner */}
        <div className="p-2.5 bg-black/50 border border-white/10 rounded-lg flex items-center justify-between text-[10px] font-mono">
          <div className="flex items-center gap-2">
            <Cpu className={`h-3.5 w-3.5 ${stage >= 2 ? 'text-prayxis-accent animate-pulse' : 'text-gray-500'}`} />
            <span className="text-prayxis-subtle uppercase">PARSER STATUS:</span>
            <span className={`font-bold ${stage === 0 ? 'text-amber-400' : stage === 1 ? 'text-blue-400 animate-pulse' : stage === 2 ? 'text-yellow-400 animate-pulse' : 'text-prayxis-accent'}`}>
              {stage === 0 && '1. WAITING FOR SOURCE CODE'}
              {stage === 1 && '2. READING CODE STREAM ──────▶'}
              {stage === 2 && '3. COMPILING & PARSING TAGS...'}
              {stage === 3 && '4. WEBPAGE RENDERED SUCCESSFULLY ✓'}
            </span>
          </div>

          <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${stage === 3 ? 'bg-prayxis-accent text-black cyan-glow' : 'bg-white/10 text-prayxis-subtle'}`}>
            {stage === 3 ? 'LIVE UI' : 'PARSING'}
          </span>
        </div>

        {/* 1. BROWSER FLOW (Step 1 — What is a Webpage?) */}
        {type === 'browser-flow' && (
          <div className="space-y-4 flex-1 flex flex-col justify-center">
            {/* Rendered Output Page */}
            <div className={`p-4 rounded-xl transition-all duration-500 border ${
              stage >= 2
                ? 'bg-prayxis-surface border-prayxis-accent text-white shadow-lg scale-100 opacity-100 cyan-glow-subtle'
                : 'bg-white/5 border-white/10 opacity-30 scale-95'
            }`}>
              <h1 className="text-xl font-extrabold text-white">Welcome to My Webpage</h1>
              <p className="text-xs text-prayxis-muted mt-1">This webpage was visually rendered from code instructions.</p>
            </div>
          </div>
        )}

        {/* 2. HTML STRUCTURE (Step 2 — What is HTML?) */}
        {type === 'html-structure' && (
          <div className="space-y-3 flex-1 flex flex-col justify-center">
            <div className="text-[10px] font-mono text-prayxis-accent font-bold uppercase flex items-center gap-1.5">
              <Layers className="h-4 w-4" />
              <span>THE 3 WEB ARCHITECTURE LAYERS</span>
            </div>

            <div className="space-y-2 font-mono text-xs">
              <div className={`p-3 rounded-lg border transition-all duration-500 flex items-center justify-between ${stage >= 1 ? 'bg-prayxis-accent/20 border-prayxis-accent text-prayxis-accent font-bold scale-100 opacity-100' : 'bg-white/5 border-white/10 opacity-40 scale-95'}`}>
                <div>
                  <div className="font-bold text-sm">HTML LAYER</div>
                  <div className="text-[10px] text-prayxis-offwhite font-sans">Structure & Skeleton (Headings, Paragraphs, Content)</div>
                </div>
                <span className="px-2 py-0.5 bg-prayxis-accent/20 rounded text-[9px]">ACTIVE</span>
              </div>

              <div className={`p-2.5 rounded-lg border transition-all duration-500 flex items-center justify-between ${stage >= 2 ? 'bg-blue-500/20 border-blue-500 text-blue-300 font-bold opacity-100' : 'bg-white/5 border-white/10 opacity-30'}`}>
                <div>
                  <div className="font-bold text-xs">CSS LAYER</div>
                  <div className="text-[10px] text-gray-300 font-sans">Presentation & Styling (Colors, Fonts, Layouts)</div>
                </div>
                <span className="text-[9px] text-prayxis-subtle">FUTURE</span>
              </div>

              <div className={`p-2.5 rounded-lg border transition-all duration-500 flex items-center justify-between ${stage >= 3 ? 'bg-yellow-500/20 border-yellow-500 text-yellow-300 font-bold opacity-100' : 'bg-white/5 border-white/10 opacity-30'}`}>
                <div>
                  <div className="font-bold text-xs">JAVASCRIPT LAYER</div>
                  <div className="text-[10px] text-gray-300 font-sans">Logic & Interactivity (Actions, Buttons, Data)</div>
                </div>
                <span className="text-[9px] text-prayxis-subtle">FUTURE</span>
              </div>
            </div>
          </div>
        )}

        {/* 3. TAG BREAKDOWN (Step 3 — Tags & Elements) */}
        {type === 'tag-breakdown' && (
          <div className="space-y-4 flex-1 flex flex-col justify-center">
            <div className="p-4 bg-black/60 border border-prayxis-accent/40 rounded-xl space-y-3 font-mono text-center">
              <div className="text-[10px] text-prayxis-accent font-bold uppercase">ANATOMY OF AN HTML ELEMENT</div>

              <div className="flex items-center justify-center gap-2 text-sm sm:text-base font-bold pt-2">
                <span className={`px-2.5 py-1 rounded transition-all duration-300 ${stage >= 1 ? 'bg-prayxis-accent text-black font-extrabold scale-110 cyan-glow' : 'bg-prayxis-accent/20 border border-prayxis-accent/60 text-prayxis-accent'}`}>
                  &lt;p&gt;
                </span>
                <span className={`px-3 py-1 rounded transition-all duration-300 ${stage >= 2 ? 'bg-white text-black font-extrabold scale-110' : 'bg-white/10 text-white'}`}>
                  Hello World
                </span>
                <span className={`px-2.5 py-1 rounded transition-all duration-300 ${stage >= 3 ? 'bg-prayxis-accent text-black font-extrabold scale-110 cyan-glow' : 'bg-prayxis-accent/20 border border-prayxis-accent/60 text-prayxis-accent'}`}>
                  &lt;/p&gt;
                </span>
              </div>

              <div className="grid grid-cols-3 gap-1 text-[9px] pt-2 text-prayxis-subtle border-t border-white/10">
                <div className={stage >= 1 ? 'text-prayxis-accent font-bold' : ''}>1. OPENING TAG</div>
                <div className={stage >= 2 ? 'text-white font-bold' : ''}>2. INNER CONTENT</div>
                <div className={stage >= 3 ? 'text-prayxis-accent font-bold' : ''}>3. CLOSING TAG</div>
              </div>
            </div>

            <div className={`p-3 rounded-lg border text-center text-xs transition-all duration-500 ${stage === 3 ? 'bg-prayxis-accent/20 border-prayxis-accent text-prayxis-accent font-bold cyan-glow scale-105' : 'bg-white/5 border-white/10 text-prayxis-muted'}`}>
              OPENING TAG + INNER CONTENT + CLOSING TAG = 1 COMPLETE HTML ELEMENT
            </div>
          </div>
        )}

        {/* 4. DOCTYPE PARSER (Step 5 — <!DOCTYPE html>) */}
        {type === 'doctype-parser' && (
          <div className="space-y-4 flex-1 flex flex-col justify-center font-mono">
            <div className="text-[10px] text-prayxis-accent font-bold uppercase flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4" />
              <span>PARSER STANDARDS EVALUATION</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* HTML5 Modern Standards Mode */}
              <div className={`p-3.5 rounded-xl border transition-all duration-500 ${stage >= 1 ? 'bg-prayxis-accent/15 border-prayxis-accent text-white cyan-glow-subtle scale-100' : 'bg-white/5 border-white/10 opacity-30 scale-95'}`}>
                <div className="flex items-center gap-1.5 text-prayxis-accent font-bold text-xs">
                  <CheckCircle2 className="h-4 w-4 text-prayxis-accent" />
                  <span>HTML5 STANDARDS MODE</span>
                </div>
                <div className="text-[10px] text-prayxis-subtle font-sans mt-1">
                  Active when Line 1 contains &lt;!DOCTYPE html&gt;. Modern rendering.
                </div>
              </div>

              {/* Legacy Quirks Mode */}
              <div className="p-3.5 rounded-xl border border-red-500/30 bg-red-500/10 text-red-300 opacity-40">
                <div className="flex items-center gap-1.5 font-bold text-xs">
                  <AlertTriangle className="h-4 w-4 text-red-400" />
                  <span>QUIRKS MODE (LEGACY)</span>
                </div>
                <div className="text-[10px] font-sans mt-1">
                  Triggers if Line 1 DOCTYPE is missing. Layouts break in older engines.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 5. HTML ROOT (Step 6 — <html>) */}
        {type === 'html-root' && (
          <div className="space-y-3 flex-1 flex flex-col justify-center font-mono">
            <div className={`p-4 border-2 border-dashed rounded-xl transition-all duration-500 ${stage >= 1 ? 'border-prayxis-accent bg-prayxis-accent/10 cyan-glow-subtle' : 'border-white/20 bg-white/5 opacity-50'}`}>
              <div className="text-prayxis-accent font-bold text-xs uppercase flex items-center justify-between">
                <span>&lt;html&gt; ROOT CONTAINER</span>
                <span className="text-[9px] text-prayxis-subtle">TOP-LEVEL BOUNDARY</span>
              </div>
              <div className="p-3 bg-black/60 border border-white/10 rounded-lg text-[11px] text-prayxis-offwhite space-y-1 mt-2">
                <div className="text-yellow-400">&lt;head&gt; Document Metadata &amp; Tab Title &lt;/head&gt;</div>
                <div className="text-green-400">&lt;body&gt; Visible Screen Canvas Content &lt;/body&gt;</div>
              </div>
              <div className="text-[10px] text-prayxis-subtle font-sans italic text-center pt-1">
                Every single tag on your webpage MUST live inside this root &lt;html&gt; container.
              </div>
            </div>
          </div>
        )}

        {/* 6. HEAD TITLE TAB (Step 7 — <head> & <title>) */}
        {type === 'head-title-tab' && (
          <div className="space-y-4 flex-1 flex flex-col justify-center">
            <div className={`p-4 rounded-xl border-2 transition-all duration-500 space-y-2 font-mono ${stage >= 2 ? 'bg-prayxis-accent/15 border-prayxis-accent text-white cyan-glow-subtle' : 'bg-white/5 border-white/10 opacity-50'}`}>
              <div className="text-prayxis-accent font-extrabold text-xs flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <span>LOOK AT THE TOP BROWSER TAB BAR ↑</span>
              </div>
              <p className="text-xs text-prayxis-offwhite font-sans leading-relaxed">
                The &lt;title&gt; tag sets the name in the browser window tab bar ("Prayxis Academy").
              </p>
            </div>

            <div className="p-4 bg-white/5 border border-white/10 rounded-xl text-center text-xs text-prayxis-subtle font-sans italic">
              Notice: The page body canvas below remains blank—the title NEVER appears inside the page body.
            </div>
          </div>
        )}

        {/* 7. BODY CANVAS (Step 8 — <body>) */}
        {type === 'body-canvas' && (
          <div className="space-y-3 flex-1 flex flex-col justify-center">
            <div className={`p-5 rounded-xl border-2 transition-all duration-500 ${stage >= 2 ? 'border-green-500 bg-green-500/15 text-white cyan-glow-subtle' : 'border-white/10 bg-white/5 opacity-40'}`}>
              <div className="text-[10px] font-bold text-green-400 font-mono uppercase mb-2 flex items-center gap-1.5">
                <Eye className="h-4 w-4" />
                <span>VISIBLE BODY CANVAS AREA</span>
              </div>
              <h1 className="text-xl font-bold text-white">Visible Webpage Content</h1>
              <p className="text-xs text-prayxis-muted mt-1">Everything inside &lt;body&gt; appears directly on screen to visitors.</p>
            </div>
          </div>
        )}

        {/* 8. HEADING HIERARCHY (Step 9, 10, 11 — <h1>, <h2>, <h3>) */}
        {type === 'heading-hierarchy' && (
          <div className="space-y-3 flex-1 flex flex-col justify-center font-mono">
            <div className="text-[10px] text-prayxis-accent font-bold uppercase">DOCUMENT OUTLINE &amp; HEADING HIERARCHY</div>

            <div className="space-y-2 border-l-2 border-prayxis-accent pl-3">
              <div className={`p-2 rounded transition-all duration-300 ${stage >= 1 ? 'bg-prayxis-accent/20 text-prayxis-accent font-bold scale-105' : 'opacity-40'}`}>
                <h1 className="text-xl font-extrabold text-white">&lt;h1&gt; Main Webpage Title (Level 1)</h1>
              </div>
              <div className={`p-2 rounded transition-all duration-300 ml-3 ${stage >= 2 ? 'bg-prayxis-accent/20 text-prayxis-accent font-bold scale-105' : 'opacity-40'}`}>
                <h2 className="text-base font-bold text-prayxis-offwhite">&lt;h2&gt; Section Heading (Level 2)</h2>
              </div>
              <div className={`p-2 rounded transition-all duration-300 ml-6 ${stage >= 3 ? 'bg-prayxis-accent/20 text-prayxis-accent font-bold scale-105' : 'opacity-40'}`}>
                <h3 className="text-xs font-bold text-prayxis-muted">&lt;h3&gt; Subsection Topic (Level 3)</h3>
              </div>
            </div>
          </div>
        )}

        {/* 9. PARAGRAPH BLOCK (Step 12 — <p>) */}
        {type === 'paragraph-block' && (
          <div className="space-y-3 flex-1 flex flex-col justify-center font-sans">
            <div className={`p-3 rounded-lg border transition-all duration-500 ${stage >= 1 ? 'bg-blue-500/15 border-blue-500 text-blue-200 opacity-100' : 'bg-white/5 border-white/10 opacity-30'}`}>
              <div className="font-mono text-[9px] text-blue-400 font-bold mb-1">&lt;p&gt; PARAGRAPH BLOCK 1</div>
              <p className="text-xs">First paragraph text block with automatic spacing.</p>
            </div>

            {/* Glowing Vertical Margin Gap */}
            <div className={`py-1 rounded text-center text-[9px] font-mono font-bold transition-all duration-500 ${stage >= 2 ? 'bg-yellow-500/20 border border-yellow-500/50 text-yellow-300 cyan-glow-subtle' : 'bg-white/5 text-gray-500 opacity-30'}`}>
              ↕ AUTOMATIC VERTICAL MARGIN GAP
            </div>

            <div className={`p-3 rounded-lg border transition-all duration-500 ${stage >= 3 ? 'bg-green-500/15 border-green-500 text-green-200 opacity-100' : 'bg-white/5 border-white/10 opacity-30'}`}>
              <div className="font-mono text-[9px] text-green-400 font-bold mb-1">&lt;p&gt; PARAGRAPH BLOCK 2</div>
              <p className="text-xs">Second paragraph text block placed below margin gap.</p>
            </div>
          </div>
        )}

        {/* 10. LINE BREAK (Step 13 — <br>) */}
        {type === 'line-break' && (
          <div className="space-y-3 flex-1 flex flex-col justify-center font-mono">
            <div className="p-4 bg-black/60 border border-white/10 rounded-xl space-y-2 text-xs">
              <div className="text-prayxis-offwhite font-bold">Prayxis Tech Park</div>
              <div className={`p-1 border text-prayxis-accent font-bold inline-block text-[10px] rounded transition-all duration-300 ${stage >= 2 ? 'bg-prayxis-accent text-black scale-105 cyan-glow' : 'bg-prayxis-accent/10 border-prayxis-accent/40'}`}>
                &lt;br&gt; VOID LINE BREAK
              </div>
              <div className={`text-prayxis-offwhite font-bold transition-all duration-300 ${stage >= 3 ? 'text-white translate-x-1 font-extrabold' : ''}`}>
                Sector 62, Noida
              </div>
            </div>

            <div className="p-2.5 bg-prayxis-accent/10 border border-prayxis-accent/30 rounded text-center text-[10px] text-prayxis-accent font-bold font-sans">
              Notice: The line broke instantly onto Line 2 without adding a paragraph vertical margin gap!
            </div>
          </div>
        )}

        {/* 11. COMMENT VISIBILITY (Step 14 — Comments) */}
        {type === 'comment-visibility' && (
          <div className="space-y-3 flex-1 flex flex-col justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 bg-black/60 border border-white/10 rounded-xl space-y-1">
                <div className="text-prayxis-accent font-bold text-[10px]">SOURCE CODE VIEW</div>
                <div className="text-green-400 text-[10px]">&lt;!-- Developer note --&gt;</div>
                <div className="text-white font-bold">&lt;h1&gt;Visible Title&lt;/h1&gt;</div>
              </div>

              <div className={`p-3 rounded-xl space-y-1 transition-all duration-500 border ${stage >= 2 ? 'bg-prayxis-surface border-prayxis-accent/60 opacity-100' : 'bg-white/5 border-white/10 opacity-40'}`}>
                <div className="text-prayxis-accent font-bold text-[10px]">PUBLIC BROWSER CANVAS</div>
                <div className="text-white font-bold text-sm">Visible Title</div>
                <div className="text-red-400 text-[9px] italic flex items-center gap-1 mt-2">
                  <EyeOff className="h-3 w-3" />
                  <span>(Comment is 100% hidden)</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 12. DOCUMENT SKELETON (Step 15 — Mini Project) */}
        {type === 'document-skeleton' && (
          <div className="space-y-3 flex-1 flex flex-col justify-center">
            <div className={`p-4 rounded-xl border transition-all duration-500 space-y-2 ${stage >= 2 ? 'bg-prayxis-surface border-prayxis-accent/80 cyan-glow-subtle opacity-100' : 'bg-white/5 border-white/10 opacity-30'}`}>
              <h1 className="text-lg font-extrabold text-white">Alex Student</h1>
              <h2 className="text-xs font-bold text-prayxis-accent">Web Development Intern</h2>
              <h3 className="text-[10px] font-mono text-prayxis-muted">Prayxis Academy — Day 01</h3>
              <p className="text-xs text-prayxis-offwhite pt-1">Learning full stack web development.<br />HTML is my foundation.</p>
            </div>
          </div>
        )}

        {/* Footer Status Bar */}
        <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[9px] text-prayxis-subtle font-mono">
          <span>STATUS: RENDERED</span>
          <span className="text-prayxis-accent font-bold">100% VALID HTML5</span>
        </div>

      </div>
    </div>
  );
};
