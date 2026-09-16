'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { ActiveLearningTracker, ActivityState } from '@/components/student/ActiveLearningTracker';
import { ActiveLearningTimer } from '@/components/student/ActiveLearningTimer';
import { HtmlPlayground } from '@/components/student/HtmlPlayground';
import { LearningVisual } from '@/components/student/learning/LearningVisual';
import { DAY_01_STEPS, DAY_01_QUIZ_QUESTIONS, DAY_01_STEPS_HINGLISH, DAY_01_QUIZ_QUESTIONS_HINGLISH } from '@/data/day01Data';
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
  Eye,
  Sparkles,
  Globe,
  PanelLeft,
  PanelLeftClose,
  PanelLeftOpen,
  MessageCircle,
} from 'lucide-react';
import { getCourseEnrollmentStatus } from '@/lib/utils/dayUnlock';
import { getWhatsAppEnrollUrl } from '@/lib/whatsapp';

export default function Day01LessonPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [todaySeconds, setTodaySeconds] = useState(0);
  const [activityState, setActivityState] = useState<ActivityState>('ACTIVE');

  // Sidebar collapsible state
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Step navigation state (1 to 17)
  const [currentStepId, setCurrentStepId] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set([1]));

  // Step question answers state
  const [stepAnswers, setStepAnswers] = useState<Record<number, number>>({});

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

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

  const steps = currentLanguage === 'hinglish' ? DAY_01_STEPS_HINGLISH : DAY_01_STEPS;
  const quizQuestions = currentLanguage === 'hinglish' ? DAY_01_QUIZ_QUESTIONS_HINGLISH : DAY_01_QUIZ_QUESTIONS;

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

  const handleStepQuestionSelect = (stepId: number, optionIdx: number) => {
    setStepAnswers((prev) => ({ ...prev, [stepId]: optionIdx }));
    setCompletedSteps((prev) => new Set([...prev, stepId]));
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
    setCompletedSteps((prev) => new Set([...prev, steps.length - 1]));
  };

  // Progress Calculation
  const progressPercentage = Math.min(100, Math.round((completedSteps.size / steps.length) * 100));

  if (loading) {
    return (
      <div className="min-h-screen bg-prayxis-bg flex items-center justify-center font-mono text-xs text-prayxis-accent">
        <span>LOADING DAY 01 MODULE...</span>
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
              FULL STACK DAY 01 ACCESS LOCKED
            </h1>

            <p className="body-medium text-prayxis-muted leading-relaxed max-w-xl mx-auto font-normal">
              {courseStatus.isRequested
                ? 'Your enrollment request for Full Stack Web Development is pending Admin approval. You can contact support on WhatsApp for quick activation.'
                : 'Aapne abhi tak is course me enroll nahi kiya hai. Special Student Offer me sirf ₹199 me enroll karein aur complete access payein.'}
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => {
                  if (!user) {
                    router.push('/login?redirect=/student/courses/full-stack/day/1');
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
        dayNumber={1}
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
              title={isSidebarOpen ? "Collapse sidebar for wider reading canvas" : "Expand steps sidebar"}
            >
              <PanelLeft className="h-4 w-4 text-prayxis-accent" />
              <span className="hidden sm:inline font-bold">{isSidebarOpen ? "HIDE STEPS" : "SHOW STEPS"}</span>
            </button>

            <nav className="font-mono text-xs text-prayxis-muted flex items-center gap-2 select-none">
              <Link href="/student" className="hover:text-prayxis-offwhite transition-colors">STUDENT CONSOLE</Link>
              <span>/</span>
              <Link href="/student/courses/full-stack" className="hover:text-prayxis-offwhite transition-colors">FULL STACK</Link>
              <span>/</span>
              <span className="text-prayxis-accent font-bold">DAY 01</span>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <div className="font-mono text-xs text-prayxis-accent font-bold uppercase tracking-wider hidden md:block">
              DAY 01 / 45 — HTML FROM ABSOLUTE ZERO
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
          
          {/* Left Column: Lesson Step Sidebar Navigator (4 Cols when open, sticky on scroll) */}
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
                  <span className="text-prayxis-accent font-bold uppercase">DAY 01 STEPS</span>
                </div>
                <span className="text-prayxis-subtle">{completedSteps.size} / {steps.length} COMPLETED</span>
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
                      <CheckCircle2 className={`h-3.5 w-3.5 shrink-0 ${isActive ? 'text-black' : 'text-prayxis-accent'}`} />
                    ) : (
                      <ChevronRight className="h-3.5 w-3.5 opacity-40 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

          {/* Right Column: Step Lesson Content Canvas (8 Cols when sidebar open, 12 Cols when collapsed) */}
          <div className={`${isSidebarOpen ? 'lg:col-span-8' : 'lg:col-span-12'} p-6 sm:p-8 bg-prayxis-surface/90 border border-prayxis-accent/40 rounded-2xl backdrop-blur-md space-y-7 cyan-glow-subtle font-mono text-xs transition-all`}>
            
            {/* Step Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-prayxis-accent/10 border border-prayxis-accent/40 rounded-full text-[10px] text-prayxis-accent uppercase font-bold">
                  <BookOpen className="h-3.5 w-3.5" />
                  <span>STEP {currentStep.id} OF {DAY_01_STEPS.length}</span>
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
                  <span>SHOW ALL STEPS ({currentStep.id}/{DAY_01_STEPS.length})</span>
                </button>
              )}
            </div>

            {/* QUIZ VIEW */}
            {currentStep.id === DAY_01_STEPS.length - 1 ? (
              <div className="space-y-6">
                <div className="p-4 bg-white/5 border border-prayxis-accent/40 rounded-xl space-y-2">
                  <div className="text-prayxis-accent font-bold text-sm">SECTION {DAY_01_STEPS.length - 1} // DAY 01 VERIFICATION QUIZ</div>
                  <p className="text-prayxis-muted body-small">
                    Test your understanding of the core HTML concepts taught today. Answer all 10 questions to verify mastery before completing the practical mission.
                  </p>
                </div>

                <div className="space-y-5">
                  {DAY_01_QUIZ_QUESTIONS.map((q, idx) => {
                    const selectedOpt = quizAnswers[q.id];
                    const isCorrect = selectedOpt === q.correctIndex;

                    return (
                      <div key={q.id} className="p-5 bg-black/40 border border-white/10 rounded-xl space-y-3">
                        <div className="text-prayxis-offwhite font-bold text-xs sm:text-sm">
                          Q{idx + 1}. {q.question}
                        </div>

                        {/* Options List (Initial state: Zero answer leaks, 100% uniform styling) */}
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

                        {/* Explanation Feedback after submission */}
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
                      {quizScore >= 8 ? 'Great understanding! Proceed to the practical coding mission.' : 'Review missed questions above.'}
                    </p>
                  </div>
                )}
              </div>
            ) : currentStep.id === DAY_01_STEPS.length ? (
              /* PRACTICAL TASK VIEW */
              <div className="space-y-6">
                <div className="p-4 bg-white/5 border border-prayxis-accent/40 rounded-xl space-y-2">
                  <div className="text-prayxis-accent font-bold text-sm">SECTION {DAY_01_STEPS.length} // PRACTICAL CODING MISSION</div>
                  <p className="text-prayxis-muted body-small">
                    Write a valid HTML document from absolute zero in the Prayxis HTML Laboratory.
                  </p>
                  <div className="text-prayxis-subtle text-xs">
                    Write your HTML code scaffold in the editor below and click RUN & VERIFY CODE to test all 9 document requirements.
                  </div>
                </div>

                <HtmlPlayground
                  initialCode={`<!DOCTYPE html>
<html>
<head>
  <title>My Webpage Title</title>
</head>
<body>

  <!-- Build your student profile page here -->

</body>
</html>`}
                  showVerification={true}
                  onVerifySuccess={async () => {
                    setPracticalCompleted(true);
                    setCompletedSteps((prev) => new Set([...prev, DAY_01_STEPS.length]));
                    try {
                      await fetch('/api/courses/progress', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ courseSlug: 'full-stack', dayNumber: 1 }),
                      });
                    } catch (err) {
                      // Silent catch
                    }
                  }}
                />

                {practicalCompleted && (
                  <div className="p-5 bg-prayxis-accent/10 border border-prayxis-accent/60 rounded-xl text-center space-y-2 cyan-glow-subtle">
                    <Award className="h-7 w-7 text-prayxis-accent mx-auto" />
                    <div className="text-prayxis-accent font-bold text-base uppercase">
                      DAY 01 PRACTICAL MISSION COMPLETED!
                    </div>
                    <p className="text-prayxis-muted text-xs">
                      Congratulations! You have built your first valid HTML webpage from absolute zero. Day 02 will unlock when available.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              /* STANDARD CONCEPT STEP VIEW (Easy Explanation -> Real Examples -> Visual -> Syntax -> Practice) */
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

                {/* 4. HOW DOES IT WORK? (VISUAL CAUSE → EFFECT ANIMATION) */}
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
                    <div className="p-2.5 bg-black/60 border border-white/10 rounded font-mono text-prayxis-accent text-xs font-bold">
                      {currentStep.syntax}
                    </div>

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
                    <div className="text-prayxis-accent text-[10px] uppercase font-bold flex items-center gap-1.5">
                      <Terminal className="h-3.5 w-3.5" />
                      <span>TEACHER CODE EXAMPLE:</span>
                    </div>
                    <pre className="p-4 bg-black/60 border border-white/10 rounded text-prayxis-accent overflow-x-auto text-xs">
                      <code>{currentStep.teacherExample}</code>
                    </pre>

                    {currentStep.secondExample && (
                      <pre className="p-4 bg-black/60 border border-white/10 rounded text-prayxis-accent overflow-x-auto text-xs">
                        <code>{currentStep.secondExample}</code>
                      </pre>
                    )}

                    {currentStep.whatYouShouldSee && (
                      <div className="p-3.5 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-yellow-200/90 text-xs flex items-start gap-2">
                        <Eye className="h-4 w-4 text-yellow-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-yellow-400 uppercase">WHAT DOES THE BROWSER SHOW? </span>
                          {currentStep.whatYouShouldSee}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* 7. TRY IT — MICRO PRACTICE */}
                {currentStep.microPractice && (
                  <div className="space-y-3 pt-4 border-t border-white/10">
                    <div className="p-4 bg-prayxis-accent/10 border border-prayxis-accent/40 rounded-xl space-y-2">
                      <div className="text-prayxis-accent font-bold text-[11px] uppercase flex items-center gap-2">
                        <Code2 className="h-4 w-4 text-prayxis-accent" />
                        <span>TRY IT — MICRO PRACTICE</span>
                      </div>
                      <p className="text-prayxis-offwhite text-xs leading-relaxed">
                        {currentStep.microPractice.prompt}
                      </p>
                    </div>

                    <HtmlPlayground
                      initialCode={currentStep.microPractice.starterCode}
                      showVerification={false}
                    />
                  </div>
                )}

                {/* 8. COMMON BEGINNER MISTAKES TO AVOID */}
                {currentStep.commonMistakes && currentStep.commonMistakes.length > 0 && (
                  <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl space-y-2">
                    <div className="text-red-400 font-bold text-[10px] uppercase flex items-center gap-1.5">
                      <AlertTriangle className="h-3.5 w-3.5" />
                      <span>COMMON BEGINNER MISTAKES TO AVOID</span>
                    </div>
                    <ul className="space-y-1 pl-4 list-disc text-red-200/90 text-xs leading-relaxed">
                      {currentStep.commonMistakes.map((mistake, mIdx) => (
                        <li key={mIdx}>{mistake}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* 9. CONCEPT CHECK QUESTION (Zero answer leaks before click) */}
                {currentStep.question && (
                  <div className="p-5 bg-black/40 border border-white/10 rounded-xl space-y-3 pt-4">
                    <div className="flex items-center gap-2 text-prayxis-accent font-bold text-xs uppercase">
                      <HelpCircle className="h-4 w-4 text-prayxis-accent" />
                      <span>CONCEPT CHECK</span>
                    </div>

                    <p className="text-prayxis-offwhite font-bold text-xs sm:text-sm">{currentStep.question.text}</p>

                    <div className="space-y-2">
                      {currentStep.question.options.map((opt, oIdx) => {
                        const selected = stepAnswers[currentStep.id] === oIdx;
                        const isCorrect = oIdx === currentStep.question?.correctIndex;

                        return (
                          <button
                            key={oIdx}
                            type="button"
                            onClick={() => handleStepQuestionSelect(currentStep.id, oIdx)}
                            className={`w-full p-3 rounded text-left transition-all border text-xs ${
                              selected
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
                          {stepAnswers[currentStep.id] === currentStep.question.correctIndex ? '✓ CORRECT: ' : '✕ EXPLANATION: '}
                        </span>
                        <span>{currentStep.question.explanation}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Navigation Footer Controls */}
            <div className="pt-6 border-t border-white/10 flex items-center justify-between">
              <button
                type="button"
                onClick={handlePrevStep}
                disabled={currentStepId === 1}
                className="px-4 py-2.5 bg-white/5 border border-white/10 hover:border-white/20 text-prayxis-offwhite rounded font-mono text-xs uppercase disabled:opacity-40 flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>PREVIOUS STEP</span>
              </button>

              <button
                type="button"
                onClick={handleNextStep}
                disabled={currentStepId === steps.length}
                className="px-6 py-2.5 bg-prayxis-accent text-black font-bold rounded font-mono text-xs uppercase hover:bg-white transition-colors flex items-center gap-2 cyan-glow disabled:opacity-40"
              >
                <span>NEXT STEP →</span>
              </button>
            </div>

          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
