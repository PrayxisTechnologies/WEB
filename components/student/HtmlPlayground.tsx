'use client';

import React, { useState } from 'react';
import { Play, RotateCcw, CheckCircle2, AlertCircle, Eye, Code2, Maximize2, Minimize2, X } from 'lucide-react';

interface HtmlPlaygroundProps {
  initialCode?: string;
  onCodeChange?: (code: string) => void;
  onVerifySuccess?: () => void;
  showVerification?: boolean;
}

const HTML5_BOILERPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My Webpage</title>
</head>
<body>

  <h1>My First Heading</h1>
  <p>My first paragraph.</p>

</body>
</html>`;

interface PlaygroundWorkspaceProps {
  code: string;
  onCodeChange: (newCode: string) => void;
  handleReset: () => void;
  handleInsertBoilerplate: () => void;
  verifyCode: () => void;
  activeTab: 'editor' | 'preview' | 'split';
  setActiveTab: (tab: 'editor' | 'preview' | 'split') => void;
  setIsFullScreen: (val: boolean) => void;
  lineNumbers: number[];
  showVerification: boolean;
  verificationResult: {
    passed: boolean;
    checks: { name: string; desc: string; passed: boolean }[];
  } | null;
  inModal?: boolean;
}

const PlaygroundWorkspace: React.FC<PlaygroundWorkspaceProps> = ({
  code,
  onCodeChange,
  handleReset,
  handleInsertBoilerplate,
  verifyCode,
  activeTab,
  setActiveTab,
  setIsFullScreen,
  lineNumbers,
  showVerification,
  verificationResult,
  inModal = false,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Emmet ! shortcut: if user typed ! and pressed Enter or Tab
    if ((e.key === 'Enter' || e.key === 'Tab') && (code.trim() === '!' || code.trim() === '')) {
      e.preventDefault();
      onCodeChange(HTML5_BOILERPLATE);
    }
  };

  return (
    <div className={`w-full bg-[#050607] border ${inModal ? 'border-none h-full flex flex-col justify-between' : 'border-prayxis-accent/40 rounded-2xl'} overflow-hidden font-mono text-xs`}>
      
      {/* Header Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-prayxis-surface/90 border-b border-white/10 text-prayxis-muted text-[11px]">
        <div className="flex items-center gap-2 text-prayxis-accent font-bold uppercase">
          <Code2 className="h-4 w-4" />
          <span>PRAYXIS HTML LAB {inModal ? '// FULL SCREEN WORKSPACE' : '// SANDBOX'}</span>
        </div>

        {/* View & Template Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleInsertBoilerplate}
            className="px-2.5 py-1 bg-prayxis-accent/10 border border-prayxis-accent/40 text-prayxis-accent hover:bg-prayxis-accent hover:text-black rounded transition-colors text-[10px] font-bold flex items-center gap-1"
            title="Insert standard HTML5 document template (! + Enter)"
          >
            <span>⚡ ! TEMPLATE</span>
          </button>

          <div className="hidden sm:flex items-center gap-1 p-1 bg-black/40 border border-white/10 rounded">
            <button
              type="button"
              onClick={() => setActiveTab('editor')}
              className={`px-2.5 py-1 rounded transition-colors text-[10px] ${
                activeTab === 'editor' ? 'bg-prayxis-accent text-black font-bold' : 'hover:text-prayxis-offwhite'
              }`}
            >
              CODE
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('split')}
              className={`px-2.5 py-1 rounded transition-colors text-[10px] ${
                activeTab === 'split' ? 'bg-prayxis-accent text-black font-bold' : 'hover:text-prayxis-offwhite'
              }`}
            >
              SPLIT
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('preview')}
              className={`px-2.5 py-1 rounded transition-colors text-[10px] ${
                activeTab === 'preview' ? 'bg-prayxis-accent text-black font-bold' : 'hover:text-prayxis-offwhite'
              }`}
            >
              PREVIEW
            </button>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="px-2.5 py-1 bg-white/5 border border-white/10 hover:border-white/20 text-prayxis-muted hover:text-prayxis-offwhite rounded flex items-center gap-1.5 transition-colors text-[10px]"
            title="Reset code"
          >
            <RotateCcw className="h-3 w-3" />
            <span>RESET</span>
          </button>

          {!inModal ? (
            <button
              type="button"
              onClick={() => setIsFullScreen(true)}
              className="px-2.5 py-1 bg-prayxis-accent/10 border border-prayxis-accent/60 text-prayxis-accent rounded flex items-center gap-1.5 transition-colors text-[10px] font-bold"
              title="Open full screen"
            >
              <Maximize2 className="h-3 w-3" />
              <span className="hidden sm:inline">FULL SCREEN</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIsFullScreen(false)}
              className="px-2.5 py-1 bg-red-500/10 border border-red-500/60 text-red-400 rounded flex items-center gap-1.5 transition-colors text-[10px] font-bold"
            >
              <X className="h-3 w-3" />
              <span>EXIT</span>
            </button>
          )}
        </div>
      </div>

      {/* Editor & Preview Split Container */}
      <div className={`grid grid-cols-1 lg:grid-cols-12 ${inModal ? 'flex-1 overflow-hidden' : 'min-h-[380px]'}`}>
        
        {/* Left: Code Editor Area */}
        <div
          className={`relative flex bg-[#050607] border-r border-white/10 ${
            activeTab === 'preview' ? 'hidden' : activeTab === 'editor' ? 'col-span-12' : 'lg:col-span-6 col-span-12'
          }`}
        >
          {/* Line Numbers */}
          <div className="py-4 px-3 text-right bg-black/40 text-prayxis-subtle select-none border-r border-white/5 text-[11px] leading-relaxed">
            {lineNumbers.map((n) => (
              <div key={n}>{n}</div>
            ))}
          </div>

          {/* Textarea Code Input */}
          <textarea
            value={code}
            onChange={(e) => onCodeChange(e.target.value)}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            placeholder="Type code here or type ! and press Enter to generate full HTML template..."
            className="w-full h-full min-h-[360px] p-4 bg-transparent text-prayxis-offwhite font-mono text-xs leading-relaxed resize-none focus:outline-none selection:bg-prayxis-accent selection:text-black"
          />
        </div>

      {/* Right: Live Preview Iframe (Strict Security Sandbox) */}
      <div
        className={`flex flex-col bg-white ${
          activeTab === 'editor' ? 'hidden' : activeTab === 'preview' ? 'col-span-12' : 'lg:col-span-6 col-span-12'
        }`}
      >
        <div className="px-3 py-1.5 bg-gray-900 text-gray-400 border-b border-gray-800 flex items-center justify-between text-[10px] select-none">
          <span className="flex items-center gap-1.5 text-prayxis-accent font-bold">
            <Eye className="h-3.5 w-3.5" />
            LIVE ISOLATED BROWSER PREVIEW
          </span>
          <span>INDEX.HTML</span>
        </div>

        {/* Sandboxed iframe with allow-scripts ONLY (No same-origin, no top-navigation) */}
        <iframe
          title="HTML Live Output Preview"
          srcDoc={code}
          sandbox="allow-scripts"
          className="w-full h-full min-h-[320px] bg-white border-none"
        />
      </div>

    </div>

    {/* Footer Verification Action & Feedback Bar */}
    {showVerification && (
      <div className="p-4 bg-prayxis-surface/90 border-t border-white/10 flex flex-col space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <button
            type="button"
            onClick={verifyCode}
            className="px-6 py-3 bg-prayxis-accent text-black font-bold uppercase tracking-wider rounded hover:bg-white transition-colors flex items-center justify-center gap-2 cyan-glow text-xs"
          >
            <Play className="h-4 w-4 fill-black" />
            <span>RUN & VERIFY CODE →</span>
          </button>

          {verificationResult && (
            <div className="font-bold text-xs">
              {verificationResult.passed ? (
                <span className="text-prayxis-accent">✓ ALL REQUIREMENTS SATISFIED</span>
              ) : (
                <span className="text-amber-400">✕ ACTION REQUIRED ({verificationResult.checks.filter(c => !c.passed).length} MISSING)</span>
              )}
            </div>
          )}
        </div>

        {/* Detailed Verification Feedback Checklist */}
        {verificationResult && (
          <div className="p-4 bg-black/60 border border-white/10 rounded-xl space-y-3 font-mono text-[11px]">
            <div className="text-prayxis-accent font-bold uppercase text-[10px]">
              WHAT WE CHECKED:
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {verificationResult.checks.map((check) => (
                <div
                  key={check.name}
                  className={`p-2 rounded flex items-center justify-between border ${
                    check.passed
                      ? 'border-prayxis-accent/40 bg-prayxis-accent/10 text-prayxis-accent'
                      : 'border-red-500/40 bg-red-500/10 text-red-400'
                  }`}
                >
                  <span>{check.name}</span>
                  <span className="font-bold">{check.passed ? '✓ PASSED' : '✕ MISSING'}</span>
                </div>
              ))}
            </div>

            {!verificationResult.passed && (
              <div className="p-3 bg-amber-500/10 border border-amber-500/40 rounded text-amber-400 space-y-1 text-[10px]">
                <div className="font-bold">HOW TO FIX:</div>
                <div>Add the missing HTML tags listed above inside your index.html code and click RUN & VERIFY CODE again.</div>
              </div>
            )}
          </div>
        )}
      </div>
    )}

    </div>
  );
};

