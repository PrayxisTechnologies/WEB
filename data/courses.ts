export interface CourseProgram {
  id: string;
  code: string;
  title: string;
  category: 'DEVELOPMENT' | 'CYBERSECURITY' | 'AI';
  duration: string;
  hours: string;
  level: string;
  status: 'ACTIVE PROGRAM' | 'PROGRAM IN DEVELOPMENT' | 'COMING SOON';
  isFeatured?: boolean;
  description: string;
  technologies: string[];
  originalPrice?: number;
  discountPrice?: number;
  priceHidden?: boolean;
  offerTag?: string;
  enrollUrl?: string;
  specs?: {
    days: string;
    totalHours: string;
    dailyActiveTime: string;
    format: string;
  };
}

export interface CurriculumPhase {
  phaseNum: string;
  title: string;
  dayRange: string;
  daysCount: string;
  topics: string[];
}

export interface SkillCategory {
  num: string;
  title: string;
  skills: string[];
}

export interface PlannedProject {
  num: string;
  title: string;
  desc: string;
  tech: string;
}

export const COURSES_DATA: CourseProgram[] = [
  {
    id: 'full-stack-15',
    code: 'PROG-15-01',
    title: 'Full Stack Web Development (15 Days)',
    category: 'DEVELOPMENT',
    duration: '15 DAYS',
    hours: '40 HOURS',
    level: 'BEGINNER',
    status: 'ACTIVE PROGRAM',
    isFeatured: false,
    description: 'Build your foundation with HTML, CSS, JavaScript basics, React fundamentals and your first portfolio capstone project.',
    technologies: ['HTML5', 'CSS3', 'JAVASCRIPT', 'REACT', 'GIT'],
    originalPrice: 999,
    discountPrice: 99,
    offerTag: 'SPECIAL OFFER: ₹99',
    enrollUrl: '/student/profile',
    specs: {
      days: '15 DAYS',
      totalHours: '40 HOURS',
      dailyActiveTime: '2H 30M',
      format: 'PRACTICAL / PROJECT BASED',
    },
  },
  {
    id: 'ethical-hacking-15',
    code: 'PROG-15-02',
    title: 'Basic Ethical Hacking (15 Days)',
    category: 'CYBERSECURITY',
    duration: '15 DAYS',
    hours: '40 HOURS',
    level: 'BEGINNER',
    status: 'ACTIVE PROGRAM',
    isFeatured: false,
    description: 'Learn core cybersecurity principles, network scanning, vulnerability assessment tools, and basic pentesting.',
    technologies: ['NMAP', 'WIRESHARK', 'LINUX', 'WEB VULNERABILITIES'],
    originalPrice: 999,
    discountPrice: 99,
    offerTag: 'SPECIAL OFFER: ₹99',
    enrollUrl: '/student/profile',
    specs: {
      days: '15 DAYS',
      totalHours: '40 HOURS',
      dailyActiveTime: '2H 30M',
      format: 'HANDS-ON LABS',
    },
  },
  {
    id: 'python-basics-15',
    code: 'PROG-15-03',
    title: 'Python Basics: Zero Se (15 Days)',
    category: 'DEVELOPMENT',
    duration: '15 DAYS',
    hours: '40 HOURS',
    level: 'BEGINNER',
    status: 'ACTIVE PROGRAM',
    isFeatured: false,
    description: 'Master Python fundamentals from scratch including variables, logic, data structures, and automation scripts.',
    technologies: ['PYTHON 3', 'DATA STRUCTURES', 'OOP', 'SCRIPTS'],
    originalPrice: 999,
    discountPrice: 99,
    offerTag: 'SPECIAL OFFER: ₹99',
    enrollUrl: '/student/profile',
    specs: {
      days: '15 DAYS',
      totalHours: '40 HOURS',
      dailyActiveTime: '2H 30M',
      format: 'INTERACTIVE IDE',
    },
  },
  {
    id: 'ai-genai-15',
    code: 'PROG-15-04',
    title: 'AI & Generative AI (15 Days)',
    category: 'AI',
    duration: '15 DAYS',
    hours: '40 HOURS',
    level: 'BEGINNER',
    status: 'ACTIVE PROGRAM',
    isFeatured: false,
    description: 'Explore prompt engineering, LLM integration, OpenAI/Gemini APIs, and build intelligent AI chatbots.',
    technologies: ['PROMPT ENG', 'LLM APIS', 'PYTHON', 'GENAI TOOLS'],
    originalPrice: 999,
    discountPrice: 99,
    offerTag: 'SPECIAL OFFER: ₹99',
    enrollUrl: '/student/profile',
    specs: {
      days: '15 DAYS',
      totalHours: '40 HOURS',
      dailyActiveTime: '2H 30M',
      format: 'AI CAPSTONE',
    },
  },
  {
    id: 'full-stack-web',
    code: 'PROG-45-01',
    title: 'Full Stack Web Development (45 Days)',
    category: 'DEVELOPMENT',
    duration: '45 DAYS',
    hours: '120 HOURS',
    level: 'BEGINNER → FULL STACK',
    status: 'ACTIVE PROGRAM',
    isFeatured: true,
    description: 'Complete production-ready full-stack applications with React, Node.js, Express, MongoDB Atlas, and secure REST APIs.',
    technologies: ['HTML', 'CSS', 'JAVASCRIPT', 'REACT', 'NODE.JS', 'EXPRESS', 'MONGODB', 'APIs'],
    originalPrice: 1999,
    discountPrice: 199,
    offerTag: 'SPECIAL OFFER: ₹199',
    enrollUrl: '/courses/full-stack',
    specs: {
      days: '45 DAYS',
      totalHours: '120 HOURS',
      dailyActiveTime: '2H 40M',
      format: 'PRODUCTION CAPSTONE',
    },
  },
  {
    id: 'ethical-hacking-45',
    code: 'PROG-45-02',
    title: 'Ethical Hacking & Penetration Testing (45 Days)',
    category: 'CYBERSECURITY',
    duration: '45 DAYS',
    hours: '120 HOURS',
    level: 'INTERMEDIATE',
    status: 'ACTIVE PROGRAM',
    isFeatured: false,
    description: 'Advanced pentesting, SOC analysis workflows, bug bounty techniques, network security and CTF challenges.',
    technologies: ['BURP SUITE', 'NMAP', 'METASPLOIT', 'SOC LABS', 'LINUX DEFENSE'],
    originalPrice: 1999,
    discountPrice: 199,
    offerTag: 'SPECIAL OFFER: ₹199',
    enrollUrl: '/student/profile',
    specs: {
      days: '45 DAYS',
      totalHours: '120 HOURS',
      dailyActiveTime: '2H 40M',
      format: 'CYBER LAB CAPSTONE',
    },
  },
  {
    id: 'python-fullstack-45',
    code: 'PROG-45-03',
    title: 'Python Full Stack & FastAPI (45 Days)',
    category: 'DEVELOPMENT',
    duration: '45 DAYS',
    hours: '120 HOURS',
    level: 'INTERMEDIATE',
    status: 'ACTIVE PROGRAM',
    isFeatured: false,
    description: 'Build async high-performance backend microservices with FastAPI, SQLAlchemy, PostgreSQL, and React frontend.',
    technologies: ['PYTHON', 'FASTAPI', 'POSTGRESQL', 'DOCKER', 'REACT'],
    originalPrice: 1999,
    discountPrice: 199,
    offerTag: 'SPECIAL OFFER: ₹199',
    enrollUrl: '/student/profile',
    specs: {
      days: '45 DAYS',
      totalHours: '120 HOURS',
      dailyActiveTime: '2H 40M',
      format: 'MICROSERVICES CAPSTONE',
    },
  },
  {
    id: 'ai-deeplearning-45',
    code: 'PROG-45-04',
    title: 'AI & Deep Learning Master Track (45 Days)',
    category: 'AI',
    duration: '45 DAYS',
    hours: '120 HOURS',
    level: 'INTERMEDIATE',
    status: 'ACTIVE PROGRAM',
    isFeatured: false,
    description: 'Deep neural networks, PyTorch, RAG architectures, Vector databases, and production LLM application pipelines.',
    technologies: ['PYTORCH', 'NEURAL NETS', 'RAG', 'PINECONE', 'LLMS'],
    originalPrice: 1999,
    discountPrice: 199,
    offerTag: 'SPECIAL OFFER: ₹199',
    enrollUrl: '/student/profile',
    specs: {
      days: '45 DAYS',
      totalHours: '120 HOURS',
      dailyActiveTime: '2H 40M',
      format: 'DEEP LEARNING CAPSTONE',
    },
  },
  {
    id: 'enterprise-fullstack-3m',
    code: 'PROG-3M-01',
    title: 'Full Stack Enterprise Architecture (3 Months)',
    category: 'DEVELOPMENT',
    duration: '3 MONTHS',
    hours: '240 HOURS',
    level: 'ADVANCED (LIVE CLASSES)',
    status: 'ACTIVE PROGRAM',
    isFeatured: true,
    description: 'Enterprise microservices, Next.js 14, GraphQL, Redis caching, CI/CD pipelines, live mentor-led classes, and AWS cloud deployment.',
    technologies: ['LIVE CLASSES', 'NEXT.JS', 'MICROSERVICES', 'DOCKER', 'KUBERNETES', 'AWS', 'REDIS'],
    originalPrice: 14999,
    discountPrice: 5999,
    offerTag: 'LIVE CLASS SPECIAL: ₹5,999',
    enrollUrl: '/student/profile',
    specs: {
      days: '90 DAYS',
      totalHours: '240 HOURS',
      dailyActiveTime: '3H 00M',
      format: 'LIVE CLASSES & 1:1 MENTORSHIP',
    },
  },
  {
    id: 'cyber-soc-3m',
    code: 'PROG-3M-02',
    title: 'Advanced Cybersecurity & SOC Ops (3 Months)',
    category: 'CYBERSECURITY',
    duration: '3 MONTHS',
    hours: '240 HOURS',
    level: 'ADVANCED (LIVE CLASSES)',
    status: 'ACTIVE PROGRAM',
    isFeatured: false,
    description: 'Enterprise SOC monitoring, SIEM Splunk/ELK, Incident Response, Malware Analysis, Threat Hunting with live industry labs and mentor sessions.',
    technologies: ['LIVE CLASSES', 'SIEM / SPLUNK', 'ELK STACK', 'THREAT HUNTING', 'MALWARE ANALYSIS'],
    originalPrice: 14999,
    discountPrice: 5999,
    offerTag: 'LIVE CLASS SPECIAL: ₹5,999',
    enrollUrl: '/student/profile',
    specs: {
      days: '90 DAYS',
      totalHours: '240 HOURS',
      dailyActiveTime: '3H 00M',
      format: 'LIVE SOC LABS & MENTORSHIP',
    },
  },
  {
    id: 'ai-autonomous-3m',
    code: 'PROG-3M-03',
    title: 'AI & Autonomous LLM Agents (3 Months)',
    category: 'AI',
    duration: '3 MONTHS',
    hours: '240 HOURS',
    level: 'ADVANCED (LIVE CLASSES)',
    status: 'ACTIVE PROGRAM',
    isFeatured: false,
    description: 'Autonomous multi-agent systems, LangChain/LangGraph, AutoGen, fine-tuning LLMs, and custom AI workforce agents with live interactive guidance.',
    technologies: ['LIVE CLASSES', 'LANGCHAIN', 'LANGGRAPH', 'AUTOGEN', 'LLM FINE-TUNING'],
    originalPrice: 14999,
    discountPrice: 5999,
    offerTag: 'LIVE CLASS SPECIAL: ₹5,999',
    enrollUrl: '/student/profile',
    specs: {
      days: '90 DAYS',
      totalHours: '240 HOURS',
      dailyActiveTime: '3H 00M',
      format: 'LIVE AI LAB & MENTORSHIP',
    },
  },
  {
    id: 'executive-cloud-6m',
    code: 'PROG-6M-01',
    title: 'Executive Cloud & DevOps Architecture (6 Months)',
    category: 'DEVELOPMENT',
    duration: '6 MONTHS',
    hours: '480 HOURS',
    level: 'EXECUTIVE / LIVE SPECIALIZATION',
    status: 'ACTIVE PROGRAM',
    isFeatured: true,
    description: 'Comprehensive 6-month live industry mentorship & specialization in Cloud Native DevOps, Multi-Cloud Kubernetes, & Site Reliability Engineering.',
    technologies: ['LIVE CLASSES', 'MULTI-CLOUD', 'KUBERNETES', 'TERRAFORM', 'GITOPS', 'SRE'],
    originalPrice: 19999,
    discountPrice: 5999,
    offerTag: 'LIVE 6M SPECIAL: ₹5,999',
    enrollUrl: '/student/profile',
    specs: {
      days: '180 DAYS',
      totalHours: '480 HOURS',
      dailyActiveTime: '3H 30M',
      format: 'EXECUTIVE LIVE MENTORSHIP',
    },
  },
  {
    id: 'executive-ai-6m',
    code: 'PROG-6M-02',
    title: 'Executive LLMOps & AI Engineering (6 Months)',
    category: 'AI',
    duration: '6 MONTHS',
    hours: '480 HOURS',
    level: 'EXECUTIVE / LIVE SPECIALIZATION',
    status: 'ACTIVE PROGRAM',
    isFeatured: false,
    description: '6-month intensive live specialization in enterprise LLMOps, custom model distillation, distributed training, and AI security governance.',
    technologies: ['LIVE CLASSES', 'LLMOPS', 'DISTRIBUTED TRAINING', 'MODEL DISTILLATION', 'AI GOVERNANCE'],
    originalPrice: 19999,
    discountPrice: 5999,
    offerTag: 'LIVE 6M SPECIAL: ₹5,999',
    enrollUrl: '/student/profile',
    specs: {
      days: '180 DAYS',
      totalHours: '480 HOURS',
      dailyActiveTime: '3H 30M',
      format: 'LIVE RESEARCH & INDUSTRIAL LAB',
    },
  },
];

