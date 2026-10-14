chapters.push({
  "id": "unit4-design",
  "unit": 4,
  "week": 1,
  "title": "Refining relational database designs",
  "badge": "DATABASE DESIGN",
  "intro": "Turn requirements and dependencies into a six-table model, then check what the keys and constraints actually enforce.",
  "objectives": [
    "Identify anomalies and functional dependencies in a flat relation.",
    "Read/create crow’s-foot relationships and resolve many-to-many with a composite bridge.",
    "Represent optional one-to-one attendance and its paired foreign key.",
    "Reconcile a data dictionary with SQLite enforcement and remaining business rules."
  ],
  "sections": [
    [
      "Refine from requirements, not a table count",
      "<p>A fictional community centre runs named workshops. Each scheduled session belongs to exactly one workshop and one instructor. Members can book many sessions; a session can have many members. A member may book a particular session once. A booking may later receive one attendance record; no record means not yet recorded, not automatically absent.</p><p>Every entity may exist before dependent rows are created: an instructor or workshop can have no sessions, a member no bookings and a session no bookings. A session has a positive capacity. Keeping bookings within that capacity is a separate cross-row business rule. Names and titles are not assumed unique.</p><p>The worked model has six tables with different responsibilities. The Year 12 database implementation requires at least five tables, while design tasks also span different model sizes. Add tables because requirements and dependencies justify them; six labels alone do not establish a good design. This opening chapter is a design clinic, not the complete database project.</p>"
    ],
    [
      "Diagnose a flat record and its dependencies",
      "<p>Suppose one flat row stores MemberID, MemberName, SessionID, SessionDate, Capacity, WorkshopID, WorkshopTitle, InstructorID, InstructorName, BookedOn and Present. Its proposed booking key is (MemberID,SessionID). MemberName depends only on MemberID; session details depend only on SessionID. These partial dependencies prevent 2NF. WorkshopTitle and InstructorName also depend on identifiers inside the session details, giving transitive dependencies in the combined relation.</p><p>Updating an instructor name in every booking risks inconsistency. A session cannot be stored before anyone books if the only storage is the booking row. Deleting the last booking could lose session information. These are update, insertion and deletion anomalies.</p><p>Apply 1NF by representing one atomic value per field and removing repeating lists for the defined domain; 2NF removes non-key partial dependencies on a candidate key; 3NF addresses remaining problematic non-key dependencies. State the functional dependencies and candidate keys. Adding a surrogate BookingID does not remove the underlying dependencies or the need to prevent duplicate member/session pairs.</p>"
    ],
    [
      "Read the six-table crow’s-foot model",
      "<figure><img src=\"unit4-workshop-model.svg\" alt=\"Workshop and Instructor each have zero or many Sessions; each Session has exactly one of each. Member and Session each have zero or many Bookings; every Booking has exactly one of each. Booking has zero or one Attendance; every Attendance belongs to exactly one Booking.\" style=\"width:100%;height:auto\"><figcaption>Original crow’s-foot model. Read the legend and every relationship in both directions; independent symbol review remains pending.</figcaption></figure><table><tr><th>Relationship</th><th>Both directions</th></tr><tr><td>Workshop–Session</td><td>Workshop has zero or many sessions; each session has exactly one workshop</td></tr><tr><td>Instructor–Session</td><td>Instructor has zero or many sessions; each session has exactly one instructor</td></tr><tr><td>Member–Booking</td><td>Member has zero or many bookings; each booking has exactly one member</td></tr><tr><td>Session–Booking</td><td>Session has zero or many bookings; each booking has exactly one session</td></tr><tr><td>Booking–Attendance</td><td>Booking has zero or one attendance record; attendance has exactly one booking</td></tr></table><p>The bridge Booking resolves Member–Session many-to-many. Its composite key stops duplicate bookings for the same pair. Attendance reuses that pair as its primary key and composite foreign key. This permits at most one attendance row per booking, but does not require one to exist.</p><p>Optional one-to-one storage is justified here because attendance is recorded later as a separate event. An alternative could store a nullable attendance state on Booking; compare simplicity, meaning and requirements. Do not split a table merely to manufacture a one-to-one relationship.</p>"
    ],
    [
      "Write relational notation and key rules",
      "<pre><code>Instructor(InstructorID PK, DisplayName)\nWorkshop(WorkshopID PK, Title)\nSession(SessionID PK, WorkshopID FK, InstructorID FK, SessionDate, Capacity)\nMember(MemberID PK, DisplayName)\nBooking(MemberID PK/FK, SessionID PK/FK, BookedOn)\nAttendance(MemberID PK/FK, SessionID PK/FK, Present)\nAttendance(MemberID,SessionID) jointly references Booking(MemberID,SessionID).</code></pre><p>Mark every part of each composite key. Two separate foreign keys from Attendance to Member and Session would only show that those independent rows exist; they would not prove that the particular member booked that session. The joint reference to Booking enforces the paired relationship.</p><p>A session’s surrogate SessionID allows repeated workshop deliveries, even on the same date; no uniqueness of (WorkshopID,SessionDate) is assumed. If the organiser requires such a restriction, document and enforce it explicitly. Avoid creating uniqueness rules just because the sample has no duplicates.</p>"
    ],
    [
      "Make a data dictionary that matches implementation",
      "<p>Document field meaning, conceptual type, storage representation, nullability, length/range, key role and enforcement location. Names are text; dates are conceptual dates; Present is a Boolean; capacity is an integer. A measured duration could need a float, while fixed currency may use integer minor units to avoid binary rounding. Choose representations from the actual requirement.</p><p>SQLite’s ordinary column declarations provide affinity, not a universal rigid type rule. The schema uses TEXT dates and INTEGER 0/1 for Boolean state. Explicit typeof/range checks constrain stored capacity and Present. The name/title CHECK expressions limit trimmed length; they do not trim stored values automatically. VARCHAR(60) alone would not impose a length limit in SQLite.</p><p>The supplied dictionary records all 17 columns and identifies limits. Date text is NOT NULL but is not calendar-validated by this schema; a malformed date can still be stored. Nonempty/formatted ID checks, session clashes, booking capacity and date sequencing also need application/transaction logic or further documented constraints. Do not claim “database validation” when only the design document states the rule.</p>"
    ],
    [
      "Distinguish three kinds of integrity",
      "<p>Entity integrity keeps a row’s key unique and non-null. Referential integrity keeps a required reference tied to an existing parent. Domain integrity constrains an accepted value, such as positive integer capacity or Present in {0, 1}. These checks address validity; a valid-looking value can still be factually wrong.</p><p>The supplied SQLite schema explicitly enables foreign-key checking before creating/using the data. Each connection should verify this setting; changing it inside an active transaction has no effect. Required references use NOT NULL. Explicit NOT NULL is also present on TEXT/composite key columns rather than relying on SQLite’s ordinary primary-key quirks.</p><p>Deleting a Booking cascades to its dependent Attendance in this demonstration. Deleting a Member or Session with bookings is blocked by the default reference action. This is a classroom lifecycle rule, not a recommendation to destroy operational history. Real retention and authorisation requirements must be agreed before a deletion policy is chosen.</p>"
    ],
    [
      "Compare conceptual rules with a runnable schema",
      "<p>Run the offline checker beside the SQL file. It creates an in-memory database, displays table counts and checks whether a proposed attendance pair already has a booking. It does not create a school database or change existing files.</p><pre><code>python unit4-design-check.py\n\n-- Example constraint, with both key columns:\nFOREIGN KEY(MemberID, SessionID)\n    REFERENCES Booking(MemberID, SessionID)</code></pre><p>Inspect the schema before executing it in a DBMS. Use an empty disposable database if running the SQL directly; table names can conflict with an existing database. Predict which failures the schema catches, and which it leaves open. Cross-row capacity enforcement and ACID transaction reasoning will be developed later.</p><p><a class=\"button\" href=\"unit4-design-pack.zip\" download>Download design pack</a> · <a href=\"unit4-design-workbook.md\" download>Workbook</a> · <a href=\"unit4-design-answers.md\" download>Teacher answers</a> · <a href=\"unit4-design-dictionary.csv\" download>Data dictionary</a> · <a href=\"unit4-design-schema.sql\" download>Schema and synthetic data</a>. Teacher files are separate, not access-protected.</p>"
    ],
    [
      "Transfer to a fresh design",
      "<p>Design a fictional exhibition system: an Artist has zero or many Exhibits; each Exhibit has one Artist. A Visitor can reserve many Exhibits and an Exhibit can be reserved by many Visitors; each pair occurs once. Each Reservation may receive one CheckIn record. Add a Venue entity: each Exhibit belongs to one Venue, which may host many Exhibits. Create six tables, notation, a dictionary and crow’s-foot diagram.</p><p>Explain the composite reference for CheckIn and a rule that remains unenforced. Compare the model with the workshop system, using fresh identifiers and meanings rather than renaming the diagram mechanically. Record an insertion/update/deletion anomaly in a flat alternative, then show which dependency your decomposition removes.</p><p>Sources: <a href=\"https://senior-secondary.scsa.wa.edu.au/__data/assets/pdf_file/0013/1211323/_Computer-Science-ATAR-Year-12-Syllabus-for-teaching-from-January-2026.PDF\">2026 SCSA Year 12 data management</a>, <a href=\"https://senior-secondary.scsa.wa.edu.au/__data/assets/pdf_file/0003/1090875/Year-11_12_Computer-Science_ATAR_Additional-syllabus-support-booklet-.PDF\">SCSA notation support</a>, <a href=\"https://www.sqlite.org/foreignkeys.html\">SQLite foreign keys</a>, <a href=\"https://www.sqlite.org/datatype3.html\">SQLite types</a> and <a href=\"https://www.sqlite.org/lang_createtable.html\">SQLite constraints</a>. Explanations, diagrams and records are original classroom drafts.</p>"
    ]
  ],
  "practice": [
    [
      "KEY",
      "Why is (MemberID, SessionID) a useful Booking key?",
      "It uniquely represents the allowed one-booking-per-member/session rule while each component alone can repeat."
    ],
    [
      "PAIR",
      "Why does Attendance reference Booking jointly?",
      "Independent Member/Session references would not establish that the particular pair booked; the composite reference does."
    ],
    [
      "OPTIONAL",
      "Does the Attendance foreign key force every booking to have attendance?",
      "No. Existing attendance must reference a booking, and its key permits at most one; a booking can still have none."
    ],
    [
      "NORMALISE",
      "Does adding BookingID automatically fix partial/transitive dependencies?",
      "No. The underlying candidate key and dependencies remain; decomposition and constraints must follow the semantics."
    ],
    [
      "VALIDITY",
      "Does NOT NULL date text prove a valid calendar date?",
      "No. The schema requires a value but does not validate calendar meaning or factual accuracy."
    ]
  ],
  "task": "Interpret the worked model both ways, explain its dependencies/keys, predict constraint failures and reconcile the 17-field dictionary. Create the fresh six-table exhibition design with notation, crow’s-foot diagram, constraints and one explicit remaining business-rule gap.",
  "solution": "Workshop/Instructor each parent Session; Member/Session link through Booking; Attendance has a composite FK to the Booking pair. Optional attendance is zero or one, not mandatory. Separate member/session descriptions from booking dependencies. Duplicate/orphan/domain checks are enforced where declared, but dates/capacity/clashes remain explicit gaps. Transfer the same reasoning to the exhibition requirements.",
  "recap": "A refined model records meaning: dependencies guide decomposition, keys enforce identity, paired references enforce a relationship, and documentation names the rules still needing implementation. Table count alone does not establish quality.",
  "lessons": [
    "Lesson 1: retrieve relational/normalisation foundations; diagnose the flat booking relation and state dependencies.",
    "Lesson 2: read six-table crow’s-foot model, composite bridge and optional one-to-one; write notation.",
    "Lesson 3: dictionary/integrity/schema reconciliation; predict and check constraints in an offline database.",
    "Lesson 4: independent exhibition-model transfer and explained feedback. Four lessons in semester week 1; no extra project."
  ],
  "reference": "https://www.sqlite.org/foreignkeys.html",
  "refTitle": "SQLite: foreign-key constraints including composite references",
  "quiz": {
    "q": "What ensures an attendance record belongs to a member/session pair that was actually booked?",
    "options": [
      "Separate references to Member and Session only.",
      "A composite foreign key to the Booking pair.",
      "A unique workshop title."
    ],
    "answer": 1,
    "explanation": "The joint reference checks the specific pair against Booking; two independent parent references cannot establish that booking exists."
  },
  "next": "#plan-4-1"
});

