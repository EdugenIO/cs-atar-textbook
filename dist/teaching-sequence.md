# Computer Science ATAR: proposed teaching sequence

Historical planning baseline: 13 October 2026. Resource status reconciled with textbook edition 0.48 on 14 October 2026. Python; SQLite recommended for this textbook. This is a recommended teaching design, not an official SCSA outline or certified alignment. Editorial maps for all four units are available; independent review and learner evidence remain pending.

## Time assumptions

Each semester has 18 weeks: 16 teaching weeks × 4 lessons = 64 available lessons, followed by two blocked exam weeks. Four units provide 256 teaching lessons over two years. Assessments, feedback, projects and revision fit inside the 64; they are not extra periods. Week numbers reset each semester. If exams occur earlier, move the blocked weeks to the school's calendar while preserving teaching-week order.

At 55 minutes per lesson this provides 58 hours 40 minutes per unit; at 50 minutes it provides 53 hours 20 minutes. SCSA specifies a notional 55 class contact hours per unit. Confirm actual period duration and losses from school events before treating the allocation as sufficient.

## Teaching approach

Use prerequisites to set the order, explicit modelling before independent work, and cumulative retrieval throughout. This is an evidence-informed recommendation, not a claim that one outline is proven most effective for every class.

Default four-lesson cycle:
1. Retrieve earlier learning; explain and model the next idea.
2. Trace, complete and modify a worked example with guided feedback.
3. Apply the idea independently in Python, SQL, diagrams or a case study.
4. Consolidate, explain reasoning, correct misconceptions or complete a project milestone.

Include a brief retrieval prompt in every lesson. Use lesson 4 flexibly: a test replaces its usual activity; project workshops can occupy lessons 3 and 4 in the nominated weeks. Do not attempt a major new concept during an assessment lesson. Homework is optional practice and reading, not essential first teaching.

## Unit 1: Year 11 semester 1

| Teaching week | Chapter focus | Four-lesson allocation and evidence |
|---|---|---|
| 1 | Getting started with Python | Diagnostic; environment; input/output; make a small calculator. Introduce requirements and testing. |
| 2 | Values and representation | Types and conversion; arithmetic; binary/decimal/hexadecimal; character representation exercise. |
| 3 | Making decisions | Comparisons; Boolean expressions; if/elif/else; boundary tests. |
| 4 | Repetition | for and while; counters/accumulators; trace tables; independent loop task. |
| 5 | Functions | Parameters/arguments; return values; scope; refactor a small program. |
| 6 | Arrays in Python | List-based implementation of one-dimensional arrays; load/display; total; locate minimum/maximum. |
| 7 | Text files and reliable input | Read/write/append/close; validation; exceptions; controlled programming practical (one lesson). |
| 8 | Designing a solution | Project brief; requirements and Gantt chart; structure chart/stubs; design checkpoint. |
| 9 | Building and testing | API concepts; debug and test; two project workshop lessons. Teach code attribution/licensing in the software-responsibility chapter. |
| 10 | Evaluating software | Four project lessons: integration/tests, corrections, acceptance trial, demonstration and retrospective/submission. |
| 11 | How networks communicate | Follow a message through TCP/IP; protocols; map components to layers; short explanations. |
| 12 | Addressing and hardware | IP/subnet-mask roles; IPv4/IPv6; devices/media; diagram exercises. |
| 13 | Designing a network | LAN/WLAN/WAN; CISCO conventions; security; performance trade-offs in a supplied scenario. |
| 14 | Applying network knowledge | Design justification; integrated practice; controlled theory test; feedback. |
| 15 | Consolidation and recovery | Targeted reteaching; code tracing; diagram interpretation; unfinished-learning buffer. |
| 16 | Exam preparation | Timed mixed questions; marking and correction; independent transfer task; readiness check. |
| 17–18 | Exam block | No new chapters or project deadlines. |

Project: a console-based school-club order manager. Core features: functions, validated input, array processing, file storage and documented tests. Use synthetic data. No GUI requirement. A network design activity remains a learning activity inside the theory strand, not an additional summative project.

## Unit 2: Year 11 semester 2

