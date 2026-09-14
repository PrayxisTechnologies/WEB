'use client';

import React, { useState } from 'react';
import { ShieldCheck, Lock, Terminal, Activity, CheckCircle2 } from 'lucide-react';

interface CategoryDetails {
  flowTitle: string;
  topology: { label: string; sub: string; highlight?: boolean }[];
  tests: { test: string; status: string; color: string }[];
  metrics: { requests: string; blocked: string; anomalies: string; status: string };
  terminalLogs: string[];
  capabilities: string[];
}

const CATEGORY_DATA: Record<string, CategoryDetails> = {
  'APPLICATION SECURITY': {
    flowTitle: 'SECURITY FLOW SIMULATION: INTERNET → EDGE → API → APP → DATABASE',
    topology: [
      { label: 'ENTRY', sub: 'INTERNET' },
      { label: 'PERIMETER', sub: 'EDGE WAF', highlight: true },
      { label: 'ROUTING', sub: 'API GATEWAY' },
      { label: 'COMPUTE', sub: 'APP CORE' },
      { label: 'STORAGE', sub: 'DATABASE', highlight: true },
    ],
    tests: [
      { test: 'SQL INJECTION (PREPARED STATEMENTS)', status: 'DETECTED', color: 'text-prayxis-accent' },
      { test: 'CROSS-SITE SCRIPTING (XSS SANITIZATION)', status: 'BLOCKED', color: 'text-prayxis-accent' },
      { test: 'INDIRECT OBJECT REFERENCE (IDOR AUTH)', status: 'REVIEWED', color: 'text-prayxis-offwhite' },
      { test: 'AUTHENTICATION BYPASS (JWT VALIDATION)', status: 'MITIGATED', color: 'text-prayxis-accent' },
    ],
    metrics: { requests: '1,284', blocked: '97', anomalies: '03', status: 'STABLE' },
    terminalLogs: [
      '> initializing application security scanner...',
      '> analyzing AST code syntax trees...',
      '> validating session cookie security flags...',
      '> verifying input sanitization layers...',
      '> analysis complete: 0 critical vulnerabilities found.',
    ],
    capabilities: [
      'Continuous SAST / DAST Code Analysis',
      'Zero-Trust API & Identity Enforcement',
      'AES-256 Data-at-Rest & TLS 1.3 Data-in-Transit',
    ],
  },
  'API SECURITY': {
    flowTitle: 'API SECURITY SIMULATION: CLIENT → RATE LIMITER → OAUTH GATEWAY → REST / gRPC',
    topology: [
      { label: 'CLIENT', sub: 'HTTP / gRPC' },
      { label: 'SHIELD', sub: 'RATE LIMITER', highlight: true },
      { label: 'AUTH', sub: 'OAUTH2 OIDC', highlight: true },
      { label: 'ROUTER', sub: 'API MESH' },
      { label: 'SERVICE', sub: 'MICROSERVICE' },
    ],
    tests: [
      { test: 'GRAPHQL QUERY DEPTH COMPLEXITY ATTACK', status: 'BLOCKED', color: 'text-prayxis-accent' },
      { test: 'API RATE LIMIT EXCEEDED (TOKEN BUCKET)', status: 'THROTTLED', color: 'text-prayxis-accent' },
      { test: 'BOKEN OBJECT LEVEL AUTHENTICATION (BOLA)', status: 'PREVENTED', color: 'text-prayxis-accent' },
      { test: 'UNAUTHORIZED API PARAMETER POLLUTION', status: 'MITIGATED', color: 'text-prayxis-offwhite' },
    ],
    metrics: { requests: '14,820', blocked: '312', anomalies: '08', status: 'PROTECTED' },
    terminalLogs: [
      '> loading API Gateway security policies...',
      '> validating OAuth 2.0 / OIDC JWT signatures...',
      '> enforcing token bucket rate limiting...',
      '> inspecting GraphQL schema introspection...',
      '> API security audit complete: all endpoints secured.',
    ],
    capabilities: [
      'Strict API Contract & Schema Validation',
      'Token Bucket Rate Limiting & DDoS Mitigation',
      'OAuth 2.0 / OpenID Connect Token Verification',
    ],
  },
  'WEB SECURITY': {
    flowTitle: 'WEB SECURITY SIMULATION: BROWSER → CDN WAF → TLS TERMINATION → SSR APP',
    topology: [
      { label: 'BROWSER', sub: 'TLS 1.3' },
      { label: 'EDGE', sub: 'GLOBAL CDN', highlight: true },
      { label: 'HEADERS', sub: 'CSP & HSTS', highlight: true },
      { label: 'SERVER', sub: 'NEXT.JS SSR' },
      { label: 'CACHE', sub: 'REDIS EDGE' },
    ],
    tests: [
      { test: 'DOM-BASED CROSS-SITE SCRIPTING (XSS)', status: 'BLOCKED', color: 'text-prayxis-accent' },
      { test: 'CROSS-SITE REQUEST FORGERY (CSRF TOKEN)', status: 'VERIFIED', color: 'text-prayxis-accent' },
      { test: 'CONTENT SECURITY POLICY (CSP INLINE EXECT)', status: 'ENFORCED', color: 'text-prayxis-accent' },
      { test: 'HTTP STRICT TRANSPORT SECURITY (HSTS)', status: 'ACTIVE', color: 'text-prayxis-offwhite' },
    ],
    metrics: { requests: '48,200', blocked: '1,042', anomalies: '12', status: 'OPTIMAL' },
    terminalLogs: [
      '> inspecting Web Security headers...',
      '> verifying HSTS & Content Security Policy (CSP)...',
      '> auditing DOM XSS sanitization boundaries...',
      '> checking SameSite cookie attribute flags...',
      '> web security check complete: clean headers verified.',
    ],
    capabilities: [
      'Automated CSP & HSTS Header Enforcement',
      'SameSite Cookie & CSRF Token Protection',
      'Server-Side Rendering Input Sanitization',
    ],
  },
  'CLOUD SECURITY': {
    flowTitle: 'CLOUD SECURITY SIMULATION: USER → IAM ROLE → KUBERNETES MESH → CLOUD BUCKET',
    topology: [
      { label: 'IDENTITY', sub: 'IAM ROLE' },
      { label: 'NETWORK', sub: 'VPC PEERING', highlight: true },
      { label: 'CONTAINER', sub: 'KUBERNETES' },
      { label: 'SECRETS', sub: 'VAULT MESH', highlight: true },
      { label: 'STORAGE', sub: 'CLOUD BUCKET' },
    ],
    tests: [
      { test: 'UNAUTHENTICATED CLOUD BUCKET READ', status: 'DENIED', color: 'text-prayxis-accent' },
      { test: 'OVER-PRIVILEGED IAM ROLE AUDIT', status: 'RESTRICTED', color: 'text-prayxis-accent' },
      { test: 'CONTAINER PRIVILEGE ESCALATION', status: 'BLOCKED', color: 'text-prayxis-accent' },
      { test: 'HARDCODED CLOUD SECRET IN AST CODE', status: 'ZERO DETECTED', color: 'text-prayxis-offwhite' },
    ],
    metrics: { requests: '8,410', blocked: '140', anomalies: '01', status: 'COMPLIANT' },
    terminalLogs: [
      '> connecting to cloud infrastructure auditing service...',
      '> scanning S3 / Object Storage bucket permissions...',
      '> auditing least-privilege IAM policy roles...',
      '> scanning Kubernetes pod security contexts...',
      '> cloud audit complete: zero over-privileged roles.',
    ],
    capabilities: [
      'Least-Privilege IAM & Role Policy Auditing',
      'HashiCorp Vault Encrypted Secret Injection',
      'Kubernetes Micro-Segmentation & Container Security',
    ],
  },
  'SECURITY ENGINEERING': {
    flowTitle: 'DEFENSIVE SYSTEM ENGINEERING: CODE REPO → SAST PIPELINE → DAST SCANS → PROD DEPLOY',
    topology: [
      { label: 'CODE', sub: 'GIT REPO' },
      { label: 'STATIC', sub: 'SAST PIPELINE', highlight: true },
      { label: 'DYNAMIC', sub: 'DAST SCANS', highlight: true },
      { label: 'BUILD', sub: 'DOCKER CI' },
      { label: 'PROD', sub: 'ZERO TRUST' },
    ],
    tests: [
      { test: 'DEPENDENCY VULNERABILITY SCAN (CVE AUDIT)', status: 'PASS', color: 'text-prayxis-accent' },
      { test: 'AUTOMATED SECRET SCANNING IN COMMITS', status: 'PASSED', color: 'text-prayxis-accent' },
      { test: 'DOCKER CONTAINER IMAGE VULNERABILITIES', status: 'CLEAN', color: 'text-prayxis-accent' },
      { test: 'ZERO-TRUST ARCHITECTURE AUDIT', status: 'VERIFIED', color: 'text-prayxis-offwhite' },
    ],
    metrics: { requests: '520', blocked: '45', anomalies: '00', status: 'SECURE' },
    terminalLogs: [
      '> running security engineering CI/CD pipeline...',
      '> executing static AST vulnerability scanner...',
      '> checking npm / PyPI dependency vulnerability trees...',
      '> verifying Docker container layer signatures...',
      '> pipeline complete: zero vulnerabilities in build.',
    ],
    capabilities: [
      'Automated SAST / DAST In-Pipeline Scanning',
      'Dependency AST Vulnerability Tree Checks',
      'Zero-Trust Container Image Signatures',
    ],
  },
  'SECURITY RESEARCH': {
    flowTitle: 'PRAYXIS RESEARCH LAB: ZERO-DAY SANDBOX → PROTOCOL ANALYSIS → PROOF OF CONCEPT',
    topology: [
      { label: 'LAB', sub: 'SANDBOX' },
      { label: 'ISOLATION', sub: 'AIR-GAPPED', highlight: true },
      { label: 'PROTOCOL', sub: 'CRYPTO SPEC', highlight: true },
      { label: 'ANALYSIS', sub: 'FUZZING' },
      { label: 'RESULT', sub: 'WHITE PAPER' },
    ],
    tests: [
      { test: 'OAUTH 2.0 STATE CSRF PARAMETER BYPASS', status: 'RESEARCHED', color: 'text-prayxis-accent' },
      { test: 'JWT NONE-ALGORITHM SIGNATURE VERIFICATION', status: 'DOCUMETED', color: 'text-prayxis-accent' },
      { test: 'HARDWARE KEYSTORE ATTESTATION PROTOCOL', status: 'ANALYZED', color: 'text-prayxis-accent' },
      { test: 'TIME-BASED BLIND SQL EXFILTRATION FUZZING', status: 'BENCHMARKED', color: 'text-prayxis-offwhite' },
    ],
    metrics: { requests: '3,200', blocked: '640', anomalies: '15', status: 'RESEARCH' },
    terminalLogs: [
      '> initializing air-gapped security research bench...',
      '> fuzzing cryptographic protocol signatures...',
      '> testing OAuth state parameter entropy...',
      '> compiling vulnerability mitigation whitepaper...',
      '> research lab session complete.',
    ],
    capabilities: [
      'Cryptographic Protocol & Key Exchange Research',
      'Air-Gapped Sandbox Vulnerability Fuzzing',
      'Technical Vulnerability Writeups & Disclosures',
    ],
  },
  'CYBER TRAINING': {
    flowTitle: 'PRAYXIS ACADEMY TRAINING: DEVELOPER LAB → SECURE CODING → CTF CHALLENGE → ASSESSMENT',
    topology: [
      { label: 'ACADEMY', sub: 'PRAYXIS HUB' },
      { label: 'STUDENT', sub: 'DEV LAB', highlight: true },
      { label: 'PRACTICE', sub: 'CTF LAB', highlight: true },
      { label: 'DEFENSE', sub: 'SECURE CODE' },
      { label: 'RESULT', sub: 'VERIFIED' },
    ],
    tests: [
      { test: 'SECURE INPUT SANITIZATION WORKSHOP', status: 'COMPLETED', color: 'text-prayxis-accent' },
      { test: 'JWT AUTHENTICATION LAB CHALLENGE', status: 'PASSED', color: 'text-prayxis-accent' },
      { test: 'SQL INJECTION PREPARED STATEMENTS CTF', status: 'SOLVED', color: 'text-prayxis-accent' },
      { test: 'API SECURITY AUDITING PRACTICAL LAB', status: 'CERTIFIED', color: 'text-prayxis-offwhite' },
    ],
    metrics: { requests: '1,450', blocked: '210', anomalies: '02', status: 'ACTIVE LAB' },
    terminalLogs: [
      '> initializing PRAYXIS Academy practical lab...',
      '> loading CTF challenge environment...',
      '> evaluating secure code remediation submissions...',
      '> verifying student exploit mitigation proofs...',
      '> training lab module verified: 100% complete.',
    ],
    capabilities: [
      'Hands-On Secure Coding & Remediation Labs',
      'Practical Web & API Cyber CTF Challenges',
      'Engineering Team Cyber Training Workshops',
    ],
  },
};

