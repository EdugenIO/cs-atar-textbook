# Lesson exit checks — teacher guide

Original formative questions · 31 October 2026 · 2026 syllabus foundation with 2027 revisions.
Allow about five minutes; use an oral explanation, paper trace, diagram or small demonstration as appropriate. These checks do not add weighted assessment tasks or alter controlled-task conditions. For controlled lessons, discuss the submitted version only after collection. Expected reasoning is guidance, not exact-text marking. Accept equivalent valid reasoning and record actual learner evidence separately.

## Unit 1 — Year 11

### Week 1 · Lesson 1 — Diagnose prior knowledge and decompose the badge problem

Badges cost $3 each. For 5 badges, identify input, processing and output.

**Expected reasoning:** Input 5; multiply 5 by 3; output $15.

**If not yet secure:** If input/output are swapped, draw three labelled boxes and trace 2 badges.

### Week 1 · Lesson 2 — Set up the editor and run the example

Save and run the badge program for quantity 2. Then change the price to $4 and rerun.

**Expected reasoning:** Saved file runs; totals are $6 then $8; identify the edited constant.

**If not yet secure:** If output stays $6, check the saved filename and rerun the edited file.

### Week 1 · Lesson 3 — Trace, modify and test a sequential program

With badge price reset to $3, add a $2 charge. Predict totals for 0 and 3 badges before running.

**Expected reasoning:** $2 and $11; multiply before adding the fixed charge.

**If not yet secure:** If 3 gives $15, compare quantity * price + charge with quantity * (price + charge).

### Week 1 · Lesson 4 — Complete the book-cover task and explain the results

Covers cost $2 each plus $4 per order. Write the calculation and predict 0, 1 and 5 covers.

**Expected reasoning:** quantity * 2 + 4; $4, $6 and $14 under the stated every-order rule.

**If not yet secure:** If zero gives zero, revisit whether the fixed handling charge applies.

### Week 2 · Lesson 1 — Compare types, convert input and trace arithmetic

Choose types for identifier '0042', quantity 4, measured length 2.5 and paid True.

**Expected reasoning:** str, int, float, bool; identifier retains leading zeros.

**If not yet secure:** If identifier is int, convert '0042' and explain the lost representation.

### Week 2 · Lesson 2 — Apply operators and precedence to short Python expressions

Predict 17 // 4, 17 % 4, 2 + 3 * 4 and (2 + 3) * 4.

**Expected reasoning:** 4, 1, 14 and 20; distinguish quotient/remainder and precedence.

**If not yet secure:** If precedence is wrong, annotate the first operation before evaluating.

### Week 2 · Lesson 3 — Convert binary, decimal and hexadecimal using place values

Convert decimal 45 to eight-bit binary and hexadecimal; show place values.

**Expected reasoning:** 00101101 and 2D; 32 + 8 + 4 + 1 and 2*16 + 13.

**If not yet secure:** If a digit is wrong, convert the proposed result back to decimal.

### Week 2 · Lesson 4 — Explain code points and check character/number representations

'A' is U+0041 and uses one UTF-8 byte; 'é' is U+00E9 and uses two. Explain code point versus encoding.

**Expected reasoning:** Code point identifies the character; UTF-8 maps it to bytes; one character need not be one byte.

**If not yet secure:** If 233 is called a byte count, separate the identifier number from stored bytes.

### Week 3 · Lesson 1 — Compare values and trace Boolean conditions

For score 7, predict score >= 5 and score == 5. Explain = versus ==.

**Expected reasoning:** True and False; = assigns, == compares.

**If not yet secure:** If both are true, substitute 7 into each comparison separately.

### Week 3 · Lesson 2 — Combine conditions with and, or and not

Evaluate age >= 12 and member for age 11/member True, then age 12/member False.

**Expected reasoning:** False in both; and requires both operands true.

**If not yet secure:** If either is accepted, build the four-row and truth table.

### Week 3 · Lesson 3 — Implement if, elif and else for a supplied decision

Write a decision: negative quantity is invalid, zero is empty, otherwise process the order.

**Expected reasoning:** if quantity < 0; elif quantity == 0; else; only one branch executes.

**If not yet secure:** If all branches run, trace -1, 0 and 2 through the chain.

### Week 3 · Lesson 4 — Design boundary tests, run them and explain corrections

Valid ratings are integers 1–5 inclusive. Give four tests that distinguish both boundaries.

**Expected reasoning:** 0 rejected, 1 accepted, 5 accepted, 6 rejected.

**If not yet secure:** If only 3 is tested, add values immediately inside/outside each boundary.

### Week 4 · Lesson 1 — Model fixed repetition with for and range

List the values in range(2, 5). How many loop bodies execute?

**Expected reasoning:** 2, 3, 4; three bodies; stop value excluded.

**If not yet secure:** If 5 is included, compare range start/stop with an inclusive pseudocode loop.

### Week 4 · Lesson 2 — Use a while loop to run an interactive window

At 160 pixels/second, predict movement after 250 ms. Explain why frame count is not elapsed seconds and demonstrate both quit controls.

**Expected reasoning:** 40 pixels; 250 ms = 0.25 s; frame durations vary; Escape and window X close cleanly.

**If not yet secure:** If movement is 40000, convert milliseconds to seconds before multiplying.

### Week 4 · Lesson 3 — Trace counters/accumulators and repair mistakes

Trace total=0; for n in range(1,4): total=total+n. What fails if total=0 is inside the body?

**Expected reasoning:** Totals 1, 3, 6; resetting inside loses earlier additions and leaves 3.

**If not yet secure:** If only final output is given, write before/after totals for each pass.

### Week 4 · Lesson 4 — Complete and test the score task

For scores 8,10,6,12 predict total and mean. Where should total be initialised and mean calculated?

**Expected reasoning:** Total 36, mean 9; initialise before loop, calculate mean after four inputs.

**If not yet secure:** If mean is 36 or resets, trace accumulator and division separately.

### Week 5 · Lesson 1 — Model function definitions and calls

Define double(number) returning number*2. Predict double(6)+1 and identify argument/parameter.

**Expected reasoning:** 13; 6 is argument, number is parameter; return supplies 12 to caller.

**If not yet secure:** If output is None, compare printing inside a function with returning a value.

### Week 5 · Lesson 2 — Use parameters and returns to separate game rules

In the supplied lab, pause then pass 95000 ms to update. Reset afterwards. Explain return versus mutation.

**Expected reasoning:** Paused position/time unchanged; reset restores all initial fields; new_state returns a fresh state while update changes its argument.

**If not yet secure:** If paused time falls, inspect the mode guard before the time update.

### Week 5 · Lesson 3 — Compare local and global names

Global score=10; a function assigns local score=3 and returns score. Predict the return and global score afterwards.

**Expected reasoning:** Returns 3; global remains 10 without a global declaration.

**If not yet secure:** If global becomes 3, draw separate local/global name boxes.

### Week 5 · Lesson 4 — Complete boundary tests for delivery_charge

Delivery is $5 below $50 and free from $50; negatives invalid. Predict -1,49,50,51.

**Expected reasoning:** Invalid, $5, $0, $0; 50 belongs to the free branch.

**If not yet secure:** If 50 costs $5, compare > with >= at the exact threshold.

### Week 6 · Lesson 1 — Load and display an array-style list

For names=['Al','Bo','Cy'], give names[0], names[2], len(names), and the result of names[3].

**Expected reasoning:** 'Al', 'Cy', 3 and IndexError; indices are 0–2.

**If not yet secure:** If index 3 is accepted, label index and ordinal position separately.

### Week 6 · Lesson 2 — Traverse a list to collect stations once

Collect the same practice station twice, then a different station. State the score change and test reset.

**Expected reasoning:** One increment per distinct station; repeated station adds zero; reset clears collected flags and score.

**If not yet secure:** If the repeated station scores again, inspect its collected flag before updating score.

### Week 6 · Lesson 3 — Locate minimum/maximum positions

Find the first maximum and its index in [4,9,9,2] using a traversal.

**Expected reasoning:** Maximum 9, first index 1; update on > rather than >= for first occurrence.

**If not yet secure:** If index 2 is returned, check the stated tie rule and comparison.

### Week 6 · Lesson 4 — Test edge cases and complete the temperature task

For temperatures [-3,-1,-5], predict min, max and mean; state a safe empty-list policy.

**Expected reasoning:** -5, -1 and -3; empty list reports no readings without indexing/dividing.

**If not yet secure:** If max is zero, initialise from an actual reading rather than zero.

### Week 7 · Lesson 1 — Model read/write/append and file paths

A file contains '7\n'. Explain the difference between opening it with w and a before writing '8\n'.

**Expected reasoning:** w truncates to 8; a preserves 7 then adds 8; relative paths depend on working directory.

**If not yet secure:** If both are called append, run each mode on separate disposable copies.

### Week 7 · Lesson 2 — Add range validation and specific exception handling

Accept whole scores 0–100. Classify '0','100','101','three' and name the conversion exception.

**Expected reasoning:** 0/100 accepted; 101 out of range; 'three' raises ValueError during int conversion.

**If not yet secure:** If all failures use bare except, separate conversion errors from file errors.

### Week 7 · Lesson 3 — Combine game tests with reading and appending results

In the practice lab, finish once, revisit result state, then simulate an unwritable history file.

**Expected reasoning:** One append per result; no duplicate on redisplay; failed write gives a useful message; prior history preserved.

**If not yet secure:** If redisplay appends again, put saving on the result transition and retest reset.

### Week 7 · Lesson 4 — Controlled practical: adapt a fresh problem using weeks 1–7 skills

After the controlled practical, trace your submitted algorithm for zero records and identify one input assumption.

**Expected reasoning:** Trace follows submitted code; empty-input result and assumption are explicit; no new marks assigned by this check.

**If not yet secure:** If evidence differs from submitted code, retain the original and discuss the mismatch after collection.

### Week 8 · Lesson 1 — Choose a Pygame theme and agree the shared brief

Choose one game theme. Name two shared functional requirements and one measurable quality requirement.

**Expected reasoning:** Use canonical FR/NFR IDs with observable behaviour; theme changes appearance, not common scope.

**If not yet secure:** If extra art is treated as required, reopen the common contract and separate optional decoration.

### Week 8 · Lesson 2 — Design game states, functions and one-dimensional lists

Draw start→playing→paused→playing→result states and specify one function input/output plus the score list.

**Expected reasoning:** Transitions have named triggers; function responsibility and 1D history representation match the Year 11 contract.

**If not yet secure:** If drawing changes rules, separate update responsibilities from rendering in the design.

### Week 8 · Lesson 3 — Build the game state and controls skeleton

Demonstrate title/start/pause/resume/restart/quit in the skeleton without requiring finished mechanics.

**Expected reasoning:** Each trigger reaches its intended state; restart restores initial values; close events remain processed.

**If not yet secure:** If quit stalls when paused, handle window events in every state.

### Week 8 · Lesson 4 — Build movement and fixed-layout collision rules

Put the player at an outer boundary; attempt one outward and one inward move. Repeat at one wall if applicable.

**Expected reasoning:** Outward move stays in bounds; inward move succeeds where permitted; expected/actual positions recorded.

**If not yet secure:** If clamping breaks valid movement, isolate horizontal and vertical checks.

### Week 9 · Lesson 1 — Learn API contracts and code/source attribution