chapters.push({
  "id": "unit4-sql",
  "unit": 4,
  "week": "2–3",
  "title": "Advanced SQL queries",
  "badge": "SQL / REPORTS",
  "intro": "Write multi-table reports that count the right thing, preserve missing relationships and explain every calculated result.",
  "objectives": [
    "Write four-table inner joins using declared keys.",
    "Use aggregates/GROUP BY and distinguish row/group filters.",
    "Create calculated and concatenated fields with aliases.",
    "Diagnose zero-count, composite-key and multiplied-total errors."
  ],
  "sections": [
    [
      "Define the report’s grain",
      "<p>Before writing SQL, say what one output row represents: a booking, a session, a member or a workshop summary. Identify the tables and keys needed to reach that grain. A query can run successfully and still answer the wrong question.</p><p>Use the six-table workshop database from the opening chapter. Its three bookings are M01/S01, M02/S01 and M01/S02. S03 has no bookings; M03 has none. Attendance exists for M01/S01 (present1) and M02/S01 (present0); M01/S02 is unrecorded. All tasks begin from this same unchanged synthetic data.</p><p>This chapter covers eight lessons across weeks 2–3, four each week. Four-table inner joins and grouped/calculated/concatenated reports are core practice; LEFT JOIN and HAVING help explain zero rows and group filtering. Schema changes, imports and transaction-based business rules follow later.</p>"
    ],
    [
      "Join up to four tables and keep keys visible",
      "<pre><code>SELECT b.MemberID, m.DisplayName, s.SessionID, w.Title, s.SessionDate\nFROM Booking AS b\nINNER JOIN Member AS m ON m.MemberID = b.MemberID\nINNER JOIN Session AS s ON s.SessionID = b.SessionID\nINNER JOIN Workshop AS w ON w.WorkshopID = s.WorkshopID\nORDER BY s.SessionID, b.MemberID;</code></pre><p>Booking is the starting grain. Each join follows a declared key: MemberID, SessionID, then WorkshopID. The report has three rows, ordered by session and member. Selecting names alone can hide distinct people with the same label; retain IDs when identity matters.</p><p>Aliases shorten qualified names. They do not rename stored columns or change the schema. Specify an ON condition for each relationship; a missing condition can create every combination of rows. DISTINCT can remove legitimate duplicates from the selected view and should not disguise a broken join.</p>"
    ],
    [
      "Aggregate at the correct grain",
      "<pre><code>SELECT COUNT(*) AS SessionCount, SUM(Capacity) AS TotalPlaces,\n       AVG(Capacity) AS MeanPlaces, MIN(Capacity) AS Smallest,\n       MAX(Capacity) AS Largest\nFROM Session;</code></pre><p>At session grain: count 3, total places 7, mean 7/3, minimum 2 and maximum 3. SUM/AVG/MIN/MAX ignore NULL inputs; COUNT(*) counts rows and COUNT(column) counts non-NULL values. For an empty input without GROUP BY, COUNT returns 0 while the other ordinary aggregates here return NULL. A grouped empty input can return no groups.</p><pre><code>SELECT s.SessionID, COUNT(*) AS Bookings\nFROM Session AS s\nINNER JOIN Booking AS b ON b.SessionID = s.SessionID\nGROUP BY s.SessionID\nORDER BY s.SessionID;</code></pre><p>The grouped inner join returns S01: 2 and S02: 1. It excludes S03 because no matching booking exists. Group by identifiers, not titles that are permitted to repeat. Include every selected nonaggregate attribute in the grouping or use an explicitly justified key dependency; avoid SQLite’s permissive bare-column behaviour as a shortcut.</p>"
    ],
    [
      "Preserve zero-booking sessions",
      "<pre><code>SELECT s.SessionID, COUNT(b.MemberID) AS Bookings\nFROM Session AS s\nLEFT JOIN Booking AS b ON b.SessionID = s.SessionID\nGROUP BY s.SessionID\nORDER BY s.SessionID;</code></pre><p>LEFT JOIN preserves the session row when no booking matches. S03 then has NULL booking fields, and COUNT(b.MemberID) gives 0. COUNT(*) would count its placeholder row and incorrectly give 1. The correct result is S01: 2, S02: 1, S03: 0.</p><p>A condition on the right-hand table in WHERE can remove those preserved rows. To keep every booking but attach only matching presence records, place the presence condition in ON. To select only recorded present bookings, WHERE a.Present=1 is appropriate, as Q9 shows. Choose from the requested meaning.</p>"
    ],
    [
      "Calculate and concatenate with aliases",
      "<pre><code>SELECT s.SessionID, s.Capacity, COUNT(b.MemberID) AS Bookings,\n       s.Capacity - COUNT(b.MemberID) AS Remaining,\n       ROUND(100.0 * COUNT(b.MemberID) / s.Capacity, 1) AS FillPercent\nFROM Session AS s\nLEFT JOIN Booking AS b ON b.SessionID = s.SessionID\nGROUP BY s.SessionID, s.Capacity\nORDER BY s.SessionID;</code></pre><p>Remaining places are capacity minus bookings: S01 has 0, S02 has 2 and S03 has 2. FillPercent is 100.0, 33.3 and 0.0. The 100.0 literal forces real-valued division rather than truncating integer arithmetic. A percentage is an expression in the result, not a stored truth or guarantee of concurrency-safe capacity enforcement.</p><pre><code>SELECT b.MemberID, s.SessionID,\n       m.DisplayName || &#x27; / &#x27; || w.Title AS BookingLabel\nFROM Booking AS b\nINNER JOIN Member AS m ON m.MemberID = b.MemberID\nINNER JOIN Session AS s ON s.SessionID = b.SessionID\nINNER JOIN Workshop AS w ON w.WorkshopID = s.WorkshopID\nORDER BY s.SessionID, b.MemberID;</code></pre><p>SQLite uses || for concatenation. BookingLabel combines the member display name and workshop title; SQL dialects differ. NULL concatenation produces NULL unless an explicit replacement is chosen. Do not invent a display value that falsely changes the meaning of missing data.</p>"
    ],
    [
      "Respect composite keys and unknown attendance",
      "<pre><code>SELECT b.MemberID, b.SessionID, a.Present\nFROM Booking AS b\nLEFT JOIN Attendance AS a\n ON a.MemberID = b.MemberID AND a.SessionID = b.SessionID\nORDER BY b.SessionID, b.MemberID;</code></pre><p>The attendance join needs both MemberID and SessionID. Joining only on MemberID would incorrectly attach M01’s S01 attendance to the S02 booking. Correct Q7 gives 1, 0, NULL for the three booking rows. NULL means no attendance record here; zero means a recorded absence.</p><pre><code>SELECT b.SessionID, COUNT(*) AS Bookings,\n       COUNT(a.Present) AS Recorded,\n       SUM(a.Present) AS PresentCount\nFROM Booking AS b\nLEFT JOIN Attendance AS a\n ON a.MemberID = b.MemberID AND a.SessionID = b.SessionID\nGROUP BY b.SessionID\nORDER BY b.SessionID;</code></pre><p>S01 has 2 bookings,2 recorded states and 1 present. S02 has 1 booking,0 recorded states and NULL present sum. COALESCE can replace NULL for display, but cannot turn an unknown state into factual absence. If calculating an attendance rate, state whether the denominator is all bookings or recorded attendance, and guard a zero denominator.</p>"
    ],
    [
      "Filter rows and groups deliberately",
      "<pre><code>SELECT s.SessionID, COUNT(b.MemberID) AS Bookings\nFROM Session AS s\nLEFT JOIN Booking AS b ON b.SessionID = s.SessionID\nGROUP BY s.SessionID\nHAVING COUNT(b.MemberID) &gt;= 2\nORDER BY s.SessionID;</code></pre><p>WHERE filters input rows before aggregation; HAVING filters groups after aggregation. Q8 retains S01 with 2 bookings. A WHERE date filter would first select sessions/bookings in the agreed period, then group those rows. Use unambiguous YYYY-MM-DD text only after dates are validated; text storage alone does not prove calendar validity.</p><p>The conceptual reading order is FROM/JOIN → WHERE → GROUP BY/aggregates → HAVING → result/order. It helps explain semantics, but is not a promise about the database engine’s execution plan. ORDER BY is required for a reliable displayed order.</p>"
    ],
    [
      "Diagnose multiplied totals and test changed data",
      "<p>Summing Session.Capacity after joining to Booking repeats a session’s capacity once per booking. For W01, the faulty sum is 2 + 2 + 3 = 7; the correct session total is 2 + 3 = 5. SUM(DISTINCT Capacity) happens to give 5 in this small sample, but is also wrong in general: two different sessions may share a capacity. Fix the grain by summing sessions before joining or aggregating each entity at its own key.</p><p>Test queries with an unbooked session, an unrecorded attendance, equal labels, equal capacities, an empty filtered input and a member with several sessions. State predicted rows and totals before running. SQL validity is not report correctness.</p>"
    ],
    [
      "Complete the query clinic",
      "<p>Run the offline report runner after predicting outputs. It recreates the database in memory and executes the ten supplied SELECT queries. The expected-results JSON and teacher guide are separate. No existing database files or school records change.</p><pre><code>python unit4-sql-runner.py</code></pre><p><a class=\"button\" href=\"unit4-sql-pack.zip\" download>Download query pack</a> · <a href=\"unit4-sql-workbook.md\" download>Workbook</a> · <a href=\"unit4-sql-answers.md\" download>Teacher explanations</a> · <a href=\"unit4-sql-queries.sql\" download>Worked SQL</a>. Teacher files are separate, not access-protected.</p><p>Sources: <a href=\"https://www.sqlite.org/lang_select.html\">SQLite SELECT</a>, <a href=\"https://www.sqlite.org/lang_aggfunc.html\">SQLite aggregates</a> and <a href=\"https://senior-secondary.scsa.wa.edu.au/__data/assets/pdf_file/0013/1211323/_Computer-Science-ATAR-Year-12-Syllabus-for-teaching-from-January-2026.PDF\">2026 SCSA Year 12 data management</a>. Original classroom draft; independent review and learner evidence remain pending.</p>"
    ]
  ],
  "practice": [
    [
      "GRAIN",
      "Why does summing capacity after a booking join overcount?",
      "A session appears once per booking. Sum at session grain, not booking grain. DISTINCT capacity is not a general fix."
    ],
    [
      "ZERO",
      "Why count b.MemberID rather than * after the session LEFT JOIN?",
      "The unmatched session still has one placeholder row, but its booking key is NULL; COUNT(column) excludes that NULL."
    ],
    [
      "PAIR",
      "Can Attendance join on MemberID alone?",
      "No. A member can book multiple sessions; both parts of the composite key must match."
    ],
    [
      "NULL",
      "Does NULL attendance mean a recorded absence?",
      "No. This scenario uses NULL for a missing attendance record and 0 for a recorded absence."
    ],
    [
      "FILTER",
      "Which clause filters groups based on an aggregate count?",
      "HAVING; WHERE filters input rows before aggregation."
    ]
  ],
  "task": "Predict and run the ten reports, implement independent transfer queries, repair missing-key/COUNT*/SUM errors and test changed data. Record report grain, expected rows, actual results and a limited conclusion for each.",
  "solution": "Use the answer guide: Q1 and Q6 each have three rows; Q3 excludes S03, while Q4 includes it with a count of 0. Q5 gives fill percentages of 100, 33.3 and 0. Composite attendance joins produce 1, 0 and NULL. W01 capacity at session grain is 5, rather than the incorrect booking-join total of 7. Validate changes with independently predicted data.",
  "recap": "A reliable query follows keys, declares its grain and treats zero, NULL and duplicate-looking labels carefully. Test changed data to expose reports that only happen to work on the sample.",
  "lessons": [
    "Week 2 lesson 1: retrieve schema/keys and predict four-table joins.",
    "Week 2 lesson 2: implement joins/aliases and diagnose missing conditions.",
    "Week 2 lesson 3: aggregate at session/booking grain; grouped inner reports.",
    "Week 2 lesson 4: zero-booking LEFT JOIN/count clinic and feedback.",
    "Week 3 lesson 1: calculated percentages, concatenated labels and aliases.",
    "Week 3 lesson 2: composite attendance joins, NULL and row/group filtering.",
    "Week 3 lesson 3: repair multiplied totals and independently test changed data.",
    "Week 3 lesson 4: fresh report transfer, expected/actual evidence and feedback. Eight lessons across two weeks; no additional project."
  ],
  "reference": "https://www.sqlite.org/lang_select.html",
  "refTitle": "SQLite SELECT: joins, grouping and result semantics",
  "quiz": {
    "q": "How should a report count bookings for an unbooked session preserved by LEFT JOIN?",
    "options": [
      "COUNT(*) so the placeholder row counts as a booking.",
      "COUNT(b.MemberID) so NULL booking keys are excluded.",
      "SUM(DISTINCT s.Capacity) to count its places."
    ],
    "answer": 1,
    "explanation": "The preserved row has a NULL booking key. COUNT(column) excludes NULL; COUNT(*) counts the row."
  },
  "next": "#plan-4-2"
});