const CATEGORIES = Object.keys(CATEGORY_DATA);

export const CyberSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);

  const activeData = CATEGORY_DATA[activeCategory] || CATEGORY_DATA[CATEGORIES[0]];

  return (
    <section
      id="cyber"
      aria-label="Cybersecurity Operations Showcase"
      className="relative w-full py-28 px-6 sm:px-12 lg:px-20 bg-prayxis-bg border-b border-white/10 overflow-hidden"
    >
      {/* Background Ambient Mesh */}
      <div className="absolute inset-0 bg-tech-grid opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 space-y-4 max-w-4xl">
          <div className="label-eyebrow text-prayxis-accent">
            04 // CYBERSECURITY & DEFENSE RESEARCH
          </div>
          <h2 className="heading-section font-extrabold text-prayxis-offwhite uppercase tracking-tight">
            SECURITY <br />
            <span className="text-prayxis-accent">IS BUILT IN.</span>
          </h2>
          <p className="body-large text-prayxis-muted font-normal max-w-xl pt-2">
            We research, test and engineer digital systems with security considered from the beginning, enforcing zero-trust micro-segmentation.
          </p>
        </div>

        {/* Category Filter Chips */}
        <div className="flex flex-wrap items-center gap-2 mb-12 select-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 font-mono text-xs tracking-wider uppercase transition-all border ${
                activeCategory === cat
                  ? 'border-prayxis-accent bg-prayxis-surface text-prayxis-accent cyan-glow-subtle font-bold scale-105'
                  : 'border-white/10 bg-prayxis-surface/40 text-prayxis-muted hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Major Security Operations Simulation Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Interactive Security Operations Visual (7 Cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 bg-prayxis-surface/90 border border-prayxis-accent/40 rounded-2xl backdrop-blur-md flex flex-col justify-between overflow-hidden cyan-glow-subtle transition-all duration-300">
            
            {/* Panel Top Header */}
            <div className="flex items-center justify-between font-mono text-[10px] text-prayxis-muted pb-4 border-b border-white/10">
              <div className="flex items-center gap-2 text-prayxis-accent">
                <ShieldCheck className="h-4 w-4" />
                <span className="font-bold">PRAYXIS SECURITY LAB // {activeCategory}</span>
              </div>
              <span className="text-prayxis-subtle">DEMO ENVIRONMENT</span>
            </div>

            {/* Simulated Architecture Flow Diagram */}
            <div className="my-8 space-y-6">
              <div className="font-mono text-xs text-prayxis-subtle tracking-wider uppercase">
                {activeData.flowTitle}
              </div>

              {/* Dynamic Topology Nodes Flow */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center font-mono text-[10px] w-full">
                {activeData.topology.map((top, idx) => (
                  <div
                    key={`${top.label}-${idx}`}
                    className={`p-3 bg-white/5 border rounded min-w-0 transition-all ${
                      top.highlight ? 'border-prayxis-accent/80 text-prayxis-accent' : 'border-white/10'
                    }`}
                  >
                    <div className="text-prayxis-muted text-[9px] truncate">{top.label}</div>
                    <div className="text-prayxis-offwhite font-bold mt-1 truncate">{top.sub}</div>
                  </div>
                ))}
              </div>

              {/* Dynamic Simulated Defensive Tests Results Table */}
              <div className="space-y-2 pt-2">
                <div className="font-mono text-[10px] text-prayxis-subtle uppercase">
                  ACTIVE DEFENSIVE AUDITS & VULNERABILITY MITIGATION:
                </div>

                {activeData.tests.map((st) => (
                  <div
                    key={st.test}
                    className="p-3 bg-black/50 border border-white/10 flex items-center justify-between font-mono text-xs rounded transition-all hover:border-prayxis-accent/40"
                  >
                    <span className="text-prayxis-offwhite">{st.test}</span>
                    <span className={`font-bold ${st.color}`}>[ {st.status} ]</span>
                  </div>
                ))}
              </div>

            </div>

            {/* Dynamic Demo Telemetry Bar */}
            <div className="pt-4 border-t border-white/10 grid grid-cols-4 gap-2 font-mono text-[10px] text-center">
              <div className="p-2 bg-white/5 border border-white/10 rounded">
                <div className="text-prayxis-subtle">REQUESTS</div>
                <div className="text-prayxis-offwhite font-bold mt-0.5">{activeData.metrics.requests}</div>
              </div>

              <div className="p-2 bg-white/5 border border-white/10 rounded">
                <div className="text-prayxis-subtle">BLOCKED</div>
                <div className="text-prayxis-accent font-bold mt-0.5">{activeData.metrics.blocked}</div>
              </div>

              <div className="p-2 bg-white/5 border border-white/10 rounded">
                <div className="text-prayxis-subtle">ANOMALIES</div>
                <div className="text-prayxis-offwhite font-bold mt-0.5">{activeData.metrics.anomalies}</div>
              </div>

              <div className="p-2 bg-white/5 border border-white/10 rounded">
                <div className="text-prayxis-subtle">STATUS</div>
                <div className="text-prayxis-accent font-bold mt-0.5">{activeData.metrics.status}</div>
              </div>
            </div>

          </div>

          {/* Right: Security Terminal & Research Notes (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* Dynamic Security Terminal Panel */}
            <div className="p-6 bg-[#050607] border border-white/10 rounded-2xl font-mono text-xs text-prayxis-muted space-y-3">
              <div className="flex items-center gap-2 text-prayxis-accent pb-3 border-b border-white/10">
                <Terminal className="h-4 w-4" />
                <span className="font-bold">SECURITY RESEARCH TERMINAL // {activeCategory}</span>
              </div>

              <div className="space-y-1.5 text-[11px] leading-relaxed">
                {activeData.terminalLogs.map((log, idx) => (
                  <p
                    key={idx}
                    className={
                      idx === 0
                        ? 'text-prayxis-accent font-bold'
                        : idx === activeData.terminalLogs.length - 1
                        ? 'text-prayxis-offwhite font-bold'
                        : 'text-prayxis-subtle'
                    }
                  >
                    {log}
                  </p>
                ))}
              </div>
            </div>

            {/* Dynamic Defense Capabilities Cards */}
            <div className="p-6 bg-prayxis-surface/60 border border-white/10 rounded-2xl space-y-4">
              <div className="font-mono text-xs font-bold text-prayxis-offwhite uppercase tracking-wider">
                {activeCategory} CAPABILITIES
              </div>

              <ul className="space-y-2.5 font-mono text-xs text-prayxis-muted">
                {activeData.capabilities.map((cap, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-prayxis-accent shrink-0" />
                    <span className="text-prayxis-offwhite">{cap}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
