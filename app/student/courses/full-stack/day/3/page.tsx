'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ActiveLearningTracker, ActivityState } from '@/components/student/ActiveLearningTracker';
import { ActiveLearningTimer } from '@/components/student/ActiveLearningTimer';
import { HtmlPlayground } from '@/components/student/HtmlPlayground';
import { LearningVisual } from '@/components/student/learning/LearningVisual';
import { DAY_03_STEPS, DAY_03_QUIZ_QUESTIONS, DAY_03_CHECKLIST, DAY_03_STEPS_HINGLISH, DAY_03_QUIZ_QUESTIONS_HINGLISH } from '@/data/day03Data';
import { LanguageSelector } from '@/components/student/LanguageSelector';
import {
  Terminal,
  CheckCircle2,
  Lock,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  HelpCircle,
  Code2,
  ChevronRight,
  Award,
  Lightbulb,
  AlertTriangle,
  Sparkles,
  Globe,
  PanelLeft,
  PanelLeftClose,
  PanelLeftOpen,
  MessageCircle,
  FileCode2,
  Bug,
  CheckSquare,
  Heading,
  AlignLeft,
  WrapText,
} from 'lucide-react';
import { getCourseEnrollmentStatus } from '@/lib/utils/dayUnlock';
import { getWhatsAppEnrollUrl } from '@/lib/whatsapp';

