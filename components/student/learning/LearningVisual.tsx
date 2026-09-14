'use client';

import React, { useState, useEffect } from 'react';
import { FileCode, Sparkles, RotateCcw, ChevronLeft, ChevronRight, Play, Pause, ArrowRight, Cpu, Zap, Globe } from 'lucide-react';
import { BrowserMockup } from './BrowserMockup';

export type VisualType =
  | 'browser-flow'
  | 'html-structure'
  | 'tag-breakdown'
  | 'doctype-parser'
  | 'html-root'
  | 'head-title-tab'
  | 'body-canvas'
  | 'heading-hierarchy'
  | 'paragraph-block'
  | 'line-break'
  | 'comment-visibility'
  | 'document-skeleton';

interface LearningVisualProps {
  type: VisualType;
}

export const LearningVisual: React.FC<LearningVisualProps> = ({ type }) => {
  const [stage, setStage] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);

  useEffect(() => {
    setStage(0);
    setIsAutoPlaying(false);
  }, [type]);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setStage((prev) => {
        if (prev >= 3) {
          setIsAutoPlaying(false);
          return 3;
        }
        return prev + 1;
      });
    }, 2200);

    return () => clearInterval(interval);
  }, [isAutoPlaying, type]);

  const handleNextStage = () => {
    setIsAutoPlaying(false);
    setStage((prev) => (prev < 3 ? prev + 1 : 3));
  };

  const handlePrevStage = () => {
    setIsAutoPlaying(false);
    setStage((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const handleSelectStage = (idx: number) => {
    setIsAutoPlaying(false);
    setStage(idx);
  };

  const handleReplay = () => {
    setStage(0);
    setIsAutoPlaying(false);
  };

  const toggleAutoPlay = () => {
    if (stage >= 3) setStage(0);
    setIsAutoPlaying(!isAutoPlaying);
  };

  const STAGE_LABELS = [
    { title: '1. WRITE CODE', icon: FileCode, desc: 'HTML source code written in text editor' },
    { title: '2. DATA PIPELINE', icon: Zap, desc: 'Code stream transmitted to browser engine' },
    { title: '3. PARSE TAGS', icon: Cpu, desc: 'Browser reads tags & builds element DOM nodes' },
    { title: '4. RENDER UI', icon: Globe, desc: 'Visual webpage rendered on screen' },
  ];

  return (
    <div className="w-full p-4 sm:p-5 bg-[#07080B] border border-prayxis-accent/40 rounded-2xl overflow-hidden backdrop-blur-md cyan-glow-subtle font-mono text-xs my-4 space-y-5">
      
      {/* Interactive 4-Stage Pipeline Stepper Bar */}
      <div className="space-y-3 border-b border-white/10 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-prayxis-accent font-bold text-[11px] uppercase">
            <Sparkles className="h-4 w-4 text-prayxis-accent" />
            <span>INTERACTIVE COMPILATION PIPELINE FLOW</span>
          </div>

          <div className="flex items-center gap-2 text-[10px] text-prayxis-subtle font-bold uppercase">
            <span>ACTIVE STEP:</span>
            <span className="text-prayxis-accent font-extrabold">{stage + 1} / 4</span>
          </div>
        </div>

        {/* 4 Interactive Flow Stage Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {STAGE_LABELS.map((st, idx) => {
            const Icon = st.icon;
            const isActive = stage === idx;
            const isPast = stage > idx;

            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectStage(idx)}
                className={`p-2.5 rounded-xl border text-left transition-all relative overflow-hidden ${
                  isActive
                    ? 'bg-prayxis-accent/20 border-prayxis-accent text-prayxis-accent font-bold cyan-glow-subtle scale-[1.02]'
                    : isPast
                    ? 'bg-white/10 border-prayxis-accent/50 text-prayxis-offwhite'
                    : 'bg-white/5 border-white/10 text-prayxis-muted hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono font-extrabold">{st.title}</span>
                  <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-prayxis-accent animate-pulse' : 'text-prayxis-subtle'}`} />
                </div>
                <div className="text-[9px] font-sans text-prayxis-subtle truncate">{st.desc}</div>

                {/* Bottom Active Progress Line */}
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-prayxis-accent cyan-glow" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2-Column Split: Code View (45%) vs Realistic Browser Preview (55%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch relative">
        
        {/* Left Column: Code Editor View (5 Cols) */}
        <div className="lg:col-span-5 p-4 bg-black/90 border border-white/15 rounded-xl space-y-3 flex flex-col justify-between relative overflow-hidden">
          
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <div className="flex items-center gap-2 text-prayxis-accent font-bold text-[11px]">
              <FileCode className="h-4 w-4" />
              <span>INDEX.HTML</span>
            </div>
            <span className="text-[9px] text-prayxis-subtle uppercase">SOURCE CODE</span>
          </div>

          {/* Code Snippet Highlight lines */}
          <div className="font-mono text-[11px] leading-relaxed text-prayxis-offwhite py-1 space-y-1 overflow-x-auto min-h-[170px] flex flex-col justify-center">
            
            {type === 'browser-flow' && (
              <div>
                <span className="text-prayxis-subtle">&lt;!DOCTYPE html&gt;</span>
                <br />
                <span className="text-prayxis-accent font-bold">&lt;html&gt;</span>
                <br />
                <span className="pl-3 text-prayxis-subtle">&lt;head&gt; ... &lt;/head&gt;</span>
                <br />
                <span className="pl-3 text-prayxis-offwhite">&lt;body&gt;</span>
                <br />
                <span className={`pl-6 block transition-all rounded py-0.5 ${stage >= 1 ? 'bg-prayxis-accent/30 border-l-2 border-prayxis-accent text-prayxis-accent font-bold px-1 cyan-glow-subtle' : ''}`}>
                  &lt;h1&gt;Welcome to My Webpage&lt;/h1&gt;
                </span>
                <span className="pl-3 text-prayxis-offwhite">&lt;/body&gt;</span>
                <br />
                <span className="text-prayxis-accent font-bold">&lt;/html&gt;</span>
              </div>
            )}

            {type === 'tag-breakdown' && (
              <div className="space-y-1.5">
                <div className={`p-1.5 rounded border transition-all ${stage === 0 || stage === 1 ? 'border-prayxis-accent bg-prayxis-accent/30 text-prayxis-accent font-bold scale-105 cyan-glow-subtle' : 'border-white/10'}`}>
                  &lt;p&gt; <span className="text-prayxis-subtle text-[9px] ml-2">← Opening Tag</span>
                </div>
                <div className={`p-1.5 rounded border transition-all ${stage === 2 ? 'border-prayxis-accent bg-prayxis-accent/30 text-white font-bold scale-105' : 'border-white/10'}`}>
                  Hello World <span className="text-prayxis-subtle text-[9px] ml-2">← Content</span>
                </div>
                <div className={`p-1.5 rounded border transition-all ${stage === 3 ? 'border-prayxis-accent bg-prayxis-accent/30 text-prayxis-accent font-bold scale-105 cyan-glow-subtle' : 'border-white/10'}`}>
                  &lt;/p&gt; <span className="text-prayxis-subtle text-[9px] ml-2">← Closing Tag</span>
                </div>
              </div>
            )}

            {type === 'doctype-parser' && (
              <div>
                <div className={`p-1.5 rounded transition-all ${stage >= 0 ? 'bg-prayxis-accent/30 border-l-2 border-prayxis-accent text-prayxis-accent font-bold cyan-glow-subtle' : 'text-prayxis-muted'}`}>
                  &lt;!DOCTYPE html&gt;
                </div>
                <span className="text-prayxis-accent font-bold">&lt;html&gt;</span>
                <br />
                <span className="pl-3 text-prayxis-subtle">&lt;head&gt; ... &lt;/head&gt;</span>
                <br />
                <span className="pl-3 text-prayxis-offwhite">&lt;body&gt; ... &lt;/body&gt;</span>
                <br />
                <span className="text-prayxis-accent font-bold">&lt;/html&gt;</span>
              </div>
            )}

            {type === 'html-root' && (
              <div>
                <div className={`p-1 rounded transition-all ${stage >= 0 ? 'bg-prayxis-accent/30 text-prayxis-accent font-bold cyan-glow-subtle' : ''}`}>
                  &lt;html&gt;
                </div>
                <div className="pl-4 text-prayxis-muted">// Root container wraps all document elements</div>
                <div className={`p-1 rounded transition-all ${stage >= 0 ? 'bg-prayxis-accent/30 text-prayxis-accent font-bold cyan-glow-subtle' : ''}`}>
                  &lt;/html&gt;
                </div>
              </div>
            )}

            {type === 'head-title-tab' && (
              <div>
                <span className="text-prayxis-subtle">&lt;head&gt;</span>
                <br />
                <div className={`pl-3 p-1 rounded transition-all ${stage >= 0 ? 'bg-prayxis-accent/30 border-l-2 border-prayxis-accent text-prayxis-accent font-bold cyan-glow-subtle' : ''}`}>
                  &lt;title&gt;Prayxis Academy&lt;/title&gt;
                </div>
                <span className="text-prayxis-subtle">&lt;/head&gt;</span>
              </div>
            )}

            {type === 'body-canvas' && (
              <div>
                <span className="text-prayxis-subtle">&lt;head&gt; ... &lt;/head&gt;</span>
                <br />
                <div className={`p-1.5 rounded transition-all ${stage >= 0 ? 'bg-prayxis-accent/30 border-l-2 border-prayxis-accent text-prayxis-accent font-bold cyan-glow-subtle' : ''}`}>
                  &lt;body&gt;
                  <div className="pl-4 text-white">&lt;h1&gt;Visible Content&lt;/h1&gt;</div>
                  &lt;/body&gt;
                </div>
              </div>
            )}

            {type === 'heading-hierarchy' && (
              <div className="space-y-1">
                <div className={`p-1 rounded transition-all ${stage === 0 ? 'bg-prayxis-accent/30 text-prayxis-accent font-bold scale-105' : ''}`}>
                  &lt;h1&gt;Main Heading&lt;/h1&gt;
                </div>
                <div className={`p-1 rounded transition-all ${stage === 1 ? 'bg-prayxis-accent/30 text-prayxis-accent font-bold scale-105' : ''}`}>
                  &lt;h2&gt;Section Heading&lt;/h2&gt;
                </div>
                <div className={`p-1 rounded transition-all ${stage >= 2 ? 'bg-prayxis-accent/30 text-prayxis-accent font-bold scale-105' : ''}`}>
                  &lt;h3&gt;Subsection Heading&lt;/h3&gt;
                </div>
              </div>
            )}

            {type === 'paragraph-block' && (
              <div className="space-y-1">
                <div className={`p-1 rounded transition-all ${stage === 0 || stage === 1 ? 'bg-blue-500/30 text-blue-300 font-bold' : ''}`}>
                  &lt;p&gt;First paragraph block text.&lt;/p&gt;
                </div>
                <div className={`p-1 rounded transition-all ${stage === 2 || stage === 3 ? 'bg-green-500/30 text-green-300 font-bold' : ''}`}>
                  &lt;p&gt;Second paragraph block text.&lt;/p&gt;
                </div>
              </div>
            )}

            {type === 'line-break' && (
              <div>
                <span>Prayxis Tech Park</span>
                <span className={`px-1 mx-1 rounded font-bold transition-all ${stage >= 1 ? 'bg-prayxis-accent text-black cyan-glow' : 'text-prayxis-accent'}`}>
                  &lt;br&gt;
                </span>
                <span>Sector 62, Noida</span>
              </div>
            )}

            {type === 'comment-visibility' && (
              <div>
                <div className={`p-1 rounded transition-all ${stage >= 0 ? 'bg-green-500/30 text-green-400 font-bold' : 'text-gray-500'}`}>
                  &lt;!-- Developer note --&gt;
                </div>
                <div className="text-white">&lt;h1&gt;Visible Title&lt;/h1&gt;</div>
              </div>
            )}

            {(type === 'html-structure' || type === 'document-skeleton') && (
              <div>
                <span className="text-prayxis-subtle">&lt;!DOCTYPE html&gt;</span>
                <br />
                <span className="text-prayxis-accent font-bold">&lt;html&gt;</span>
                <br />
                <span className="pl-3 text-yellow-400">&lt;head&gt; ... &lt;/head&gt;</span>
                <br />
                <span className="pl-3 text-green-400">&lt;body&gt; ... &lt;/body&gt;</span>
                <br />
                <span className="text-prayxis-accent font-bold">&lt;/html&gt;</span>
              </div>
            )}

            {/* Collapsed Code Footer Indicator */}
            <div className="pt-2 text-[9px] text-prayxis-subtle border-t border-white/10 italic">
              ... [ more HTML code lines below ] ...
            </div>
          </div>

          {/* Active Stage Indicator Badge */}
          <div className="p-2 bg-prayxis-accent/10 border border-prayxis-accent/40 rounded-lg text-[10px] text-prayxis-accent font-bold flex items-center justify-between">
            <span className="truncate">STAGE {stage + 1}: {STAGE_LABELS[stage].desc}</span>
            <ArrowRight className="h-3.5 w-3.5 animate-pulse shrink-0" />
          </div>
        </div>

        {/* Right Column: Realistic Mini Webpage Preview (7 Cols) */}
        <div className="lg:col-span-7">
          <BrowserMockup type={type} stage={stage} />
        </div>

      </div>

      {/* Bottom Interactive Control Toolbar */}
      <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrevStage}
            disabled={stage === 0}
            className="px-3 py-1.5 bg-white/5 border border-white/10 hover:border-white/20 text-prayxis-offwhite rounded-lg text-[11px] font-mono uppercase disabled:opacity-40 flex items-center gap-1.5 cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>PREV STAGE</span>
          </button>

          <button
            type="button"
            onClick={handleNextStage}
            disabled={stage === 3}
            className="px-4 py-1.5 bg-prayxis-accent text-black font-extrabold rounded-lg text-[11px] font-mono uppercase hover:bg-white transition-colors flex items-center gap-1.5 cyan-glow disabled:opacity-40 cursor-pointer"
          >
            <span>NEXT STAGE</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleAutoPlay}
            className="px-3 py-1.5 bg-white/5 border border-white/10 hover:border-prayxis-accent text-prayxis-muted hover:text-white rounded-lg text-[11px] font-mono uppercase flex items-center gap-1.5 cursor-pointer"
          >
            {isAutoPlaying ? <Pause className="h-4 w-4 text-amber-400 animate-pulse" /> : <Play className="h-4 w-4 text-prayxis-accent" />}
            <span>{isAutoPlaying ? 'PAUSE FLOW' : 'AUTO FLOW ▶'}</span>
          </button>

          <button
            type="button"
            onClick={handleReplay}
            className="px-3 py-1.5 bg-white/5 border border-white/10 hover:border-white/20 text-prayxis-muted hover:text-white rounded-lg text-[11px] font-mono uppercase flex items-center gap-1.5 cursor-pointer"
            title="Reset animation flow"
          >
            <RotateCcw className="h-4 w-4" />
            <span>RESET</span>
          </button>
        </div>
      </div>

    </div>
  );
};