For one imported API call, state parameters, return value, and source/licence acknowledgement.

**Expected reasoning:** Contract matches the actual call; source and applicable licence recorded; no claim that public code is ownerless.

**If not yet secure:** If only a URL is supplied, identify the used component and its permissions.

### Week 9 · Lesson 2 — Practice error classification and debugging

Classify a missing colon, division by zero and an incorrect score multiplier; choose a debugging action for each.

**Expected reasoning:** Syntax, runtime and logic faults; read parser message, trace failing values, compare independently predicted score.

**If not yet secure:** If all are called syntax errors, distinguish parsing, execution and incorrect results.

### Week 9 · Lesson 3 — Implement score, lives and active-play timing

Show that a collision during hit protection loses no extra life and pause does not consume active time.

**Expected reasoning:** Observed life/time traces meet the contract's interval boundaries and pause rule.

**If not yet secure:** If wall-clock pause consumes time, exclude paused intervals from active elapsed time.

### Week 9 · Lesson 4 — Implement the HUD and score-history functions

Display current score/lives/time, then load a missing history and a malformed history line.

**Expected reasoning:** HUD matches state; missing history uses documented empty policy; malformed lines handled with warning as contracted.

**If not yet secure:** If display mutates score, move the update out of drawing and repeat the test.

### Week 10 · Lesson 1 — Integrate difficulty choices and the complete game core

Run each required difficulty choice from a fresh reset. Show which contracted values change and which state clears.

**Expected reasoning:** Only specified difficulty parameters differ; score/lives/time/items reset; complete core runs without optional assets.

**If not yet secure:** If difficulty leaks old state, construct a fresh initial state for each run.

### Week 10 · Lesson 2 — Run the common game tests, repair and retest

Select one failed common acceptance case, repair its cause, and rerun it plus an earlier passing case.

**Expected reasoning:** Original failure, exact repair, expected/actual outcomes and regression result are retained.

**If not yet secure:** If only a screenshot of success remains, restore the before/after test record.

### Week 10 · Lesson 3 — Conduct the player acceptance and quality trial

On the named machine, measure the contracted pause-response observations and test without sound/colour-only cues.

**Expected reasoning:** Record actual response times and method; player identifies states/objects using text or shapes; disclose misses.

**If not yet secure:** If 60 FPS is offered as measurement, time the response itself.

### Week 10 · Lesson 4 — Demonstrate, evaluate and hand over the game

Demonstrate one met and one incomplete requirement, linking each to a test and one prioritised improvement.

**Expected reasoning:** Judgements refer to actual FR/NFR evidence and acknowledge limitations; handover explains setup and controls.

**If not yet secure:** If evaluation is only aesthetic, use the contract's observable success criteria.

### Week 11 · Lesson 1 — Retrieve: identify resources shared on a school network

Give two resources a school network shares and one benefit of sharing each.

**Expected reasoning:** For example files for collaboration and printers for shared access; benefit tied to use.

**If not yet secure:** If internet alone is named twice, distinguish local shared resources from external connectivity.

### Week 11 · Lesson 2 — Model: build and annotate the four-layer stack

Place HTTP, TCP, IP and Ethernet into the four-layer model and state one function per layer.

**Expected reasoning:** Application service, transport delivery, internet routing/addressing, link local frame delivery.

**If not yet secure:** If IP is placed at transport, trace its address across a router.

### Week 11 · Lesson 3 — Trace: explain a web request and compare TCP with UDP

A web page needs reliable ordered delivery; a live call values timeliness. Compare TCP and UDP for these requirements.

**Expected reasoning:** TCP provides ordered reliable stream delivery; UDP lacks those guarantees and may suit latency-sensitive application design.

**If not yet secure:** If UDP is called always faster, state the trade-off and application responsibility.

### Week 11 · Lesson 4 — Apply: diagnose short scenarios, then complete an exit explanation

A laptop joins Wi-Fi but only one website fails. Give a plausible application/name-service cause and a distinguishing check.

**Expected reasoning:** A DNS/site issue is a hypothesis; compare known sites or resolver results before blaming the wireless link.

**If not yet secure:** If one symptom is called proof, propose an alternative cause and observation.

### Week 12 · Lesson 1 — Retrieve: layer functions

Which layer handles application messages, end-to-end transport and local frames? Give an example for each.

**Expected reasoning:** Application HTTP, transport TCP/UDP, link Ethernet/Wi-Fi; functions not just names.

**If not yet secure:** If layers are confused, annotate one outgoing message as it is encapsulated.

### Week 12 · Lesson 2 — Model: network portion and /24 local-versus-remote comparisons

With /24 masks, are 192.168.4.10 and 192.168.4.200 local? What about 192.168.5.10?

**Expected reasoning:** First pair local; third remote; compare first 24 network bits and use gateway for remote destination.

**If not yet secure:** If last octet decides the network, mark the network portion first.

### Week 12 · Lesson 3 — Investigate: match device functions to traffic paths

For a remote web request, explain the roles of switch, router and wireless access point.

**Expected reasoning:** Switch forwards local frames; router forwards between networks; AP links wireless clients to the LAN.

**If not yet secure:** If switch is called an internet router, draw the network boundary and forwarding destination.

### Week 12 · Lesson 4 — Apply: produce an addressing table and justify media choices

Propose a unique /24 host address and gateway for a device on 192.168.8.0/24; justify copper versus fibre for a link.

**Expected reasoning:** For example .20 and reachable .1; avoid .0/.255; media reason uses distance, capacity or interference requirements.

**If not yet secure:** If media choice is preference only, state a measurable link constraint.

### Week 13 · Lesson 1 — Retrieve: addresses and devices

A client needs an IPv4 address, mask and gateway. Explain the distinct purpose of each.

**Expected reasoning:** Host identity, local network boundary, next router for remote traffic.

**If not yet secure:** If gateway is remote server IP, trace the first local hop.

### Week 13 · Lesson 2 — Design: draft a labelled logical network using course symbols

Draw two clients, a switch, a router and an external service; label links and local/remote boundaries using course symbols.

**Expected reasoning:** Logical path and device roles are clear; router separates networks; labels identify connections.

**If not yet secure:** If symbols alone are drawn, add addressing and explain one traffic path.

### Week 13 · Lesson 3 — Protect: map unauthorised-access threats to controls

A shared administrator account is used on all devices. Propose a control and explain the residual risk.

**Expected reasoning:** Individual least-privilege accounts improve accountability/access control; compromised credentials still need protection/monitoring.

**If not yet secure:** If a stronger password alone solves accountability, compare individual versus shared identities.

### Week 13 · Lesson 4 — Evaluate: identify bottlenecks and revise the design

Twenty clients each need 10 Mb/s simultaneously over a 100 Mb/s shared uplink. Identify the bottleneck and a revision.

**Expected reasoning:** Demand 200 Mb/s exceeds 100; upgrade or reduce/constrain concurrent demand; note overhead.

**If not yet secure:** If link speeds are added as capacity, compare aggregate demand with the shared segment.

### Week 14 · Lesson 1 — Retrieve: short mixed questions with explained feedback

Contrast bandwidth with observed throughput using a 100 Mb/s link delivering 65 Mb/s.

**Expected reasoning:** Bandwidth is nominal capacity; throughput is achieved rate; overhead/contention may explain the difference.

**If not yet secure:** If both equal 100, separate specification from measurement.

### Week 14 · Lesson 2 — Apply: complete the library design and traffic traces

For a library client accessing a remote catalogue, trace client→AP/switch→router→service and name the first-hop role.

**Expected reasoning:** Path respects connectivity; gateway forwards outside the local network; no claim that every hop is the destination.

**If not yet secure:** If remote traffic skips the router, mark the network boundary on the diagram.

### Week 14 · Lesson 3 — Assess: teacher-selected theory questions under suitable conditions

After the allocated theory task is collected, identify one question where the command required an explanation rather than a label.

**Expected reasoning:** Student cites their own response and the missing or present causal link; issued task conditions remain unchanged.

**If not yet secure:** If only a definition is repeated, connect the concept to the question's scenario after collection.

### Week 14 · Lesson 4 — Respond: correct misconceptions and plan week 15 recovery

Correct one network misconception from feedback and answer a changed version without the key.

**Expected reasoning:** Original error, explained correction and fresh response are distinct; remaining uncertainty recorded.

**If not yet secure:** If model text is copied, cover it and change an address or requirement.

### Week 15 · Lesson 1 — Six-prompt diagnostic, explained feedback and station choices

Predict int('4')*3 and '4'*3, then explain the difference before choosing a repair station.

**Expected reasoning:** 12 versus '444'; conversion changes numeric meaning; station choice names the demonstrated gap.

**If not yet secure:** If both are 12, trace operand types before multiplication.

### Week 15 · Lesson 2 — Programming stations A–C

Trace [2,0,5] through a sum loop and repair a maximum initialised to zero for [-4,-2].

**Expected reasoning:** Total 7; maximum starts from a real element and becomes -2.

**If not yet secure:** If only positive cases pass, retest all-negative and empty input under stated rules.

### Week 15 · Lesson 3 — Project/files/licensing and networking stations D–E

Explain why append differs from overwrite, and why a remote client uses a gateway rather than an access point alone.

**Expected reasoning:** Append preserves earlier text; gateway crosses networks, while AP supplies wireless LAN access.

**If not yet secure:** If either role is blurred, draw before/after file contents and one routed path.

### Week 15 · Lesson 4 — Fresh transfer questions, feedback and a personal revision plan

Solve a fresh boundary case for one programming and one networking weakness; record the next retry date.

**Expected reasoning:** Responses show the changed inputs, predicted results and reason; revision plan names skill/resource/date.

**If not yet secure:** If plan says only 'revise everything', choose one observable skill per weakness.

### Week 16 · Lesson 1 — Reading and first paper attempt

Before the practice paper, state its scope and choose a time budget; predict one trace without running code.

**Expected reasoning:** Distinguishes local practice from official exam; trace has ordered state changes and a planned checking allowance.

**If not yet secure:** If an answer is inferred from running code, redo a changed trace on paper first.

### Week 16 · Lesson 2 — Finish the attempt, then self-mark with explanations

Compare one original response with its explanation and classify the error as content, interpretation, tracing or time.

**Expected reasoning:** Original remains visible; classification is supported by the mismatch and a specific repair.

**If not yet secure:** If rewritten answers replace originals, preserve both to show the learning change.

### Week 16 · Lesson 3 — Fresh questions and teacher feedback on weak areas

Answer one teacher-selected changed question from your weakest area and justify the answer with a calculation or trace.

**Expected reasoning:** Fresh response uses the changed facts and demonstrates the repaired reasoning.

**If not yet secure:** If the old answer is repeated, highlight what changed and recompute.

### Week 16 · Lesson 4 — Final retrieval, diagram/trace checks and a personal exam plan. Weeks 17–18 remain blocked for exams

Without notes, explain one diagram path and one loop boundary; name a remaining support need and exam arrangement to confirm.

**Expected reasoning:** Accurate path/termination reasoning; realistic support plan; school confirms actual exam instructions.

**If not yet secure:** If confidence is used as proof, cite a recent independent response and an unresolved check.

## Unit 2 — Year 11

### Week 1 · Lesson 1 — Introduce the equipment desk

In an equipment loan desk, distinguish raw data, useful information and one entity.

**Expected reasoning:** A return date is data; overdue-loan report is information; Borrower/Equipment/Loan are entities.

