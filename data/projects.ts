export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  stack: {
    frontend?: string;
    backend?: string;
    database?: string;
    security?: string;
    infrastructure?: string;
  };
  metrics?: { label: string; value: string }[];
  status: string;
  isSelfBuilt: boolean;
}

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'project-01',
    number: 'PROJECT 01',
    title: 'PRAYXIS Quantum Security Lab',
    category: 'SECURITY RESEARCH / SANDBOX',
    description: 'An isolated cybersecurity research environment built for continuous vulnerability assessment, automated SAST/DAST scanning, and zero-trust protocol verification.',
    stack: {
      frontend: 'React / Next.js',
      backend: 'Node.js / Python',
      security: 'AES-256-GCM / OAuth2',
      infrastructure: 'Docker / Cloud',
    },
    metrics: [
      { label: 'STATUS', value: 'PROTOTYPE' },
      { label: 'ISOLATION', value: 'SANDBOX' },
      { label: 'ENCRYPTION', value: 'AES-256' },
    ],
    status: 'RESEARCH LAB',
    isSelfBuilt: true,
  },
  {
    id: 'project-02',
    number: 'PROJECT 02',
    title: 'High-Throughput Enterprise Platform',
    category: 'SOFTWARE ENGINEERING / WEB',
    description: 'A modular, resilient enterprise web platform featuring server-side rendering, sub-10px dynamic UI layouts, and automated cloud edge distribution.',
    stack: {
      frontend: 'Next.js 14 / TypeScript',
      backend: 'Node.js / gRPC',
      database: 'PostgreSQL / Redis',
      infrastructure: 'Cloud Mesh',
    },
    metrics: [
      { label: 'RENDER TIME', value: 'sub-20ms' },
      { label: 'TYPE SAFETY', value: '100% TS' },
      { label: 'ARCHITECTURE', value: 'MICROSERVICES' },
    ],
    status: 'SELF-BUILT PLATFORM',
    isSelfBuilt: true,
  },
  {
    id: 'project-03',
    number: 'PROJECT 03',
    title: 'Secure Mobile Infrastructure Suite',
    category: 'MOBILE PLATFORM / SECURITY',
    description: 'Cross-platform mobile application ecosystem featuring end-to-end encrypted messaging, biometric authentication, and zero-trust local storage.',
    stack: {
      frontend: 'React Native / TypeScript',
      backend: 'Python / FastAPI',
      security: 'ECC-256 / Secure Enclave',
      infrastructure: 'Cloud Edge',
    },
    metrics: [
      { label: 'PLATFORMS', value: 'iOS / Android' },
      { label: 'STORAGE', value: 'ENCRYPTED' },
      { label: 'AUTH', value: 'BIOMETRIC' },
    ],
    status: 'SELF-BUILT APPS',
    isSelfBuilt: true,
  },
  {
    id: 'project-04',
    number: 'PROJECT 04',
    title: 'Developer Security CLI & Utilities',
    category: 'OPEN SOURCE / DEV TOOLS',
    description: 'A lightweight developer command-line tool for automated dependency security checks, secret scanning, and automated API contract testing.',
    stack: {
      backend: 'TypeScript / Node.js',
      security: 'AST Analyzer / Regex Engine',
      infrastructure: 'npm Registry / CLI',
    },
    metrics: [
      { label: 'TYPE', value: 'CLI TOOL' },
      { label: 'LICENSE', value: 'OPEN SOURCE' },
      { label: 'AUDIT', value: 'PASS' },
    ],
    status: 'DEV TOOL',
    isSelfBuilt: true,
  },
];
