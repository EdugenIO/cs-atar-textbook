chapters.push(...[
  {
    "id": "software-responsibility",
    "week": 9,
    "title": "Software, ownership and licensing",
    "intro": "Reuse code responsibly. Distinguish acknowledging an author from having permission to copy, modify or distribute their work.",
    "badge": "SOFTWARE RESPONSIBILITY",
    "objectives": [
      "Explain intellectual property, copyright, piracy and plagiarism.",
      "Compare open-source and proprietary software licences.",
      "Create a source record for reused code."
    ],
    "sections": [
      [
        "Ideas, expression and permissions",
        "<p>Intellectual property concerns rights over creations. Australian copyright protects original expression, including computer programs, rather than an abstract idea by itself. Copyright protection generally arises automatically; registration is not required in Australia. The principal legislation is the Copyright Act 1968.</p><p>Unauthorised copying or distribution of protected software is commonly called software piracy. Plagiarism presents another person’s work as your own, such as submitting copied code without acknowledgement. Acknowledging a source does not itself grant copyright permission.</p><p>Source: <a href=\"https://www.ag.gov.au/rights-and-protections/copyright/copyright-basics\">Attorney-General’s Department: copyright basics</a>. This chapter introduces course concepts; permissions depend on the work and its licence.</p>"
      ],
      [
        "Read the licence before reuse",
        "<p>A software licence states permitted uses and conditions. Proprietary software usually reserves rights and permits specified use under its terms; access to source code and redistribution may be restricted. It can be free of charge or paid.</p><p>Open-source licences permit use, modification and redistribution of source code under stated conditions. Open source does not mean no copyright or no obligations. Conditions may include retaining notices, attribution or sharing modified source under a compatible licence. Publicly visible source code without a licence is not automatically open source.</p><p>A price of zero tells you nothing by itself about modification or redistribution rights. Compare the actual licences rather than making assumptions about price or hosting.</p><p>Definition reference: <a href=\"https://opensource.org/osd\">Open Source Initiative</a>. For permissions, also consult <a href=\"https://www.ag.gov.au/rights-and-protections/copyright/copyright-users\">Australian Government guidance for copyright users</a>.</p>"
      ],
      [
        "Keep a source record",
        "<table><tr><th>Record</th><th>Example for a hypothetical library</th></tr><tr><td>Creator and location</td><td>Example author; exact repository URL</td></tr><tr><td>Version and access date</td><td>Release 1.2; date consulted</td></tr><tr><td>Licence and conditions</td><td>Exact licence file; notices to retain</td></tr><tr><td>Contribution</td><td>Reused parsing function; adapted input format</td></tr><tr><td>Evidence</td><td>Link to licence and retained acknowledgement</td></tr></table><p>Use this workflow for your club project: identify the reused part, inspect its licence, record conditions, retain required notices, describe your changes, and follow assessment rules about assistance. When rights are unclear, use your own implementation or obtain appropriate permission.</p>"
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
    "task": "Compare two teacher-selected software licences. Record whether each permits use, modification and redistribution, its obligations, and what you would acknowledge in a project.",
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
    "intro": "Use evidence to choose what to practise. Repair a misconception, then solve a new version of the problem.",
    "badge": "UNIT 1 REVIEW",
    "objectives": [
      "Diagnose gaps across programming and networking.",
      "Translate and trace original pseudocode.",
      "Record corrections and justify design choices."
    ],
    "sections": [
      [
        "Diagnose before choosing practice",
        "<p>Complete the six prompts without looking at the answers. Mark each as secure, unsure or revisit. Use your results to choose a practice station. A correct guess is a reason to explain again.</p><section class=\"practice\"><p>D1. Represent character B (decimal code point 66) in binary and hexadecimal.</p><details><summary>Show answer and marking guidance</summary><p>1000010 (or 01000010 for eight-bit notation), and 42 hexadecimal. The number is unchanged.</p></details></section><section class=\"practice\"><p>D2. Evaluate <code>NOT False AND False OR True</code>.</p><details><summary>Show answer and marking guidance</summary><p>True. NOT first gives True; AND then gives False; OR True gives True. Grouping it as NOT (False AND False OR True) would instead give False.</p></details></section><section class=\"practice\"><p>D3. Trace [4, 9, 9] through a first-maximum algorithm.</p><details><summary>Show answer and marking guidance</summary><p>Initial best index 0; after index 1 best is 1; after index 2 it stays 1. Strict comparison preserves the first tie.</p></details></section><section class=\"practice\"><p>D4. Choose a file mode that retains yesterday’s records.</p><details><summary>Show answer and marking guidance</summary><p>Append, a. Read does not add records; write replaces existing content.</p></details></section><section class=\"practice\"><p>D5. Are 192.168.6.10 and 192.168.7.10 local under /24?</p><details><summary>Show answer and marking guidance</summary><p>No. Networks are 192.168.6.0 and 192.168.7.0. Routing is required between them.</p></details></section><section class=\"practice\"><p>D6. Does crediting copied code make every reuse permissible?</p><details><summary>Show answer and marking guidance</summary><p>No. Check the licence or permission independently of attribution.</p></details></section>"
      ],
      [
        "Station A: Boolean expressions and types",
        "<p>A visitor is admitted if they are at least 16 and have permission, or if they are escorted. Write <code>(age &gt;= 16 and has_permission) or is_escorted</code>. Translate it into uppercase Boolean operators in pseudocode. Then test age 15/16/17 with permission both true and false and escorted both true and false. Explain which cases take each branch.</p><p>For age 15, permission True, escorted False, admission is False. Changing only escorted to True makes admission True. Distinguish <code>not (a and b)</code> from <code>(not a) and b</code> using a=False, b=False: the results are True and False.</p><p>Choose integer for an item count, float for a measured length, string for an identifier such as 0042, and Boolean for permission. Explain the choice rather than listing names.</p>"
      ],
      [
        "Station B: algorithms in two representations",
        "<p>Write and trace your algorithm before translating it into Python. This original pseudocode uses the course guidance: = assigns, == compares; structural keywords are uppercase, and block endings are explicit. FOR bounds below are inclusive. A start above the finish performs zero iterations for our positive-step examples.</p><pre><code>FUNCTION LoadAndShow\n    values = []\n    value = 0\n    FOR i = 0 TO 3\n        INPUT(value)\n        values.append(value)\n    END FOR\n    FOR i = 0 TO values.length - 1\n        PRINT(i, values[i])\n    END FOR\nEND LoadAndShow</code></pre><pre><code>FUNCTION Total(values)\n    total = 0\n    FOR i = 0 TO values.length - 1\n        total = total + values[i]\n    END FOR\n    RETURN total\nEND Total</code></pre><pre><code>FUNCTION FirstMaximum(values)\n    best = -1\n    IF values.length &gt; 0 THEN\n        best = 0\n        FOR i = 1 TO values.length - 1\n            IF values[i] &gt; values[best] THEN\n                best = i\n            END IF\n        END FOR\n    END IF\n    RETURN best\nEND FirstMaximum</code></pre><p>For a minimum, reverse the comparison to &lt;. FirstMaximum returns -1 for an empty array; the caller must check before using it as an index. Python -1 indexes the last element, so it cannot be used as an unchecked “not found” position.</p><p>Translate each algorithm and test empty, one-element, all-negative and tied-extreme cases. The load task assumes four valid integer inputs; add validation as a separate extension.</p>"
      ],
      [
        "Station C: debug and prove the correction",
        "<p>A maximum algorithm starts best_value at zero. With [-8, -3], zero is not in the data and is not the maximum. Start from the first actual element after checking that the input is not empty.</p><p>Place a temporary print inside each visited branch to identify the path and another to show index and best. Reproduce the failure, step through it, correct it and rerun the failing and previous tests. Remove diagnostic output when finished.</p><p>Differentiate a missing colon (syntax), access to an invalid index (runtime), and a wrong comparison that runs but gives the wrong answer (logic).</p>"
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
    "task": "Complete your weakest two stations, retain a trace or test record from each, then answer a fresh teacher-selected transfer question. Write a three-item revision plan.",
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
    "intro": "Practise a mixed paper, explain your working, then use feedback to choose your final revision.",
    "badge": "UNIT 1 REVIEW",
    "objectives": [
      "Apply Unit 1 ideas to unfamiliar examples.",
      "Use marking guidance to evaluate an answer.",
      "Target remaining misconceptions with fresh practice."
    ],
    "sections": [
      [
        "Use the practice paper",
        "<p>This original 48-mark practice paper is a representative revision sample, not an official SCSA examination or a complete assessment of every skill. Suggested timing: 5 minutes reading plus 55 minutes working. If your period is shorter, split it across lessons 1–2. Use written Python and pseudocode; do not run code during the first attempt.</p><p>Answers are available below and in the separate answer download. Attempt the questions first. School assessment conditions, weighting and authentication are set separately by your teacher.</p><p><a class=\"button\" href=\"unit1-practice-paper.md\" download>Download questions only</a> <a class=\"button secondary\" href=\"unit1-practice-answers.md\" download>Download answers and marking guidance</a></p>"
      ],
      [
        "Q1 · 3 marks",
        "<section class=\"practice\"><p>Character C has decimal code point 67. Write its binary and hexadecimal values, then explain whether a code point always occupies one byte.</p><details><summary>Show answer and marking guidance</summary><p>1 mark: 1000011 or 01000011. 1: hexadecimal 43. 1: a code point identifies a character; byte length depends on encoding, so it is not always one byte.</p></details></section>"
      ],
      [
        "Q2 · 4 marks",
        "<section class=\"practice\"><p>Evaluate 18 % 5. Evaluate not False and False or True, showing grouping. Explain the difference between = and == in Python.</p><details><summary>Show answer and marking guidance</summary><p>1: remainder 3. 1: Boolean result True. 1: ((not False) and False) or True, with NOT before AND before OR. 1: = assigns; == compares.</p></details></section>"
      ],
      [
        "Q3 · 5 marks",
        "<section class=\"practice\"><p>Given values = [6, -2, 6], trace a first-maximum algorithm initialised with best = 0 and updated only when values[i] > values[best]. State the final index, maximum and sum. Explain the empty-array precaution.</p><details><summary>Show answer and marking guidance</summary><p>1: at i=1, best remains 0. 1: at i=2, best remains 0 because 6 &gt; 6 is false. 1: index 0 and maximum 6. 1: sum 10. 1: check non-empty before accessing element zero; define an empty result. A correct alternative trace layout earns credit.</p></details></section>"
      ],
      [
        "Q4 · 4 marks",
        "<section class=\"practice\"><p>Write a Python function admission(age, has_permission, is_escorted) returning (age >= 16 and has_permission) or is_escorted. Identify parameters and the arguments in admission(15, True, False), and give the result.</p><details><summary>Show answer and marking guidance</summary><p>1: valid function header with the three parameters. 1: correctly grouped return expression. 1: age/has_permission/is_escorted are parameters; 15/True/False are arguments. 1: False.</p></details></section>"
      ],
      [
        "Q5 · 4 marks",
        "<section class=\"practice\"><p>A score must be a whole number from 0 to 100 inclusive. Give below/at/above tests for the upper boundary, a conversion-failure input, and state expected outcomes.</p><details><summary>Show answer and marking guidance</summary><p>1: 99 accepted. 1: 100 accepted. 1: 101 rejected. 1: text such as abc or 2.5 rejected as integer input. Award each point only when the expected outcome accompanies the input.</p></details></section>"
      ],
      [
        "Q6 · 4 marks",
        "<section class=\"practice\"><p>Yesterday’s file contains one line 2. A program adds today’s quantity 3 using w mode. Explain the failure, select the correct mode, explain reliable closure, and predict the sum after the corrected append-and-read operation.</p><details><summary>Show answer and marking guidance</summary><p>1: w replaces the earlier data. 1: use a to retain and append, with a newline record separator. 1: a with block closes the file when the block exits. 1: sum 5 after reading the two records; assume valid integer lines.</p></details></section>"
      ],
      [
        "Q7 · 4 marks",
        "<section class=\"practice\"><p>A project has a correct calculation but users cannot recover from an invalid quantity. Explain why it is incomplete, propose acceptance evidence, identify a unit test and describe a useful retrospective point.</p><details><summary>Show answer and marking guidance</summary><p>1: it fails an agreed recovery requirement despite correct calculation. 1: organiser enters invalid text then a valid quantity and continues without restarting. 1: isolated calculation call with known input and expected return. 1: evidence-based reflection about the development process and a future change, such as earlier validation testing.</p></details></section>"
      ],
      [
        "Q8 · 3 marks",
        "<section class=\"practice\"><p>A public repository has visible source but no licence. Explain why visibility alone does not establish open-source status; distinguish plagiarism from copyright permission; name one item to record before reusing code.</p><details><summary>Show answer and marking guidance</summary><p>1: open source requires licence rights to use, modify and redistribute, not just visibility. 1: plagiarism concerns misrepresenting authorship; acknowledgement does not independently grant permission. 1: exact licence/permission and conditions, or creator/source/version with an explanation of its use.</p></details></section>"
      ],
      [
        "Q9 · 4 marks",
        "<section class=\"practice\"><p>For a protected web request using TCP, name the four DoD TCP/IP layers in order and give one responsibility or suitable protocol at each.</p><details><summary>Show answer and marking guidance</summary><p>1 each: Application — HTTPS/web service; Transport — TCP/ordered stream; Internet — IP/addressing and routing; Network — Ethernet or Wi-Fi/local frames. Both layer and role/example are required for each mark.</p></details></section>"
      ],
      [
        "Q10 · 3 marks",
        "<section class=\"practice\"><p>Compare IPv4 with IPv6. Are 192.168.8.10 and 192.168.9.10 local to each other under 255.255.255.0? Explain the mask’s role.</p><details><summary>Show answer and marking guidance</summary><p>1: IPv4 32 bits versus IPv6 128 bits (IPv6 has a larger address space). 1: no, their /24 network addresses differ. 1: the mask identifies the network portion used in that comparison.</p></details></section>"
      ],
      [
        "Q11 · 6 marks",
        "<section class=\"practice\"><p>Draw a logical diagram for eight wired PCs, six wireless laptops, a local server and Internet access. Use course Cisco-style conventions; include required addresses/masks and security. Justify one medium and one performance decision.</p><details><summary>Show answer and marking guidance</summary><p>1: switch with wired PCs and local server. 1: access point links wireless clients to the LAN. 1: router and appropriate provider/modem connection, with correctly connected course symbols. 1: coherent unique addresses/masks and firewall outside trusted network without IP label. 1: justified medium, such as UTP for fixed nearby PCs or fibre for a suitably described long link. 1: evidence-based performance choice, such as investigating wireless airtime/placement rather than assuming a faster switch fixes everything. Teacher visually checks symbol fidelity; alternative coherent layouts can earn credit.</p></details></section>"
      ],
      [
        "Q12 · 4 marks",
        "<section class=\"practice\"><p>Explain how a firewall and an operating system help prevent unauthorised access. Explain why broadcasts and shared-medium contention can affect performance.</p><details><summary>Show answer and marking guidance</summary><p>1: firewall permits/blocks traffic according to rules. 1: OS authentication, permissions or updates with a threat explanation. 1: broadcasts consume capacity/processing within the broadcast domain. 1: contention/collisions on shared media consume time; modern full-duplex switched Ethernet avoids old half-duplex collision behaviour.</p></details></section>"
      ],
      [
        "Turn feedback into a plan",
        "<p>Mark one point at a time using the guidance. Accept equivalent correct explanations and working. Total marks are not a grade prediction. Categorise lost marks as knowledge, tracing/calculation, interpreting the prompt or explaining reasoning. Reattempt your three weakest questions with changed data, then explain the correction.</p><p>The paper does not replace practical evidence: loading arrays, processing files, developing/debugging a program, using development records and drawing the three network types still need classroom evidence. Use the coverage audit to check these.</p>"
      ]
    ],
    "practice": [
      [
        "Interpret",
        "Why does a correct layer name alone not earn its Q9 mark?",
        "The prompt requires both the layer and its role or a suitable protocol. Answer all parts of the requirement."
      ],
      [
        "Reflect",
        "What should follow self-marking?",
        "Identify why marks were lost and reattempt fresh variants; copying the answer is not evidence of learning."
      ]
    ],
    "task": "Attempt the 48-mark paper, annotate corrections, then solve three fresh variants chosen from your weakest areas. Bring one question you can now explain and one that remains uncertain.",
    "solution": "A useful submission has your unaided first attempt, point-by-point corrections, a reason for each significant error and independently completed transfer questions. Teacher review is needed for diagrams and equivalent answers.",
    "lessons": [
      "Lesson 1: reading and first paper attempt; continue in lesson 2 if needed.",
      "Lesson 2: finish the attempt, then self-mark with explanations.",
      "Lesson 3: fresh questions and teacher feedback on weak areas.",
      "Lesson 4: final retrieval, diagram/trace checks and a personal exam plan. Weeks 17–18 remain blocked for exams."
    ],
    "quiz": {
      "q": "What does a 48-mark revision score establish?",
      "options": [
        "An official ATAR prediction",
        "Performance on this sample, to guide further practice",
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
getChapter('functions').sections.push(['Trace local and global names', `<pre>rate = 3
def cost(quantity):
    rate = 4
    return quantity * rate
print(cost(2))
print(rate)</pre><p>The call prints 8, then the module-level rate prints 3. The assignment inside cost is local. Translate the function into pseudocode and trace the argument 2 through the parameter quantity. Prefer passing changing dependencies as arguments.</p>`]);
getChapter('loops').sections.push(['Test-first and test-last repetition', `<p>A WHILE condition is tested before the body, so the body may run zero times. A REPEAT…UNTIL loop tests at the end, so the body runs at least once and stops when the condition is true. Python has no native repeat-until statement.</p><pre>REPEAT
    INPUT(age)
UNTIL age &gt;= 6 AND age &lt;= 17</pre><p>Assuming already converted integer input, an equivalent Python pattern uses <code>while True</code>, reads age, then <code>if 6 &lt;= age &lt;= 17: break</code>. Add specific conversion handling for a robust program. Test 5, 6, 17 and 18. A test-last loop must not invert the stopping condition.</p>`]);
getChapter('arrays').sections.push(['Translate the standard algorithms', `<p>Use <a href="#consolidation">station B in Unit 1 consolidation</a> for original pseudocode for loading/displaying, summing and locating the first maximum. Translate each into Python; reverse the comparison for the minimum. Trace the algorithm independently before running it.</p>`]);

getChapter("consolidation").sections.splice(2,0,["Types, operators and functions together", "<p>This original pair applies integer age, float length, string LABEL and Boolean permission. Trace the arguments into the parameters; the local admitted value is returned. The global constant LABEL is read, not changed. Predict Visitor 1.5 True followed by True.</p><h3>Pseudocode</h3><pre>CONST LABEL = &quot;Visitor&quot;\nFUNCTION Describe(age, length, has_permission)\n    admitted = age &gt;= 16 AND has_permission\n    PRINT(LABEL, length, admitted)\n    RETURN admitted\nEND Describe\nPRINT(Describe(16, 1.5, TRUE))</pre><h3>Python</h3><pre>LABEL = &quot;Visitor&quot;\ndef describe(age, length, has_permission):\n    admitted = age &gt;= 16 and has_permission\n    print(LABEL, length, admitted)\n    return admitted\nprint(describe(16, 1.5, True))</pre><p>Compare 2 == 2 (True), 2 != 2 (False), 2 &gt; 2 (False), 2 &lt; 2 (False), 2 &gt;= 2 (True) and 2 &lt;= 2 (True). Change one operand and predict again. Translate Python and/or/not to AND/OR/NOT in your algorithm.</p>"]);