export const CURRICULUM_PHASES: CurriculumPhase[] = [
  {
    phaseNum: '01',
    title: 'HTML FUNDAMENTALS',
    dayRange: 'DAYS 01–05',
    daysCount: '5 DAYS',
    topics: ['Document Structure & Semantics', 'Elements & Attributes', 'Forms & User Inputs', 'SEO & Accessibility Basics'],
  },
  {
    phaseNum: '02',
    title: 'CSS ARCHITECTURE & LAYOUTS',
    dayRange: 'DAYS 06–14',
    daysCount: '9 DAYS',
    topics: ['Box Model & Reset', 'Flexbox & CSS Grid', 'Responsive Design & Media Queries', 'CSS Variables & Styling Systems'],
  },
  {
    phaseNum: '03',
    title: 'JAVASCRIPT CORE & LOGIC',
    dayRange: 'DAYS 15–23',
    daysCount: '9 DAYS',
    topics: ['Variables & Data Types', 'Control Flow & Functions', 'Arrays & Objects', 'Scope, Closures & ES6+ Features'],
  },
  {
    phaseNum: '04',
    title: 'DOM MANIPULATION & MODERN JS',
    dayRange: 'DAYS 24–29',
    daysCount: '6 DAYS',
    topics: ['DOM Selection & Events', 'Dynamic UI Rendering', 'Promises & Async/Await', 'Fetch API & External Data'],
  },
  {
    phaseNum: '05',
    title: 'GIT & DEVELOPER WORKFLOW',
    dayRange: 'DAYS 30–31',
    daysCount: '2 DAYS',
    topics: ['Version Control Fundamentals', 'Branching & Merging', 'GitHub Repositories', 'Developer CLI Utilities'],
  },
  {
    phaseNum: '06',
    title: 'REACT & COMPONENT SYSTEMS',
    dayRange: 'DAYS 32–38',
    daysCount: '7 DAYS',
    topics: ['JSX & Component Architecture', 'Props & State Management', 'React Hooks (useEffect, useRef)', 'Building Interactive Web Apps'],
  },
  {
    phaseNum: '07',
    title: 'NODE.JS & EXPRESS BACKEND',
    dayRange: 'DAYS 39–42',
    daysCount: '4 DAYS',
    topics: ['Node Environment Basics', 'Express Server Setup', 'RESTful API Routing', 'Middleware & Request Handling'],
  },
  {
    phaseNum: '08',
    title: 'DATABASE & AUTHENTICATION',
    dayRange: 'DAYS 43–44',
    daysCount: '2 DAYS',
    topics: ['Database Fundamentals', 'CRUD Operations', 'User Authentication Basics', 'Secure Session Security'],
  },
  {
    phaseNum: '09',
    title: 'FINAL CAPSTONE SYSTEM',
    dayRange: 'DAY 45',
    daysCount: '1 DAY',
    topics: ['Full Stack Integration', 'End-to-End System Deployment', 'Performance Optimization', 'Production Architecture Review'],
  },
];

