export interface ServiceCategory {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  capabilities: string[];
  stack?: string[];
}

export const SERVICES_DATA: ServiceCategory[] = [
  {
    id: 'software',
    title: 'Software Engineering',
    subtitle: 'High-throughput applications & cloud platforms',
    description: 'We design and engineer enterprise web applications, mobile platforms, microservices architectures, and robust API infrastructure built to perform at scale.',
    capabilities: ['Web Applications', 'Mobile Platforms', 'Backend Microservices', 'High-Throughput APIs', 'Database Architecture', 'Cloud Automation'],
    stack: ['React / Next.js', 'TypeScript', 'Node.js / Python', 'PostgreSQL', 'Docker / Cloud'],
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity & Defense',
    subtitle: 'Zero-trust architecture & threat mitigation',
    description: 'Security is engineered into our digital systems from day one. We conduct continuous vulnerability analysis, security testing, and zero-trust protocol enforcement.',
    capabilities: ['Application Security', 'API Security Auditing', 'Web Security Testing', 'Cloud Security Engineering', 'Zero-Trust Protocol Design', 'Security Research'],
    stack: ['Zero-Trust Mesh', 'OAuth 2.0 / OIDC', 'AES-256-GCM', 'TLS 1.3', 'SAST / DAST'],
  },
  {
    id: 'cloud',
    title: 'Cloud & Infrastructure',
    subtitle: 'Scalable deployment & automated DevOps pipelines',
    description: 'Modern infrastructure engineered for zero downtime, automated CI/CD deployment pipelines, container orchestration, and continuous system monitoring.',
    capabilities: ['Cloud Infrastructure', 'Container Orchestration', 'Automated CI/CD Pipelines', 'Edge Node Mesh', 'Infrastructure as Code', 'System Monitoring'],
    stack: ['Docker / Kubernetes', 'Cloud Infrastructure', 'Terraform', 'CI/CD Pipelines', 'Edge Network'],
  },
  {
    id: 'ai',
    title: 'AI & Intelligent Automation',
    subtitle: 'Automated workflows & intelligent data pipelines',
    description: 'Empowering software systems with intelligent automation, data processing pipelines, neural workflows, and automated threat classification.',
    capabilities: ['Intelligent Workflows', 'Automated Data Processing', 'System Integration', 'Threat Pattern Classification', 'Custom AI Pipelines'],
    stack: ['Python / PyTorch', 'Data Pipelines', 'REST / gRPC APIs', 'Edge Inference'],
  },
  {
    id: 'research',
    title: 'Technology Research',
    subtitle: 'Investigating emerging digital protocols & systems',
    description: 'We don’t just build software—we study it. Our research team investigates emerging web standards, cryptographic primitives, and high-performance algorithms.',
    capabilities: ['Cryptographic Analysis', 'Protocol Engineering', 'Open Source Tools', 'Security Vulnerability Writeups', 'System Performance Optimization'],
  },
  {
    id: 'academy',
    title: 'Cyber Training & Academy',
    subtitle: 'Empowering developers & engineering teams',
    description: 'PRAYXIS Academy conducts specialized hands-on cyber training, secure coding workshops, and practical software engineering labs for technical minds.',
    capabilities: ['Secure Coding Labs', 'Web Security Training', 'App Development Workshops', 'Practical CTF Challenges', 'Technical Mentorship'],
  },
];
