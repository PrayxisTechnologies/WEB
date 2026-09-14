'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { ActiveLearningTracker, ActivityState } from '@/components/student/ActiveLearningTracker';
import { ActiveLearningTimer } from '@/components/student/ActiveLearningTimer';
import { DailyGoalWidget } from '@/components/student/DailyGoalWidget';
import { PythonPlayground } from '@/components/student/PythonPlayground';
import {
  PYTHON_DAY_01_STEPS,
  PYTHON_DAY_01_QUIZ_QUESTIONS,
} from '@/data/pythonDay01Data';
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
  Bug,
  Cpu,
  Layers,
  FileCode,
  Check,
  MessageCircle,
} from 'lucide-react';
import { getCourseEnrollmentStatus } from '@/lib/utils/dayUnlock';
import { getWhatsAppEnrollUrl } from '@/lib/whatsapp';

export default function PythonDay01LessonPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [todaySeconds, setTodaySeconds] = useState(0);
  const [activityState, setActivityState] = useState<ActivityState>('ACTIVE');

  // Sidebar collapsible state
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Step navigation state (1 to 14)
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

  // Debugging Exercise active fix tab
  const [activeDebugTab, setActiveDebugTab] = useState<number>(1);
  const [debugRevealed, setDebugRevealed] = useState<Record<number, boolean>>({});

  const [user, setUser] = useState<{ isApproved: boolean; role: string } | null>(null);

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

  const currentStep =
    PYTHON_DAY_01_STEPS.find((s) => s.id === currentStepId) || PYTHON_DAY_01_STEPS[0];

  const handleNextStep = () => {
    setCompletedSteps((prev) => new Set([...prev, currentStepId]));
    if (currentStepId < PYTHON_DAY_01_STEPS.length) {
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
    PYTHON_DAY_01_QUIZ_QUESTIONS.forEach((q) => {
      if (quizAnswers[q.id] === q.correctIndex) score += 1;
    });
    setQuizScore(score);
    setQuizSubmitted(true);
    setCompletedSteps((prev) => new Set([...prev, PYTHON_DAY_01_STEPS.length - 1]));
  };

  // Progress Calculation
  const progressPercentage = Math.min(
    100,
    Math.round((completedSteps.size / PYTHON_DAY_01_STEPS.length) * 100)
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-prayxis-bg flex items-center justify-center font-mono text-xs text-prayxis-accent">
        <span>LOADING PYTHON DAY 01 MODULE...</span>
      </div>
    );
  }

  const courseStatus = getCourseEnrollmentStatus(user, 'python-basics');
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
              PYTHON DAY 01 ACCESS LOCKED
            </h1>

            <p className="body-medium text-prayxis-muted leading-relaxed max-w-xl mx-auto font-normal">
              {courseStatus.isRequested
                ? 'Your enrollment request for Python Basics is pending Admin approval. You can contact support on WhatsApp for quick activation.'
                : 'Aapne abhi tak is course me enroll nahi kiya hai. Ganesh Chaturthi Special Offer me sirf ₹99 me enroll karein aur complete access payein.'}
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => {
                  if (!user) {
                    router.push('/login?redirect=/student/courses/python-basics/day/1');
                    return;
                  }
                  const waUrl = getWhatsAppEnrollUrl({
                    userId: user.id,
                    userName: user.name,
                    userEmail: user.email,
                    courseTitle: 'Python Basics: Zero Se',
                    price: 99,
                    offer: 'Ganesh Chaturthi Special Offer',
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
        courseSlug="python-basics"
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
              className="p-2 bg-prayxis-surface/90 border border-white/10 hover:border-prayxis-accent/60 text-prayxis-muted hover:text-prayxis-accent rounded-lg flex items-center gap-2 transition-all font-mono text-xs cyan-glow-subtle cursor-pointer"
              title={isSidebarOpen ? "Collapse sidebar for wider reading canvas" : "Expand steps sidebar"}
            >
              <PanelLeft className="h-4 w-4 text-prayxis-accent" />
              <span className="hidden sm:inline font-bold">{isSidebarOpen ? "HIDE STEPS" : "SHOW STEPS"}</span>
            </button>

            <nav className="font-mono text-xs text-prayxis-muted flex items-center gap-2 select-none">
              <Link href="/student" className="hover:text-prayxis-offwhite transition-colors">STUDENT CONSOLE</Link>
              <span>/</span>
              <Link href="/student/courses/python-basics" className="hover:text-prayxis-offwhite transition-colors">PYTHON BASICS</Link>
              <span>/</span>
              <span className="text-prayxis-accent font-bold">DAY 01</span>
            </nav>
          </div>

          <div className="font-mono text-xs text-prayxis-accent font-bold uppercase tracking-wider flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-prayxis-accent cyan-glow animate-pulse" />
            <span>DAY 01 / 30 — PYTHON: BILKUL ZERO SE (3 HOURS)</span>
          </div>
        </div>

        {/* Daily 3-Hour Goal Tracker Widget */}
        <DailyGoalWidget courseSlug="python-basics" dayNumber={1} />

        {/* Live Active Timer */}
        <ActiveLearningTimer
          todayActiveSeconds={todaySeconds}
          activityState={activityState}
          targetDailySeconds={10800}
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
                    className="p-1 bg-white/5 hover:bg-prayxis-accent/20 text-prayxis-muted hover:text-prayxis-accent rounded transition-colors cursor-pointer"
                    title="Collapse Sidebar"
                  >
                    <PanelLeftClose className="h-4 w-4 text-prayxis-accent" />
                  </button>
                  <span className="text-prayxis-accent font-bold uppercase">DAY 01 STEPS</span>
                </div>
                <span className="text-prayxis-subtle">{completedSteps.size} / {PYTHON_DAY_01_STEPS.length} COMPLETED</span>
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
                {PYTHON_DAY_01_STEPS.map((st) => {
                  const isActive = currentStepId === st.id;
                  const isCompleted = completedSteps.has(st.id);

                  return (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => setCurrentStepId(st.id)}
                      className={`w-full p-2.5 rounded text-left flex items-center justify-between transition-all cursor-pointer ${
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

          {/* Right Column: Step Lesson Content Canvas */}
          <div className={`${isSidebarOpen ? 'lg:col-span-8' : 'lg:col-span-12'} p-6 sm:p-8 bg-prayxis-surface/90 border border-prayxis-accent/40 rounded-2xl backdrop-blur-md space-y-7 cyan-glow-subtle font-mono text-xs transition-all`}>
            
            {/* Step Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-prayxis-accent/10 border border-prayxis-accent/40 rounded-full text-[10px] text-prayxis-accent uppercase font-bold">
                  <BookOpen className="h-3.5 w-3.5" />
                  <span>STEP {currentStep.id} OF {PYTHON_DAY_01_STEPS.length} // PYTHON FOUNDATIONS</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-prayxis-offwhite uppercase tracking-tight">
                  {currentStep.concept}
                </h2>
                {currentStep.tagline && (
                  <p className="text-prayxis-accent/90 text-xs font-semibold">
                    {currentStep.tagline}
                  </p>
                )}
              </div>

              {!isSidebarOpen && (
                <button
                  type="button"
                  onClick={() => setIsSidebarOpen(true)}
                  className="self-start sm:self-center px-3 py-1.5 bg-prayxis-accent/10 border border-prayxis-accent/50 text-prayxis-accent hover:bg-prayxis-accent hover:text-black rounded-lg flex items-center gap-2 transition-all font-mono text-xs font-bold cursor-pointer"
                  title="Expand Steps Sidebar"
                >
                  <PanelLeftOpen className="h-4 w-4" />
                  <span>SHOW ALL STEPS ({currentStep.id}/{PYTHON_DAY_01_STEPS.length})</span>
                </button>
              )}
            </div>

            {/* STEP 13: 10-QUESTION VERIFICATION QUIZ */}
            {currentStep.id === PYTHON_DAY_01_STEPS.length - 1 ? (
              <div className="space-y-6">
                <div className="p-5 bg-white/5 border border-prayxis-accent/40 rounded-xl space-y-2">
                  <div className="text-prayxis-accent font-bold text-sm flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    <span>SECTION 13 // DAY 01 KNOWLEDGE VERIFICATION QUIZ</span>
                  </div>
                  <p className="text-prayxis-muted text-xs leading-relaxed">
                    Test your understanding of the core Python concepts taught today. Answer all 10 questions to verify mastery before entering the final practical application mission.
                  </p>
                </div>

                <div className="space-y-5">
                  {PYTHON_DAY_01_QUIZ_QUESTIONS.map((q, idx) => {
                    const selectedOpt = quizAnswers[q.id];
                    const isCorrect = selectedOpt === q.correctIndex;

                    return (
                      <div key={q.id} className="p-5 bg-black/40 border border-white/10 rounded-xl space-y-3">
                        <div className="text-prayxis-offwhite font-bold text-xs sm:text-sm">
                          Q{idx + 1}. {q.question}
                        </div>

                        {/* Options List */}
                        <div className="space-y-2">
                          {q.options.map((opt, oIdx) => {
                            const isSelected = selectedOpt === oIdx;

                            return (
                              <button
                                key={oIdx}
                                type="button"
                                onClick={() => handleQuizOptionSelect(q.id, oIdx)}
                                className={`w-full p-3 rounded text-left transition-all border text-xs cursor-pointer ${
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
                    className="w-full py-3.5 bg-prayxis-accent text-black font-bold uppercase tracking-wider rounded hover:bg-white transition-colors cyan-glow text-xs disabled:opacity-40 cursor-pointer"
                  >
                    SUBMIT QUIZ ANSWERS ({Object.keys(quizAnswers).length}/10 ANSWERED) →
                  </button>
                ) : (
                  <div className="p-6 bg-prayxis-accent/10 border border-prayxis-accent/60 rounded-xl text-center space-y-3">
                    <div className="text-prayxis-accent font-bold text-lg">
                      QUIZ SCORE: {quizScore} / 10 ({quizScore * 10}%)
                    </div>
                    <p className="text-prayxis-muted text-xs">
                      {quizScore >= 8
                        ? 'Excellent conceptual understanding! Proceed to the final practical coding mission.'
                        : 'Review missed questions above to reinforce concepts.'}
                    </p>
                  </div>
                )}
              </div>
            ) : currentStep.id === PYTHON_DAY_01_STEPS.length ? (
              /* STEP 14: FINAL PRACTICAL CODING MISSION */
              <div className="space-y-6">
                <div className="p-5 bg-white/5 border border-prayxis-accent/40 rounded-xl space-y-2">
                  <div className="text-prayxis-accent font-bold text-sm flex items-center gap-2">
                    <Award className="h-4 w-4" />
                    <span>SECTION 14 // FINAL PRACTICAL CODING MISSION</span>
                  </div>
                  <p className="text-prayxis-offwhite font-medium text-xs leading-relaxed">
                    Write your complete multi-line Python program from scratch in the Prayxis Python Laboratory below.
                  </p>
                  <div className="text-prayxis-muted text-xs">
                    Requirements: Write minimum <strong>7 print() statements</strong> including Greeting, Name, Age, City, Course, Reason for learning, and Future Goal. Click &quot;RUN CODE&quot; to execute and verify your code!
                  </div>
                </div>

                {/* Interactive Python Playground with Verification Engine */}
                <PythonPlayground
                  initialCode={`# ============================================
# PRAYXIS PYTHON DAY 01: FINAL MISSION
# AUTHOR: YOUR NAME
# ============================================

# Write your minimum 7 print() statements below:
print("Hello, everyone at Prayxis Academy!")
print("My name is [Your Name].")
print("I am [Your Age] years old.")
print("I live in [Your City].")
print("I am learning Python Foundations.")
print("I am learning programming because I want to build great software.")
print("My future goal is to become a professional software engineer.")
`}
                  showVerification={true}
                  onVerifySuccess={async () => {
                    setPracticalCompleted(true);
                    setCompletedSteps((prev) => new Set([...prev, PYTHON_DAY_01_STEPS.length]));
                    try {
                      await fetch('/api/courses/progress', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ courseSlug: 'python-basics', dayNumber: 1 }),
                      });
                    } catch (err) {
                      // Silent catch
                    }
                  }}
                />

                {practicalCompleted && (
                  <div className="p-6 bg-prayxis-accent/10 border border-prayxis-accent/60 rounded-xl text-center space-y-3 cyan-glow-subtle">
                    <Award className="h-8 w-8 text-prayxis-accent mx-auto" />
                    <div className="text-prayxis-accent font-bold text-lg uppercase">
                      DAY 01 PYTHON FOUNDATIONS COMPLETED!
                    </div>
                    <p className="text-prayxis-offwhite text-xs max-w-lg mx-auto">
                      Congratulations! You have written and verified your first real Python program from absolute zero. Day 02 (Variables &amp; Data Types) will unlock when available.
                    </p>
                  </div>
                )}
              </div>
            ) : currentStep.id === 11 ? (
              /* STEP 11: INTERACTIVE DEBUGGING CHALLENGE */
              <div className="space-y-6">
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl space-y-2">
                  <div className="text-red-400 font-bold text-xs uppercase flex items-center gap-1.5">
                    <Bug className="h-4 w-4" />
                    <span>INTENTIONAL BUG HUNTING: 3 BROKEN CODES</span>
                  </div>
                  <p className="text-prayxis-offwhite text-xs leading-relaxed">
                    Software engineers spend half their time finding and fixing bugs. Analyze the 3 broken code snippets below, understand the error message, and test the fix in the interactive editor!
                  </p>
                </div>

                {/* 3 Broken Code Tabs */}
                <div className="flex flex-wrap gap-2 border-b border-white/10 pb-3">
                  {[
                    { id: 1, title: 'BUG 1: UNCLOSED QUOTE' },
                    { id: 2, title: 'BUG 2: CAPITALIZED PRINT' },
                    { id: 3, title: 'BUG 3: MISSING PARENTHESIS' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveDebugTab(tab.id)}
                      className={`px-3 py-2 rounded font-mono text-xs font-bold uppercase transition-all cursor-pointer ${
                        activeDebugTab === tab.id
                          ? 'bg-prayxis-accent text-black cyan-glow-subtle'
                          : 'bg-white/5 text-prayxis-muted hover:text-white'
                      }`}
                    >
                      {tab.title}
                    </button>
                  ))}
                </div>

                {/* Tab 1 Content */}
                {activeDebugTab === 1 && (
                  <div className="space-y-4 p-5 bg-black/50 border border-white/10 rounded-xl">
                    <div className="text-prayxis-accent font-bold text-xs">EXERCISE 1: UNCLOSED STRING LITERAL</div>
                    <div className="p-3 bg-red-500/10 border border-red-500/30 rounded font-mono text-red-300 text-xs">
                      print(&quot;Hello)
                    </div>
                    <div className="text-prayxis-muted text-xs leading-relaxed">
                      <strong>Problem:</strong> String double quote <code className="text-prayxis-accent">&quot;</code> se start hui lekin close nahi hui before line end.
                    </div>
                    <div className="text-prayxis-offwhite text-xs font-bold">
                      <strong>Fix:</strong> Closing double quote add karein: <code className="text-emerald-400">print(&quot;Hello&quot;)</code>
                    </div>
                    <PythonPlayground initialCode={`# Fix the unclosed quote below and Run:
print("Hello World!")`} />
                  </div>
                )}

                {/* Tab 2 Content */}
                {activeDebugTab === 2 && (
                  <div className="space-y-4 p-5 bg-black/50 border border-white/10 rounded-xl">
                    <div className="text-prayxis-accent font-bold text-xs">EXERCISE 2: CASE SENSITIVITY (CAPITAL PRINT)</div>
                    <div className="p-3 bg-red-500/10 border border-red-500/30 rounded font-mono text-red-300 text-xs">
                      Print(&quot;Welcome to Python&quot;)
                    </div>
                    <div className="text-prayxis-muted text-xs leading-relaxed">
                      <strong>Problem:</strong> Python is case-sensitive. Capital <code className="text-red-400">Print</code> does not exist in built-in Python namespace (throws <code className="text-red-400">NameError</code>).
                    </div>
                    <div className="text-prayxis-offwhite text-xs font-bold">
                      <strong>Fix:</strong> Function name must be lowercase: <code className="text-emerald-400">print(&quot;Welcome to Python&quot;)</code>
                    </div>
                    <PythonPlayground initialCode={`# Fix the capitalized Print below and Run:
print("Welcome to Python Programming!")`} />
                  </div>
                )}

                {/* Tab 3 Content */}
                {activeDebugTab === 3 && (
                  <div className="space-y-4 p-5 bg-black/50 border border-white/10 rounded-xl">
                    <div className="text-prayxis-accent font-bold text-xs">EXERCISE 3: MISSING CLOSING PARENTHESIS</div>
                    <div className="p-3 bg-red-500/10 border border-red-500/30 rounded font-mono text-red-300 text-xs">
                      print(&quot;Hello&quot;
                    </div>
                    <div className="text-prayxis-muted text-xs leading-relaxed">
                      <strong>Problem:</strong> Opening bracket <code className="text-prayxis-accent">(</code> exists, but closing <code className="text-prayxis-accent">)</code> is missing. Python reaches end-of-file unexpectedly.
                    </div>
                    <div className="text-prayxis-offwhite text-xs font-bold">
                      <strong>Fix:</strong> Add closing parenthesis: <code className="text-emerald-400">print(&quot;Hello&quot;)</code>
                    </div>
                    <PythonPlayground initialCode={`# Fix the missing parenthesis below and Run:
print("All parentheses properly closed!")`} />
                  </div>
                )}

                {/* 4-Step Rule Box */}
                <div className="p-4 bg-prayxis-accent/10 border border-prayxis-accent/30 rounded-xl space-y-2">
                  <div className="text-prayxis-accent font-bold text-xs uppercase flex items-center gap-1.5">
                    <Lightbulb className="h-4 w-4 text-prayxis-accent" />
                    <span>THE 4-STEP PROFESSIONAL DEBUGGING RULE</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-center text-[10px] font-mono pt-1">
                    <div className="p-2 bg-white/5 border border-white/10 rounded">
                      <div className="text-prayxis-accent font-bold">1. READ</div>
                      <div className="text-prayxis-subtle mt-0.5">Read error text</div>
                    </div>
                    <div className="p-2 bg-white/5 border border-white/10 rounded">
                      <div className="text-prayxis-accent font-bold">2. FIND</div>
                      <div className="text-prayxis-subtle mt-0.5">Locate line number</div>
                    </div>
                    <div className="p-2 bg-white/5 border border-white/10 rounded">
                      <div className="text-prayxis-accent font-bold">3. UNDERSTAND</div>
                      <div className="text-prayxis-subtle mt-0.5">Identify broken rule</div>
                    </div>
                    <div className="p-2 bg-white/5 border border-white/10 rounded">
                      <div className="text-prayxis-accent font-bold">4. FIX & RUN</div>
                      <div className="text-prayxis-subtle mt-0.5">Correct and rerun</div>
                    </div>
                  </div>
                </div>

                {/* Concept Question */}
                {currentStep.question && (
                  <div className="p-5 bg-black/40 border border-white/10 rounded-xl space-y-3 pt-4">
                    <div className="flex items-center gap-2 text-prayxis-accent font-bold text-xs uppercase">
                      <HelpCircle className="h-4 w-4 text-prayxis-accent" />
                      <span>DEBUGGING CONCEPT CHECK</span>
                    </div>

                    <p className="text-prayxis-offwhite font-bold text-xs sm:text-sm whitespace-pre-wrap">
                      {currentStep.question.text}
                    </p>

                    <div className="space-y-2">
                      {currentStep.question.options.map((opt, oIdx) => {
                        const selected = stepAnswers[currentStep.id] === oIdx;
                        const isCorrect = oIdx === currentStep.question?.correctIndex;

                        return (
                          <button
                            key={oIdx}
                            type="button"
                            onClick={() => handleStepQuestionSelect(currentStep.id, oIdx)}
                            className={`w-full p-3 rounded text-left transition-all border text-xs cursor-pointer ${
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
                          {stepAnswers[currentStep.id] === currentStep.question.correctIndex
                            ? '✓ CORRECT: '
                            : '✕ EXPLANATION: '}
                        </span>
                        <span>{currentStep.question.explanation}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              /* STANDARD CONCEPT STEP VIEW (Easy Explanation -> Real Examples -> Flow Diagram -> Syntax -> Playground -> Question) */
              <div className="space-y-6">
                
                {/* 1. EASY INTRO / WHAT IS IT? */}
                <div className="space-y-3">
                  <div className="text-prayxis-accent font-extrabold text-[11px] uppercase tracking-wider flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-prayxis-accent" />
                    <span>WHAT IS IT? // CONCEPT BREAKDOWN</span>
                  </div>
                  <p className="text-prayxis-offwhite text-sm sm:text-base font-medium leading-relaxed">
                    {currentStep.easyExplanation}
                  </p>
                </div>

                {/* 2. REAL EXAMPLES */}
                {currentStep.realExample && (
                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-1.5">
                    <div className="text-prayxis-accent font-bold text-[10px] uppercase flex items-center gap-1.5">
                      <Globe className="h-3.5 w-3.5 text-prayxis-accent" />
                      <span>REAL LIFE CONTEXT & INDUSTRY USAGE</span>
                    </div>
                    <p className="text-prayxis-offwhite text-xs leading-relaxed">{currentStep.realExample}</p>
                  </div>
                )}

                {/* 3. WHY DO WE USE IT? */}
                {currentStep.why && (
                  <div className="p-4 bg-prayxis-accent/5 border border-prayxis-accent/20 rounded-xl space-y-1.5">
                    <div className="text-prayxis-accent font-bold text-[10px] uppercase flex items-center gap-1.5">
                      <Lightbulb className="h-3.5 w-3.5 text-prayxis-accent" />
                      <span>WHY IS THIS CRITICAL?</span>
                    </div>
                    <p className="text-prayxis-offwhite text-xs leading-relaxed">{currentStep.why}</p>
                  </div>
                )}

                {/* 4. FLOW DIAGRAM / ARCHITECTURE VISUAL */}
                {currentStep.flowDiagram && (
                  <div className="p-4 bg-[#05070a] border border-prayxis-accent/30 rounded-xl space-y-2">
                    <div className="text-prayxis-accent text-[10px] uppercase font-bold flex items-center gap-1.5">
                      <Layers className="h-3.5 w-3.5 text-prayxis-accent" />
                      <span>EXECUTION FLOW / ROADMAP</span>
                    </div>
                    <pre className="p-3 bg-black/60 border border-white/10 rounded font-mono text-[11px] text-prayxis-offwhite whitespace-pre-wrap overflow-x-auto leading-relaxed">
                      {currentStep.flowDiagram}
                    </pre>
                  </div>
                )}

                {/* 5. SYNTAX & SYNTAX BREAKDOWN */}
                {currentStep.syntax && (
                  <div className="p-4 bg-black/80 border border-prayxis-accent/40 rounded-xl space-y-3">
                    <div className="text-prayxis-accent font-bold text-[10px] uppercase flex items-center gap-1.5">
                      <Code2 className="h-3.5 w-3.5 text-prayxis-accent" />
                      <span>SYNTAX STRUCTURE</span>
                    </div>
                    <div className="p-2.5 bg-black/60 border border-white/10 rounded font-mono text-prayxis-accent text-xs font-bold whitespace-pre-wrap">
                      {currentStep.syntax}
                    </div>

                    {currentStep.syntaxBreakdown && (
                      <div className="pt-2 border-t border-white/10 space-y-1.5">
                        <div className="text-prayxis-subtle text-[10px] uppercase font-bold">SYNTAX ANATOMY:</div>
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

                {/* 6. TEACHER CODE EXAMPLE & OUTPUT */}
                {currentStep.teacherExample && (
                  <div className="space-y-3">
                    <div className="text-prayxis-accent text-[10px] uppercase font-bold flex items-center gap-1.5">
                      <Terminal className="h-3.5 w-3.5" />
                      <span>TEACHER CODE EXAMPLE:</span>
                    </div>
                    <pre className="p-4 bg-black/60 border border-white/10 rounded text-prayxis-accent overflow-x-auto text-xs font-mono">
                      <code>{currentStep.teacherExample}</code>
                    </pre>

                    {currentStep.whatYouShouldSee && (
                      <div className="p-3.5 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-yellow-200/90 text-xs flex items-start gap-2">
                        <Eye className="h-4 w-4 text-yellow-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-yellow-400 uppercase">EXPECTED TERMINAL OUTPUT: </span>
                          <div className="mt-1 font-mono text-[11px] whitespace-pre-wrap text-yellow-100">
                            {currentStep.whatYouShouldSee}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* 7. LIVE PYTHON PLAYGROUND PRACTICE */}
                {currentStep.microPractice && (
                  <div className="space-y-3 pt-4 border-t border-white/10">
                    <div className="p-4 bg-prayxis-accent/10 border border-prayxis-accent/40 rounded-xl space-y-2">
                      <div className="text-prayxis-accent font-bold text-[11px] uppercase flex items-center gap-2">
                        <Code2 className="h-4 w-4 text-prayxis-accent" />
                        <span>LIVE HANDS-ON PRACTICE // TRY IT YOURSELF</span>
                      </div>
                      <p className="text-prayxis-offwhite text-xs leading-relaxed">
                        {currentStep.microPractice.prompt}
                      </p>
                    </div>

                    <PythonPlayground
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

                {/* 9. CONCEPT CHECK QUESTION */}
                {currentStep.question && (
                  <div className="p-5 bg-black/40 border border-white/10 rounded-xl space-y-3 pt-4">
                    <div className="flex items-center gap-2 text-prayxis-accent font-bold text-xs uppercase">
                      <HelpCircle className="h-4 w-4 text-prayxis-accent" />
                      <span>CONCEPT CHECK</span>
                    </div>

                    <p className="text-prayxis-offwhite font-bold text-xs sm:text-sm whitespace-pre-wrap">
                      {currentStep.question.text}
                    </p>

                    <div className="space-y-2">
                      {currentStep.question.options.map((opt, oIdx) => {
                        const selected = stepAnswers[currentStep.id] === oIdx;
                        const isCorrect = oIdx === currentStep.question?.correctIndex;

                        return (
                          <button
                            key={oIdx}
                            type="button"
                            onClick={() => handleStepQuestionSelect(currentStep.id, oIdx)}
                            className={`w-full p-3 rounded text-left transition-all border text-xs cursor-pointer ${
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
                          {stepAnswers[currentStep.id] === currentStep.question.correctIndex
                            ? '✓ CORRECT: '
                            : '✕ EXPLANATION: '}
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
                className="px-4 py-2.5 bg-white/5 border border-white/10 hover:border-white/20 text-prayxis-offwhite rounded font-mono text-xs uppercase disabled:opacity-40 flex items-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>PREVIOUS STEP</span>
              </button>

              <button
                type="button"
                onClick={handleNextStep}
                disabled={currentStepId === PYTHON_DAY_01_STEPS.length}
                className="px-6 py-2.5 bg-prayxis-accent text-black font-bold rounded font-mono text-xs uppercase hover:bg-white transition-colors flex items-center gap-2 cyan-glow disabled:opacity-40 cursor-pointer"
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