export const FULL_STACK_SKILLS: SkillCategory[] = [
  {
    num: '01',
    title: 'HTML',
    skills: ['HTML Fundamentals', 'Document Structure', 'Text & Formatting', 'Links & Navigation', 'Images & Media', 'Tables & Data', 'Forms & Inputs', 'Semantic HTML5'],
  },
  {
    num: '02',
    title: 'CSS',
    skills: ['CSS Selectors', 'Typography & Styling', 'Box Model & Sizing', 'Positioning Engine', 'Flexbox Layouts', 'CSS Grid System', 'Responsive Media Queries', 'Animations & Transforms'],
  },
  {
    num: '03',
    title: 'JAVASCRIPT',
    skills: ['Variables (const/let)', 'Data Types & Operators', 'Control Flow & Logic', 'Loops & Iteration', 'Functions & Arrow Syntax', 'Arrays & Mutators', 'Objects & Prototypes', 'Modern ES6+ Syntax'],
  },
  {
    num: '04',
    title: 'DOM & APIs',
    skills: ['DOM Tree Traversal', 'Event Listeners & Delegation', 'Form Handling & Validation', 'Fetch API Requests', 'JSON Serialization', 'Asynchronous JS', 'Promises & Handlers', 'Async/Await Syntax'],
  },
  {
    num: '05',
    title: 'GIT & WORKFLOW',
    skills: ['Git CLI Operations', 'GitHub Repositories', 'Branching & Merging', 'Version Control History', 'Debugging & DevTools', 'Clean Code Standards'],
  },
  {
    num: '06',
    title: 'REACT',
    skills: ['JSX Syntax Engine', 'Component Architecture', 'Props & Data Flow', 'State & React Hooks', 'Form Handling', 'Custom Hooks', 'Client Routing', 'API Context Integration'],
  },
  {
    num: '07',
    title: 'NODE & EXPRESS',
    skills: ['Node.js Runtime', 'npm Package Manager', 'CommonJS & ES Modules', 'Express Server Engine', 'RESTful API Routing', 'Custom Middleware', 'Error Handling', 'JSON API Responses'],
  },
  {
    num: '08',
    title: 'DATABASE & AUTH',
    skills: ['Database Fundamentals', 'CRUD Operations', 'ORM / Driver Setup', 'Auth Concepts & Tokens', 'Protected Routes', 'JWT Session Management'],
  },
];