export const HtmlPlayground: React.FC<HtmlPlaygroundProps> = ({
  initialCode = `<!DOCTYPE html>
<html>
<head>
  <title>My Webpage</title>
</head>
<body>

  <!-- Write your HTML tags below -->

</body>
</html>`,
  onCodeChange,
  onVerifySuccess,
  showVerification = true,
}) => {
  const [code, setCode] = useState(initialCode);
  const [activeTab, setActiveTab] = useState<'editor' | 'preview' | 'split'>('split');
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [verificationResult, setVerificationResult] = useState<{
    passed: boolean;
    checks: { name: string; desc: string; passed: boolean }[];
  } | null>(null);

  // Line numbers calculation
  const lineCount = code.split('\n').length;
  const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    if (onCodeChange) onCodeChange(newCode);
  };

  const handleReset = () => {
    setCode(initialCode);
    setVerificationResult(null);
    if (onCodeChange) onCodeChange(initialCode);
  };

  const handleInsertBoilerplate = () => {
    setCode(HTML5_BOILERPLATE);
    if (onCodeChange) onCodeChange(HTML5_BOILERPLATE);
  };

  // Detailed Tag Verification Check
  const verifyCode = () => {
    const requiredChecks = [
      { name: '<!DOCTYPE html>', desc: 'Document type declaration', pattern: /<!DOCTYPE\s+html>/i },
      { name: '<html> container', desc: 'Root document container', pattern: /<html[\s>][\s\S]*?<\/html>/i },
      { name: '<head> & <title>', desc: 'Document metadata & tab title', pattern: /<head[\s>]((?!<\/head>).)*?<title>[\s\S]*?<\/title>[\s\S]*?<\/head>/i },
      { name: '<body> container', desc: 'Visible page content container', pattern: /<body[\s>][\s\S]*?<\/body>/i },
      { name: '<h1> heading', desc: 'Primary page heading title', pattern: /<h1>[\s\S]*?<\/h1>/i },
      { name: '<h2> heading', desc: 'Secondary section subheading', pattern: /<h2>[\s\S]*?<\/h2>/i },
      { name: '<p> paragraph', desc: 'Body text paragraph element', pattern: /<p>[\s\S]*?<\/p>/i },
      { name: '<br> line break', desc: 'Single line break tag', pattern: /<br\s*\/?>/i },
      { name: '<!-- comment -->', desc: 'HTML developer comment', pattern: /<!--[\s\S]*?-->/ },
    ];

    const checks = requiredChecks.map((req) => ({
      name: req.name,
      desc: req.desc,
      passed: req.pattern.test(code),
    }));

    const passed = checks.every((c) => c.passed);
    setVerificationResult({ passed, checks });

    if (passed && onVerifySuccess) {
      onVerifySuccess();
    }
  };

  return (
    <>
      <PlaygroundWorkspace
        code={code}
        onCodeChange={handleCodeChange}
        handleReset={handleReset}
        handleInsertBoilerplate={handleInsertBoilerplate}
        verifyCode={verifyCode}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setIsFullScreen={setIsFullScreen}
        lineNumbers={lineNumbers}
        showVerification={showVerification}
        verificationResult={verificationResult}
        inModal={false}
      />

      {/* Full-Screen Workspace Modal */}
      {isFullScreen && (
        <div className="fixed inset-0 z-50 bg-[#050607] flex flex-col justify-between p-4 sm:p-6">
          <PlaygroundWorkspace
            code={code}
            onCodeChange={handleCodeChange}
            handleReset={handleReset}
            handleInsertBoilerplate={handleInsertBoilerplate}
            verifyCode={verifyCode}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            setIsFullScreen={setIsFullScreen}
            lineNumbers={lineNumbers}
            showVerification={showVerification}
            verificationResult={verificationResult}
            inModal={true}
          />
        </div>
      )}
    </>
  );
};