**If not yet secure:** If a report is called a table automatically, separate facts stored from meaning derived.

### Week 1 · Lesson 2 — Inspect the flat register

A borrower's phone appears in ten loan rows. Explain an update anomaly and a better storage location.

**Expected reasoning:** Partial updates can conflict; store phone once in Borrower and reference its key from Loan.

**If not yet secure:** If duplication is called harmless, change only one copied phone and inspect inconsistency.

### Week 1 · Lesson 3 — Distinguish database/DBMS/RDBMS

Distinguish database, DBMS and RDBMS using the loan example.

**Expected reasoning:** Stored organised data; software managing it; relational DBMS organises related tables and supports relational operations.

**If not yet secure:** If all mean SQLite file, distinguish data file from the managing software.

### Week 1 · Lesson 4 — Complete the workbook independently, compare explained answers, then answer a new boundary case

An entered age is 150 but matches the paper form. Can it pass verification and fail validation?

**Expected reasoning:** Yes; copying can match the source while violating a stated allowed-age rule.

**If not yet secure:** If verification proves truth, introduce an incorrect source and compare the two checks.

### Week 2 · Lesson 1 — Retrieve the flat-register problems

Why should repeated borrower names not identify unique loan records?

**Expected reasoning:** Names may repeat and one borrower can have many loans; Loan needs its own key.

**If not yet secure:** If name is treated as unique, add two borrowers with the same name.

### Week 2 · Lesson 2 — Locate primary/foreign keys in the four datasets

Place BorrowerID in Borrower and Loan. Identify its key role in each and give an invalid reference.

**Expected reasoning:** Primary key in Borrower, foreign key in Loan; unknown BorrowerID creates an orphan if unenforced.

**If not yet secure:** If both are primary keys alone, test a borrower taking two loans.

### Week 2 · Lesson 3 — Read relationships in both directions and model minimum/maximum participation

Each Loan has one Borrower; a Borrower may have no loans. State minimum/maximum participation both ways.

**Expected reasoning:** Loan→Borrower exactly one; Borrower→Loan zero to many.

**If not yet secure:** If both directions are mandatory, test a newly registered borrower.

### Week 2 · Lesson 4 — Complete the Loan data dictionary and independent workbook

Specify LoanID, BorrowerID and Returned in a data dictionary, including key, type and domain.

**Expected reasoning:** LoanID unique/non-null PK; BorrowerID FK with suitable type; Returned uses a declared Boolean/domain convention.

**If not yet secure:** If type alone is supplied, add nullability, key and valid-value constraints.

### Week 3 · Lesson 1 — Retrieve keys

For enrolments, neither StudentID nor CourseID is unique. What pair could identify a single enrolment?

**Expected reasoning:** (StudentID,CourseID), assuming one enrolment per pair.

**If not yet secure:** If one field is chosen, list a student in two courses and two students in one course.

### Week 3 · Lesson 2 — Read dependency statements

Given (StudentID,CourseID)→Grade and StudentID→StudentName, identify a partial dependency.

**Expected reasoning:** StudentName depends on only StudentID, part of the composite key.

**If not yet secure:** If Grade is selected, ask whether both key parts are needed for one grade.

### Week 3 · Lesson 3 — Remove CategoryName’s transitive dependency

EquipmentID→CategoryID→CategoryName. Decompose the transitive dependency and retain the relationship.

**Expected reasoning:** Category(CategoryID PK,CategoryName); Equipment retains CategoryID FK; category name stored once.

**If not yet secure:** If CategoryID is removed entirely, show how an item still finds its category.

### Week 3 · Lesson 4 — Complete the club transfer problem independently, review explained answers and correct misconceptions

ClubID determines ClubName; MemberID determines MemberName; each member joins many clubs once. Design related tables.

**Expected reasoning:** Member,Club and Membership(MemberID,ClubID composite PK/FKs); remove repeated descriptive attributes.

**If not yet secure:** If clubs are stored as a comma-separated field, create one membership row per pair.

### Week 4 · Lesson 1 — Retrieve keys/table roles

For Equipment(EquipmentID,Name), write a query returning only Name in EquipmentID order.

**Expected reasoning:** SELECT Name FROM Equipment ORDER BY EquipmentID; selected fields and order have separate roles.

**If not yet secure:** If all columns are returned, distinguish SELECT projection from row filtering.

### Week 4 · Lesson 2 — Filter text and Returned values

Write SQL for Loan rows with Returned=0; explain why a text name literal needs quotes.

**Expected reasoning:** SELECT ... FROM Loan WHERE Returned=0; text literals are quoted, field identifiers are not literal values.

**If not yet secure:** If Returned='False' is assumed, inspect the documented 0/1 storage convention.

### Week 4 · Lesson 3 — Combine conditions

Write a condition for Returned=0 and (CategoryID='C1' or CategoryID='C2'). Why parentheses?

**Expected reasoning:** AND applies to either category; parentheses preserve the intended grouped alternatives.

**If not yet secure:** If returned C2 loans slip through, evaluate the condition with and without grouping.

### Week 4 · Lesson 4 — Complete the independent reports

Create a report of names beginning 'Cam', sorted by Name; predict an empty result when none match.

**Expected reasoning:** WHERE Name LIKE 'Cam%' ORDER BY Name; empty result is not necessarily an error.

**If not yet secure:** If % is placed at the front too, compare begins-with with contains.

### Week 5 · Lesson 1 — Trace key matches

Borrower B1 has loans L1/L2. Predict rows from joining Borrower to Loan on BorrowerID.

**Expected reasoning:** Two joined rows repeat B1's details, one per matching loan.

**If not yet secure:** If one row is expected, trace each child match separately.

### Week 5 · Lesson 2 — Join categories

Write the key link between Equipment e and Category c when e.CategoryID references c.CategoryID.

**Expected reasoning:** INNER JOIN Category c ON e.CategoryID=c.CategoryID; match identifiers, not display names.

**If not yet secure:** If Name is used, add two categories with similar labels and test ambiguity.

### Week 5 · Lesson 3 — Aggregate inventory

Count equipment per CategoryID. Explain COUNT(*) and GROUP BY in this report.

**Expected reasoning:** SELECT CategoryID,COUNT(*) FROM Equipment GROUP BY CategoryID; one group per identifier.

**If not yet secure:** If only one grand total appears, add grouping and predict each category count.

### Week 5 · Lesson 4 — Independent joined/category reports and feedback

Two equipment rows cost 10 and 15 in C1. Predict SUM and AVG grouped by category, then add a C2 row.

**Expected reasoning:** C1 sum 25/mean 12.5; C2 forms its own group; results depend on the added value.

**If not yet secure:** If averages are added, recompute from the individual rows and count.

### Week 6 · Lesson 1 — Inspect creation SQL

Read CREATE TABLE Loan with PK/FK constraints. Name one rejected row and explain why.

**Expected reasoning:** A duplicate PK or unknown enforced FK is rejected for the named constraint.

**If not yet secure:** If any integer is assumed valid, inspect reference existence as well as type.

### Week 6 · Lesson 2 — INSERT and UPDATE with before/after evidence

Write an UPDATE changing Returned only for LoanID='L2'; predict target and non-target effects.

**Expected reasoning:** UPDATE Loan SET Returned=1 WHERE LoanID='L2'; other loans unchanged.

**If not yet secure:** If WHERE is missing, test first on a disposable copy and compare all rows.

### Week 6 · Lesson 3 — DELETE disposable records

Contrast DELETE FROM Loan WHERE LoanID='TEMP' with DROP TABLE Loan.

**Expected reasoning:** DELETE removes matching records and retains table; DROP removes the structure and its data.

**If not yet secure:** If both are called deletion of one row, inspect the schema afterwards.

### Week 6 · Lesson 4 — Controlled SQL practice

After controlled SQL collection, explain one query's expected rows and one constraint test using your submitted version.

**Expected reasoning:** Reasoning matches submitted SQL; row order is claimed only with ORDER BY; original evidence retained.

**If not yet secure:** If output is guessed from a new version, return to the collected query after assessment.

### Week 7 · Lesson 1 — Project requirements and acceptance criteria

Select one database requirement and turn it into a measurable acceptance test.

**Expected reasoning:** Names the required operation, exact input, expected records/result and success condition from the brief.

**If not yet secure:** If criterion says 'works well', replace it with an observable report or rejected operation.

### Week 7 · Lesson 2 — ER diagram/data dictionary and design checkpoint

Trace one required relationship from the ER diagram into the dictionary and planned FK.

**Expected reasoning:** Entity keys/types/optionality and referencing field agree across all three artefacts.

**If not yet secure:** If diagram and schema disagree, choose the requirement as authority and reconcile both.

### Week 7 · Lesson 3 — Create/load a working database and first reports

Load two related synthetic records and demonstrate one first report plus one invalid-reference attempt.

**Expected reasoning:** Valid records/report behave as predicted; enforced constraint rejects the orphan under the chosen DBMS.

**If not yet secure:** If FK enforcement is only assumed, run the negative test explicitly.

### Week 7 · Lesson 4 — Demonstrate the initial build and plan the ten later workshops

Demonstrate your initial database, list one remaining dependency and schedule it within the ten later workshops.

**Expected reasoning:** Working subset and unfinished work are distinguished; dependency precedes its dependent task.

**If not yet secure:** If every item is 'done' without evidence, attach a query/test result to each claim.

### Week 8 · Lesson 1 — Asset/threat/vulnerability/risk

A laptop stores records, lacks updates and may be stolen. Identify asset, vulnerability, threat and risk.

**Expected reasoning:** Records/device asset; missing updates vulnerability; theft threat; likelihood/impact inform risk.

**If not yet secure:** If vulnerability and threat are swapped, distinguish weakness from harmful event.

### Week 8 · Lesson 2 — AAA audit of shared accounts

Explain how shared staff login affects authentication, authorisation and accounting.

**Expected reasoning:** Identity claim is shared; permissions may be excessive; actions cannot reliably be attributed to an individual.

**If not yet secure:** If password strength solves everything, examine accountability despite a strong shared password.

### Week 8 · Lesson 3 — Create related tables and enter synthetic records

Create two related project tables and insert a parent/child pair using the approved dictionary.

**Expected reasoning:** Actual types, keys and rows agree with the design; synthetic rather than real personal data used.

**If not yet secure:** If data loads only after dropping constraints, repair insertion order/reference values.

### Week 8 · Lesson 4 — Check keys, domains and referential integrity against the design

Attempt a duplicate key, out-of-domain value and orphan reference in a disposable project copy.

**Expected reasoning:** Each applicable enforced rule rejects its invalid row; valid existing records remain unchanged.

**If not yet secure:** If rejection is asserted without a run, record expected/actual outcomes separately.

### Week 9 · Lesson 1 — Compare people/network/application threats using mechanism cards

Explain phishing, SQL injection and denial of service by mechanism rather than labels.

**Expected reasoning:** Deceptive user action, untrusted input altering SQL, and resource/service exhaustion respectively.

**If not yet secure:** If every attack is called malware, identify the entry point and affected service.

### Week 9 · Lesson 2 — Malware/physical/zero-day scenarios

Distinguish ransomware, a locked-room control and a zero-day vulnerability in one scenario each.

**Expected reasoning:** Ransomware denies access by malicious action; physical control limits entry; zero-day lacks an available known fix at discovery/use context.

