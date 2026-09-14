export interface ExperimentItem {
  id: string;
  code: string;
  title: string;
  category: string;
  status: 'PROTOTYPE' | 'RESEARCH' | 'EXPERIMENTAL';
  description: string;
  tech: string[];
}

export const EXPERIMENTS_DATA: ExperimentItem[] = [
  {
    id: 'exp-01',
    code: 'EXP-01',
    title: 'AI Security Agent & Threat Classifier',
    category: 'AI / SECURITY',
    status: 'PROTOTYPE',
    description: 'An experimental autonomous agent trained to parse incoming HTTP request logs and classify zero-day anomaly signatures.',
    tech: ['Python', 'PyTorch', 'FastAPI', 'gRPC'],
  },
  {
    id: 'exp-02',
    code: 'EXP-02',
    title: '3D Vector Network Visualizer Engine',
    category: 'GRAPHICS / SVG',
    status: 'RESEARCH',
    description: 'A WebGL and SVG-assisted real-time graph rendering engine for visualizing complex microservices dependency topographies.',
    tech: ['TypeScript', 'SVG', 'GSAP', 'WebGL'],
  },
  {
    id: 'exp-03',
    code: 'EXP-03',
    title: 'Automated Dependency Vulnerability Scanner',
    category: 'DEV TOOL',
    status: 'EXPERIMENTAL',
    description: 'Lightweight static analysis tool for checking package dependency AST trees for known CVE vulnerability disclosures.',
    tech: ['Node.js', 'AST Parser', 'CLI'],
  },
];
