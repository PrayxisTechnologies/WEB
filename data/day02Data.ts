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
  interactiveType?: string;
  interactiveData?: any;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const DAY_02_STEPS: LessonStep[] = [
  {
    id: 1,
    title: '01 — HTML Document Structure',
    concept: 'HTML DOCUMENT STRUCTURE',
    easyExplanation:
      'Welcome back to Day 02 of Full Stack Web Development! Yesterday you learned what a webpage is, what HTML tags are, and how to create a basic paragraph and heading. Today we go one level deeper: understanding how a professional HTML document is organized. A webpage is not just a random collection of tags—it follows a clean structural layout like a house (Foundation → Main Structure → Rooms → Interior).',
    realExample:
      'Just like every house has a foundation, walls, roof, and rooms, every valid HTML document has a DOCTYPE declaration, a root html element, a head section for metadata/title, and a body section for visible content.',
    whereDoWeSeeIt:
      'Right-click any web page on Google Chrome or Edge and click "View Page Source" — you will see every professional site starts with <!DOCTYPE html> followed by <html>, <head>, and <body>.',
    why: 'Computers require explicit structural hierarchy so the browser knows where the page title goes (tab), where metadata is stored, and where visual elements (headings, text, buttons) must be rendered on screen.',
    visualType: 'tag-nesting',
    syntax: '<!DOCTYPE html>\n<html>\n  <head>\n    <title>Title</title>\n  </head>\n  <body>\n    Content...\n  </body>\n</html>',
    syntaxBreakdown: [
      'DOCTYPE: Modern HTML5 document declaration at the very top.',
      'html: The outer root container holding the entire document.',
      'head: Non-visible document information, title, and metadata.',
      'body: Visible webpage content shown to visitors.',
    ],
    teacherExample: `<!DOCTYPE html>
<html>
<head>
  <title>Prayxis Day 02</title>
</head>
<body>
  <h1>HTML Document Structure</h1>
  <p>Learning how professional webpages are organized.</p>
</body>
</html>`,
    whatYouShouldSee:
      'The browser reads the structural tags, sets the browser tab title to "Prayxis Day 02", and displays the h1 heading and paragraph inside the main window viewport.',
    microPractice: {
      prompt: 'Review the basic structural outline of an HTML document below.',
      starterCode: `<!DOCTYPE html>
<html>
<head>
  <title>My Structured Page</title>
</head>
<body>

  <h1>Building Web Foundations</h1>
  <p>HTML document structure is simple and logical.</p>

</body>
</html>`,
    },
    commonMistakes: [
      'Forgetting that HTML documents require an organized structural hierarchy instead of random loose tags.',
      'Assuming CSS or JavaScript is needed to structure an HTML document (Day 02 focuses purely on raw HTML document structure).',
    ],
    question: {
      text: 'Which analogy best describes the purpose of HTML document structure?',
      options: [
        'A random shopping list with no categories',
        'A house with a foundation, outer walls (root), roof (head), and living spaces (body)',
        'An audio file played in a media player',
        'A database table storing passwords',
      ],
      correctIndex: 1,
      explanation:
        'An HTML document relies on a strict structural layout (DOCTYPE declaration, html root, head for document info, and body for visible content).',
    },
  },

  {
    id: 2,
    title: '02 — What Is an HTML Document?',
    concept: 'WHAT IS AN HTML DOCUMENT?',
    easyExplanation:
      'An HTML document is a plain text file containing HTML code instructions that tell the browser how the webpage is organized. An HTML document normally uses the .html file extension (for example: index.html). The browser opens this text file, interprets every tag, and renders the visual webpage.',
    realExample:
      'When you open index.html on your laptop, your web browser reads the file content line by line and translates code into a clean visual UI.',
    whereDoWeSeeIt:
      'Every web server stores HTML document files (index.html, about.html, contact.html) that are fetched over the internet.',
    why: 'Understanding the difference between an HTML Document (the complete file) and an HTML Element (one individual tag/piece inside the file) is essential for web developers.',
    visualType: 'browser-flow',
    syntax: 'HTML DOCUMENT (index.html) ──▶ HTML STRUCTURE (html/head/body) ──▶ HTML ELEMENTS (h1/p) ──▶ VISIBLE WEBPAGE',
    syntaxBreakdown: [
      'HTML Document: The complete text file saved with .html extension.',
      'HTML Element: Individual building block (e.g. <h1>Heading</h1>) inside the document.',
    ],
    teacherExample: `<!-- File: index.html -->
<h1>Welcome to Prayxis</h1>
<p>My first structured webpage.</p>`,
    whatYouShouldSee:
      'The file index.html is loaded by the browser, rendering the heading and paragraph on screen.',
    microPractice: {
      prompt: 'Check out this minimal index.html file structure.',
      starterCode: `<!-- File: index.html -->
<h1>Welcome to Prayxis Academy</h1>
<p>Understanding HTML document files.</p>`,
    },
    commonMistakes: [
      'Saving HTML files with .txt or .doc extensions instead of .html',
      'Confusing an HTML Document (the entire file) with an HTML Element (a single tag).',
    ],
    question: {
      text: 'Which file extension is standard for HTML document files?',
      options: ['.txt', '.docx', '.html', '.css'],
      correctIndex: 2,
      explanation: 'HTML document files must be saved with the .html extension so browsers recognize and compile them.',
    },
  },

  {
    id: 3,
    title: '03 — <!DOCTYPE html>',
    concept: '<!DOCTYPE html> DECLARATION',
    easyExplanation:
      'The very first line of a modern HTML document must always be <!DOCTYPE html>. This is called the DOCTYPE declaration. It informs the web browser that the document is written in modern HTML5 standards so the browser renders the page in standard mode without falling back to outdated quirks mode.',
    realExample:
      'Think of <!DOCTYPE html> like an official passport stamp at the top of a document declaring "This document uses modern HTML5 standards!"',
    whereDoWeSeeIt: 'Line 1 of every modern website source file on the web.',
    why: 'Without <!DOCTYPE html>, older or modern browsers might render web elements inconsistently using legacy quirks mode behavior.',
    visualType: 'dom-tree',
    syntax: '<!DOCTYPE html>',
    syntaxBreakdown: [
      '< ! : Indicates an instruction/declaration directive.',
      'DOCTYPE: Tells the parser which document type standard is being declared.',
      'html: Specifies modern HTML5 standard.',
    ],
    teacherExample: `<!DOCTYPE html>
<html>
  <head>
    <title>Modern Document</title>
  </head>
  <body>
    <p>Using modern HTML standards!</p>
  </body>
</html>`,
    whatYouShouldSee: 'Browser initializes in modern standards rendering mode.',
    microPractice: {
      prompt: 'Add the modern DOCTYPE declaration at line 1.',
      starterCode: `<!DOCTYPE html>
<html>
  <body>
    <p>Modern HTML document initialized.</p>
  </body>
</html>`,
    },
    commonMistakes: [
      'Thinking <!DOCTYPE html> is an HTML tag with a closing tag like </DOCTYPE> (It is a one-line declaration directive!).',
      'Placing <!DOCTYPE html> inside the <body> or <head> tag instead of line 1.',
    ],
    question: {
      text: 'What is the primary purpose of <!DOCTYPE html>?',
      options: [
        'It creates a visible title at the top of the webpage',
        'It tells the browser that the document uses modern HTML5 standards',
        'It adds background colors to the page',
        'It connects the webpage to a database',
      ],
      correctIndex: 1,
      explanation:
        '<!DOCTYPE html> is a declaration that tells the browser to parse the document using modern HTML5 standards.',
    },
  },

  {
    id: 4,
    title: '04 — <html> Root Element',
    concept: '<html> ROOT ELEMENT',
    easyExplanation:
      'The <html> tag is the root element of an HTML document. "Root" means it is the main outer container that holds everything else inside the document. Every head tag, title tag, body tag, heading, and paragraph sits inside <html> and </html>.',
    realExample:
      'Think of <html> as the outer perimeter of a house building. Everything inside the house (the rooms, furniture, roof) sits inside the outer building walls.',
    whereDoWeSeeIt: 'Directly beneath <!DOCTYPE html> wrapping the entire document.',
    why: 'It informs the browser where the HTML content starts (<html>) and where it ends (</html>).',
    visualType: 'tag-nesting',
    syntax: '<html>\n  <!-- All document tags go here -->\n</html>',
    syntaxBreakdown: [
      '<html> : Opening root tag of the document.',
      '</html> : Closing root tag marking the end of the document.',
    ],
    teacherExample: `<!DOCTYPE html>
<html>
  <head>
    <title>Root Example</title>
  </head>
  <body>
    <h1>Inside the Root</h1>
  </body>
</html>`,
    whatYouShouldSee: 'The root container encapsulates the head and body sections.',
    microPractice: {
      prompt: 'Wrap the document sections inside the root <html> element.',
      starterCode: `<!DOCTYPE html>
<html>

  <head>
    <title>Root Element Test</title>
  </head>
  <body>
    <p>Everything sits inside html root.</p>
  </body>

</html>`,
    },
    commonMistakes: [
      'Placing <html> before <!DOCTYPE html>.',
      'Closing </html> before the <body> tag ends.',
    ],
    question: {
      text: 'Why is the <html> element called the "root element"?',
      options: [
        'Because it grows trees on the webpage',
        'Because it is the main outer container holding all other document elements inside it',
        'Because it handles password authentication',
        'Because it only contains images',
      ],
      correctIndex: 1,
      explanation: 'The <html> element is the top-level root container of the entire HTML document tree.',
    },
  },

  {
    id: 5,
    title: '05 — HTML Nesting',
    concept: 'HTML NESTING & PARENT/CHILD',
    easyExplanation:
      'Nesting means placing one HTML element inside another HTML element. The outer element is called the PARENT, and the inner element is called the CHILD. Proper nesting is one of the most critical fundamentals in web development!',
    realExample:
      'Think of nesting like Russian nesting dolls (Matryoshka dolls) or boxes inside boxes. A small box sits inside a bigger box. You must close the inner box before closing the outer box!',
    whereDoWeSeeIt: 'Every HTML layout relies on nested elements (e.g. <p><strong>Bold Text</strong></p>).',
    why: 'Improper nesting breaks the HTML DOM structure and leads to layout bugs in browsers.',
    visualType: 'tag-nesting',
    syntax: '<!-- CORRECT NESTING -->\n<p>\n  <strong>Hello World</strong>\n</p>\n\n<!-- INCORRECT NESTING -->\n<p>\n  <strong>Hello World</p>\n</strong>',
    syntaxBreakdown: [
      'Parent Element: The enclosing outer element (e.g. <p>).',
      'Child Element: The enclosed inner element (e.g. <strong>).',
      'Rule: Close inner tags BEFORE closing outer tags!',
    ],
    teacherExample: `<!-- Parent: <body>, Children: <h1> and <p> -->
<body>
  <h1>Parent and Child Example</h1>
  <p>The paragraph is a child of the <strong>body element</strong>.</p>
</body>`,
    whatYouShouldSee: 'Properly nested tags render cleanly without broken formatting.',
    microPractice: {
      prompt: 'Fix the improper nesting bug in the snippet.',
      starterCode: `<!-- Fix this nesting error -->
<p>
  <strong>Correct Nesting Practice</strong>
</p>`,
    },
    commonMistakes: [
      'Closing outer tags before closing inner tags (e.g. <p><strong>Text</p></strong> is WRONG!).',
      'Forgetting parent-child hierarchy rules.',
    ],
    question: {
      text: 'Which code snippet demonstrates CORRECT HTML nesting?',
      options: [
        '<p><strong>Hello World</p></strong>',
        '<p><strong>Hello World</strong></p>',
        '<strong><p>Hello World</strong></p>',
        '<p><strong>Hello World',
      ],
      correctIndex: 1,
      explanation:
        'In <p><strong>Hello World</strong></p>, the <strong> tag opens inside <p> and closes BEFORE <p> is closed.',
    },
  },

  {
    id: 6,
    title: '06 — <head> Section',
    concept: '<head> SECTION',
    easyExplanation:
      'The <head> section contains document information ABOUT the webpage. The content inside <head> is NOT directly displayed as normal visible content on the webpage screen. It stores metadata, page title, character sets, and background instructions for the browser.',
    realExample:
      'Think of <head> like the brain or behind-the-scenes control panel of a car — it holds vital information and engine settings that passengers inside the car don\'t directly sit on.',
    whereDoWeSeeIt: 'Placed right after <html> and before <body>.',
    why: 'Browsers and search engines need a dedicated space for document metadata without mixing it up with visible text and headings.',
    visualType: 'dom-tree',
    syntax: '<head>\n  <title>Document Title</title>\n</head>',
    syntaxBreakdown: [
      '<head> : Opens the metadata and document information section.',
      '</head> : Closes the head section before body starts.',
    ],
    teacherExample: `<!DOCTYPE html>
<html>
<head>
  <title>Understanding the Head Section</title>
</head>
<body>
  <p>Visible content goes in body, not head!</p>
</body>
</html>`,
    whatYouShouldSee: 'The browser reads the title inside <head> for the tab name, while body content appears on screen.',
    microPractice: {
      prompt: 'Verify that the <head> tag appears before <body>.',
      starterCode: `<!DOCTYPE html>
<html>
<head>
  <title>Head Section Mastery</title>
</head>
<body>
  <h1>Head vs Body</h1>
  <p>Head is for document info, body is for visible content.</p>
</body>
</html>`,
    },
    commonMistakes: [
      'Putting main visible content like <h1> or <p> inside <head> (Visible elements belong in <body>!).',
      'Placing <head> inside the <body> tag.',
    ],
    question: {
      text: 'What type of information is stored inside the <head> section?',
      options: [
        'Visible page headings and buttons',
        'Information ABOUT the webpage (title, metadata, document settings)',
        'Database user accounts',
        'Footer copyright text shown at the bottom of the screen',
      ],
      correctIndex: 1,
      explanation: 'The <head> section holds document metadata and instructions for browsers and search engines.',
    },
  },

  {
    id: 7,
    title: '07 — <title> Element',
    concept: '<title> ELEMENT',
    easyExplanation:
      'The <title> element defines the title of the webpage. It MUST be placed inside the <head> section. The text inside <title> is what appears on your browser tab at the top of your screen and in Google Search result titles!',
    realExample:
      'Look at the top tab of your Chrome/Edge browser right now — it says "Day 02 — HTML Document Structure". That exact text is written inside <title>!',
    whereDoWeSeeIt: 'Inside <head> on every webpage. Appears in browser tab & Google search results.',
    why: 'Users and search engine bots need to identify what webpage is open in a browser tab.',
    visualType: 'browser-flow',
    syntax: '<head>\n  <title>Prayxis Full Stack Academy</title>\n</head>',
    syntaxBreakdown: [
      '<title>: Opening title tag.',
      'Title Text: The string displayed on browser tabs.',
      '</title>: Closing title tag.',
    ],
    teacherExample: `<!DOCTYPE html>
<html>
<head>
  <title>Prayxis Academy — Day 02</title>
</head>
<body>
  <h1>Welcome to Lesson 02</h1>
  <p>Compare the browser tab title with the h1 heading.</p>
</body>
</html>`,
    whatYouShouldSee:
      'The browser tab displays "Prayxis Academy — Day 02" while the page viewport displays the <h1> heading.',
    microPractice: {
      prompt: 'Set the webpage tab title to "My Portfolio Website".',
      starterCode: `<!DOCTYPE html>
<html>
<head>
  <title>My Portfolio Website</title>
</head>
<body>
  <h1>John Doe Developer</h1>
</body>
</html>`,
    },
    commonMistakes: [
      'Confusing <title> (browser tab title) with <h1> (visible webpage heading).',
      'Placing <title> inside <body> instead of <head>.',
    ],
    question: {
      text: 'Where does the text inside the <title> tag appear?',
      options: [
        'As a big bold heading on the webpage body',
        'In the browser tab at the top of your screen and search engine titles',
        'At the bottom footer of the screen',
        'Inside a pop-up alert dialog',
      ],
      correctIndex: 1,
      explanation: 'The <title> element sets the text shown on browser tabs and search engine search results.',
    },
  },

  {
    id: 8,
    title: '08 — <body> Section',
    concept: '<body> SECTION',
    easyExplanation:
      'The <body> section contains all the visible content of the webpage. Everything a visitor sees and interacts with on screen — headings, paragraphs, images, buttons, and forms — is placed inside the <body> and </body> tags.',
    realExample:
      'When you scroll down a website, read articles, click buttons, or watch videos, you are interacting with elements inside the <body> section.',
    whereDoWeSeeIt: 'Directly beneath </head> and inside <html>.',
    why: 'The browser renders everything inside <body> inside the active window viewport.',
    visualType: 'dom-tree',
    syntax: '<body>\n  <h1>Main Heading</h1>\n  <p>Visible paragraph text...</p>\n</body>',
    syntaxBreakdown: [
      '<body> : Opens the visible content viewport area.',
      '</body> : Closes the visible content section.',
    ],
    teacherExample: `<!DOCTYPE html>
<html>
<head>
  <title>Body Section Demo</title>
</head>
<body>
  <h1>Everything Here is Visible</h1>
  <p>Headings, paragraphs, and buttons sit inside body.</p>
</body>
</html>`,
    whatYouShouldSee: 'The browser renders the h1 and paragraph inside the main screen area.',
    microPractice: {
      prompt: 'Add a heading and paragraph inside the <body> tag.',
      starterCode: `<!DOCTYPE html>
<html>
<head>
  <title>Body Practice</title>
</head>
<body>

  <h1>My First Structured Body</h1>
  <p>Visible content sits inside body.</p>

</body>
</html>`,
    },
    commonMistakes: [
      'Putting <title> inside <body>.',
      'Writing visible content outside <body> or after </body>.',
    ],
    question: {
      text: 'Which HTML section contains all visible webpage content shown to users?',
      options: ['<head>', '<title>', '<body>', '<!DOCTYPE>'],
      correctIndex: 2,
      explanation: 'The <body> section holds all visible page content rendered inside the browser viewport.',
    },
  },

  {
    id: 9,
    title: '09 — Complete HTML Structure',
    concept: 'COMPLETE HTML STRUCTURE',
    easyExplanation:
      'Now we combine everything we have learned into one complete, professional HTML document skeleton! Every single professional website on the internet follows this exact skeleton structure.',
    realExample: 'Here is the complete 10-line skeleton that powers millions of websites across the world:',
    whereDoWeSeeIt: 'Line-by-line breakdown of a professional HTML file:',
    why: 'Mastering this skeleton enables you to write clean, valid HTML documents from absolute scratch.',
    visualType: 'dom-tree',
    syntax: `<!DOCTYPE html>
<html>
  <head>
    <title>My First Website</title>
  </head>
  <body>
    <h1>Welcome to My Website</h1>
    <p>This is my first structured webpage.</p>
  </body>
</html>`,
    syntaxBreakdown: [
      'Line 1: <!DOCTYPE html> → Modern HTML5 declaration directive.',
      'Line 2: <html> → Root container opening tag.',
      'Line 3: <head> → Document metadata section opening tag.',
      'Line 4: <title>My First Website</title> → Browser tab title.',
      'Line 5: </head> → Closes head metadata section.',
      'Line 6: <body> → Visible content section opening tag.',
      'Line 7: <h1>Welcome to My Website</h1> → Main visible heading.',
      'Line 8: <p>This is my first structured webpage.</p> → Paragraph content.',
      'Line 9: </body> → Closes visible content section.',
      'Line 10: </html> → Closes root document container.',
    ],
    teacherExample: `<!DOCTYPE html>
<html>
  <head>
    <title>Prayxis Master Skeleton</title>
  </head>
  <body>
    <h1>Full Stack Web Development</h1>
    <p>Day 02 complete HTML document skeleton.</p>
  </body>
</html>`,
    whatYouShouldSee: 'A fully valid HTML5 document parsed cleanly by the web browser.',
    microPractice: {
      prompt: 'Review the complete HTML skeleton.',
      starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>Complete Structure</title>
  </head>
  <body>

    <h1>Mastering HTML Skeleton</h1>
    <p>Every professional website uses this foundation.</p>

  </body>
</html>`,
    },
    commonMistakes: [
      'Swapping the order of <head> and <body>.',
      'Forgetting closing tags for </head>, </body>, or </html>.',
    ],
    question: {
      text: 'What is the correct order of document sections in a standard HTML file?',
      options: [
        '<html> → <body> → <head> → <!DOCTYPE html>',
        '<!DOCTYPE html> → <html> → <head> → <body>',
        '<body> → <head> → <html> → <!DOCTYPE html>',
        '<!DOCTYPE html> → <body> → <head> → <html>',
      ],
      correctIndex: 1,
      explanation: 'Standard order: <!DOCTYPE html> first, followed by <html>, then <head>, and finally <body>.',
    },
  },

  {
    id: 10,
    title: '10 — HTML Indentation & Clean Code',
    concept: 'HTML INDENTATION & CLEAN CODE',
    easyExplanation:
      'Indentation means adding spaces (usually 2 or 4 spaces) to show which elements are nested inside other elements. Browsers don\'t care about indentation — they read messy code just fine. But HUMANS (you, your team, and future employers) need clean, indented code to read and maintain web projects easily!',
    realExample:
      'Compare messy code vs indented code below. Indented code makes it instantly clear which tags sit inside <head> and <body>.',
    whereDoWeSeeIt: 'Industry best practice in software engineering teams worldwide.',
    why: 'Clean code prevents bugs, speeds up debugging, and makes code reviews easy.',
    visualType: 'code-editor',
    syntax: '<!-- GOOD CLEAN INDENTATION -->\n<!DOCTYPE html>\n<html>\n  <head>\n    <title>Clean Code</title>\n  </head>\n  <body>\n    <h1>Indented Heading</h1>\n  </body>\n</html>',
    syntaxBreakdown: [
      'Root <html> is at column 0.',
      'Direct children (<head>, <body>) are indented by 2 spaces.',
      'Grandchildren (<title>, <h1>) are indented by 4 spaces.',
    ],
    teacherExample: `<!DOCTYPE html>
<html>
  <head>
    <title>Clean Indentation</title>
  </head>
  <body>
    <h1>Easy to Read</h1>
    <p>Indentation reveals document hierarchy.</p>
  </body>
</html>`,
    whatYouShouldSee: 'Clear visual tree structure in your code editor.',
    microPractice: {
      prompt: 'Examine properly indented HTML structure.',
      starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>Clean Code Demo</title>
  </head>
  <body>
    <h1>Properly Indented HTML</h1>
    <p>Notice how nested tags are indented by 2 spaces.</p>
  </body>
</html>`,
    },
    commonMistakes: [
      'Thinking indentation changes the visual design on the browser screen (Indentation is purely for developer code readability!).',
      'Mixing tabs and random space counts haphazardly.',
    ],
    question: {
      text: 'What is the main purpose of HTML code indentation?',
      options: [
        'It changes font sizes on the rendered webpage',
        'It makes code structure easy for developers to read and maintain',
        'It speeds up internet connection speeds',
        'It converts HTML into Python code',
      ],
      correctIndex: 1,
      explanation: 'Indentation visualizes element nesting and makes code clean and readable for human developers.',
    },
  },

  {
    id: 11,
    title: '11 — HTML Comments',
    concept: 'HTML COMMENTS',
    easyExplanation:
      'HTML comments are notes written in code for developers. The web browser completely ignores comments and does NOT display them on the webpage screen. They are written using the syntax: <!-- This is a comment -->.',
    realExample:
      'Developers use comments to label sections of code (e.g. <!-- Navigation Bar -->, <!-- Main Header -->, <!-- Footer -->) so everyone understands the file.',
    whereDoWeSeeIt: 'Inside HTML code files to document code logic and section boundaries.',
    why: 'Comments help developers leave reminders, explain complex markup, and organize large HTML documents.',
    visualType: 'code-editor',
    syntax: '<!-- This is an HTML comment -->',
    syntaxBreakdown: [
      '<!-- : Opens an HTML comment.',
      'Comment Text: Developer notes ignored by browser renderer.',
      '--> : Closes the HTML comment.',
    ],
    teacherExample: `<body>
  <!-- Main Header Section -->
  <h1>Welcome to Prayxis</h1>

  <!-- Introduction Paragraph -->
  <p>Learning HTML comments today.</p>
</body>`,
    whatYouShouldSee: 'The browser renders only the h1 and paragraph. The comments remain invisible on screen.',
    microPractice: {
      prompt: 'Add an HTML comment above the heading tag.',
      starterCode: `<body>
  <!-- Header Section Note -->
  <h1>Welcome to Prayxis</h1>
  <p>Comments are hidden from webpage visitors.</p>
</body>`,
    },
    commonMistakes: [
      'Using JavaScript // comments or C# /* */ comments inside HTML files (HTML comments MUST use <!-- -->!).',
      'Forgetting to close a comment with -->, which accidentally hides the rest of your webpage!',
    ],
    question: {
      text: 'Which syntax creates a valid HTML comment?',
      options: [
        '// This is a comment',
        '/* This is a comment */',
        '<!-- This is a comment -->',
        '# This is a comment',
      ],
      correctIndex: 2,
      explanation: 'HTML comments must use the opening <!-- and closing --> syntax.',
    },
  },

  {
    id: 12,
    title: '12 — Build Your Document',
    concept: 'BUILD YOUR DOCUMENT (HANDS-ON)',
    easyExplanation:
      'It is time to put your knowledge into practice! Open your code editor and build a complete HTML document from scratch. Follow all 9 structural rules to construct a valid index.html file.',
    realExample:
      'Build an index.html file with DOCTYPE, html root, head section with title "About Me", body section with h1 heading, paragraph text, proper indentation, and HTML comments.',
    whereDoWeSeeIt: 'Your first hands-on document assembly challenge.',
    why: 'Writing complete documents independently builds real muscle memory for web development.',
    visualType: 'code-editor',
    syntax: `<!DOCTYPE html>
<html>
  <head>
    <title>About Me</title>
  </head>
  <body>
    <!-- Main introduction -->
    <h1>Hello, I am a Web Developer</h1>
    <p>I am learning Full Stack Web Development.</p>
  </body>
</html>`,
    syntaxBreakdown: [
      'Rule 1: Modern <!DOCTYPE html> declaration on line 1.',
      'Rule 2: Outer <html> root container.',
      'Rule 3: <head> with <title> inside.',
      'Rule 4: <body> with <h1>, <p>, and <!-- comment -->.',
      'Rule 5: Proper 2-space indentation.',
    ],
    teacherExample: `<!DOCTYPE html>
<html>
  <head>
    <title>About Me</title>
  </head>
  <body>
    <!-- Main introduction -->
    <h1>Hello, I am a Developer</h1>
    <p>Learning Full Stack Web Development at Prayxis Academy.</p>
  </body>
</html>`,
    whatYouShouldSee: 'A clean, valid HTML document rendering your heading and paragraph.',
    microPractice: {
      prompt: 'Practice building a structured HTML document.',
      starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>Developer Profile</title>
  </head>
  <body>
    <!-- Student Header -->
    <h1>Prashant — Full Stack Intern</h1>
    <p>Building clean structured HTML pages.</p>
  </body>
</html>`,
    },
    commonMistakes: [
      'Omitting the DOCTYPE declaration.',
      'Forgetting to close the </body> or </html> tags at the end.',
    ],
    question: {
      text: 'Which element should contain the visible <h1> heading in a clean HTML document?',
      options: ['<head>', '<title>', '<body>', '<!DOCTYPE html>'],
      correctIndex: 2,
      explanation: 'Visible headings belong inside the <body> section of the document.',
    },
  },

  {
    id: 13,
    title: '13 — Practice Lab',
    concept: 'PRACTICE LAB & STRUCTURE MATCHING',
    easyExplanation:
      'Test your mastery of HTML document structure across multiple practice exercises! Match elements to their correct placement, order structural tags, and verify document rules.',
    realExample:
      'Practice 01: College Page | Practice 02: Portfolio Page | Practice 03: Element Matching | Practice 04: Order Hierarchy | Practice 05: True/False Check.',
    whereDoWeSeeIt: 'Interactive practice lab for Day 02.',
    why: 'Reinforces theoretical concepts with immediate practical feedback.',
    visualType: 'tag-nesting',
    syntax: 'DOCTYPE → First Line Declaration\ntitle → Inside <head>\nheading (h1) → Inside <body>\nparagraph (p) → Inside <body>\nhead → Document Metadata\nbody → Visible Webpage Content',
    syntaxBreakdown: [
      'DOCTYPE: First line declaration directive.',
      'title: Belongs inside <head>.',
      'h1 & p: Belong inside <body>.',
    ],
    teacherExample: `<!DOCTYPE html>
<html>
  <head>
    <title>My College</title>
  </head>
  <body>
    <!-- College Header -->
    <h1>Welcome to My College</h1>
    <p>I am learning web development.</p>
  </body>
</html>`,
    whatYouShouldSee: 'All practice items correctly organized according to HTML document standards.',
    microPractice: {
      prompt: 'Complete Practice 01: College Page Structure.',
      starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>My College</title>
  </head>
  <body>
    <h1>Welcome to My College</h1>
    <p>I am learning web development.</p>
  </body>
</html>`,
    },
    commonMistakes: [
      'Placing <title> inside <body> during practice.',
      'Confusing DOCTYPE with an HTML root element.',
    ],
    question: {
      text: 'True or False: The <title> element belongs inside <head>, while <h1> belongs inside <body>.',
      options: [
        'True — <title> is metadata in head, <h1> is visible content in body',
        'False — Both belong inside <head>',
        'False — Both belong inside <body>',
        'False — Neither belongs inside <html>',
      ],
      correctIndex: 0,
      explanation: '<title> provides document metadata inside <head>, while <h1> renders visible content inside <body>.',
    },
  },

  {
    id: 14,
    title: '14 — Debugging Lab',
    concept: 'DEBUGGING LAB (FIX BROKEN HTML)',
    easyExplanation:
      'Professional developers spend significant time debugging broken HTML! In this lab, analyze broken HTML code snippets, identify structural bugs (missing tags, wrong section order, invalid nesting), and fix them.',
    realExample:
      'Bug 01: Missing </p> closing tag | Bug 02: <head> placed inside <body> | Bug 03: <title> closed with </head> | Bug 04: Structural validity check | Bug 05: Improper nesting.',
    whereDoWeSeeIt: 'Real-world code reviews and bug fixing.',
    why: 'Debugging sharpens your eye for syntax errors and structural integrity.',
    visualType: 'code-editor',
    syntax: '<!-- BUG 05 FIX -->\n<!-- BROKEN: <p><strong>Text</p></strong> -->\n<!-- FIXED:  <p><strong>Text</strong></p> -->',
    syntaxBreakdown: [
      'Bug 01: Always close paragraph tags with </p>.',
      'Bug 02: Never place <head> inside <body>.',
      'Bug 03: Always close <title> with </title>.',
      'Bug 05: Always close inner nested tags before outer tags.',
    ],
    teacherExample: `<!-- BUG FIX DEMO -->
<!DOCTYPE html>
<html>
  <head>
    <title>Fixed Document</title>
  </head>
  <body>
    <h1>Correctly Placed Heading</h1>
    <p>Fixed missing closing tag here.</p>
  </body>
</html>`,
    whatYouShouldSee: 'Clean, error-free HTML parsing in the browser engine.',
    microPractice: {
      prompt: 'Fix the structural bug: <head> placed inside <body>.',
      starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>Fixed Header Order</title>
  </head>
  <body>
    <h1>Webpage Content</h1>
  </body>
</html>`,
    },
    commonMistakes: [
      'Overlooking missing closing slash / in closing tags.',
      'Not paying attention to tag opening and closing order.',
    ],
    question: {
      text: 'What is the bug in this code: <p><strong>Hello</p></strong> ?',
      options: [
        'Missing DOCTYPE declaration',
        'Improper nesting: <p> is closed before <strong> is closed',
        'The word Hello is misspelled',
        'Missing <html> tag',
      ],
      correctIndex: 1,
      explanation: 'Inner tag <strong> must be closed BEFORE closing outer tag <p>. Correct form: <p><strong>Hello</strong></p>.',
    },
  },

  {
    id: 15,
    title: '15 — Mini Project & Final Challenge',
    concept: 'MINI PROJECT & FINAL CHALLENGE',
    easyExplanation:
      'Congratulations on reaching Step 15! You are now ready for the Day 02 Capstone Mini Project: "MY FIRST STRUCTURED WEBPAGE". Build a complete personal introduction webpage from scratch applying all 10 structural requirements!',
    realExample:
      'Construct your personal webpage containing DOCTYPE, html root, head section, title "About Prashant", body section, 1 main heading, 2 paragraphs, 2 HTML comments, and proper indentation.',
    whereDoWeSeeIt: 'Final verification for Day 02 of Full Stack Web Development.',
    why: 'Demonstrates complete mastery of HTML document structure before moving to Day 03.',
    visualType: 'browser-flow',
    syntax: `<!DOCTYPE html>
<html>
  <head>
    <title>About Prashant</title>
  </head>
  <body>
    <!-- Main Heading -->
    <h1>Hello, I am Prashant</h1>

    <!-- About Me Section -->
    <p>I am learning Full Stack Web Development at Prayxis Academy.</p>
    <p>My goal is to build production-grade software applications.</p>
  </body>
</html>`,
    syntaxBreakdown: [
      '✓ DOCTYPE declaration present',
      '✓ html root container present',
      '✓ head section with title tag',
      '✓ body section with h1 and two paragraphs',
      '✓ HTML comments documenting code sections',
      '✓ Proper indentation and valid tag nesting',
    ],
    teacherExample: `<!DOCTYPE html>
<html>
  <head>
    <title>About Prashant</title>
  </head>
  <body>
    <!-- Main Heading -->
    <h1>Hello, I am Prashant</h1>

    <!-- About Me Section -->
    <p>I am learning Full Stack Web Development.</p>
    <p>My goal is to become a professional web developer.</p>
  </body>
</html>`,
    whatYouShouldSee: 'A complete, clean, structured HTML webpage.',
    microPractice: {
      prompt: 'Complete your final Day 02 mini project code structure below.',
      starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>About Prashant</title>
  </head>
  <body>
    <!-- Main Heading -->
    <h1>Hello, I am Prashant</h1>

    <!-- About Me Section -->
    <p>I am learning Full Stack Web Development.</p>
    <p>My goal is to become a professional web developer.</p>
  </body>
</html>`,
    },
    commonMistakes: [
      'Using CSS, JavaScript, or complex tags (Day 02 is strictly about pure HTML document structure!).',
      'Skipping HTML comments or proper indentation.',
    ],
    question: {
      text: 'Which 10-line skeleton forms the foundation of every valid HTML5 webpage?',
      options: [
        'DOCTYPE → html → head → title → /head → body → h1 → p → /body → /html',
        'body → head → html → DOCTYPE',
        'title → h1 → p → body → html',
        'DOCTYPE → body → head → html',
      ],
      correctIndex: 0,
      explanation: 'Every valid modern HTML webpage follows: DOCTYPE → html → head (title) → body (content).',
    },
  },
];

