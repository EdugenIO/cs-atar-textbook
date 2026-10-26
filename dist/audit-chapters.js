chapters.push(...[
  {
    "id": "software-responsibility",
    "week": 9,
    "title": "Software, ownership and licensing",
    "intro": "Before you copy or adapt code, check what its licence allows. Giving credit and having permission are separate responsibilities.",
    "badge": "SOFTWARE RESPONSIBILITY",
    "objectives": [
      "Explain intellectual property, copyright, piracy and plagiarism.",
      "Compare open-source and proprietary software licences.",
      "Create a source record for reused code."
    ],
    "sections": [
      [
        "Ideas, expression and permissions",
        "<p>Copying someone’s program and giving them credit does not automatically make the copying permitted. You need to check both who created the work and what you are allowed to do with it.</p><p><strong>Copyright</strong> protects original expression, including computer programs. It does not protect an abstract idea by itself. In Australia, protection generally starts automatically; registration is not required. The main law is the <em>Copyright Act 1968</em>.</p><p>Unauthorised copying or distribution of protected software is commonly called <strong>software piracy</strong>. Presenting another person’s work as your own is <strong>plagiarism</strong>. These are different issues: acknowledgement addresses authorship, while permission depends on the work and its licence. Source: <a href=\"https://www.ag.gov.au/rights-and-protections/copyright/copyright-basics\">Attorney-General’s Department: copyright basics</a>.</p>"
      ],
      [
        "Read the licence before reuse",
        "<p>Before reusing code, read its <strong>licence</strong>. It explains permitted uses and any conditions. A proprietary licence may allow you to use software while restricting access to its source or permission to redistribute it. Proprietary software may be paid or free of charge.</p><p>An <strong>open-source licence</strong> allows use, modification and redistribution under its conditions. You may need to keep notices, give attribution or share modified source under a compatible licence. Open source does not mean “no copyright”.</p><p>A public repository without a licence does not automatically grant open-source rights. A free download does not automatically permit changes or redistribution either. Compare the licences, rather than judging by price or where the software is hosted.</p><p>Definition reference: <a href=\"https://opensource.org/osd\">Open Source Initiative</a>. For permissions, also consult <a href=\"https://www.ag.gov.au/rights-and-protections/copyright/copyright-users\">Australian Government guidance for copyright users</a>.</p>"
      ],
      [
        "Keep a source record",
        "<table><tr><th>Record</th><th>Example for a hypothetical library</th></tr><tr><td>Creator and location</td><td>Example author; exact repository URL</td></tr><tr><td>Version and access date</td><td>Release 1.2; date consulted</td></tr><tr><td>Licence and conditions</td><td>Exact licence file; notices to retain</td></tr><tr><td>Contribution</td><td>Reused parsing function; adapted input format</td></tr><tr><td>Evidence</td><td>Link to licence and retained acknowledgement</td></tr></table><p>For each part you reuse:</p><ol><li>Record its creator, exact source and version.</li><li>Read the licence and note its conditions.</li><li>Keep the notices and acknowledgements the licence requires.</li><li>Describe which part you used and what you changed.</li><li>Follow any school rules about permitted assistance.</li></ol><p>If the rights are unclear, write your own implementation or obtain appropriate permission.</p>"
      ]
    ],
    "practice": [
      [
        "Distinguish",
        "A student credits a tutorial but copies code contrary to its licence. Has acknowledgement resolved the issue?",
        "No. Credit addresses attribution; it does not override licence restrictions. Permission and honest authorship are separate checks."
      ],
      [
        "Classify",
        "A repository shows its source but provides no licence. Can you call it open source and redistribute it?",
        "No. Source visibility alone does not grant open-source rights or permission to redistribute."
      ],
      [
        "Explain",
        "Is a free-to-download proprietary program necessarily open source?",
        "No. Price and licence rights are different. Inspect its licence and source rights."
      ]
    ],
    "task": "Compare two software licences chosen with your teacher. For each one, record whether you may use, modify and redistribute the code. List its conditions and explain what you would acknowledge in your own project.",
    "solution": "A suitable answer quotes or paraphrases each selected licence accurately, links the exact licence/version, separates permissions from obligations, and describes reused material honestly. Do not guess the terms from a product name or price.",
    "lessons": [
      "Week 9, lesson 1: share the existing API lesson with licensing and source-log practice; use the project’s real sources.",
      "Week 9, lesson 2: retrieve attribution concepts during debugging feedback. This is not an extra project lesson."
    ],
    "quiz": {
      "q": "Which statement is correct?",
      "options": [
        "Credit alone grants permission",
        "Open-source software can have licence conditions",
        "All free downloads are open source"
      ],
      "answer": 1,
      "explanation": "Open-source licences grant rights with conditions; attribution and permission are separate."
    },
    "recap": "Identify the creator, check permission, retain required notices and describe your own contribution. Price and source visibility do not establish reuse rights.",
    "reference": "https://www.ag.gov.au/rights-and-protections/copyright/copyright-basics",
    "refTitle": "Australian Government copyright basics"
  },
  {
    "id": "consolidation",
    "week": 15,
    "title": "Unit 1 consolidation",
    "intro": "Find one idea you are unsure about, practice it, then try a new example. Use your results to choose what to work on next.",
    "badge": "UNIT 1 REVIEW",
    "objectives": [
      "Diagnose gaps across programming and networking.",
      "Translate and trace original pseudocode.",
      "Record corrections and justify design choices."
    ],
    "sections": [
      [
        "Diagnose before choosing practice",
        "<p>Try the six prompts without opening the answers. For each one, record “secure”, “unsure” or “revisit”. If you guessed correctly, still check that you can explain why. Use the results to choose a practice station.</p><section class=\"practice\"><p>D1. Represent character B (decimal code point 66) in binary and hexadecimal.</p><details><summary>Show explained answer</summary><p>1000010 (or 01000010 for eight-bit notation), and 42 hexadecimal. The number is unchanged.</p></details></section><section class=\"practice\"><p>D2. Evaluate <code>NOT False AND False OR True</code>.</p><details><summary>Show explained answer</summary><p>True. NOT first gives True; AND then gives False; OR True gives True. Grouping it as NOT (False AND False OR True) would instead give False.</p></details></section><section class=\"practice\"><p>D3. Trace [4, 9, 9] through a first-maximum algorithm.</p><details><summary>Show explained answer</summary><p>Initial best index 0; after index 1 best is 1; after index 2 it stays 1. Strict comparison preserves the first tie.</p></details></section><section class=\"practice\"><p>D4. Choose a file mode that retains yesterday’s records.</p><details><summary>Show explained answer</summary><p>Append, a. Read does not add records; write replaces existing content.</p></details></section><section class=\"practice\"><p>D5. Are 192.168.6.10 and 192.168.7.10 local under /24?</p><details><summary>Show explained answer</summary><p>No. Networks are 192.168.6.0 and 192.168.7.0. Routing is required between them.</p></details></section><section class=\"practice\"><p>D6. Does crediting copied code make every reuse permissible?</p><details><summary>Show explained answer</summary><p>No. Check the licence or permission independently of attribution.</p></details></section>"
      ],
      [
        "Station A: Boolean expressions and types",
        "<p>A visitor can enter if they are at least 16 and have permission, or if they are escorted. Write <code>(age &gt;= 16 and has_permission) or is_escorted</code>. Then translate <code>and</code> and <code>or</code> to uppercase pseudocode operators.</p><p>Test ages 15, 16 and 17. For each age, try permission true and false, and escorted true and false. At age 15 with permission True and escorted False, admission is False. Change only escorted to True: admission becomes True. Explain which part of the condition changed the decision.</p><p>Compare <code>not (a and b)</code> with <code>(not a) and b</code> using <code>a=False</code> and <code>b=False</code>. The results are True and False. Choose a type for each value too: an integer item count, a float measured length, a string identifier such as “0042”, and Boolean permission. Explain why each type fits.</p>"
      ],
      [
        "Station B: algorithms in two representations",
        "<p>Write the steps and trace them before coding. In this pseudocode, <code>=</code> assigns and <code>==</code> compares. Structural keywords are uppercase and each block has an ending. The FOR bounds include both ends. In these positive-step examples, a start above the finish gives zero passes.</p><pre><code>FUNCTION LoadAndShow\n    values = []\n    value = 0\n    FOR i = 0 TO 3\n        INPUT(value)\n        values.append(value)\n    END FOR\n    FOR i = 0 TO values.length - 1\n        PRINT(i, values[i])\n    END FOR\nEND LoadAndShow</code></pre><pre><code>FUNCTION Total(values)\n    total = 0\n    FOR i = 0 TO values.length - 1\n        total = total + values[i]\n    END FOR\n    RETURN total\nEND Total</code></pre><pre><code>FUNCTION FirstMaximum(values)\n    best = -1\n    IF values.length &gt; 0 THEN\n        best = 0\n        FOR i = 1 TO values.length - 1\n            IF values[i] &gt; values[best] THEN\n                best = i\n            END IF\n        END FOR\n    END IF\n    RETURN best\nEND FirstMaximum</code></pre><p>To find a minimum, reverse the comparison to <code>&lt;</code>. <code>FirstMaximum</code> returns -1 for an empty array. Check this result before indexing: in Python, index -1 means the last element, not “not found”.</p><p>Translate the algorithms into Python. Test an empty list, one value, all-negative values and repeated minimum or maximum values. The load task assumes four valid integer inputs. Add validation as a separate extension.</p>"
      ],
      [
        "Station C: debug and prove the correction",
        "<p>A maximum algorithm starts <code>best_value</code> at zero. Try <code>[-8, -3]</code>. It may incorrectly keep zero, even though zero is not in the list. After checking that the list is not empty, start from its first value instead.</p><p>Reproduce the failure, then follow the changing values. Temporary print statements can show which branches run and the current index and best value. Fix the cause and rerun both the failed test and earlier tests. Remove the diagnostic prints when finished.</p><p>Name the kind of error: a missing colon is a syntax error; an invalid index causes a runtime error; a wrong comparison may cause a logic error.</p>"
      ],
      [
        "Station D: design, files and responsibility",
        "<p>Read three quantity records 2, 0 and 5 and predict a total of 7. In a practice folder, create the file in write mode, process it in read mode, then append 3 and check the new total 10. Use with statements to ensure files are closed, and document how missing or malformed files are handled.</p><p>Review one club-project requirement with its actual test result. Explain a unit test, an organiser acceptance trial and a developer retrospective. Add an API example and your source log. A proposed expected output is a plan; an observed comparison is test evidence.</p>"
      ],
      [
        "Station E: network explanation and diagrams",
        "<p>Use the <a href=\"https://senior-secondary.scsa.wa.edu.au/__data/assets/pdf_file/0003/1090875/Year-11_12_Computer-Science_ATAR_Additional-syllabus-support-booklet-.PDF#page=16\">current support booklet’s printed page 12</a> as the symbol reference. Draw a wired lab LAN, a WLAN with an access point, and a WAN connection joining local networks. Annotate links, required addresses and masks. Have a partner trace local and remote traffic on each drawing.</p><ul><li>Use the shown Cisco-style symbols, rather than substituting unlabelled boxes.</li><li>Connect wireless clients through an access point; use a router between IP networks.</li><li>Place the firewall outside the trusted network with no IP label, following the course convention.</li><li>Explain the role of the modem/provider connection and your chosen media.</li><li>Identify one threat, an OS control, a firewall rule and a plausible performance constraint.</li></ul><p>Diagrams still need teacher checking against the official visual conventions. Do not infer real-world firewall addressing from the assessment convention.</p>"
      ]
    ],
    "practice": [
      [
        "Reflect",
        "How will you know a correction has helped?",
        "Solve a fresh question without prompts, explain the reasoning and compare against independently prepared expectations."
      ],
      [
        "Transfer",
        "Why test [-8, -3] as well as [4, 9, 9]?",
        "All-negative data exposes incorrect zero initialisation; tied positives test the chosen tie policy."
      ]
    ],
    "task": "Choose the two stations you most need to practice. Keep a trace or test record from each. Then try a fresh transfer question chosen with your teacher. Write three specific things to practice next.",
    "solution": "A strong record names the misconception, shows corrected working, contains actual evidence and demonstrates success on a fresh question. Network drawings must be reviewed against the support-booklet symbols.",
    "lessons": [
      "Lesson 1: six-prompt diagnostic, explained feedback and station choices.",
      "Lesson 2: programming stations A–C; teacher models the most common misconception.",
      "Lesson 3: project/files/licensing and networking stations D–E.",
      "Lesson 4: fresh transfer questions, feedback and a personal revision plan."
    ],
    "quiz": {
      "q": "What makes revision evidence stronger?",
      "options": [
        "Rereading every page",
        "Solving and explaining a fresh problem after correcting a mistake",
        "Copying model answers"
      ],
      "answer": 1,
      "explanation": "Transfer to a fresh problem shows more than recognising a familiar answer."
    },
    "recap": "Trace changing state, test boundaries and ties, explain protocol and device roles, and check permissions separately from attribution.",
    "reference": "https://senior-secondary.scsa.wa.edu.au/__data/assets/pdf_file/0003/1090875/Year-11_12_Computer-Science_ATAR_Additional-syllabus-support-booklet-.PDF",
    "refTitle": "SCSA course conventions"
  },
  {
    "id": "exam-preparation",
    "week": 16,
    "title": "Unit 1 exam preparation",
    "intro": "Try a mixed set of questions, explain how you reached each answer, and use mistakes to choose your next revision task.",
    "badge": "UNIT 1 REVIEW",
    "objectives": [
      "Apply Unit 1 ideas to unfamiliar examples.",
      "Use explained answers to check your reasoning.",
      "Target remaining misconceptions with fresh practice."
    ],
    "sections": [
      [
        "Use the practice paper",
        "<p>Use this original practice paper as optional revision. It is not an official SCSA examination and does not test every skill. Allow 5 minutes to read and 55 minutes to work. If your lessons are shorter, spread the attempt across lessons 1–2.</p><p>Write Python and pseudocode answers without running the code on your first attempt. Try the questions before opening the answers below or downloading them separately. Use the answers to find a step you need to practice again.</p><p><a class=\"button\" href=\"unit1-practice-paper.md\" download>Download questions only</a> <a class=\"button secondary\" href=\"unit1-practice-answers.md\" download>Download explained answers</a></p>"
      ],
      [
        "Q1 · 3 marks",
        "<section class=\"practice\"><p>Character C has decimal code point 67. Write its binary and hexadecimal values, then explain whether a code point always occupies one byte.</p><details><summary>Show explained answer</summary><p>1000011 or 01000011. hexadecimal 43. a code point identifies a character; byte length depends on encoding, so it is not always one byte.</p></details></section>"
      ],
      [
        "Q2 · 4 marks",
        "<section class=\"practice\"><p>Evaluate 18 % 5. Evaluate not False and False or True, showing grouping. Explain the difference between = and == in Python.</p><details><summary>Show explained answer</summary><p>remainder 3. Boolean result True. ((not False) and False) or True, with NOT before AND before OR. = assigns; == compares.</p></details></section>"
      ],
      [
        "Q3 · 5 marks",
        "<section class=\"practice\"><p>Given values = [6, -2, 6], trace a first-maximum algorithm initialised with best = 0 and updated only when values[i] > values[best]. State the final index, maximum and sum. Explain the empty-array precaution.</p><details><summary>Show explained answer</summary><p>at i=1, best remains 0. at i=2, best remains 0 because 6 &gt; 6 is false. index 0 and maximum 6. sum 10. check non-empty before accessing element zero; define an empty result. Other clear trace layouts are possible.</p></details></section>"
      ],
      [
        "Q4 · 4 marks",
        "<section class=\"practice\"><p>Write a Python function admission(age, has_permission, is_escorted) returning (age >= 16 and has_permission) or is_escorted. Identify parameters and the arguments in admission(15, True, False), and give the result.</p><details><summary>Show explained answer</summary><p>valid function header with the three parameters. correctly grouped return expression. age/has_permission/is_escorted are parameters; 15/True/False are arguments. False.</p></details></section>"
      ],
      [
        "Q5 · 4 marks",
        "<section class=\"practice\"><p>A score must be a whole number from 0 to 100 inclusive. Give below/at/above tests for the upper boundary, a conversion-failure input, and state expected outcomes.</p><details><summary>Show explained answer</summary><p>99 accepted. 100 accepted. 101 rejected. text such as abc or 2.5 rejected as integer input. State the expected outcome alongside each input.</p></details></section>"
      ],
      [
        "Q6 · 4 marks",
        "<section class=\"practice\"><p>Yesterday’s file contains one line 2. A program adds today’s quantity 3 using w mode. Explain the failure, select the correct mode, explain reliable closure, and predict the sum after the corrected append-and-read operation.</p><details><summary>Show explained answer</summary><p>w replaces the earlier data. use a to retain and append, with a newline record separator. a with block closes the file when the block exits. sum 5 after reading the two records; assume valid integer lines.</p></details></section>"
      ],
      [
        "Q7 · 4 marks",
        "<section class=\"practice\"><p>A project has a correct calculation but users cannot recover from an invalid quantity. Explain why it is incomplete, propose acceptance evidence, identify a unit test and describe a useful retrospective point.</p><details><summary>Show explained answer</summary><p>it fails an agreed recovery requirement despite correct calculation. organiser enters invalid text then a valid quantity and continues without restarting. isolated calculation call with known input and expected return. evidence-based reflection about the development process and a future change, such as earlier validation testing.</p></details></section>"
      ],
      [
        "Q8 · 3 marks",
        "<section class=\"practice\"><p>A public repository has visible source but no licence. Explain why visibility alone does not establish open-source status; distinguish plagiarism from copyright permission; name one item to record before reusing code.</p><details><summary>Show explained answer</summary><p>open source requires licence rights to use, modify and redistribute, not just visibility. plagiarism concerns misrepresenting authorship; acknowledgement does not independently grant permission. exact licence/permission and conditions, or creator/source/version with an explanation of its use.</p></details></section>"
      ],
      [
        "Q9 · 4 marks",
        "<section class=\"practice\"><p>For a protected web request using TCP, name the four DoD TCP/IP layers in order and give one responsibility or suitable protocol at each.</p><details><summary>Show explained answer</summary><p>Application — HTTPS/web service; Transport — TCP/ordered stream; Internet — IP/addressing and routing; Network — Ethernet or Wi-Fi/local frames. Explain both the layer and its role or example.</p></details></section>"
      ],
      [
        "Q10 · 3 marks",
        "<section class=\"practice\"><p>Compare IPv4 with IPv6. Are 192.168.8.10 and 192.168.9.10 local to each other under 255.255.255.0? Explain the mask’s role.</p><details><summary>Show explained answer</summary><p>IPv4 32 bits versus IPv6 128 bits (IPv6 has a larger address space). no, their /24 network addresses differ. the mask identifies the network portion used in that comparison.</p></details></section>"
      ],
      [
        "Q11 · 6 marks",
        "<section class=\"practice\"><p>Draw a logical diagram for eight wired PCs, six wireless laptops, a local server and Internet access. Use course Cisco-style conventions; include required addresses/masks and security. Justify one medium and one performance decision.</p><details><summary>Show explained answer</summary><p>switch with wired PCs and local server. access point links wireless clients to the LAN. router and appropriate provider/modem connection, with correctly connected course symbols. coherent unique addresses/masks and firewall outside trusted network without IP label. justified medium, such as UTP for fixed nearby PCs or fibre for a suitably described long link. evidence-based performance choice, such as investigating wireless airtime/placement rather than assuming a faster switch fixes everything. Teacher visually checks symbol fidelity; other coherent layouts are possible.</p></details></section>"
      ],
      [
        "Q12 · 4 marks",
        "<section class=\"practice\"><p>Explain how a firewall and an operating system help prevent unauthorised access. Explain why broadcasts and shared-medium contention can affect performance.</p><details><summary>Show explained answer</summary><p>firewall permits/blocks traffic according to rules. OS authentication, permissions or updates with a threat explanation. broadcasts consume capacity/processing within the broadcast domain. contention/collisions on shared media consume time; modern full-duplex switched Ethernet avoids old half-duplex collision behaviour.</p></details></section>"
      ],
      [
        "Turn feedback into a plan",
        "<p>Check one point at a time using the explained answers. Equivalent correct explanations and working are acceptable. For each mistake, decide whether you needed more knowledge, made a tracing/calculation error, misread the question or did not explain your reasoning clearly.</p><p>Choose your three weakest questions. Change the data, try again and explain what you corrected. Written answers do not replace practical work. You still need opportunities to load arrays, process files, develop and debug programs, keep development records and draw LAN, WLAN and WAN diagrams. Use the coverage audit to see what remains to be checked.</p>"
      ]
    ],
    "practice": [
      [
        "Interpret",
        "Why is a correct layer name alone not enough to answer Q9?",
        "The prompt requires both the layer and its role or a suitable protocol. Answer all parts of the requirement."
      ],
      [
        "Reflect",
        "What should follow checking your answers?",
        "Explain any errors, then try fresh examples without looking at the answers."
      ]
    ],
    "task": "Try the practice paper, then check the explanations and correct your mistakes. Choose three weak areas and try changed examples. Bring one question you can now explain and one you still want help with.",
    "solution": "Keep your first attempt, point-by-point corrections, a reason for each significant error and independently completed transfer questions. Teacher review is needed for diagrams and equivalent answers.",
    "lessons": [
      "Lesson 1: reading and first paper attempt; continue in lesson 2 if needed.",
      "Lesson 2: finish the attempt, then check using the explanations.",
      "Lesson 3: fresh questions and teacher feedback on weak areas.",
      "Lesson 4: final retrieval, diagram/trace checks and a personal exam plan. Weeks 17–18 remain blocked for exams."
    ],
    "quiz": {
      "q": "What can checking this practice sample tell you?",
      "options": [
        "An official ATAR prediction",
        "Which parts of this sample need further practice",
        "That all syllabus skills are mastered"
      ],
      "answer": 1,
      "explanation": "This paper samples learning. Use it with practical evidence and feedback; it is not a grade prediction."
    },
    "recap": "Read the requested action, show trace and calculation working, connect explanations to the scenario, and use errors to focus the next practice.",
    "reference": "https://senior-secondary.scsa.wa.edu.au/__data/assets/pdf_file/0003/1090875/Year-11_12_Computer-Science_ATAR_Additional-syllabus-support-booklet-.PDF",
    "refTitle": "SCSA course conventions"
  }
]);

