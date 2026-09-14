export interface ResearchItem {
  id: string;
  title: string;
  category: 'CYBERSECURITY' | 'ENGINEERING' | 'AI' | 'WEB' | 'CLOUD' | 'RESEARCH';
  readTime: string;
  date: string;
  summary: string;
  author: string;
}

export const RESEARCH_DATA: ResearchItem[] = [
  {
    id: 'res-01',
    title: 'Zero-Trust Architecture Principles for Modern Cloud Infrastructure',
    category: 'CYBERSECURITY',
    readTime: '6 MIN READ',
    date: 'AUG 2026',
    summary: 'A deep dive into why perimeter defense is insufficient, and how micro-segmentation, identity-based authentication, and continuous verification form the core of zero-trust.',
    author: 'Yashika Kanwer',
  },
  {
    id: 'res-02',
    title: 'Building Resilient Microservices with Sub-10ms End-to-End Latency',
    category: 'ENGINEERING',
    readTime: '8 MIN READ',
    date: 'AUG 2026',
    summary: 'How gRPC, connection pooling, and optimistic caching strategies enable high-throughput web systems to process high-concurrency requests safely.',
    author: 'Prashant Singh',
  },
  {
    id: 'res-03',
    title: 'Automated Vulnerability Detection in Modern React & Next.js Applications',
    category: 'WEB',
    readTime: '5 MIN READ',
    date: 'JUL 2026',
    summary: 'Investigating Server Component data leakage vectors, XSS prevention in dangerouslySetInnerHTML, and automated SAST integration in CI/CD.',
    author: 'Yashika Kanwer',
  },
  {
    id: 'res-04',
    title: 'The Evolution of Cryptographic Hardware Attestation in Mobile Devices',
    category: 'RESEARCH',
    readTime: '7 MIN READ',
    date: 'JUL 2026',
    summary: 'Exploring how Secure Enclaves and Trusted Execution Environments (TEE) prevent secret extraction on compromised mobile hardware.',
    author: 'PRAYXIS Labs',
  },
  {
    id: 'res-05',
    title: 'Intelligent Automation Pipelines: Combining LLMs with Deterministic Code',
    category: 'AI',
    readTime: '9 MIN READ',
    date: 'JUN 2026',
    summary: 'Why non-deterministic AI models must be wrapped in deterministic verification boundaries to ensure enterprise system reliability.',
    author: 'Prashant Singh',
  },
];
