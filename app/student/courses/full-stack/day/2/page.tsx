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
import { DAY_02_STEPS, DAY_02_QUIZ_QUESTIONS, DAY_02_CHECKLIST } from '@/data/day02Data';
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
  RefreshCw,
} from 'lucide-react';
import { getCourseEnrollmentStatus } from '@/lib/utils/dayUnlock';
import { getWhatsAppEnrollUrl } from '@/lib/whatsapp';

export default function Day02LessonPage() {
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
  const [practiceSubmitted, setPracticeSubmitted] = useState(false);

  // Debugging Lab interactive state (Step 14)
  const [debugAnswers, setDebugAnswers] = useState<Record<number, number>>({});
  const [debugSubmitted, setDebugSubmitted] = useState<Record<number, boolean>>({});

  // Solution reveal toggle for Step 12 & 15
  const [showSolution12, setShowSolution12] = useState(false);
  const [showSolution15, setShowSolution15] = useState(false);

  // Structure Checker state for Step 15
  const [checkedStructure, setCheckedStructure] = useState<Record<string, boolean>>({
    doctype: true,
    html: true,
    head: true,
    title: true,
    body: true,
    h1: true,
    p: true,
    comments: true,
    indentation: true,
    closingTags: true,
  });

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

  const currentStep = DAY_02_STEPS.find((s) => s.id === currentStepId) || DAY_02_STEPS[0];

  const handleNextStep = () => {
    setCompletedSteps((prev) => new Set([...prev, currentStepId]));
    if (currentStepId < DAY_02_STEPS.length) {
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
    DAY_02_QUIZ_QUESTIONS.forEach((q) => {
      if (quizAnswers[q.id] === q.correctIndex) score += 1;
    });
    setQuizScore(score);
    setQuizSubmitted(true);
    setCompletedSteps((prev) => new Set([...prev, DAY_02_STEPS.length]));
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
  const progressPercentage = Math.min(100, Math.round((completedSteps.size / DAY_02_STEPS.length) * 100));

  if (loading) {
    return (
      <div className="min-h-screen bg-prayxis-bg flex items-center justify-center font-mono text-xs text-prayxis-accent">
        <span>LOADING DAY 02 MODULE...</span>
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
              FULL STACK DAY 02 ACCESS LOCKED
            </h1>

            <p className="body-medium text-prayxis-muted leading-relaxed max-w-xl mx-auto font-normal">
              {courseStatus.isRequested
                ? 'Your enrollment request for Full Stack Web Development is pending Admin approval. Contact support on WhatsApp for quick activation.'
                : 'Aapne abhi tak is course me enroll nahi kiya hai. Ganesh Chaturthi Special Offer me enroll karke complete access payein.'}
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => {
                  if (!user) {
                    router.push('/login?redirect=/student/courses/full-stack/day/2');
                    return;
                  }
                  const waUrl = getWhatsAppEnrollUrl({
                    userId: user.id,
                    userName: user.name,
                    userEmail: user.email,
                    courseTitle: 'Full Stack Web Development',
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
        courseSlug="full-stack"
        dayNumber={2}
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
              <span className="text-prayxis-accent font-bold">DAY 02</span>
            </nav>
          </div>

          <div className="font-mono text-xs text-prayxis-accent font-bold uppercase tracking-wider">
            DAY 02 / 45 — HTML DOCUMENT STRUCTURE (2H 40M)
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
                  <span className="text-prayxis-accent font-bold uppercase">DAY 02 STEPS</span>
                </div>
                <span className="text-prayxis-subtle">
                  {completedSteps.size} / {DAY_02_STEPS.length} COMPLETED
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
                {DAY_02_STEPS.map((st) => {
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
                    STEP {currentStep.id} OF {DAY_02_STEPS.length}
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
                    SHOW ALL STEPS ({currentStep.id}/{DAY_02_STEPS.length})
                  </span>
                </button>
              )}
            </div>

            {/* STEP 13: PRACTICE LAB */}
            {currentStep.id === 13 ? (
              <div className="space-y-6">
                <div className="p-4 bg-white/5 border border-prayxis-accent/40 rounded-xl space-y-2">
                  <div className="text-prayxis-accent font-bold text-sm">STEP 13 // PRACTICE LAB</div>
                  <p className="text-prayxis-muted body-small">
                    Test your understanding across multiple practice challenges. Match items, order tags, and verify true/false statements.
                  </p>
                </div>

                {/* Practice 01 & 02 Code Examples */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-black/60 border border-white/10 rounded-xl space-y-2">
                    <div className="text-prayxis-accent font-bold text-xs uppercase flex items-center gap-1.5">
                      <FileCode2 className="h-4 w-4" />
                      <span>PRACTICE 01: MY COLLEGE PAGE</span>
                    </div>
                    <pre className="p-3 bg-black/80 rounded font-mono text-[11px] text-prayxis-offwhite leading-relaxed overflow-x-auto">
{`<!DOCTYPE html>
<html>
  <head>
    <title>My College</title>
  </head>
  <body>
    <h1>Welcome to My College</h1>
    <p>I am learning web development.</p>
  </body>
</html>`}
                    </pre>
                  </div>

                  <div className="p-4 bg-black/60 border border-white/10 rounded-xl space-y-2">
                    <div className="text-prayxis-accent font-bold text-xs uppercase flex items-center gap-1.5">
                      <FileCode2 className="h-4 w-4" />
                      <span>PRACTICE 02: MY PORTFOLIO</span>
                    </div>
                    <pre className="p-3 bg-black/80 rounded font-mono text-[11px] text-prayxis-offwhite leading-relaxed overflow-x-auto">
{`<!DOCTYPE html>
<html>
  <head>
    <title>My Portfolio</title>
  </head>
  <body>
    <h1>Hello, I am a Developer</h1>
    <p>This is my first portfolio webpage.</p>
  </body>
</html>`}
                    </pre>
                  </div>
                </div>

                {/* Practice 03: Element Placement Matching */}
                <div className="p-5 bg-black/40 border border-white/10 rounded-xl space-y-3">
                  <div className="text-prayxis-accent font-bold text-xs uppercase">PRACTICE 03 // ELEMENT PLACEMENT MATCHING</div>
                  <p className="text-prayxis-muted text-xs">Verify where each item belongs in a valid HTML document:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 bg-white/5 border border-white/10 rounded flex justify-between items-center">
                      <span className="text-prayxis-offwhite font-bold">&lt;!DOCTYPE html&gt;</span>
                      <span className="text-prayxis-accent text-[11px]">→ First Line Declaration</span>
                    </div>
                    <div className="p-2.5 bg-white/5 border border-white/10 rounded flex justify-between items-center">
                      <span className="text-prayxis-offwhite font-bold">&lt;title&gt;</span>
                      <span className="text-prayxis-accent text-[11px]">→ Inside &lt;head&gt;</span>
                    </div>
                    <div className="p-2.5 bg-white/5 border border-white/10 rounded flex justify-between items-center">
                      <span className="text-prayxis-offwhite font-bold">&lt;h1&gt; Heading</span>
                      <span className="text-prayxis-accent text-[11px]">→ Inside &lt;body&gt;</span>
                    </div>
                    <div className="p-2.5 bg-white/5 border border-white/10 rounded flex justify-between items-center">
                      <span className="text-prayxis-offwhite font-bold">&lt;p&gt; Paragraph</span>
                      <span className="text-prayxis-accent text-[11px]">→ Inside &lt;body&gt;</span>
                    </div>
                  </div>
                </div>

                {/* Practice 05: True or False Questions */}
                <div className="p-5 bg-black/40 border border-white/10 rounded-xl space-y-4">
                  <div className="text-prayxis-accent font-bold text-xs uppercase">PRACTICE 05 // TRUE OR FALSE CHECK</div>
                  <div className="space-y-3">
                    {[
                      { id: 1, q: '1. <title> normally belongs inside <head>.', correct: true },
                      { id: 2, q: '2. <h1> should normally be inside <body>.', correct: true },
                      { id: 3, q: '3. <body> is outside <html>.', correct: false },
                      { id: 4, q: '4. HTML elements can be nested inside each other.', correct: true },
                    ].map((tf) => (
                      <div key={tf.id} className="p-3 bg-white/5 border border-white/10 rounded flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <span className="text-prayxis-offwhite text-xs">{tf.q}</span>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setTfAnswers((prev) => ({ ...prev, [tf.id]: true }))}
                            className={`px-3 py-1 rounded text-xs font-bold transition-all border ${
                              tfAnswers[tf.id] === true
                                ? tf.correct
                                  ? 'bg-prayxis-accent text-black border-prayxis-accent'
                                  : 'bg-red-500 text-white border-red-500'
                                : 'bg-white/5 text-prayxis-muted border-white/10 hover:border-white/20'
                            }`}
                          >
                            TRUE
                          </button>
                          <button
                            type="button"
                            onClick={() => setTfAnswers((prev) => ({ ...prev, [tf.id]: false }))}
                            className={`px-3 py-1 rounded text-xs font-bold transition-all border ${
                              tfAnswers[tf.id] === false
                                ? !tf.correct
                                  ? 'bg-prayxis-accent text-black border-prayxis-accent'
                                  : 'bg-red-500 text-white border-red-500'
                                : 'bg-white/5 text-prayxis-muted border-white/10 hover:border-white/20'
                            }`}
                          >
                            FALSE
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : currentStep.id === 14 ? (
              /* STEP 14: DEBUGGING LAB */
              <div className="space-y-6">
                <div className="p-4 bg-white/5 border border-prayxis-accent/40 rounded-xl space-y-2">
                  <div className="text-prayxis-accent font-bold text-sm">STEP 14 // DEBUGGING LAB</div>
                  <p className="text-prayxis-muted body-small">
                    Analyze 5 broken HTML code snippets. Identify structural bugs (missing tags, wrong section order, improper nesting) and learn why each occurs.
                  </p>
                </div>

                {[
                  {
                    id: 1,
                    title: 'BUG 01: Unclosed Paragraph Tag',
                    code: `<!DOCTYPE html>\n<html>\n  <head>\n    <title>My Website</title>\n  </head>\n  <body>\n    <h1>Welcome</h1>\n    <p>Hello\n  </body>\n</html>`,
                    problem: 'Missing closing </p> tag after paragraph content.',
                    fix: 'Add </p> to properly close paragraph before </body>.',
                  },
                  {
                    id: 2,
                    title: 'BUG 02: Head Section Inside Body',
                    code: `<!DOCTYPE html>\n<html>\n  <body>\n    <head>\n      <title>My Website</title>\n    </head>\n  </body>\n</html>`,
                    problem: '<head> and <body> are in the wrong order. <head> cannot sit inside <body>.',
                    fix: 'Place <head> before <body> inside <html>.',
                  },
                  {
                    id: 3,
                    title: 'BUG 03: Title Closed with Wrong Tag',
                    code: `<!DOCTYPE html>\n<html>\n  <head>\n    <title>My Website</head>\n  <body>\n    <h1>Hello</h1>\n  </body>\n</html>`,
                    problem: '<title> is closed with </head> instead of </title>.',
                    fix: 'Close <title> with </title> before closing </head>.',
                  },
                  {
                    id: 4,
                    title: 'BUG 04: Structure Validity Check',
                    code: `<!DOCTYPE html>\n<html>\n  <head>\n    <title>My Website</title>\n  </head>\n  <body>\n    <h1>Hello</h1>\n  </body>\n</html>`,
                    problem: 'Is this HTML document structure valid?',
                    fix: 'YES! Structurally this is 100% valid HTML5.',
                  },
                  {
                    id: 5,
                    title: 'BUG 05: Improper Tag Nesting',
                    code: `<html>\n  <body>\n    <p>\n      <strong>Hello</p>\n    </strong>\n  </body>\n</html>`,
                    problem: 'Improper nesting: <p> tag closes before inner <strong> tag closes.',
                    fix: 'Correct nesting: <p><strong>Hello</strong></p>. Close <strong> first!',
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
                    Project Name: MY FIRST STRUCTURED WEBPAGE. Build a simple personal introduction webpage from absolute zero applying all 10 structural concepts learned today.
                  </p>
                  <div className="text-prayxis-subtle text-xs">
                    Requirements: DOCTYPE, html, head, title, body, 1 main heading (h1), 2 paragraphs (p), 2 HTML comments, proper indentation.
                  </div>
                </div>

                {/* Practical HTML Playground */}
                <HtmlPlayground
                  initialCode={`<!DOCTYPE html>
<html>
  <head>
    <title>About Prashant</title>
  </head>
  <body>

    <!-- Main Heading -->
    <h1>Hello, I am Prashant</h1>

    <!-- About Me Section -->
    <p>I am learning Full Stack Web Development at Prayxis Academy.</p>
    <p>My goal is to build production-grade software applications.</p>

  </body>
</html>`}
                  showVerification={true}
                  onVerifySuccess={async () => {
                    setPracticalCompleted(true);
                    setCompletedSteps((prev) => new Set([...prev, DAY_02_STEPS.length]));
                    try {
                      await fetch('/api/courses/progress', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ courseSlug: 'full-stack', dayNumber: 2 }),
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
                    <span className="text-prayxis-subtle text-[11px]">10 / 10 REQUIREMENTS PASSED</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs">
                    {[
                      { key: 'doctype', label: '✓ DOCTYPE present' },
                      { key: 'html', label: '✓ html element present' },
                      { key: 'head', label: '✓ head present' },
                      { key: 'title', label: '✓ title present' },
                      { key: 'body', label: '✓ body present' },
                      { key: 'h1', label: '✓ heading present' },
                      { key: 'p', label: '✓ paragraph present' },
                      { key: 'comments', label: '✓ comments present' },
                      { key: 'indentation', label: '✓ proper indentation encouraged' },
                      { key: 'closingTags', label: '✓ closing tags present' },
                    ].map((chk) => (
                      <div key={chk.key} className="p-2 bg-prayxis-accent/10 border border-prayxis-accent/30 rounded text-prayxis-accent flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                        <span>{chk.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* DAY 02 VERIFICATION QUIZ */}
                <div className="space-y-6 pt-4 border-t border-white/10">
                  <div className="p-4 bg-white/5 border border-prayxis-accent/40 rounded-xl space-y-2">
                    <div className="text-prayxis-accent font-bold text-sm">DAY 02 VERIFICATION QUIZ</div>
                    <p className="text-prayxis-muted body-small">
                      Answer all 10 questions to verify complete mastery of HTML document structure.
                    </p>
                  </div>

                  <div className="space-y-5">
                    {DAY_02_QUIZ_QUESTIONS.map((q, idx) => {
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
                        {quizScore >= 8 ? 'Outstanding structure mastery! Review the completion checklist below.' : 'Review missed questions above.'}
                      </p>
                    </div>
                  )}
                </div>

                {/* DAY 02 COMPLETION CHECKLIST */}
                <div className="p-5 bg-black/60 border border-white/10 rounded-xl space-y-4 pt-4">
                  <div className="text-prayxis-accent font-bold text-xs uppercase flex items-center justify-between">
                    <span>DAY 02 COMPLETION CHECKLIST</span>
                    <span className="text-prayxis-subtle">{checkedItems.size} / {DAY_02_CHECKLIST.length} CHECKED</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {DAY_02_CHECKLIST.map((item, cIdx) => {
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
                      DAY 02 COMPLETE
                    </div>
                    <div className="text-prayxis-offwhite font-bold text-sm uppercase">
                      HTML DOCUMENT STRUCTURE COMPLETED
                    </div>
                    <p className="text-prayxis-muted text-xs max-w-md mx-auto">
                      Great work! You can now create a properly structured HTML document from scratch with clean indentation, metadata, and body content.
                    </p>
                  </div>

                  <div className="pt-2">
                    <Link
                      href="/student/courses/full-stack/day/3"
                      className="inline-flex items-center gap-2 px-8 py-3.5 bg-prayxis-accent text-black font-mono text-xs font-black uppercase rounded-xl hover:bg-white transition-all shadow-lg cyan-glow"
                    >
                      <span>CONTINUE TO DAY 03</span>
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

                {/* 4. HOW DOES IT WORK? (VISUAL CAUSE → EFFECT DEMONSTRATION) */}
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
    <!-- Main introduction -->
    <h1>Hello, I am a Web Developer</h1>
    <p>I am learning Full Stack Web Development.</p>
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
                disabled={currentStepId === DAY_02_STEPS.length}
                className="px-6 py-2.5 bg-prayxis-accent text-black font-bold uppercase rounded-lg hover:bg-white transition-colors flex items-center gap-2 cyan-glow disabled:opacity-40"
              >
                <span>{currentStepId === DAY_02_STEPS.length ? 'DAY 02 COMPLETE' : 'NEXT STEP'}</span>
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
