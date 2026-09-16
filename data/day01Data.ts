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

export const DAY_01_STEPS: LessonStep[] = [
  {
    id: 1,
    title: '01 — What is a Webpage?',
    concept: 'WHAT IS A WEBPAGE?',
    easyExplanation: 'A webpage is an interactive document displayed inside a web browser (like Google Chrome, Microsoft Edge, or Safari). Behind the scenes, it is simply a text file filled with HTML code instructions that your browser reads, interprets, and converts into visual headings, text, images, and buttons.',
    realExample: 'When you visit Google.com, YouTube.com, or Amazon.in, your browser downloads a text file containing HTML code instructions and renders it into the colorful screen layout you interact with.',
    whereDoWeSeeIt: 'Inside your web browser window every time you open a website on a laptop, tablet, or smartphone.',
    why: 'Computers cannot guess how a webpage should look. Web developers write exact HTML code instructions so browsers know where to place headings, paragraphs, and elements.',
    visualType: 'browser-flow',
    syntax: 'index.html (Code File) ──▶ Web Browser (Code Reader) ──▶ Webpage (Visual Screen)',
    syntaxBreakdown: [
      'Source Code: Plain text file (.html) stored on a computer or server.',
      'Web Browser: Software (Chrome/Edge/Safari) that parses and compiles HTML code.',
      'Rendered Webpage: The visual user interface (UI) displayed on your monitor.',
    ],
    teacherExample: `<!DOCTYPE html>
<html>
<head>
  <title>My First Webpage</title>
</head>
<body>
  <h1>Welcome to My Website!</h1>
  <p>This is a real webpage rendered by the browser.</p>
</body>
</html>`,
    whatYouShouldSee: 'The browser reads the HTML code instructions and displays a clean webpage featuring a bold heading title and paragraph text.',
    microPractice: {
      prompt: 'Observe how HTML code instructions inside an index.html file render into a visual webpage layout.',
      starterCode: `<!DOCTYPE html>
<html>
<head>
  <title>My Webpage</title>
</head>
<body>

  <h1>My First Webpage</h1>
  <p>Browsers convert code into visual interfaces.</p>

</body>
</html>`,
    },
    commonMistakes: [
      'Thinking browsers create website content automatically without code instructions.',
      'Thinking a webpage is a static image file rather than an interactive document compiled from text code.',
    ],
    question: {
      text: 'What actually happens when you type a web address into Google Chrome or Edge?',
      options: [
        'The browser automatically creates graphics without reading code',
        'The browser reads HTML code instructions and renders a visual webpage on your screen',
        'The browser deletes your local computer files',
        'The browser converts images into text documents',
      ],
      correctIndex: 1,
      explanation: 'The browser fetches the website text file, parses its HTML code instructions, and renders the visual webpage on your screen.',
    },
  },
  {
    id: 2,
    title: '02 — What is HTML?',
    concept: 'WHAT IS HTML?',
    easyExplanation: 'HTML stands for HyperText Markup Language. It is the mandatory core foundational language used to build the structural skeleton of EVERY single webpage on the internet.',
    realExample: 'Just like building a house requires a solid pillar and beam frame before painting walls or adding electrical wiring, building a website requires HTML to create structural headings, paragraphs, text blocks, and buttons.',
    whereDoWeSeeIt: 'In 100% of websites across the world — from Wikipedia and Google to YouTube and Instagram.',
    why: 'Without HTML, there is no structure. CSS (styling) and JavaScript (interactivity) cannot function without an HTML structural skeleton to attach to.',
    visualType: 'html-structure',
    syntax: 'HTML (Structural Skeleton) + CSS (Visual Design & Colors) + JavaScript (Logic & Actions)',
    syntaxBreakdown: [
      'HTML: Creates structural elements (headings <h1>, paragraphs <p>, containers <body>).',
      'CSS: Adds design, colors, fonts, margins, and layout styles.',
      'JavaScript: Adds dynamic logic, button clicks, popups, and server communication.',
    ],
    teacherExample: `<!DOCTYPE html>
<html>
<head>
  <title>HTML Skeleton Example</title>
</head>
<body>
  <!-- HTML defines structural content -->
  <h1>Structural Heading</h1>
  <p>Paragraph text inside the structural skeleton.</p>
</body>
</html>`,
    whatYouShouldSee: 'HTML builds the complete structural content hierarchy before any CSS paint or JavaScript interactive wiring is applied.',
    microPractice: {
      prompt: 'Examine the HTML structural layer inside the sandbox editor below.',
      starterCode: `<!DOCTYPE html>
<html>
<head>
  <title>HTML Structural Skeleton</title>
</head>
<body>

  <!-- HTML Layer: Structural Content -->
  <h1>Page Structure Defined by HTML</h1>
  <p>HTML is the skeleton of web development.</p>

</body>
</html>`,
    },
    commonMistakes: [
      'Calling HTML a programming language. (HTML is a markup language for document structure, not logic/loops).',
      'Assuming CSS or JavaScript can build a webpage without an HTML structure.',
    ],
    question: {
      text: 'Which web technology provides the core structural skeleton of every webpage?',
      options: ['CSS', 'JavaScript', 'HTML', 'Python'],
      correctIndex: 2,
      explanation: 'HTML provides the mandatory structural skeleton of every webpage.',
    },
  },
  {
    id: 3,
    title: '03 — HTML Tags & Elements',
    concept: 'HTML TAGS & ELEMENTS',
    easyExplanation: 'An HTML Tag is a code keyword wrapped in angle brackets like `<p>` or `<h1>`. An Element is the complete piece formed by Opening Tag + Content + Closing Tag.',
    realExample: 'Writing `<p>Hello World</p>` tells the browser: "Start a paragraph here (`<p>`), put the text `Hello World` inside, and end the paragraph (`</p>`)."',
    whereDoWeSeeIt: 'Every single piece of text, image, link, or container in HTML code is wrapped inside tags.',
    why: 'Browsers do not understand plain raw text without tags. Tags tell the browser whether text should be displayed as a large main title (`<h1>`), a paragraph (`<p>`), or tab metadata (`<title>`).',
    visualType: 'tag-breakdown',
    syntax: '<tagname> Inner Content </tagname>',
    syntaxBreakdown: [
      '<p>  ← Opening Tag (tells browser where the element starts)',
      'Inner Content ← Text or nested tags inside the element',
      '</p> ← Closing Tag (tells browser where element ends, always includes forward slash /)',
    ],
    teacherExample: `<!DOCTYPE html>
<html>
<head>
  <title>Tags & Elements</title>
</head>
<body>
  <!-- Opening Tag + Content + Closing Tag = HTML Element -->
  <h1>Main Title Element</h1>
  <p>Paragraph Element with text content.</p>
</body>
</html>`,
    whatYouShouldSee: 'The browser renders "Main Title Element" and "Paragraph Element" cleanly on screen, automatically hiding the raw `<p>` and `<h1>` code tags.',
    microPractice: {
      prompt: 'Modify the inner content inside the `<p>` opening and `</p>` closing tags to your own custom text.',
      starterCode: `<!DOCTYPE html>
<html>
<head>
  <title>Tag Practice</title>
</head>
<body>

  <!-- Change the text between <p> and </p> -->
  <p>Change this text to your full name</p>

</body>
</html>`,
    },
    commonMistakes: [
      'Forgetting the forward slash `/` in closing tags (e.g. writing `<p>Hello<p>` instead of `</p>`).',
      'Mismatched tag names (e.g. opening with `<h1>` and accidentally closing with `</h2>`).',
    ],
    question: {
      text: 'How can you distinguish an HTML closing tag from an opening tag?',
      options: [
        'Closing tags are written in ALL CAPS',
        'Closing tags begin with a forward slash (/) right after the opening bracket, like </p>',
        'Closing tags use square brackets [...] instead of angle brackets',
        'Closing tags do not exist in HTML',
      ],
      correctIndex: 1,
      explanation: 'Closing tags always start with a forward slash (e.g. `</p>`, `</h1>`, `</body>`).',
    },
  },
  {
    id: 4,
    title: '04 — Your First HTML File & ! Shortcut',
    concept: 'YOUR FIRST HTML FILE & ! EMMET SHORTCUT',
    easyExplanation: 'An HTML file is a text file saved with the `.html` extension. The standard reserved homepage name for every website is `index.html`. You can type `!` and press Enter/Tab in modern code editors to automatically generate a full HTML template!',
    realExample: 'When you open `index.html` in Google Chrome, the operating system recognizes the `.html` extension and opens it as a webpage.',
    whereDoWeSeeIt: 'In every web project folder on your laptop or cloud web servers.',
    why: 'Without the `.html` extension, operating systems treat your code file as plain notepad text.',
    visualType: 'browser-flow',
    syntax: 'index.html  |  Emmet Shortcut: ! + Enter/Tab',
    syntaxBreakdown: [
      'index: Standard reserved filename for a website homepage.',
      '.html: Extension instructing operating systems to parse the file in a browser.',
      '! Shortcut: Typing ! and pressing Enter/Tab instantly generates the full HTML boilerplate template.',
    ],
    teacherExample: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My First HTML Page</title>
</head>
<body>

  <h1>My First Homepage</h1>
  <p>Created using index.html and modern HTML tags.</p>

</body>
</html>`,
    whatYouShouldSee: 'Double-clicking `index.html` opens your web browser and displays your structured HTML webpage.',
    microPractice: {
      prompt: 'Try the Emmet shortcut: Clear the editor below, type `!` (exclamation mark), and press Enter or Tab (or click ⚡ ! TEMPLATE button above)!',
      starterCode: `!`,
    },
    commonMistakes: [
      'Accidentally saving files as `index.html.txt` in Notepad.',
      'Using uppercase letters or spaces in filenames like `My Page.HTML`. Always use lowercase `index.html`.',
    ],
    question: {
      text: 'What is the standard reserved filename for the default homepage of a website, and what shortcut auto-generates its template?',
      options: [
        'home.txt (Shortcut: Ctrl+Alt+Del)',
        'main.doc (Shortcut: F5)',
        'index.html (Shortcut: Type ! and press Enter/Tab)',
        'website.jpg (Shortcut: Alt+F4)',
      ],
      correctIndex: 2,
      explanation: '`index.html` is the standard reserved homepage filename, and typing `!` + Enter/Tab auto-generates its complete boilerplate template.',
    },
  },
  {
    id: 5,
    title: '05 — <!DOCTYPE html>',
    concept: '<!DOCTYPE html> — DOCUMENT DECLARATION',
    easyExplanation: '`<!DOCTYPE html>` is mandatory Line 1 code that instructs the web browser to parse and render the document using modern HTML5 rules.',
    realExample: 'It acts like showing an official ID card at airport security, declaring your exact document standard before entry.',
    whereDoWeSeeIt: 'At Line 1 at the very top of EVERY modern HTML document.',
    why: 'Without `<!DOCTYPE html>`, web browsers may fall back into legacy "Quirks Mode", causing layout bugs, missing styles, and broken fonts.',
    visualType: 'doctype-parser',
    syntax: '<!DOCTYPE html>',
    syntaxBreakdown: [
      '<!DOCTYPE: Declaration keyword (case-insensitive, but uppercase is standard convention).',
      'html: Specifies modern HTML5 document type rules.',
    ],
    teacherExample: `<!DOCTYPE html>
<html>
<head>
  <title>HTML5 Declaration</title>
</head>
<body>
  <h1>Modern HTML5 Active</h1>
  <p>Line 1 declares HTML5 document standard to the browser parser.</p>
</body>
</html>`,
    whatYouShouldSee: 'The browser compiles the page using strict modern HTML5 rendering standards across all browsers.',
    microPractice: {
      prompt: 'Add the mandatory Line 1 document type declaration at the top of the HTML structure.',
      starterCode: `<!DOCTYPE html>
<html>
<head>
  <title>DOCTYPE Test</title>
</head>
<body>

  <h1>HTML5 Standard Active</h1>

</body>
</html>`,
    },
    commonMistakes: [
      'Placing `<!DOCTYPE html>` inside `<body>` or `<html>`. It MUST be Line 1 at the very top of the file.',
      'Writing a closing `</DOCTYPE>` tag. It is a declaration statement, not an element.',
    ],
    question: {
      text: 'Where MUST <!DOCTYPE html> be placed in an HTML file?',
      options: [
        'Inside the <body> tag',
        'At Line 1 at the very top of the file before <html>',
        'At the bottom after </html>',
        'Inside the <title> tag',
      ],
      correctIndex: 1,
      explanation: '`<!DOCTYPE html>` must always be Line 1 at the very top of the file before `<html>`.',
    },
  },
  {
    id: 6,
    title: '06 — <html> Root Tag',
    concept: '<html> — ROOT CONTAINER ELEMENT',
    easyExplanation: 'The `<html>` tag is the top-most root container element that wraps EVERY single tag, heading, paragraph, and metadata element on your webpage.',
    realExample: 'Think of `<html>` like the hard cover and binder of a book holding all pages securely inside.',
    whereDoWeSeeIt: 'Placed right below `<!DOCTYPE html>` at the top (`<html>`) and at the very last line of code (`</html>`).',
    why: 'Browsers require a single root element boundary to construct the Document Object Model (DOM) tree structure.',
    visualType: 'html-root',
    syntax: '<html> ... all document elements ... </html>',
    syntaxBreakdown: [
      '<html>: Opening root tag (starts document tree).',
      'lang="en": Optional attribute specifying language (English).',
      '</html>: Closing root tag (ends document tree at last line of file).',
    ],
    teacherExample: `<!DOCTYPE html>
<html lang="en">
<head>
  <title>Root Element Example</title>
</head>
<body>
  <h1>Inside Root Container</h1>
  <p>All page content lives inside <html> and </html>.</p>
</body>
</html>`,
    whatYouShouldSee: 'The root `<html>` element establishes outer boundaries for `<head>` (metadata) and `<body>` (visible UI).',
    microPractice: {
      prompt: 'Ensure all document tags sit inside the opening `<html>` and closing `</html>` root tags.',
      starterCode: `<!DOCTYPE html>
<html>
<head>
  <title>Root Container</title>
</head>
<body>

  <h1>Inside <html> Root Element</h1>

</body>
</html>`,
    },
    commonMistakes: [
      'Writing HTML elements outside the opening `<html>` or closing `</html>` root tags.',
      'Forgetting to close `</html>` at the bottom of your code file.',
    ],
    question: {
      text: 'What is the primary role of the <html> tag in an HTML document?',
      options: [
        'To change background colors to cyan',
        'To serve as the top-level root container wrapping all document elements',
        'To link external CSS files',
        'To play video clips',
      ],
      correctIndex: 1,
      explanation: 'The `<html>` element is the master root container wrapping the entire webpage.',
    },
  },
  {
    id: 7,
    title: '07 — <head> & <title>',
    concept: '<head> & <title> — DOCUMENT METADATA',
    easyExplanation: 'The `<head>` section holds hidden metadata (search engine settings, page encoding, scripts). The `<title>` tag inside `<head>` sets the name displayed on the browser window tab bar.',
    realExample: 'When you open YouTube, the tab title shows "YouTube". When you open Google, it shows "Google". That text comes directly from `<title>Google</title>`.',
    whereDoWeSeeIt: 'In the browser window tab bar at the very top of your browser.',
    why: 'Without a `<title>` tag, your browser tab displays an ugly file path URL like `file:///C:/users/doc.html` instead of your website brand name.',
    visualType: 'head-title-tab',
    syntax: `<head>
  <title>Website Tab Name</title>
</head>`,
    syntaxBreakdown: [
      '<head>: Metadata container sibling to <body> inside <html>.',
      '<title>: Specifies browser window tab text.',
      '</title>: Closes title text.',
    ],
    teacherExample: `<!DOCTYPE html>
<html>
<head>
  <title>Prayxis Tech Academy</title>
</head>
<body>
  <h1>Welcome to Prayxis</h1>
  <p>Look at the browser tab bar at the top to see the title!</p>
</body>
</html>`,
    whatYouShouldSee: 'The text "Prayxis Tech Academy" appears in the browser tab bar at the top of your window.',
    microPractice: {
      prompt: 'Change `<title>` text inside `<head>` to "My Developer Portfolio" and observe the browser tab preview update.',
      starterCode: `<!DOCTYPE html>
<html>
<head>
  <title>My Developer Portfolio</title>
</head>
<body>

  <h1>Check the Browser Tab Title</h1>

</body>
</html>`,
    },
    commonMistakes: [
      'Expecting `<title>` text to appear on the webpage body screen. It ONLY appears on the browser window tab bar.',
      'Placing `<title>` inside `<body>` instead of `<head>`.',
    ],
    question: {
      text: 'Where does the text content written inside the <title> tag appear?',
      options: [
        'As a main heading on the webpage body canvas',
        'In the browser window tab bar at the very top',
        'In a popup Javascript alert window',
        'At the bottom page footer',
      ],
      correctIndex: 1,
      explanation: '`<title>` sets the title displayed on the browser window tab bar.',
    },
  },
  {
    id: 8,
    title: '08 — <body> Tag',
    concept: '<body> — VISIBLE CONTENT CANVAS',
    easyExplanation: 'The `<body>` tag holds ALL visible webpage content (headings, paragraphs, images, links, forms, buttons) displayed on the monitor screen.',
    realExample: 'Everything you see, read, or click on a webpage sits inside the `<body>` container.',
    whereDoWeSeeIt: 'On the main visible canvas screen of the browser window.',
    why: 'Browsers render content placed inside `<body>`. Elements placed outside `<body>` will cause unpredictable display bugs.',
    visualType: 'body-canvas',
    syntax: `<body>
  <!-- Visible webpage elements go here -->
</body>`,
    syntaxBreakdown: [
      '<body>: Opening tag for visible page canvas content.',
      '</body>: Closing tag ending visible content (placed right before </html>).',
    ],
    teacherExample: `<!DOCTYPE html>
<html>
<head>
  <title>Visible Canvas Example</title>
</head>
<body>
  <!-- Everything inside <body> is visible on screen -->
  <h1>Visible Heading Title</h1>
  <p>Visible paragraph text displayed on the screen canvas.</p>
</body>
</html>`,
    whatYouShouldSee: 'All headings and paragraph text inside `<body>` render directly onto the visible browser screen canvas.',
    microPractice: {
      prompt: 'Add your own headings and paragraphs inside the `<body>` container tags.',
      starterCode: `<!DOCTYPE html>
<html>
<head>
  <title>Visible Canvas</title>
</head>
<body>

  <!-- Add your visible content inside <body> below -->
  <h1>My Visible Headline</h1>
  <p>This text is visible inside the <body> element.</p>

</body>
</html>`,
    },
    commonMistakes: [
      'Placing visible `<h1>` or `<p>` tags inside `<head>` instead of `<body>`.',
      'Creating multiple `<body>` tags. Exactly ONE `<body>` element is allowed per document.',
    ],
    question: {
      text: 'Which HTML tag contains all the visible screen content displayed on a webpage?',
      options: ['<head>', '<title>', '<body>', '<meta>'],
      correctIndex: 2,
      explanation: 'The `<body>` element wraps all visible webpage screen content.',
    },
  },
  {
    id: 9,
    title: '09 — HTML Headings (<h1> to <h6>)',
    concept: 'HTML HEADINGS — <h1> TO <h6> HIERARCHY',
    easyExplanation: 'HTML provides 6 level heading tags from <h1> down to <h6>. <h1> is the largest and most important primary title of a webpage, while <h6> is the smallest subsection heading.',
    realExample: 'On a news website, <h1> is the main headline, <h2> headings are section names like "Sports" or "Technology", <h3> tags are article subtitles, down to <h6> for tiny footer sub-labels.',
    whereDoWeSeeIt: 'Throughout every webpage to organize titles, sections, and sub-topics into a clean visual and structural outline.',
    why: 'Headings create document hierarchy. Browsers size them automatically, search engines (Google) scan <h1>-<h6> to index your main topics, and screen readers navigate by headings.',
    visualType: 'heading-hierarchy',
    syntax: '<h1>Heading Level 1 (Main Title)</h1>\n<h2>Heading Level 2 (Major Section)</h2>\n<h3>Heading Level 3 (Subsection)</h3>\n<h4>Heading Level 4 (Sub-subsection)</h4>\n<h5>Heading Level 5 (Minor Heading)</h5>\n<h6>Heading Level 6 (Smallest Title)</h6>',
    syntaxBreakdown: [
      '<h1>: Level-1 primary page main title. Exactly ONE <h1> per webpage is recommended for best SEO.',
      '<h2>: Level-2 major section title under the main topic.',
      '<h3>: Level-3 subsection title nested inside an <h2> section.',
      '<h4>, <h5>, <h6>: Deeper sub-topic headings decreasing in font size and structural importance.',
    ],
    teacherExample: `<!DOCTYPE html>
<html>
<head>
  <title>Heading Hierarchy (h1 to h6)</title>
</head>
<body>
  <!-- All 6 HTML Heading Levels -->
  <h1>h1: Main Website Title (Largest)</h1>
  <h2>h2: Major Section Heading</h2>
  <h3>h3: Subsection Heading</h3>
  <h4>h4: Sub-subsection Heading</h4>
  <h5>h5: Minor Sub-heading</h5>
  <h6>h6: Smallest Heading Level</h6>

  <p>Headings create visual hierarchy from h1 (largest) down to h6 (smallest).</p>
</body>
</html>`,
    whatYouShouldSee: 'The browser renders all 6 heading levels on screen, gradually decreasing in text size from <h1> down to <h6>.',
    microPractice: {
      prompt: 'Write all 6 heading levels (<h1> to <h6>) inside the <body> tag below to see their sizing hierarchy.',
      starterCode: `<!DOCTYPE html>
<html>
<head>
  <title>Headings h1 to h6 Practice</title>
</head>
<body>

  <!-- Write h1 to h6 headings below -->
  <h1>h1 Main Headline</h1>
  <h2>h2 Section Title</h2>
  <h3>h3 Subsection Title</h3>
  <h4>h4 Level 4 Title</h4>
  <h5>h5 Level 5 Title</h5>
  <h6>h6 Smallest Title</h6>

</body>
</html>`,
    },
    commonMistakes: [
      'Using multiple <h1> tags on one webpage. Best practice is to use exactly ONE <h1> per page for the main topic.',
      'Skipping heading levels (e.g. jumping directly from <h1> to <h4> without <h2> or <h3>). Always keep a sequential hierarchy.',
      'Using heading tags purely to make text big or bold. Headings define document structure, not just font size (CSS should handle styling).',
    ],
    question: {
      text: 'Which HTML heading tag represents the largest and most important primary title on a webpage, and how many should ideally exist per page?',
      options: [
        '<h6> (as many as you want)',
        '<h1> (exactly ONE per page for primary topic clarity)',
        '<h3> (three per page)',
        '<head> (ten per page)',
      ],
      correctIndex: 1,
      explanation: '`<h1>` represents the single primary main title of a webpage, and a page should have exactly ONE `<h1>` tag for structural clarity and search indexing.',
    },
  },
  {
    id: 10,
    title: '10 — <p> Paragraph',
    concept: '<p> — PARAGRAPH BLOCK',
    easyExplanation: 'The `<p>` tag groups body text into a standalone PARAGRAPH BLOCK with automatic vertical spacing gaps before and after.',
    realExample: 'It is like pressing Enter twice in Microsoft Word or Google Docs to start a new clean paragraph block.',
    whereDoWeSeeIt: 'In all body text sentences across websites.',
    why: 'Without `<p>` tags, all text runs together into an unreadable block of text.',
    visualType: 'paragraph-block',
    syntax: '<p>Paragraph text content goes here.</p>',
    syntaxBreakdown: [
      '<p>: Opening paragraph tag.',
      'Text content inside.',
      '</p>: Closing paragraph tag.',
    ],
    teacherExample: `<!DOCTYPE html>
<html>
<head>
  <title>Paragraph Example</title>
</head>
<body>
  <h1>Paragraph Blocks</h1>
  <p>HTML is the foundation of all web development.</p>
  <p>It organizes text into structured, readable blocks.</p>
</body>
</html>`,
    whatYouShouldSee: 'Two separate text blocks separated by a clean vertical space gap.',
    microPractice: {
      prompt: 'Write two separate `<p>` paragraph blocks inside `<body>` and observe the automatic vertical gap between them.',
      starterCode: `<!DOCTYPE html>
<html>
<head>
  <title>Paragraph Practice</title>
</head>
<body>

  <p>First paragraph block of text.</p>
  <p>Second paragraph block of text.</p>

</body>
</html>`,
    },
    commonMistakes: [
      'Putting headings inside paragraph tags (e.g. `<p><h1>Title</h1></p>`). Keep them separate.',
      'Forgetting the closing `</p>` tag.',
    ],
    question: {
      text: 'What default visual spacing behavior does the <p> element provide?',
      options: [
        'It underlines text in cyan',
        'It automatically adds vertical spacing gaps before and after text blocks',
        'It aligns text to the right edge',
        'It turns text into buttons',
      ],
      correctIndex: 1,
      explanation: '`<p>` creates paragraph blocks with default vertical margin gaps.',
    },
  },
  {
    id: 11,
    title: '11 — <br> Line Break',
    concept: '<br> — SINGLE LINE BREAK',
    easyExplanation: 'The `<br>` tag forces a single LINE BREAK in text without starting a new paragraph block.',
    realExample: 'It is like pressing Shift+Enter in WhatsApp or Slack to move down one line within the same message.',
    whereDoWeSeeIt: 'In street addresses, poetry, or contact details.',
    why: '`<br>` breaks lines without creating large paragraph margin gaps.',
    visualType: 'line-break',
    syntax: 'Line 1<br>Line 2',
    syntaxBreakdown: [
      '<br>: Self-closing void tag (No closing </br> tag needed!).',
    ],
    teacherExample: `<!DOCTYPE html>
<html>
<head>
  <title>Line Break Example</title>
</head>
<body>
  <h1>Contact Us</h1>
  <p>Prayxis Technology Labs<br>Sector 62, Noida<br>Uttar Pradesh, India</p>
</body>
</html>`,
    whatYouShouldSee: 'The address lines break cleanly onto new lines within the same single paragraph block.',
    microPractice: {
      prompt: 'Insert a `<br>` tag between two lines of text to force a single line break.',
      starterCode: `<!DOCTYPE html>
<html>
<head>
  <title>Line Break Practice</title>
</head>
<body>

  <p>Hello World!<br>Welcome to Prayxis Academy.</p>

</body>
</html>`,
    },
    commonMistakes: [
      'Writing closing `</br>` tags. `<br>` is a void element and must NOT have a closing tag.',
      'Using multiple `<br><br><br>` tags to create large gaps. Use separate `<p>` tags instead.',
    ],
    question: {
      text: 'What makes the <br> tag unique compared to <p> tags?',
      options: [
        'It is a self-closing void element that breaks lines without paragraph margins',
        'It requires three closing tags </br></br></br>',
        'It only works inside <head>',
        'It changes text color to red',
      ],
      correctIndex: 0,
      explanation: '`<br>` is a void element that forces a line break without closing tags or paragraph margin gaps.',
    },
  },
  {
    id: 12,
    title: '12 — HTML Comments',
    concept: '<!-- COMMENT --> — DEVELOPER NOTES',
    easyExplanation: 'An HTML comment (`<!-- comment -->`) is a private note written in code that is completely hidden from website visitors.',
    realExample: 'Comments are like sticky notes on a blueprint. Builders read them, but house visitors do not see sticky notes on walls.',
    whereDoWeSeeIt: 'In source code files to document code sections for developers.',
    why: 'Comments help developers document code sections when building complex projects.',
    visualType: 'comment-visibility',
    syntax: '<!-- Developer note here -->',
    syntaxBreakdown: [
      '<!--: Opening comment syntax.',
      'Developer note: Internal documentation text.',
      '-->: Closing comment syntax.',
    ],
    teacherExample: `<!DOCTYPE html>
<html>
<head>
  <title>Comment Example</title>
</head>
<body>
  <!-- Header Section -->
  <h1>Prayxis Academy</h1>
  
  <!-- Main Paragraph -->
  <p>Comments are hidden from website visitors.</p>
</body>
</html>`,
    whatYouShouldSee: 'The heading "Prayxis Academy" and paragraph render on screen, but comment text inside `<!-- ... -->` is completely invisible on the browser screen.',
    microPractice: {
      prompt: 'Write a developer comment above an `<h1>` heading.',
      starterCode: `<!DOCTYPE html>
<html>
<head>
  <title>Comment Practice</title>
</head>
<body>

  <!-- Write developer comment below -->
  <!-- Main Homepage Title -->
  <h1>Visible Page Title</h1>

</body>
</html>`,
    },
    commonMistakes: [
      'Using JavaScript `// comment` syntax instead of HTML `<!-- comment -->`.',
      'Forgetting the closing `-->`, which turns all subsequent HTML code into invisible comments.',
    ],
    question: {
      text: 'How does a browser handle text written inside <!-- comment --> tags?',
      options: [
        'It displays the comment in bold red text',
        'It completely ignores the comment and does not display it on screen',
        'It opens a popup alert',
        'It deletes the file',
      ],
      correctIndex: 1,
      explanation: 'HTML comments are invisible to website visitors and ignored by the browser canvas renderer.',
    },
  },
  {
    id: 13,
    title: '13 — Mini Project: Profile Page Blueprint',
    concept: 'MINI PROJECT: PERSONAL PROFILE PAGE BLUEPRINT',
    easyExplanation: 'Combine all HTML concepts learned today to build a complete personal profile webpage from scratch.',
    realExample: 'Assembling <!DOCTYPE html>, <html>, <head>, <title>, <body>, <h1> to <h6>, <p>, <br>, and comments together into a single index.html file.',
    whereDoWeSeeIt: 'Your first complete index.html web project file.',
    why: 'Building real projects solidifies core concepts before moving forward.',
    visualType: 'document-skeleton',
    syntax: '<!DOCTYPE html>\n<html lang="en">\n  <!-- Complete Webpage Structure -->\n</html>',
    syntaxBreakdown: [
      'Line 1: <!DOCTYPE html> (HTML5 Declaration)',
      'Root Container: <html> ... </html>',
      'Metadata: <head><title>Tab Name</title></head>',
      'Visible Canvas: <body> ... </body>',
    ],
    teacherExample: `<!DOCTYPE html>
<html lang="en">
<head>
  <title>Alex Student Profile</title>
</head>
<body>

  <!-- Developer Note: Header Section -->
  <h1>Alex Student</h1>
  <h2>Web Development Intern</h2>
  <h3>Day 01 Complete</h3>

  <!-- Developer Note: Bio Paragraph -->
  <p>Learning full stack web development at Prayxis Academy.<br>HTML is my foundation.</p>

</body>
</html>`,
    whatYouShouldSee: 'A complete personal profile webpage displaying title, section headings, and formatted line-broken paragraphs.',
    microPractice: {
      prompt: 'Assemble your own student profile webpage using all Day 01 tags (or type ! and press Enter to generate the template!).',
      starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <title>My Student Profile</title>
</head>
<body>

  <!-- Build your profile page below -->
  <h1>Your Full Name</h1>
  <h2>Full Stack Developer</h2>

</body>
</html>`,
    },
    commonMistakes: [
      'Nesting `<head>` inside `<body>` or placing visible `<h1>` tags inside `<head>`. Keep `<head>` and `<body>` separate siblings inside `<html>`.',
    ],
    question: {
      text: 'Which section of an HTML document contains the visible <h1> headings and <p> paragraphs?',
      options: ['<head>', '<body>', '<title>', '<!DOCTYPE>'],
      correctIndex: 1,
      explanation: 'All visible content belongs inside the `<body>` container.',
    },
  },
  {
    id: 14,
    title: '14 — Day 01 Verification Quiz',
    concept: 'DAY 01 KNOWLEDGE VERIFICATION QUIZ',
    easyExplanation: 'Test your understanding of the core HTML concepts taught in Day 01.',
    why: 'Verifying conceptual understanding ensures you retain foundational knowledge before building advanced projects.',
    visualType: 'html-structure',
    syntax: 'Quiz: 10 Questions | 100% Interactive Evaluation',
    teacherExample: 'Complete all 10 questions to unlock the final practical coding mission.',
    whatYouShouldSee: 'Interactive multiple choice questions with zero pre-selected answers and instant explanation feedback upon click.',
  },
  {
    id: 15,
    title: '15 — Practical Coding Challenge',
    concept: 'PRACTICAL MISSION: BUILD YOUR FIRST WEBPAGE FROM SCRATCH',
    easyExplanation: 'Write a valid HTML webpage from scratch in the Prayxis HTML Laboratory (or type ! and press Enter to start with the full boilerplate!).',
    why: 'True engineering capability is built by writing real code in an editor.',
    visualType: 'document-skeleton',
    syntax: 'Build & Verify HTML Structure (! + Enter shortcut supported)',
    teacherExample: 'Click ⚡ ! TEMPLATE or type ! + Enter in the editor below, customize your webpage, and click RUN & VERIFY CODE.',
    whatYouShouldSee: 'A live isolated browser preview rendering your page alongside a green verification checklist.',
  },
];

export const DAY_01_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'What is the primary role of HTML in web development?',
    options: [
      'To program server database queries',
      'To provide the structural content skeleton of a webpage',
      'To style fonts with colors and background gradients',
      'To compile operating system kernels',
    ],
    correctIndex: 1,
    explanation: 'HTML provides the structural skeleton and content hierarchy of every webpage.',
  },
  {
    id: 2,
    question: 'Where must the <!DOCTYPE html> declaration be placed?',
    options: [
      'Inside the <body> tag',
      'At Line 1 at the very top of the HTML file',
      'At the bottom of the file after </html>',
      'Inside the <title> tag',
    ],
    correctIndex: 1,
    explanation: '`<!DOCTYPE html>` must always be the very first line of code in any HTML document.',
  },
  {
    id: 3,
    question: 'What distinguishes an HTML closing tag from an opening tag?',
    options: [
      'Closing tags are written in ALL CAPS',
      'Closing tags start with a forward slash (/), e.g., </p>',
      'Closing tags use square brackets [...]',
      'Closing tags do not exist in HTML',
    ],
    correctIndex: 1,
    explanation: 'Closing tags always begin with a forward slash (e.g. </p>, </h1>).',
  },
  {
    correctIndex: 2,
    explanation: '`index.html` is the standard reserved homepage filename, and typing `!` + Enter/Tab auto-generates its template.',
  },
];

export const DAY_01_STEPS_HINGLISH: LessonStep[] = [
  {
    id: 1,
    title: '01 — Webpage Kya Hota Hai?',
    concept: 'WEBPAGE KYA HOTA HAI?',
    easyExplanation:
      'Webpage ek interactive document hota hai jo aapke web browser (jaise Google Chrome, Microsoft Edge ya Safari) ke andar khulta hai. Backstage par, yeh ek plain text file hoti hai jisme HTML code instructions hote hain. Aapka browser is HTML code ko padhta hai aur usko visual headings, text, images aur buttons me convert kar deta hai.',
    realExample:
      'Jab aap Google.com, YouTube.com, ya Amazon.in kholte hain, to aapka browser ek HTML code file download karta hai aur usko aapke screen par colorful, clickable layout me badal deta hai.',
    whereDoWeSeeIt:
      'Aapke browser window ke andar jab bhi aap mobile ya laptop par koi website open karte hain.',
    why: 'Browser apne aap guess nahi kar sakta ki webpage kaise dikhega. Web developers HTML code instructions likhte hain taaki browser ko pata chale ki heading kahan rakhni hai aur text kahan.',
    visualType: 'browser-flow',
    syntax: 'index.html (Code File) ──▶ Web Browser (Code Reader) ──▶ Webpage (Visual Screen)',
    syntaxBreakdown: [
      'Source Code: Plain text file (.html) jo computer ya server par save hoti hai.',
      'Web Browser: Software (Chrome/Edge) jo HTML code ko parse aur render karta hai.',
      'Rendered Webpage: Screen par dikhne wala visual user interface (UI).',
    ],
    teacherExample: `<!DOCTYPE html>
<html>
<head>
  <title>Mera Pehla Webpage</title>
</head>
<body>
  <h1>Prayxis Web Development me Aapka Swagat Hai!</h1>
  <p>Yeh ek real webpage hai jo browser ne render kiya hai.</p>
</body>
</html>`,
    whatYouShouldSee:
      'Browser HTML code ko read karke ek bold main heading aur uske niche paragraph text display karega.',
    microPractice: {
      prompt: 'Dekhiye kaise index.html file browser ke andar ek visual webpage ban jati hai.',
      starterCode: `<!DOCTYPE html>
<html>
<head>
  <title>Mera Webpage</title>
</head>
<body>

  <h1>Mera Pehla Webpage</h1>
  <p>Browsers code ko visual interface me badalte hain.</p>

</body>
</html>`,
    },
    commonMistakes: [
      'Yeh sochna ki browsers bina code instructions ke apne aap websites bana dete hain.',
      'Webpage ko ek static photo samajhna, jabki woh code se bana interactive document hota hai.',
    ],
    question: {
      text: 'Jab aap Google Chrome me koi web address likhte hain, to actually me kya hota hai?',
      options: [
        'Browser bina code padhe apne aap graphics bana deta hai',
        'Browser HTML code instructions ko padhta hai aur screen par visual webpage render karta hai',
        'Browser aapke computer ke files delete kar deta hai',
        'Browser images ko text me badal deta hai',
      ],
      correctIndex: 1,
      explanation:
        'Browser web server se text file mangwata hai, uske HTML code ko interpret karta hai, aur visual page render karta hai.',
    },
  },
  {
    id: 2,
    title: '02 — HTML Kya Hai?',
    concept: 'HTML KYA HAI?',
    easyExplanation:
      'HTML ka full form HyperText Markup Language hai. Yeh website ka skeleton (dhanche/structure) hota hai. HTML batata hai ki page par text, headings, paragraphs, images aur links kahan rahenge.',
    realExample:
      'Jaise ek insaan ka skeleton (haddiyon ka dhancha) body ko shape deta hai, waise hi HTML har webpage ka main structural skeleton hota hai.',
    whereDoWeSeeIt: 'Internet par har ek website HTML par hi bani hoti hai.',
    why: 'Bina HTML ke browser ko pata hi nahi chalega ki konsa text heading hai aur konsa paragraph.',
    visualType: 'tag-nesting',
    syntax: 'HTML = HyperText Markup Language (Skeleton of the Web)',
    syntaxBreakdown: [
      'HyperText: Links jo ek page ko doosre page se connect karte hain.',
      'Markup Language: Tags jo content ko enclose karke uski meaning batate hain.',
    ],
    teacherExample: `<h1>Prayxis Full Stack Academy</h1>
<p>Aap HTML seekh rahe hain.</p>`,
    whatYouShouldSee: 'Ek bold Heading aur uske niche paragraph text.',
    microPractice: {
      prompt: 'HTML tags ki madad se ek simple heading aur paragraph banayein.',
      starterCode: `<h1>Prayxis Web Development</h1>
<p>Main HTML seekh raha hoon.</p>`,
    },
    commonMistakes: [
      'HTML ko ek programming language samajhna (HTML ek Markup/Structuring Language hai).',
    ],
    question: {
      text: 'HTML ka full form kya hai?',
      options: [
        'High Tech Modern Language',
        'HyperText Markup Language',
        'Home Tool Markup Language',
        'Hyperlink Text Model Language',
      ],
      correctIndex: 1,
      explanation: 'HTML stands for HyperText Markup Language.',
    },
  },
  {
    id: 3,
    title: '03 — HTML Tags Kya Hote Hain?',
    concept: 'HTML TAGS KYA HOTE HAIN?',
    easyExplanation:
      'HTML Tags special keywords hote hain jo angle brackets < > ke andar likhe jate hain. Tags browser ko batate hain ki unke andar ka text kaise display karna hai (jaise heading <h1> ya paragraph <p>).',
    realExample:
      'Jaise parcel par "FRAGILE" ya "HANDLE WITH CARE" ka label lagaya jata hai, waise hi text par <h1> tag lagane se browser usko main heading bana deta hai.',
    whereDoWeSeeIt: 'Angle brackets < > ke andar poore HTML code me.',
    why: 'Tags ke bina browser plain text aur structured titles me farak nahi samajh sakta.',
    visualType: 'tag-nesting',
    syntax: '<h1> Text Content Here </h1>',
    syntaxBreakdown: [
      '<h1> : Opening tag (start marker).',
      'Text Content : Page par dikhne wala text.',
      '</h1> : Closing tag (end marker with forward slash /).',
    ],
    teacherExample: `<h1>Heading Tag Example</h1>
<p>Paragraph Tag Example</p>`,
    whatYouShouldSee: 'Opening aur closing tags ke beech ka text visual element ban jata hai.',
    microPractice: {
      prompt: 'Check karein ki opening <h1> aur closing </h1> tag sahi tarah se tag content ko wrap kar rahe hain.',
      starterCode: `<h1>HTML Tags Foundation</h1>
<p>Tags browser ko content format batate hain.</p>`,
    },
    commonMistakes: [
      'Closing tag me forward slash / lagana bhool jana (jaise <h1>Text<h1> WRONG hai!).',
      'Square brackets [ ] ya curly brackets { } use karna (HTML tags HAMESHA angle brackets < > me hote hain!).',
    ],
    question: {
      text: 'Closing HTML tag me konsa symbol hona zaroori hota hai?',
      options: ['Forward Slash /', 'Backslash \\', 'Question Mark ?', 'Hash Symbol #'],
      correctIndex: 0,
      explanation: 'Closing tags me opening bracket ke baad forward slash / lagaya jata hai (jaise </h1> ya </p>).',
    },
  },
  {
    id: 4,
    title: '04 — HTML Tag Anatomy',
    concept: 'TAG ANATOMY (PARTS OF A TAG)',
    easyExplanation:
      'Ek standard HTML tag ke 3 main parts hote hain: Opening Tag (<tag>), Content (andar ka text), aur Closing Tag (</tag>). Opening tag shuruat batata hai, Content beech me rehta hai, aur Closing tag ending mark karta hai.',
    realExample:
      'Sochiye ek sandwich ki tarah: Opening tag = Top Bread, Content = Stuffing/Filling, Closing tag = Bottom Bread.',
    whereDoWeSeeIt: 'Har standard HTML line me.',
    why: 'Browser ko exact start aur end boundary pata honi chahiye taaki baaki ka page kharab na ho.',
    visualType: 'dom-tree',
    syntax: '<p>  This is paragraph content  </p>',
    syntaxBreakdown: [
      '<p> : Opening Tag',
      'This is paragraph content : Element Content',
      '</p> : Closing Tag',
    ],
    teacherExample: `<p>Mera naam Prashant hai aur main Web Development seekh raha hoon.</p>`,
    whatYouShouldSee: 'Paragraph content clean spacing ke sath render hoga.',
    microPractice: {
      prompt: 'Tag Anatomy ko observe karein.',
      starterCode: `<p>Opening Tag ── Content ── Closing Tag</p>`,
    },
    commonMistakes: [
      'Opening tag aur closing tag me alag names use karna (jaise <h1>Text</p> WRONG hai!).',
    ],
    question: {
      text: 'Inme se konsa correct HTML paragraph tag structure hai?',
      options: ['<p>Hello World</p>', '<p>Hello World<p>', '</p>Hello World<p>', '<para>Hello World</para>'],
      correctIndex: 0,
      explanation: 'Opening <p>, content, aur closing </p> tag sahi anatomy follow karta hai.',
    },
  },
  {
    id: 5,
    title: '05 — HTML Element Kya Hota Hai?',
    concept: 'HTML ELEMENT KYA HOTA HAI?',
    easyExplanation:
      'Tag aur Element me chota sa farak hai: Opening tag + Content + Closing tag teenon ko milakar poora "HTML Element" banta hai! For example: <h1>Hello</h1> poora ek Heading Element hai.',
    realExample:
      'Opening tag = Darwaza Khola, Content = Kamre me Baithe, Closing tag = Darwaza Band Kiya. Teeno milkar ek Poora Room (Element) banate hain.',
    whereDoWeSeeIt: 'Webpage ke har ek building block me.',
    why: 'Developers code baatcheet me "Heading Element" ya "Paragraph Element" ki tarah refer karte hain.',
    visualType: 'tag-nesting',
    syntax: 'HTML Element = Opening Tag + Content + Closing Tag',
    syntaxBreakdown: [
      'Tag: Sirf keywords <p> ya </p>.',
      'Element: Poori line <p>Content</p>.',
    ],
    teacherExample: `<h1>Yeh ek Heading Element hai</h1>
<p>Yeh ek Paragraph Element hai</p>`,
    whatYouShouldSee: 'Dono elements apne respecitve styles me render honge.',
    microPractice: {
      prompt: 'Heading Element aur Paragraph Element likhein.',
      starterCode: `<h1>Full Stack Web Development</h1>
<p>HTML elements webpage ke building blocks hain.</p>`,
    },
    commonMistakes: [
      'Tag aur Element shabd me confuse hona.',
    ],
    question: {
      text: 'HTML Element kis cheez se milkar banta hai?',
      options: [
        'Sirf opening tag से',
        'Opening Tag + Content + Closing Tag teenon se milkar',
        'Sirf CSS style file se',
        'Sirf image file se',
      ],
      correctIndex: 1,
      explanation: 'Opening tag, inner content, aur closing tag teenon ke combination ko HTML Element kehte hain.',
    },
  },
  {
    id: 6,
    title: '06 — Pehli HTML File Banaein (index.html)',
    concept: 'PEHLI HTML FILE (index.html)',
    easyExplanation:
      'Websites ki main homepage file ka reserved standard naam index.html hota hai. Jab aap kisi website par jate hain, to web server sabse pehle index.html file hi serve karta hai.',
    realExample:
      'Jaise har ghar ka ek main entrance door hota hai, waise hi har website ki shuruat index.html file se hoti hai.',
    whereDoWeSeeIt: 'Aapke project folder me line 1 par.',
    why: 'Servers automatically index.html file ko homepage ki tarah recognize karte hain.',
    visualType: 'browser-flow',
    syntax: 'Project Folder ──▶ index.html ──▶ Web Server Homepage',
    syntaxBreakdown: [
      'index : Website homepage ka reserved name.',
      '.html : Standard extension HTML files ke liye.',
    ],
    teacherExample: `<!-- File Name: index.html -->
<h1>Mera Pehla Project</h1>
<p>Welcome to my official website index.html!</p>`,
    whatYouShouldSee: 'File saved as index.html renders in the browser.',
    microPractice: {
      prompt: 'index.html file content practice karein.',
      starterCode: `<!-- index.html -->
<h1>Prayxis Student Portal</h1>
<p>Main full stack developer ban raha hoon.</p>`,
    },
    commonMistakes: [
      'File name me spaces ya capital letters rkhna (index.html hamesha lowercase bina space ke rakhein).',
      'File extension .html ki jagah .txt save ho jana.',
    ],
    question: {
      text: 'Website ke main homepage ke liye standard reserved filename konsa hota hai?',
      options: ['home.txt', 'index.html', 'main.doc', 'default.js'],
      correctIndex: 1,
      explanation: 'index.html website homepage ke liye standard reserved filename hai.',
    },
  },
  {
    id: 7,
    title: '07 — HTML Page Structure (Skeleton)',
    concept: 'HTML PAGE STRUCTURE',
    easyExplanation:
      'Professional HTML pages ek specific skeleton structure follow karte hain: 1. <!DOCTYPE html>, 2. <html>, 3. <head> (metadata & tab title), 4. <body> (screen par dikhne wala content).',
    realExample:
      'Ghar ka dhancha: Foundations (DOCTYPE) → Outer Walls (html) → Roof/Control (head) → Living Rooms (body).',
    whereDoWeSeeIt: 'Har professional website ke source code me.',
    why: 'Browser ko pata chalta hai ki document modern HTML5 hai, tab title kya hai, aur page content kahan hai.',
    visualType: 'dom-tree',
    syntax: '<!DOCTYPE html>\n<html>\n  <head>\n    <title>Title</title>\n  </head>\n  <body>\n    Content...\n  </body>\n</html>',
    syntaxBreakdown: [
      '<!DOCTYPE html> : Modern HTML5 declaration.',
      '<html> : Root container.',
      '<head> : Title aur metadata section.',
      '<body> : Visible page content.',
    ],
    teacherExample: `<!DOCTYPE html>
<html>
<head>
  <title>Mera Pehla Web Structure</title>
</head>
<body>
  <h1>Hello Prayxis</h1>
  <p>Standard HTML page skeleton.</p>
</body>
</html>`,
    whatYouShouldSee: 'Browser tab title "Mera Pehla Web Structure" dikhega aur body me heading & text.',
    microPractice: {
      prompt: 'Page structure skeleton review karein.',
      starterCode: `<!DOCTYPE html>
<html>
<head>
  <title>Full Structure</title>
</head>
<body>
  <h1>Clean Page Structure</h1>
</body>
</html>`,
    },
    commonMistakes: [
      'Visible content ko <head> ke andar rakhna (Visible content HAMESHA <body> me jayega!).',
    ],
    question: {
      text: 'Webpage par dikhne wala visible content (headings, buttons, text) kis section me rakha jata hai?',
      options: ['<head>', '<title>', '<body>', '<!DOCTYPE>'],
      correctIndex: 2,
      explanation: 'Screen par dikhne wala har content <body> element ke andar rakha jata hai.',
    },
  },
  {
    id: 8,
    title: '08 — Heading Tags (h1 se h6)',
    concept: 'HEADING TAGS (<h1> TO <h6>)',
    easyExplanation:
      'HTML me headings ke 6 levels hote hain: <h1> se le kar <h6> tak. <h1> sabse bada main title hota hai aur <h6> sabse chota sub-heading hota hai.',
    realExample:
      'Newspaper Headline (h1) → Section Title (h2) → Sub-topic (h3).',
    whereDoWeSeeIt: 'Articles, blogs aur documentation headings me.',
    why: 'Headings content hierarchy aur structure maintain karti hain.',
    visualType: 'dom-tree',
    syntax: '<h1>Bada Heading</h1> ... <h6>Sabse Chota Heading</h6>',
    syntaxBreakdown: [
      '<h1>: Main Page Title',
      '<h2>: Section Title',
      '<h3>: Subsection Title',
    ],
    teacherExample: `<h1>Main Topic (h1)</h1>
<h2>Major Section (h2)</h2>
<h3>Sub Section (h3)</h3>`,
    whatYouShouldSee: 'Different sizes of bold text according to heading hierarchy.',
    microPractice: {
      prompt: 'h1, h2 aur h3 try karein.',
      starterCode: `<h1>Full Stack Web Development</h1>
<h2>HTML Foundations</h2>
<h3>Day 01 — Introduction</h3>`,
    },
    commonMistakes: [
      'h6 ko h1 se bada samajhna (h1 sabse bada aur important hota hai!).',
    ],
    question: {
      text: 'Inme se konsa HTML heading tag sabse main aur bada title hota hai?',
      options: ['<h6>', '<h3>', '<h1>', '<head>'],
      correctIndex: 2,
      explanation: '<h1> sabse main aur highest-level heading tag hai.',
    },
  },
  {
    id: 9,
    title: '09 — Paragraph Tag (<p>)',
    concept: 'PARAGRAPH TAG (<p>)',
    easyExplanation:
      'Normal text blocks likhne ke liye hum <p> tag use karte hain. Browser har paragraph ke upar aur niche apne aap space (margin) chodh deta hai.',
    realExample:
      'Kitab me ya website par jo normal text paragraphs hote hain wo sab <p> tags me hote hain.',
    whereDoWeSeeIt: 'Body text me har jagah.',
    why: 'Text blocks ko aapas me clean spacing ke sath separate rakhne ke liye.',
    visualType: 'browser-flow',
    syntax: '<p>Yeh ek paragraph text hai.</p>',
    syntaxBreakdown: [
      '<p> : Starts paragraph text block.',
      '</p> : Ends paragraph text block.',
    ],
    teacherExample: `<p>Mera naam Prashant hai. Main Prayxis Academy me padhta hoon.</p>
<p>Mera goal ek successful full stack web developer banna hai.</p>`,
    whatYouShouldSee: 'Dono paragraphs ke beech visual vertical spacing dikhegi.',
    microPractice: {
      prompt: 'Do alag <p> paragraphs likhein.',
      starterCode: `<p>Pehla paragraph text block.</p>
<p>Doosra paragraph text block.</p>`,
    },
    commonMistakes: [
      'Paragraph text ke liye <text> tag use karna (<p> is the correct tag!).',
    ],
    question: {
      text: 'Standard text paragraphs ke liye konsa tag use hota hai?',
      options: ['<text>', '<para>', '<p>', '<block>'],
      correctIndex: 2,
      explanation: '<p> tag standard text paragraphs ke liye use hota hai.',
    },
  },
  {
    id: 10,
    title: '10 — Line Break Tag (<br>)',
    concept: 'LINE BREAK TAG (<br>)',
    easyExplanation:
      '<br> tag ek line break create karta hai. Yeh naye paragraph ka space diye bina agli line par text shift kar deta hai. Important: <br> ek VOID ELEMENT hai, iska koi closing tag </br> nahi hota!',
    realExample:
      'Ghar ka address ya kavita (poetry) likhte waqt har line ke baad break: Name: Prashant<br>Address: Jaipur<br>India.',
    whereDoWeSeeIt: 'Address cards, poems aur contact info me.',
    why: 'Bina naya paragraph margin banaye agli line par jane ke liye.',
    visualType: 'code-editor',
    syntax: '<p>Line 1<br>Line 2<br>Line 3</p>',
    syntaxBreakdown: [
      '<br> : Line break single tag (No closing tag!).',
    ],
    teacherExample: `<p>
  Prayxis Technologies<br>
  Full Stack Web Development<br>
  India
</p>`,
    whatYouShouldSee: 'Text ek hi paragraph me teen alag lines par dikhega.',
    microPractice: {
      prompt: '<br> tag ki madad se text lines break karein.',
      starterCode: `<p>Name: Prashant<br>Role: Developer<br>City: Jaipur</p>`,
    },
    commonMistakes: [
      'Closing </br> tag likhna (<br> single self-contained void tag hai!).',
    ],
    question: {
      text: 'Kya <br> line break tag me closing tag </br> hona zaroori hai?',
      options: ['Haan', 'Nahi, <br> ek void tag hai jiska closing tag nahi hota'],
      correctIndex: 1,
      explanation: '<br> void element hai, iska koi closing tag nahi hota.',
    },
  },
  {
    id: 11,
    title: '11 — HTML Comments (<!-- -->)',
    concept: 'HTML COMMENTS (<!-- -->)',
    easyExplanation:
      'HTML Comments developers ke liye notes hote hain. Browser in comments ko bilkul ignore kar deta hai aur screen par display NAHI karta. Comment syntax: <!-- Yeh ek comment hai -->.',
    realExample:
      'Code me notes likhna: <!-- Header Section Shuru --> ya <!-- Footer Links -->.',
    whereDoWeSeeIt: 'Code files me sections ko label karne ke liye.',
    why: 'Bhavishya me code samajhna aasan ho aur team members ko explain kiya ja sake.',
    visualType: 'code-editor',
    syntax: '<!-- Yeh ek invisible developer comment hai -->',
    syntaxBreakdown: [
      '<!-- : Comment Shuru',
      '--> : Comment Band',
    ],
    teacherExample: `<!-- Yeh main title section hai -->
<h1>Prayxis Academy</h1>

<!-- Yeh intro text hai -->
<p>Welcome to our coding class.</p>`,
    whatYouShouldSee: 'Browser me sirf <h1> aur <p> dikhenge, comments hide rahenge.',
    microPractice: {
      prompt: 'Code me ek HTML comment add karein.',
      starterCode: `<!-- Header Title Note -->
<h1>Prayxis Web Development</h1>
<p>Comments webpage visitors ko nahi dikhte.</p>`,
    },
    commonMistakes: [
      'Comment me --> band karna bhool jana (Poora niche ka code hide ho jayega!).',
    ],
    question: {
      text: 'Browser HTML comment (<!-- note -->) ko kaise treat karta hai?',
      options: [
        'Screen par bold red me dikhata hai',
        'Bilkul ignore kar deta hai aur screen par display nahi karta',
        'Popup alert khol deta hai',
        'Email bhej deta hai',
      ],
      correctIndex: 1,
      explanation: 'HTML comments developers ke liye hote hain aur browser renderer unhe ignore kar deta hai.',
    },
  },
  {
    id: 12,
    title: '12 — Build Your First Page',
    concept: 'BUILD YOUR FIRST PAGE (HANDS-ON)',
    easyExplanation:
      'Aapne Day 01 ke saare main concepts seekh liye hain! Ab apna pehla HTML webpage banayein jisme DOCTYPE, html, head, title, body, h1, p, aur comments sabhi ho.',
    realExample:
      'Title: My First Page | h1: Hello World | p: Main Prayxis me padhta hoon | Comments included.',
    whereDoWeSeeIt: 'Aapka pehla hands-on web project.',
    why: 'Khud se code likhne se confidence aur muscle memory banti hai.',
    visualType: 'code-editor',
    syntax: `<!DOCTYPE html>
<html>
  <head>
    <title>Mera Pehla Project</title>
  </head>
  <body>
    <!-- Main Heading -->
    <h1>Hello World</h1>
    <p>Main full stack web developer ban raha hoon.</p>
  </body>
</html>`,
    syntaxBreakdown: [
      '1. DOCTYPE declaration',
      '2. html root tag',
      '3. head & title tags',
      '4. body section with h1, p & comment',
    ],
    teacherExample: `<!DOCTYPE html>
<html>
  <head>
    <title>Mera Pehla Page</title>
  </head>
  <body>
    <!-- Main Header -->
    <h1>Hello World!</h1>
    <p>Main Prayxis Academy me HTML seekh raha hoon.</p>
  </body>
</html>`,
    whatYouShouldSee: 'Ek complete valid HTML page render hoga.',
    microPractice: {
      prompt: 'Complete HTML page structure code practice karein.',
      starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>Mera Webpage</title>
  </head>
  <body>
    <!-- Student Profile -->
    <h1>Prashant — Full Stack Intern</h1>
    <p>HTML foundations complete kar raha hoon.</p>
  </body>
</html>`,
    },
    commonMistakes: [
      'doctype me < ! > bhool jana.',
    ],
    question: {
      text: 'Webpage par browser window tab bar me title set karne ke liye konsa tag use hota hai?',
      options: ['<h1>', '<head>', '<title>', '<meta>'],
      correctIndex: 2,
      explanation: '<title> tag browser tab title bar par text set karta hai.',
    },
  },
  {
    id: 13,
    title: '13 — Practice Lab',
    concept: 'PRACTICE LAB & EXERCISES',
    easyExplanation:
      'Day 01 ke concepts par interactive exercises solve karein: Page title, headings, paragraphs, aur comment placement verify karein.',
    realExample: 'Interactive practice tests for Day 01.',
    whereDoWeSeeIt: 'Hands-on practice workspace.',
    why: 'Practical problem solving skill sharp karti hai.',
    visualType: 'tag-nesting',
    syntax: 'Practice 01: Simple Heading\nPractice 02: Paragraph Text\nPractice 03: Tag Structure',
    syntaxBreakdown: [
      'h1: Primary Heading',
      'p: Body Text Block',
    ],
    teacherExample: `<!DOCTYPE html>
<html>
  <head>
    <title>Practice Lab</title>
  </head>
  <body>
    <h1>Prayxis Practice</h1>
    <p>Interactive lab exercise.</p>
  </body>
</html>`,
    whatYouShouldSee: 'All practice exercises completed successfully.',
    microPractice: {
      prompt: 'Practice Lab snippet review karein.',
      starterCode: `<h1>Prayxis Practice Lab</h1>
<p>Coding practices make perfection.</p>`,
    },
    commonMistakes: [
      'Syntax errors in closing tags.',
    ],
    question: {
      text: 'Webpage ka main single primary heading set karne ke liye konsa tag best hota hai?',
      options: ['<h6>', '<h2>', '<h1>', '<p>'],
      correctIndex: 2,
      explanation: '<h1> main primary heading ke liye best tag hai.',
    },
  },
  {
    id: 14,
    title: '14 — Debugging Lab',
    concept: 'DEBUGGING LAB (FIX BROKEN CODE)',
    easyExplanation:
      'Broken HTML code me errors pehchaniye aur fix karein! (Missing closing slash, wrong tag order, broken syntax).',
    realExample: 'Real world bug fixes in HTML markup.',
    whereDoWeSeeIt: 'Code debugging sessions me.',
    why: 'Errors dhundhne aur fix karne ki capacity develop hoti hai.',
    visualType: 'code-editor',
    syntax: '<!-- BROKEN: <h1>Hello<h1> -->\n<!-- FIXED:  <h1>Hello</h1> -->',
    syntaxBreakdown: [
      'Bug 01: Closing tag slash missing.',
      'Bug 02: Paragraph unclosed.',
    ],
    teacherExample: `<!-- FIXED HTML CODE -->
<!DOCTYPE html>
<html>
  <head>
    <title>Fixed Code</title>
  </head>
  <body>
    <h1>Correct Heading</h1>
    <p>Correct paragraph block.</p>
  </body>
</html>`,
    whatYouShouldSee: 'Error-free HTML code parsing.',
    microPractice: {
      prompt: 'Closing tag error fix karein.',
      starterCode: `<h1>Fixed Heading</h1>
<p>Paragraph properly closed.</p>`,
    },
    commonMistakes: [
      'Closing slash / ko skip kar dena.',
    ],
    question: {
      text: '<h1>Hello<h1> code me kya mistake hai?',
      options: [
        'h1 tag allowed nahi hai',
        'Closing tag me forward slash / missing hai (sahi: </h1>)',
        'Isme text nahi hai',
        'Code 100% sahi hai',
      ],
      correctIndex: 1,
      explanation: 'Closing tag me forward slash / hona zaroori hota hai (</h1>).',
    },
  },
  {
    id: 15,
    title: '15 — Mini Project & Final Challenge',
    concept: 'MINI PROJECT & FINAL CHALLENGE',
    easyExplanation:
      'Day 01 ka Final Capstone Project: "MY FIRST WEBPAGE". Apni ruchi aur baaton par ek complete, clean, structured HTML webpage banayein!',
    realExample:
      'Title: Prashant Profile | h1: Hello World | p: Main Full Stack Web Development seekh raha hoon.',
    whereDoWeSeeIt: 'Day 01 final verification workspace.',
    why: 'Demonstrates 100% complete understanding of Day 01 foundations.',
    visualType: 'browser-flow',
    syntax: `<!DOCTYPE html>
<html>
  <head>
    <title>Mera Profile</title>
  </head>
  <body>
    <!-- Header -->
    <h1>Prashant — Full Stack Intern</h1>
    <p>Main Prayxis Academy me Full Stack Web Development seekh raha hoon.</p>
  </body>
</html>`,
    syntaxBreakdown: [
      '✓ DOCTYPE declaration present',
      '✓ html, head, title, body present',
      '✓ h1 main title present',
      '✓ p paragraph present',
      '✓ HTML comments present',
    ],
    teacherExample: `<!DOCTYPE html>
<html>
  <head>
    <title>Mera Profile</title>
  </head>
  <body>
    <h1>Hello, Main Prashant Hoon</h1>
    <p>Mera goal ek professional Full Stack Web Developer banna hai.</p>
  </body>
</html>`,
    whatYouShouldSee: 'A complete, clean, working HTML webpage.',
    microPractice: {
      prompt: 'Day 01 mini project code completed.',
      starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>Mera Profile</title>
  </head>
  <body>
    <h1>Prashant — Full Stack Intern</h1>
    <p>Main web development me pro ban raha hoon.</p>
  </body>
</html>`,
    },
    commonMistakes: [
      'HTML structure missing hona.',
    ],
    question: {
      text: 'Modern HTML5 webpage structure ki shuruat kis line se honi chahiye?',
      options: ['<html>', '<!DOCTYPE html>', '<body>', '<head>'],
      correctIndex: 1,
      explanation: 'Modern HTML5 webpage ki line 1 hamesha <!DOCTYPE html> se shuru hoti hai.',
    },
  },
];

export const DAY_01_QUIZ_QUESTIONS_HINGLISH: QuizQuestion[] = [
  {
    id: 1,
    question: 'HTML ka full form kya hai?',
    options: [
      'High Tech Modern Language',
      'HyperText Markup Language',
      'Home Tool Markup Language',
      'Hyperlink Text Model Language',
    ],
    correctIndex: 1,
    explanation: 'HTML stands for HyperText Markup Language.',
  },
  {
    id: 2,
    question: 'Closing HTML tag me konsa symbol hona zaroori hai?',
    options: ['Forward Slash /', 'Backslash \\', 'Question Mark ?', 'Hash Symbol #'],
    correctIndex: 0,
    explanation: 'Closing tags me forward slash / lagaya jata hai (jaise </h1> ya </p>).',
  },
  {
    id: 3,
    question: 'Webpage par dikhne wala visible content kis section me rakha jata hai?',
    options: ['<head>', '<title>', '<body>', '<!DOCTYPE>'],
    correctIndex: 2,
    explanation: 'Screen par dikhne wala har visual content <body> tag ke andar rakha jata hai.',
  },
  {
    id: 4,
    question: 'Browser window tab bar par page ka naam set karne ke liye konsa tag use hota hai?',
    options: ['<h1>', '<head>', '<title>', '<meta>'],
    correctIndex: 2,
    explanation: '<title> tag inside <head> browser tab bar par title set karta hai.',
  },
  {
    id: 5,
    question: 'Webpage ka main single primary heading set karne ke liye konsa tag sabse best hota hai?',
    options: ['<h6>', '<h2>', '<h1>', '<p>'],
    correctIndex: 2,
    explanation: '<h1> single main primary heading ke liye standard tag hai.',
  },
  {
    id: 6,
    question: 'Standard text paragraphs ke liye konsa tag use hota hai?',
    options: ['<text>', '<para>', '<p>', '<block>'],
    correctIndex: 2,
    explanation: '<p> tag standard body text paragraphs ke liye use hota hai.',
  },
  {
    id: 7,
    question: 'Kya <br> line break tag me closing tag </br> hona zaroori hota hai?',
    options: ['Haan', 'Nahi, <br> ek void element hai jiska closing tag nahi hota'],
    correctIndex: 1,
    explanation: '<br> void element hai, iska koi closing tag nahi hota.',
  },
  {
    id: 8,
    question: 'Browser HTML comment (<!-- note -->) ko kaise treat karta hai?',
    options: [
      'Screen par bold red text me dikhata hai',
      'Bilkul ignore kar deta hai aur screen par display nahi karta',
      'Popup window open kar deta hai',
      'Email alert bhejta hai',
    ],
    correctIndex: 1,
    explanation: 'HTML comments developers ke notes hote hain aur browser unhe screen par render nahi karta.',
  },
  {
    id: 9,
    question: 'Website ke main homepage ke liye reserved standard filename kya hota hai?',
    options: ['home.txt', 'index.html', 'main.doc', 'default.js'],
    correctIndex: 1,
    explanation: 'index.html website homepage ke liye standard reserved filename hai.',
  },
  {
    id: 10,
    question: 'Modern HTML5 webpage structure ki line 1 par konsa declaration hona zaroori hai?',
    options: ['<html>', '<!DOCTYPE html>', '<body>', '<head>'],
    correctIndex: 1,
    explanation: '<!DOCTYPE html> modern HTML5 declaration directive hai jo line 1 par hoti hai.',
  },
];