| Teaching week | Chapter focus | Four-lesson allocation and evidence |
|---|---|---|
| 1 | Relational database foundations | Data/information; flat-file maintenance; DBMS/related tables; independent workbook and feedback. |
| 2 | Modelling entities and relationships | Entities/identifiers; keys/references; crow’s-foot relationships; data dictionary and feedback. |
| 3 | Normalisation | Anomalies/1NF; partial dependencies/2NF; transitive dependencies/3NF; transfer and feedback. |
| 4 | Getting started with SQL | Open/query; filters; Boolean logic and sorting; independent reports/feedback. |
| 5 | Building a database solution: reports | Key joins; category joins; inventory aggregates; independent report queries and feedback. |
| 6 | Building a database solution: implementation | Creation/constraints; INSERT/UPDATE; DELETE/recovery; controlled SQL practice. |
| 7 | Database project | Brief and requirements; design workshop; data-quality decisions; design checkpoint. |
| 8 | Security frameworks | CIA/AAA; apply to project; two build-workshop lessons. |
| 9 | Threats and defences | Classify supplied incidents; match controls; two build-workshop lessons. |
| 10 | Protecting access | Authentication/password policies; encryption; two build-workshop lessons. |
| 11 | Cryptography in practice | Substitution/rotation/Vigenère; cracking weaknesses; two project testing lessons. |
| 12 | Responsible data use | Privacy and ethical hacking case studies; two evaluation/demo lessons; project submission. |
| 13 | Bringing security and data together | Audit a supplied system; justify access/backup decisions; mixed questions; explain trade-offs. |
| 14 | Applying the unit | Database-design practice; security stimulus response; controlled theory test; feedback. |
| 15 | Consolidation and recovery | Targeted SQL practice; normalisation repair; security retrieval; buffer. |
| 16 | Exam preparation | Timed mixed questions; correction; transfer problem; readiness check. |
| 17–18 | Exam block | No new chapters or project deadlines. |

Project: an equipment-loan database using synthetic borrowers and loans. Plan four related tables so modelling is sufficiently rich; check the exact syllabus specifications when writing the brief. Require queries, data dictionary, test evidence and a privacy/security justification. All scheduled security lessons must include deliberate instruction and practice; project documentation alone is not sufficient.

## Unit 3: Year 12 semester 1

| Teaching week | Chapter focus | Four-lesson allocation and evidence |
|---|---|---|
| 1 | Rebuilding fluency | Diagnostic; repair Year 11 gaps; compare development processes; practise version history/backups. |
| 2 | Richer data structures | Two-dimensional arrays/dictionaries; functions and parameter behaviour; tracing; small application. |
| 3 | Searching | Linear/binary search; trace; implement; compare growth using Big O. |
| 4 | Sorting | Bubble/insertion/selection sort; trace; compare; choose an algorithm for a scenario. |
| 5 | Objects and classes | Class/object/attribute/method; constructors; encapsulation; refactor an example. |
| 6 | Extending object-oriented design | Inheritance; polymorphism/abstraction; guided implementation; controlled programming practical. |
| 7 | Software project | Brief and requirements; modular design; class design; checkpoint. |
| 8 | Reliable software | Unit/acceptance/load tests; debugging; two build-workshop lessons. |
| 9 | Maintaining software | Code review; social/ethical responsibilities; two build-workshop lessons. |
| 10 | Evaluating the solution | Two test-and-refine workshops; demonstration/authentication; project submission and retrospective. |
| 11 | Network models and packets | OSI/TCP-IP comparison; switching/routing; TCP/UDP; follow a packet. |
| 12 | Addressing and subnetting | Public/private addresses; masks/CIDR; guided calculations; independent address plan. |
| 13 | Network design | Segmentation/security/performance; network services and protocols; diagrams; defend design choices. |
| 14 | Applying the unit | Integrated scenarios; mixed algorithm retrieval; controlled theory test; feedback. |
| 15 | Consolidation and recovery | Algorithm/OOP repair; subnetting practice; timed explanations; buffer. |
| 16 | Exam preparation | Timed mixed questions; correction; unfamiliar stimulus task; readiness check. |
| 17–18 | Exam block | No new chapters or project deadlines. |

Project: an object-oriented equipment-booking application. Require purposeful classes, searchable records, a justified algorithm choice and testing against requirements. Start with a console interface; assess computing knowledge rather than interface decoration.

## Unit 4: Year 12 semester 2

