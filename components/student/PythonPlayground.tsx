'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  RotateCcw,
  Copy,
  Check,
  Terminal as TerminalIcon,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  CheckCircle,
  XCircle,
  HelpCircle,
  Zap,
} from 'lucide-react';

interface PythonPlaygroundProps {
  initialCode?: string;
  showVerification?: boolean;
  onVerifySuccess?: () => void;
  verificationTitle?: string;
}

interface VerificationCheck {
  id: string;
  label: string;
  passed: boolean;
  hint: string;
}

export const PythonPlayground: React.FC<PythonPlaygroundProps> = ({
  initialCode = 'print("Hello, World!")',
  showVerification = false,
  onVerifySuccess,
  verificationTitle = 'DAY 01 MISSION VERIFICATION CHECKLIST',
}) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<string[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const [executionTime, setExecutionTime] = useState<string | null>(null);
  const [hasExecuted, setHasExecuted] = useState(false);

  // Verification checks state
  const [checks, setChecks] = useState<VerificationCheck[]>([
    {
      id: 'min-lines',
      label: 'Minimum 7 print() statements',
      passed: false,
      hint: 'Your code must contain at least 7 separate print() calls.',
    },
    {
      id: 'greeting',
      label: 'Greeting statement (Hello / Namaste / Welcome)',
      passed: false,
      hint: 'Include a greeting message like "Hello everyone!" or "Namaste".',
    },
    {
      id: 'name',
      label: 'Developer Name statement',
      passed: false,
      hint: 'Print your name using "My name is [Your Name]".',
    },
    {
      id: 'age',
      label: 'Age statement',
      passed: false,
      hint: 'Print your age (e.g., "I am 20 years old").',
    },
    {
      id: 'city',
      label: 'City / Location statement',
      passed: false,
      hint: 'Print your home city or location.',
    },
    {
      id: 'course',
      label: 'Course statement (Python / Prayxis)',
      passed: false,
      hint: 'Mention learning Python at Prayxis Academy.',
    },
    {
      id: 'why',
      label: 'Reason / Why learning programming',
      passed: false,
      hint: 'State why you want to learn programming / coding.',
    },
    {
      id: 'goal',
      label: 'Future Career Goal statement',
      passed: false,
      hint: 'State your future goal (e.g., "become a software engineer").',
    },
    {
      id: 'no-errors',
      label: 'Zero Syntax or Runtime Errors',
      passed: false,
      hint: 'All Python lines must execute cleanly without syntax errors.',
    },
  ]);

  const [allPassed, setAllPassed] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Reset code when initialCode changes
  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

  // Execute Python Code Simulation
  const runPythonCode = (codeToRun: string) => {
    setIsRunning(true);
    setHasExecuted(true);
    const startTime = performance.now();

    const lines = codeToRun.split('\n');
    const outLines: string[] = [];
    const errLines: string[] = [];

    let insideMultiLineComment = false;

    for (let idx = 0; idx < lines.length; idx++) {
      const lineNum = idx + 1;
      const rawLine = lines[idx];
      const trimmed = rawLine.trim();

      // Check multi-line string / comment delimiters """ or '''
      if (trimmed.startsWith('"""') || trimmed.startsWith("'''")) {
        if (trimmed.length > 3 && (trimmed.endsWith('"""') || trimmed.endsWith("'''"))) {
          continue;
        }
        insideMultiLineComment = !insideMultiLineComment;
        continue;
      }
      if (insideMultiLineComment) {
        if (trimmed.endsWith('"""') || trimmed.endsWith("'''")) {
          insideMultiLineComment = false;
        }
        continue;
      }

      // Empty line or single line comment
      if (!trimmed || trimmed.startsWith('#')) {
        continue;
      }

      // Check for common beginner error: capitalized Print
      if (trimmed.startsWith('Print(') || trimmed.startsWith('PRINT(')) {
        errLines.push(
          `Traceback (most recent call last):\n  File "main.py", line ${lineNum}, in <module>\n    ${trimmed}\nNameError: name 'Print' is not defined. Did you mean: 'print'?`
        );
        break;
      }

      // Check for print statement
      if (trimmed.startsWith('print')) {
        // Missing opening parenthesis
        if (!trimmed.startsWith('print(')) {
          errLines.push(
            `  File "main.py", line ${lineNum}\n    ${trimmed}\nSyntaxError: Missing parentheses in call to 'print'. Did you mean print(...)?`
          );
          break;
        }

        // Check if closing parenthesis is missing
        if (!trimmed.endsWith(')')) {
          errLines.push(
            `  File "main.py", line ${lineNum}\n    ${trimmed}\nSyntaxError: unexpected EOF while parsing (missing closing ')')`
          );
          break;
        }

        // Extract content inside print(...)
        const inside = trimmed.slice(6, -1).trim();

        // Handle empty print()
        if (inside === '') {
          outLines.push('');
          continue;
        }

        // Check for string multiplication like "=" * 35 or "*" * 40
        const multMatch = inside.match(/^(['"])(.*?)\1\s*\*\s*(\d+)$/);
        if (multMatch) {
          const char = multMatch[2];
          const count = parseInt(multMatch[3], 10);
          outLines.push(char.repeat(Math.min(count, 100)));
          continue;
        }

        // Check string addition / concatenation: "A" + "B"
        if (inside.includes('+') && (inside.includes('"') || inside.includes("'"))) {
          const parts = inside.split('+').map((p) => p.trim());
          let validConcat = true;
          let concatResult = '';
          for (const p of parts) {
            if ((p.startsWith('"') && p.endsWith('"')) || (p.startsWith("'") && p.endsWith("'"))) {
              concatResult += p.slice(1, -1);
            } else if (!isNaN(Number(p))) {
              errLines.push(
                `Traceback (most recent call last):\n  File "main.py", line ${lineNum}, in <module>\n    ${trimmed}\nTypeError: can only concatenate str (not "int") to str`
              );
              validConcat = false;
              break;
            } else {
              concatResult += p;
            }
          }
          if (validConcat) {
            outLines.push(concatResult);
          }
          if (!validConcat) break;
          continue;
        }

        // Check for single string literal inside quotes
        if (
          (inside.startsWith('"') && inside.endsWith('"')) ||
          (inside.startsWith("'") && inside.endsWith("'"))
        ) {
          // Verify no unescaped mismatch quotes
          const quoteChar = inside[0];
          const rawContent = inside.slice(1, -1);
          outLines.push(rawContent);
          continue;
        }

        // Check unclosed quote error: e.g. print("Hello) or print('Hello)
        if (
          (inside.startsWith('"') && !inside.endsWith('"')) ||
          (inside.startsWith("'") && !inside.endsWith("'"))
        ) {
          errLines.push(
            `  File "main.py", line ${lineNum}\n    ${trimmed}\nSyntaxError: unterminated string literal (detected at line ${lineNum})`
          );
          break;
        }

        // Check for pure number
        if (!isNaN(Number(inside))) {
          outLines.push(inside);
          continue;
        }

        // Check for arithmetic math expression like 10 + 20 or 50 * 2
        try {
          if (/^[\d\s+\-*/%().]+$/.test(inside)) {
            // eslint-disable-next-line no-eval
            const evaluated = Function(`'use strict'; return (${inside})`)();
            outLines.push(String(evaluated));
            continue;
          }
        } catch (e) {
          // fall through
        }

        // Check for comma separated arguments: e.g. print("Name:", "Alex", 99)
        if (inside.includes(',')) {
          const argList: string[] = [];
          const rawArgs = inside.split(',');
          let errorInArgs = false;

          for (const arg of rawArgs) {
            const a = arg.trim();
            if ((a.startsWith('"') && a.endsWith('"')) || (a.startsWith("'") && a.endsWith("'"))) {
              argList.push(a.slice(1, -1));
            } else if (!isNaN(Number(a))) {
              argList.push(a);
            } else if (/^[\d\s+\-*/%().]+$/.test(a)) {
              try {
                // eslint-disable-next-line no-eval
                const evaluated = Function(`'use strict'; return (${a})`)();
                argList.push(String(evaluated));
              } catch (e) {
                argList.push(a);
              }
            } else {
              // Unrecognized identifier/variable without declaration
              errLines.push(
                `Traceback (most recent call last):\n  File "main.py", line ${lineNum}, in <module>\n    ${trimmed}\nNameError: name '${a}' is not defined`
              );
              errorInArgs = true;
              break;
            }
          }

          if (!errorInArgs) {
            outLines.push(argList.join(' '));
            continue;
          } else {
            break;
          }
        }

        // Unquoted word (NameError)
        errLines.push(
          `Traceback (most recent call last):\n  File "main.py", line ${lineNum}, in <module>\n    ${trimmed}\nNameError: name '${inside}' is not defined. Did you forget quotes?`
        );
        break;
      }

      // Variable assignment demo or standard statements
      if (trimmed.includes('=')) {
        // Allow simple variable assignment simulation silently
        continue;
      }

      // Unrecognized statement
      errLines.push(
        `  File "main.py", line ${lineNum}\n    ${trimmed}\nSyntaxError: invalid syntax`
      );
      break;
    }

    const endTime = performance.now();
    const duration = ((endTime - startTime) / 1000).toFixed(2);
    setExecutionTime(duration);

    setOutput(outLines);
    setErrors(errLines);
    setIsRunning(false);

    // Verification check evaluation if enabled
    if (showVerification) {
      evaluateVerification(codeToRun, outLines, errLines);
    }
  };

  const evaluateVerification = (
    codeText: string,
    currentOutput: string[],
    currentErrors: string[]
  ) => {
    const lowerCode = codeText.toLowerCase();
    const lowerOutput = currentOutput.join(' ').toLowerCase();

    // 1. Min 7 print statements
    const printMatches = codeText.match(/print\s*\(/g) || [];
    const minLinesPassed = printMatches.length >= 7;

    // 2. Greeting check
    const greetingPassed =
      lowerCode.includes('hello') ||
      lowerCode.includes('namaste') ||
      lowerCode.includes('welcome') ||
      lowerCode.includes('hi ') ||
      lowerCode.includes('hey ');

    // 3. Name check
    const namePassed =
      lowerCode.includes('name') ||
      lowerCode.includes('naam') ||
      lowerCode.includes('prashant') ||
      lowerCode.includes('myself');

    // 4. Age check
    const agePassed =
      lowerCode.includes('age') ||
      lowerCode.includes('years old') ||
      lowerCode.includes('yr') ||
      /\d{2}/.test(lowerCode);

    // 5. City / Location check
    const cityPassed =
      lowerCode.includes('city') ||
      lowerCode.includes('live') ||
      lowerCode.includes('from') ||
      lowerCode.includes('delhi') ||
      lowerCode.includes('jaipur') ||
      lowerCode.includes('mumbai') ||
      lowerCode.includes('india') ||
      lowerCode.includes('rajasthan');

    // 6. Course / Prayxis check
    const coursePassed =
      lowerCode.includes('python') ||
      lowerCode.includes('prayxis') ||
      lowerCode.includes('course') ||
      lowerCode.includes('academy');

    // 7. Why learning programming check
    const whyPassed =
      lowerCode.includes('learning') ||
      lowerCode.includes('because') ||
      lowerCode.includes('programming') ||
      lowerCode.includes('coding') ||
      lowerCode.includes('build') ||
      lowerCode.includes('software');

    // 8. Future Goal check
    const goalPassed =
      lowerCode.includes('goal') ||
      lowerCode.includes('dream') ||
      lowerCode.includes('become') ||
      lowerCode.includes('engineer') ||
      lowerCode.includes('developer') ||
      lowerCode.includes('future');

    // 9. Zero errors
    const noErrorsPassed = currentErrors.length === 0 && currentOutput.length > 0;

    const newChecks: VerificationCheck[] = [
      {
        id: 'min-lines',
        label: `Minimum 7 print() statements (${printMatches.length} found)`,
        passed: minLinesPassed,
        hint: 'Your code must contain at least 7 separate print() calls.',
      },
      {
        id: 'greeting',
        label: 'Greeting statement (Hello / Namaste / Welcome)',
        passed: greetingPassed,
        hint: 'Include a greeting message like "Hello everyone!" or "Namaste".',
      },
      {
        id: 'name',
        label: 'Developer Name statement',
        passed: namePassed,
        hint: 'Print your name using "My name is [Your Name]".',
      },
      {
        id: 'age',
        label: 'Age statement',
        passed: agePassed,
        hint: 'Print your age (e.g., "I am 20 years old").',
      },
      {
        id: 'city',
        label: 'City / Location statement',
        passed: cityPassed,
        hint: 'Print your home city or location.',
      },
      {
        id: 'course',
        label: 'Course statement (Python / Prayxis)',
        passed: coursePassed,
        hint: 'Mention learning Python at Prayxis Academy.',
      },
      {
        id: 'why',
        label: 'Reason / Why learning programming',
        passed: whyPassed,
        hint: 'State why you want to learn programming / coding.',
      },
      {
        id: 'goal',
        label: 'Future Career Goal statement',
        passed: goalPassed,
        hint: 'State your future goal (e.g., "become a software engineer").',
      },
      {
        id: 'no-errors',
        label: 'Zero Syntax or Runtime Errors',
        passed: noErrorsPassed,
        hint: 'All Python lines must execute cleanly without syntax errors.',
      },
    ];

    setChecks(newChecks);

    const isAllComplete = newChecks.every((c) => c.passed);
    setAllPassed(isAllComplete);

    if (isAllComplete && onVerifySuccess) {
      onVerifySuccess();
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleResetCode = () => {
    setCode(initialCode);
    setOutput([]);
    setErrors([]);
    setHasExecuted(false);
  };

  const handleInsertTemplate = () => {
    const template = `# ============================================
# PRAYXIS PYTHON CONSOLE APPLICATION
# ============================================

print("Hello, everyone at Prayxis Academy!")
print("My name is Prashant Singh.")
print("I am 21 years old.")
print("I live in Jaipur, Rajasthan.")
print("I am learning Python Foundations.")
print("I want to learn programming to build intelligent software.")
print("My dream goal is to become a top full-stack Python engineer.")
`;
    setCode(template);
  };

  const lineCount = code.split('\n').length;

  return (
    <div className="w-full space-y-4 font-mono text-xs select-none">
      {/* Editor & Terminal 2-Column or Stacked Container */}
      <div className="border border-white/10 rounded-2xl bg-[#090b0e] overflow-hidden shadow-2xl backdrop-blur-md">
        
        {/* Top Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-[#0d1015] border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 mr-2">
              <span className="h-3 w-3 rounded-full bg-red-500/80 inline-block" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/80 inline-block" />
              <span className="h-3 w-3 rounded-full bg-green-500/80 inline-block" />
            </div>
            <div className="flex items-center gap-2 text-prayxis-offwhite font-bold tracking-wider uppercase text-[11px]">
              <TerminalIcon className="h-3.5 w-3.5 text-prayxis-accent" />
              <span>main.py // PRAYXIS PYTHON 3.12 LAB</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleInsertTemplate}
              className="px-2.5 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-prayxis-muted hover:text-prayxis-offwhite rounded text-[10px] uppercase font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              title="Insert sample blueprint"
            >
              <Zap className="h-3 w-3 text-amber-400" />
              <span>TEMPLATE</span>
            </button>

            <button
              type="button"
              onClick={handleCopyCode}
              className="px-2.5 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-prayxis-muted hover:text-prayxis-offwhite rounded text-[10px] uppercase font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              title="Copy python source code"
            >
              {copied ? (
                <>
                  <Check className="h-3 w-3 text-emerald-400" />
                  <span className="text-emerald-400">COPIED</span>
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" />
                  <span>COPY</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleResetCode}
              className="px-2.5 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-prayxis-muted hover:text-prayxis-offwhite rounded text-[10px] uppercase font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              title="Reset code editor"
            >
              <RotateCcw className="h-3 w-3" />
              <span>RESET</span>
            </button>

            <button
              type="button"
              onClick={() => runPythonCode(code)}
              disabled={isRunning}
              className="px-4 py-1.5 bg-prayxis-accent text-black font-extrabold rounded text-[11px] uppercase tracking-wider hover:bg-white transition-all flex items-center gap-1.5 cyan-glow cursor-pointer disabled:opacity-50"
            >
              <Play className="h-3.5 w-3.5 fill-black" />
              <span>{isRunning ? 'RUNNING...' : 'RUN CODE'}</span>
            </button>
          </div>
        </div>

        {/* Code Editor Area & Live Terminal Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[340px]">
          
          {/* Left Column: Code Editor with Line Numbers */}
          <div className="lg:col-span-7 bg-[#0b0e14] border-b lg:border-b-0 lg:border-r border-white/10 flex relative">
            {/* Line Numbers */}
            <div className="w-10 py-4 pl-3 pr-2 text-right text-[#4a5568] select-none font-mono text-xs leading-relaxed border-r border-white/5 bg-[#080a0f]">
              {Array.from({ length: Math.max(lineCount, 8) }, (_, i) => (
                <div key={i + 1}>{i + 1}</div>
              ))}
            </div>

            {/* Textarea */}
            <textarea
              ref={textareaRef}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={(e) => {
                // Support Tab key for indentation
                if (e.key === 'Tab') {
                  e.preventDefault();
                  const start = e.currentTarget.selectionStart;
                  const end = e.currentTarget.selectionEnd;
                  const newCode = code.substring(0, start) + '    ' + code.substring(end);
                  setCode(newCode);
                  setTimeout(() => {
                    if (textareaRef.current) {
                      textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 4;
                    }
                  }, 0);
                }
                // Ctrl+Enter to Run
                if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                  e.preventDefault();
                  runPythonCode(code);
                }
              }}
              spellCheck={false}
              autoCapitalize="off"
              autoComplete="off"
              className="flex-1 w-full p-4 bg-transparent text-prayxis-offwhite font-mono text-xs leading-relaxed outline-none resize-none placeholder-gray-600 focus:ring-0 selection:bg-prayxis-accent/30"
              placeholder="# Write your Python 3 code here..."
              rows={Math.max(lineCount, 12)}
            />
          </div>

          {/* Right Column: Interactive Terminal Window */}
          <div className="lg:col-span-5 bg-[#050608] flex flex-col justify-between">
            <div className="p-4 space-y-2 overflow-y-auto max-h-[380px]">
              <div className="text-[10px] text-prayxis-subtle border-b border-white/10 pb-2 flex items-center justify-between">
                <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  TERMINAL CONSOLE (STDOUT / STDERR)
                </span>
                {executionTime && (
                  <span className="text-[9px] text-prayxis-subtle">
                    ⏱ {executionTime}s
                  </span>
                )}
              </div>

              {/* Terminal Prompt */}
              <div className="text-prayxis-muted text-[11px] font-mono">
                <span className="text-emerald-400 font-bold">prayxis@python-lab</span>
                <span className="text-white">:</span>
                <span className="text-prayxis-accent font-bold">~/python-day-01</span>
                <span className="text-white">$ python main.py</span>
              </div>

              {/* Output stream */}
              {output.length > 0 && (
                <div className="space-y-1 pt-1">
                  {output.map((line, idx) => (
                    <div
                      key={idx}
                      className="text-prayxis-offwhite text-xs font-mono whitespace-pre-wrap leading-relaxed"
                    >
                      {line}
                    </div>
                  ))}
                </div>
              )}

              {/* Error stream */}
              {errors.length > 0 && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded text-red-400 text-xs font-mono whitespace-pre-wrap leading-relaxed">
                  {errors.map((err, idx) => (
                    <div key={idx}>{err}</div>
                  ))}
                </div>
              )}

              {/* Empty state before running */}
              {!hasExecuted && (
                <div className="py-8 text-center text-prayxis-subtle text-[11px] space-y-1">
                  <div>Click &quot;RUN CODE&quot; or press Ctrl+Enter to execute.</div>
                  <div className="text-[10px] text-prayxis-muted">Python 3.12 interpreter simulator ready.</div>
                </div>
              )}
            </div>

            {/* Terminal Status Bar */}
            <div className="px-4 py-2 bg-[#090b0e] border-t border-white/10 flex items-center justify-between text-[10px] text-prayxis-subtle">
              <span className="text-prayxis-muted">Encoding: UTF-8</span>
              <span className={errors.length > 0 ? 'text-red-400' : 'text-emerald-400'}>
                {errors.length > 0 ? 'STATUS: ERROR' : hasExecuted ? 'STATUS: SUCCESS (0)' : 'STATUS: IDLE'}
              </span>
            </div>
          </div>

        </div>

      </div>

      {/* VERIFICATION CHECKLIST (If enabled for Final Task) */}
      {showVerification && (
        <div className="p-6 bg-prayxis-surface/90 border border-prayxis-accent/40 rounded-2xl backdrop-blur-md space-y-5 cyan-glow-subtle">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-prayxis-accent/10 border border-prayxis-accent/40 rounded-full font-mono text-[10px] text-prayxis-accent tracking-wider uppercase font-bold">
                <Sparkles className="h-3.5 w-3.5" />
                <span>TASK EVALUATOR</span>
              </div>
              <h3 className="font-mono text-lg font-extrabold text-prayxis-offwhite uppercase">
                {verificationTitle}
              </h3>
            </div>

            <div className="font-mono text-xs">
              <span className="text-prayxis-subtle">PASSED: </span>
              <span className="text-prayxis-accent font-bold">
                {checks.filter((c) => c.passed).length} / {checks.length}
              </span>
            </div>
          </div>

          {/* Checklist items */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {checks.map((chk) => (
              <div
                key={chk.id}
                className={`p-3 rounded-xl border transition-all flex items-start gap-2.5 ${
                  chk.passed
                    ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                    : 'bg-white/5 border-white/10 text-prayxis-muted'
                }`}
              >
                {chk.passed ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="h-4 w-4 text-prayxis-subtle shrink-0 mt-0.5" />
                )}
                <div className="space-y-0.5">
                  <div className={`text-xs font-bold ${chk.passed ? 'text-emerald-300' : 'text-prayxis-offwhite'}`}>
                    {chk.label}
                  </div>
                  <div className="text-[10px] text-prayxis-subtle leading-normal">
                    {chk.hint}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Action to Verify & Complete */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-[11px] text-prayxis-subtle">
              {!allPassed ? (
                <span>⚠️ Run your code above to verify all 9 requirements.</span>
              ) : (
                <span className="text-emerald-400 font-bold">
                  ✓ All 9 verification requirements passed successfully!
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={() => runPythonCode(code)}
              className={`w-full sm:w-auto px-6 py-3 font-mono text-xs font-extrabold uppercase tracking-wider rounded transition-all flex items-center justify-center gap-2 cursor-pointer ${
                allPassed
                  ? 'bg-emerald-500 hover:bg-white text-black shadow-lg'
                  : 'bg-prayxis-accent hover:bg-white text-black cyan-glow'
              }`}
            >
              {allPassed ? (
                <>
                  <CheckCircle className="h-4 w-4 fill-black text-emerald-500" />
                  <span>MISSION COMPLETED & VERIFIED ✓</span>
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 fill-black" />
                  <span>VERIFY MY CODE REQUIREMENTS →</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