chapters.push({
  "id": "unit4-project",
  "unit": 4,
  "week": "4–10",
  "title": "Database development and evaluation",
  "badge": "DATABASE / PROJECT",
  "intro": "Build and test a six-table workshop system with controlled changes, atomic operations and requirement-linked recovery evidence.",
  "objectives": [
    "Implement a scoped six-table database and required reports.",
    "Clean/import data with documented decisions and rollback.",
    "Use transactions and parameters while distinguishing application rules from constraints.",
    "Test, recover and evaluate against measurable requirements."
  ],
  "sections": [
    [
      "Keep the project inside its workshop budget",
      "<p>Develop the fictional workshop-booking system introduced earlier. Core scope: six tables, a DBMS or console interaction, reports, controlled booking/attendance, one member import and evidence of testing/recovery. A GUI is not required. Exclude login, payments, real personal records, multi-site deployment and a production retention system.</p><p>Week 4 supplies four explicit development lessons. Week 5 has four project workshops, weeks 6–9 two each, and week 10 four: sixteen project lessons already embedded in the outline. The other two lessons each week 6–9 remain explicit security teaching. No essential core work depends on extensive homework.</p>"
    ],
    [
      "Investigate and design measurable requirements",
      "<table><tr><th>ID</th><th>Required outcome</th><th>Evidence</th></tr><tr><td>R1</td><td>Create six related tables and reconcile diagram/dictionary/schema</td><td>Keys/references/domain checks and actual six-table inspection</td></tr><tr><td>R2</td><td>Provide required read-only reports</td><td>Four-table join, grouped count and calculated/concatenated output</td></tr><tr><td>R3</td><td>Book known member/session once, without exceeding capacity</td><td>Normal/last-place/full/duplicate/unknown/date tests; rejection unchanged</td></tr><tr><td>R4</td><td>Record or update attendance only for booked pair</td><td>Joint-key reference; 0/1 validation; unrecorded distinct from absence</td></tr><tr><td>R5</td><td>Clean and import a synthetic member batch atomically</td><td>Mapping/normalisation log; invalid/duplicate batch leaves all rows unchanged</td></tr><tr><td>R6</td><td>Demonstrate controlled schema/data changes</td><td>CREATE/ALTER/INSERT/UPDATE/DELETE/cascade/DROP lab; safe transaction boundary</td></tr><tr><td>R7</td><td>Demonstrate recovery and evaluate fitness</td><td>Known-good copy, integrity/reference checks, content/report comparison, limitations</td></tr></table><p>Confirm the rule: one booking per member/session; capacity counts every retained Booking row. The classroom reference validates booking date not after session date. These rules do not model cancellation history, waitlists or session-time clashes. A direct SQL insert can bypass the application’s cross-row capacity check; database enforcement beyond the stated constraints is outside this prototype.</p><p>Use the six-table diagram/17-field dictionary, then update them when implementing a justified schema change. Explain primary/composite keys, joint foreign references, normalisation dependencies and any rule enforced only in code.</p>"
    ],
    [
      "Make controlled changes and verify effects",
      "<pre><code>-- Run only in a fresh disposable copy of the design database.\n-- Predict each operation; this lab ends with ROLLBACK, preserving starting data/schema.\nBEGIN;\nCREATE TABLE ScratchNote (NoteID INTEGER PRIMARY KEY, NoteText TEXT NOT NULL);\nINSERT INTO ScratchNote VALUES (1,&#x27;temporary lab&#x27;);\nALTER TABLE Member ADD COLUMN Notes TEXT;\nUPDATE Member SET Notes=&#x27;reviewed synthetic record&#x27; WHERE MemberID=&#x27;M03&#x27;;\nSELECT MemberID,Notes FROM Member ORDER BY MemberID;\nDELETE FROM Booking WHERE MemberID=&#x27;M01&#x27; AND SessionID=&#x27;S01&#x27;;\nSELECT * FROM Attendance ORDER BY SessionID,MemberID;\nDROP TABLE ScratchNote;\nROLLBACK;\n-- Member has no Notes column again; original booking/attendance remain.\n</code></pre><p>CREATE defines a table; ALTER TABLE changes supported schema features; INSERT/UPDATE/DELETE change rows; DROP removes a table. MODIFY is not a SQLite table-alteration command. SQLite supports a defined set of ALTER operations; more complex changes may need a careful table-rebuild procedure. Read current documentation rather than assuming another DBMS’s syntax.</p><p>The scoped DELETE uses both booking keys; its attendance is removed by the declared cascade. ROLLBACK restores this lab’s original rows/schema. Do not drop or reset the project database to “fix” a query. Real history deletion requires a separately agreed retention/authorisation policy.</p>"
    ],
    [
      "Clean an import without inventing data",
      "<p>The raw synthetic CSV contains surrounding spaces, lowercase ID and a blank name. Agree the mapping first: trim and uppercase M plus two digits; trim names; require 1–60 characters; reject duplicates and existing IDs. Preserve raw input and record each correction/rejection. A malformed row rejects the whole batch rather than silently losing records.</p><p>The reference validates all rows before beginning insertion, then inserts the batch in one transaction using bound parameters. A later database failure rolls back earlier inserts. The corrected CSV has three valid new records. Normalisation is not proof of authenticity or accuracy; currency, relevance and outliers still require source/context judgement.</p>"
    ],
    [
      "Use transactions to protect a booking",
      "<p>Atomicity means the logical change commits wholly or is undone. Consistency means declared constraints and application rules are preserved. Isolation manages interacting transactions. Durability concerns committed changes surviving under the configured storage guarantees; an in-memory demo cannot demonstrate survival after process exit.</p><pre><code>BEGIN IMMEDIATE;\n-- Check known member/session, duplicate pair and current booking count.\n-- If count &lt; capacity, INSERT using parameters.\nCOMMIT;\n-- On rejection/error, ROLLBACK the entire operation.</code></pre><p>In SQLite, BEGIN IMMEDIATE obtains the write transaction before the check, preventing another writer from changing the count between this check and insert. Busy/locking failures still need a defined user response. The reference assumes no active caller transaction and explicitly controls commit/rollback. An SQL statement error does not universally undo every earlier statement in a transaction; handle the operation boundary.</p><p>Parameter binding keeps data separate from SQL structure; it does not validate dates, capacity or permissions. The reference uses ISO calendar parsing and checks the existing session date. Python sqlite3 is a DB-API interface to SQLite, not an ODBC driver. ODBC provides a standard driver-based interface for applications to DBMSs; later integration choices should identify the actual connection method.</p>"
    ],
    [
      "Test workflows, failures and reports",
      "<p>Start with fresh fixtures. S01, with capacity 2, already has two bookings; M03/S01 must reject. M03/S02 can succeed once because S02, with capacity 3, initially has one. Repeat the pair, try unknown IDs and a late/invalid date, and compare full state before/after rejection.</p><p>Test attendance insert/update for the actual pair, invalid Boolean values and an unbooked pair. For import, test malformed/duplicate-normalised/existing IDs and prove rollback after a later insert fails. Repeat the advanced SQL reports after valid changes and predict the new rows/counts. A passing component assertion is not an observed user acceptance workflow.</p>"
    ],
    [
      "Preserve a known-good version and prove recovery",
      "<p>Keep source/schema versions, a test record and a separate recoverable database copy. SQLite’s backup API can make a consistent copy from an open database. Copying only one file from an active WAL database can miss state; use an appropriate backup method or a controlled closed-database workflow.</p><p>The supplied demo backs up to another in-memory connection, checks integrity/foreign references and compares table contents. This verifies copy semantics, not disk backup placement, survival after exit or a real restore. In the learner project, save a known-good DBMS database, restore into a separate disposable destination, reopen it and compare required reports and key counts. Keep current work and record actual evidence.</p>"
    ],
    [
      "Use the sixteen project workshops",
      "<table><tr><th>Workshop</th><th>Milestone</th></tr><tr><td>5.1–5.2</td><td>Investigate requirements and acceptance tests</td></tr><tr><td>5.3–5.4</td><td>Model/dictionary/schema/schedule checkpoint</td></tr><tr><td>6.3–6.4</td><td>Create six-table database; integrity tests</td></tr><tr><td>7.3–7.4</td><td>Reports and safe changes</td></tr><tr><td>8.3–8.4</td><td>Atomic booking and attendance</td></tr><tr><td>9.3–9.4</td><td>Import/rollback and recovery tests</td></tr><tr><td>10.1–10.2</td><td>Acceptance, repair and regression</td></tr><tr><td>10.3–10.4</td><td>Demonstrate, authenticate and evaluate</td></tr></table><p>Submit requirements/design, SQL/source, cleaned/raw data decisions, expected/actual tests, versions, recovery evidence and evaluation against R1–R7. Explain one failed attempt and repair. The original 40-mark rubric is a teacher draft; assessment weighting and conditions must match the school’s adopted outline.</p>"
    ],
    [
      "Run the prototype and evaluate its limits",
      "<pre><code>python unit4-project-reference.py</code></pre><p>The default teacher demo is entirely in memory and changes no existing files. It demonstrates successful/rejected booking, attendance, clean import and content-equivalent backup. Student scaffold functions are deliberately unfinished. Learners can use their DBMS or a console interface to meet the requirements; the teacher reference is not the only valid solution.</p><p><a class=\"button\" href=\"unit4-project-pack.zip\" download>Download project pack</a> · <a href=\"unit4-project-brief.md\" download>Student brief</a> · <a href=\"unit4-project-workbook.md\" download>Evidence workbook</a> · <a href=\"unit4-project-teacher.md\" download>Teacher rubric/reference notes</a>. Teacher files are separate, not access-protected.</p><p>Evaluate each requirement as met/partly/not met with evidence. No claim of full Unit4 coverage, production security, ODBC operation or persistent recovery follows from the demo. Sources: <a href=\"https://www.sqlite.org/lang_transaction.html\">SQLite transactions</a>, <a href=\"https://www.sqlite.org/lang_altertable.html\">ALTER TABLE</a>, <a href=\"https://docs.python.org/3/library/sqlite3.html\">Python sqlite3 and backup</a>, and <a href=\"https://senior-secondary.scsa.wa.edu.au/__data/assets/pdf_file/0013/1211323/_Computer-Science-ATAR-Year-12-Syllabus-for-teaching-from-January-2026.PDF\">2026 SCSA Year 12 syllabus</a>.</p>"
    ]
  ],
  "practice": [
    [
      "ATOMIC",
      "Does one failed INSERT automatically undo every earlier INSERT in a transaction?",
      "Not universally. Explicitly rollback the logical operation on failure; use the documented transaction boundary."
    ],
    [
      "CAPACITY",
      "Why begin the write transaction before checking booking count?",
      "It protects the check-and-insert sequence from another writer changing the count in between; locking/busy errors still need handling."
    ],
    [
      "IMPORT",
      "Why preserve raw CSV and reject an invalid batch?",
      "It preserves provenance and makes corrections/rejections reviewable; the defined all-or-none import avoids partial unexplained changes."
    ],
    [
      "RECOVERY",
      "Does an in-memory backup prove recovery after disk loss?",
      "No. It checks copy content; independent saved-copy placement and a reopened restore need separate evidence."
    ],
    [
      "CONNECT",
      "Is Python sqlite3 itself an ODBC driver?",
      "No. It is a DB-API SQLite interface; ODBC uses a separate standard driver-based connection approach."
    ]
  ],
  "task": "Implement R1–R7 in the sixteen embedded project workshops after week 4 foundations. Provide six-table design/schema, reports, atomic booking/attendance/import, expected/actual tests, a saved/reopened restore and an evidence-based evaluation.",
  "solution": "Use the separate reference as one design. The request to book the full session S01 is rejected without changing the data; M03/S02 succeeds once. Validate the member/session pair, dates and 0-or-1 fields; bind data parameters; roll back rejected operations and failed imports. Demonstrate database recovery independently of the in-memory demo and cite remaining limits.",
  "recap": "A database project is a tested workflow: design aligns with implementation, changes have controlled boundaries, imports preserve meaning and recovery is demonstrated rather than assumed.",
  "lessons": [
    "Week 4 lesson 1: controlled CREATE/ALTER/data changes and rollback lab.",
    "Week 4 lesson 2: source mapping/cleaning and data-quality decisions.",
    "Week 4 lesson 3: transaction/ACID and parameterised booking reasoning.",
    "Week 4 lesson 4: test design, backup/recovery and project preparation.",
    "Week 5: four investigation/design/checkpoint project workshops.",
    "Weeks 6–9: two project workshops each week; two explicit security lessons remain separate.",
    "Week 10: four acceptance/repair/demonstration/evaluation workshops.",
    "Total: four foundation lessons plus sixteen embedded project lessons; no extra weeks or project spillover."
  ],
  "reference": "https://www.sqlite.org/lang_transaction.html",
  "refTitle": "SQLite transaction boundaries and write locks",
  "quiz": {
    "q": "What should the all-or-none import do if a later insert fails?",
    "options": [
      "Keep earlier inserted rows and silently skip the failure.",
      "Roll back the batch and report the failure for correction.",
      "Disable foreign keys permanently."
    ],
    "answer": 1,
    "explanation": "The agreed import is atomic: failed insertion must not leave a partial batch. Preserve the source and report the reason."
  },
  "next": "#plan-4-3"
});