**If not yet secure:** If any new malware is called zero-day, separate exploit knowledge from malware age.

### Week 9 · Lesson 3 — Build the required joined reports

Demonstrate one required joined project report and explain each ON key match.

**Expected reasoning:** Output rows reflect the specified entities; every relationship uses appropriate keys and predicted matches.

**If not yet secure:** If DISTINCT hides extra rows, inspect the join conditions before removing duplicates.

### Week 9 · Lesson 4 — Test reports with ordinary, missing and boundary data

Test your report with ordinary data, an absent match and duplicate display names.

**Expected reasoning:** Expected row inclusion/exclusion follows the chosen join; IDs distinguish equal labels.

**If not yet secure:** If only typical data is tested, add a no-match record with a predicted outcome.

### Week 10 · Lesson 1 — Password policy, two-factor categories and biometric trade-offs

Compare two passwords with two independent authentication factors. Name one biometric trade-off.

**Expected reasoning:** Two passwords are one knowledge category; independent factors combine categories; biometric recovery/privacy/accessibility trade-off justified.

**If not yet secure:** If two steps imply two factors, identify what each factor relies on.

### Week 10 · Lesson 2 — Symmetric/asymmetric encryption and key roles. Lessons 3–4 are project workshops

For confidential delivery to Sam, contrast shared-secret encryption with Sam's public/private key pair.

**Expected reasoning:** Symmetric uses shared secret; public-key encryption uses Sam's public key and Sam's private decryption key.

**If not yet secure:** If the private key is shared, redraw sender/recipient key possession.

### Week 10 · Lesson 3 — Refine query outputs and document access decisions

Show one refined report and explain who should be allowed to change its source data.

**Expected reasoning:** Labels/order match requirement; least-privilege access is justified and enforcement distinguished from a hidden button.

**If not yet secure:** If UI hiding is called authorisation, identify where a prohibited request is rejected.

### Week 10 · Lesson 4 — Record expected/actual results and repair a failed test

Choose a failed project test and record input, expected output, actual output, cause and retest.

**Expected reasoning:** A reproducible mismatch and explained repair are retained alongside the new result.

**If not yet secure:** If expected is copied from actual, recompute it from the requirement first.

### Week 11 · Lesson 1 — Trace rotation and random-substitution ciphers

Using A=0…Z=25, encrypt ZOO with a +3 rotation. Explain why this is not modern secure encryption.

**Expected reasoning:** CRR with wraparound; tiny keyspace and language patterns make rotation weak.

**If not yet secure:** If Z becomes an invalid character, apply modulo-26 wraparound.

### Week 11 · Lesson 2 — Vigenère transfer and explained corrections. Lessons 3–4 are project testing/recovery workshops

Using A=0…Z=25, Vigenère-add key BC to plaintext AZ, repeating the key. Predict ciphertext.

**Expected reasoning:** BB: 0+1=1 and 25+2=27→1; repeated keys leak patterns and this is historical practice.

**If not yet secure:** If values exceed 25, reduce modulo 26 and recheck the second letter.

### Week 11 · Lesson 3 — Run acceptance tests against the brief

Run one positive and one negative acceptance test directly from the project brief.

**Expected reasoning:** Both expected/actual outcomes and requirement IDs recorded; successful operation alone is insufficient.

**If not yet secure:** If negative test changes live records, use a disposable synthetic copy and restore it.

### Week 11 · Lesson 4 — Test a safe recovery procedure and record its limits

Restore a known backup into a safe location and compare a known record and report.

**Expected reasoning:** Actual recovered contents checked; backup existence alone does not prove recovery; limits recorded.

**If not yet secure:** If only file size is checked, open the restored database and query it.

### Week 12 · Lesson 1 — Privacy/security/ethics/law

A lawful action may still be unethical. Explain using unnecessary retention of non-sensitive classroom practice data.

**Expected reasoning:** Legality, ethical justification, privacy and protective security are related but distinct; minimise unnecessary retention.

**If not yet secure:** If legal automatically means ethical, identify affected people and a reasonable alternative.

### Week 12 · Lesson 2 — Ethical hacking and penetration-test scope

A penetration-test permission names one practice server. May a student scan the school production subnet?

**Expected reasoning:** No; written scope, target, methods and time limits govern authorised work.

**If not yet secure:** If permission is assumed transferable, compare the proposed target with the named scope.

### Week 12 · Lesson 3 — Project evaluation workshop

Evaluate one project requirement using actual report/test evidence and explain one limitation.

**Expected reasoning:** Met/partly/not met judgement follows evidence; limitation is specific and not concealed by a working demo.

**If not yet secure:** If evaluation is only praise, contrast predicted and observed outcomes.

### Week 12 · Lesson 4 — Project demonstration/submission, explain limitations and prioritise improvements

Demonstrate the project, explain one design decision and rank one improvement by user impact.

**Expected reasoning:** Independent explanation relates decision to requirements; improvement follows a demonstrated limitation.

**If not yet secure:** If an extra feature outranks a core defect, justify priorities using the brief.

### Week 13 · Lesson 1 — Apply five data-quality checks to supplied records

For entered phone data, apply accuracy, completeness, consistency, currency and relevance checks.

**Expected reasoning:** Each check has a distinct question; matching format alone does not establish accurate/current data.

**If not yet secure:** If all checks are regex tests, add source verification and purpose/date evidence.

### Week 13 · Lesson 2 — Interpret a six-table relational diagram and justify keys

In a six-table model, trace a child FK to its parent PK and read optionality in both directions.

**Expected reasoning:** Names actual fields and zero/one/many participation from the supplied diagram, not invented relationships.

**If not yet secure:** If arrows alone are read, locate the minimum and maximum crow's-foot symbols.

### Week 13 · Lesson 3 — Create a fresh four-table design from requirements

Design Member,Event,Booking and Venue: each event has one venue; members book events once per pair.

**Expected reasoning:** Event has VenueID FK; Booking bridges Member/Event with a unique pair; keys and cardinalities stated.

**If not yet secure:** If Member holds many EventIDs in one field, move bookings to separate rows.

### Week 13 · Lesson 4 — Compare schema and dictionary

Your dictionary allows null VenueID but the requirement says every Event has a Venue. What must change?

**Expected reasoning:** Use a mandatory non-null reference and reconcile dictionary, schema and diagram.

**If not yet secure:** If FK alone is said to forbid null, test null separately from a nonexistent identifier.

### Week 14 · Lesson 1 — Predict and write SQL for changed data

Loan has L1/Returned0 and L2/Returned1. Predict SELECT LoanID WHERE Returned=0, then change L2 to 0.

**Expected reasoning:** First L1 only; after change L1 and L2; order unspecified without ORDER BY.

**If not yet secure:** If old output is retained, evaluate the filter against each changed row.

### Week 14 · Lesson 2 — Audit a security/privacy case and justify controls

A former staff account can export records. Propose a control, a test and a residual limitation.

**Expected reasoning:** Revoke unnecessary access; test denied export; previously exported copies may remain and need response handling.

**If not yet secure:** If encryption alone is proposed, distinguish access permission from transport confidentiality.

### Week 14 · Lesson 3 — Complete the allocated controlled theory task

After the controlled theory task is collected, identify where your answer used scenario facts and where it stayed generic.

**Expected reasoning:** Specific response evidence is retained; missing application becomes a named learning need.

**If not yet secure:** If only a mark is recorded, add the missing fact-to-conclusion link.

### Week 14 · Lesson 4 — Use feedback to correct errors and select two priorities

Repair one SQL and one security error from feedback with a changed question for each.

**Expected reasoning:** Two original/corrected/fresh responses show whether reasoning transferred.

**If not yet secure:** If correction copies the key, alter the data or control constraint before retrying.

### Week 15 · Lesson 1 — Independent diagnosis and priority selection

Independently distinguish validation/verification and PK/FK, then choose two priorities using your errors.

**Expected reasoning:** Definitions have distinct roles and examples; priorities follow actual incorrect reasoning.

**If not yet secure:** If all topics are selected, choose the two errors with greatest effect on later tasks.

### Week 15 · Lesson 2 — Two targeted stations with corrections

At two selected stations, state one original wrong assumption and demonstrate a corrected case.

**Expected reasoning:** Evidence includes original assumption, explanation and changed outcome rather than copied answers.

**If not yet secure:** If no cause is identified, trace the first step where expectation differs.

### Week 15 · Lesson 3 — Unfamiliar transfer and fresh retest

For a fresh club database, explain one many-to-many bridge and write a filtered report.

**Expected reasoning:** Bridge retains both references and pair rule; report selects required fields/rows from supplied facts.

**If not yet secure:** If prior table names are copied blindly, map the new entities and keys first.

### Week 15 · Lesson 4 — Evidence-based revision plan and teacher feedback

Set one database and one security revision action with a named task, success check and retry date.

**Expected reasoning:** Each action is specific, feasible and tied to a demonstrated gap; teacher support need identified.

**If not yet secure:** If success means 'read chapter', replace it with a fresh answer or tested query.

### Week 16 · Lesson 1 — Q1–8, up to 40 minutes plus setup/collection

After Q1–8, name one uncertainty without opening the key and record a predicted result for one query.

**Expected reasoning:** Original attempt retained; uncertainty and independent prediction precede feedback.

**If not yet secure:** If the key was used, label the attempt supported and choose a fresh independent query.

### Week 16 · Lesson 2 — Q9–16, up to 40 minutes plus setup/collection

After Q9–16, check every subpart and identify one response requiring explanation of a relationship or control.

**Expected reasoning:** All subparts inspected; explanatory link uses the supplied scenario rather than a bare term.

**If not yet secure:** If a part is missed, underline each command and allocate a response line.

### Week 16 · Lesson 3 — Mark with explanations and classify gaps

Explain one missed marking point and distinguish a knowledge gap from a misread command.

**Expected reasoning:** Cause is grounded in the original answer; repair addresses that specific cause.

**If not yet secure:** If every error is 'careless', name the missing concept or interpretation step.

### Week 16 · Lesson 4 — Targeted repair, fresh transfer and readiness check

Attempt a changed query and one new security case without the answers, then record remaining support needs.

**Expected reasoning:** Fresh evidence shows what improved and what remains uncertain; no grade guarantee inferred.

**If not yet secure:** If immediate recall is mistaken for mastery, schedule a later retry with changed facts.

## Unit 3 — Year 12

### Week 1 · Lesson 1 — Independent diagnostic, item-level feedback and count trace

Trace a count of values >=5 in [4,5,7], then for an empty list.

**Expected reasoning:** Counts 2 and 0; count initialised before iteration; exact boundary included.

**If not yet secure:** If 5 is excluded, compare >= with > at the threshold.

### Week 1 · Lesson 2 — Repair Python skills through a Pygame loop

In the practice loop, explain events versus held keys and verify pause/reset after a long elapsed interval.

**Expected reasoning:** Events are discrete; held-key state is sampled; paused gameplay unchanged and reset fresh under lab rules.

**If not yet secure:** If frames are seconds, trace dt_ms and active elapsed time explicitly.

### Week 1 · Lesson 3 — Linear/iterative comparison, requirement change and transfer test

A client changes a threshold after the first prototype. Compare linear and iterative responses and give a regression case.

**Expected reasoning:** Iteration revisits design/build/test; linear sequence may require a controlled return; prior valid behaviour retested.