export const PLANNED_PROJECTS: PlannedProject[] = [
  {
    num: '01',
    title: 'HTML PERSONAL PORTFOLIO',
    desc: 'Clean, semantically structured developer portfolio webpage built using pure HTML5 tags.',
    tech: 'HTML5',
  },
  {
    num: '02',
    title: 'RESPONSIVE BUSINESS WEBSITE',
    desc: 'Fully responsive dark-theme marketing platform styled with Flexbox, CSS Grid and custom styling tokens.',
    tech: 'HTML5 / CSS3',
  },
  {
    num: '03',
    title: 'INTERACTIVE JAVASCRIPT APP',
    desc: 'Dynamic client-side application featuring live DOM manipulation, event handling and state updates.',
    tech: 'JAVASCRIPT / DOM API',
  },
  {
    num: '04',
    title: 'REACT ADMIN DASHBOARD',
    desc: 'Modern single-page admin dashboard built with reusable React component trees, custom hooks, and external API data.',
    tech: 'REACT / JSX / HOOKS',
  },
  {
    num: '05',
    title: 'FULL STACK CAPSTONE SYSTEM',
    desc: 'Production-ready full stack web platform integrating React frontend, Express API server, and database persistence.',
    tech: 'REACT / NODE / EXPRESS / DB',
  },
];

export const DAILY_BUILD_STEPS = [
  { step: '01', title: 'LEARN', desc: 'Understand the concept from first principles before coding.' },
  { step: '02', title: 'CODE', desc: 'Write the code yourself step-by-step from scratch.' },
  { step: '03', title: 'PRACTICE', desc: 'Solve guided hands-on coding exercises.' },
  { step: '04', title: 'TEST', desc: 'Answer checkup questions and concept verification.' },
  { step: '05', title: 'BUILD', desc: 'Complete a practical daily task or mini project component.' },
  { step: '06', title: 'REVIEW', desc: 'Debug mistakes, refactor code, and reinforce key concepts.' },
];