chapters.push({
  "id": "unit4-analysis",
  "unit": 4,
  "week": 6,
  "title": "Cyber security analysis",
  "badge": "CIA / AAA / EVIDENCE",
  "intro": "Explain the asset, threat and consequence, then use evidence to test your hypothesis rather than treating an alert as a verdict.",
  "objectives": [
    "Apply CIA to specific assets/consequences.",
    "Distinguish authentication, authorisation and accounting.",
    "Classify internal/external threats by mechanism and evidence.",
    "Interpret logs with alternatives, limits and justified next steps."
  ],
  "sections": [
    [
      "Start with assets, weaknesses and evidence",
      "<p>Cyber security analysis connects an asset, a possible threat, a weakness and a consequence. A threat is a potential cause of harm; a vulnerability is a weakness that could be used; risk considers likelihood and impact in context. A control changes risk but does not prove harm is impossible.</p><p>Use a fictional future deployment of the workshop system: account access, a web interface, personal records and service monitoring exist in the scenario only. The current classroom SQLite prototype has no login or web server. Do not claim that the synthetic deployment features are implemented in the project reference.</p><p>Two explicit security lessons fit week 6, alongside two separate database workshops. Retrieve the earlier threat vocabulary, then apply it to unfamiliar evidence. No live attacks, malware execution or network scanning are needed.</p>"
    ],
    [
      "Apply the CIA triad to specific consequences",
      "<table><tr><th>Goal</th><th>Workshop consequence</th><th>Evidence to seek</th></tr><tr><td>Confidentiality</td><td>Records accessed/disclosed beyond permitted purpose</td><td>Export scope, recipients, permissions and access history</td></tr><tr><td>Integrity</td><td>Attendance/booking data changed incorrectly or without authority</td><td>Before/after records, authorisation, source confirmation</td></tr><tr><td>Availability</td><td>Authorised users cannot book when needed</td><td>Service metrics, faults, demand and recovery state</td></tr></table><p>One incident can affect several goals. Ransomware can deny access and threaten disclosure; restoring a file does not settle whether a copy was taken. A valid database constraint does not establish factual accuracy or authorisation. Explain the affected goal using the actual asset and consequence, not just the acronym.</p>"
    ],
    [
      "Distinguish the AAA questions",
      "<table><tr><th>Function</th><th>Question</th><th>Limit</th></tr><tr><td>Authentication</td><td>What identity/credential is being accepted?</td><td>Accepted credentials may have been compromised</td></tr><tr><td>Authorisation</td><td>What may that identity do here?</td><td>Permission to read need not include export/delete</td></tr><tr><td>Accounting</td><td>What activity is recorded for review?</td><td>Logs need integrity/context; an account name is not proof of the human actor</td></tr></table><p>Accounting here means activity/audit records, not financial bookkeeping. Unique accounts improve attribution compared with shared accounts, but session theft or credential misuse can still confuse attribution. Preserve useful timestamps and correlation labels without logging passwords or reusable secrets.</p><p>In the sample, A01’s export is allowed and deletion denied. This demonstrates distinct action decisions, not proof that the export was appropriate. An over-broad export permission could still create confidentiality risk even when authentication succeeds.</p>"
    ],
    [
      "Classify threats without treating labels as proof",
      "<table><tr><th>Threat / category</th><th>Mechanism</th><th>Scenario clue</th></tr><tr><td>Phishing / social engineering</td><td>Deceptive communication prompts disclosure or an unsafe action</td><td>A message asks a staff member to use an unverified login link</td></tr><tr><td>DoS / DDoS</td><td>Resource exhaustion disrupts service; distributed sources can contribute</td><td>Requests overwhelm booking service; a surge alone does not prove attack</td></tr><tr><td>Back door</td><td>Access path bypasses the intended controls</td><td>Undocumented remote support account remains enabled</td></tr><tr><td>IP spoofing</td><td>Source IP information is falsified</td><td>A packet claims a trusted source; an IP label is not user authentication</td></tr><tr><td>SQL injection</td><td>Untrusted data changes the intended SQL command</td><td>Application builds query text from input instead of binding values</td></tr><tr><td>Man-in-the-middle</td><td>An intermediary intercepts or alters communication</td><td>Endpoint/connection trust is not verified; encryption alone without authentication can be insufficient</td></tr><tr><td>Cross-site scripting (XSS)</td><td>Untrusted content executes in a user browser under a site context</td><td>A web page treats submitted text as active markup/script; distinct from SQL injection</td></tr><tr><td>Virus</td><td>Malicious code attaches to a host and spreads when it is executed</td><td>An infected file is shared and run</td></tr><tr><td>Worm</td><td>Malicious code can self-propagate between systems</td><td>A vulnerable network service helps automated spread</td></tr><tr><td>Trojan horse</td><td>Malicious behaviour is disguised as legitimate software</td><td>A claimed utility contains unwanted access code</td></tr><tr><td>Spyware</td><td>Covert monitoring/collection</td><td>A device collects user activity without appropriate permission</td></tr><tr><td>Adware</td><td>Unwanted advertising/tracking behaviour</td><td>A bundled application injects adverts; not every advert is malware</td></tr><tr><td>Ransomware</td><td>Extortion can involve data encryption, theft or both</td><td>Files become unavailable and disclosure is threatened</td></tr><tr><td>Physical threats</td><td>Theft, damage or unauthorised physical access</td><td>A device is lost or a server room is accessible</td></tr><tr><td>Zero-day vulnerability</td><td>A previously unknown vulnerability can be exploited before a remedy is available; a known unpatched flaw is not automatically zero-day</td><td>Do not label a routine failure zero-day without evidence</td></tr><tr><td>Internal threats</td><td>Credential compromise, device loss or employee misuse</td><td>An authorised account exceeds its permitted purpose; insider does not mean every act is malicious</td></tr></table><p>Categories can overlap: a Trojan can deliver spyware or ransomware; stolen credentials can enable internal-looking misuse by an external actor. Classify mechanism and evidence, and keep accidental loss/mistakes separate from unsupported intent claims. Do not assume every failed login is phishing or every unusual outage is a zero-day exploit.</p><p>SQL injection changes database command interpretation; XSS runs untrusted content in browser context. Parameterised values address the former, while context-appropriate safe output/encoding is relevant to the latter. Neither control is a complete access-policy or security solution.</p>"
    ],
    [
      "Read a synthetic event sequence",
      "<p>The log timestamps are UTC, explicitly marked Z. The session labels are invented correlation labels, not usable tokens. IPs are documentation ranges. The sequence shows two denied authentications, one accepted authentication, an allowed 500-row export, a denied deletion and an attendance change under another account.</p><p>The export quantity records a server-side reported result, not proof of where a person later stored or forwarded it. Compare expected role/job purpose, device/session context and the export destination evidence. The earlier failures may be mistyped credentials or an attack attempt; the sequence alone cannot choose between them.</p><p>Monitoring shows 400 requests/minute and 2500 ms response time. The scenario baseline is 20 requests/minute and 200 ms in a comparable window. The increase supports an availability investigation; compare workload, errors, infrastructure and scheduled activity before attributing DoS/DDoS or intent. These are sample snapshots, not a statistical trend.</p>"
    ],
    [
      "Build an evidence-based incident hypothesis",
      "<table><tr><th>Step</th><th>What to record</th></tr><tr><td>Observation</td><td>Exact event, timestamp, asset and measured value</td></tr><tr><td>Hypothesis</td><td>Mechanism that could explain the observation</td></tr><tr><td>Alternative</td><td>A plausible non-malicious or different cause</td></tr><tr><td>Next evidence</td><td>A source/check that distinguishes explanations</td></tr><tr><td>Response</td><td>An authorised proportionate action and its effect</td></tr><tr><td>Residual uncertainty</td><td>What remains unknown after the action</td></tr></table><p>For the export, one hypothesis is compromised credentials; an alternative is a legitimate staff task. Seek role approval, user confirmation through an established channel, session/device context and export records. Do not contact an unverified address supplied by a suspicious message. Follow the organisation’s incident process and escalate through authorised staff.</p><p>Keep original logs and a reviewable analysis copy. Record collection time/timezone, source and who handled the evidence. Synchronised clocks, gaps, retention, tampering and shared accounts affect interpretation. Containment should preserve evidence and consider service impact; students analyse the paper case rather than take operational actions.</p>"
    ],
    [
      "Link a mitigation to its purpose and limit",
      "<p>Propose a control for the hypothesised weakness and explain which CIA/AAA issue it addresses. For credential risk, stronger authentication and account/session review may help; excessive export rights require authorisation changes too. For wrong attendance, source verification and auditable authorised corrections matter; a backup alone does not make values accurate.</p><p>A database log summariser can count events but cannot determine the human actor, malicious intent or a breach by itself. Use the offline helper to check counts after manual analysis. Compare controls and residual risks in the next chapter on security controls and responses.</p>"
    ],
    [
      "Complete the scenario analysis clinic",
      "<p><a class=\"button\" href=\"unit4-analysis-pack.zip\" download>Download analysis pack</a> · <a href=\"unit4-analysis-workbook.md\" download>Workbook</a> · <a href=\"unit4-analysis-cases.md\" download>Twelve scenario cards</a> · <a href=\"unit4-analysis-answers.md\" download>Teacher explanations</a> · <a href=\"unit4-analysis-log.csv\" download>Synthetic event log</a>. Teacher files are separate, not access-protected. The evidence worksheet stays blank; no student data is uploaded.</p><p>Sources: <a href=\"https://csrc.nist.gov/glossary/term/confidentiality_integrity_availability\">NIST CIA terminology</a>, <a href=\"https://www.cyber.gov.au/publication/best-practices-for-event-logging-and-threat-detection\">ASD event logging guidance</a>, <a href=\"https://www.cyber.gov.au/publication/cyber-security-incident-response-planning-practitioner-guidance\">ASD incident planning</a>, <a href=\"https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html\">OWASP SQL injection</a>, <a href=\"https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html\">OWASP XSS</a> and <a href=\"https://senior-secondary.scsa.wa.edu.au/__data/assets/pdf_file/0013/1211323/_Computer-Science-ATAR-Year-12-Syllabus-for-teaching-from-January-2026.PDF\">2026 SCSA Year 12 cyber security</a>. Original fictional data and explanations; independent review/learner evidence remain pending.</p>"
    ]
  ],
  "practice": [
    [
      "AUTH",
      "Does a successful login prove the rightful person used the account?",
      "No. Accepted credentials/session context can be compromised; investigate attribution without assuming identity from the account label."
    ],
    [
      "LOG",
      "Does an allowed export prove that a breach occurred?",
      "No. It shows the recorded action/result; role/purpose/recipients and disclosure evidence determine the conclusion."
    ],
    [
      "AAA",
      "Why can export be allowed while deletion is denied?",
      "Authorisation can be action-specific. Authentication acceptance does not grant every operation."
    ],
    [
      "THREAT",
      "Is a request surge alone proof of DDoS?",
      "No. It supports investigation; legitimate demand, faulty clients and infrastructure problems are alternatives."
    ],
    [
      "MECHANISM",
      "Why does SQL parameterisation not automatically prevent XSS?",
      "It separates database query data/code, while XSS concerns browser interpretation of untrusted content; context-safe output controls are distinct."
    ]
  ],
  "task": "Analyse at least three scenario cards and the full log: identify assets, CIA impacts, AAA evidence, hypotheses/alternatives, next checks and one justified mitigation with a limit. Manually count events, compare the offline summary and explain what it cannot establish.",
  "solution": "The eight-event log includes two denied authentications, one accepted authentication, one allowed export, one denied deletion, one allowed update and two monitoring observations. The export and authentication sequence warrants investigation of roles and context; it does not prove who acted or whether a breach occurred. An incorrect or unauthorised attendance change affects integrity. A surge/outage affects availability but does not prove DDoS. Keep observation, inference and next evidence separate.",
  "recap": "Security analysis explains a mechanism and consequence using evidence. CIA names goals; AAA distinguishes identity, permission and audit. Alerts and logs support hypotheses, not automatic conclusions about intent or attribution.",
  "lessons": [
    "Week 6 lesson 1: retrieve threat vocabulary, CIA/AAA worked case and mechanism classification; choose justified evidence.",
    "Week 6 lesson 2: synthetic log/case analysis, hypotheses and alternatives, manual/offline counts and explained feedback. Lessons 3–4 remain database project workshops."
  ],
  "reference": "https://www.cyber.gov.au/publication/best-practices-for-event-logging-and-threat-detection",
  "refTitle": "ASD: event logging and threat detection",
  "quiz": {
    "q": "What is the strongest conclusion from two failed logins followed by a successful login and export?",
    "options": [
      "The named account holder definitely stole the data.",
      "The sequence needs role/session/context investigation; compromise and legitimate activity are alternatives.",
      "No security issue is possible because login succeeded."
    ],
    "answer": 1,
    "explanation": "The log records events, not human identity or intent. Corroborate context and permissions before deciding what happened."
  },
  "next": "#plan-4-4"
});


chapters.push({
  "id": "unit4-controls",
  "unit": 4,
  "week": 7,
  "title": "Security controls and responses",
  "badge": "CONTROLS / TEST / RESPOND",
  "intro": "Match a control to the mechanism, test permitted and prohibited behaviour, and plan a proportionate response with evidence.",
  "objectives": [
    "Compare logs, anti-malware, firewalls, ACLs, IPS, VPN and people/physical controls.",
    "Predict ordered traffic rules and scoped role permissions.",
    "Evaluate control limits, false positives/negatives and required functionality.",
    "Plan authorised response/recovery and requirement-based acceptance tests."
  ],
  "sections": [
    [
      "Choose a control from the risk",
      "<p>Start with the asset, hypothesised weakness and consequence from the analysis chapter. Explain what a proposed control changes, where it operates and how to test it. “Install security software” does not explain whether export permissions, compromised credentials or an unavailable service are being addressed.</p><p>Preventive controls reduce an opportunity; detective controls reveal activity; corrective/recovery controls restore or improve the situation. A control may serve several purposes. Combine people, process and technology, while naming residual risk and operational cost.</p><p>This chapter uses two explicit week 7 security lessons; the other two lessons remain database project workshops. All tests here are fictional paper/offline predictions, not changes to a deployed school system.</p>"
    ],
    [
      "Compare the required control families",
      "<table><tr><th>Control</th><th>Purpose</th><th>Implementation/evidence</th><th>Limit</th></tr><tr><td>Log analysis</td><td>Detect/corroborate activity and support investigation</td><td>Protect log access/integrity, synchronise time, review context</td><td>Missing events or compromised/shared accounts weaken conclusions</td></tr><tr><td>Anti-malware</td><td>Detect/block known or suspicious malicious behaviour</td><td>Updates, managed configuration, test detection and recovery</td><td>False positives/negatives; not every new threat is recognised</td></tr><tr><td>Firewall filtering</td><td>Control traffic crossing a defined boundary</td><td>Narrow required flows, correct placement/order, positive/negative tests</td><td>Allowed traffic can still carry harmful content; bypass paths matter</td></tr><tr><td>Access control lists</td><td>Permit actions/traffic according to explicit rules</td><td>Identify subject/resource/action or network flow and default policy</td><td>Network ACL and application permissions solve different problems</td></tr><tr><td>Intrusion prevention system</td><td>Inspect traffic and block matching suspicious activity</td><td>Placed in relevant path; tune alerts/rules and test availability impact</td><td>False positives can disrupt service; encrypted/unseen traffic limits inspection</td></tr><tr><td>VPN</td><td>Protect a tunnel between authenticated endpoints</td><td>Approved tunnel/configuration and restricted authenticated access</td><td>Does not secure a compromised endpoint or grant correct application rights</td></tr><tr><td>User training</td><td>Improve recognition/reporting and safe decisions</td><td>Scenario practice, established reporting channels and feedback</td><td>Training alone cannot remove unsafe system design</td></tr><tr><td>ICT code of conduct</td><td>Set agreed user/developer responsibilities</td><td>Clear rules, review, support and proportionate enforcement</td><td>A signed document is not proof of technical enforcement</td></tr><tr><td>Physical security</td><td>Reduce theft, damage and unauthorised access</td><td>Controlled equipment access, device protection and asset procedures</td><td>Physical protection alone does not encrypt data or stop remote compromise</td></tr><tr><td>Supporting controls</td><td>Reduce exposure and improve recovery</td><td>Least privilege, stronger authentication, patching, tested protected backups</td><td>Each needs maintenance and evidence; no single checklist guarantees safety</td></tr></table><p>Match controls to the mechanism. A VPN may protect a remote tunnel, but cannot repair malicious code already running on an endpoint. A backup can support recovery but does not undo confidentiality loss. An IPS is an active blocking control; an IDS typically detects/alerts. Products can combine functions, so examine actual configuration.</p>"
    ],
    [
      "Write narrow traffic rules and inspect order",
      "<table><tr><th>Rule</th><th>Source</th><th>Destination</th><th>Protocol/port</th><th>Action</th></tr><tr><td>R1</td><td>Visitors</td><td>Internet</td><td>TCP/443</td><td>allow</td></tr><tr><td>R2</td><td>Staff</td><td>App</td><td>TCP/443</td><td>allow</td></tr><tr><td>R3</td><td>Staff</td><td>Printer</td><td>TCP/631</td><td>allow</td></tr><tr><td>R4</td><td>Visitors</td><td>Internal</td><td>any/any</td><td>deny</td></tr></table><p>Our offline model evaluates the first matching rule and denies unlisted new initiation. A broad Visitor-to-any allow placed before R4 makes that deny ineffective. Rule order and actual traffic path matter; identify shadowed rules rather than trusting labels.</p><p>The web examples deliberately model TCP port 443. HTTP/3 can need UDP port 443; this model denies it unless a rule is added. A port number does not establish application identity or encryption. Real policy also needs DNS/DHCP, established return traffic, IPv4/IPv6 and relevant bypass-path treatment. These are outside this small model, not automatically denied or solved by it.</p>"
    ],
    [
      "Separate identity, role and resource scope",
      "<table><tr><th>Role</th><th>Action</th><th>Scope</th></tr><tr><td>Guest</td><td>view</td><td>public</td></tr><tr><td>Learner</td><td>view</td><td>own</td></tr><tr><td>Facilitator</td><td>view</td><td>assigned</td></tr><tr><td>Facilitator</td><td>update_attendance</td><td>assigned</td></tr><tr><td>Registrar</td><td>view</td><td>all</td></tr><tr><td>Registrar</td><td>export</td><td>all</td></tr></table><p>Network reachability to an application does not grant permission to export its data. The matrix assumes the role and resource scope were established by trusted authentication/authorisation logic. A Learner may view own bookings; a Facilitator may update attendance for assigned sessions; a Registrar may export under the agreed all-record scope. Unlisted tuples are denied in the model.</p><p>Strings such as “own” and “assigned” are not a real ownership check. In an application, derive them from authenticated identity, server-side assignments and the requested record; do not accept the user’s asserted role/scope. Recheck authorisation for the operation and preserve an appropriate audit trail. The classroom SQLite project does not implement this login/role system.</p>"
    ],
    [
      "Evaluate detection and operational impact",
      "<p>Compare expected alerts/denials with observed evidence. A blocked event does not prove all malicious traffic was stopped, and an alert is not proof of compromise. Log correlation, integrity, timing and source context remain necessary. Define who reviews alerts and how relevant evidence is preserved.</p><p>False positives can block legitimate traffic; false negatives can miss harm. Measure the policy against both permitted and prohibited scenarios. IPS tuning should consider service disruption and visibility; broad exceptions introduced to fix one problem may reopen the original exposure.</p><p>For the previous export case, stronger authentication alone does not fix excessive export privileges. Choose role restriction and monitoring alongside appropriate authentication, then test legitimate export workflow and denied learner export. Protect necessary functionality as well as data.</p>"
    ],
    [
      "Plan an authorised incident response",
      "<p>Use the organisation’s response process: establish facts and scope, escalate through authorised contacts, preserve evidence, contain proportionately, remediate the cause, recover and verify, then review lessons. These stages can overlap; do not treat a diagram as a universal sequence independent of the situation.</p><p>For suspected ransomware, a response plan may isolate affected assets, preserve evidence, identify safe recovery points and restore only after the cause is addressed. A successful restore does not establish that disclosure never occurred. For suspected credential misuse, review/revoke affected sessions and access through authorised administrators, investigate activity and improve the control gap.</p><p>Students record decisions for the fictional case; they do not disable accounts, isolate equipment or delete evidence. Legal notification duties and ethical testing scope will be addressed in the responsibilities chapter rather than inferred from an alert.</p>"
    ],
    [
      "Write acceptance tests and residual risks",
      "<p>Use a table with scenario, expected result, evidence source, actual result, limitation and next action. Include Visitor internet allowed, Visitor internal denied, Staff app/printing allowed, Learner all-export denied and Facilitator assigned-attendance allowed. Test the early broad allow separately and explain the change.</p><p>Compare two proposals: blanket blocking can protect a boundary while making required work unavailable; narrow required-service rules with verified roles can preserve the workflow but need accurate configuration and ongoing review. Justify the choice using CIA/AAA goals, evidence and service needs.</p><p>Use the model after manual prediction. It sends no traffic and changes no firewall, account or file permissions. Passing the model establishes consistency with its simplified rules, not production enforcement, threat detection or account attribution.</p>"
    ],
    [
      "Complete the control-and-response clinic",
      "<p><a class=\"button\" href=\"unit4-controls-pack.zip\" download>Download control and response pack</a> · <a href=\"unit4-controls-workbook.md\" download>Workbook</a> · <a href=\"unit4-controls-answers.md\" download>Teacher checkpoints</a> · <a href=\"unit4-controls-model.py\" download>Offline rule model</a>. Includes traffic rules, role matrix, response cards and a blank test/evidence record. Teacher files are separate, not access-protected.</p><p>Sources: <a href=\"https://www.cyber.gov.au/ism/2026-09/guidelines-for-networking\">ASD networking guidance</a>, <a href=\"https://www.cyber.gov.au/publication/best-practices-for-event-logging-and-threat-detection\">ASD logging</a>, <a href=\"https://www.cyber.gov.au/publication/cyber-security-incident-response-planning-practitioner-guidance\">ASD incident planning</a> and <a href=\"https://senior-secondary.scsa.wa.edu.au/__data/assets/pdf_file/0013/1211323/_Computer-Science-ATAR-Year-12-Syllabus-for-teaching-from-January-2026.PDF\">2026 SCSA Year 12 security solutions</a>. Original classroom examples; independent review/learner evidence remain pending. Next: certificates, cryptography and secure communication in week 8.</p>"
    ]
  ],
  "practice": [
    [
      "ORDER",
      "Why does an early Visitor-to-any allow defeat a later internal deny in this model?",
      "The first matching rule decides. The broad allow matches before the deny is reached."
    ],
    [
      "SCOPE",
      "Does an allowed TCP port 443 flow mean the user may export all records?",
      "No. Network access and application operation/resource permission are distinct."
    ],
    [
      "VPN",
      "Does a VPN make an already compromised endpoint safe?",
      "No. It protects the configured tunnel; endpoint integrity and access rights need other controls."
    ],
    [
      "RECOVERY",
      "Does restoring a clean database prove no records were disclosed?",
      "No. Recovery addresses availability/integrity evidence; disclosure needs separate investigation."
    ],
    [
      "TEST",
      "Why test legitimate traffic as well as blocked traffic?",
      "A control that blocks required work may fail availability/functionality needs; positive and negative cases both matter."
    ]
  ],
  "task": "Compare controls for three supplied response cases, predict the ordered rules and role matrix, test a broad early allow and record acceptance evidence/limits. Produce a justified response plan with residual risks and two competing control options.",
  "solution": "The default model allows only the three listed traffic flows and denies unlisted initiation. An early broad Visitor allow defeats the internal restriction. Role grants are exact simplified tuples, not verified identities. Use matching controls, preserve evidence and verify authorised recovery; model results alone do not prove real deployment.",
  "recap": "A control is effective only for its stated purpose, placement and configuration. Test the intended workflow and the restriction, explain limits and preserve evidence when responding.",
  "lessons": [
    "Week 7 lesson 1: control purpose/limits, ordered traffic rules and scoped role permissions; manual/offline predictions.",
    "Week 7 lesson 2: response scenarios, positive/negative acceptance tests, competing proposals and explained feedback. Lessons 3–4 remain database project workshops."
  ],
  "reference": "https://www.cyber.gov.au/ism/2026-09/guidelines-for-networking",
  "refTitle": "ASD networking: controlled communication and security boundaries",
  "quiz": {
    "q": "What best tests a control intended to protect internal systems while allowing guest web access?",
    "options": [
      "Test only that every guest request is blocked.",
      "Test required guest access and prohibited internal access, then examine policy placement and limits.",
      "Assume another VLAN guarantees the restriction."
    ],
    "answer": 1,
    "explanation": "Positive and negative tests show whether the policy preserves required functionality and enforces its restriction at the actual boundary."
  },
  "next": "#plan-4-5"
});

