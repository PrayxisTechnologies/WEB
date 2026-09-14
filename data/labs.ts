export interface CyberLabItem {
  id: string;
  code: string;
  title: string;
  category: 'WEB' | 'API' | 'AUTH' | 'CLOUD' | 'MOBILE';
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'RESEARCH';
  summary: string;
  environment: string;
  status: string;
}

export const CYBER_LABS_DATA: CyberLabItem[] = [
  {
    id: 'lab-01',
    code: 'LAB-01',
    title: 'OAuth 2.0 State Parameter Bypass & CSRF Mitigation',
    category: 'AUTH',
    difficulty: 'INTERMEDIATE',
    summary: 'Analyzing authentication state validation failures in OAuth 2.0 implementations and building cryptographic state parameter verification middleware.',
    environment: 'EDUCATIONAL LAB',
    status: 'COMPLETED RESEARCH',
  },
  {
    id: 'lab-02',
    code: 'LAB-02',
    title: 'GraphQL Introspection & Rate-Limiting Vulnerability Analysis',
    category: 'API',
    difficulty: 'ADVANCED',
    summary: 'Demonstrating query depth complexity attacks on GraphQL APIs and building cost-analysis rate-limiting defense layers.',
    environment: 'SANDBOX SIMULATION',
    status: 'WRITEUP PUBLISHED',
  },
  {
    id: 'lab-03',
    code: 'LAB-03',
    title: 'JWT Secret Cracking & Alg-None Verification Vulnerabilities',
    category: 'AUTH',
    difficulty: 'BEGINNER',
    summary: 'Investigating JSON Web Token signature verification oversights and enforcing strict asymmetric key verification algorithms.',
    environment: 'AUTHORIZED CTF LAB',
    status: 'CODE LAB ACTIVE',
  },
  {
    id: 'lab-04',
    code: 'LAB-04',
    title: 'Cloud Storage Bucket Misconfiguration & IAM Policy Audit',
    category: 'CLOUD',
    difficulty: 'INTERMEDIATE',
    summary: 'Automated scanning for over-privileged IAM roles and unauthenticated read/write cloud object storage buckets.',
    environment: 'SYNTHETIC ENVIRONMENT',
    status: 'TOOL PROTOTYPE',
  },
  {
    id: 'lab-05',
    code: 'LAB-05',
    title: 'SQL Injection via Blind Time-Based Exfiltration',
    category: 'WEB',
    difficulty: 'ADVANCED',
    summary: 'Defensive investigation of time-delay SQL payload exfiltration and enforcing prepared parameterization across database layers.',
    environment: 'LOCAL BENCHMARK',
    status: 'DEFENSIVE SPEC',
  },
  {
    id: 'lab-06',
    code: 'LAB-06',
    title: 'Android KeyStore Cryptographic Hardware Attestation',
    category: 'MOBILE',
    difficulty: 'RESEARCH',
    summary: 'Testing hardware-backed key storage attestation mechanisms in mobile operating systems to protect sensitive local secrets.',
    environment: 'RESEARCH BENCH',
    status: 'EXPERIMENTAL POC',
  },
];