**If not yet secure:** If iterative means no planning, identify the documented revision and acceptance criteria.

### Week 1 · Lesson 4 — Version record, separate restore/retest and exit explanation

Restore a prior version into a separate folder and rerun a known test; identify the version used.

**Expected reasoning:** Actual restoration and matching/reasoned test outcome recorded; a filename alone is not restoration evidence.

**If not yet secure:** If current files are overwritten, repeat in a separate location preserving the working version.

### Week 2 · Lesson 1 — Retrieve 1D arrays

For [[1,2],[3,4]], give grid[1][0] and explain row versus column indices.

**Expected reasoning:** 3; first index selects second row, second selects first column.

**If not yet secure:** If 2 is selected, label coordinates before indexing.

### Week 2 · Lesson 2 — Choose keys

Choose a dictionary for unique equipment IDs. What happens if the same key is assigned a new value?

**Expected reasoning:** Direct ID-to-value mapping; existing value replaced rather than a second same-key entry created.

**If not yet secure:** If duplicate keys are expected, demonstrate an update and inspect length.

### Week 2 · Lesson 3 — Keep game data independent when functions mutate it

Create two independent practice grids/states, mutate one, and predict the other's unchanged value.

**Expected reasoning:** Separate rows and objects do not alias; mutation of one state leaves the other unchanged.

**If not yet secure:** If both change, inspect repeated-list references or shared mutable defaults.

### Week 2 · Lesson 4 — Build the booking report and day totals

For grid [[2,3],[0,4]], compute each day total and overall total using nested loops.

**Expected reasoning:** Row totals 5 and 4; total 9; outer/inner loop responsibilities explicit.

**If not yet secure:** If a list is added to an integer, trace individual cell access before accumulation.

### Week 3 · Lesson 1 — Retrieve lists/functions

Linear-search [4,7,7,9] for 7 and 8 under a first-match/-1 contract.

**Expected reasoning:** Returns 1 for 7 and -1 for 8; distinguish index from value.

**If not yet secure:** If 7 is returned, state whether the function returns location or item.

### Week 3 · Lesson 2 — Model sorted intervals

Binary-search [1,4,7,10,13,16] for 12 using floor midpoint. Show interval changes.

**Expected reasoning:** Midpoints 2,4,3 then empty interval; return -1; update bounds beyond rejected middle.

**If not yet secure:** If interval never shrinks, inspect low=mid+1/high=mid-1.

### Week 3 · Lesson 3 — Implement and test both algorithms

Test both searches on empty, singleton and duplicate lists, respecting binary search's sorted-input contract.

**Expected reasoning:** Not-found and found results match documented contract; duplicates need only promised matching index policy.

**If not yet secure:** If binary search uses unsorted data, sort by the searched key or reject the precondition.

### Week 3 · Lesson 4 — Count probes and compare Big O growth

If n doubles, compare worst-case growth for linear and binary search; distinguish probes from elapsed time.

**Expected reasoning:** O(n) roughly doubles; O(log n) grows by about one halving step; timing also depends on environment.

**If not yet secure:** If binary search is called constant, list interval sizes for increasing n.

### Week 4 · Lesson 1 — Retrieve search/order prerequisites

Perform one left-to-right bubble pass on [5,2,4,1]. What reaches the end?

**Expected reasoning:** [2,4,1,5]; largest item 5 reaches final position.

**If not yet secure:** If a full sorted list is given, distinguish one pass from all passes.

### Week 4 · Lesson 2 — Model insertion shifts and saved key

Insert key 3 into sorted prefix [1,4,6] using insertion-sort shifts.

**Expected reasoning:** Shift 6 then 4 right, place 3 after 1; [1,3,4,6]; preserve saved key.

**If not yet secure:** If 3 is overwritten, hold the key before shifting array values.

### Week 4 · Lesson 3 — Model minimum selection

Perform selection sort's first pass on [7,3,5,2]. State minimum index and resulting list.

**Expected reasoning:** Minimum index 3; swap gives [2,3,5,7]; remainder not assumed sorted.

**If not yet secure:** If adjacent swaps are used, distinguish selection from bubble strategy.

### Week 4 · Lesson 4 — Compare key counts and Big O

Compare worst-case growth of taught elementary sorts and identify when an optimised bubble sort stops early.

**Expected reasoning:** Worst-case O(n²); no-swap pass permits early exit; optimised best case O(n), not guaranteed for all versions.

**If not yet secure:** If every sort is called O(n log n), count pair comparisons as n grows.

### Week 5 · Lesson 1 — Retrieve dictionaries/functions

Convert a dictionary-style equipment record into an object design with state and a loan method.

**Expected reasoning:** Attributes hold per-item data; method changes state under a declared contract; responsibilities remain clear.

**If not yet secure:** If every field becomes a global, show ownership by two separate instances.

### Week 5 · Lesson 2 — Explain __init__/self

Create two Equipment instances. Explain __init__ and self using different IDs.

**Expected reasoning:** Initialiser sets each instance; self refers to the receiving instance, not the class as a whole.

**If not yet secure:** If both IDs change together, inspect class-level versus instance attributes.

### Week 5 · Lesson 3 — Encapsulate independent practice indicators

Update one indicator object and draw it twice in the practice game. What must drawing leave unchanged?

**Expected reasoning:** Other instances unchanged; drawing does not change score, position or timers; methods enforce stated state rules.

**If not yet secure:** If drawing advances state, move that change to update and repeat the double-draw test.

### Week 5 · Lesson 4 — Independently complete/test the class, object lookup and report

Implement/trace a reserve method that rejects unavailable equipment; test two independent instances.

**Expected reasoning:** Valid transition occurs once; rejected repeat preserves state; second instance remains independent.

**If not yet secure:** If reject still changes state, validate before mutation and retest failure.

### Week 6 · Lesson 1 — Retrieve Equipment and state contracts

State a base Equipment contract shared by two specialised subclasses; identify an invariant.

**Expected reasoning:** Shared operation and pre/postconditions are explicit; invariant holds across subclass calls.

**If not yet secure:** If contract is only method names, add required state/result behaviour.

### Week 6 · Lesson 2 — Override preparation

Two subclasses override location(). Predict calls through a list of base-compatible objects.

**Expected reasoning:** Each object's actual override supplies its result; interface remains common.

**If not yet secure:** If every call uses base output, distinguish variable reference from actual object type.

### Week 6 · Lesson 3 — Override timed behaviour and test the shared contract

In the timed practice adapter, show one shared update call dispatching to different subclass behaviour.

**Expected reasoning:** Actual Player/Hazard-style subclasses specialise update while retaining shared state/bounds contract; independent state tested.

**If not yet secure:** If subclass merely renames the base, identify a real overridden behaviour and test it.

### Week 6 · Lesson 4 — Original controlled programming practical in the school’s allocated lesson. Suggested 40 minutes plus setup/submission time

After the controlled practical is collected, trace one submitted method on a valid and rejected input.

**Expected reasoning:** Trace matches submitted code and identifies preserved state on rejection; assessment instructions unchanged.

**If not yet secure:** If a repair is shown as original, retain both versions and discuss after collection.

### Week 7 · Lesson 1 — Investigate the shared two-map Pygame brief

From the common two-map brief, name one mandatory data requirement, one state rule and one excluded extra.

**Expected reasoning:** Actual FR/NFR IDs support maps/OOP/data, transition rule and optional decoration; local scope distinguished from syllabus.

**If not yet secure:** If extra levels are treated as compulsory, reread the canonical shared contract.

### Week 7 · Lesson 2 — Design actors, maps, dictionaries and game states

Sketch Actor/Player/Hazard, independent maps, item dictionary and state transitions; trace one data flow.

**Expected reasoning:** Shared/specialised responsibilities and key/index meanings match the Year 12 brief.

**If not yet secure:** If drawing owns scoring, separate state update from display before coding.

### Week 7 · Lesson 3 — Desk-check search, sort and map-transition algorithms

Desk-check a not-found linear search, duplicate-score sort and simultaneous timeout/exit.

**Expected reasoning:** Search returns documented not-found; duplicate scores retained; loss takes precedence under the contract.

**If not yet secure:** If sorted() replaces taught algorithm evidence, write the required comparison/shift steps.

### Week 7 · Lesson 4 — Build actor interfaces and load the supplied maps

Load the two supplied maps and reject one malformed map without corrupting the first.

**Expected reasoning:** Dimensions/tile/start/exit checks run; maps are independent; useful failure prevents invalid play.

**If not yet secure:** If both maps change together, inspect row aliasing and independent parsing.

### Week 8 · Lesson 1 — Test scope/data

For a reserve method, define a unit test and a whole-system acceptance test using different scopes.

**Expected reasoning:** Unit isolates method behaviour; acceptance checks user requirement through integrated workflow.

**If not yet secure:** If only test names differ, state setup, action and observable boundary of each.

### Week 8 · Lesson 2 — Acceptance versus load

Contrast acceptance and load tests for a booking system; define a measurable observation for each.

**Expected reasoning:** Requirement correctness versus behaviour under specified demand; expected results/response targets documented.

**If not yet secure:** If a passing functional test proves capacity, add concurrent/repeated demand measurements.

### Week 8 · Lesson 3 — Implement movement, walls and overridden actor updates

Move each actor against a wall and call its update through the shared interface.

**Expected reasoning:** Wall preserves legal position; subclass behaviour differs appropriately; common bounds invariant holds.

**If not yet secure:** If inheritance bypasses bounds, put/check shared behaviour in the appropriate common method.

### Week 8 · Lesson 4 — Implement collection, hazards and active timers

Collect an item twice and collide during and at the end of protection; test pause across a timeout interval.

**Expected reasoning:** No duplicate collection; life/cooldown boundaries and active-time pause match contract.

**If not yet secure:** If interval endpoints are unclear, state timestamps and expected lives before running.

### Week 9 · Lesson 1 — Peer review an affected contract

A function changes its not-found result from -1 to None. Identify affected callers and regression tests.

**Expected reasoning:** Every caller interpreting result is reviewed; found index 0 remains valid; updated contract/test expectations documented.

**If not yet secure:** If if result rejects index 0, use an explicit sentinel comparison.

### Week 9 · Lesson 2 — Developer impact/rights/responsibilities scenarios

A developer copies a licensed library and ships user records in a demo. Identify separate rights/responsibility concerns.

**Expected reasoning:** Licence/attribution compliance and privacy/data minimisation both need review; public availability grants no blanket permission.

**If not yet secure:** If attribution alone solves data exposure, separate code rights from personal-data handling.

### Week 9 · Lesson 3 — Integrate dictionary lookup and history-score ordering

Look up a known/missing item ID and sort [30,10,20,10] using the taught algorithm.

**Expected reasoning:** Lookup follows documented missing policy; result [10,10,20,30]; duplicates preserved; algorithm explained.

**If not yet secure:** If dictionary lookup is claimed as authored linear search, demonstrate the separate traversal.

### Week 9 · Lesson 4 — Integrate map progression and persistent results

Complete map 1 and then the game; show carried score/lives, fresh map time and exactly one final history append.

**Expected reasoning:** Transitions and persistence follow common FR7/FR10; redisplaying result does not append twice.

**If not yet secure:** If map completion saves an extra final result, attach saving to the final-game transition.

### Week 10 · Lesson 1 — Integrate instructions, HUD, pause and restart