chapters.push({
  "id": "unit4-crypto",
  "unit": 4,
  "week": 8,
  "title": "Secure communication and cryptography",
  "badge": "KEYS / TRUST / TLS",
  "intro": "Explain what encryption, signatures and certificates protect, then trace how an authenticated connection uses those mechanisms together.",
  "objectives": [
    "Compare historical ciphers and modern symmetric/public-key roles.",
    "Distinguish encryption, hashes, signatures and key agreement.",
    "Explain certificate trust and a simplified TLS 1.3 connection.",
    "Evaluate tunnel, endpoint and key-management limits using evidence."
  ],
  "sections": [
    [
      "Identify the protection needed",
      "<p>A fictional future booking website sends student records over a network. An observer must not read the records; an alteration should be detected; the client needs evidence it reached the intended server. These are confidentiality, integrity and authentication requirements. Encryption in transit does not fix excessive export privileges, compromised endpoints or missing backups. The classroom SQLite project is not this deployed website.</p><p>Use two explicit security lessons in Week 8. Lessons 3–4 remain database project workshops. Predict before running the offline Python activity; no school traffic or certificates are inspected.</p>"
    ],
    [
      "From historical ciphers to modern algorithms",
      "<table><tr><th>Example</th><th>Mechanism / role</th><th>Limit or distinction</th></tr><tr><td>Caesar / substitution</td><td>Replace letters using a fixed mapping</td><td>Caesar has only 26 shifts; patterns and language reveal likely plaintext.</td></tr><tr><td>Vigenère</td><td>Repeated keyword selects different alphabet shifts</td><td>Historical polyalphabetic substitution; repeated-key patterns permit analysis.</td></tr><tr><td>Enigma</td><td>Rotor-based changing substitution</td><td>Historical machine; operational choices and cryptanalysis mattered. Not modern secure encryption.</td></tr><tr><td>DES</td><td>Symmetric block cipher with a 56-bit effective key</td><td>Historically important; inadequate for modern protection.</td></tr><tr><td>AES</td><td>Symmetric block cipher; 128, 192 or 256-bit keys</td><td>Security also depends on mode, nonce handling, key management and implementation.</td></tr><tr><td>RSA / elliptic-curve techniques</td><td>Public-key techniques for specified encryption, signatures or agreement</td><td>Roles depend on algorithm and protocol. Not every public-key algorithm encrypts data.</td></tr></table><p>A larger key space makes exhaustive search harder, but a long key does not repair a broken algorithm or unsafe implementation. Distinguish historical syllabus examples from approved contemporary deployment choices. Follow maintained organisational guidance and libraries for real systems.</p>"
    ],
    [
      "Keep key roles separate",
      "<table><tr><th>Operation</th><th>Key roles</th><th>What it establishes</th></tr><tr><td>Symmetric encryption</td><td>Sender and recipient use shared secret key material</td><td>Efficient bulk confidentiality; authenticated encryption also detects alteration.</td></tr><tr><td>Public-key encryption</td><td>Encrypt for recipient using recipient public key; recipient decrypts with private key</td><td>Confidentiality to the intended private-key holder when the scheme is correctly used.</td></tr><tr><td>Digital signature</td><td>Signer signs using private key; others verify using corresponding public key</td><td>Integrity and evidence linked to the signing key; identity depends on trusted key binding.</td></tr><tr><td>Key agreement</td><td>Participants exchange public contributions and independently derive secret material</td><td>The shared secret is not transmitted directly; authentication is needed to prevent impersonation.</td></tr></table><p>A signature is not “encrypting the message with the private key”. A public key can be distributed; a private key must be protected. Separate account authentication from possession of a server signing key. Hybrid systems combine public-key authentication/agreement with fast symmetric protection of application data.</p>"
    ],
    [
      "Hashes are not encryption",
      "<p>A cryptographic hash maps bytes to a fixed-size digest. It has no decryption key and does not hide a guessable message. Comparing a file with a digest obtained through a trusted route can reveal a change. If an attacker replaces both file and unauthenticated digest, equality does not establish authenticity. Digital signatures and keyed authentication supply different assurances.</p><p>The SHA-256 activity fingerprints UTF-8 text, including spaces and case. Equal digests in this exercise show equal computed fingerprints; hash collisions are possible in principle. A plain fast hash is not an appropriate password-storage scheme: real password handling needs a maintained, purpose-designed salted password-hashing implementation.</p>"
    ],
    [
      "Explain certificates and trust",
      "<p>A certificate binds a public key to named information under an issuer’s digital signature. It contains public material, not the server private key. The client needs a trusted chain, acceptable validity period, intended hostname and permitted use, plus the relevant implementation’s revocation/status handling. Server handshake signatures demonstrate possession of the corresponding private key.</p><p>Our fictional cards supply checking facts, rather than computing signatures or building chains. A matching name and date alone are insufficient. A valid certificate does not certify that a business is honest, content is safe, or a logged-in user may export student records. Certificate warnings require the approved support process; do not teach students to bypass them.</p>"
    ],
    [
      "Trace a simplified TLS 1.3 connection",
      "<p>For a normal certificate-authenticated connection using ephemeral key agreement: the client proposes supported parameters and a key share; the server selects parameters and provides its share. Both derive handshake secrets. The server then sends protected certificate/authentication messages; the client checks them and the handshake finishes. Derived symmetric traffic keys protect application records using authenticated encryption.</p><table><tr><th>Stage</th><th>Evidence / protection</th><th>Common misconception</th></tr><tr><td>Hello / key shares</td><td>Public contributions; derived secrets are not sent directly</td><td>A server public key is not the session secret.</td></tr><tr><td>Certificate / handshake signature</td><td>Trusted name/key binding and possession of server private key</td><td>The certificate does not contain that private key.</td></tr><tr><td>Finished / application records</td><td>Handshake confirmation and symmetric authenticated encryption</td><td>Port 443 alone does not prove any of these checks occurred.</td></tr></table><p>This is a simplified flow, omitting resumption, optional client certificates and early data. TLS 1.3 does not use RSA key transport: do not describe it as encrypting a session key with the server RSA public key. RSA signatures can have a different role. HTTPS protects the configured connection; endpoint security and application authorisation still matter.</p>"
    ],
    [
      "Apply the idea to a VPN and stored records",
      "<p>A VPN protects traffic inside its configured tunnel between authenticated endpoints. Traffic outside that tunnel and traffic after its endpoint need their own analysis. HTTPS may still protect an application connection across several network segments. Neither makes an infected device safe.</p><p>Encryption at rest and encryption in transit address different exposure paths. Identify where data is decrypted, who controls keys, and what a stolen unlocked device or authorised export can reveal. Protect private/secret keys with restricted access and appropriate lifecycle procedures; plan approved rotation, revocation and recovery. Never place real private keys or student data in the activity pack.</p>"
    ],
    [
      "Complete the cryptography clinic",
      "<p><a class=\"button\" href=\"unit4-crypto-pack.zip\" download>Download cryptography lesson pack</a> · <a href=\"unit4-crypto-workbook.md\" download>Workbook</a> · <a href=\"unit4-crypto-answers.md\" download>Teacher checkpoints</a> · <a href=\"unit4-crypto-model.py\" download>Python activity</a>. Includes fictional certificate cards, TLS ordering cards and a blank evidence record. Teacher answers are separate but not access-protected.</p><p>Technical references: <a href=\"https://www.rfc-editor.org/rfc/rfc8446.html\">IETF TLS 1.3</a>, <a href=\"https://www.rfc-editor.org/rfc/rfc5280.html\">IETF certificate framework</a>, and <a href=\"https://www.cyber.gov.au/ism/2026-09/guidelines-for-cryptography\">ASD cryptography guidance</a>. Original examples for teacher review; next is ethical and legal considerations in Week 9.</p>"
    ]
  ],
  "practice": [
    [
      "KEY",
      "Which key verifies a digital signature?",
      "The corresponding public key. Trust in the signer’s identity also depends on an authentic binding to that key."
    ],
    [
      "HASH",
      "Can an untrusted digest beside a download establish its author?",
      "No. An attacker could replace both; trusted distribution or an authenticated signature is needed."
    ],
    [
      "TLS",
      "Does TLS 1.3 encrypt a transported session key with RSA?",
      "No. This chapter’s ephemeral agreement flow derives secret material; RSA signatures have a different role."
    ],
    [
      "TRUST",
      "Does a matching certificate hostname establish a user’s export permission?",
      "No. Certificate authentication and application authorisation are different checks."
    ],
    [
      "LIMIT",
      "What remains exposed if the endpoint is infected?",
      "Plaintext and keys may be available at the endpoint even when the network connection is protected."
    ]
  ],
  "task": "Predict and reverse the Caesar message, inspect all 26 shifts, compare fingerprints after edits, classify six fictional certificate cards and order the simplified TLS flow. Explain the remaining risks for a booking export over HTTPS.",
  "solution": "Shift 3 produces Phhw dw 3, Urrp E!; reversing restores the original. Enumerating 26 shifts shows why Caesar is weak. An edited digest changes in the supplied examples but does not authenticate an author. Only card C1 passes all supplied simplified facts; that is not a real certificate validation. TLS protects the connection, while endpoint compromise and excessive export rights remain separate.",
  "recap": "Use the right mechanism for the requirement: encryption protects confidentiality, authenticated mechanisms detect alteration, and trusted key binding supports identity. Keys, configuration and endpoints determine practical limits.",
  "lessons": [
    "Week 8 lesson 1: historical ciphers, key roles and fingerprints; predict/run/explain the offline Python activity.",
    "Week 8 lesson 2: certificate cards, TLS ordering and connection-risk explanation. Lessons 3–4 remain database project workshops."
  ],
  "reference": "https://www.rfc-editor.org/rfc/rfc8446.html",
  "refTitle": "IETF: TLS 1.3 protocol",
  "quiz": {
    "q": "Which explanation best describes this TLS 1.3 teaching flow?",
    "options": [
      "The certificate sends the server private key to the client.",
      "Authenticated ephemeral agreement derives secrets; symmetric authenticated encryption protects records.",
      "A matching hostname grants permission to export all records."
    ],
    "answer": 1,
    "explanation": "Key agreement, server authentication and record protection have distinct roles. Application permissions require their own checks."
  },
  "next": "#plan-4-6"
});