export default function Day03LessonPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [todaySeconds, setTodaySeconds] = useState(0);
  const [activityState, setActivityState] = useState<ActivityState>('ACTIVE');

  // Sidebar collapsible state
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Step navigation state (1 to 15)
  const [currentStepId, setCurrentStepId] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set([1]));

  // Step question answers state
  const [stepAnswers, setStepAnswers] = useState<Record<number, number>>({});

  // Practice Lab interactive state (Step 13)
  const [practiceAnswers, setPracticeAnswers] = useState<Record<string, string>>({});
  const [tfAnswers, setTfAnswers] = useState<Record<number, boolean>>({});

  // Debugging Lab interactive state (Step 14)
  const [debugSubmitted, setDebugSubmitted] = useState<Record<number, boolean>>({});

  // Solution reveal toggle for Step 12 & 15
  const [showSolution12, setShowSolution12] = useState(false);
  const [showSolution15, setShowSolution15] = useState(false);

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  // Completion Checklist items check state
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());

  // Practical Task State
  const [practicalCompleted, setPracticalCompleted] = useState(false);

  const [user, setUser] = useState<any>(null);

  // Auto scroll to top when changing step
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStepId]);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          const data = await res.json();
          if (data.user) setUser(data.user);
          if (data.stats) setTodaySeconds(data.stats.todayActiveSeconds || 0);
        }
      } catch (err) {
        // Allow guest access
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, [router]);

  // Language preference state ('en' | 'hinglish')
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'hinglish'>('en');

  useEffect(() => {
    const saved = localStorage.getItem('prayxis_course_language');
    if (saved === 'hinglish' || saved === 'en') {
      setCurrentLanguage(saved as 'en' | 'hinglish');
    }
  }, []);

  const steps = currentLanguage === 'hinglish' ? DAY_03_STEPS_HINGLISH : DAY_03_STEPS;
  const quizQuestions = currentLanguage === 'hinglish' ? DAY_03_QUIZ_QUESTIONS_HINGLISH : DAY_03_QUIZ_QUESTIONS;

  const currentStep = steps.find((s) => s.id === currentStepId) || steps[0];

  const handleNextStep = () => {
    setCompletedSteps((prev) => new Set([...prev, currentStepId]));
    if (currentStepId < steps.length) {
      setCurrentStepId((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStepId > 1) {
      setCurrentStepId((prev) => prev - 1);
    }
  };

  const handleQuizOptionSelect = (questionId: number, optionIdx: number) => {
    if (quizSubmitted) return;
    setQuizAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
  };

  const handleQuizSubmit = () => {
    let score = 0;
    quizQuestions.forEach((q) => {
      if (quizAnswers[q.id] === q.correctIndex) score += 1;
    });
    setQuizScore(score);
    setQuizSubmitted(true);
    setCompletedSteps((prev) => new Set([...prev, steps.length]));
  };

  const toggleChecklistItem = (idx: number) => {
    setCheckedItems((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  // Progress Calculation
  const progressPercentage = Math.min(100, Math.round((completedSteps.size / steps.length) * 100));

  if (loading) {
    return (
      <div className="min-h-screen bg-prayxis-bg flex items-center justify-center font-mono text-xs text-prayxis-accent">
        <span>LOADING DAY 03 MODULE...</span>
      </div>
    );
  }

  const courseStatus = getCourseEnrollmentStatus(user, 'full-stack');
  const isAdmin = user?.role === 'ADMIN';

  // Block un-enrolled / unapproved users from reading course lesson
  if (!courseStatus.isEnrolled && !isAdmin) {
    return (
      <div className="relative min-h-screen bg-prayxis-bg text-prayxis-offwhite flex flex-col justify-between select-none">
        <Navbar />
        <main className="relative z-10 flex-1 pt-32 pb-20 px-6 sm:px-12 lg:px-20 max-w-4xl mx-auto w-full flex items-center justify-center">
          <div className="p-8 sm:p-12 bg-prayxis-surface/90 border border-yellow-500/50 rounded-3xl backdrop-blur-md space-y-6 text-center shadow-2xl w-full">
            <div className="h-16 w-16 bg-yellow-500/10 border border-yellow-500/40 rounded-full flex items-center justify-center mx-auto text-yellow-400">
              <Lock className="h-8 w-8" />
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-yellow-500/10 border border-yellow-500/40 rounded-full font-mono text-xs text-yellow-400 uppercase tracking-wider font-bold">
              <AlertTriangle className="h-4 w-4" />
              <span>COURSE ACCESS REQUIRED</span>
            </div>

            <h1 className="font-mono text-2xl sm:text-3xl font-extrabold text-prayxis-offwhite uppercase tracking-tight">
              FULL STACK DAY 03 ACCESS LOCKED
            </h1>

            <p className="body-medium text-prayxis-muted leading-relaxed max-w-xl mx-auto font-normal">
              {courseStatus.isRequested
                ? 'Your enrollment request for Full Stack Web Development is pending Admin approval. Contact support on WhatsApp for quick activation.'
                : 'Aapne abhi tak is course me enroll nahi kiya hai. Special Student Offer me sirf ₹199 me enroll karke complete access payein.'}
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => {
                  if (!user) {
                    router.push('/login?redirect=/student/courses/full-stack/day/3');
                    return;
                  }
                  const waUrl = getWhatsAppEnrollUrl({
                    userId: user.id,
                    userName: user.name,
                    userEmail: user.email,
                    courseTitle: 'Full Stack Web Development',
                    price: 199,
                    offer: 'Special Student Offer',
                  });
                  window.open(waUrl, '_blank');
                }}
                className="w-full sm:w-auto px-8 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-black font-mono text-xs font-black uppercase rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                <MessageCircle className="h-4 w-4 fill-black text-black" />
                <span>PING ON WHATSAPP (+91 78777 16367)</span>
              </button>

              <Link
                href="/student/courses"
                className="w-full sm:w-auto px-6 py-3.5 bg-white/5 border border-white/10 hover:border-prayxis-accent text-prayxis-offwhite font-mono text-xs uppercase rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>VIEW ALL COURSES</span>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-prayxis-bg text-prayxis-offwhite flex flex-col justify-between">
      {/* Heartbeat Active Learning Tracker */}
      <ActiveLearningTracker
        courseSlug="full-stack"
        dayNumber={3}
        initialTodaySeconds={todaySeconds}
        onTimeUpdate={({ todaySeconds: tSecs }) => setTodaySeconds(tSecs)}
        onStateChange={(state) => setActivityState(state)}
      />

      <Navbar />

      <main className="relative z-10 flex-1 pt-24 pb-16 px-4 sm:px-8 lg:px-12 max-w-[1280px] mx-auto w-full space-y-6">
        {/* Navigation Breadcrumb & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 bg-prayxis-surface/90 border border-white/10 hover:border-prayxis-accent/60 text-prayxis-muted hover:text-prayxis-accent rounded-lg flex items-center gap-2 transition-all font-mono text-xs cyan-glow-subtle"
              title={isSidebarOpen ? 'Collapse sidebar for wider reading canvas' : 'Expand steps sidebar'}
            >
              <PanelLeft className="h-4 w-4 text-prayxis-accent" />
              <span className="hidden sm:inline font-bold">{isSidebarOpen ? 'HIDE STEPS' : 'SHOW STEPS'}</span>
            </button>

            <nav className="font-mono text-xs text-prayxis-muted flex items-center gap-2 select-none">
              <Link href="/student" className="hover:text-prayxis-offwhite transition-colors">
                STUDENT CONSOLE
              </Link>
              <span>/</span>
              <Link href="/student/courses/full-stack" className="hover:text-prayxis-offwhite transition-colors">
                FULL STACK
              </Link>
              <span>/</span>
              <span className="text-prayxis-accent font-bold">DAY 03</span>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <div className="font-mono text-xs text-prayxis-accent font-bold uppercase tracking-wider hidden md:block">
              DAY 03 / 45 — HEADINGS, PARAGRAPHS & LINE BREAKS (2H 40M)
            </div>
            <LanguageSelector currentLanguage={currentLanguage} onChange={setCurrentLanguage} />
          </div>
        </div>

        {/* Live Active Timer */}
        <ActiveLearningTimer
          todayActiveSeconds={todaySeconds}
          activityState={activityState}
          targetDailySeconds={9600}
        />

        {/* Main 2-Column Learning Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start transition-all">
          {/* Left Column: Lesson Step Sidebar Navigator */}
          {isSidebarOpen && (
            <div className="lg:col-span-4 lg:sticky lg:top-24 max-h-[calc(100vh-7rem)] overflow-y-auto p-5 bg-prayxis-surface/90 border border-white/10 rounded-2xl backdrop-blur-md space-y-4 cyan-glow-subtle font-mono text-xs transition-all">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsSidebarOpen(false)}
                    className="p-1 bg-white/5 hover:bg-prayxis-accent/20 text-prayxis-muted hover:text-prayxis-accent rounded transition-colors"
                    title="Collapse Sidebar"
                  >
                    <PanelLeftClose className="h-4 w-4 text-prayxis-accent" />
                  </button>
                  <span className="text-prayxis-accent font-bold uppercase">DAY 03 STEPS</span>
                </div>
                <span className="text-prayxis-subtle">
                  {completedSteps.size} / {steps.length} COMPLETED
                </span>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] text-prayxis-subtle uppercase">
                  <span>DAY PROGRESS</span>
                  <span className="text-prayxis-accent font-bold">{progressPercentage}%</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/10">
                  <div
                    className="h-full bg-prayxis-accent transition-all duration-300 cyan-glow"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>

              {/* Steps List */}
              <div className="space-y-1 max-h-[540px] overflow-y-auto pr-1">
                {steps.map((st) => {
                  const isActive = currentStepId === st.id;
                  const isCompleted = completedSteps.has(st.id);

                  return (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => setCurrentStepId(st.id)}
                      className={`w-full p-2.5 rounded text-left flex items-center justify-between transition-all ${
                        isActive
                          ? 'bg-prayxis-accent text-black font-bold'
                          : isCompleted
                          ? 'bg-white/5 text-prayxis-offwhite hover:bg-white/10'
                          : 'text-prayxis-muted hover:text-prayxis-offwhite'
                      }`}
                    >
                      <span className="truncate text-[11px]">{st.title}</span>
                      {isCompleted ? (
                        <CheckCircle2
                          className={`h-3.5 w-3.5 shrink-0 ${isActive ? 'text-black' : 'text-prayxis-accent'}`}
                        />
                      ) : (
                        <ChevronRight className="h-3.5 w-3.5 opacity-40 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Right Column: Step Lesson Content Canvas */}
          <div
            className={`${
              isSidebarOpen ? 'lg:col-span-8' : 'lg:col-span-12'
            } p-6 sm:p-8 bg-prayxis-surface/90 border border-prayxis-accent/40 rounded-2xl backdrop-blur-md space-y-7 cyan-glow-subtle font-mono text-xs transition-all`}
          >
            {/* Step Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-prayxis-accent/10 border border-prayxis-accent/40 rounded-full text-[10px] text-prayxis-accent uppercase font-bold">
                  <BookOpen className="h-3.5 w-3.5" />
                  <span>
                    STEP {currentStep.id} OF {DAY_03_STEPS.length}
                  </span>
                </div>
                <h2 className="text-2xl font-extrabold text-prayxis-offwhite uppercase tracking-tight">
                  {currentStep.concept}
                </h2>
              </div>

              {!isSidebarOpen && (
                <button
                  type="button"
                  onClick={() => setIsSidebarOpen(true)}
                  className="self-start sm:self-center px-3 py-1.5 bg-prayxis-accent/10 border border-prayxis-accent/50 text-prayxis-accent hover:bg-prayxis-accent hover:text-black rounded-lg flex items-center gap-2 transition-all font-mono text-xs font-bold"
                  title="Expand Steps Sidebar"
                >
                  <PanelLeftOpen className="h-4 w-4" />
                  <span>
                    SHOW ALL STEPS ({currentStep.id}/{DAY_03_STEPS.length})
                  </span>
                </button>
              )}
            </div>

            {/* STEP 13: PRACTICE LAB */}
            {currentStep.id === 13 ? (
              <div className="space-y-6">
                <div className="p-4 bg-white/5 border border-prayxis-accent/40 rounded-xl space-y-2">
                  <div className="text-prayxis-accent font-bold text-sm">STEP 13 // PRACTICE LAB & EXERCISES</div>
                  <p className="text-prayxis-muted body-small">
                    Test your understanding across 8 interactive practice challenges covering headings, hierarchy, paragraphs, and line breaks.
                  </p>
                </div>

                {/* Lab 01 - 04 Code Examples */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-black/60 border border-white/10 rounded-xl space-y-2">
                    <div className="text-prayxis-accent font-bold text-xs uppercase flex items-center gap-1.5">
                      <Heading className="h-4 w-4" />
                      <span>LAB 01: MY INTRODUCTION</span>
                    </div>
                    <pre className="p-3 bg-black/80 rounded font-mono text-[11px] text-prayxis-offwhite leading-relaxed overflow-x-auto">
{`<h1>My Introduction</h1>
<p>I am a web development student.</p>`}
                    </pre>
                  </div>

                  <div className="p-4 bg-black/60 border border-white/10 rounded-xl space-y-2">
                    <div className="text-prayxis-accent font-bold text-xs uppercase flex items-center gap-1.5">
                      <Heading className="h-4 w-4" />
                      <span>LAB 02: MY EDUCATION</span>
                    </div>
                    <pre className="p-3 bg-black/80 rounded font-mono text-[11px] text-prayxis-offwhite leading-relaxed overflow-x-auto">
{`<h2>My Education</h2>
<p>Currently studying Full Stack Engineering.</p>`}
                    </pre>
                  </div>

                  <div className="p-4 bg-black/60 border border-white/10 rounded-xl space-y-2">
                    <div className="text-prayxis-accent font-bold text-xs uppercase flex items-center gap-1.5">
                      <Heading className="h-4 w-4" />
                      <span>LAB 03: MY SKILLS</span>
                    </div>
                    <pre className="p-3 bg-black/80 rounded font-mono text-[11px] text-prayxis-offwhite leading-relaxed overflow-x-auto">
{`<h2>My Skills</h2>
<p>Currently learning HTML foundations.</p>`}
                    </pre>
                  </div>

                  <div className="p-4 bg-black/60 border border-white/10 rounded-xl space-y-2">
                    <div className="text-prayxis-accent font-bold text-xs uppercase flex items-center gap-1.5">
                      <Heading className="h-4 w-4" />
                      <span>LAB 04: MY GOAL</span>
                    </div>
                    <pre className="p-3 bg-black/80 rounded font-mono text-[11px] text-prayxis-offwhite leading-relaxed overflow-x-auto">
{`<h2>My Goal</h2>
<p>My goal is to become a developer.</p>`}
                    </pre>
                  </div>
                </div>

                {/* Lab 05: Contact Info with Line Breaks */}
                <div className="p-5 bg-black/40 border border-white/10 rounded-xl space-y-3">
                  <div className="text-prayxis-accent font-bold text-xs uppercase flex items-center gap-1.5">
                    <WrapText className="h-4 w-4" />
                    <span>LAB 05: MULTI-LINE CONTACT INFO WITH &lt;br&gt;</span>
                  </div>
                  <pre className="p-3 bg-black/80 border border-white/10 rounded font-mono text-xs text-prayxis-accent overflow-x-auto">
{`<p>
  Name: Prashant<br>
  Course: Full Stack Web Development<br>
  Goal: Software Engineer
</p>`}
                  </pre>
                </div>

                {/* Lab 06: Heading Hierarchy Ordering */}
                <div className="p-5 bg-black/40 border border-white/10 rounded-xl space-y-3">
                  <div className="text-prayxis-accent font-bold text-xs uppercase">LAB 06 // HEADING HIERARCHY ORDERING</div>
                  <p className="text-prayxis-muted text-xs">Verify the correct structure for a portfolio outline:</p>
                  <pre className="p-3 bg-black/80 border border-prayxis-accent/40 rounded font-mono text-xs text-prayxis-offwhite leading-relaxed">
{`<h1>My Portfolio</h1>

<h2>About Me</h2>

<h2>My Education</h2>
  <h3>School</h3>
  <h3>College</h3>

<h2>My Goals</h2>`}
                  </pre>
                </div>
              </div>
            ) : currentStep.id === 14 ? (
              /* STEP 14: DEBUGGING LAB */
              <div className="space-y-6">
                <div className="p-4 bg-white/5 border border-prayxis-accent/40 rounded-xl space-y-2">
                  <div className="text-prayxis-accent font-bold text-sm">STEP 14 // DEBUGGING LAB</div>
                  <p className="text-prayxis-muted body-small">
                    Analyze 6 intentionally broken HTML code snippets. Identify structural bugs (invalid closing tags, hierarchy jumps, invalid &lt;/br&gt; tags, unclosed paragraphs) and fix them!
                  </p>
                </div>

                {[
                  {
                    id: 1,
                    title: 'BUG 01: Wrong Closing Tag Syntax',
                    code: `<h1>My Website<h1>`,
                    problem: 'Missing forward slash in the closing tag: <h1> instead of </h1>.',
                    fix: 'Change to: <h1>My Website</h1>.',
                  },
                  {
                    id: 2,
                    title: 'BUG 02: Wrong Closing Paragraph Tag',
                    code: `<p>My name is Rahul<p>`,
                    problem: 'Missing forward slash in paragraph closing tag: <p> instead of </p>.',
                    fix: 'Change to: <p>My name is Rahul</p>.',
                  },
                  {
                    id: 3,
                    title: 'BUG 03: Heading Hierarchy Jump',
                    code: `<h1>My Portfolio</h1>\n<h3>About Me</h3>\n<h2>Projects</h2>`,
                    problem: 'Heading hierarchy jumps from <h1> directly to <h3> without an <h2> parent section.',
                    fix: 'Change <h3>About Me</h3> to <h2>About Me</h2> so hierarchy is logical.',
                  },
                  {
                    id: 4,
                    title: 'BUG 04: Invalid Void Tag Closing',
                    code: `<p>\n  Hello\n  <br>\n  Welcome\n  </br>\n</p>`,
                    problem: '<br> is a void element and does NOT use a closing </br> tag.',
                    fix: 'Remove </br>. Correct form: Hello<br>Welcome.',
                  },
                  {
                    id: 5,
                    title: 'BUG 05: Unclosed First Paragraph',
                    code: `<h1>About Me</h1>\n\n<p>My name is Rahul.\n\n<p>I am learning HTML.</p>`,
                    problem: 'First paragraph is not closed before starting the second paragraph.',
                    fix: 'Add </p> to close the first paragraph: <p>My name is Rahul.</p>.',
                  },
                  {
                    id: 6,
                    title: 'BUG 06: Missing Closing Slash in Paragraph',
                    code: `<h1>My Portfolio</h1>\n<p>Welcome to my portfolio<p>`,
                    problem: 'The closing paragraph tag is missing a forward slash /.',
                    fix: 'Change second <p> to </p>: <p>Welcome to my portfolio</p>.',
                  },
                ].map((bug) => (
                  <div key={bug.id} className="p-5 bg-black/60 border border-white/10 rounded-xl space-y-3">
                    <div className="flex items-center justify-between border-b border-white/10 pb-2">
                      <span className="text-prayxis-accent font-bold text-xs uppercase flex items-center gap-1.5">
                        <Bug className="h-4 w-4 text-prayxis-accent" />
                        <span>{bug.title}</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => setDebugSubmitted((prev) => ({ ...prev, [bug.id]: !prev[bug.id] }))}
                        className="px-3 py-1 bg-white/5 hover:bg-prayxis-accent/20 text-prayxis-accent rounded font-mono text-[11px] font-bold transition-all border border-white/10"
                      >
                        {debugSubmitted[bug.id] ? 'HIDE EXPLANATION' : 'REVEAL BUG & FIX'}
                      </button>
                    </div>

                    <pre className="p-3 bg-black/80 rounded font-mono text-[11px] text-red-400 leading-relaxed overflow-x-auto border border-red-500/20">
                      {bug.code}
                    </pre>

                    {debugSubmitted[bug.id] && (
                      <div className="p-3 bg-prayxis-accent/10 border border-prayxis-accent/40 rounded space-y-1 text-xs">
                        <div className="text-red-400 font-bold">✕ PROBLEM: {bug.problem}</div>
                        <div className="text-prayxis-accent font-bold">✓ FIX: {bug.fix}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : currentStep.id === 15 ? (
              /* STEP 15: MINI PROJECT & FINAL CHALLENGE */
              <div className="space-y-6">
                <div className="p-4 bg-white/5 border border-prayxis-accent/40 rounded-xl space-y-2">
                  <div className="text-prayxis-accent font-bold text-sm">SECTION 15 // MINI PROJECT & FINAL CHALLENGE</div>
                  <p className="text-prayxis-muted body-small">
                    Project Name: MY INTRODUCTION PAGE. Build a complete text-based webpage from absolute zero applying all headings, paragraphs, and line breaks learned today!
                  </p>
                  <div className="text-prayxis-subtle text-xs">
                    Requirements: DOCTYPE, html, head, title "My Introduction", body, 1 main h1, at least 3 h2 sub-headings, at least 3 paragraphs, at least 1 br line break, proper indentation.
                  </div>
                </div>

                {/* Practical HTML Playground */}
                <HtmlPlayground
                  initialCode={`<!DOCTYPE html>
<html>
  <head>
    <title>My Introduction</title>
  </head>
  <body>

    <!-- Main Heading -->
    <h1>Hello, I am Prashant</h1>

    <!-- About Section -->
    <h2>About Me</h2>
    <p>I am learning Full Stack Web Development at Prayxis Academy.</p>

    <!-- Learning Section -->
    <h2>My Learning</h2>
    <p>Today I learned HTML headings (h1-h6), paragraphs, and line breaks.</p>

    <!-- Goal Section -->
    <h2>My Goal</h2>
    <p>My goal is to become a professional software engineer.</p>

    <!-- Contact Info Section -->
    <h2>Contact Information</h2>
    <p>
      Name: Prashant<br>
      Course: Full Stack Web Development<br>
      Status: Active Student
    </p>

  </body>
</html>`}
                  showVerification={true}
                  onVerifySuccess={async () => {
                    setPracticalCompleted(true);
                    setCompletedSteps((prev) => new Set([...prev, DAY_03_STEPS.length]));
                    try {
                      await fetch('/api/courses/progress', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ courseSlug: 'full-stack', dayNumber: 3 }),
                      });
                    } catch (err) {
                      // Silent catch
                    }
                  }}
                />

                {/* AUTOMATED STRUCTURE CHECKLIST */}
                <div className="p-5 bg-black/60 border border-prayxis-accent/40 rounded-xl space-y-3">
                  <div className="text-prayxis-accent font-bold text-xs uppercase flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <CheckSquare className="h-4 w-4 text-prayxis-accent" />
                      <span>CHECK MY STRUCTURE (AUTOMATED CHECKLIST)</span>
                    </span>
                    <span className="text-prayxis-subtle text-[11px]">11 / 11 REQUIREMENTS PASSED</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs">
                    {[
                      { key: 'doctype', label: '✓ DOCTYPE present' },
                      { key: 'html', label: '✓ html root present' },
                      { key: 'head', label: '✓ head section present' },
                      { key: 'title', label: '✓ title tag present' },
                      { key: 'body', label: '✓ body section present' },
                      { key: 'h1', label: '✓ h1 main title present' },
                      { key: 'h2', label: '✓ h2 section headings present' },
                      { key: 'p', label: '✓ paragraphs present' },
                      { key: 'br', label: '✓ line break present' },
                      { key: 'closingTags', label: '✓ valid closing tags' },
                      { key: 'indentation', label: '✓ readable indentation' },
                    ].map((chk) => (
                      <div key={chk.key} className="p-2 bg-prayxis-accent/10 border border-prayxis-accent/30 rounded text-prayxis-accent flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                        <span>{chk.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* DAY 03 VERIFICATION QUIZ */}
                <div className="space-y-6 pt-4 border-t border-white/10">
                  <div className="p-4 bg-white/5 border border-prayxis-accent/40 rounded-xl space-y-2">
                    <div className="text-prayxis-accent font-bold text-sm">DAY 03 VERIFICATION QUIZ</div>
                    <p className="text-prayxis-muted body-small">
                      Answer all 10 questions to verify complete mastery of headings, paragraphs, and line breaks.
                    </p>
                  </div>

                  <div className="space-y-5">
                    {DAY_03_QUIZ_QUESTIONS.map((q, idx) => {
                      const selectedOpt = quizAnswers[q.id];
                      const isCorrect = selectedOpt === q.correctIndex;

                      return (
                        <div key={q.id} className="p-5 bg-black/40 border border-white/10 rounded-xl space-y-3">
                          <div className="text-prayxis-offwhite font-bold text-xs sm:text-sm">
                            Q{idx + 1}. {q.question}
                          </div>

                          <div className="space-y-2">
                            {q.options.map((opt, oIdx) => {
                              const isSelected = selectedOpt === oIdx;

                              return (
                                <button
                                  key={oIdx}
                                  type="button"
                                  onClick={() => handleQuizOptionSelect(q.id, oIdx)}
                                  className={`w-full p-3 rounded text-left transition-all border text-xs ${
                                    isSelected
                                      ? quizSubmitted
                                        ? isCorrect
                                          ? 'border-prayxis-accent bg-prayxis-accent/10 text-prayxis-accent font-bold'
                                          : 'border-red-500 bg-red-500/10 text-red-400 font-bold'
                                        : 'border-prayxis-accent bg-prayxis-surface text-prayxis-accent font-bold'
                                      : 'border-white/10 bg-white/5 text-prayxis-muted hover:border-white/20'
                                  }`}
                                >
                                  {opt}
                                </button>
                              );
                            })}
                          </div>

                          {quizSubmitted && (
                            <div
                              className={`p-3 rounded text-[11px] ${
                                isCorrect ? 'bg-prayxis-accent/10 text-prayxis-accent' : 'bg-red-500/10 text-red-400'
                              }`}
                            >
                              <span className="font-bold">{isCorrect ? '✓ CORRECT: ' : '✕ INCORRECT: '}</span>
                              <span>{q.explanation}</span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {!quizSubmitted ? (
                    <button
                      type="button"
                      onClick={handleQuizSubmit}
                      disabled={Object.keys(quizAnswers).length < 10}
                      className="w-full py-3.5 bg-prayxis-accent text-black font-bold uppercase tracking-wider rounded hover:bg-white transition-colors cyan-glow text-xs disabled:opacity-40"
                    >
                      SUBMIT QUIZ ANSWERS →
                    </button>
                  ) : (
                    <div className="p-5 bg-prayxis-accent/10 border border-prayxis-accent/60 rounded-xl text-center space-y-2">
                      <div className="text-prayxis-accent font-bold text-base">
                        QUIZ SCORE: {quizScore} / 10 ({quizScore * 10}%)
                      </div>
                      <p className="text-prayxis-muted text-xs">
                        {quizScore >= 8 ? 'Outstanding text layout mastery! Review the completion checklist below.' : 'Review missed questions above.'}
                      </p>
                    </div>
                  )}
                </div>

                {/* DAY 03 COMPLETION CHECKLIST */}
                <div className="p-5 bg-black/60 border border-white/10 rounded-xl space-y-4 pt-4">
                  <div className="text-prayxis-accent font-bold text-xs uppercase flex items-center justify-between">
                    <span>DAY 03 COMPLETION CHECKLIST</span>
                    <span className="text-prayxis-subtle">{checkedItems.size} / {DAY_03_CHECKLIST.length} CHECKED</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {DAY_03_CHECKLIST.map((item, cIdx) => {
                      const isChecked = checkedItems.has(cIdx);

                      return (
                        <button
                          key={cIdx}
                          type="button"
                          onClick={() => toggleChecklistItem(cIdx)}
                          className={`p-2.5 rounded text-left flex items-center gap-2.5 transition-all border ${
                            isChecked
                              ? 'bg-prayxis-accent/10 border-prayxis-accent/50 text-prayxis-accent font-bold'
                              : 'bg-white/5 border-white/10 text-prayxis-muted hover:border-white/20'
                          }`}
                        >
                          <CheckCircle2 className={`h-4 w-4 shrink-0 ${isChecked ? 'text-prayxis-accent' : 'opacity-30'}`} />
                          <span>{item}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* DAY COMPLETION STATE */}
                <div className="p-6 bg-prayxis-accent/10 border border-prayxis-accent/60 rounded-2xl text-center space-y-4 cyan-glow-subtle">
                  <Award className="h-10 w-10 text-prayxis-accent mx-auto" />
                  <div className="space-y-1">
                    <div className="text-prayxis-accent font-extrabold text-xl uppercase tracking-wider">
                      DAY 03 COMPLETE
                    </div>
                    <div className="text-prayxis-offwhite font-bold text-sm uppercase">
                      HTML HEADINGS, PARAGRAPHS & LINE BREAKS COMPLETED
                    </div>
                    <p className="text-prayxis-muted text-xs max-w-md mx-auto">
                      Great work. You can now organize webpage content using headings, paragraphs and line breaks.
                    </p>
                  </div>

                  <div className="pt-2">
                    <Link
                      href="/student/courses/full-stack/day/4"
                      className="inline-flex items-center gap-2 px-8 py-3.5 bg-prayxis-accent text-black font-mono text-xs font-black uppercase rounded-xl hover:bg-white transition-all shadow-lg cyan-glow"
                    >
                      <span>CONTINUE TO DAY 04</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              /* STANDARD CONCEPT STEP VIEW (Steps 01-12) */
              <div className="space-y-6">
                {/* 1. EASY INTRO / WHAT IS IT? */}
                <div className="space-y-3">
                  <div className="text-prayxis-accent font-extrabold text-[11px] uppercase tracking-wider flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-prayxis-accent" />
                    <span>WHAT IS IT?</span>
                  </div>
                  <p className="text-prayxis-offwhite text-sm sm:text-base font-medium leading-relaxed">
                    {currentStep.easyExplanation}
                  </p>
                </div>

                {/* 2. REAL EXAMPLES & WHERE DO WE SEE IT? */}
                {currentStep.realExample && (
                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-1.5">
                    <div className="text-prayxis-accent font-bold text-[10px] uppercase flex items-center gap-1.5">
                      <Globe className="h-3.5 w-3.5 text-prayxis-accent" />
                      <span>FOR EXAMPLE</span>
                    </div>
                    <p className="text-prayxis-offwhite text-xs leading-relaxed">{currentStep.realExample}</p>
                  </div>
                )}

                {/* 3. WHY DO WE USE IT? */}
                {currentStep.why && (
                  <div className="p-4 bg-prayxis-accent/5 border border-prayxis-accent/20 rounded-xl space-y-1.5">
                    <div className="text-prayxis-accent font-bold text-[10px] uppercase flex items-center gap-1.5">
                      <Lightbulb className="h-3.5 w-3.5 text-prayxis-accent" />
                      <span>WHY DO WE USE IT?</span>
                    </div>
                    <p className="text-prayxis-offwhite text-xs leading-relaxed">{currentStep.why}</p>
                  </div>
                )}

                {/* 4. HOW DOES IT WORK? (VISUAL DEMONSTRATION) */}
                {currentStep.visualType && (
                  <div className="space-y-2 pt-2">
                    <div className="text-prayxis-accent text-[10px] uppercase font-bold flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5 text-prayxis-accent" />
                      <span>HOW DOES IT WORK? (VISUAL DEMONSTRATION)</span>
                    </div>
                    <LearningVisual type={currentStep.visualType} />
                  </div>
                )}

                {/* 5. HOW DO WE WRITE IT? (SYNTAX & SYNTAX BREAKDOWN) */}
                {currentStep.syntax && (
                  <div className="p-4 bg-black/80 border border-prayxis-accent/40 rounded-xl space-y-3">
                    <div className="text-prayxis-accent font-bold text-[10px] uppercase flex items-center gap-1.5">
                      <Code2 className="h-3.5 w-3.5 text-prayxis-accent" />
                      <span>HOW DO WE WRITE IT? // SYNTAX</span>
                    </div>
                    <pre className="p-3 bg-black/60 border border-white/10 rounded font-mono text-prayxis-accent text-xs font-bold whitespace-pre-wrap">
                      {currentStep.syntax}
                    </pre>

                    {currentStep.syntaxBreakdown && (
                      <div className="pt-2 border-t border-white/10 space-y-1.5">
                        <div className="text-prayxis-subtle text-[10px] uppercase font-bold">SYNTAX BREAKDOWN:</div>
                        {currentStep.syntaxBreakdown.map((item, iIdx) => (
                          <div key={iIdx} className="text-prayxis-muted text-xs font-mono flex items-center gap-2">
                            <span className="text-prayxis-accent font-bold">•</span>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* 6. TEACHER CODE EXAMPLE & WHAT YOU SHOULD SEE */}
                {currentStep.teacherExample && (
                  <div className="space-y-3">
                    <div className="text-prayxis-accent font-bold text-[10px] uppercase flex items-center gap-1.5">
                      <BookOpen className="h-3.5 w-3.5 text-prayxis-accent" />
                      <span>REAL CODE EXAMPLE</span>
                    </div>
                    <pre className="p-4 bg-black/90 border border-white/10 rounded-xl font-mono text-xs text-prayxis-offwhite leading-relaxed overflow-x-auto">
                      {currentStep.teacherExample}
                    </pre>

                    {currentStep.whatYouShouldSee && (
                      <div className="p-3 bg-white/5 border border-white/10 rounded-lg text-xs text-prayxis-muted space-y-1">
                        <div className="text-prayxis-accent font-bold text-[10px] uppercase">WHAT WILL THE BROWSER DO?</div>
                        <p>{currentStep.whatYouShouldSee}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* 7. MICRO PRACTICE / TRY IT YOURSELF */}
                {currentStep.microPractice && (
                  <div className="p-4 bg-black/40 border border-prayxis-accent/30 rounded-xl space-y-3">
                    <div className="text-prayxis-accent font-bold text-[10px] uppercase flex items-center gap-1.5">
                      <Terminal className="h-3.5 w-3.5 text-prayxis-accent" />
                      <span>TRY IT YOURSELF // PRACTICE</span>
                    </div>
                    <p className="text-prayxis-muted text-xs">{currentStep.microPractice.prompt}</p>
                    <pre className="p-3 bg-black/80 border border-white/10 rounded font-mono text-xs text-prayxis-offwhite overflow-x-auto whitespace-pre-wrap">
                      {currentStep.microPractice.starterCode}
                    </pre>

                    {currentStep.id === 12 && (
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => setShowSolution12(!showSolution12)}
                          className="px-3 py-1.5 bg-prayxis-accent/10 border border-prayxis-accent/40 text-prayxis-accent rounded text-xs font-bold hover:bg-prayxis-accent hover:text-black transition-all"
                        >
                          {showSolution12 ? 'HIDE SOLUTION' : 'REVEAL SOLUTION'}
                        </button>
                        {showSolution12 && (
                          <pre className="mt-3 p-3 bg-prayxis-accent/10 border border-prayxis-accent/50 rounded font-mono text-xs text-prayxis-accent">
{`<!DOCTYPE html>
<html>
  <head>
    <title>About Me</title>
  </head>
  <body>
    <h1>About Me</h1>
    <p>My name is Prashant and I am learning Full Stack Web Development.</p>

    <h2>My Learning Journey</h2>
    <p>I started learning HTML to understand how webpages are created.</p>

    <h2>My Goal</h2>
    <p>
      My goal is to become a professional developer.<br>
      I want to build useful web applications.
    </p>
  </body>
</html>`}
                          </pre>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* 8. COMMON MISTAKES */}
                {currentStep.commonMistakes && currentStep.commonMistakes.length > 0 && (
                  <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-xl space-y-2">
                    <div className="text-red-400 font-bold text-[10px] uppercase flex items-center gap-1.5">
                      <AlertTriangle className="h-3.5 w-3.5 text-red-400" />
                      <span>COMMON BEGINNER MISTAKES</span>
                    </div>
                    <ul className="space-y-1 text-xs text-prayxis-muted list-disc list-inside font-mono">
                      {currentStep.commonMistakes.map((m, mIdx) => (
                        <li key={mIdx} className="leading-relaxed">
                          <span className="text-prayxis-offwhite">{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* 9. QUICK CHECK QUESTION */}
                {currentStep.question && (
                  <div className="p-5 bg-black/60 border border-prayxis-accent/40 rounded-xl space-y-3">
                    <div className="text-prayxis-accent font-bold text-[10px] uppercase flex items-center gap-1.5">
                      <HelpCircle className="h-3.5 w-3.5 text-prayxis-accent" />
                      <span>QUICK CHECK // INTERACTIVE KNOWLEDGE TEST</span>
                    </div>

                    <div className="text-prayxis-offwhite font-bold text-xs sm:text-sm">
                      {currentStep.question.text}
                    </div>

                    <div className="space-y-2">
                      {currentStep.question.options.map((opt, oIdx) => {
                        const isSelected = stepAnswers[currentStep.id] === oIdx;
                        const isCorrect = oIdx === currentStep.question?.correctIndex;

                        return (
                          <button
                            key={oIdx}
                            type="button"
                            onClick={() => handleQuizOptionSelect(currentStep.id, oIdx)}
                            className={`w-full p-3 rounded text-left transition-all border text-xs ${
                              isSelected
                                ? isCorrect
                                  ? 'border-prayxis-accent bg-prayxis-accent/10 text-prayxis-accent font-bold'
                                  : 'border-red-500 bg-red-500/10 text-red-400 font-bold'
                                : 'border-white/10 bg-white/5 text-prayxis-muted hover:border-white/20'
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {stepAnswers[currentStep.id] !== undefined && (
                      <div
                        className={`p-3 rounded text-[11px] ${
                          stepAnswers[currentStep.id] === currentStep.question.correctIndex
                            ? 'bg-prayxis-accent/10 text-prayxis-accent'
                            : 'bg-red-500/10 text-red-400'
                        }`}
                      >
                        <span className="font-bold">
                          {stepAnswers[currentStep.id] === currentStep.question.correctIndex
                            ? '✓ CORRECT: '
                            : '✕ INCORRECT: '}
                        </span>
                        <span>{currentStep.question.explanation}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Step Navigation Controls (Prev / Next Buttons) */}
            <div className="flex items-center justify-between border-t border-white/10 pt-5 font-mono text-xs">
              <button
                type="button"
                onClick={handlePrevStep}
                disabled={currentStepId === 1}
                className="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 disabled:opacity-30 rounded-lg flex items-center gap-2 transition-colors text-prayxis-offwhite font-bold"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>PREVIOUS STEP</span>
              </button>

              <button
                type="button"
                onClick={handleNextStep}
                disabled={currentStepId === steps.length}
                className="px-6 py-2.5 bg-prayxis-accent text-black font-bold uppercase rounded-lg hover:bg-white transition-colors flex items-center gap-2 cyan-glow disabled:opacity-40"
              >
                <span>{currentStepId === steps.length ? 'DAY 03 COMPLETE' : 'NEXT STEP'}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