const getChapter = id => chapters.find(c=>c.id===id);
getChapter('functions').sections.push(['Trace local and global names', "<pre>rate = 3\ndef cost(quantity):\n    rate = 4\n    return quantity * rate\nprint(cost(2))\nprint(rate)</pre><p>The function call prints 8. The next line prints 3, the module-level value of <code>rate</code>. The assignment inside <code>cost</code> changes a local name, not that global name. Follow the argument 2 into the parameter <code>quantity</code>, then translate the function into pseudocode. When a function needs a value that may change, consider passing it as an argument.</p>"]);
getChapter('loops').sections.push(['Test-first and test-last repetition', "<p>A WHILE loop checks its condition before running the body. If the condition is false at the start, the body runs zero times. A REPEAT…UNTIL loop checks at the end, so the body always runs at least once. It stops when the UNTIL condition is true. Python has no built-in repeat-until statement.</p><pre>REPEAT\n    INPUT(age)\nUNTIL age &gt;= 6 AND age &lt;= 17</pre><p>This example keeps asking for an age until it is from 6 to 17 inclusive. In Python, you can use <code>while True</code>, read the age, then run <code>break</code> when <code>6 &lt;= age &lt;= 17</code>. This assumes the input is already an integer; add conversion-error handling for a robust program. Test 5, 6, 17 and 18. Check carefully whether your condition means “keep going” or “stop”.</p>"]);
getChapter('arrays').sections.push(['Translate the standard algorithms', "<p>Open <a href=\"#consolidation\">station B in Unit 1 consolidation</a>. It shows pseudocode for loading and displaying values, finding a total and finding the first maximum. Trace each algorithm by hand, then translate it into Python. To find the minimum instead, reverse the comparison.</p>"]);

getChapter("consolidation").sections.splice(2,0,["Types, operators and functions together", "<p>This original pair applies integer age, float length, string LABEL and Boolean permission. Trace the arguments into the parameters; the local admitted value is returned. The global constant LABEL is read, not changed. Predict Visitor 1.5 True followed by True.</p><h3>Pseudocode</h3><pre>CONST LABEL = &quot;Visitor&quot;\nFUNCTION Describe(age, length, has_permission)\n    admitted = age &gt;= 16 AND has_permission\n    PRINT(LABEL, length, admitted)\n    RETURN admitted\nEND Describe\nPRINT(Describe(16, 1.5, TRUE))</pre><h3>Python</h3><pre>LABEL = &quot;Visitor&quot;\ndef describe(age, length, has_permission):\n    admitted = age &gt;= 16 and has_permission\n    print(LABEL, length, admitted)\n    return admitted\nprint(describe(16, 1.5, True))</pre><p>Compare 2 == 2 (True), 2 != 2 (False), 2 &gt; 2 (False), 2 &lt; 2 (False), 2 &gt;= 2 (True) and 2 &lt;= 2 (True). Change one operand and predict again. Translate Python and/or/not to AND/OR/NOT in your algorithm.</p>"]);