chapters.push({
  "id": "unit4-ethics",
  "unit": 4,
  "week": 9,
  "title": "Ethical and legal considerations",
  "badge": "PRIVACY / PURPOSE / PERMISSION",
  "intro": "Apply privacy principles to a supplied case, justify responsible data use, and explain how authorised testing improves security.",
  "objectives": [
    "Apply APP 5, 8, 10, 11 and 12 with explicit entity and jurisdiction assumptions.",
    "Distinguish a suspected incident, an eligible federal breach and WA commencement dates.",
    "Evaluate collection, data quality, mining, access, retention and source acknowledgement.",
    "Compare red and blue team roles and define an authorised testing scope."
  ],
  "sections": [
    [
      "Separate ethics, law and policy",
      "<p>A booking developer can collect a field, but should they? A system may permit an export, but is that use authorised and fair? Ethical reasoning examines people, purpose, harm, fairness and accountability. Law supplies applicable obligations; organisational policy sets operational expectations. One action can involve all three, and technical capability establishes none of them by itself.</p><p>For a case response: identify facts and missing facts → name stakeholders and likely consequences → establish jurisdiction, entity and date → connect the relevant principle to evidence → compare options → justify an action and remaining uncertainty. Avoid declaring a legal breach from an incomplete alert or assuming a good intention creates permission.</p>"
    ],
    [
      "Identify whose privacy rules apply",
      "<p>The course teaches the Privacy Act 1988 and Australian Privacy Principles (APPs). Federal coverage depends on the entity and circumstances: it generally covers Commonwealth agencies and covered organisations, while state public schools are generally outside it. Private educational institutions may be covered. Our federal case cards explicitly assume an APP entity; this assumption must not be silently transferred to a WA public school. <a href=\"https://www.oaic.gov.au/privacy/your-privacy-rights/more-privacy-rights/government-agencies\">OAIC coverage guidance</a>.</p><p>WA context, checked 14 October 2026: most substantive privacy obligations under the Privacy and Responsible Information Sharing Act 2024 commenced on 1 July 2026. Its notifiable information breach obligations commence on 1 January 2027. WA Information Privacy Principles are a distinct state framework, not the federal APPs under a new name. Check the relevant entity, provisions, commencement and approved school process. <a href=\"https://www.wa.gov.au/government/privacy-and-responsible-information-sharing\">WA Government timeline and coverage</a>.</p>"
    ],
    [
      "Apply the five prescribed APPs",
      "<table><tr><th>Principle</th><th>Classroom summary</th><th>Evidence in the fictional booking system</th></tr><tr><td>APP 5: collection notification</td><td>Explain relevant collection facts at or before collection, or as soon as practicable afterwards.</td><td>Review the booking collection notice, including purposes and usual disclosures.</td></tr><tr><td>APP 8: overseas disclosure</td><td>Take reasonable steps concerning overseas recipients; exceptions and accountability need examination.</td><td>Check recipient, actual disclosure, safeguards and applicable exceptions before choosing a cloud service.</td></tr><tr><td>APP 10: information quality</td><td>Take reasonable steps for accuracy, currency and completeness; relevance also matters for use/disclosure.</td><td>Verify the attendance source and timestamp before acting on a report.</td></tr><tr><td>APP 11: information security</td><td>Protect held personal information and manage justified retention.</td><td>Test permissions, backups and appropriate disposal; encryption alone is insufficient.</td></tr><tr><td>APP 12: individual access</td><td>Provide requested access subject to applicable exceptions and procedures.</td><td>Use a verified access-request process, protecting other people’s information.</td></tr></table><p>These summaries are entry points, not the entire principles or every exception. Several APPs can apply to one event. APP 5 is notification, not a universal rule that every collection needs consent; APP 8 is not a blanket prohibition on overseas services. APP 12 concerns access; correction is addressed separately by APP 13. Read the <a href=\"https://www.oaic.gov.au/privacy/australian-privacy-principles/read-the-australian-privacy-principles\">OAIC principle text</a> when explaining a supplied case.</p>"
    ],
    [
      "Turn APP 11 into design evidence",
      "<p>For a covered entity, APP 11 requires reasonable protective steps in context. Consider data sensitivity, access, system design and risk: restricted exports, maintained authentication, logging, tested backups and staff processes may work together. A rule document or HTTPS padlock alone does not establish effective protection. Tie each measure to the threat and verification evidence.</p><p>APP 11 also addresses destruction or de-identification when information is no longer needed, subject to its conditions, including record and legal retention requirements. Do not erase records simply because a project ends: check the authorised retention schedule, evidence holds and backup handling first. Deleting a live row does not remove every copy. <a href=\"https://www.oaic.gov.au/privacy/australian-privacy-principles/australian-privacy-principles-guidelines/chapter-11-app-11-security-of-personal-information\">OAIC APP 11 guidance</a>.</p>"
    ],
    [
      "Assess a federal notifiable breach case",
      "<p>The Privacy Amendment (Notifiable Data Breaches) Act 2017 introduced the federal NDB scheme into the Privacy Act. For our assumed covered entity, an eligible breach generally involves unauthorised access/disclosure, or loss likely to lead to it, with likely serious harm; effective remedial action can prevent a breach becoming eligible. Eligible breaches require notification to the OAIC and affected individuals under the scheme. <a href=\"https://www.oaic.gov.au/privacy/notifiable-data-breaches/about-the-notifiable-data-breaches-scheme\">OAIC NDB overview</a>.</p><p>On reasonable suspicion, the entity assesses the circumstances expeditiously and takes reasonable steps to complete that assessment within 30 calendar days. This is an assessment limit, not permission to ignore the event or wait 30 days to notify an already-established eligible breach. Escalate promptly, preserve necessary evidence and reduce harm through authorised responders. Students propose a response on paper; they do not send notices. <a href=\"https://www.oaic.gov.au/privacy/notifiable-data-breaches/quick-reference-guide-for-responding-to-data-breaches\">OAIC response guide</a>.</p><p>An export log alone does not establish recipient, disclosure or likely serious harm. A clean restore does not settle disclosure. The federal scheme and WA’s differently timed state scheme must be analysed separately; other response duties and policy still matter before a notification provision starts.</p>"
    ],
    [
      "Collect and analyse data responsibly",
      "<p>Define the purpose before choosing fields. A workshop booking needs an identifier and relevant session data; it does not automatically need a home address, health history or social-media profile. Minimise unnecessary collection, explain appropriate use, restrict access and identify who controls the data and decides retention. Claiming ownership does not remove other people’s rights or permit every use.</p><p>Data mining searches datasets for patterns or relationships. Attendance patterns might help schedule workshops, but small samples, missing records, biased participation and uncertain sources can produce misleading conclusions. A correlation does not establish that a student lacks motivation. Compare a support-oriented aggregate report with an individual penalty: evidence, fairness and consequence differ.</p><p>Removing a name leaves pseudonymous IDs and potentially identifying combinations. The offline activity counts deliberately fictional bookings by workshop, then displays “suppressed” for a small group. This illustrates minimisation and disclosure risk; the threshold is an arbitrary teaching choice, not a legally sufficient anonymisation method. Repeated releases, totals and outside knowledge may reveal hidden values. Acknowledge source, date, transformations and limits without publishing personal rows.</p>"
    ],
    [
      "Explain ethical hacking and team roles",
      "<table><tr><th>Role</th><th>Purpose</th><th>Evidence of improvement</th></tr><tr><td>Red team</td><td>Emulate adversary behaviour within an authorised engagement.</td><td>Documented findings, impact, scope and reproducible evidence.</td></tr><tr><td>Blue team</td><td>Defend, monitor, detect and respond.</td><td>Detection/response evidence and verified control changes.</td></tr><tr><td>Shared review</td><td>Compare findings, remediate and retest.</td><td>Reduced demonstrated weaknesses with stated testing limits.</td></tr></table><p>Ethical hacking improves security through authorised testing and responsible reporting. Agree the system owner’s authority, named targets, time window, permitted techniques, exclusions, data handling, stop conditions and contacts before testing. Permission for one lab does not authorise a school network, a third-party service or another student’s account. Good intentions do not make unauthorised access lawful. See <a href=\"https://csrc.nist.gov/glossary/term/red_team_blue_team_approach\">NIST team definitions</a> and the <a href=\"https://legislation.wa.gov.au/legislation/statutes.nsf/law_a196.html&amp;view=consolidated\">current WA Criminal Code</a> for the legal context.</p><p>Here the red group proposes failures using supplied paper cards; the blue group identifies evidence and controls. No scanning, exploitation or operational changes occur. A penetration test and a wider red-team exercise can have different objectives; passing a limited test does not establish complete security. Report through agreed channels, limiting unnecessary exposure of data or exploit details.</p>"
    ],
    [
      "Acknowledge sources and plan an open resource",
      "<p>Keep an asset register for code, prose, images and datasets: creator, source, licence, permission, required attribution and modifications. A citation recognises a source but does not itself grant copying rights. Free access is not an open licence. Classroom copying permission does not automatically allow public textbook publication; use original work, compatible licensed assets or explicit permission. <a href=\"https://smartcopying.edu.au/creating-learning-and-teaching-resources/\">National Copyright Unit publishing guidance</a>.</p><p>For this open textbook, verify who can license each contribution, including employment-related material. Licence choices for software and educational prose may differ. Keep third-party exceptions visible and remove student records and unapproved student work before release. This textbook is public: original educational content is licensed under CC BY 4.0 and code under the MIT licence, subject to the third-party exceptions described on the licence page. See <a href=\"licence.html\">Licences and attribution</a>. <a href=\"https://smartcopying.edu.au/guidelines/\">Smartcopying ownership and permission guidance</a>.</p>"
    ],
    [
      "Complete the responsibilities clinic",
      "<p><a class=\"button\" href=\"unit4-ethics-pack.zip\" download>Download ethics and law lesson pack</a> · <a href=\"unit4-ethics-workbook.md\" download>Student workbook</a> · <a href=\"unit4-ethics-cases.md\" download>Case cards</a> · <a href=\"unit4-ethics-answers.md\" download>Teacher checkpoints</a> · <a href=\"unit4-ethics-model.py\" download>Offline data activity</a>. Includes fictional CSV, a scope/report template and source register. Teacher files are separate but not access-protected.</p><p>Week 9 uses two explicit security lessons; lessons 3–4 remain database workshops. Add justified privacy/security decisions to the project evaluation without collecting real student data. Week 10 completes the project; integrated review follows. Original formative activities, with independent teacher review and learner evidence still pending. Curriculum reference: <a href=\"https://senior-secondary.scsa.wa.edu.au/__data/assets/pdf_file/0013/1211323/_Computer-Science-ATAR-Year-12-Syllabus-for-teaching-from-January-2026.PDF\">2026 SCSA Year 12 syllabus</a>. Legal summaries checked 14 October 2026; revisit source currency when reusing.</p>"
    ]
  ],
  "practice": [
    [
      "COVERAGE",
      "Do the federal APPs automatically apply to a WA state public school?",
      "No. Identify the entity and relevant framework. Federal coverage generally excludes state public schools; WA privacy obligations need separate examination."
    ],
    [
      "ACCESS",
      "Is refusing every personal-information access request an APP 11 security control?",
      "No. For an APP entity, APP 12 access requirements and applicable exceptions must be considered through an appropriate verified process."
    ],
    [
      "BREACH",
      "Does the federal 30-day assessment period mean every notification may wait 30 days?",
      "No. Assessment should be expeditious; an established eligible breach triggers the scheme’s notification duties."
    ],
    [
      "MINING",
      "Does deleting names make booking rows anonymous?",
      "No. IDs, rare combinations and outside information may still identify individuals."
    ],
    [
      "SCOPE",
      "A tester found a flaw in a lab. May they try it on the school server?",
      "Not on that basis. The school server is a different target requiring proper authority and scope."
    ]
  ],
  "task": "Analyse case cards P1–P8 using facts, stakeholders, entity/date, principle, evidence, options and justified action. Compare an aggregate booking report with individual profiling. Complete a paper red/blue-team scope and a project privacy/source register.",
  "solution": "Map the collection notice, overseas recipient, source quality, security/retention and access cases to APP 5/8/10/11/12 respectively, allowing overlaps. For P6, supplied facts establish an eligible federal breach; use authorised prompt response and notification rather than a blanket 30-day delay. For P7, separate WA July 2026 privacy obligations from January 2027 breach provisions. P8 exceeds the paper-only scope. Aggregation reduces detail but does not establish anonymity.",
  "recap": "Start with facts, purpose, people, entity and date. Justify actions with the relevant principle and evidence; ethical use, lawful authority and secure implementation all need attention.",
  "lessons": [
    "Week 9 lesson 1: entity/jurisdiction, five APPs and breach cases; manual predictions and explained feedback.",
    "Week 9 lesson 2: data-mining critique, paper red/blue-team scope and source/project decisions. Lessons 3–4 remain database project workshops."
  ],
  "reference": "https://www.oaic.gov.au/privacy/australian-privacy-principles/read-the-australian-privacy-principles",
  "refTitle": "OAIC: Australian Privacy Principles",
  "quiz": {
    "q": "What is the strongest first step when applying privacy law to a case?",
    "options": [
      "Assume the federal APPs govern every Australian school.",
      "Identify the entity, jurisdiction, date and relevant facts before applying the principle.",
      "Treat a successful restore as proof there was no disclosure."
    ],
    "answer": 1,
    "explanation": "Coverage, commencement and evidence affect which obligations apply. Technical outcomes alone do not settle legal or ethical questions."
  },
  "next": "#plan-4-7"
});