Pause, resume and restart from both maps, reading HUD values before/after each action.

**Expected reasoning:** Pause freezes gameplay; restart restores all initial fields/map/items; HUD only reflects state.

**If not yet secure:** If some fields survive restart, compare every initial-state field with the contract.

### Week 10 · Lesson 2 — Run common acceptance cases and regression checks

Run one normal, one invalid and one boundary common test, then repeat a prior passing test after repair.

**Expected reasoning:** Expected/actual results and FR/NFR links retained; regression checks demonstrate unchanged earlier behaviour.

**If not yet secure:** If failure evidence is erased, preserve original and repaired build IDs/results.

### Week 10 · Lesson 3 — Run the player and named-machine quality trial

On the declared school PC, record response observations and a colour/sound-independent player trial.

**Expected reasoning:** Measured method/results and player feedback are actual, not inferred from FPS; limitations acknowledged.

**If not yet secure:** If no physical input was observed, leave that check pending and run the visible-window trial.

### Week 10 · Lesson 4 — Demonstrate, restore and evaluate the two-map game

Restore the submitted version separately and demonstrate one met and one incomplete requirement.

**Expected reasoning:** Restored build runs; independent explanation uses tests and honest limitations; improvement prioritised.

**If not yet secure:** If only latest working copy exists, establish version identity before claiming restoration.

### Week 11 · Lesson 1 — Retrieve Year 11 network knowledge

Contrast IP and MAC roles across a routed path; identify which addresses change at ordinary forwarding hops.

**Expected reasoning:** Destination IP identifies remote host; local link headers/MACs change per hop under no-NAT assumption.

**If not yet secure:** If remote server MAC is used locally, identify the first-hop gateway MAC.

### Week 11 · Lesson 2 — Ports/DNS/gateway/ARP

Explain DNS, port number, default gateway and ARP during an IPv4 web request.

**Expected reasoning:** DNS maps name; port identifies service endpoint; gateway routes remote traffic; ARP resolves local next-hop IPv4 to MAC.

**If not yet secure:** If DNS is called routing, trace name resolution before packet delivery.

### Week 11 · Lesson 3 — Compare TCP/UDP services and header architecture

Compare TCP/UDP delivery and explain one header field's purpose in each.

**Expected reasoning:** TCP ordered reliable stream with sequence/acknowledgement; UDP datagrams with ports/length/checksum semantics as taught.

**If not yet secure:** If both guarantee delivery, explain application handling after a lost UDP datagram.

### Week 11 · Lesson 4 — Packet/frame sizing and padding

An illustrative packet has 20-byte IP +20-byte TCP headers and 10-byte data. Find packet size; add 18-byte Ethernet header/FCS and padding.

**Expected reasoning:** IP packet 50 bytes; frame 68 excluding preamble/gap; payload exceeds 46-byte minimum so no padding.

**If not yet secure:** If packet and frame sizes are conflated, draw encapsulation boundaries and list counted fields.

### Week 12 · Lesson 1 — Retrieve IP/MAC/gateway roles

A host is 192.168.6.10/24; remote service 203.0.113.8. What IP and local next-hop destination are used?

**Expected reasoning:** Remote destination IP remains service; frame targets local gateway MAC, resolved locally.

**If not yet secure:** If gateway replaces destination IP, separate packet header from link frame.

### Week 12 · Lesson 2 — Bitwise AND, block boundaries and /27 worked range

For 192.168.6.77/27, calculate network, broadcast, usable range and ordinary host capacity.

**Expected reasoning:** Network .64, broadcast .95, usable .65–.94, 30 hosts; block size 32.

**If not yet secure:** If .77 is the network, apply mask or locate the containing block boundary.

### Week 12 · Lesson 3 — Equal-size versus variable-length subnetting

Allocate 50 and 20 ordinary hosts within 192.168.10.0/24 using largest-first VLSM.

**Expected reasoning:** For example .0/26 (62 usable), .64/27 (30); aligned non-overlapping blocks, gateways included in requirements.

**If not yet secure:** If /27 is used for 50, compare usable capacity before allocation.

### Week 12 · Lesson 4 — IPv6 expansion/compression, addressing scenario diagnosis and independent plan verification. Four lessons in week 12

Expand 2001:db8::1 and explain one IPv6 difference from ordinary IPv4 subnet broadcasts.

**Expected reasoning:** 2001:0db8:0000:0000:0000:0000:0000:0001; IPv6 uses multicast rather than broadcast.

**If not yet secure:** If :: is expanded to a fixed count regardless of context, count the eight total hextets.

### Week 13 · Lesson 1 — Requirements and components

A remote site needs connectivity, segmented access and a stated user load. Choose components against those requirements.

**Expected reasoning:** Roles and quantities follow traffic/security/load needs; no unsupported product-brand recommendation.

**If not yet secure:** If components are listed without reasons, map each to one requirement and traffic path.

### Week 13 · Lesson 2 — VLANs/broadcast domains, gateways and service policy

Explain why two VLANs require suitable routing and access policy for approved inter-VLAN traffic.

**Expected reasoning:** Separate broadcast domains; router/L3 function connects them; policy permits only required services.

**If not yet secure:** If VLAN alone is called encryption, distinguish segmentation from confidentiality.

### Week 13 · Lesson 3 — Demand/bottleneck calculations, media/topology tradeoffs and capacity feedback

Forty clients each demand 8 Mb/s across a 200 Mb/s uplink. Calculate shortfall and justify a revision.

**Expected reasoning:** Demand 320 Mb/s, shortfall at least 120 before overhead; capacity upgrade or controlled concurrency justified.

**If not yet secure:** If 200/40 is called required demand, separate available share from each client's requirement.

### Week 13 · Lesson 4 — Interpret synthetic logs, practice ping/tracert in the assigned lab, evaluate and revise the design. Four lessons in week 13

A ping fails but an application works. What can and cannot be concluded? Propose a next scoped check.

**Expected reasoning:** ICMP may be filtered; failure does not prove host/service down; compare permitted application/route/DNS evidence.

**If not yet secure:** If ping proves a cause, name an alternative and an observation distinguishing it.

### Week 14 · Lesson 1 — Closed-note diagnostic, confidence record and guided programming/state/algorithm correction

Trace a two-object mutation and a duplicate-key dictionary update without running code.

**Expected reasoning:** Only intended independent object changes; dictionary replaces existing-key value; explain state ownership.

**If not yet secure:** If both objects change, inspect shared references and test a deep-enough independent construction.

### Week 14 · Lesson 2 — Integrated network case, diagram/policy/capacity reasoning and evidence interpretation

For a new network case, link one diagram path, access rule and capacity calculation to supplied facts.

**Expected reasoning:** All three use the same hosts/services/load; conclusion acknowledges missing evidence.

**If not yet secure:** If a generic design is copied, label changed addresses and demand before reasoning.

### Week 14 · Lesson 3 — 40-minute original controlled practice, followed by initial marking and feedback

After the 40-minute practice, identify one unanswered subpart and one result you can justify independently.

**Expected reasoning:** Original responses retained; gap classified and evidence distinguished from confidence.

**If not yet secure:** If correction replaces attempt, retain both and date the supported work.

### Week 14 · Lesson 4 — Corrections, fresh transfer tasks and two evidence-based revision priorities. Four lessons in week 14

Repair one programming and one networking error, then answer a fresh variation of each.

**Expected reasoning:** Fresh outputs/ranges/decisions recomputed from changed facts; two specific priorities follow.

**If not yet secure:** If only the answer wording changes, change input values and retest the reasoning.

### Week 15 · Lesson 1 — Retrieve week 14 evidence, attempt baseline questions and choose one programming plus one networking priority

Use prior evidence to choose one programming and one networking priority; state a diagnostic result for each.

**Expected reasoning:** Priority references an actual incorrect trace/test/range and an observable target.

**If not yet secure:** If selection is based only on preference, attempt a short unseen case first.

### Week 15 · Lesson 2 — Two targeted stations, teacher feedback and explained correction

At each chosen station, show the first incorrect reasoning step and a corrected independent case.

**Expected reasoning:** Cause, correction and changed-case result recorded separately.

**If not yet secure:** If only final answer is compared, trace intermediate state or subnet boundary.

### Week 15 · Lesson 3 — Fresh mixed transfer, marking and correction within the same lesson

In a fresh case, combine a safe empty-list search result with an ordinary /28 subnet range.

**Expected reasoning:** Empty search returns contract sentinel; /28 has 16 addresses/14 ordinary usable hosts with aligned boundaries.

**If not yet secure:** If subnet result is guessed, apply mask and verify network/broadcast endpoints.

### Week 15 · Lesson 4 — Delayed retries, mixed retrieval and a concrete week 16 revision plan. Four lessons in week 15

Retry an earlier weak skill after a gap and plan one specific week-16 action from the result.

**Expected reasoning:** Independent delayed response and next task/resource/time are recorded; unresolved support need remains visible.

**If not yet secure:** If immediate repetition is called delayed evidence, schedule another later changed case.

### Week 16 · Lesson 1 — Assessment scope, commands, pacing and worked trace/contract rehearsal

Explain how 'compare' differs from 'identify', then outline a short-answer time/checking plan.

**Expected reasoning:** Compare addresses similarities/differences against criteria; identify names; timing follows practice scope and school instructions.

**If not yet secure:** If compare gives two unrelated definitions, add an explicit relationship using the same criterion.

### Week 16 · Lesson 2 — Teacher setup, 40-minute original practice and initial reflection

After the original practice attempt, flag one uncertain answer and justify one trace without consulting its key.

**Expected reasoning:** Original timed response and independent reasoning retained; uncertainty is specific.

**If not yet secure:** If certainty is inferred from finishing early, inspect each command/subpart.

### Week 16 · Lesson 3 — Point-based marking, error diagnosis and targeted correction

For one missed criterion, classify cause and write a repair that changes the underlying reasoning.

**Expected reasoning:** Original mismatch supports cause; corrected trace/algorithm/network argument addresses it.

**If not yet secure:** If correction is copied text, explain the step orally with changed facts.

### Week 16 · Lesson 4 — Fresh independent retries, final readiness checklist and revision plan. Four lessons in week 16

Complete a fresh programming retry and network retry, then name evidence and remaining limitations in your readiness plan.

**Expected reasoning:** Results are independent and scenario-specific; school confirms actual exam requirements; no score guarantees.

**If not yet secure:** If readiness is only a percentage, name which skills remain untested.

## Unit 4 — Year 12

### Week 1 · Lesson 1 — Retrieve relational/normalisation foundations

LoanID→EquipmentID→EquipmentName. Identify the transitive dependency and an update anomaly.

**Expected reasoning:** EquipmentName depends through EquipmentID; repeated name updates can conflict across loans.

**If not yet secure:** If LoanID→EquipmentID is called partial, first check whether the key is composite.

### Week 1 · Lesson 2 — Read six-table crow’s-foot model, composite bridge and optional one-to-one

A Booking(MemberID,SessionID) may have one Attendance record. Explain the composite reference and optional participation.

**Expected reasoning:** Attendance references both booking-key parts; booking has zero/one attendance, each attendance one booking.

**If not yet secure:** If only MemberID is linked, test one member booking two sessions.

### Week 1 · Lesson 3 — Dictionary/integrity/schema reconciliation

A required FK permits NULL in SQLite unless constrained. Reconcile a mandatory Session→Workshop relationship.

