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
    id: 'full-stack-web',
    code: 'PROG-01',
    title: 'Full Stack Web Development',
    category: 'DEVELOPMENT',
    duration: '45 DAYS',
    hours: '120 HOURS',
    level: 'BEGINNER → FULL STACK',
    status: 'PROGRAM IN DEVELOPMENT',
    isFeatured: true,
    description: 'Build your understanding from the first HTML tag to complete production-ready full-stack applications with React, Node.js, Express, databases, and secure API infrastructure.',
    technologies: ['HTML', 'CSS', 'JAVASCRIPT', 'REACT', 'NODE.JS', 'EXPRESS', 'DATABASE', 'APIs'],
    originalPrice: 999,
    discountPrice: 99,
    offerTag: 'GANESH CHATURTHI OFFER',
    enrollUrl: '/courses/full-stack',
    specs: {
      days: '45 DAYS',
      totalHours: '120 HOURS',
      dailyActiveTime: '2H 40M',
      format: 'PRACTICAL / PROJECT BASED',
    },
  },
  {
    id: 'basic-ethical-hacking',
    code: 'PROG-02',
    title: 'Basic Ethical Hacking',
    category: 'CYBERSECURITY',
    duration: '30 DAYS',
    hours: '80 HOURS',
    level: 'BEGINNER → INTERMEDIATE',
    status: 'ACTIVE PROGRAM',
    isFeatured: false,
    description: 'Learn core ethical hacking fundamentals, network scanning, vulnerability assessment, web application security testing, and defensive security engineering.',
    technologies: ['ETHICAL HACKING', 'NMAP / WIRESHARK', 'WEB VULNERABILITIES', 'NETWORK DEFENSE', 'LINUX SECURITY'],
    originalPrice: 999,
    discountPrice: 99,
    offerTag: 'GANESH CHATURTHI OFFER',
    enrollUrl: '/student/profile',
  },
  {
    id: 'python-basics',
    code: 'PROG-03',
    title: 'Python Basics',
    category: 'DEVELOPMENT',
    duration: '30 DAYS',
    hours: '80 HOURS',
    level: 'BEGINNER',
    status: 'ACTIVE PROGRAM',
    isFeatured: false,
    description: 'Master Python programming from the ground up: syntax, data structures, functions, OOP concepts, file handling, and practical automation scripts.',
    technologies: ['PYTHON 3', 'DATA STRUCTURES', 'OOP CONCEPTS', 'FILE HANDLING', 'AUTOMATION SCRIPTS'],
    originalPrice: 999,
    discountPrice: 99,
    offerTag: 'GANESH CHATURTHI OFFER',
    enrollUrl: '/student/profile',
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
