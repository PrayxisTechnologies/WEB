export interface MicroPractice {
  prompt: string;
  starterCode: string;
  solutionHint?: string;
}

export interface DebugExercise {
  id: number;
  title: string;
  brokenCode: string;
  errorOutput: string;
  question: string;
  hint: string;
  fixedCode: string;
  explanation: string;
}

export interface LessonStep {
  id: number;
  title: string;
  concept: string;
  tagline: string;
  easyExplanation: string;
  realExample?: string;
  why?: string;
  flowDiagram?: string;
  syntax?: string;
  syntaxBreakdown?: string[];
  teacherExample?: string;
  secondExample?: string;
  whatYouShouldSee?: string;
  microPractice?: MicroPractice;
  commonMistakes?: string[];
  keyTakeaways?: string[];
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

export const PYTHON_DAY_01_STEPS: LessonStep[] = [
  {
    id: 1,
    title: '01 — Welcome to Python',
    concept: 'WELCOME TO YOUR FIRST PYTHON DAY',
    tagline: 'Bilkul Zero Se — No Prior Coding Experience Required',
    easyExplanation: 'Aaj se hum Python programming bilkul zero level se start karenge. Agar aapne kabhi programming nahi ki, coding nahi ki, Python nahi chalayi, ya code dekhkar confuse hote ho — to koi problem nahi! Day 01 ka goal expert banna nahi hai. Aaj ka goal sirf itna hai ki session ke end tak aap confidently samajh sako ki programming kya hai, Python kya hai, code kaise run hota hai, aur print() se apna pehla real program kaise banate hain.',
    realExample: 'Duniya ki top tech companies jaise Google, Netflix, Instagram, Spotify aur NASA sabhi Python ka use karti hain unke core algorithms aur automation ke liye.',
    why: 'Python ko duniya ki sabse beginner-friendly aur versatile programming language maana jata hai kyunki iska code English sentences ki tarah clean aur readable hota hai.',
    flowDiagram: `Today's Learning Roadmap:
Programming Concept ──▶ Python Overview ──▶ Use Cases ──▶ Setup & .py File ──▶ Python Interpreter ──▶ print() Function ──▶ Comments (#) ──▶ Syntax & Rules ──▶ First Real Program ──▶ Practice Labs ──▶ Debugging Challenge ──▶ 10-Question Quiz ──▶ Final Mission (3 Hours)`,
    syntax: 'print("Hello, I am learning Python at Prayxis!")',
    syntaxBreakdown: [
      'print: Python ka built-in function jo monitor screen par text display karta hai.',
      '("..."): Parentheses aur double quotes jinke andar hum apna display message pass karte hain.',
      'Output: Hello, I am learning Python at Prayxis!',
    ],
    teacherExample: `# Welcome to Prayxis Python Day 01
print("Hello, World!")
print("Welcome to Python Programming!")
print("Today I am starting my coding journey.")`,
    whatYouShouldSee: 'Terminal window mein 3 lines display hongi without any errors.',
    microPractice: {
      prompt: 'Editor mein apna pehla Python command likhein aur Run button click karke output check karein.',
      starterCode: `# Write your first Python command below:
print("Hello! I am ready to learn Python.")`,
    },
    commonMistakes: [
      'Pehle din hi complex topics (loops, functions, classes) ke baare mein sochkar panic karna. Focus only on today\'s foundation!',
      'Code ko sirf dekhkar chhod dena without typing and running it yourself.',
    ],
    keyTakeaways: [
      'Day 01 is focused on absolute foundations: concepts, syntax rules, and print().',
      'No background in computer science is required.',
      'Hands-on typing makes you a real programmer.',
    ],
    question: {
      text: 'Day 01 Python session ka primary goal kya hai?',
      options: [
        'Pehle hi din AI model train karna',
        'Programming ke core concepts, Python basics, .py files aur print() function ko master karna',
        'Complex machine learning math solve karna',
        'Directly mobile app publish karna',
      ],
      correctIndex: 1,
      explanation: 'Day 01 ka goal absolute foundation build karna hai taaki aap independently Python code likh aur run kar sakein.',
    },
  },
  {
    id: 2,
    title: '02 — Programming Kya Hoti Hai?',
    concept: 'WHAT IS PROGRAMMING? — COMPUTER KO INSTRUCTIONS DENA',
    tagline: 'Thinking Like a Programmer & Real-Life Logic',
    easyExplanation: 'Programming ko samajhne ke liye ek simple real-life example lete hain. Agar aap kisi insaan ko bolo: "Room clean karo", to wo samajh jayega. Lekin ek computer ya robot ko exactly batana padta hai: 1. Table se books uthao, 2. Shelf par rakho, 3. Table wipe karo, 4. Floor sweep karo. Computer khud se assume nahi karta — usko step-by-step clear instructions chahiye hoti hain. In instructions ko ek language mein likhne ko hum PROGRAMMING kehte hain.',
    realExample: 'Zomato / Swiggy App: Jab aap order karte ho, to software ke andar likha program check karta hai: Agar payment successful hui ──▶ Restaurant ko notification bhejo; Agar payment fail hui ──▶ Error message dikhao.',
    why: 'Computers extremely fast calculate kar sakte hain aur repetitive tasks bina thake execute kar sakte hain, lekin unhe run karne ke liye hume programmer ban kar logic likhna padta hai.',
    flowDiagram: `Problem ──▶ Break into Small Steps ──▶ Write Code Instructions ──▶ Run in Python ──▶ Check Output ──▶ Fix Mistakes`,
    syntax: `# Programming Definition:
# "Programming is the process of writing instructions that a computer can execute to perform a task."`,
    syntaxBreakdown: [
      'Input: Data ya instructions jo hum computer ko dete hain.',
      'Processing: Python interpreter us code ko line-by-line execute karta hai.',
      'Output: Final result jo screen ya terminal par dikhta hai.',
    ],
    teacherExample: `# Giving step-by-step instructions to Python
print("Step 1: Wake up and start Prayxis")
print("Step 2: Open Python Day 01 lesson")
print("Step 3: Type Python code")
print("Step 4: Click RUN and verify output")`,
    whatYouShouldSee: 'Python step 1 se step 4 tak sequentially saare instructions screen par print karega.',
    microPractice: {
      prompt: 'Ek daily routine ke 3 sequential steps print karne ka program likhein.',
      starterCode: `# Step-by-step instructions practice
print("Step 1: Open VS Code")
print("Step 2: Create hello.py")
print("Step 3: Run python hello.py")`,
    },
    commonMistakes: [
      'Yeh sochna ki computer insaan ki tarah natural boli khud samajh lega bina programming language ke.',
      'Steps ka sequence galat likhna (e.g. login karne se pehle dashboard dikhana).',
    ],
    question: {
      text: 'Programming ka sabse simple aur accurate meaning kya hai?',
      options: [
        'Computer ko paint aur format karna',
        'Computer ko kisi task ko accomplish karne ke liye step-by-step instructions dena',
        'Internet par video streaming chalana',
        'Keyboard ke buttons ko repair karna',
      ],
      correctIndex: 1,
      explanation: 'Programming is the process of writing clear, executable instructions for a computer to perform specific tasks.',
    },
  },
  {
    id: 3,
    title: '03 — Python Kya Hai & Use Cases',
    concept: 'WHAT IS PYTHON & WHERE IS IT USED?',
    tagline: 'A High-Level, General Purpose, Super Popular Language',
    easyExplanation: 'Python ek High-Level Programming Language hai. "High-level" ka matlab hai ki iska syntax human-readable English jaisa hota hai, jisse padhna aur likhna bahut easy ho jata hai. Python ka naam Monty Python comedy group ke upar rakha gaya tha (kisi saanp ke naam par nahi). Aaj Python world ki #1 most demanded language hai.',
    realExample: 'Instagram ka complete backend Python (Django) par chalta hai. YouTube aur Netflix recommendation engine mein Python use karte hain. ChatGPT aur OpenAI ke massive AI models Python ecosystem mein bane hain.',
    why: 'Python versatile hai — aap ek hi language seekhkar Web Development, Automation, Data Science, AI/ML, aur Cybersecurity sabhi fields mein jaa sakte hain.',
    flowDiagram: `Python Top 6 Industry Domains:
1. Web Development (Django, Flask, FastAPI)
2. Automation & Scripting (File sorting, Excel bots, Web scraping)
3. Data Analysis & Science (Pandas, NumPy, Charts)
4. AI & Machine Learning (TensorFlow, PyTorch, LLMs)
5. Cybersecurity & Ethical Hacking (Network scripts, Scanner tools)
6. Desktop Applications & Utilities`,
    syntax: `name = "Python 3"
status = "Most Popular Language in the World"
print(name + " ──▶ " + status)`,
    syntaxBreakdown: [
      'Simple Syntax: Zero unnecessary punctuation jaise curly braces {} ya semicolons ;.',
      'Huge Community: Lakhon free libraries aur tools available hain.',
      'Cross-Platform: Windows, Mac, aur Linux sabhi par smoothly run hota hai.',
    ],
    teacherExample: `# Python in Action
print("Domain 1: Web Backend Systems")
print("Domain 2: Automation & Bots")
print("Domain 3: Artificial Intelligence")
print("Domain 4: Cyber Security Tools")`,
    whatYouShouldSee: 'Python versatility ke alag-alag domains terminal screen par display hote hain.',
    microPractice: {
      prompt: 'Aap Python kis purpose ke liye seekh rahe hain? Apne top 2 goals ko print statements mein likhein.',
      starterCode: `# My Python Goals
print("Goal 1: I want to build web applications")
print("Goal 2: I want to learn cybersecurity & automation")`,
    },
    commonMistakes: [
      'Yeh sochna ki Python seekhne ke baad aap sirf ek hi field mein kaam kar sakte ho.',
      'Yeh sochna ki Python slow hai isliye modern apps mein use nahi hoti (top billion-dollar platforms use it daily).',
    ],
    question: {
      text: 'Python ko "High-Level Language" kyun kaha jata hai?',
      options: [
        'Kyunki yeh sirf expensive computers par chalti hai',
        'Kyunki iska code human-readable English jaisa readable aur user-friendly hota hai',
        'Kyunki isme sirf numbers likhe jaate hain',
        'Kyunki isko chalane ke liye internet mandatory hai',
      ],
      correctIndex: 1,
      explanation: 'High-level languages are designed to be easily readable and writable by humans, abstracting away complex hardware machine code.',
    },
  },
  {
    id: 4,
    title: '04 — Python Setup & .py Files',
    concept: 'PYTHON ENVIRONMENT SETUP & .py EXTENSION',
    tagline: 'Understanding Python Source Code Files',
    easyExplanation: 'Python code likhne ke liye hume 3 simple cheezein chahiye: 1. Computer, 2. Python Runtime (python.org se install kiya gaya interpreter), aur 3. Code Editor (jaise VS Code). Jab hum Python code likhte hain, to us file ko `.py` extension ke saath save karte hain (e.g., `hello.py` ya `main.py`). Agar aap `hello.txt` banaoge to wo simple text file hogi, lekin `hello.py` banate hi computer samajh jata hai ki yeh Python program hai.',
    realExample: 'Jaise song ke liye `.mp3`, video ke liye `.mp4`, image ke liye `.png`, aur webpage ke liye `.html` hota hai, waise hi Python programs ke liye hamesha `.py` extension use hota hai.',
    why: 'Operating system file extension dekhkar hi decide karta hai ki is file ko Python Interpreter ke pass bhejna hai run karne ke liye.',
    flowDiagram: `Setup Workflow:
1. Install Python (from python.org) ──▶ Check with 'python --version'
2. Install VS Code Editor
3. Create Folder: 'python-day-01'
4. Create File: 'hello.py'
5. Write: print("Hello Prayxis")
6. Run: python hello.py`,
    syntax: `# Filename: hello.py
# Terminal Command to Check Version:
# $ python --version  (or python3 --version)
# Expected Output: Python 3.12.x`,
    syntaxBreakdown: [
      'hello: File ka naam (lowercase, without spaces).',
      '.py: Python programming file extension.',
      'python hello.py: Terminal command jo file ko execute karti hai.',
    ],
    teacherExample: `# File: app.py
print("Prayxis Python Environment Active!")
print("File Extension: .py verified")`,
    whatYouShouldSee: 'Terminal mein message successfully execute ho jayega.',
    microPractice: {
      prompt: 'Ek virtual `hello.py` file ke content ko execute karein.',
      starterCode: `# File: hello.py
print("Checking Python Environment...")
print("File hello.py successfully executed!")`,
    },
    commonMistakes: [
      'File name mein spaces dena jaise `my first code.py` (Instead use `my_first_code.py`).',
      'Extension bhool jana ya `hello.py.txt` save kar dena Notepad mein.',
      'Capital letters use karna file names mein (Standard convention is lowercase with underscores).',
    ],
    question: {
      text: 'Python source code file ko save karne ke liye konsa file extension use hota hai?',
      options: ['.html', '.python', '.py', '.pt'],
      correctIndex: 2,
      explanation: 'Python source code files are always saved with the `.py` extension.',
    },
  },
  {
    id: 5,
    title: '05 — Python Interpreter & Execution Flow',
    concept: 'HOW PYTHON RUNS YOUR CODE: THE INTERPRETER',
    tagline: 'Code ──▶ Interpreter ──▶ Line-by-Line Execution ──▶ Output',
    easyExplanation: 'Computer hardware direct English words jaise `print` nahi samajhta — computer sirf 0s aur 1s (Binary Machine Code) samajhta hai. Yahan aata hai PYTHON INTERPRETER! Python Interpreter ek smart translator program hai jo aapke `.py` code ko top-to-bottom line-by-line read karta hai, computer ke liye translate karta hai, aur instantly output screen par show karta hai.',
    realExample: 'Jaise do alag languages bolne wale logon ke beech ek live translator har sentence ko sunkar translate karta hai, waise hi Python interpreter aapki har code line ko execute karta hai.',
    why: 'Python ek "Interpreted Language" hai. Iska faayda yeh hai ki aap code likhte hi immediately run karke result dekh sakte ho without complex compiling steps.',
    flowDiagram: `Execution Flow Diagram:
Your Python Code (hello.py)
          ↓
  Python Interpreter
  (Reads Line 1 ──▶ Line 2 ──▶ Line 3)
          ↓
   Machine Execution
          ↓
Terminal / Screen Output`,
    syntax: `# Line 1 executes first:
print("First line executed")
# Line 2 executes second:
print("Second line executed")
# Line 3 executes third:
print("Third line executed")`,
    syntaxBreakdown: [
      'Top-to-Bottom: Interpreter hamesha pehli line se shuru karke aakhiri line tak chalta hai.',
      'Sequential: Agar Line 2 mein koi error hai, to Line 1 execute hogi aur Line 2 par program stop ho jayega.',
    ],
    teacherExample: `# Demonstrating Top-to-Bottom Execution Flow
print("1. Starting execution...")
print("2. Processing logic...")
print("3. Generating output...")
print("4. Execution finished successfully.")`,
    whatYouShouldSee: 'Terminal mein chaaron lines exact number sequence 1, 2, 3, 4 mein print hongi.',
    microPractice: {
      prompt: 'Dekhiye kaise Python lines ko sequence mein run karta hai. Neeche diye gaye steps ko order mein run karein.',
      starterCode: `# Sequential Flow Exercise
print("Step A: Initializing Program")
print("Step B: Running Calculations")
print("Step C: Process Completed")`,
    },
    commonMistakes: [
      'Yeh sochna ki Python poore program ko random order mein chala sakta hai. It ALWAYS runs sequentially line-by-line.',
      'Agar beech ki line mein error ho to niche ki lines execute nahi hongi.',
    ],
    question: {
      text: 'Python Interpreter aapke code ko kaise execute karta hai?',
      options: [
        'Bottom se top ki taraf reverse order mein',
        'Top se bottom line-by-line sequentially execute karta hai',
        'Sirf aakhiri line run karta hai',
        'Random order mein run karta hai',
      ],
      correctIndex: 1,
      explanation: 'Python executes code line-by-line from top to bottom in a strict sequential order.',
    },
  },
  {
    id: 6,
    title: '06 — print() Function Deep Dive',
    concept: 'THE print() FUNCTION IN DEPTH',
    tagline: 'Text, Numbers, Multiple Lines & Data Types Preview',
    easyExplanation: '`print()` Python ka sabse important aur frequently used function hai. Iska simple kaam hai kisi bhi data (text, numbers, calculation results) ko screen par output ke roop mein display karna. Har `print()` statement normally apne output ke baad automatically ek nayi line (new line) par shift ho jata hai.',
    realExample: 'Jab ATM screen par aata hai: "Please enter your PIN" ya game screen par aata hai "GAME OVER", to backend mein `print()` ya display functions hi message show kar rahe hote hain.',
    why: 'Debugging aur results check karne ke liye har programmer har roz dozens of `print()` statements use karta hai.',
    flowDiagram: `Anatomy of print():
print ( " Hello Prayxis " )
  │   │       │         │
  │   │   Inner Text    │
  │   └── Double Quote ─┘
  └────── Function Name`,
    syntax: `print("Text inside double quotes")
print('Text inside single quotes')
print(100) # Number without quotes
print("10" + "20") # Text combination: 1020
print(10 + 20)     # Number math calculation: 30`,
    syntaxBreakdown: [
      'Quotes ke andar: String / Text data (e.g. "Prashant" ya "99").',
      'Bina quotes ke: Numbers (e.g. 100, 25.5) ya mathematical expressions (e.g. 5 + 5).',
      'Difference: "10" is text, but 10 is an integer number.',
    ],
    teacherExample: `# Deep Dive print() Examples
# 1. Printing Text
print("My name is Prashant")

# 2. Printing Numbers
print(2026)

# 3. Printing Math Results
print(50 + 50)

# 4. Printing multiple items separated by comma
print("Price of Python course is:", 99)`,
    whatYouShouldSee: `My name is Prashant
2026
100
Price of Python course is: 99`,
    microPractice: {
      prompt: 'Apna Name, City, aur Favorite Number ko 3 alag-alag `print()` statements mein display karein.',
      starterCode: `# Practice 01: Personal Data Output
print("Name: [Enter Your Name]")
print("City: [Enter Your City]")
print("Favorite Number:", 7)`,
    },
    commonMistakes: [
      'Quotes miss kar dena text likhte waqt: `print(Hello)` ──▶ Python `Hello` ko variable samjhega aur crash ho jayega!',
      "Opening quote double `\"` aur closing quote single `\'` mix kar dena: `print(\"Hello\')`.",
      'Capital `Print()` likhna — Python is strictly case-sensitive!',
    ],
    question: {
      text: 'Neeche diye gaye do statements ke output mein kya difference hoga?\n1. print("10 + 10")\n2. print(10 + 10)',
      options: [
        'Dono ka output 20 aayega',
        'Pehle ka output "10 + 10" aayega aur dusre ka calculation result "20" aayega',
        'Dono mein error aayega',
        'Pehle ka output 20 aur dusre ka 10+10 aayega',
      ],
      correctIndex: 1,
      explanation: 'Quotes ke andar ka content exact text ki tarah print hota hai ("10 + 10"), jabki bina quotes ke Python arithmetic expressions ko evaluate karke 20 calculate karta hai.',
    },
  },
  {
    id: 7,
    title: '07 — Comments (#) & Clean Code Habits',
    concept: 'COMMENTS IN PYTHON (#) & CLEAN CODE',
    tagline: 'Notes for Humans that the Computer Completely Ignores',
    easyExplanation: 'Programming mein hum aksar code ke andar explanation ya notes likhte hain taaki hum ya hamari team baad mein samajh sake ki code kya kar raha hai. Lekin hum nahi chahte ki Python us note ko execute kare. Iske liye hum COMMENTS use karte hain! Python mein single-line comment banane ke liye hash `#` symbol use hota hai. `#` ke aage likhi poori line ko Python interpreter completely ignore kar deta hai.',
    realExample: 'Jaise construction blueprint par engineers pencil se notes likhte hain: "Pillar 4 reinforcement check", waise hi programmers code mein comments likhte hain.',
    why: 'Code read karna code likhne se 10 guna zyada common hota hai. Good comments clean software engineering ki sabse badi pehchaan hain.',
    flowDiagram: `Comment Mechanism:
# This is a comment ──▶ Python SKIPS this line (Zero CPU work)
print("This is code") ──▶ Python EXECUTES this line (Outputs to screen)`,
    syntax: `# Single Line Comment Starts with '#'
print("Active Code Line") # Inline comment after code`,
    syntaxBreakdown: [
      '#: Hash symbol indicates a comment in Python.',
      'Header Comment: File ke top par author, date, ya purpose batana.',
      'Inline Comment: Code line ke right side mein brief hint dena.',
    ],
    teacherExample: `# ============================================
# Program: Student Welcome Console
# Author: Prayxis Academy
# Day: 01 - Foundations
# ============================================

# Step 1: Display greeting message
print("Welcome to Prayxis Python Track!")

# Step 2: Display batch status
print("Batch: 2026 Active") # Active status`,
    whatYouShouldSee: 'Sirf `Welcome to Prayxis Python Track!` aur `Batch: 2026 Active` print hoga. Saare `#` comments screen par invisible rahenge.',
    microPractice: {
      prompt: 'Ek comment likhein aur uske niche 2 `print()` statements likhkar run karein.',
      starterCode: `# My Clean Python Script
# Created on Day 01
print("Comments keep my code clean!")
print("Python ignores hash lines.")`,
    },
    commonMistakes: [
      'HTML `<!-- -->` ya C++/JS `//` syntax use karna. Python mein ONLY `#` use hota hai single-line comments ke liye.',
      'Har single obvious line par useless comment likhna jaise: `print("hi") # this prints hi`. Only comment when explaining "why" or organizing sections.',
    ],
    question: {
      text: 'Python mein single-line comment start karne ke liye konsa symbol use hota hai?',
      options: ['//', '<!--', '#', '**'],
      correctIndex: 2,
      explanation: 'In Python, single-line comments always start with the `#` (hash) symbol.',
    },
  },
  {
    id: 8,
    title: '08 — Python Syntax, Rules & Errors',
    concept: 'PYTHON SYNTAX RULES & DEBUGGING MINDSET',
    tagline: 'Quotes, Case-Sensitivity & Why Errors are Your Friends',
    easyExplanation: 'Syntax ka simple meaning hai: Programming language mein code likhne ke strict rules. Jaise English grammar mein sentence capital letter se start aur full stop `.` se end hota hai, waise hi Python ke 3 golden syntax rules hain: 1. Case-Sensitivity (`print` is correct, `Print` or `PRINT` is an error!), 2. Matching Quotes (`"..."` or `\'...\'`), 3. Closing Parentheses (`()`). Agar code rule break karega to Python SYNTAX ERROR throw karega. Error se darna nahi hai — debugging programmer ka daily superpower hai!',
    realExample: 'Jaise spelling mistake par spell-check red line dikhata hai, waise hi Python interpreter rule break hone par exact line number ke saath SyntaxError report karta hai.',
    why: 'Error aane ka matlab yeh nahi ki aap fail ho gaye. Error ka matlab hai: "Python aapko bata raha hai ki kis line par kya fix karna hai".',
    flowDiagram: `4-Step Professional Debugging Rule:
READ ERROR MESSAGE ──▶ FIND LINE NUMBER ──▶ UNDERSTAND PROBLEM ──▶ FIX & RUN AGAIN`,
    syntax: `# Correct Syntax:
print("Double quotes match")
print('Single quotes match')

# Incorrect Syntax (Will throw errors):
# Print("Wrong capitalization") ──▶ NameError
# print("Missing closing quote)  ──▶ SyntaxError
# print("Missing paren"          ──▶ SyntaxError`,
    syntaxBreakdown: [
      'SyntaxError: Code writing rules violate hue hain.',
      'NameError: Python kisi word ko recognize nahi kar pa raha (e.g. capitalized `Print`).',
      'Traceback: Error report jo exact line number show karta hai.',
    ],
    teacherExample: `# Correct Syntax Demo
print("Rule 1: All lowercase 'print'")
print("Rule 2: Matching double quotes \"...\"")
print('Rule 3: Matching single quotes \'...\'')
print("Rule 4: Both opening ( and closing ) parentheses present")`,
    whatYouShouldSee: 'All 4 rules execute cleanly with zero errors.',
    microPractice: {
      prompt: 'Neeche diye gaye code mein syntax rule verify karke run karein.',
      starterCode: `# Verify clean syntax
print("Python is strictly case sensitive!")
print('Both double and single quotes work properly.')`,
    },
    commonMistakes: [
      'Capital `Print("Hello")` likhna — Python cannot find `Print`.',
      'Quotes start karke close karna bhool jana: `print("Hello)`.',
      'Closing bracket miss karna: `print("Hello"`.',
    ],
    question: {
      text: 'Agar aap Python mein Print("Hello") likhoge (capital P ke saath), to kya hoga?',
      options: [
        'Code normal print karega',
        "NameError aayega kyunki Python case-sensitive hai aur 'print' lowercase hona chahiye",
        'Computer crash ho jayega',
        'Output green color mein aayega',
      ],
      correctIndex: 1,
      explanation: 'Python is strictly case-sensitive. The built-in function is lowercase `print`. `Print` will trigger a NameError.',
    },
  },
  {
    id: 9,
    title: '09 — Your First Real Program',
    concept: 'BUILDING YOUR FIRST MULTI-LINE PROGRAM',
    tagline: 'Combining Comments, Strings, Numbers & Line Sequencing',
    easyExplanation: 'Ab tak humne saare individual concepts dekhe: Programming, Python, Interpreter, `print()`, Comments `#`, aur Syntax Rules. Ab in sabko combine karke hum banayenge apna pehla comprehensive Python Program: `my_first_program.py`! Is program mein hum multi-line output, student profile details, aur dynamic messaging display karenge.',
    realExample: 'CLI Tools & Terminal Installers: Jab aap software install karte ho, to terminal par welcome message, version details, author info, aur installation progress lines aati hain. This is how it starts!',
    why: 'Multi-line structured programs likhne se aapko real-world software structuring ka experience milta hai.',
    flowDiagram: `my_first_program.py Structure:
Header Comment ──▶ Welcome Greeting ──▶ Student Identity ──▶ Location & Age ──▶ Learning Goal ──▶ Encouraging Footer`,
    syntax: `# File: my_first_program.py
# Header section
print("=" * 35)
print("     PRAYXIS PYTHON CONSOLE     ")
print("=" * 35)

# Profile data
print("Developer : Prashant Singh")
print("Course    : Python Basics (Day 01)")
print("Mission   : Become a Pro Software Engineer")
print("=" * 35)`,
    syntaxBreakdown: [
      'Multi-line Output: Har print statement line-by-line render hoti hai.',
      'Decorators: `=` signs terminal par professional console border banate hain.',
      'Clean Formatting: Aligned text terminal ko professional look deta hai.',
    ],
    teacherExample: `# ============================================
# PROGRAM: MY FIRST PYTHON APPLICATION
# AUTHOR: PRAYXIS STUDENT
# ============================================

print("****************************************")
print("       WELCOME TO MY PYTHON APP        ")
print("****************************************")
print("Hello World!")
print("My name is Prashant.")
print("I am learning Python at Prayxis Academy.")
print("Today is Day 01 of my 30-Day journey.")
print("I am excited to build real software!")
print("****************************************")`,
    whatYouShouldSee: 'A formatted terminal card displaying the complete student welcome blueprint.',
    microPractice: {
      prompt: 'Is program ko customize karein apne real name, city, aur career goals ke saath.',
      starterCode: `# Customize your first real program
print("========================================")
print("       MY FIRST PYTHON PROGRAM          ")
print("========================================")
print("Hello everyone!")
print("My name is [Your Name].")
print("I live in [Your City].")
print("I am [Your Age] years old.")
print("I am learning Python at Prayxis Academy.")
print("My dream goal is [Your Dream Goal].")
print("========================================")`,
    },
    commonMistakes: [
      'Quotes ke andar brackets `[Your Name]` waise hi chhod dena. Replace it with your actual name!',
      'Border print statements mein quotes miss kar dena.',
    ],
    question: {
      text: 'Multiple print() statements ek program mein likhne par output kaise display hota hai?',
      options: [
        'Sabhi statements ek hi single word mein mix ho jaate hain',
        'Har print() statement default roop se nayi line par sequentially display hoti hai',
        'Python sirf pehli line run karke exit ho jata hai',
        'Output reverse order mein aata hai',
      ],
      correctIndex: 1,
      explanation: 'In Python, each standard `print()` statement automatically outputs on a new line in top-to-bottom sequence.',
    },
  },
  {
    id: 10,
    title: '10 — Practice Labs (5 Hands-On Labs)',
    concept: 'HANDS-ON PRACTICE LABS & MINI CHALLENGE',
    tagline: '5 Guided Labs + 1 Independence Challenge',
    easyExplanation: 'Programming sirf padhne se nahi aati — keyboard par ungliyan chalane se aati hai! Is section mein aapke paas 5 guided practice labs aur 1 Mini Challenge hai. Har lab ek specific concept ko reinforce karegi: 1. Hello World, 2. Personal Bio, 3. Prayxis Introduction, 4. 5-Line Custom Output, 5. Numbers & Math Practice.',
    realExample: 'Real software developers daily code katas aur problem-solving practice karte hain apne muscle memory aur logic ko sharp rakhne ke liye.',
    why: 'Continuous practical coding se aapka confidence build hota hai aur syntax errors pehle din hi khatam ho jaate hain.',
    flowDiagram: `Practice Pipeline:
Lab 01 (Hello) ──▶ Lab 02 (Bio) ──▶ Lab 03 (Prayxis) ──▶ Lab 04 (5 Lines) ──▶ Lab 05 (Numbers) ──▶ Mini Challenge`,
    syntax: `# Lab 1: Hello World
print("Hello World")

# Lab 2: Bio
print("Name: John Doe")
print("City: Jaipur")

# Lab 5: Numbers & Calculations
print(10)
print(20 + 30)`,
    syntaxBreakdown: [
      'Lab 01: Standard Hello World program.',
      'Lab 02: 3-line structured personal intro.',
      'Lab 03: Prayxis Academy tech launch message.',
      'Lab 04: 5 completely unique custom lines.',
      'Lab 05: Displaying numbers and mathematical outputs.',
      'Mini Challenge: 5-step custom program without looking at hints.',
    ],
    teacherExample: `# Teacher Lab Solutions Overview
print("--- LAB 01: HELLO WORLD ---")
print("Hello World")

print("\n--- LAB 02: BIO ---")
print("My name is Aman")
print("I live in Delhi")
print("I am learning Python")

print("\n--- LAB 05: NUMBERS ---")
print(100)
print(250 + 750)`,
    whatYouShouldSee: 'Clean, formatted output verifying all lab requirements.',
    microPractice: {
      prompt: 'Mini Challenge: Ek program likhein jo 5 lines print kare: 1. Greeting, 2. Name, 3. City, 4. Tech Goal, 5. Motto.',
      starterCode: `# Mini Challenge: Write your 5-line program
print("1. Namaste World!")
print("2. My name is [Name]")
print("3. I am from [City]")
print("4. My goal is to master Python in 30 Days")
print("5. Motto: Code, Build, and Never Give Up!")`,
    },
    commonMistakes: [
      'Codes ko copy-paste karna. Always type every character yourself to build real muscle memory!',
    ],
    question: {
      text: 'Jab aap print(50 + 50) run karte ho, to terminal par kya dikhta hai?',
      options: ['50 + 50', '100', '"100"', 'Error'],
      correctIndex: 1,
      explanation: 'Bina quotes ke Python arithmetic expressions ko evaluate karta hai, so 50 + 50 evaluates to the number 100.',
    },
  },
  {
    id: 11,
    title: '11 — Interactive Debugging Challenge',
    concept: 'BUG HUNTING: SPOT & FIX 3 BROKEN CODES',
    tagline: 'Mastering the Art of Error Recognition & Fixing',
    easyExplanation: 'Real world mein ek software engineer apna 50% time bugs aur errors fix karne mein bitata hai. Isliye Day 01 se hum error finding ki habit develop karenge. Neeche 3 intentionally broken Python programs diye gaye hain. Har program mein 1 common beginner error hai. Aapko error recognize karke correct code likhna hai!',
    realExample: 'NASA ke space shuttle software mein 1 character ki mistake se mission abort ho sakta tha. Code debugging precision is the most valuable skill in tech.',
    why: 'Jab aap errors ko intentionally analyze karte ho, to aapka dar khatam ho jata hai aur aap naturally clean code likhna shuru kar dete ho.',
    flowDiagram: `3 Common Beginner Bugs:
Bug 1: print("Hello)     ──▶ Unclosed string literal (Missing closing quote ")
Bug 2: Print("Hello")     ──▶ NameError (Capital 'P' instead of lowercase 'p')
Bug 3: print("Hello"      ──▶ SyntaxError: unexpected EOF (Missing closing paren ')')`,
    syntax: `# Bug 1 Fixed:
print("Hello")

# Bug 2 Fixed:
print("Hello")

# Bug 3 Fixed:
print("Hello")`,
    syntaxBreakdown: [
      'Bug 1: SyntaxError: unterminated string literal ──▶ Fix: Add closing quote `"`',
      "Bug 2: NameError: name 'Print' is not defined ──▶ Fix: Change to lowercase `print`",
      'Bug 3: SyntaxError: unexpected EOF while parsing ──▶ Fix: Add closing parenthesis `)`',
    ],
    teacherExample: `# Correct Clean Debugged Code
# All 3 bugs fixed:
print("Fix 1: String quotes properly closed!")
print("Fix 2: Function name strictly in lowercase!")
print("Fix 3: Closing parenthesis properly placed!")`,
    whatYouShouldSee: 'All 3 debugged statements execute with zero errors.',
    microPractice: {
      prompt: 'Neeche diye gaye broken code ko theek karke run karein.',
      starterCode: `# Fix the 3 broken lines below:
# Line 1: Fix the missing quote
print("Hello World!")

# Line 2: Fix the capitalization
print("I love Python")

# Line 3: Fix the missing parenthesis
print("Debugging is easy when you know the rules!")`,
    },
    commonMistakes: [
      'Error message ko bina padhe code ko randomly change karna. Hamesha pehle error message aur line number padhein!',
    ],
    question: {
      text: 'Neeche diye gaye broken code mein kya mistake hai?\nprint("Python Programming',
      options: [
        'Print capital hona chahiye tha',
        'Closing double quote (") aur closing parenthesis ()) dono missing hain',
        'Code mein koi error nahi hai',
        'Python likhna mana hai',
      ],
      correctIndex: 1,
      explanation: 'String ko end karne ke liye closing quote `"` aur function call close karne ke liye `)` dono zaroori hain.',
    },
  },
  {
    id: 12,
    title: '12 — Quick Revision Summary',
    concept: 'DAY 01 CORE REVISION PILLARS',
    tagline: '7 Foundational Pillars You Mastered Today',
    easyExplanation: 'Congratulations! Aapne Day 01 ka complete conceptual syllabus successfully cover kar liya hai. Aaiye ek baar 7 core foundational pillars ko quickly revise karte hain: 1. Programming (Computer ko instructions dena), 2. Python (High-level, clean, general-purpose language), 3. .py Extension (Python source file), 4. Interpreter (Line-by-line code execution engine), 5. print() (Output display function), 6. Comments # (Developer notes ignored by Python), 7. Syntax Rules (Case sensitivity, quotes, parentheses).',
    realExample: 'Har professional software architecture inhi basic rules ke upar complex applications build karta hai.',
    why: 'Mental clarity aur strong revision se Day 02 ke variables aur data types aapko effortlessly samajh aayenge.',
    flowDiagram: `The 7 Pillars of Python Day 01:
┌─────────────────┬────────────────────────────────────────┐
│ 1. Programming  │ Step-by-step instructions for computer │
│ 2. Python       │ High-level readable language           │
│ 3. .py File     │ Python script file extension           │
│ 4. Interpreter  │ Top-to-bottom line executor            │
│ 5. print()      │ Function to display screen output      │
│ 6. Comments (#) │ Private notes skipped by interpreter   │
│ 7. Syntax       │ Rules of grammar & case sensitivity    │
└─────────────────┴────────────────────────────────────────┘`,
    syntax: `# Quick Revision Checklist:
# [✓] Can explain what programming is
# [✓] Can explain what Python is
# [✓] Knows why .py extension is used
# [✓] Knows how interpreter executes code
# [✓] Can write print() with text and numbers
# [✓] Can write comments using #
# [✓] Can spot and debug syntax errors`,
    syntaxBreakdown: [
      'Next Step 1: 10-Question Verification Quiz attempt karein.',
      'Next Step 2: Final Practical Coding Mission (7 print statements) complete karein.',
    ],
    teacherExample: `# Day 01 Mastery Summary
print("Pillar 1: Instructions given to computer")
print("Pillar 2: Python is high-level and friendly")
print("Pillar 3: Saved as .py file")
print("Pillar 4: Executed by Python Interpreter")
print("Pillar 5: Displayed with print()")
print("Pillar 6: Documented with # comments")
print("Pillar 7: Clean syntax without errors")`,
    whatYouShouldSee: 'A complete 7-pillar checklist summary in your terminal.',
    microPractice: {
      prompt: 'Apna revision confirmation message print karein.',
      starterCode: `# Revision Verification
print("I have revised all 7 pillars of Day 01!")
print("I am ready for the Quiz and Final Mission.")`,
    },
    commonMistakes: [
      'Quiz skip karke directly nikal jana. Verification quiz ensures permanent memory retention!',
    ],
    question: {
      text: 'Python Interpreter kisi line par # symbol dekhne par kya karta hai?',
      options: [
        'Usko bold text mein print karta hai',
        'Us line ko completely skip kar deta hai aur execute nahi karta',
        'Error throw kar deta hai',
        'Program terminate kar deta hai',
      ],
      correctIndex: 1,
      explanation: 'Lines starting with `#` are comments and are completely skipped by the Python interpreter during execution.',
    },
  },
  {
    id: 13,
    title: '13 — Day 01 Verification Quiz',
    concept: 'DAY 01 KNOWLEDGE VERIFICATION QUIZ',
    tagline: '10 Interactive Questions — Instant Scoring & Explanations',
    easyExplanation: 'Test your understanding of all core Python concepts taught today. Answer all 10 questions to verify your mastery before moving to the final practical coding mission.',
    why: 'Self-assessment reinforces learning and ensures zero concept gaps.',
    syntax: 'Interactive 10-Question Quiz | Instant Evaluation',
    teacherExample: 'Answer all questions below and click SUBMIT QUIZ to see your final score and detailed explanations.',
    whatYouShouldSee: 'Interactive multiple-choice cards with zero answer leaks initially, and instant color-coded explanations upon submission.',
  },
  {
    id: 14,
    title: '14 — Final Mission: My First Program',
    concept: 'FINAL PRACTICAL MISSION: MY FIRST REAL PYTHON APP',
    tagline: 'Write, Test, Debug & Complete Day 01 Practical Task',
    easyExplanation: 'Ab aapka final practical task hai! Aapko bina copy-paste kiye Prayxis Python Laboratory mein apna complete program likhna hai. Program mein minimum 7 print() statements hone chahiye jo Greeting, Name, Age, City, Course, Why Python, aur Future Goal display karein. Once all requirements pass, aapka Day 01 module officially COMPLETE mark ho jayega!',
    why: 'Practical creation cements your identity as an active programmer.',
    syntax: `# Required 7 Statements Checklist:
# 1. Greeting (Hello / Namaste / Welcome)
# 2. Your Name
# 3. Your Age
# 4. Your City / Location
# 5. Course (Python Basics at Prayxis)
# 6. Why you are learning programming
# 7. Your ultimate future goal`,
    teacherExample: `# ============================================
# FINAL MISSION TEMPLATE
# ============================================
print("Hello, world and everyone at Prayxis!")
print("My name is Prashant Singh.")
print("I am 21 years old.")
print("I live in Jaipur, Rajasthan.")
print("I am learning Python Basics at Prayxis Academy.")
print("I am learning programming to build intelligent automation software.")
print("My future goal is to become a top software engineer.")`,
    whatYouShouldSee: 'A fully validated 7-line output with all verification checkmarks turned green!',
  },
];

export const PYTHON_DAY_01_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Programming kya hoti hai?',
    options: [
      'Computer ko kisi task ko accomplish karne ke liye instructions dena',
      'Computer screen ko paint karna',
      'Internet par video streaming chalana',
      'Operating system ke files delete karna',
    ],
    correctIndex: 0,
    explanation: 'Programming is the process of writing instructions that a computer can execute to perform a task.',
  },
  {
    id: 2,
    question: 'Python kis type ki programming language hai?',
    options: [
      'Low-level binary language',
      'High-level, readable, general-purpose language',
      'Database query language (SQL)',
      'Web browser stylesheet language (CSS)',
    ],
    correctIndex: 1,
    explanation: 'Python is a high-level, human-readable, and versatile general-purpose programming language.',
  },
  {
    id: 3,
    question: 'Python source code files ko save karne ke liye standard extension kya hai?',
    options: ['.html', '.css', '.py', '.js'],
    correctIndex: 2,
    explanation: 'Python code files are always saved with the `.py` extension (e.g. `hello.py`).',
  },
  {
    id: 4,
    question: 'Terminal ya monitor screen par output display karne ke liye Python mein konsa function use hota hai?',
    options: ['display()', 'print()', 'show()', 'echo()'],
    correctIndex: 1,
    explanation: '`print()` is the standard built-in function in Python used to output text and numbers to the screen.',
  },
  {
    id: 5,
    question: 'Python mein single-line comment start karne ke liye konsa symbol use hota hai?',
    options: ['//', '<!--', '#', '**'],
    correctIndex: 2,
    explanation: 'In Python, single-line comments always begin with the `#` (hash) symbol and are ignored by the interpreter.',
  },
  {
    id: 6,
    question: 'Kya Python ek Case-Sensitive language hai?',
    options: [
      "Yes, print aur Print alag hain (lowercase 'print' mandatory hai)",
      'No, kisi bhi capitalization mein likh sakte hain',
    ],
    correctIndex: 0,
    explanation: 'Python is strictly case-sensitive. Writing `Print()` instead of `print()` results in a NameError.',
  },
  {
    id: 7,
    question: 'Neeche diye gaye code ka output kya hoga?\nprint("Hello World")',
    options: ['"Hello World"', 'Hello World', 'Error', 'print("Hello World")'],
    correctIndex: 1,
    explanation: '`print("Hello World")` outputs `Hello World` without the quotes to the terminal screen.',
  },
  {
    id: 8,
    question: 'Is code mein kya bug / problem hai?\nprint("Hello)',
    options: [
      'P capital hona chahiye',
      'Closing double quote (") missing hai',
      'Parentheses galat hain',
      'Koi error nahi hai',
    ],
    correctIndex: 1,
    explanation: 'String properly close nahi hui hai (missing closing quote `"`), which triggers a SyntaxError.',
  },
  {
    id: 9,
    question: 'Kya print(100) ek valid Python code hai?',
    options: [
      'Yes, numbers ko bina quotes ke print kiya ja sakta hai',
      'No, numbers ke aas-paas quotes lagana mandatory hai',
      'Sirf decimals allow hain',
      'Python numbers print nahi kar sakta',
    ],
    correctIndex: 0,
    explanation: 'Yes! Python numbers (integers and floats) ko directly bina quotes ke print kiya ja sakta hai.',
  },
  {
    id: 10,
    question: 'Neeche diye gaye code ka output kya hoga?\nprint(10 + 20)',
    options: ['10 + 20', '1020', '30', 'Error'],
    correctIndex: 2,
    explanation: 'Bina quotes ke Python arithmetic expressions ko evaluate karta hai, so 10 + 20 evaluates to 30.',
  },
];