chapters.push({
  "id": "unit4-review",
  "unit": 4,
  "week": "11–12",
  "title": "Unit 4 integrated review",
  "badge": "PREDICT / EXPLAIN / TRANSFER",
  "intro": "Bring database design, SQL and security decisions together, then use fresh evidence to find what needs another attempt.",
  "objectives": [
    "Apply keys, dependencies and integrity rules to a changed six-table case.",
    "Write and debug joins, grouping, calculated fields and NULL-aware reports.",
    "Explain transactions, connectivity, recovery and justified security/privacy decisions.",
    "Attempt controlled practice and demonstrate transfer after explained feedback."
  ],
  "sections": [
    [
      "Review through a changed case",
      "<p>Community Skills Hub uses the familiar six-table workshop model, but the review has new sessions, capacities and bookings. Use the review seed rather than the project seed. Retrieve an idea, predict an outcome, attempt the task, inspect evidence and explain a fresh variation. A remembered answer for the earlier data is not a reliable report for this case.</p><p>Weeks 11–12 contain eight review lessons after the Week 10 project completion. The controlled sample occupies the existing theory-test slot; it is not an additional assessment. Weeks 13–14 then provide full-course consolidation and targeted repair; Weeks 15–16 prepare for exams. All work remains within the 64 teaching lessons.</p>"
    ],
    [
      "Read the model and identify its invariants",
      "<p>Use Instructor, Workshop, Session, Member, Booking and Attendance. Explain why a booking is identified by MemberID plus SessionID, and why Attendance references the same pair. Distinguish a missing attendance row from a recorded zero. Draw the relationships, including a booking having zero or one attendance record; check crow’s-foot symbols against course conventions.</p><p>For the supplied functional dependencies, identify partial and transitive dependencies before decomposing the flat sheet to 3NF. Show how the separated model prevents inconsistent repeated names/titles. The schema enforces selected integrity rules, not every business rule: positive capacity does not prevent overbooking and text dates alone do not validate calendar dates. <a href=\"#unit4-design\">Revisit database design</a>.</p>"
    ],
    [
      "Predict reports before running SQL",
      "<table><tr><th>Session</th><th>Capacity</th><th>Bookings</th><th>Places left</th></tr><tr><td>S01</td><td>3</td><td>3</td><td>0</td></tr><tr><td>S02</td><td>2</td><td>1</td><td>1</td></tr><tr><td>S03</td><td>2</td><td>2</td><td>0</td></tr><tr><td>S04</td><td>4</td><td>0</td><td>4</td></tr><tr><td>S05</td><td>2</td><td>1</td><td>1</td></tr></table><p>Write five reports: a four-table booking label; all-session counts and capacity remaining; attendance including unrecorded values; full sessions using HAVING; and scheduled capacity by workshop. Use aliases and deterministic sorting. COUNT of a non-null child key preserves zero bookings; COUNT(*) counts the outer-join placeholder. <a href=\"#unit4-sql\">Revisit advanced SQL</a>.</p><p>For W01, summing capacity after joining bookings produces 11 instead of 5. SUM(DISTINCT Capacity) is not a general repair: W02 has two different sessions of capacity 2, so it would return 2 instead of the required 4. Decide the correct row grain before choosing an aggregate. Joining attendance only by member can attach another session’s record; a WHERE present=1 filter also removes bookings the all-booking report needs.</p>"
    ],
    [
      "Explain transactions, connectivity and recovery",
      "<p>Trace a request through application code, database API/driver, parameterised SQL, transaction and result/error handling. Python sqlite3 uses the DB-API interface; ODBC is a different connectivity route. Explain responsibilities at each boundary rather than drawing an arrow labelled “database”.</p><p>If the second operation fails, the application must explicitly roll back the earlier insert within the transaction. A failed statement alone need not undo prior statements. Test an invalid Present value, duplicate pair, unbooked attendance and cascade scope on disposable in-memory copies. Explain a concurrent last-place booking test. Successful in-memory checks do not establish saved-file recovery or crash durability. <a href=\"#unit4-project\">Revisit database development and evaluation</a>.</p>"
    ],
    [
      "Analyse a proposed web deployment with evidence",
      "<p>The classroom SQLite model has no implemented website or login. In a separate hypothetical deployment, the application trusts browser-supplied role/scope strings; logs show a learner-labelled export allowed with 250 records returned, then a denied export. Separate those observed events from identity, recipient, intent and harm conclusions. Use CIA/AAA to identify risk and necessary evidence.</p><p>Recommend trusted server-side permissions, controlled export and logging, with tests for allowed Registrar workflow and denied Learner all-export. Compare these with blanket blocking and explain operational impact. A log count does not prove external disclosure, a source IP does not identify a person, and a clean restore does not settle confidentiality loss. Use paper red/blue roles to review the supplied scenario; no real-network testing. <a href=\"#unit4-analysis\">Analysis</a> · <a href=\"#unit4-controls\">Controls</a>.</p>"
    ],
    [
      "Connect security, cryptography and privacy",
      "<p>Explain how certificate trust and server private-key possession support authentication, ephemeral agreement derives secrets, and symmetric authenticated encryption protects application records in the simplified TLS 1.3 flow. Do not claim the certificate sends a private key, or that TLS 1.3 uses RSA key transport. HTTPS does not grant export permission or clean an infected endpoint. <a href=\"#unit4-crypto\">Revisit secure communication</a>.</p><p>The privacy case assumes a fictional private APP entity under the federal NDB scheme. Apply APP 5/8/10/11/12 to notification, overseas disclosure, quality, protection/retention and access. Eligibility is not established by the stimulus: gather facts and assess promptly; 30 days is not a blanket notification delay. In the WA public-sector counterfactual, coverage and commencement differ: substantive state privacy provisions commenced July 2026, while state notifiable information breach provisions commence January 2027. <a href=\"#unit4-ethics\">Revisit ethical and legal considerations</a>.</p><p>Evaluate aggregate planning against individual profiling. Missing or stale attendance, biased participation and re-identification risks matter; removing names does not establish anonymity. Acknowledge source and transformations without assuming acknowledgement gives publishing permission.</p>"
    ],
    [
      "Attempt a controlled sample and diagnose the result",
      "<p>The pack provides an original 24-mark, approximately 55-minute sample with changed S04 bookings. Attempt independently before opening answers. It is formative by default and replaces Week 12 lesson 3. To use it for the planned school theory assessment, the teacher must adapt and approve it; do not add another weighted task or treat downloadable answers as secure.</p><p>After marking, identify the failed criterion and its cause: keys, join grain, NULL, transactions, evidence, control purpose, privacy coverage or cryptographic roles. Explain a correction, then retry changed data without answers. A model solution or reference runner pass is evidence about the resource, not evidence that you independently mastered the task.</p>"
    ],
    [
      "Transfer, retrieve and plan consolidation",
      "<p>Fresh cards add two bookings to the empty session, change a repeated capacity, remove legal assumptions and introduce an item-loan model. Predict before executing or explaining. Include brief Unit 3 retrieval: binary search prerequisites, a loop over [1,0,None,1] counting explicit ones, and class/database invariant boundaries.</p><p>Record demonstrated, needs retry or not yet evidenced against each criterion. Choose two priorities for Weeks 13–14 full-course consolidation. Keep independent attempts, explanations and fresh retry evidence; teacher review of diagrams, assessment suitability and current sources remains necessary.</p>"
    ],
    [
      "Download the review materials",
      "<p><a class=\"button\" href=\"unit4-review-pack.zip\" download>Download integrated review pack</a> · <a href=\"unit4-review-questions.md\" download>Student workbook</a> · <a href=\"unit4-review-answers.md\" download>Teacher checkpoints</a> · <a href=\"unit4-review-timed.md\" download>Controlled sample</a> · <a href=\"unit4-review-feedback.md\" download>Feedback and retry record</a> · <a href=\"unit4-review-runner.py\" download>Reference SQL checker</a>. The pack includes the new schema/seed, reference SQL, expected results and transfer cards. Teacher files are separate but not access-protected.</p><p>Original formative resource; not an endorsed examination or completed coverage audit. Sources checked 14 October 2026: <a href=\"https://senior-secondary.scsa.wa.edu.au/__data/assets/pdf_file/0013/1211323/_Computer-Science-ATAR-Year-12-Syllabus-for-teaching-from-January-2026.PDF\">SCSA Year 12 syllabus</a>, <a href=\"https://www.oaic.gov.au/privacy/notifiable-data-breaches/quick-reference-guide-for-responding-to-data-breaches\">OAIC breach guidance</a> and <a href=\"https://www.wa.gov.au/government/privacy-and-responsible-information-sharing\">WA privacy timeline</a>.</p>"
    ]
  ],
  "practice": [
    [
      "COUNT",
      "Why does COUNT(*) give the wrong booking count for the unbooked session after a LEFT JOIN?",
      "It counts the preserved session row even though its child fields are NULL. COUNT(b.MemberID) counts only matched non-null child values."
    ],
    [
      "GRAIN",
      "Can SUM(DISTINCT Capacity) reliably correct joined capacity duplication?",
      "No. Different sessions can have equal capacities. W02 has two capacity-2 sessions; DISTINCT gives 2 rather than 4."
    ],
    [
      "ROLLBACK",
      "Will a failed attendance statement automatically reverse every earlier successful insert?",
      "Not necessarily. Explicit transaction/error handling must roll back the intended operation."
    ],
    [
      "EVIDENCE",
      "Does an allowed export count establish the person responsible or external disclosure?",
      "No. Trusted identity, server decision, recipient and event context require further evidence."
    ],
    [
      "TRANSFER",
      "What shows that correction improved understanding?",
      "A fresh independent attempt with changed data and an explanation of the relevant requirement, rather than copying the model answer."
    ]
  ],
  "task": "Complete the integrated workbook across the scheduled lessons, predict and test five reports, justify security/privacy responses, attempt the original controlled sample and record an independent changed-data retry.",
  "solution": "Review counts are 3,1,2,0,1 and places left 0,1,0,4,1. Full sessions are S01/S03; workshop capacities are 5,4,4. Two booking pairs have unrecorded attendance. Use these outputs to inspect query grain, then justify decisions using evidence and stated entity/date assumptions. Fresh transfer matters more than reproducing reference output.",
  "recap": "A correct solution connects requirements, implementation and evidence. Diagnose the cause of an error, explain a repair and demonstrate it on a fresh case.",
  "lessons": [
    "Week 11 lesson 1: key/dependency/diagram retrieval and design repair.",
    "Week 11 lesson 2: manual report prediction, independent SQL and NULL/grain feedback.",
    "Week 11 lesson 3: transactions, connectivity and recovery evidence.",
    "Week 11 lesson 4: security/cryptography/privacy case response with brief Unit 3 retrieval.",
    "Week 12 lesson 1: changed-data query transfer and explanation.",
    "Week 12 lesson 2: unfamiliar model and evidence-based extended response.",
    "Week 12 lesson 3: original controlled formative sample in the existing theory-test slot; teacher adaptation required for summative use.",
    "Week 12 lesson 4: marking, explained correction, fresh independent retry and consolidation priorities."
  ],
  "reference": "https://senior-secondary.scsa.wa.edu.au/syllabus-and-support-materials/technologies/computer-science",
  "refTitle": "SCSA Computer Science: current course materials",
  "quiz": {
    "q": "Which is the strongest evidence that a report query has been repaired?",
    "options": [
      "It produces the remembered result on the old project seed.",
      "It meets the stated requirement on changed data, including zero/NULL cases, with an explanation of row grain.",
      "A reference script prints PASS without the learner writing a query."
    ],
    "answer": 1,
    "explanation": "Changed data and boundary cases test transfer. Explain why the joins and aggregates satisfy the requirement."
  },
  "next": "#plan-4-8"
});