| Teaching week | Chapter focus | Four-lesson allocation and evidence |
|---|---|---|
| 1 | Database design refresher | Diagnostic; ER/relational notation; normalisation; extend a supplied model. |
| 2 | Integrity and transactions | Constraints; referential/domain/entity integrity; ACID; explain failed transactions. |
| 3 | Advanced SQL | Multi-table joins; grouping/aggregates; calculated/concatenated fields; report task. |
| 4 | Database operations | Schema changes; cascading deletion; cleaning/importing; controlled SQL practical. |
| 5 | Database project | Brief and requirements; five-plus-table design; data dictionary; checkpoint. |
| 6 | Threat analysis | Internal/external threats; CIA/AAA; two database workshop lessons. |
| 7 | Defensive systems | Logs and mitigation choices; control evaluation; two database workshop lessons. |
| 8 | Secure communication | Certificates and encryption; connection/data-exchange model; two project workshop lessons. |
| 9 | Security responsibilities | Privacy/breach case studies; red/blue teams; two project testing lessons. |
| 10 | Evaluating the solution | Two refinement workshops; demonstration/authentication; submission and review. |
| 11 | Integrated case studies | Database/program connectivity; security/data decisions; extended responses; mixed Unit 3 retrieval. |
| 12 | Applying the unit | Unfamiliar stimulus practice; modelling/query review; controlled theory test; feedback. |
| 13 | Full-course consolidation | Programming and algorithms; SQL; networking; security. |
| 14 | Targeted repair | Use diagnostic results to reteach; individual practice; feedback; contingency buffer. |
| 15 | Exam practice | Timed sections; marking; rewritten answers; second attempt on misconceptions. |
| 16 | Final preparation | Full-course transfer tasks; personalised revision; readiness check; no project spillover. |
| 17–18 | Exam block | No new chapters. School exams are scheduled separately from the external ATAR examination. |

Project: the relational database behind the booking application, with at least five tables. Require realistic reporting queries, constraints, data cleaning, tests and justified security decisions. A small Python/database connection demonstration can link the two semesters without making a large integrated interface compulsory.

## Proposed assessment skeleton

Eight summative tasks per year; project checkpoints and weekly quizzes are formative components, not separately weighted tasks. Each semester: project, practical test, theory test, examination.

| Task | Year 11 annual contribution | Year 12 annual contribution |
|---|---:|---:|
| Semester 1 project | 20% | 20% |
| Semester 1 practical | 5% | 5% |
| Semester 1 theory | 10% | 5% |
| Semester 1 examination | 15% | 20% |
| Semester 2 project | 20% | 20% |
| Semester 2 practical | 5% | 5% |
| Semester 2 theory | 10% | 5% |
| Semester 2 examination | 15% | 20% |
| Total | 100% | 100% |

This matches the 2026 syllabus category weightings: Year 11 project/theory/practical/exam 40/20/10/30; Year 12 40/10/10/40. Build the final assessment outline with representative content sampling, appropriate authentication and school policies. Reserve one teaching lesson for each practical and theory task; adjust duration and remove equivalent practice time if a task requires two. Examinations occur within the blocked period, not as four normal teaching lessons. The external Year 12 examination is not one of these school assessment tasks.

## Project time budget

Unit 1: 10 design/build/test/evaluation lessons (4 in week 8, 2 in week 9, 4 in week 10). Unit 2: 14 (4 in week 7 and 2 each in weeks 8–12). Unit 3: 12 (4 in week 7, 2 each in weeks 8–9, 4 in week 10). Unit 4: 16 (4 in week 5, 2 each in weeks 6–9, 4 in week 10). These are embedded in the 64 lessons and replace normal application periods. Early weekly coding/SQL activities prepare students for these workshops. Project size must fit the supervised allocation; do not depend on extensive homework to finish core requirements.

## Textbook writing order

Draft chapters and editorial coverage maps are available for all four units. Independent teacher review and classroom evidence remain pending. The chapters introduce programming foundations before the Unit 1 project and networks, and database foundations before Unit 2 security. Preserve the existing chapter IDs when revising content so that links in coverage maps, the teaching schedule and website navigation continue to work.

Before declaring complete alignment, audit every knowledge and skill point—including protocol lists, ethics/legal content, API concepts and DB modelling sizes—against the syllabus and support booklet. This document sets the sequence and available time; it does not replace that audit.

## Sources and rationale

- SCSA official course page and current syllabuses/support materials: https://senior-secondary.scsa.wa.edu.au/syllabus-and-support-materials/technologies/computer-science
- Year 11 sample outline (reference, not a prescribed sequence): https://senior-secondary.scsa.wa.edu.au/__data/assets/pdf_file/0006/1141845/Computer-Science-ATAR-Y11-sample-course-outline-.PDF
- Year 12 sample outline (reference, not a prescribed sequence): https://senior-secondary.scsa.wa.edu.au/__data/assets/pdf_file/0003/1092756/Computer-Science-ATAR-Year-12-Sample-course-outline.pdf
- AERO explicit instruction: https://www.edresearch.edu.au/sites/default/files/2021-03/AERO-Tried-and-tested-guide-Explicit-instruction.pdf
- AERO spacing and retrieval: https://www.edresearch.edu.au/guides-resources/practice-guides/spacing-and-retrieval-practice-guide-full-publication

The sequencing, example projects, workshop budgets and assessment timing are original planning recommendations. Effective implementation requires adjustment to diagnostic evidence, actual lesson duration and the school calendar.
