export interface FounderProfile {
  id: string;
  name: string;
  role: string;
  title: string;
  bio: string;
  focus: string[];
  links?: { label: string; href: string }[];
}

export const FOUNDERS_DATA: FounderProfile[] = [
  {
    id: 'prashant-singh',
    name: 'Prashant Singh',
    role: 'CO-FOUNDER & CHIEF SYSTEMS ARCHITECT',
    title: 'Software Systems Architecture & Cloud Infrastructure',
    bio: 'Leads software engineering and architectural strategy at PRAYXIS. Specializes in building high-throughput web systems, resilient backend microservices, resilient databases, and scalable digital platforms.',
    focus: ['Full-Stack Systems', 'Cloud Infrastructure', 'API Architecture', 'Performance Optimization'],
  },
  {
    id: 'yashika-kanwer',
    name: 'Yashika Kanwer',
    role: 'CO-FOUNDER & HEAD OF CYBER RESEARCH',
    title: 'Cybersecurity Research & Application Security',
    bio: 'Leads cybersecurity research, vulnerability assessment, and defense engineering at PRAYXIS. Focuses on zero-trust security architecture, cryptographic protocol enforcement, and application security auditing.',
    focus: ['Application Security', 'Zero-Trust Architecture', 'Security Research', 'Vulnerability Analysis'],
  },
];