**Expected reasoning:** WorkshopID uses NOT NULL plus enforced FK; dictionary/ER minimum and schema agree.

**If not yet secure:** If FK alone is assumed sufficient, test null and nonexistent IDs separately.

### Week 1 · Lesson 4 — Independent exhibition-model transfer and explained feedback. Four lessons in semester week 1

Model Artist,Exhibit,Visitor,Reservation,CheckIn,Venue from the exhibition task and justify one bridge constraint.

**Expected reasoning:** Six distinct roles; Reservation resolves visitor/exhibit many-to-many with unique pair; CheckIn references the pair.

**If not yet secure:** If six arbitrary tables are created, map every entity and key to a stated requirement.

### Week 2 · Lesson 1 — Retrieve schema/keys and predict four-table joins

A booking joins one member, one session and one workshop. Predict one row per booking and explain the key chain.

**Expected reasoning:** Booking→Member by MemberID; Booking→Session by SessionID; Session→Workshop by WorkshopID; required references yield one match each.

**If not yet secure:** If names are joined, test equal labels and retain identifiers.

### Week 2 · Lesson 2 — Implement joins/aliases and diagnose missing conditions

Two bookings and three members are joined with no ON condition. Predict the cross-product row count and repair the link.

**Expected reasoning:** Six combinations; use declared MemberID key match; aliases do not create joins automatically.

**If not yet secure:** If DISTINCT is proposed first, repair the relationship before considering output duplicates.

### Week 2 · Lesson 3 — Aggregate at session/booking grain

A session capacity 2 has two bookings. Explain why summing capacity after that join yields 4.

**Expected reasoning:** Capacity repeats per booking; aggregate at session grain to count its two places once.

**If not yet secure:** If SUM(DISTINCT Capacity) is the universal fix, add another session with capacity 2.

### Week 2 · Lesson 4 — Zero-booking LEFT JOIN/count clinic and feedback

S1 has two bookings; S2 has none. Compare COUNT(*) and COUNT(childKey) after a LEFT JOIN.

**Expected reasoning:** S1 gives 2/2; S2 gives 1/0; preserved NULL child row is not a booking.

**If not yet secure:** If zero session disappears, start from Session and inspect filters on child fields.

### Week 3 · Lesson 1 — Calculated percentages, concatenated labels and aliases

For capacity 3 and one booking, calculate remaining places and fill percentage to one decimal. Why use 100.0?

**Expected reasoning:** 2 places, 33.3%; real arithmetic avoids integer truncation; alias labels result without changing stored schema.

**If not yet secure:** If percentage is zero, inspect integer division before rounding.

### Week 3 · Lesson 2 — Composite attendance joins, NULL and row/group filtering

Attendance for M1/S1 exists but M1/S2 is missing. Why must both key parts join, and what does missing Present mean?

**Expected reasoning:** Both identify the booking; missing attendance is NULL/unknown, not recorded absence 0; WHERE/HAVING act at different stages.

**If not yet secure:** If absence is inferred, distinguish missing record from an explicit false value.

### Week 3 · Lesson 3 — Repair multiplied totals and independently test changed data

Two sessions each have capacity 2. Why is SUM(DISTINCT Capacity)=2 wrong for total places, and how should it be calculated?

**Expected reasoning:** Distinct removes equal values, not duplicate entities; total is 4 at session grain.

**If not yet secure:** If a join still multiplies totals, aggregate sessions independently before combining reports.

### Week 3 · Lesson 4 — Fresh report transfer, expected/actual evidence and feedback. Eight lessons across two weeks

Add the first booking to an unbooked session. Predict changes to its count/remaining/fill report, then run it.

**Expected reasoning:** Count increases 0→1; remaining decreases one; percentage recomputed from its capacity; other sessions unchanged.

**If not yet secure:** If all rows change, inspect join/filter scope and compare target/non-target evidence.

### Week 4 · Lesson 1 — Controlled CREATE/ALTER/data changes and rollback lab

Contrast CREATE, ALTER, UPDATE and ROLLBACK in a disposable database, checking before/after state.

**Expected reasoning:** Create structure, alter structure, change records, undo uncommitted transaction changes; committed data not magically undone.

**If not yet secure:** If rollback restores any history, mark the transaction boundary and commit point.

### Week 4 · Lesson 2 — Source mapping/cleaning and data-quality decisions

An import contains duplicate IDs, blank required names and ambiguous dates. State a defensible policy for each.

**Expected reasoning:** Use source evidence; reject/quarantine unresolved rows; preserve provenance and do not invent values.

**If not yet secure:** If blanks are filled by guessing, record uncertainty and ask for authoritative source clarification.

### Week 4 · Lesson 3 — Transaction/ACID and parameterised booking reasoning

A booking requires two inserts. Explain atomicity on second-insert failure and why SQL parameters matter.

**Expected reasoning:** Rollback both changes; parameters separate data from SQL syntax; atomicity does not itself validate all business rules.

**If not yet secure:** If first insert remains, add explicit transaction/error handling and negative test.

### Week 4 · Lesson 4 — Test design, backup/recovery and project preparation

Design a failed-write test and a backup recovery test before the project starts.

**Expected reasoning:** Expected failure preserves valid data; restore into safe target and query known contents; actual evidence later recorded.

**If not yet secure:** If backup creation is called recovery, include reopening and content verification.

### Week 5 · Lesson 1 — Investigate the booking database brief and scope

Translate one database-project need into a measurable functional criterion and one quality criterion.

**Expected reasoning:** Operation/result and measurable quality are tied to brief, not table count alone.

**If not yet secure:** If criteria say 'secure' or 'fast', specify access result or named-condition response measure.

### Week 5 · Lesson 2 — Design the six-table model and key relationships

Trace the project's six-table design from Member to Booking to Session to Workshop and justify cardinalities.

**Expected reasoning:** Declared keys and business rules support the links; optional records and unique pairs distinguished.

**If not yet secure:** If cardinalities come from sample row counts, return to the stated business rules.

### Week 5 · Lesson 3 — Specify the dictionary, constraints and transaction requirements

Specify PK/FK/null/domain rules and the transaction boundary for a booking operation.

**Expected reasoning:** Dictionary matches schema; related writes commit/rollback together; cross-row capacity rule explicitly handled separately.

**If not yet secure:** If a CHECK is assumed to count all bookings, distinguish row constraints from aggregate rules.

### Week 5 · Lesson 4 — Desk-check the design and agree acceptance criteria

Desk-check duplicate booking and unavailable-capacity cases; agree their expected database state.

**Expected reasoning:** Rejected operations leave no partial booking/attendance changes; criteria identify the enforcing mechanism.

**If not yet secure:** If every failure expects an exception, document the actual chosen error/report contract.

### Week 6 · Lesson 1 — Retrieve threat vocabulary, CIA/AAA worked case and mechanism classification

A shared account exports records and alters capacity. Apply CIA and AAA to the case.

**Expected reasoning:** Confidentiality/integrity affected; availability considered separately; shared identity/permissions/log attribution limit AAA.

**If not yet secure:** If CIA/AAA are only expanded, link each applicable term to observed or plausible effects.

### Week 6 · Lesson 2 — Synthetic log/case analysis, hypotheses and alternatives, manual/offline counts and explained feedback

Three failed logins precede a successful export from one IP. Give two hypotheses and one discriminating observation.

**Expected reasoning:** Attack and legitimate user error are possible; identity/session/authorised audit evidence needed; IP alone not a person.

**If not yet secure:** If compromise is declared proven, state what the log does not establish.

### Week 6 · Lesson 3 — Create the six-table database and verify integrity constraints

Create the project schema and attempt one valid insert plus duplicate/null/orphan failures.

**Expected reasoning:** Named constraints enforced on the actual connection; valid state remains after rejected operations.

**If not yet secure:** If SQLite foreign keys are assumed on, verify PRAGMA on the connection used.

### Week 6 · Lesson 4 — Implement core reports with expected/actual results

Run one core report against a manually predicted fixture including an unbooked session.

**Expected reasoning:** Expected rows/counts include zero correctly; actual output compared and non-target rows checked.

**If not yet secure:** If only SQL execution success is recorded, calculate expected content independently.

### Week 7 · Lesson 1 — Control purpose/limits, ordered traffic rules and scoped role permissions

An ordered firewall rule permits staff HTTPS then denies others. Predict a staff match and a guest match; distinguish network rule from app role.

**Expected reasoning:** First matching rule governs as specified; network traffic permission does not grant application editing rights.

**If not yet secure:** If a port allow permits every action, add server-side operation authorisation.

### Week 7 · Lesson 2 — Response scenarios, positive/negative acceptance tests, competing proposals and explained feedback

Test an authorised capacity change and a denied student change; specify expected state and response.

**Expected reasoning:** Staff change succeeds within rules; student request rejected server-side with capacity unchanged; both outcomes logged appropriately.

**If not yet secure:** If button hiding is the only test, send/check the prohibited operation at the enforcement boundary.

### Week 7 · Lesson 3 — Implement safe changes and parameterised operations

Implement a parameterised project update with an exact target condition and test quote-containing data.

**Expected reasoning:** Data stays data, intended row changes, non-target rows preserved; validation/permission checks remain separate.

**If not yet secure:** If input is concatenated into SQL, replace it with placeholders and bound parameters.

### Week 7 · Lesson 4 — Test positive and negative transaction cases

Force the second step of a transaction to fail; verify that no first-step write remains committed.

**Expected reasoning:** All-or-none behaviour demonstrated by queries; rollback followed by usable connection/state.

**If not yet secure:** If only an error message is checked, inspect database contents after failure.

### Week 8 · Lesson 1 — Historical ciphers, key roles and fingerprints

Contrast encryption, hashing and a historical substitution cipher in purpose and limitations.

**Expected reasoning:** Encryption reversible with key; hash digest comparison one-way by design; historical cipher is weak teaching model.

**If not yet secure:** If hash is called decryptable ciphertext, distinguish recoverability from comparison.

### Week 8 · Lesson 2 — Certificate cards, TLS ordering and connection-risk explanation

Order certificate checking, authenticated key agreement and symmetric record protection in simplified TLS 1.3.

**Expected reasoning:** Certificate binds identity/key; handshake proves key possession/authenticates agreement; derived symmetric keys protect records; no RSA key transport claim.

**If not yet secure:** If public-key encryption is used for every record, separate handshake authentication from bulk encryption.

### Week 8 · Lesson 3 — Implement atomic booking and attendance behaviour

Implement atomic booking plus attendance behaviour and test both existing and missing related records.

**Expected reasoning:** Contract permits only valid linked state; unique pair/reference checks enforced; success commits consistently.

**If not yet secure:** If a missing attendance record means absent, preserve unknown/not-recorded semantics.

### Week 8 · Lesson 4 — Test failed operations and rollback outcomes

Reject a duplicate booking or invalid attendance link and inspect every affected table after rollback.

**Expected reasoning:** No partial changes remain; pre-existing rows unchanged; exact failure cause and expected response recorded.

**If not yet secure:** If memory state alone is checked, query the actual database after failure.

### Week 9 · Lesson 1 — Entity/jurisdiction, five APPs and breach cases

Before applying APPs or breach rules, identify entity, jurisdiction, date and missing eligibility facts.

**Expected reasoning:** Applicable law cannot be inferred from 'school' alone; distinguish federal/state scope and current commencement dates; assess facts promptly.

