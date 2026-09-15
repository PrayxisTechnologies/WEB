import { VisualType } from '@/components/student/learning/LearningVisual';

export interface MicroPractice {
  prompt: string;
  starterCode: string;
  solutionHint?: string;
}

export interface LessonStep {
  id: number;
  title: string;
  concept: string;
  easyExplanation: string;
  realExample?: string;
  whereDoWeSeeIt?: string;
  why: string;
  visualType?: VisualType;
  syntax?: string;
  syntaxBreakdown?: string[];
  teacherExample?: string;
  secondExample?: string;
  whatYouShouldSee?: string;
  microPractice?: MicroPractice;
  commonMistakes?: string[];
  question?: {
    text: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const DAY_03_STEPS: LessonStep[] = [
  {
    id: 1,
    title: '01 — Day 03 Introduction',
    concept: 'HTML HEADINGS, PARAGRAPHS & LINE BREAKS',
    easyExplanation:
      'Welcome to Day 03 of Full Stack Web Development! In Day 01, you learned what a webpage is and wrote your first HTML tags. In Day 02, you learned how a proper HTML document is structured with DOCTYPE, html, head, and body tags. Today we work INSIDE the <body> section to learn how to organize text content using Headings, Paragraphs, and Line Breaks.',
    realExample:
      'Think of a news article or book chapter: it has a main title (Heading 1), sub-headings (Heading 2), text paragraphs, and occasional line breaks. Without headings and paragraphs, a webpage would be an unreadable wall of text!',
    whereDoWeSeeIt:
      'Inside the <body> section of every article, blog post, documentation page, and portfolio on the web.',
    why: 'Webpages must organize text content so both human visitors and web browsers can understand the logical structure of the page.',
    visualType: 'browser-flow',
    syntax: 'HTML DOCUMENT ──▶ <body> ──▶ CONTENT ──▶ HEADINGS (h1-h6) + PARAGRAPHS (p) + LINE BREAKS (br)',
    syntaxBreakdown: [
      'Headings: Create section titles and structural titles (<h1> to <h6>).',
      'Paragraphs: Wrap blocks of normal text (<p>).',
      'Line Breaks: Force a text break onto a new line (<br>).',
    ],
    teacherExample: `<!DOCTYPE html>
<html>
<head>
  <title>Day 03 — Text Foundations</title>
</head>
<body>

  <h1>Web Content Foundations</h1>
  <p>Today we organize text inside the body section.</p>

</body>
</html>`,
    whatYouShouldSee:
      'The browser renders the heading in a bold font size and the paragraph as standard text beneath it.',
    microPractice: {
      prompt: 'Verify where today\'s headings and paragraphs are written inside the document.',
      starterCode: `<!DOCTYPE html>
<html>
<head>
  <title>Text Foundations</title>
</head>
<body>

  <!-- Headings and paragraphs go inside body -->
  <h1>Welcome to Day 03</h1>
  <p>Learning headings, paragraphs, and line breaks.</p>

</body>
</html>`,
    },
    commonMistakes: [
      'Writing headings or paragraphs inside the <head> section instead of <body>.',
      'Placing text directly outside the <html> tag.',
    ],
    question: {
      text: 'Where will today\'s headings, paragraphs, and line breaks normally be written in an HTML document?',
      options: ['Inside <head>', 'Inside <title>', 'Inside <body>', 'Before <!DOCTYPE html>'],
      correctIndex: 2,
      explanation: 'All visible webpage content (headings, paragraphs, line breaks) MUST be written inside the <body> section.',
    },
  },

  {
    id: 2,
    title: '02 — HTML Headings',
    concept: 'HTML HEADINGS',
    easyExplanation:
      'When we want to give a title or heading to a section of content, we use HTML heading tags. Heading tags start with <h1> and end with </h1>. Headings introduce sections of content and give structure to the webpage.',
    realExample:
      'Just like a newspaper headline catches your eye and introduces the main story, an HTML <h1> tag introduces the main title of your webpage.',
    whereDoWeSeeIt:
      'At the top of articles, section titles on landing pages, and portfolio hero titles.',
    why: 'Headings break up content into clear, scannable sections for readers and web crawlers.',
    visualType: 'tag-nesting',
    syntax: '<h1>Welcome to Prayxis</h1>',
    syntaxBreakdown: [
      '<h1> : Opening heading tag.',
      'Welcome to Prayxis : Content text.',
      '</h1> : Closing heading tag.',
    ],
    teacherExample: `<body>
  <h1>My First Heading</h1>
  <p>This paragraph is introduced by the h1 heading above.</p>
</body>`,
    whatYouShouldSee: 'A bold, prominent heading title rendered at the top of the body area.',
    microPractice: {
      prompt: 'Write an h1 heading saying "My First Heading".',
      starterCode: `<body>

  <h1>My First Heading</h1>
  <p>Headings give structure to text content.</p>

</body>`,
    },
    commonMistakes: [
      'Forgetting the closing </h1> tag.',
      'Using CSS styling before learning standard HTML heading tags.',
    ],
    question: {
      text: 'Which HTML element is used to create a primary main heading?',
      options: ['<title>', '<p>', '<h1>', '<heading>'],
      correctIndex: 2,
      explanation: 'The <h1> tag is used for primary main headings in HTML.',
    },
  },

  {
    id: 3,
    title: '03 — <h1> to <h6>',
    concept: '<h1> TO <h6> HEADING LEVELS',
    easyExplanation:
      'HTML provides six heading levels: <h1>, <h2>, <h3>, <h4>, <h5>, and <h6>. <h1> represents the highest-level heading (most important title), while <h6> represents the lowest-level heading.',
    realExample:
      'Think of heading levels like outline levels in a research paper: <h1> is Title, <h2> is Major Chapter, <h3> is Section, <h4> is Subsection, <h5> is Sub-point, and <h6> is Minor Note.',
    whereDoWeSeeIt: 'Documentation pages, textbook sites, and organized blogs.',
    why: 'Heading levels communicate the hierarchy of content to browsers, search engines, and screen readers.',
    visualType: 'dom-tree',
    syntax: '<h1>Heading 1</h1>\n<h2>Heading 2</h2>\n<h3>Heading 3</h3>\n<h4>Heading 4</h4>\n<h5>Heading 5</h5>\n<h6>Heading 6</h6>',
    syntaxBreakdown: [
      '<h1> : Primary top-level heading (highest).',
      '<h2> : Major section heading.',
      '<h3> : Subsection heading.',
      '<h4> - <h6> : Deeper subsection levels (lowest).',
    ],
    teacherExample: `<body>
  <h1>Heading Level 1 (Highest)</h1>
  <h2>Heading Level 2</h2>
  <h3>Heading Level 3</h3>
  <h4>Heading Level 4</h4>
  <h5>Heading Level 5</h5>
  <h6>Heading Level 6 (Lowest)</h6>
</body>`,
    whatYouShouldSee: 'The browser displays <h1> as the largest/boldest heading by default down to <h6> as the smallest.',
    microPractice: {
      prompt: 'Type all six heading levels from <h1> to <h6>.',
      starterCode: `<body>
  <h1>Heading 1</h1>
  <h2>Heading 2</h2>
  <h3>Heading 3</h3>
  <h4>Heading 4</h4>
  <h5>Heading 5</h5>
  <h6>Heading 6</h6>
</body>`,
    },
    commonMistakes: [
      'Thinking <h6> is the highest heading because 6 is a bigger number than 1 (<h1> is highest!).',
      'Choosing a heading level purely for font size rather than content hierarchy.',
    ],
    question: {
      text: 'Which heading tag represents the lowest-level heading in HTML?',
      options: ['<h1>', '<h3>', '<h6>', '<h10>'],
      correctIndex: 2,
      explanation: 'HTML heading levels range from <h1> (highest) to <h6> (lowest).',
    },
  },

  {
    id: 4,
    title: '04 — Heading Hierarchy',
    concept: 'HEADING HIERARCHY',
    easyExplanation:
      'Heading hierarchy means organizing headings logically according to their relationship. Think of a book: Chapter (h1) → Section (h2) → Subsection (h3). Never jump randomly from h1 to h4 without a logical hierarchy!',
    realExample:
      'Full Stack Web Development (h1) → Frontend (h2) → HTML (h3), CSS (h3), JS (h3) → Backend (h2) → Node.js (h3), Express (h3).',
    whereDoWeSeeIt: 'Well-structured web pages, documentation, and Wikipedia articles.',
    why: 'Clear hierarchy allows users to quickly scan pages and helps search engines index content topic structures.',
    visualType: 'dom-tree',
    syntax: '<h1>Full Stack Web Development</h1>\n  <h2>Frontend</h2>\n    <h3>HTML</h3>\n    <h3>CSS</h3>\n  <h2>Backend</h2>\n    <h3>Node.js</h3>',
    syntaxBreakdown: [
      'h1: Main topic of the entire page.',
      'h2: Major sub-topics.',
      'h3: Specific items under an h2 sub-topic.',
    ],
    teacherExample: `<body>
  <h1>My Portfolio</h1>
  
  <h2>Skills</h2>
  <h3>HTML</h3>
  <h3>CSS</h3>
  
  <h2>Projects</h2>
  <h3>Personal Website</h3>
</body>`,
    whatYouShouldSee: 'A clean, logical visual tree of headings representing your portfolio sections.',
    microPractice: {
      prompt: 'Arrange headings in a logical hierarchy for a portfolio page.',
      starterCode: `<body>
  <h1>My Portfolio</h1>

  <h2>Skills</h2>
  <h3>HTML</h3>
  <h3>CSS</h3>

  <h2>Projects</h2>
</body>`,
    },
    commonMistakes: [
      'Jumping from <h1> directly to <h4> without using <h2> and <h3>.',
      'Using multiple <h1> tags for sub-items instead of using <h2> or <h3>.',
    ],
    question: {
      text: 'If "Frontend" is an <h2> section, which tag is most appropriate for "HTML" inside it?',
      options: ['<h1>HTML</h1>', '<h3>HTML</h3>', '<h6>HTML</h6>', '<p>HTML</p>'],
      correctIndex: 1,
      explanation: 'Subsections inside an <h2> section should logically use <h3>.',
    },
  },

  {
    id: 5,
    title: '05 — Understanding <h1>',
    concept: 'UNDERSTANDING <h1>',
    easyExplanation:
      'The <h1> element represents the primary main topic of the webpage. Generally, a webpage should have ONE main <h1> heading at the top of the main content area (e.g. <h1>Welcome to My College</h1>).',
    realExample:
      'A book has only one main Book Title on its cover. Similarly, a webpage should have one main <h1> title introducing the entire page.',
    whereDoWeSeeIt: 'At the top of webpage body content.',
    why: 'Having one clear <h1> communicates the primary topic to both visitors and search engines.',
    visualType: 'browser-flow',
    syntax: '<h1>My College</h1>\n<h2>About Us</h2>\n<h2>Departments</h2>',
    syntaxBreakdown: [
      '<h1> : Primary page topic (used once as main title).',
      '<h2> : Section headings underneath the main title.',
    ],
    teacherExample: `<body>
  <h1>My College</h1>
  <p>Welcome to our official college portal.</p>

  <h2>About Our Campus</h2>
  <p>Located in Rajasthan, India.</p>
</body>`,
    whatYouShouldSee: 'The h1 acts as the single primary page title, with h2 for subsections.',
    microPractice: {
      prompt: 'Choose the appropriate main heading for a webpage about "My College".',
      starterCode: `<body>
  <h1>My College</h1>
  <p>Welcome to our official campus portal.</p>
</body>`,
    },
    commonMistakes: [
      'Wrapping every section heading in <h1> instead of using <h2> and <h3>.',
      'Selecting <h1> purely to make text look big instead of marking the main page topic.',
    ],
    question: {
      text: 'What is the primary role of the <h1> element on a webpage?',
      options: [
        'It is used for footer copyright notes',
        'It represents the primary main title/topic of the page',
        'It creates a link to Google',
        'It stores user passwords',
      ],
      correctIndex: 1,
      explanation: 'The <h1> element represents the single main title or primary topic of the webpage.',
    },
  },

  {
    id: 6,
    title: '06 — <h2> & <h3>',
    concept: '<h2> & <h3> SECTIONS & SUBSECTIONS',
    easyExplanation:
      '<h2> is used for major sections of a page (e.g. <h2>About Me</h2>, <h2>Projects</h2>). <h3> is used for subsections inside an <h2> section (e.g. <h3>Web Development</h3> inside <h2>Skills</h2>).',
    realExample:
      'Full Stack Course (h1) → Frontend (h2) → HTML (h3), CSS (h3), JavaScript (h3) → Backend (h2) → Node.js (h3).',
    whereDoWeSeeIt: 'Throughout all structured articles and documentation pages.',
    why: 'Allows readers to navigate major topics (h2) and detailed sub-topics (h3) effortlessly.',
    visualType: 'dom-tree',
    syntax: '<h1>Full Stack Development</h1>\n  <h2>Frontend</h2>\n    <h3>HTML</h3>\n    <h3>CSS</h3>\n  <h2>Backend</h2>\n    <h3>Node.js</h3>',
    syntaxBreakdown: [
      '<h2> : Major section heading.',
      '<h3> : Subsection nested inside an <h2> section.',
    ],
    teacherExample: `<body>
  <h1>Full Stack Development</h1>

  <h2>Frontend Development</h2>
  <h3>HTML5 Foundations</h3>
  <h3>CSS3 Styling</h3>

  <h2>Backend Development</h2>
  <h3>Node.js & Express</h3>
</body>`,
    whatYouShouldSee: 'Clear visual and structural division between main sections (h2) and sub-items (h3).',
    microPractice: {
      prompt: 'Observe the relationship between h2 major sections and h3 subsections.',
      starterCode: `<body>
  <h1>Prayxis Tech Curriculum</h1>

  <h2>Module 1: Web Foundations</h2>
  <h3>Day 01 — What is a Webpage</h3>
  <h3>Day 02 — Document Structure</h3>
  <h3>Day 03 — Headings & Paragraphs</h3>
</body>`,
    },
    commonMistakes: [
      'Using <h2> inside an <h3> subsection (Outer parent must be higher level than child!).',
      'Thinking heading tags change semantics based on CSS font size.',
    ],
    question: {
      text: 'Which heading level is best suited for a subsection titled "HTML" under an <h2> section titled "Frontend"?',
      options: ['<h1>HTML</h1>', '<h3>HTML</h3>', '<h5>HTML</h5>', '<p>HTML</p>'],
      correctIndex: 1,
      explanation: 'Subsections inside an <h2> section should use <h3>.',
    },
  },

  {
    id: 7,
    title: '07 — <h4>, <h5> & <h6>',
    concept: '<h4>, <h5> & <h6> LOWER HEADING LEVELS',
    easyExplanation:
      '<h4>, <h5>, and <h6> are lower heading levels used when a document has deep levels of content hierarchy. However, NOT every webpage needs to use all six heading levels! Most standard pages only need <h1>, <h2>, and <h3>.',
    realExample:
      'Online Learning Platform (h1) → Courses (h2) → Full Stack (h3) → HTML (h4) → Heading Levels (h5) → Additional Notes (h6).',
    whereDoWeSeeIt: 'Deep technical documentation, legal documents, and detailed manuals.',
    why: 'Provides deep nesting levels for complex documents without forcing developers to use all levels on simple pages.',
    visualType: 'dom-tree',
    syntax: '<h4>Heading 4</h4>\n<h5>Heading 5</h5>\n<h6>Heading 6</h6>',
    syntaxBreakdown: [
      '<h4> : Level 4 sub-topic heading.',
      '<h5> : Level 5 sub-point heading.',
      '<h6> : Level 6 minor sub-note heading.',
    ],
    teacherExample: `<body>
  <h1>Online Learning Platform</h1>

  <h2>Courses</h2>
  <h3>Full Stack Web Development</h3>
  <h4>HTML Foundations</h4>
  <h5>Heading Hierarchy Details</h5>
  <h6>Minor Syntax Note</h6>

  <h2>About Us</h2>
</body>`,
    whatYouShouldSee: 'A 6-level deep structured hierarchy of headings.',
    microPractice: {
      prompt: 'Arrange the platform headings in order.',
      starterCode: `<body>
  <h1>Online Learning Platform</h1>

  <h2>Courses</h2>
  <h3>Full Stack</h3>
  <h3>Python</h3>

  <h2>About Us</h2>
</body>`,
    },
    commonMistakes: [
      'Forcing <h4>, <h5>, and <h6> into simple pages where <h2> and <h3> are sufficient.',
      'Skipping heading levels (e.g. going from h1 to h5 directly).',
    ],
    question: {
      text: 'Is it required for every simple HTML webpage to use all six heading levels (h1 through h6)?',
      options: [
        'Yes — HTML invalidates if h4, h5, and h6 are missing',
        'No — Pages should only use heading levels that match their actual content hierarchy',
        'Yes — Search engines penalize pages with fewer than 6 headings',
        'No — Only h6 can be used on modern websites',
      ],
      correctIndex: 1,
      explanation: 'Pages should only use the heading levels necessary to represent their actual content structure.',
    },
  },

  {
    id: 8,
    title: '08 — <p> Paragraph',
    concept: '<p> PARAGRAPH',
    easyExplanation:
      'When we want to write normal blocks of text, we use the <p> element (paragraph). A paragraph tag starts with <p> and ends with </p>. Browsers automatically add a small vertical margin before and after every paragraph to separate blocks of text cleanly.',
    realExample:
      'Look at any article online — the body text beneath each sub-heading is contained inside <p> paragraph tags.',
    whereDoWeSeeIt: 'Everywhere! All standard text, explanations, and descriptions on the web use <p>.',
    why: 'Defines semantic text blocks so browsers space and group text content cleanly.',
    visualType: 'browser-flow',
    syntax: '<p>I am learning Full Stack Web Development.</p>',
    syntaxBreakdown: [
      '<p> : Opening paragraph tag.',
      'Text Content : The body text shown inside the paragraph.',
      '</p> : Closing paragraph tag.',
    ],
    teacherExample: `<body>
  <h1>My Web Development Journey</h1>
  <p>I am learning Full Stack Web Development at Prayxis Academy.</p>
</body>`,
    whatYouShouldSee: 'The h1 heading appears bold at the top, followed by a paragraph of normal text beneath it.',
    microPractice: {
      prompt: 'Write a paragraph tag stating what you are learning.',
      starterCode: `<body>
  <h1>My Web Development Journey</h1>
  <p>I am learning Full Stack Web Development.</p>
</body>`,
    },
    commonMistakes: [
      'Using <text> or <para> instead of <p> (HTML paragraph tag is simply <p>!).',
      'Writing raw text directly in <body> without wrapping it inside a <p> tag.',
    ],
    question: {
      text: 'Which HTML tag is used to create a standard paragraph of text?',
      options: ['<text>', '<paragraph>', '<p>', '<para>'],
      correctIndex: 2,
      explanation: 'The standard HTML element for paragraphs is <p>.',
    },
  },

  {
    id: 9,
    title: '09 — Multiple Paragraphs',
    concept: 'MULTIPLE PARAGRAPHS',
    easyExplanation:
      'Real webpages contain multiple paragraphs. Each separate paragraph must be wrapped in its own individual <p> and </p> tags. Simply hitting "Enter" or adding blank lines in your code editor does NOT create separate paragraphs on the browser screen!',
    realExample:
      '<p>First paragraph text.</p>\n<p>Second paragraph text.</p>\n<p>Third paragraph text.</p>',
    whereDoWeSeeIt: 'All multi-paragraph articles, blogs, and documentation pages.',
    why: 'Browsers ignore extra white space and line breaks in source code. Wrapping text in separate <p> tags creates distinct semantic paragraph blocks.',
    visualType: 'browser-flow',
    syntax: '<p>Paragraph 1 text.</p>\n<p>Paragraph 2 text.</p>\n<p>Paragraph 3 text.</p>',
    syntaxBreakdown: [
      '<p>Paragraph 1</p> : First text block with automatic bottom spacing.',
      '<p>Paragraph 2</p> : Second distinct text block.',
    ],
    teacherExample: `<body>
  <h1>About Me</h1>

  <p>My name is Prashant. I am learning web development.</p>
  <p>I started learning HTML because I want to build production-grade web applications.</p>
  <p>My goal is to become a professional Full Stack Developer.</p>
</body>`,
    whatYouShouldSee: 'Three distinct paragraphs rendered on screen with clean vertical spacing between each.',
    microPractice: {
      prompt: 'Create 1 heading and 3 separate paragraphs (Name, What you learn, Career Goal).',
      starterCode: `<body>
  <h1>About Me</h1>

  <p>My name is Prashant. I am learning web development.</p>
  <p>I started learning HTML to build web applications.</p>
  <p>My goal is to become a professional developer.</p>
</body>`,
    },
    commonMistakes: [
      'Writing multiple paragraphs in one giant <p> tag separated by blank lines in code (Browsers merge source line breaks into a single space!).',
      'Forgetting to close the first </p> tag before starting the second <p> tag.',
    ],
    question: {
      text: 'What happens if you type 3 paragraphs in one <p> tag separated by empty lines in your code editor?',
      options: [
        'The browser automatically splits them into 3 paragraphs',
        'The browser merges all the text into one continuous paragraph',
        'The browser crashes',
        'The browser deletes the text',
      ],
      correctIndex: 1,
      explanation: 'Browsers ignore source code blank lines. You must wrap each paragraph in its own <p> and </p> tags.',
    },
  },

  {
    id: 10,
    title: '10 — <br> Line Break',
    concept: '<br> LINE BREAK',
    easyExplanation:
      'The <br> element creates a line break. It forces any text following it to move to a new line immediately inside the same paragraph. <br> is a VOID ELEMENT, meaning it has NO closing tag (do NOT write </br>!).',
    realExample:
      'Writing an address, poem, or contact info where lines must break without creating a whole new paragraph gap:\nName: Prashant<br>\nCourse: Full Stack<br>\nGoal: Developer',
    whereDoWeSeeIt: 'Addresses, lyrics, poetry, and multi-line contact details.',
    why: 'Allows breaking lines within a single paragraph without creating a new paragraph margin gap.',
    visualType: 'code-editor',
    syntax: '<p>\n  Line 1<br>\n  Line 2<br>\n  Line 3\n</p>',
    syntaxBreakdown: [
      '<br> : Line break void tag (no closing tag needed!).',
      'Result: Content immediately continues on the next line.',
    ],
    teacherExample: `<body>
  <h1>Contact Details</h1>
  <p>
    Prayxis Academy<br>
    Technology & Software Lab<br>
    India
  </p>
</body>`,
    whatYouShouldSee: 'The text breaks cleanly onto 3 lines inside a single paragraph block.',
    microPractice: {
      prompt: 'Use <br> tags to format contact info on separate lines.',
      starterCode: `<body>
  <h1>Contact Info</h1>
  <p>
    Name: Prashant<br>
    Course: Full Stack Web Development<br>
    Goal: Software Developer
  </p>
</body>`,
    },
    commonMistakes: [
      'Writing closing </br> tags (HTML <br> is a void tag and does NOT use a closing tag!).',
      'Using <br> for every line instead of using proper <p> paragraphs for separate content blocks.',
    ],
    question: {
      text: 'Does the HTML <br> line break tag require a closing tag like </br>?',
      options: [
        'Yes — Every HTML tag requires a closing tag',
        'No — <br> is a void element and does NOT use a closing tag',
        'Yes — Only in Google Chrome',
        'No — But only if used inside <h1>',
      ],
      correctIndex: 1,
      explanation: '<br> is a void element in HTML and does not have a closing tag.',
    },
  },

  {
    id: 11,
    title: '11 — <p> vs <br>',
    concept: '<p> VS <br> COMPARISON',
    easyExplanation:
      'This distinction is vital: <p> creates SEPARATE PARAGRAPH BLOCKS with vertical margins between them. <br> creates a LINE BREAK within the SAME paragraph. Never use multiple <br><br><br> tags to fake empty vertical spacing between sections!',
    realExample:
      'Use <p> for distinct thoughts or article paragraphs. Use <br> for multi-line items inside one thought (like a street address or 3-line contact card).',
    whereDoWeSeeIt: 'Best practice HTML semantic structure.',
    why: 'Using proper <p> paragraphs ensures CSS can style section spacing professionally later in your career.',
    visualType: 'browser-flow',
    syntax: '<!-- GOOD PARAGRAPHS -->\n<p>First paragraph block.</p>\n<p>Second paragraph block.</p>\n\n<!-- BAD SPACING HACK (AVOID!) -->\n<p>First paragraph.<br><br><br>Second paragraph.</p>',
    syntaxBreakdown: [
      '<p> : Semantic paragraph container with standard paragraph spacing.',
      '<br> : Line break inside a single paragraph.',
      'Rule: Use <p> for separate paragraphs, NOT repeated <br><br> hacks!',
    ],
    teacherExample: `<body>
  <!-- Recommended semantic approach -->
  <p>First paragraph about web development.</p>
  <p>Second paragraph about career goals.</p>
</body>`,
    whatYouShouldSee: 'Two clean, semantically correct paragraph elements.',
    microPractice: {
      prompt: 'Compare <p> paragraphs vs <br> line breaks.',
      starterCode: `<body>
  <!-- Correct semantic paragraphs -->
  <p>First distinct paragraph.</p>
  <p>Second distinct paragraph.</p>
</body>`,
    },
    commonMistakes: [
      'Using <br><br><br> to create vertical spacing between paragraphs instead of using separate <p> tags.',
      'Wrapping every single line in a separate <p> tag when it is actually a single address or contact block.',
    ],
    question: {
      text: 'Which code is better for creating two separate article paragraphs?',
      options: [
        '<p>First paragraph.</p><p>Second paragraph.</p>',
        '<p>First paragraph.<br><br>Second paragraph.</p>',
        '<br>First paragraph.</br><br>Second paragraph.</br>',
        '<h1>First paragraph.</h1><h1>Second paragraph.</h1>',
      ],
      correctIndex: 0,
      explanation: 'Option A is semantically correct. Separate paragraphs must be wrapped in individual <p> tags.',
    },
  },

  {
    id: 12,
    title: '12 — Build a Text Section',
    concept: 'BUILD A TEXT SECTION (HANDS-ON)',
    easyExplanation:
      'Now let\'s combine everything we have learned today into a complete text section! We will build an "About Me" page complete with DOCTYPE, html, head, title, body, <h1>, <h2> sub-headings, <p> paragraphs, and a <br> line break.',
    realExample:
      'Title: About Me | h1: About Me | p: Intro | h2: My Learning Journey | p: Journey details | h2: My Goal | p: Goal details with line break.',
    whereDoWeSeeIt: 'The core text layout structure for personal portfolios and bio pages.',
    why: 'Combining headings, sub-headings, paragraphs, and line breaks builds real webpage content layout skills.',
    visualType: 'code-editor',
    syntax: `<!DOCTYPE html>
<html>
  <head>
    <title>About Me</title>
  </head>
  <body>
    <h1>About Me</h1>
    <p>My name is Prashant and I am learning Full Stack Web Development.</p>

    <h2>My Learning Journey</h2>
    <p>I started learning HTML to understand how webpages are created.</p>

    <h2>My Goal</h2>
    <p>
      My goal is to become a professional developer.<br>
      I want to build useful web applications.
    </p>
  </body>
</html>`,
    syntaxBreakdown: [
      'h1 : Main page topic "About Me".',
      'h2 : Major section headings ("My Learning Journey", "My Goal").',
      'p : Paragraph blocks under each heading.',
      'br : Line break inside the goal paragraph.',
    ],
    teacherExample: `<!DOCTYPE html>
<html>
  <head>
    <title>About Me</title>
  </head>
  <body>
    <h1>About Me</h1>
    <p>My name is Prashant and I am learning Full Stack Web Development.</p>

    <h2>My Learning Journey</h2>
    <p>I started learning HTML to understand how webpages work.</p>

    <h2>My Goal</h2>
    <p>
      My goal is to become a professional developer.<br>
      I want to build useful software capstones.
    </p>
  </body>
</html>`,
    whatYouShouldSee: 'A clean, well-structured personal profile page with headings, paragraphs, and line breaks.',
    microPractice: {
      prompt: 'Practice building a complete text section.',
      starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>About Me</title>
  </head>
  <body>
    <h1>About Me</h1>
    <p>My name is Prashant and I am learning web development.</p>

    <h2>My Learning Journey</h2>
    <p>I started learning HTML to build web apps.</p>

    <h2>My Goal</h2>
    <p>
      My goal is to become a full stack developer.<br>
      I want to build software applications.
    </p>
  </body>
</html>`,
    },
    commonMistakes: [
      'Omitting the DOCTYPE or <html> wrapper tags.',
      'Using <h1> for every section heading instead of <h2>.',
    ],
    question: {
      text: 'In a personal introduction webpage, what tag level is best for section titles like "My Learning Journey" and "My Goal"?',
      options: ['<h1>', '<h2>', '<p>', '<br>'],
      correctIndex: 1,
      explanation: 'Under the main <h1> title, major section headings like "My Goal" should logically use <h2>.',
    },
  },

  {
    id: 13,
    title: '13 — Practice Lab',
    concept: 'PRACTICE LAB & EXERCISES',
    easyExplanation:
      'Put your skills to the test! Complete 8 interactive practice exercises: create introduction headings, education sections, skills sections, goal sections, contact info with <br>, and arrange heading hierarchies.',
    realExample:
      'Lab 01: Introduction | Lab 02: Education | Lab 03: Skills | Lab 04: Goal | Lab 05: Contact Info | Lab 06: Hierarchy Ordering | Lab 07: Tag Identification | Lab 08: Line Break Check.',
    whereDoWeSeeIt: 'Interactive practice environment for Day 03.',
    why: 'Solidifies understanding through hands-on exercise solving.',
    visualType: 'tag-nesting',
    syntax: 'h1 → Main Page Title\nh2 → Major Section Heading\nh3 → Subsection Heading\np → Paragraph Text Block\nbr → Line Break within Text',
    syntaxBreakdown: [
      'Lab 01-04: Building structured sections with h1, h2, and p.',
      'Lab 05: Formatting Multi-line Contact Info with <br>.',
      'Lab 06: Ordering Portfolio Hierarchy (h1 → h2 → h3).',
    ],
    teacherExample: `<!DOCTYPE html>
<html>
  <head>
    <title>Practice Lab</title>
  </head>
  <body>
    <h1>My Introduction</h1>
    <p>I am a web development student.</p>

    <h2>My Education</h2>
    <p>Currently studying Full Stack Engineering.</p>

    <h2>My Skills</h2>
    <p>Currently learning HTML foundations.</p>
  </body>
</html>`,
    whatYouShouldSee: 'All practice exercises solved cleanly.',
    microPractice: {
      prompt: 'Complete Practice Lab exercises.',
      starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>Practice Lab</title>
  </head>
  <body>
    <h1>My Introduction</h1>
    <p>I am a web development student.</p>
  </body>
</html>`,
    },
    commonMistakes: [
      'Placing <p> tags inside <title>.',
      'Using </br> closing tags.',
    ],
    question: {
      text: 'Which element should be used for standard paragraph text inside a webpage body?',
      options: ['<text>', '<p>', '<br>', '<h1>'],
      correctIndex: 1,
      explanation: 'Standard body text blocks should be wrapped inside <p> paragraph tags.',
    },
  },

  {
    id: 14,
    title: '14 — Debugging Lab',
    concept: 'DEBUGGING LAB (FIX BROKEN CODE)',
    easyExplanation:
      'Analyze 6 intentionally broken HTML code snippets, identify structural bugs (invalid closing tags, hierarchy jumps, invalid </br> closing tags, unclosed paragraphs), and learn how to fix them!',
    realExample:
      'Bug 01: <h1>Text<h1> (missing slash) | Bug 02: <p>Text<p> (missing slash) | Bug 03: h1 → h3 hierarchy jump | Bug 04: Invalid </br> tag | Bug 05: Unclosed first paragraph | Bug 06: Missing closing slash.',
    whereDoWeSeeIt: 'Real-world debugging scenarios faced by web developers.',
    why: 'Teaches you to catch common syntax errors quickly.',
    visualType: 'code-editor',
    syntax: '<!-- BUG 01 FIX -->\n<!-- BROKEN: <h1>My Website<h1> -->\n<!-- FIXED:  <h1>My Website</h1> -->',
    syntaxBreakdown: [
      'Bug 01: Closing heading tag MUST have a forward slash </h1>.',
      'Bug 02: Closing paragraph tag MUST have a forward slash </p>.',
      'Bug 04: <br> is a void tag — remove invalid </br> closing tags!',
    ],
    teacherExample: `<!-- DEBUGGED CODE -->
<!DOCTYPE html>
<html>
  <head>
    <title>Fixed Website</title>
  </head>
  <body>
    <h1>My Website</h1>
    <p>My name is Prashant.</p>
    <p>I am learning HTML.</p>
  </body>
</html>`,
    whatYouShouldSee: 'Clean, bug-free HTML parsing in the browser engine.',
    microPractice: {
      prompt: 'Fix the closing slash bug in <h1>My Website<h1>.',
      starterCode: `<body>
  <h1>My Website</h1>
  <p>All tags are properly closed with forward slashes.</p>
</body>`,
    },
    commonMistakes: [
      'Forgetting the forward slash / in closing tags.',
      'Writing closing tags for void elements like <br>.',
    ],
    question: {
      text: 'What is wrong with this code: <h1>My Website<h1> ?',
      options: [
        'The h1 tag is not allowed in HTML',
        'The closing tag is missing a forward slash: </h1>',
        'It needs a <p> tag inside it',
        'Nothing, it is 100% valid',
      ],
      correctIndex: 1,
      explanation: 'Closing tags MUST include a forward slash (</h1>).',
    },
  },

  {
    id: 15,
    title: '15 — Mini Project & Final Challenge',
    concept: 'MINI PROJECT & FINAL CHALLENGE',
    easyExplanation:
      'You have made it to Step 15! It is time for your Day 03 Capstone Project: "MY INTRODUCTION PAGE". Build a complete text-based webpage from scratch adhering to all 9 structural rules!',
    realExample:
      'Construct a complete webpage with page title "My Introduction", 1 h1, at least 3 h2 section headings, at least 3 paragraphs, at least 1 br line break, proper indentation, and correct tag nesting.',
    whereDoWeSeeIt: 'Final verification project for Day 03.',
    why: 'Proves complete mastery of HTML headings, paragraphs, and line breaks.',
    visualType: 'browser-flow',
    syntax: `<!DOCTYPE html>
<html>
  <head>
    <title>My Introduction</title>
  </head>
  <body>
    <!-- Main Heading -->
    <h1>Hello, I am Prashant</h1>

    <!-- About Section -->
    <h2>About Me</h2>
    <p>I am learning Full Stack Web Development at Prayxis Academy.</p>

    <!-- Learning Section -->
    <h2>My Learning</h2>
    <p>Today I learned HTML headings (h1-h6), paragraphs, and line breaks.</p>

    <!-- Goal Section -->
    <h2>My Goal</h2>
    <p>My goal is to become a professional software engineer.</p>

    <!-- Contact Info Section -->
    <h2>Contact Information</h2>
    <p>
      Name: Prashant<br>
      Course: Full Stack Web Development<br>
      Status: Active Student
    </p>
  </body>
</html>`,
    syntaxBreakdown: [
      '✓ DOCTYPE, html, head, title, body structure present',
      '✓ 1 Main <h1> title',
      '✓ 4 Section <h2> headings (About Me, My Learning, My Goal, Contact)',
      '✓ 4 Paragraphs (<p>)',
      '✓ Line breaks (<br>) used for contact info',
      '✓ Clean indentation and correct tag nesting',
    ],
    teacherExample: `<!DOCTYPE html>
<html>
  <head>
    <title>My Introduction</title>
  </head>
  <body>
    <h1>Hello, I am Prashant</h1>

    <h2>About Me</h2>
    <p>I am learning Full Stack Web Development at Prayxis Academy.</p>

    <h2>My Learning</h2>
    <p>I mastered HTML headings, paragraphs, and line breaks.</p>

    <h2>My Goal</h2>
    <p>My goal is to build production-grade web applications.</p>

    <h2>Contact Information</h2>
    <p>
      Name: Prashant<br>
      Course: Full Stack Web Development<br>
      Goal: Full Stack Developer
    </p>
  </body>
</html>`,
    whatYouShouldSee: 'A complete, clean, structured text-based personal webpage.',
    microPractice: {
      prompt: 'Complete your final Day 03 introduction webpage below.',
      starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>My Introduction</title>
  </head>
  <body>
    <h1>Hello, I am Prashant</h1>

    <h2>About Me</h2>
    <p>I am learning Full Stack Web Development.</p>

    <h2>My Learning</h2>
    <p>Today I mastered HTML headings, paragraphs, and line breaks.</p>

    <h2>My Goal</h2>
    <p>My goal is to become a professional web developer.</p>

    <h2>Contact Information</h2>
    <p>
      Name: Prashant<br>
      Course: Full Stack Web Development<br>
      Goal: Professional Developer
    </p>
  </body>
</html>`,
    },
    commonMistakes: [
      'Adding images, links, or CSS styling (Day 03 is strictly text-based HTML layout!).',
      'Using multiple <h1> tags instead of <h2> section headings.',
    ],
    question: {
      text: 'What elements are essential to structure a clean text-based webpage?',
      options: [
        'DOCTYPE, html, head, title, body, headings (h1-h6), paragraphs (p), and line breaks (br)',
        'Only <h1> tags and background colors',
        'JavaScript functions and database tables',
        'Only images and audio players',
      ],
      correctIndex: 0,
      explanation: 'A clean text-based webpage relies on proper document structure combined with headings, paragraphs, and line breaks.',
    },
  },
];

export const DAY_03_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Which element is commonly used for the primary main heading of a webpage?',
    options: ['<p>', '<h1>', '<br>', '<title>'],
    correctIndex: 1,
    explanation: 'The <h1> element is used for the primary main heading on a webpage.',
  },
  {
    id: 2,
    question: 'How many heading levels does HTML provide by default?',
    options: ['3', '4', '6', '10'],
    correctIndex: 2,
    explanation: 'HTML provides 6 heading levels ranging from <h1> to <h6>.',
  },
  {
    id: 3,
    question: 'Which element is used to create a standard paragraph of text?',
    options: ['<paragraph>', '<text>', '<p>', '<para>'],
    correctIndex: 2,
    explanation: 'The standard HTML element for paragraphs is <p>.',
  },
  {
    id: 4,
    question: 'Which element creates a line break within a paragraph?',
    options: ['<break>', '<br>', '<line>', '<lb>'],
    correctIndex: 1,
    explanation: 'The <br> element creates a line break in text.',
  },
  {
    id: 5,
    question: 'Which heading tag is correctly written with opening and closing tags?',
    options: ['<h1>Hello<h1>', '<h1>Hello</h1>', '<h1>Hello<h1/>', '<h1 Hello>'],
    correctIndex: 1,
    explanation: 'Closing tags MUST have a forward slash before the tag name: </h1>.',
  },
  {
    id: 6,
    question: 'Which heading tag represents the highest-level heading in HTML hierarchy?',
    options: ['<h6>', '<h4>', '<h2>', '<h1>'],
    correctIndex: 3,
    explanation: '<h1> is the highest-level heading, while <h6> is the lowest.',
  },
  {
    id: 7,
    question: 'What does heading hierarchy help communicate on a webpage?',
    options: ['Content structure and topic relationships', 'Internet connection speed', 'File download size', 'Database connections'],
    correctIndex: 0,
    explanation: 'Heading hierarchy communicates the structural relationships between main topics and sub-topics.',
  },
  {
    id: 8,
    question: 'Which approach is better for creating two separate article paragraphs?',
    options: [
      '<p>First paragraph.</p><p>Second paragraph.</p>',
      '<p>First paragraph.<br><br>Second paragraph.</p>',
      '<br>First</br><br>Second</br>',
      '<h1>First</h1><h1>Second</h1>',
    ],
    correctIndex: 0,
    explanation: 'Separate paragraphs should be wrapped in individual <p> tags rather than using repeated <br><br> tags.',
  },
  {
    id: 9,
    question: 'Does the <br> line break element normally have a closing tag like </br>?',
    options: ['Yes', 'No'],
    correctIndex: 1,
    explanation: '<br> is a void element in HTML and does NOT have a closing tag.',
  },
  {
    id: 10,
    question: 'Which represents a correct, logical heading hierarchy?',
    options: [
      '<h1>Portfolio</h1><h3>About</h3><h2>Projects</h2>',
      '<h1>Portfolio</h1><h2>About</h2><h2>Projects</h2>',
      '<h3>Portfolio</h3><h1>About</h1><h2>Projects</h2>',
      '<h6>Portfolio</h6><h5>About</h5><h4>Projects</h4>',
    ],
    correctIndex: 1,
    explanation: 'Option B follows a logical hierarchy: <h1> as main topic, with <h2> for major sections "About" and "Projects".',
  },
];

export const DAY_03_CHECKLIST: string[] = [
  // HEADINGS
  'I understand <h1>',
  'I understand <h2>',
  'I understand <h3>',
  'I know HTML has six heading levels (h1 to h6)',
  'I understand heading hierarchy',
  'I know when to use different heading levels',
  // PARAGRAPHS
  'I understand <p>',
  'I can create a paragraph',
  'I can create multiple paragraphs',
  'I understand separate paragraph elements',
  // LINE BREAKS
  'I understand <br>',
  'I know <br> does not use a normal closing tag',
  'I can create line breaks',
  'I understand <p> vs <br>',
  // PRACTICAL
  'I created heading hierarchy',
  'I created multiple paragraphs',
  'I used <br>',
  'I fixed HTML errors',
  'I completed the mini project',
  'I completed the quiz',
  'I completed the final challenge',
];