export const DAY_02_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Which declaration normally appears at the beginning of an HTML document?',
    options: ['<html>', '<!DOCTYPE html>', '<head>', '<body>'],
    correctIndex: 1,
    explanation: '<!DOCTYPE html> must appear on line 1 to declare modern HTML5 standards to the browser.',
  },
  {
    id: 2,
    question: 'Which element is the root element of an HTML document?',
    options: ['<body>', '<head>', '<html>', '<title>'],
    correctIndex: 2,
    explanation: 'The <html> element is the root container holding all other document elements.',
  },
  {
    id: 3,
    question: 'Where does <title> normally belong?',
    options: ['<body>', '<head>', 'Outside html', 'Inside h1'],
    correctIndex: 1,
    explanation: 'The <title> element provides document metadata and MUST be placed inside <head>.',
  },
  {
    id: 4,
    question: 'Where is visible webpage content normally placed?',
    options: ['<head>', '<title>', '<body>', '<!DOCTYPE>'],
    correctIndex: 2,
    explanation: 'All visible text, headings, buttons, and images belong inside the <body> section.',
  },
  {
    id: 5,
    question: 'What does nesting mean in HTML?',
    options: [
      'Deleting HTML code files',
      'Putting one HTML element inside another HTML element',
      'Adding CSS stylesheets',
      'Running JavaScript functions',
    ],
    correctIndex: 1,
    explanation: 'Nesting is placing child elements inside parent elements (e.g. <p><strong>Text</strong></p>).',
  },
  {
    id: 6,
    question: 'Which code snippet is correctly nested?',
    options: [
      '<p><strong>Hello</p></strong>',
      '<p><strong>Hello</strong></p>',
      '<strong><p>Hello</strong></p>',
      '<p><strong>Hello',
    ],
    correctIndex: 1,
    explanation: 'The inner <strong> tag must close BEFORE the outer <p> tag closes.',
  },
  {
    id: 7,
    question: 'What is the purpose of HTML indentation?',
    options: [
      'It changes the font design on the browser screen',
      'It makes code structure easier for human developers to read and maintain',
      'It replaces HTML tags with CSS',
      'It connects to a backend database',
    ],
    correctIndex: 1,
    explanation: 'Indentation visualizes nested parent-child tag hierarchy for developer readability.',
  },
  {
    id: 8,
    question: 'Which syntax creates a valid HTML comment?',
    options: ['// comment', '/* comment */', '<!-- comment -->', '# comment'],
    correctIndex: 2,
    explanation: 'HTML comments use opening <!-- and closing --> tags.',
  },
  {
    id: 9,
    question: 'Which element contains document metadata such as title?',
    options: ['<body>', '<head>', '<h1>', '<p>'],
    correctIndex: 1,
    explanation: 'The <head> section contains document information and metadata.',
  },
  {
    id: 10,
    question: 'Which is the correct basic HTML document structure?',
    options: [
      '<html><body><head></head></body></html>',
      '<!DOCTYPE html><html><head><title>Page</title></head><body><h1>Hello</h1></body></html>',
      '<body><head><title>Page</title></head></body>',
      '<!DOCTYPE html><body><head></head></body>',
    ],
    correctIndex: 1,
    explanation: 'Standard order: <!DOCTYPE html> → <html> → <head> → <title> → </head> → <body> → <h1> → </body> → </html>.',
  },
];

export const DAY_02_CHECKLIST: string[] = [
  'I understand what an HTML document is',
  'I understand <!DOCTYPE html>',
  'I understand the <html> root element',
  'I understand HTML nesting',
  'I understand <head>',
  'I understand <title>',
  'I understand <body>',
  'I can create a complete HTML structure',
  'I understand indentation',
  'I can write HTML comments',
  'I can debug basic HTML structure problems',
  'I can create an HTML page from scratch',
];
