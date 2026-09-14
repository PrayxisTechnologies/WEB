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
    id: 4,
    question: 'Which tag specifies the text shown on the browser window tab bar?',
    options: ['<h1>', '<head>', '<title>', '<meta>'],
    correctIndex: 2,
    explanation: 'The `<title>` tag inside `<head>` sets the title displayed on the browser window tab bar.',
  },
  {
    id: 5,
    question: 'Which element represents the main primary heading of a webpage?',
    options: ['<h6>', '<h2>', '<h1>', '<p>'],
    correctIndex: 2,
    explanation: '`<h1>` represents the single primary main heading of a webpage.',
  },
  {
    id: 6,
    question: 'Which element represents a major section heading under the main topic?',
    options: ['<h2>', '<p>', '<br>', '<title>'],
    correctIndex: 0,
    explanation: '`<h2>` represents a major section heading on a webpage.',
  },
  {
    id: 7,
    question: 'Which element is used to group body text into paragraph blocks?',
    options: ['<br>', '<p>', '<div>', '<span>'],
    correctIndex: 1,
    explanation: '`<p>` wraps text into standalone paragraph blocks with default vertical spacing gaps.',
  },
  {
    id: 8,
    question: 'Why is <br> called a void element?',
    options: [
      'Because it deletes text from the screen',
      'Because it is self-closing and does not have a separate closing tag',
      'Because it requires 5 parameters',
      'Because it can only be used once per website',
    ],
    correctIndex: 1,
    explanation: '`<br>` is a void element because it cannot contain inner text content and does not use a closing `</br>` tag.',
  },
  {
    id: 9,
    question: 'How does a browser handle text written inside <!-- comment --> tags?',
    options: [
      'It displays the comment in bold red text',
      'It completely ignores the comment and does not display it on screen',
      'It opens a popup alert',
      'It sends an email to the server administrator',
    ],
    correctIndex: 1,
    explanation: 'HTML comments are invisible to website visitors and ignored by the browser canvas renderer.',
  },
  {
    id: 10,
    question: 'What is the standard reserved filename for the default homepage of a website, and how can you generate its template?',
    options: [
      'home.txt (Shortcut: Ctrl+Alt+Del)',
      'main.doc (Shortcut: F5)',
      'index.html (Shortcut: Type ! and press Enter/Tab)',
      'default.js (Shortcut: Alt+F4)',
    ],
    correctIndex: 2,
    explanation: '`index.html` is the standard reserved homepage filename, and typing `!` + Enter/Tab auto-generates its template.',
  },
];