chapters.push({
  "id": "unit4-consolidation",
  "unit": 4,
  "week": "13–14",
  "title": "Full-course consolidation",
  "badge": "DIAGNOSE / REPAIR / RETRY",
  "intro": "Use evidence to repair two priority causes, connect the course strands and demonstrate improvement on changed tasks.",
  "objectives": [
    "Diagnose gaps across Year 12 strands and revisit earlier prerequisites.",
    "Repair Python/algorithm/object behaviour and database query/model reasoning.",
    "Explain network/security/privacy decisions using requirements and evidence.",
    "Record fresh and delayed retries, then plan remaining exam preparation."
  ],
  "sections": [
    [
      "Use evidence to choose the next repair",
      "<p>This chapter consolidates Year 12 Units 3–4 and revisits earlier Python, database and network foundations where needed. It samples the course through a diagnostic and four repair strands; it does not replace a complete syllabus audit. Use both the diagnostic and earlier independent work to choose two specific causes to repair.</p><p>Weeks 13–14 contain eight lessons. Week 13 combines diagnosis and common clinics; Week 14 uses two priority clinics, mixed transfer and delayed retries. The activities replace existing lesson practice, with no new summative task or project deadline. Weeks 15–16 remain exam preparation and Weeks 17–18 blocked exams.</p>"
    ],
    [
      "Diagnose a cause rather than chase a total",
      "<p>Attempt the short 16-mark diagnostic before opening answers. Each of eight items has two criteria spanning aliasing, binary search, sorting, objects, SQL, transactions, networking and secure data use. A missed criterion is a clue: inspect whether the cause is a weak prerequisite, mistaken model, incomplete explanation or missing evidence.</p><p>Record demonstrated, needs retry or not yet evidenced for each criterion. Choose priorities using repeated evidence and consequence. A high total can conceal a serious misunderstanding, and a low total does not tell the teacher which explanation will help. The sample does not define grades or prove full-course readiness.</p>"
    ],
    [
      "Repair Python structures and algorithm reasoning",
      "<p>For a rectangular grid of non-negative integer counts, define row-total behaviour for empty grids, empty rows and invalid values. Repeated references from [[0]*2]*2 share a row; create independent inner rows. Trace mutation and traversal before implementing. Keep validation, no-mutation expectations and tests visible.</p><p>Trace binary search with sorted comparable input, found/missing targets and empty lists. Its logarithmic comparison claim assumes that precondition; sorting or validating the list adds work. Trace stable insertion sort on a shallow copy, then explain the role of strict comparisons and the best/worst cases. Compare bubble and selection mechanisms rather than memorising one complexity label. <a href=\"#unit3-structures\">Structures</a> · <a href=\"#unit3-search\">Searching</a> · <a href=\"#unit3-sort\">Sorting</a>.</p>"
    ],
    [
      "Repair object behaviour and testing",
      "<p>Implement Session with a validated capacity, a booking count, a remaining-places calculation and a reserve method that refuses bookings when the session is full. OnlineSession overrides the location method; calling it on different session objects in one loop demonstrates polymorphism. Explain what is inherited, which method is selected and which tests challenge the boundary.</p><p>Underscore attributes indicate intended internal use, not a security boundary. Direct writes can bypass methods; a class test does not establish server authorisation, concurrent bookings or DB enforcement. Distinguish unit behaviour, integration, acceptance and recovery evidence. <a href=\"#unit3-inheritance\">Objects and inheritance</a> · <a href=\"#unit3-reliability\">Reliable software</a>.</p>"
    ],
    [
      "Transfer database knowledge to a different model",
      "<p>The new equipment case uses Category, Resource, Member, Loan and Inspection. A LoanID represents an event because the same resource/person pair may recur. Decompose the supplied dependencies; a single-column LoanID cannot have a partial dependency on part of that key, while repeated names/category details produce transitive dependencies. Draw and explain PK/FK relationships and optional return dates.</p><table><tr><th>Resource</th><th>Total loans</th><th>Active loans</th></tr><tr><td>R01</td><td>2</td><td>1</td></tr><tr><td>R02</td><td>1</td><td>1</td></tr><tr><td>R03</td><td>1</td><td>0</td></tr><tr><td>R04</td><td>0</td><td>0</td></tr></table><p>Write an all-resource report and a four-table active-loan label. A preserved resource with no child has NULL ReturnDate too: count an actual LoanID, not merely a NULL date. Separate child aggregates before joining loans and inspections to avoid multiplied rows. Test domain/FK errors and explicit rollback; date chronology and one-active-loan rules need additional enforcement. <a href=\"#unit4-review\">Integrated review</a> · <a href=\"#unit4-sql\">SQL</a>.</p>"
    ],
    [
      "Repair network models, addresses and diagnosis",
      "<p>Plan conventional IPv4 subnets from 192.168.40.0/24 for 60, 28 and 12 total assigned hosts, including the gateway. Work largest first, checking prefix, host capacity, network/broadcast, usable range and non-overlap. IPv6 has no broadcast; do not reuse the IPv4 subtraction rule indiscriminately.</p><p>Trace a remote message across link, network, transport and application roles. On the first Ethernet segment the frame normally targets the gateway MAC; router link headers change, while IP endpoints generally persist unless a mechanism such as NAT changes them. DNS, TCP and TLS have different jobs. UDP does not provide TCP’s reliability, but an application protocol can add it.</p><p>Use discriminating observations for a hostname failure, incorrect gateway or unavailable service. Ping failure alone does not prove an application is down. Draw the relevant course-convention network and test the policy at its real boundary: a VLAN label alone does not establish isolation. Activities remain paper/offline. <a href=\"#unit3-addressing\">Addressing</a> · <a href=\"#unit3-secure-networks\">Network design</a>.</p>"
    ],
    [
      "Repair security and responsibility explanations",
      "<p>In the hypothetical deployment, browser-supplied Registrar strings cannot establish trusted export authority. Map CIA/AAA concerns, compare preventive/detective/recovery controls and define both legitimate and prohibited tests. Use scoped paper red/blue roles and evidence; an IP or account label is not a person.</p><p>Explain trusted certificate binding, server private-key proof, authenticated ephemeral agreement and symmetric authenticated records in the simplified TLS 1.3 flow. Distinguish encryption, hashing and signatures. A tunnel, at-rest protection, endpoint integrity and application permission have different boundaries. <a href=\"#unit4-crypto\">Cryptography</a> · <a href=\"#unit4-controls\">Controls</a>.</p><p>The privacy exercises state an APP entity assumption and date. Apply APP 5/8/10/11/12, identify missing federal breach-eligibility facts and explain why 30 days is not a blanket notification delay. For a WA public-sector counterfactual, examine separate coverage and commencement: substantive privacy provisions commenced July 2026; state notifiable information breach provisions commence January 2027. Consider mining bias, re-identification, source reliability and permission as well as technical protection. <a href=\"#unit4-ethics\">Privacy and responsibility</a>.</p>"
    ],
    [
      "Show improvement with a fresh and delayed attempt",
      "<p>After one worked repair and a guided variation, attempt a changed task without the answer: different matrix/search values, another subclass, an added loan, larger subnet requirements or a case with changed legal assumptions. Explain why your repair meets the requirement and name a test that could disprove it.</p><p>A later lesson provides a delayed retry. Keep original work, explained correction and independent transfer evidence distinct. A supplied reference program passing checks validates that example; it does not demonstrate your achievement. Use unresolved causes to plan short Weeks 15–16 revision tasks and teacher support, without adding new project work.</p>"
    ],
    [
      "Download the consolidation materials",
      "<p><a class=\"button\" href=\"unit4-consolidation-pack.zip\" download>Download full-course consolidation pack</a> · <a href=\"unit4-consolidation-diagnostic.md\" download>Diagnostic</a> · <a href=\"unit4-consolidation-stations.md\" download>Repair workbook</a> · <a href=\"unit4-consolidation-transfer.md\" download>Fresh retries</a> · <a href=\"unit4-consolidation-answers.md\" download>Teacher checkpoints</a> · <a href=\"unit4-consolidation-plan.md\" download>Evidence and revision plan</a>. Includes Python starter/reference, a fresh five-table SQL seed and reference outputs. Teacher files are separate but not access-protected.</p><p>Original formative material for teacher review; not an endorsed exam or completed coverage audit. Legal sources checked 14 October 2026: <a href=\"https://www.oaic.gov.au/privacy/notifiable-data-breaches/quick-reference-guide-for-responding-to-data-breaches\">OAIC breach guidance</a> and <a href=\"https://www.wa.gov.au/government/privacy-and-responsible-information-sharing\">WA privacy timeline</a>. Curriculum: <a href=\"https://senior-secondary.scsa.wa.edu.au/syllabus-and-support-materials/technologies/computer-science\">SCSA course materials</a>. Teacher review of diagrams and actual learner evidence remains pending.</p>"
    ]
  ],
  "practice": [
    [
      "ALIAS",
      "Why does changing grid[0][1] affect both rows after grid=[[0]*2]*2?",
      "Both outer entries reference the same inner list. Construct separate row lists."
    ],
    [
      "SEARCH",
      "Does an O(log n) binary-search claim include sorting an unsorted input first?",
      "No. The search comparison bound assumes sorted comparable input; preparing or checking that input adds cost."
    ],
    [
      "NULL",
      "Why can checking NULL ReturnDate alone count a resource with no loan as active?",
      "The outer-join placeholder also has a NULL date. Count an actual non-null LoanID satisfying the active condition."
    ],
    [
      "BOUNDARY",
      "Does a guest VLAN label establish restricted application export rights?",
      "No. Network policy needs enforcement at its boundary, and application permissions need trusted identity/resource checks."
    ],
    [
      "RETRY",
      "Why repeat a changed task in a later lesson?",
      "Fresh and delayed attempts show whether the reasoning transfers and can be retrieved, rather than just copied immediately."
    ]
  ],
  "task": "Attempt the diagnostic, choose two priority causes, complete relevant repair tasks, and record fresh/delayed evidence plus a short exam-preparation plan.",
  "solution": "Choose specific causes such as shared-row aliasing or counting an outer placeholder as an active loan. Use a worked repair, tests and changed tasks; record unresolved uncertainty and teacher feedback. Two completed worksheets alone do not establish course readiness.",
  "recap": "Consolidation is a cause-and-evidence cycle: diagnose, explain a repair, apply it independently and retrieve it again later.",
  "lessons": [
    "Week 13 lesson 1: diagnostic, prior-evidence review and two priorities.",
    "Week 13 lesson 2: programming/algorithm/object repair clinic and independent practice.",
    "Week 13 lesson 3: fresh database design/SQL/transaction repair clinic.",
    "Week 13 lesson 4: networking/security/responsibility clinic and explanation.",
    "Week 14 lesson 1: priority 1 repair and changed independent attempt.",
    "Week 14 lesson 2: priority 2 repair and changed independent attempt.",
    "Week 14 lesson 3: mixed transfer and evidence-based feedback.",
    "Week 14 lesson 4: delayed retries, remaining support and Weeks 15–16 revision plan."
  ],
  "reference": "https://senior-secondary.scsa.wa.edu.au/syllabus-and-support-materials/technologies/computer-science",
  "refTitle": "SCSA Computer Science course materials",
  "quiz": {
    "q": "Which consolidation plan gives the strongest evidence of improvement?",
    "options": [
      "Reread every chapter and count pages completed.",
      "Identify a specific cause, practise a repair, then explain fresh and delayed independent attempts.",
      "Copy the supplied answers and record all criteria as demonstrated."
    ],
    "answer": 1,
    "explanation": "Specific causes and independent transfer/retrieval evidence show what changed and what still needs support."
  },
  "next": "#plan-4-9"
});

chapters.push({
  "id": "unit4-exam",
  "unit": 4,
  "week": "15–16",
  "title": "Full-course exam preparation",
  "badge": "ATTEMPT / MARK / TRANSFER",
  "intro": "Practise using the source, answering the command and managing time, then turn marking evidence into focused revision.",
  "objectives": [
    "Read current instructions and plan lesson-size mixed practice.",
    "Apply Python, database, network and security knowledge to supplied facts.",
    "Mark criteria, explain errors and demonstrate changed independent retries.",
    "Use evidence and teacher feedback for a manageable readiness plan."
  ],
  "sections": [
    [
      "Prepare against the current instructions",
      "<p>Use the current official front cover and school instructions to confirm timing, permitted materials and answer requirements. The 2026 external paper provides ten minutes reading and three hours working; its short-answer and extended-answer sections contribute 40% and 60%, with suggested working times of 70 and 110 minutes. Read the <a href=\"https://senior-secondary.scsa.wa.edu.au/__data/assets/pdf_file/0010/1264096/2026-CSC-Examination-Front-Cover.PDF\">2026 SCSA front cover</a> for the full instructions and materials conditions. School examinations may differ.</p><p>Our two original lesson-size sets provide 20 marks each and fit a normal lesson. They are samples, not full-length papers or predictions. Weeks 15–16 contain eight preparation lessons; Weeks 17–18 remain blocked school-exam weeks. The external ATAR timetable is separate. This chapter adds no project deadline or summative task.</p>"
    ],
    [
      "Read the command and use the stimulus",
      "<p>Underline the required action, scope and parts. The command “identify” asks you to name a point; “explain” asks you to connect how or why; “compare” asks for meaningful similarities and differences; “justify” asks for a supported choice using requirements and evidence. Check the precise question rather than adding every fact you remember.</p><p>Read the Source Booklet/table/code and cite the relevant facts in your answer. For a query, identify required rows before syntax; for a trace, record variable changes; for a design, label keys/relationships/addresses and justify assumptions. The <a href=\"https://senior-secondary.scsa.wa.edu.au/__data/assets/pdf_file/0019/1242532/2025-ATAR-course-examination-report-CSC-public-version.PDF\">2025 candidate report</a> highlights difficulties applying ideas to unfamiliar and multi-part tasks. Its advice informs this practice, while its past-paper structure is historical.</p>"
    ],
    [
      "Plan time by the actual task",
      "<p>For each sample: five minutes reading, forty minutes working and five checking. The eight short-answer marks have an illustrative sixteen working minutes; the twelve extended marks have twenty-four. Use these as checkpoints, then adjust using evidence about where you lose time. These miniature timings are not the official three-hour pacing rule.</p><p>Attempt every requested part. If blocked, record a useful partial step and return later; protect checking time. Check joins, zero/NULL cases, loop boundaries, subnet ranges, labels and source assumptions. A mark count signals scope but does not justify writing disconnected keywords.</p>"
    ],
    [
      "Attempt original mixed practice",
      "<p>Set A combines dictionary tracing, an all-resource report, subnet planning/diagnosis and an export-security case. Set B changes emphasis to object behaviour, active-loan counting, writing a validated accumulator and normalised design/transaction evidence. Both use a self-contained fictional source booklet and fresh exam SQL seed.</p><p>Attempt on paper before running reference code or opening the marking key. Record uncertainty and incomplete parts. Different set scores are not an equivalent-paper measure of improvement: compare the specific criteria and independent transfer instead. <a href=\"#unit4-consolidation\">Return to consolidation</a> when a prerequisite needs repair.</p>"
    ],
    [
      "Mark a criterion and explain its cause",
      "<p>The key allocates indicative marks to stated criteria and accepts equivalent correct approaches. Keep your original response. Identify whether the cause was content, interpreting the command, source use, tracing, syntax or pacing; explain one repair before retrying.</p><p>A copied correction is not an independent demonstration. A reference query passing a check validates the resource, not the learner. Use a changed task and a later retrieval attempt to inspect improvement. Diagram conventions, assessment suitability and actual student work still need teacher review.</p>"
    ],
    [
      "Transfer to a changed case",
      "<p>Fresh retries change accumulator rows, search targets, loan data, subnet sizes and privacy assumptions. Explain the effect before calculating or executing. Do not transfer an old answer without its preconditions: binary search needs sorted compatible data, a NULL date alone does not establish an active loan, and an export log does not establish external disclosure or legal notification eligibility.</p><p>For privacy tasks, retain explicit entity/date assumptions and consult the responsibilities chapter and current guidance. An established eligible federal breach and a mere suspicious event require different conclusions; thirty days is not a blanket notification waiting period. <a href=\"#unit4-ethics\">Privacy and law</a> · <a href=\"#unit4-crypto\">Secure communication</a>.</p>"
    ],
    [
      "Make a manageable readiness plan",
      "<p>Select two remaining priorities with evidence and a short next task. Record demonstrated, needs retry or not yet evidenced; no sample percentage guarantees examination readiness. Confirm teacher support, approved access arrangements and the actual school/current SCSA instructions.</p><p>Use Week 16’s final lesson for delayed retrieval, evidence review and practical preparation. Confirm venue/timetable/materials through the school; keep revision manageable and avoid unfinished project work spilling into the exam block. The Unit 4 syllabus coverage audit is available through Coverage & audits; practice gaps and independent review/evidence remain pending.</p>"
    ],
    [
      "Download the preparation pack",
      "<p><a class=\"button\" href=\"unit4-exam-pack.zip\" download>Download exam-preparation pack</a> · <a href=\"unit4-exam-source.md\" download>Source booklet</a> · <a href=\"unit4-exam-set-a.md\" download>Set A</a> · <a href=\"unit4-exam-set-b.md\" download>Set B</a> · <a href=\"unit4-exam-key.md\" download>Explained key</a> · <a href=\"unit4-exam-plan.md\" download>Readiness record</a>. Includes fresh retries, teacher allocation and reference Python/SQL. Teacher files are separate but not access-protected.</p><p>Original formative material, independent of SCSA endorsement. Official resources checked 14 October 2026: <a href=\"https://senior-secondary.scsa.wa.edu.au/__data/assets/pdf_file/0010/1264096/2026-CSC-Examination-Front-Cover.PDF\">2026 front cover</a>, <a href=\"https://senior-secondary.scsa.wa.edu.au/__data/assets/pdf_file/0019/1242532/2025-ATAR-course-examination-report-CSC-public-version.PDF\">2025 report</a> and <a href=\"https://senior-secondary.scsa.wa.edu.au/syllabus-and-support-materials/technologies/computer-science\">course page with past papers/keys</a>. Link to official questions rather than treating these original sets as official papers.</p>"
    ]
  ],
  "practice": [
    [
      "COMMAND",
      "What makes a justification stronger than a list of controls?",
      "It selects a defensible option and connects its mechanism, requirements, evidence and limits to the given case."
    ],
    [
      "SOURCE",
      "Why check which SQL seed the practice uses?",
      "The rows and expected outputs differ; an old remembered answer may miss zero resources or changed bookings."
    ],
    [
      "SCORE",
      "Can a higher Set B score alone establish improvement?",
      "No. The sets emphasise different content and are not validated equivalent forms. Compare criteria and fresh transfer evidence."
    ],
    [
      "RETRY",
      "Does copying the key establish independent mastery?",
      "No. Explain the cause and attempt a changed task without the key, then retrieve the reasoning later."
    ]
  ],
  "task": "Complete the two scheduled original samples, mark and explain criteria, attempt selected fresh/later retries and record two final preparation priorities.",
  "solution": "Use the stated source and question criteria. Keep original work and explained corrections separate from changed independent evidence. Choose small specific next tasks, confirm current instructions with the school and record remaining support needs rather than inferring a grade from two samples.",
  "recap": "Preparation connects instructions, source facts, precise reasoning, pacing and evidence-based correction.",
  "lessons": [
    "Week 15 lesson 1: current instructions, command/source use and pacing plan.",
    "Week 15 lesson 2: original Set A timed attempt.",
    "Week 15 lesson 3: criterion marking, explained corrections and targeted repair.",
    "Week 15 lesson 4: fresh retries and short revision plan.",
    "Week 16 lesson 1: original Set B timed attempt.",
    "Week 16 lesson 2: marking and specific cause repair.",
    "Week 16 lesson 3: unfamiliar mixed transfer and later priority retry.",
    "Week 16 lesson 4: delayed retrieval, readiness/support plan and instruction/materials check."
  ],
  "reference": "https://senior-secondary.scsa.wa.edu.au/__data/assets/pdf_file/0010/1264096/2026-CSC-Examination-Front-Cover.PDF",
  "refTitle": "SCSA 2026 Computer Science examination front cover",
  "quiz": {
    "q": "What provides the best evidence after correcting a practice answer?",
    "options": [
      "Copying the marking key exactly.",
      "Explaining the cause and independently answering a changed task, with a later retry.",
      "Treating the total score as a guaranteed examination result."
    ],
    "answer": 1,
    "explanation": "Fresh and delayed independent evidence tests transfer and retrieval; the key alone cannot show learner achievement."
  },
  "next": null
});