**If not yet secure:** If 30 days is treated as automatic notification delay, revisit assessment versus notification obligations.

### Week 9 · Lesson 2 — Data-mining critique, paper red/blue-team scope and source/project decisions

A data-mining proposal reuses records beyond their stated purpose; a red team seeks broader targets. Give one justified limit each.

**Expected reasoning:** Purpose/consent/authority and minimisation checked; testing remains within explicit written scope; defensive role does not grant unlimited access.

**If not yet secure:** If public availability means unrestricted reuse, inspect purpose, permissions and affected people.

### Week 9 · Lesson 3 — Map and clean import data using source evidence

Map a raw import row to schema fields, recording one cleaning change and one unresolved uncertainty.

**Expected reasoning:** Traceable original→clean value with rule/source; uncertainty quarantined rather than invented.

**If not yet secure:** If normalisation is confused with cleaning, separate relational design from correcting source values.

### Week 9 · Lesson 4 — Test all-or-none import and recovery

Import a batch containing one invalid required row under an all-or-none policy, then test recovery safely.

**Expected reasoning:** Entire batch rejected/rolled back as contracted; previous valid records survive; restore/reopen result checked.

**If not yet secure:** If valid prefix rows remain, widen transaction boundary to the complete batch.

### Week 10 · Lesson 1 — Run the full acceptance suite and inspect failures

Run the full project acceptance suite and select the highest-impact actual failure for investigation.

**Expected reasoning:** Requirement-linked results identify real failures; priority follows user impact/dependencies, not ease alone.

**If not yet secure:** If unrun tests are marked pass, change them to pending and execute them.

### Week 10 · Lesson 2 — Repair, restore/reopen and run regression checks

After repairing one defect, restore/reopen a separate database and rerun relevant regression checks.

**Expected reasoning:** Repair and recovery are distinct; known records/reports persist as expected; earlier passing behaviour retained.

**If not yet secure:** If in-memory rollback proves persistence, close/reopen the actual file and inspect it.

### Week 10 · Lesson 3 — Demonstrate independent implementation and justify decisions

Demonstrate one transaction, one report and one rejected unauthorised operation, explaining your implementation.

**Expected reasoning:** Student links code/schema to observed outcomes; no claim that demonstration alone proves production security.

**If not yet secure:** If reference code is recited, change a fixture and explain the new outcome independently.

### Week 10 · Lesson 4 — Evaluate against requirements and submit evidence

Evaluate the database against two met and one incomplete criterion and rank a realistic improvement.

**Expected reasoning:** Judgements cite actual tests and limitations; handover includes setup/recovery guidance and remaining risks.

**If not yet secure:** If evaluation lists features only, connect each criterion to evidence and user effect.

### Week 11 · Lesson 1 — Key/dependency/diagram retrieval and design repair

Repair an ER design that duplicates CategoryName in every Equipment row; identify the dependency and keys.

**Expected reasoning:** CategoryID→CategoryName separated; Equipment retains FK; anomaly explained and cardinalities preserved.

**If not yet secure:** If only a diagram is redrawn, show which update inconsistency is removed.

### Week 11 · Lesson 2 — Manual report prediction, independent SQL and NULL/grain feedback

Predict LEFT JOIN counts for two parents with 2 and 0 children, then write the grouped SQL.

**Expected reasoning:** Counts 2/0 using non-null child key; grouping at parent ID; deterministic order if required.

**If not yet secure:** If zero becomes one, inspect outer-join placeholder versus actual child key.

### Week 11 · Lesson 3 — Transactions, connectivity and recovery evidence

Explain what evidence distinguishes rollback, successful backup and successful recovery; name a connectivity layer involved.

**Expected reasoning:** Rollback undoes uncommitted changes; backup copies data; recovery restores and verifies contents; driver/API connects application to DBMS as taught.

**If not yet secure:** If all are 'save', trace failure/recovery sequence with state checkpoints.

### Week 11 · Lesson 4 — Security/cryptography/privacy case response with brief Unit 3 retrieval

For an unauthorised export over HTTPS, distinguish transport protection, authorisation and breach evidence; recall a routed next hop.

**Expected reasoning:** HTTPS protects transport but not permission; export facts need scope/identity/impact assessment; remote packet uses gateway locally.

**If not yet secure:** If encryption is said to authorise export, separate identity/permission from channel security.

### Week 12 · Lesson 1 — Changed-data query transfer and explanation

Add a zero-booking session and a second equal-capacity session; predict effect on counts and total capacity.

**Expected reasoning:** New session remains in all-session report with 0; each distinct session's capacity counts once even when equal.

**If not yet secure:** If DISTINCT removes one capacity, aggregate by session identity instead.

### Week 12 · Lesson 2 — Unfamiliar model and evidence-based extended response

For an unfamiliar model, explain a composite relationship and justify one constraint with a counterexample.

**Expected reasoning:** Both key parts preserve the intended relationship; counterexample shows invalid state prevented by constraint.

**If not yet secure:** If table count substitutes for design, return to the relationship's business rule.

### Week 12 · Lesson 3 — Original controlled formative sample in the existing theory-test slot

After the controlled sample is collected, identify one answer that needed source facts and one with an untested assumption.

**Expected reasoning:** Original evidence retained; facts and assumptions separated without changing assessment conditions.

**If not yet secure:** If plausible inference is presented as observation, label the missing evidence.

### Week 12 · Lesson 4 — Marking, explained correction, fresh independent retry and consolidation priorities

Repair one missed criterion and attempt a changed case before selecting consolidation priorities.

**Expected reasoning:** New case changes data/requirements; response demonstrates reasoning rather than copied key text.

**If not yet secure:** If priority is vague, name a precise SQL, design or security operation to retry.

### Week 13 · Lesson 1 — Diagnostic, prior-evidence review and two priorities

Choose two priorities from the diagnostic, each supported by an incorrect original response and a success criterion.

**Expected reasoning:** Actual evidence determines priorities; criterion is demonstrable by a fresh answer/test.

**If not yet secure:** If confidence alone determines choice, attempt the related unseen diagnostic first.

### Week 13 · Lesson 2 — Programming/algorithm/object repair clinic and independent practice

Trace a dictionary accumulator on [('A',2),('B',0),('A',3)] and state its empty-input result.

**Expected reasoning:** {'A':5,'B':0}; empty {}; initialise missing keys safely and preserve input.

**If not yet secure:** If repeated A overwrites 2, add to previous total rather than replacing it.

### Week 13 · Lesson 3 — Fresh database design/SQL/transaction repair clinic

Write a safe update for one row and a failed second-step transaction test; explain expected unchanged state on failure.

**Expected reasoning:** Parameters and exact predicate target intended row; rollback leaves no partial writes; existing rows verified.

**If not yet secure:** If WHERE alone is considered safe, test its actual target and authorisation separately.

### Week 13 · Lesson 4 — Networking/security/responsibility clinic and explanation

Explain a /27 host range, least privilege and one privacy uncertainty in a supplied case.

**Expected reasoning:** Aligned /27 has 30 ordinary usable hosts; permissions limited to needed actions; legal conclusion depends on entity/date/facts.

**If not yet secure:** If definitive legal outcome is guessed, record missing scope facts and appropriate source check.

### Week 14 · Lesson 1 — Priority 1 repair and changed independent attempt

For priority 1, change one input or requirement and solve the resulting task without the old answer visible.

**Expected reasoning:** Changed facts produce recomputed output/design/reasoning; original and fresh results both retained.

**If not yet secure:** If wording alone changes, alter a boundary value or relationship and retry.

### Week 14 · Lesson 2 — Priority 2 repair and changed independent attempt

For priority 2, give a counterexample to your former wrong rule, then solve a new case.

**Expected reasoning:** Counterexample exposes the misconception; fresh solution applies a corrected rule explicitly.

**If not yet secure:** If counterexample also fits the wrong rule, choose a boundary or missing-data case that distinguishes them.

### Week 14 · Lesson 3 — Mixed transfer and evidence-based feedback

Combine one algorithm trace, one report prediction and one justified control in a new scenario.

**Expected reasoning:** All answers use supplied data and stated contracts; uncertainty or unavailable facts are explicit.

**If not yet secure:** If examples are memorised, change names/values while keeping the underlying concept.

### Week 14 · Lesson 4 — Delayed retries, remaining support and Weeks 15–16 revision plan

Retry both priorities after a gap; plan one action for each remaining weakness in Weeks 15–16.

**Expected reasoning:** Dated independent evidence supports demonstrated/needs-retry/not-yet-evidenced judgements.

**If not yet secure:** If all are called mastered after reading, require a changed independent attempt.

### Week 15 · Lesson 1 — Current instructions, command/source use and pacing plan

Explain the difference between 'analyse' and 'identify'; locate a source fact and plan a practice time budget.

**Expected reasoning:** Analysis connects parts/evidence to conclusions; identification names; source fact is cited and pacing fits local practice scope.

**If not yet secure:** If generic definitions replace source use, link a specific fact to one conclusion.

### Week 15 · Lesson 2 — Original Set A timed attempt

After Set A, identify one unfinished subpart and preserve one uncertain original response before seeing the key.

**Expected reasoning:** Original attempt/time and uncertainty recorded; supported corrections remain separate.

**If not yet secure:** If answers were revealed first, label support and select a fresh independent task.

### Week 15 · Lesson 3 — Criterion marking, explained corrections and targeted repair

Explain why one Set A criterion was missed, then repair its reasoning with an explicit calculation or causal link.

**Expected reasoning:** Cause follows original response; repair uses source facts and correct method, not score alone.

**If not yet secure:** If only the model sentence is copied, explain the same point with a changed figure.

### Week 15 · Lesson 4 — Fresh retries and short revision plan

Complete one fresh retry from Set A weaknesses and schedule one later retry with a specific resource.

**Expected reasoning:** Changed-case answer and success check show progress; remaining limitations recorded.

**If not yet secure:** If the same answer is repeated immediately, change the task and revisit after a gap.

### Week 16 · Lesson 1 — Original Set B timed attempt

After Set B, record one answer needing a trace and one needing justified judgement; check every command/subpart.

**Expected reasoning:** Original responses retained; appropriate evidence form chosen for each; no new full-paper claim.

**If not yet secure:** If all answers are definitions, match each command to its required reasoning.

### Week 16 · Lesson 2 — Marking and specific cause repair

Classify one Set B error and show the exact step where source interpretation or technical reasoning failed.

**Expected reasoning:** Content/interpretation/tracing/time diagnosis is supported by original work and a precise correction.

**If not yet secure:** If every mistake is called careless, name the missing operation or fact.

### Week 16 · Lesson 3 — Unfamiliar mixed transfer and later priority retry

Solve an unfamiliar changed case from a prior weakness and compare it with your delayed retry evidence.

**Expected reasoning:** Independent response uses new data; comparison shows what transfers and any remaining support.

**If not yet secure:** If old expected values are reused, recalculate from the changed stimulus.

### Week 16 · Lesson 4 — Delayed retrieval, readiness/support plan and instruction/materials check

Without notes, retry two selected weak skills and state remaining support plus official exam arrangements to confirm.

**Expected reasoning:** Readiness rests on dated independent work; school confirms venue/materials/access arrangements; no guaranteed grade inferred.

**If not yet secure:** If checklist ticks replace evidence, attach the actual fresh responses and unresolved questions.
