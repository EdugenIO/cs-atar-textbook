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
      "<p>Start by writing what the community centre needs to record. A workshop describes an activity. A session is one scheduled delivery of that workshop.</p><ul><li>Each session has exactly one workshop and one instructor.</li><li>A member can book several sessions. A session can have several members.</li><li>A member can book a particular session only once.</li><li>A booking can have one attendance record later. No attendance record means “not recorded yet”, rather than “absent”.</li></ul><p>You can store an instructor or workshop before creating sessions. You can also store a member or session before creating bookings. Names and titles need not be unique.</p><p>Give each session a positive capacity. Checking that all bookings fit within it is a separate <strong>business rule</strong>: a requirement that involves counting several rows. The six tables here serve different purposes. The Year 12 implementation requires at least five tables, but a table count alone does not make a design sound. This clinic prepares you for the later database project.</p>"
    ],
    [
      "Diagnose a flat record and its dependencies",
      "<p>Imagine storing every booking in one large table. A row contains MemberID, MemberName, SessionID, SessionDate, Capacity, WorkshopID, WorkshopTitle, InstructorID, InstructorName, BookedOn and Present. You identify a booking with the pair (MemberID, SessionID).</p><p>Ask which identifier determines each value. MemberID determines MemberName. SessionID determines the session details. A rule such as “MemberID determines MemberName” is a <strong>functional dependency</strong>.</p><ul><li><strong>Partial dependency:</strong> MemberName needs only MemberID, which is part of the booking key. Session details need only SessionID. These dependencies prevent second normal form (2NF).</li><li><strong>Transitive dependency:</strong> SessionID leads to WorkshopID, which leads to WorkshopTitle. InstructorName has a similar indirect dependency through InstructorID.</li></ul><p>Repeated details cause <strong>anomalies</strong>, or problems when you change data. Updating an instructor name in many booking rows can leave conflicting names. You cannot insert an unbooked session if bookings are your only storage. Deleting its last booking can also lose the session details.</p><p>Normalisation separates facts according to these dependencies. In first normal form (1NF), use one atomic value per field for the defined domain and remove repeating lists. In 2NF, remove non-key partial dependencies on candidate keys. In third normal form (3NF), address the remaining problematic non-key dependencies. State your candidate keys and dependencies before decomposing the table. Adding a surrogate BookingID does not remove those dependencies or the rule against duplicate member/session pairs.</p>"
    ],
    [
      "Read the six-table crow’s-foot model",
      "<figure><img src=\"unit4-workshop-model.svg\" alt=\"Workshop and Instructor each have zero or many Sessions; each Session has exactly one of each. Member and Session each have zero or many Bookings; every Booking has exactly one of each. Booking has zero or one Attendance; every Attendance belongs to exactly one Booking.\" style=\"width:100%;height:auto\"><figcaption>Original crow’s-foot model. Read the legend and every relationship in both directions; independent symbol review remains pending.</figcaption></figure><table><tr><th>Relationship</th><th>Both directions</th></tr><tr><td>Workshop–Session</td><td>Workshop has zero or many sessions; each session has exactly one workshop</td></tr><tr><td>Instructor–Session</td><td>Instructor has zero or many sessions; each session has exactly one instructor</td></tr><tr><td>Member–Booking</td><td>Member has zero or many bookings; each booking has exactly one member</td></tr><tr><td>Session–Booking</td><td>Session has zero or many bookings; each booking has exactly one session</td></tr><tr><td>Booking–Attendance</td><td>Booking has zero or one attendance record; attendance has exactly one booking</td></tr></table><p>The bridge Booking resolves Member–Session many-to-many. Its composite key stops duplicate bookings for the same pair. Attendance reuses that pair as its primary key and composite foreign key. This permits at most one attendance row per booking, but does not require one to exist.</p><p>Optional one-to-one storage is justified here because attendance is recorded later as a separate event. An alternative could store a nullable attendance state on Booking; compare simplicity, meaning and requirements. Do not split a table merely to manufacture a one-to-one relationship.</p>"
    ],
    [
      "Write relational notation and key rules",
      "<pre><code>Instructor(InstructorID PK, DisplayName)\nWorkshop(WorkshopID PK, Title)\nSession(SessionID PK, WorkshopID FK, InstructorID FK, SessionDate, Capacity)\nMember(MemberID PK, DisplayName)\nBooking(MemberID PK/FK, SessionID PK/FK, BookedOn)\nAttendance(MemberID PK/FK, SessionID PK/FK, Present)\nAttendance(MemberID,SessionID) jointly references Booking(MemberID,SessionID).</code></pre><p>Read Booking's key as a pair: MemberID and SessionID together identify one booking. A member can book several sessions, and a session can have several members, so neither field identifies a booking on its own. This is a <strong>composite key</strong>.</p><p>Now follow Attendance's foreign key. It refers to the whole Booking pair. Separate references to Member and Session would prove only that each parent exists; they would not prove that this member booked this session.</p><p>Mark every field that forms a composite key in the notation. SessionID is a surrogate identifier, so you can record repeated workshop deliveries, even on the same date. The design does not assume that (WorkshopID, SessionDate) is unique. Add that restriction only if the organiser requires it, then document and enforce it. A sample with no duplicates is not evidence that duplicates must be forbidden.</p>"
    ],
    [
      "Make a data dictionary that matches implementation",
      "<p>Use a <strong>data dictionary</strong> to explain each field. For every field, record its meaning, type, storage format, allowed values, whether it can be NULL, key role and where its rules are enforced. The supplied dictionary covers all 17 columns.</p><p>Choose a type from the requirement. Names are text; capacity is an integer; Present is a Boolean state. A duration may need a float. A fixed currency amount can use integer minor units to avoid binary rounding. A date is conceptually a date even when you store it as text.</p><p>In this SQLite schema, dates use TEXT and Present uses INTEGER 0 or 1. Ordinary SQLite column declarations provide <strong>type affinity</strong>: a preferred storage type, rather than a universal rigid type rule. The typeof and range checks add explicit restrictions for capacity and Present. VARCHAR(60) alone does not limit text length in SQLite.</p><p>Read each constraint carefully. The name/title CHECK expressions limit trimmed length, but do not trim the stored values. Date fields are NOT NULL, but the schema does not check calendar validity. A malformed date can still be stored. ID formats, session clashes, capacity across bookings and date order also need further constraints or application/transaction logic. Record these gaps rather than calling an unenforced design rule “database validation”.</p>"
    ],
    [
      "Distinguish three kinds of integrity",
      "<p>Try to insert a duplicate booking, an unknown member reference and a negative capacity. Each challenges a different kind of <strong>integrity</strong>, meaning a rule that keeps the data structurally sound.</p><ul><li><strong>Entity integrity:</strong> a row's primary key must be unique and non-null.</li><li><strong>Referential integrity:</strong> a required foreign-key reference must point to an existing parent.</li><li><strong>Domain integrity:</strong> a value must belong to its allowed set or range. Capacity must be a positive integer; Present must be in {0, 1}.</li></ul><p>A value can pass these checks and still be factually wrong. Present = 1 is allowed, but it does not prove that the member attended.</p><p>Enable SQLite foreign-key checking before using the data and verify it for each connection. Changing that setting inside an active transaction has no effect. The schema explicitly adds NOT NULL to required references and TEXT/composite primary-key fields, rather than relying on SQLite's ordinary primary-key behaviour.</p><p>In this demonstration, deleting a Booking also deletes its Attendance record: this is a <strong>cascading delete</strong>. The default reference action blocks deletion of a Member or Session with bookings. These are classroom lifecycle choices. Real records need an agreed retention and authorisation policy before you choose deletion rules.</p>"
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
      "<p>Before writing SQL, finish this sentence: “One output row represents …”. That unit is the report's <strong>grain</strong>. A row might represent one booking, one session or one workshop.</p><p>Use the unchanged design seed. It has three bookings: M01/S01, M02/S01 and M01/S02. S03 has no booking. M03 exists but has no booking. Attendance records M01/S01 as Present = 1 and M02/S01 as Present = 0. M01/S02 has no attendance record.</p><p>For a booking report, expect three rows. For an all-session report, keep S03 even though it has no booking. Write the expected rows first. Then select the tables and joins that match that meaning. The examples use SQLite; check your own DBMS for differences in date handling and concatenation.</p>"
    ],
    [
      "Join up to four tables and keep keys visible",
      "<pre><code>SELECT b.MemberID, m.DisplayName, s.SessionID, w.Title, s.SessionDate\nFROM Booking AS b\nINNER JOIN Member AS m ON m.MemberID = b.MemberID\nINNER JOIN Session AS s ON s.SessionID = b.SessionID\nINNER JOIN Workshop AS w ON w.WorkshopID = s.WorkshopID\nORDER BY s.SessionID, b.MemberID;</code></pre><p>Booking is the starting grain. Each join follows a declared key: MemberID, SessionID, then WorkshopID. The report has three rows, ordered by session and member. Selecting names alone can hide distinct people with the same label; retain IDs when identity matters.</p><p>Aliases shorten qualified names. They do not rename stored columns or change the schema. Specify an ON condition for each relationship; a missing condition can create every combination of rows. DISTINCT can remove legitimate duplicates from the selected view and should not disguise a broken join.</p>"
    ],
    [
      "Aggregate at the correct grain",
      "<pre><code>SELECT COUNT(*) AS SessionCount, SUM(Capacity) AS TotalPlaces,\n       AVG(Capacity) AS MeanPlaces, MIN(Capacity) AS Smallest,\n       MAX(Capacity) AS Largest\nFROM Session;</code></pre><p>Read the first query as a question about sessions, with one input row per session. It returns count 3, total places 7, mean 7/3, minimum 2 and maximum 3. Functions that combine values into a summary are <strong>aggregate functions</strong>.</p><ul><li>COUNT(*) counts rows.</li><li>COUNT(column) counts non-NULL values in that column.</li><li>SUM, AVG, MIN and MAX ignore NULL inputs.</li></ul><p>With no matching input and no GROUP BY, COUNT returns 0; the other ordinary aggregates shown here return NULL. A grouped query with no input may return no groups.</p><p>The second query creates one group per SessionID. Its INNER JOIN keeps only sessions with bookings, so the result is S01: 2 and S02: 1. S03 is excluded. Group by identifiers rather than titles that can repeat. Include each selected nonaggregate attribute in GROUP BY, or justify a valid key dependency explicitly. SQLite permits some bare, ungrouped columns, but that shortcut can produce unreliable reports.</p><pre><code>SELECT s.SessionID, COUNT(*) AS Bookings\nFROM Session AS s\nINNER JOIN Booking AS b ON b.SessionID = s.SessionID\nGROUP BY s.SessionID\nORDER BY s.SessionID;</code></pre>"
    ],
    [
      "Preserve zero-booking sessions",
      "<pre><code>SELECT s.SessionID, COUNT(b.MemberID) AS Bookings\nFROM Session AS s\nLEFT JOIN Booking AS b ON b.SessionID = s.SessionID\nGROUP BY s.SessionID\nORDER BY s.SessionID;</code></pre><p>Start from Session because you need every session. Use a <strong>LEFT JOIN</strong> to keep a session even when it has no matching Booking.</p><p>For S03, the join produces one preserved row whose Booking fields are NULL. COUNT(b.MemberID) ignores that NULL and gives 0. COUNT(*) counts the preserved row itself and incorrectly gives 1 booking. The correct report is S01: 2, S02: 1, S03: 0.</p><p>Check where you place conditions. A WHERE condition on the joined Booking or Attendance table can remove rows you meant to preserve. To keep every booking but attach only matching presence records, put the presence condition in ON. If you want only bookings recorded as present, WHERE a.Present = 1 is appropriate, as Q9 shows. Let the report requirement decide.</p>"
    ],
    [
      "Calculate and concatenate with aliases",
      "<pre><code>SELECT s.SessionID, s.Capacity, COUNT(b.MemberID) AS Bookings,\n       s.Capacity - COUNT(b.MemberID) AS Remaining,\n       ROUND(100.0 * COUNT(b.MemberID) / s.Capacity, 1) AS FillPercent\nFROM Session AS s\nLEFT JOIN Booking AS b ON b.SessionID = s.SessionID\nGROUP BY s.SessionID, s.Capacity\nORDER BY s.SessionID;</code></pre><p>Calculate a result from the values you have, then give it a clear name. Here Remaining means capacity minus booking count: S01 has 0 places left, S02 has 2 and S03 has 2. AS gives the calculated column an <strong>alias</strong>, or result label.</p><p>FillPercent reports 100.0, 33.3 and 0.0 for those sessions. Multiplying by the real-valued literal 100.0 prevents integer division from truncating the fraction before rounding. This is a report calculation. It does not store a permanent truth or stop another request from booking a place.</p><p>The next query joins text using SQLite's || operator. Combining text is <strong>concatenation</strong>. BookingLabel combines the member's display name with the workshop title. Other SQL dialects can use different syntax.</p><p>If a value in a concatenation is NULL, the result is NULL unless you choose a replacement explicitly. Choose display wording that preserves the meaning of missing data rather than inventing a fact.</p><pre><code>SELECT b.MemberID, s.SessionID,\n       m.DisplayName || &#x27; / &#x27; || w.Title AS BookingLabel\nFROM Booking AS b\nINNER JOIN Member AS m ON m.MemberID = b.MemberID\nINNER JOIN Session AS s ON s.SessionID = b.SessionID\nINNER JOIN Workshop AS w ON w.WorkshopID = s.WorkshopID\nORDER BY s.SessionID, b.MemberID;</code></pre>"
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
      "<p>Trace one joined row before summing capacity. When a session has several bookings, its Capacity appears once for each booking. Adding those repeated values overcounts the places.</p><p>For W01, the faulty booking-level sum is 2 + 2 + 3 = 7. The correct session-level total is 2 + 3 = 5. SUM(DISTINCT Capacity) happens to give 5 here, but it removes repeated values, not repeated sessions. Two different sessions can legitimately have the same capacity.</p><ol><li>State which entity you are counting or summing.</li><li>Aggregate at that entity's key before joining another one-to-many set, or keep the report at the correct grain.</li><li>Predict results on changed data, then run the query.</li></ol><p>Include an unbooked session, unrecorded attendance, equal labels, equal capacities, an empty filtered input and a member with several sessions. A query that runs without an SQL error can still answer the wrong question.</p>"
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
      "<table><tr><th>ID</th><th>Required outcome</th><th>Evidence</th></tr><tr><td>R1</td><td>Create six related tables and reconcile diagram/dictionary/schema</td><td>Keys/references/domain checks and actual six-table inspection</td></tr><tr><td>R2</td><td>Provide required read-only reports</td><td>Four-table join, grouped count and calculated/concatenated output</td></tr><tr><td>R3</td><td>Book known member/session once, without exceeding capacity</td><td>Normal/last-place/full/duplicate/unknown/date tests; rejection unchanged</td></tr><tr><td>R4</td><td>Record or update attendance only for booked pair</td><td>Joint-key reference; 0/1 validation; unrecorded distinct from absence</td></tr><tr><td>R5</td><td>Clean and import a synthetic member batch atomically</td><td>Mapping/normalisation log; invalid/duplicate batch leaves all rows unchanged</td></tr><tr><td>R6</td><td>Demonstrate controlled schema/data changes</td><td>CREATE/ALTER/INSERT/UPDATE/DELETE/cascade/DROP lab; safe transaction boundary</td></tr><tr><td>R7</td><td>Demonstrate recovery and evaluate fitness</td><td>Known-good copy, integrity/reference checks, content/report comparison, limitations</td></tr></table><p>Turn each requirement in the table into a check you can observe. For example, a full session must reject another booking and leave the data unchanged. A statement such as “the system works” is too vague to check.</p><p>Use these scenario rules: each member/session pair can occur once; every retained Booking row counts towards capacity; a booking date must not be after its session date. The reference does not model cancellation history, waiting lists or clashes between session times.</p><p>Keep the diagram, 17-field dictionary and schema together. When you justify a schema change, update all three. Explain primary keys, composite keys and joint foreign-key references. Show which dependencies you remove through normalisation.</p><p>Also label where each rule is enforced. A direct SQL insert can bypass the application's cross-row capacity check. This prototype does not add database enforcement for every business rule. A clear account of that limit is part of an accurate design.</p>"
    ],
    [
      "Make controlled changes and verify effects",
      "<pre><code>-- Run only in a fresh disposable copy of the design database.\n-- Predict each operation; this lab ends with ROLLBACK, preserving starting data/schema.\nBEGIN;\nCREATE TABLE ScratchNote (NoteID INTEGER PRIMARY KEY, NoteText TEXT NOT NULL);\nINSERT INTO ScratchNote VALUES (1,&#x27;temporary lab&#x27;);\nALTER TABLE Member ADD COLUMN Notes TEXT;\nUPDATE Member SET Notes=&#x27;reviewed synthetic record&#x27; WHERE MemberID=&#x27;M03&#x27;;\nSELECT MemberID,Notes FROM Member ORDER BY MemberID;\nDELETE FROM Booking WHERE MemberID=&#x27;M01&#x27; AND SessionID=&#x27;S01&#x27;;\nSELECT * FROM Attendance ORDER BY SessionID,MemberID;\nDROP TABLE ScratchNote;\nROLLBACK;\n-- Member has no Notes column again; original booking/attendance remain.\n</code></pre><p>CREATE defines a table; ALTER TABLE changes supported schema features; INSERT/UPDATE/DELETE change rows; DROP removes a table. MODIFY is not a SQLite table-alteration command. SQLite supports a defined set of ALTER operations; more complex changes may need a careful table-rebuild procedure. Read current documentation rather than assuming another DBMS’s syntax.</p><p>The scoped DELETE uses both booking keys; its attendance is removed by the declared cascade. ROLLBACK restores this lab’s original rows/schema. Do not drop or reset the project database to “fix” a query. Real history deletion requires a separately agreed retention/authorisation policy.</p>"
    ],
    [
      "Clean an import without inventing data",
      "<p>Inspect the raw synthetic CSV before importing it. It contains spaces around values, a lowercase ID and a blank name. Keep this raw file so you can explain every change.</p><ol><li>Agree the mapping: trim IDs, convert them to uppercase and require M followed by two digits.</li><li>Trim names and require 1–60 characters. Reject duplicate IDs and IDs already in the database.</li><li>Record each correction or rejection. Do not invent a missing name.</li><li>Validate the whole batch, then insert it in one transaction using bound parameters.</li></ol><p>The agreed import is <strong>atomic</strong>: either the whole batch succeeds or none of it remains. A malformed row rejects the batch. A later database failure rolls back earlier inserts. The corrected CSV contains three valid new records.</p><p>Here, normalising input means putting it into an agreed format. That does not establish accuracy or authenticity. You still need evidence about the source, age, relevance and unusual values.</p>"
    ],
    [
      "Use transactions to protect a booking",
      "<p>Treat “check for a place, then insert a booking” as one logical operation. If another writer can book between those steps, both requests might claim the final place. A <strong>transaction</strong> groups database work within a controlled boundary.</p><ul><li><strong>Atomicity:</strong> commit the whole logical change, or undo it.</li><li><strong>Consistency:</strong> preserve the declared constraints and application rules.</li><li><strong>Isolation:</strong> manage how transactions interact.</li><li><strong>Durability:</strong> preserve committed changes under the configured storage guarantees. An in-memory demonstration cannot show survival after the process exits.</li></ul><p>The example uses SQLite BEGIN IMMEDIATE to start a write transaction before counting bookings. Another writer cannot change the count between that check and insert. A busy or locking failure is still possible and needs a defined user response. The reference expects no active caller transaction and controls commit and rollback explicitly.</p><p>Do not assume one failed SQL statement undoes every earlier statement. Roll back the intended operation when it fails. Bound parameters keep data separate from SQL structure; they do not validate dates, capacity or permissions. The reference separately parses ISO calendar dates and checks the stored session date.</p><p>Python sqlite3 is a <strong>DB-API</strong> interface to SQLite. It is not an ODBC driver. <strong>ODBC</strong> is a separate standard, driver-based route from an application to a DBMS. Name the connection method your implementation actually uses.</p><pre><code>BEGIN IMMEDIATE;\n-- Check known member/session, duplicate pair and current booking count.\n-- If count &lt; capacity, INSERT using parameters.\nCOMMIT;\n-- On rejection/error, ROLLBACK the entire operation.</code></pre>"
    ],
    [
      "Test workflows, failures and reports",
      "<p>Start each test with a known dataset. This setup is a <strong>fixture</strong>. S01 has capacity 2 and already has two bookings, so a request for M03/S01 must be rejected without changing the database. S02 has capacity 3 and initially one booking, so M03/S02 can succeed once.</p><ol><li>Repeat M03/S02 and check that the duplicate is rejected.</li><li>Try unknown IDs and late or invalid dates.</li><li>Compare the full stored state before and after each rejection.</li><li>Test attendance insertion and updates for a booked pair, invalid Boolean values and an unbooked pair.</li></ol><p>For an import, try malformed IDs, IDs that become duplicates after normalising, and existing IDs. Trigger a later insert failure and check that earlier batch inserts are rolled back. After valid changes, predict and rerun the report rows and counts.</p><p>A passing test of one component does not show the whole user workflow. To check a requirement, follow the actual sequence the user needs and record its observed result.</p>"
    ],
    [
      "Preserve a known-good version and prove recovery",
      "<p>Make a known-good copy before testing recovery. Keep the source/schema version and a test record with it. A <strong>backup</strong> is a recoverable copy; a <strong>restore test</strong> shows that you can use that copy again.</p><ol><li>Choose a suitable backup method. SQLite's backup API can copy a consistent state from an open database.</li><li>Restore into a separate disposable destination so you preserve your current work.</li><li>Reopen the restored database.</li><li>Compare integrity checks, foreign-key checks, key counts, contents and required reports.</li><li>Record the results and remaining limits.</li></ol><p>Do not casually copy just one file from an active SQLite WAL database: required state may be in other files. Use an appropriate backup method or a controlled closed-database workflow.</p><p>The supplied demonstration copies into another in-memory connection and compares integrity, references and table contents. This checks copy behaviour. It does not demonstrate backup placement on disk, survival after exit or a saved-file restore. You need separate evidence for those claims.</p>"
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
      "<p>Choose something worth protecting, such as the booking records. This is an <strong>asset</strong>. Then ask what could harm it and how that harm could happen.</p><ul><li>A <strong>threat</strong> is a potential cause of harm.</li><li>A <strong>vulnerability</strong> is a weakness that a threat could use.</li><li><strong>Risk</strong> considers how likely the harm is and how serious its impact would be in this situation.</li><li>A <strong>control</strong> changes risk. It does not prove that harm is impossible.</li></ul><p>The case imagines a future workshop system with accounts, a website, personal records and service monitoring. These are scenario facts. The classroom SQLite prototype has no login or web server, so do not describe those features as implemented.</p><p>Use two explicit security lessons in Week 6, alongside two separate database workshops. Retrieve the earlier threat terms, then apply them to unfamiliar evidence. You do not need live attacks, malware execution or network scanning.</p>"
    ],
    [
      "Apply the CIA triad to specific consequences",
      "<table><tr><th>Goal</th><th>Workshop consequence</th><th>Evidence to seek</th></tr><tr><td>Confidentiality</td><td>Records accessed/disclosed beyond permitted purpose</td><td>Export scope, recipients, permissions and access history</td></tr><tr><td>Integrity</td><td>Attendance/booking data changed incorrectly or without authority</td><td>Before/after records, authorisation, source confirmation</td></tr><tr><td>Availability</td><td>Authorised users cannot book when needed</td><td>Service metrics, faults, demand and recovery state</td></tr></table><p>One incident can affect several goals. Ransomware can deny access and threaten disclosure; restoring a file does not settle whether a copy was taken. A valid database constraint does not establish factual accuracy or authorisation. Explain the affected goal using the actual asset and consequence, not just the acronym.</p>"
    ],
    [
      "Distinguish the AAA questions",
      "<table><tr><th>Function</th><th>Question</th><th>Limit</th></tr><tr><td>Authentication</td><td>What identity/credential is being accepted?</td><td>Accepted credentials may have been compromised</td></tr><tr><td>Authorisation</td><td>What may that identity do here?</td><td>Permission to read need not include export/delete</td></tr><tr><td>Accounting</td><td>What activity is recorded for review?</td><td>Logs need integrity/context; an account name is not proof of the human actor</td></tr></table><p>Follow the table's three questions: who is being accepted, what may they do, and what activity is recorded? These are the <strong>AAA</strong> functions: authentication, authorisation and accounting. Accounting here means audit records, rather than financial bookkeeping.</p><p>For A01, the system allows an export but denies deletion. This shows that permissions can differ by action. It does not prove the export was appropriate: an overly broad export permission could still expose confidential records.</p><p>A unique account gives you a better starting point than a shared account, but the account name does not prove which person acted. Credentials or sessions may have been stolen. Check the job purpose, permissions and surrounding evidence.</p><p>Keep useful timestamps and correlation labels so you can connect related events. Protect the logs and record enough context for review. Never log passwords or reusable secrets.</p>"
    ],
    [
      "Classify threats without treating labels as proof",
      "<table><tr><th>Threat / category</th><th>Mechanism</th><th>Scenario clue</th></tr><tr><td>Phishing / social engineering</td><td>Deceptive communication prompts disclosure or an unsafe action</td><td>A message asks a staff member to use an unverified login link</td></tr><tr><td>DoS / DDoS</td><td>Resource exhaustion disrupts service; distributed sources can contribute</td><td>Requests overwhelm booking service; a surge alone does not prove attack</td></tr><tr><td>Back door</td><td>Access path bypasses the intended controls</td><td>Undocumented remote support account remains enabled</td></tr><tr><td>IP spoofing</td><td>Source IP information is falsified</td><td>A packet claims a trusted source; an IP label is not user authentication</td></tr><tr><td>SQL injection</td><td>Untrusted data changes the intended SQL command</td><td>Application builds query text from input instead of binding values</td></tr><tr><td>Man-in-the-middle</td><td>An intermediary intercepts or alters communication</td><td>Endpoint/connection trust is not verified; encryption alone without authentication can be insufficient</td></tr><tr><td>Cross-site scripting (XSS)</td><td>Untrusted content executes in a user browser under a site context</td><td>A web page treats submitted text as active markup/script; distinct from SQL injection</td></tr><tr><td>Virus</td><td>Malicious code attaches to a host and spreads when it is executed</td><td>An infected file is shared and run</td></tr><tr><td>Worm</td><td>Malicious code can self-propagate between systems</td><td>A vulnerable network service helps automated spread</td></tr><tr><td>Trojan horse</td><td>Malicious behaviour is disguised as legitimate software</td><td>A claimed utility contains unwanted access code</td></tr><tr><td>Spyware</td><td>Covert monitoring/collection</td><td>A device collects user activity without appropriate permission</td></tr><tr><td>Adware</td><td>Unwanted advertising/tracking behaviour</td><td>A bundled application injects adverts; not every advert is malware</td></tr><tr><td>Ransomware</td><td>Extortion can involve data encryption, theft or both</td><td>Files become unavailable and disclosure is threatened</td></tr><tr><td>Physical threats</td><td>Theft, damage or unauthorised physical access</td><td>A device is lost or a server room is accessible</td></tr><tr><td>Zero-day vulnerability</td><td>A previously unknown vulnerability can be exploited before a remedy is available; a known unpatched flaw is not automatically zero-day</td><td>Do not label a routine failure zero-day without evidence</td></tr><tr><td>Internal threats</td><td>Credential compromise, device loss or employee misuse</td><td>An authorised account exceeds its permitted purpose; insider does not mean every act is malicious</td></tr></table><p>Categories can overlap: a Trojan can deliver spyware or ransomware; stolen credentials can enable internal-looking misuse by an external actor. Classify mechanism and evidence, and keep accidental loss/mistakes separate from unsupported intent claims. Do not assume every failed login is phishing or every unusual outage is a zero-day exploit.</p><p>SQL injection changes database command interpretation; XSS runs untrusted content in browser context. Parameterised values address the former, while context-appropriate safe output/encoding is relevant to the latter. Neither control is a complete access-policy or security solution.</p>"
    ],
    [
      "Read a synthetic event sequence",
      "<p>Read the events in time order. Z marks UTC time. The session labels are invented labels for connecting events; they are not usable tokens. The IP addresses come from documentation ranges.</p><ol><li>Two authentication attempts are denied.</li><li>One authentication is accepted.</li><li>The server records an allowed export of 500 rows.</li><li>A deletion is denied.</li><li>Another account changes attendance.</li></ol><p>An allowed export tells you the server's reported action and row count. It does not show where someone later saved or forwarded the records. Check the role, job purpose, device/session context and destination evidence. The failed logins could be mistakes or an attack attempt; this sequence alone cannot decide.</p><p>Compare the monitoring snapshots: 400 requests/minute and a 2500 ms response time, against a baseline of 20 requests/minute and 200 ms in a comparable window. This supports investigating availability. Check workload, errors, infrastructure and scheduled activity before claiming DoS, DDoS or malicious intent. Two snapshots are not a statistical trend.</p>"
    ],
    [
      "Build an evidence-based incident hypothesis",
      "<table><tr><th>Step</th><th>What to record</th></tr><tr><td>Observation</td><td>Exact event, timestamp, asset and measured value</td></tr><tr><td>Hypothesis</td><td>Mechanism that could explain the observation</td></tr><tr><td>Alternative</td><td>A plausible non-malicious or different cause</td></tr><tr><td>Next evidence</td><td>A source/check that distinguishes explanations</td></tr><tr><td>Response</td><td>An authorised proportionate action and its effect</td></tr><tr><td>Residual uncertainty</td><td>What remains unknown after the action</td></tr></table><p>Write an observation before proposing its cause. For example: “The log records an allowed export.” A <strong>hypothesis</strong> is a possible explanation you can test, such as compromised credentials. A legitimate staff task is an alternative.</p><p>Use the table to choose the next evidence. For this export, seek role approval, confirmation through an established user channel, device/session context and export records. Those checks can help distinguish the explanations. Do not use an unverified contact address from a suspicious message.</p><p>Follow the organisation's incident process and escalate to authorised staff. Keep the original logs and analyse a review copy. Record collection time, time zone, source and who handled the evidence. Clock differences, missing events, retention, tampering and shared accounts can all limit your conclusion.</p><p><strong>Containment</strong> means limiting further harm. Plan it so you preserve useful evidence and consider service impact. Your role in this activity is to analyse the paper case, rather than take operational action.</p>"
    ],
    [
      "Link a mitigation to its purpose and limit",
      "<p>Match your proposed <strong>mitigation</strong>—an action that reduces risk—to the weakness you are investigating. Name the CIA goal or AAA function it addresses, then explain what it leaves unresolved.</p><ul><li>Possible credential misuse: stronger authentication and account/session review may help.</li><li>Excessive export rights: change authorisation as well; stronger login checks alone leave those rights in place.</li><li>Incorrect attendance: verify the source and make authorised, auditable corrections. A backup alone does not establish the right value.</li></ul><p>Count the log events manually before checking them with the offline summariser. The helper can count recorded actions. It cannot establish the human actor, malicious intent or a breach by itself. Carry those limits into your comparison of controls and remaining risks in the next chapter.</p>"
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
      "<p>Start with the weakness you identified. If a learner can export every record, ask which control would stop that operation. “Install security software” is too broad to explain the change you need.</p><p>For each proposal, state what it changes, where it acts and how you will check it. Then classify its main purpose:</p><ul><li><strong>Preventive:</strong> reduce an opportunity for harm.</li><li><strong>Detective:</strong> reveal activity that needs attention.</li><li><strong>Corrective or recovery:</strong> repair the cause or restore the service.</li></ul><p>One control can serve several purposes. Combine people, processes and technology, then explain the remaining risk and operating cost. Use two explicit Week 7 security lessons; the other two lessons remain database workshops. Your checks are fictional paper/offline predictions, rather than changes to a school system.</p>"
    ],
    [
      "Compare the required control families",
      "<table><tr><th>Control</th><th>Purpose</th><th>Implementation/evidence</th><th>Limit</th></tr><tr><td>Log analysis</td><td>Detect/corroborate activity and support investigation</td><td>Protect log access/integrity, synchronise time, review context</td><td>Missing events or compromised/shared accounts weaken conclusions</td></tr><tr><td>Anti-malware</td><td>Detect/block known or suspicious malicious behaviour</td><td>Updates, managed configuration, test detection and recovery</td><td>False positives/negatives; not every new threat is recognised</td></tr><tr><td>Firewall filtering</td><td>Control traffic crossing a defined boundary</td><td>Narrow required flows, correct placement/order, positive/negative tests</td><td>Allowed traffic can still carry harmful content; bypass paths matter</td></tr><tr><td>Access control lists</td><td>Permit actions/traffic according to explicit rules</td><td>Identify subject/resource/action or network flow and default policy</td><td>Network ACL and application permissions solve different problems</td></tr><tr><td>Intrusion prevention system</td><td>Inspect traffic and block matching suspicious activity</td><td>Placed in relevant path; tune alerts/rules and test availability impact</td><td>False positives can disrupt service; encrypted/unseen traffic limits inspection</td></tr><tr><td>VPN</td><td>Protect a tunnel between authenticated endpoints</td><td>Approved tunnel/configuration and restricted authenticated access</td><td>Does not secure a compromised endpoint or grant correct application rights</td></tr><tr><td>User training</td><td>Improve recognition/reporting and safe decisions</td><td>Scenario practice, established reporting channels and feedback</td><td>Training alone cannot remove unsafe system design</td></tr><tr><td>ICT code of conduct</td><td>Set agreed user/developer responsibilities</td><td>Clear rules, review, support and proportionate enforcement</td><td>A signed document is not proof of technical enforcement</td></tr><tr><td>Physical security</td><td>Reduce theft, damage and unauthorised access</td><td>Controlled equipment access, device protection and asset procedures</td><td>Physical protection alone does not encrypt data or stop remote compromise</td></tr><tr><td>Supporting controls</td><td>Reduce exposure and improve recovery</td><td>Least privilege, stronger authentication, patching, tested protected backups</td><td>Each needs maintenance and evidence; no single checklist guarantees safety</td></tr></table><p>Match controls to the mechanism. A VPN may protect a remote tunnel, but cannot repair malicious code already running on an endpoint. A backup can support recovery but does not undo confidentiality loss. An IPS is an active blocking control; an IDS typically detects/alerts. Products can combine functions, so examine actual configuration.</p>"
    ],
    [
      "Write narrow traffic rules and inspect order",
      "<table><tr><th>Rule</th><th>Source</th><th>Destination</th><th>Protocol/port</th><th>Action</th></tr><tr><td>R1</td><td>Visitors</td><td>Internet</td><td>TCP/443</td><td>allow</td></tr><tr><td>R2</td><td>Staff</td><td>App</td><td>TCP/443</td><td>allow</td></tr><tr><td>R3</td><td>Staff</td><td>Printer</td><td>TCP/631</td><td>allow</td></tr><tr><td>R4</td><td>Visitors</td><td>Internal</td><td>any/any</td><td>deny</td></tr></table><p>Trace each proposed connection down the rule table. This model uses the <strong>first matching rule</strong>: once a rule matches, its allow or deny action decides. Unlisted new connection initiation is denied.</p><p>Suppose you place a broad Visitor-to-any allow before R4. An internal request matches that early allow, so it never reaches R4's deny. The deny is <strong>shadowed</strong>. Check rule order and the actual path traffic takes, rather than trusting a rule's label.</p><p>The web examples model TCP port 443. HTTP/3 can need UDP port 443, which this model denies unless you add a rule. A port number alone does not establish the application or prove encryption.</p><p>A real policy also needs decisions about DNS, DHCP, established return traffic, IPv4/IPv6 and bypass paths. Those are outside this small model. Do not claim that the model automatically configures or solves them.</p>"
    ],
    [
      "Separate identity, role and resource scope",
      "<table><tr><th>Role</th><th>Action</th><th>Scope</th></tr><tr><td>Guest</td><td>view</td><td>public</td></tr><tr><td>Learner</td><td>view</td><td>own</td></tr><tr><td>Facilitator</td><td>view</td><td>assigned</td></tr><tr><td>Facilitator</td><td>update_attendance</td><td>assigned</td></tr><tr><td>Registrar</td><td>view</td><td>all</td></tr><tr><td>Registrar</td><td>export</td><td>all</td></tr></table><p>Separate two questions: “Can this device reach the app?” and “May this user export these records?” A network rule can allow the connection without granting the application operation.</p><p>Read each row as a role, an action and a record scope. A Learner may view their own bookings. A Facilitator may update attendance for assigned sessions. A Registrar may export within the agreed all-record scope. Unlisted combinations are denied in this model.</p><p>The matrix assumes trusted identity, role and scope checks. A browser sending “Registrar” or “own” does not establish either claim. In a real app, use authenticated identity, server-side assignments and the requested record to verify permission.</p><ol><li>Identify the authenticated user.</li><li>Check their permitted action and access to this particular resource.</li><li>Make the decision for this operation and keep an appropriate audit trail.</li></ol><p>The classroom SQLite project does not implement this login or role system.</p>"
    ],
    [
      "Evaluate detection and operational impact",
      "<p>Compare what you expected with what the evidence shows. An alert means something needs review; it is not proof of compromise. A blocked event shows one decision; it does not prove that every malicious event was blocked.</p><p>Two useful terms describe mistakes:</p><ul><li>A <strong>false positive</strong> treats legitimate activity as a threat. It can block required work.</li><li>A <strong>false negative</strong> misses harmful activity. The absence of an alert is not proof of safety.</li></ul><p>Test both permitted and prohibited cases. Check the timing, source, integrity and connections between log events. Decide who reviews alerts and preserves useful evidence. When tuning an IPS, consider what it can see and whether a change disrupts service. A broad exception may restore one workflow while reopening the original risk.</p><p>For the export case, combine appropriate authentication with narrower role permissions and monitoring. Check that an authorised export works and a learner all-export is denied. A control must protect data while preserving required functionality.</p>"
    ],
    [
      "Plan an authorised incident response",
      "<p>Use the organisation's response plan and authorised contacts. The aim is to limit harm, preserve evidence and restore a service you can trust.</p><ol><li>Establish the known facts and affected scope.</li><li>Escalate and preserve useful evidence.</li><li>Contain the problem in proportion to the risk and service impact.</li><li>Remediate the cause, then recover and verify the result.</li><li>Review what happened and improve the controls.</li></ol><p>These activities can overlap. For ransomware, an authorised plan may isolate affected assets, preserve evidence and identify a safe restore point. Address the cause before restoring. A successful restore does not establish that no records were disclosed.</p><p>For suspected credential misuse, authorised administrators may review or revoke sessions and access, investigate activity and repair the control gap. In this activity, you record proposed decisions; you do not disable accounts, isolate equipment or delete evidence. Use the responsibilities chapter to examine legal notification and testing scope rather than inferring duties from one alert.</p>"
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
      "<table><tr><th>Operation</th><th>Key roles</th><th>What it establishes</th></tr><tr><td>Symmetric encryption</td><td>Sender and recipient use shared secret key material</td><td>Efficient bulk confidentiality; authenticated encryption also detects alteration.</td></tr><tr><td>Public-key encryption</td><td>Encrypt for recipient using recipient public key; recipient decrypts with private key</td><td>Confidentiality to the intended private-key holder when the scheme is correctly used.</td></tr><tr><td>Digital signature</td><td>Signer signs using private key; others verify using corresponding public key</td><td>Integrity and evidence linked to the signing key; identity depends on trusted key binding.</td></tr><tr><td>Key agreement</td><td>Participants exchange public contributions and independently derive secret material</td><td>The shared secret is not transmitted directly; authentication is needed to prevent impersonation.</td></tr></table><p>Choose the operation before choosing a key. Sending a confidential message, proving who signed it and agreeing a secret are different jobs. The table separates their key roles.</p><p>For a digital signature, the signer uses a private key and others verify with the corresponding public key. This is not “encrypting the message with the private key”. The link between that key and a named person or server still needs trusted evidence.</p><p>You can distribute a public key, but must protect the private key. Possessing a server signing key is also different from authenticating a person's account.</p><p>A <strong>hybrid system</strong> combines methods. It can use public-key authentication and key agreement to establish trust and secrets, then use fast symmetric protection for the application data. Identify the job each part performs.</p>"
    ],
    [
      "Hashes are not encryption",
      "<p>Change a space or letter in the activity text and compare its SHA-256 digest. A <strong>cryptographic hash</strong> maps input bytes to a fixed-size fingerprint. This activity hashes UTF-8 bytes, so case and spaces matter.</p><p>A hash is not encryption. There is no decryption key, and a digest does not hide a message that an attacker can guess and hash for comparison.</p><p>To check a file for changes, compare it with a digest obtained through a trusted route. If an attacker replaces both the file and its untrusted digest, matching values do not prove authenticity. Digital signatures and keyed authentication provide different assurances.</p><p>Equal digests in this activity mean equal computed fingerprints. Collisions are possible in principle: different inputs can share a digest. A plain fast hash is also unsuitable for storing passwords. Real password storage needs a maintained implementation designed for salted password hashing.</p>"
    ],
    [
      "Explain certificates and trust",
      "<p>When you connect to a named server, you need evidence that its public key belongs to that name. A <strong>certificate</strong> supplies a signed binding between a public key and named information. The issuer signs it. The certificate contains public material, not the server's private key.</p><p>A client must check more than a matching name. It needs a trusted certificate chain, an acceptable validity period, the intended hostname, permitted use and the relevant implementation's revocation/status handling. The server's handshake signature then proves possession of the corresponding private key.</p><p>The fictional cards supply these facts for you to inspect. They do not compute signatures or build a real certificate chain. A matching hostname and date alone are insufficient.</p><p>A valid certificate does not prove that the business is honest, that every page is safe or that a user may export student records. Follow the approved support process for certificate warnings; do not bypass them.</p>"
    ],
    [
      "Trace a simplified TLS 1.3 connection",
      "<p>Trace the simplified TLS 1.3 flow as a sequence of jobs. This example uses certificate authentication and <strong>ephemeral key agreement</strong>: temporary key contributions help derive secrets for the connection.</p><ol><li>The client proposes supported parameters and sends a key share.</li><li>The server chooses parameters and sends its share. Both sides derive handshake secrets; they do not send those secrets directly.</li><li>The server sends protected certificate and authentication messages. The client checks them.</li><li>The handshake finishes. Derived symmetric traffic keys protect application records with authenticated encryption.</li></ol><p>The table connects each stage to its evidence. This is a simplified flow: it leaves out resumption, optional client certificates and early data.</p><p>TLS 1.3 does not transport a session key by encrypting it with the server's RSA public key. RSA signatures can serve a different role. HTTPS protects the configured connection; endpoint security and application authorisation still need their own controls.</p><table><tr><th>Stage</th><th>Evidence / protection</th><th>Common misconception</th></tr><tr><td>Hello / key shares</td><td>Public contributions; derived secrets are not sent directly</td><td>A server public key is not the session secret.</td></tr><tr><td>Certificate / handshake signature</td><td>Trusted name/key binding and possession of server private key</td><td>The certificate does not contain that private key.</td></tr><tr><td>Finished / application records</td><td>Handshake confirmation and symmetric authenticated encryption</td><td>Port 443 alone does not prove any of these checks occurred.</td></tr></table>"
    ],
    [
      "Apply the idea to a VPN and stored records",
      "<p>Mark the start and end of a VPN tunnel on your network drawing. The VPN protects traffic inside that configured tunnel between authenticated endpoints. Traffic outside the tunnel or after its endpoint needs separate analysis. HTTPS can still protect an application connection across several network segments.</p><p>Next, ask whether the data is moving or stored. <strong>Encryption in transit</strong> protects a communication path. <strong>Encryption at rest</strong> protects stored data under its configured conditions. Neither makes an infected device safe.</p><p>Find where the data becomes readable and who controls the keys. An unlocked stolen device or an authorised export may expose readable data despite encryption elsewhere. Restrict access to private and secret keys, and plan approved key rotation, revocation and recovery. Keep real private keys and student records out of the activity pack.</p>"
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
      "<p>Ask what the people in the case are entitled to expect. A developer can collect a field, but that does not mean they should. A system can allow an export, but that does not establish that its purpose is authorised or fair.</p><ul><li><strong>Ethics</strong> considers people, purpose, harm, fairness and accountability.</li><li><strong>Law</strong> sets obligations for the relevant entity and circumstances.</li><li><strong>Policy</strong> sets the organisation's operational expectations.</li></ul><p>One decision can involve all three. Work through the case in order: identify facts and missing facts; name stakeholders and likely effects; establish the entity, jurisdiction and date; apply the relevant principle to evidence; compare options; justify your action and remaining uncertainty. An incomplete alert does not prove a legal breach. Good intentions do not create permission.</p>"
    ],
    [
      "Identify whose privacy rules apply",
      "<p>The course teaches the Privacy Act 1988 and Australian Privacy Principles (APPs). Federal coverage depends on the entity and circumstances: it generally covers Commonwealth agencies and covered organisations, while state public schools are generally outside it. Private educational institutions may be covered. Our federal case cards explicitly assume an APP entity; this assumption must not be silently transferred to a WA public school. <a href=\"https://www.oaic.gov.au/privacy/your-privacy-rights/more-privacy-rights/government-agencies\">OAIC coverage guidance</a>.</p><p>WA context, checked 14 October 2026: most substantive privacy obligations under the Privacy and Responsible Information Sharing Act 2024 commenced on 1 July 2026. Its notifiable information breach obligations commence on 1 January 2027. WA Information Privacy Principles are a distinct state framework, not the federal APPs under a new name. Check the relevant entity, provisions, commencement and approved school process. <a href=\"https://www.wa.gov.au/government/privacy-and-responsible-information-sharing\">WA Government timeline and coverage</a>.</p>"
    ],
    [
      "Apply the five prescribed APPs",
      "<table><tr><th>Principle</th><th>Classroom summary</th><th>Evidence in the fictional booking system</th></tr><tr><td>APP 5: collection notification</td><td>Explain relevant collection facts at or before collection, or as soon as practicable afterwards.</td><td>Review the booking collection notice, including purposes and usual disclosures.</td></tr><tr><td>APP 8: overseas disclosure</td><td>Take reasonable steps concerning overseas recipients; exceptions and accountability need examination.</td><td>Check recipient, actual disclosure, safeguards and applicable exceptions before choosing a cloud service.</td></tr><tr><td>APP 10: information quality</td><td>Take reasonable steps for accuracy, currency and completeness; relevance also matters for use/disclosure.</td><td>Verify the attendance source and timestamp before acting on a report.</td></tr><tr><td>APP 11: information security</td><td>Protect held personal information and manage justified retention.</td><td>Test permissions, backups and appropriate disposal; encryption alone is insufficient.</td></tr><tr><td>APP 12: individual access</td><td>Provide requested access subject to applicable exceptions and procedures.</td><td>Use a verified access-request process, protecting other people’s information.</td></tr></table><p>Choose the principle that matches the action. The table summarises the five prescribed <strong>Australian Privacy Principles (APPs)</strong> and connects each to the booking case. More than one principle can apply to an event.</p><p>Keep these distinctions clear: APP 5 concerns collection notification, rather than a universal requirement for consent to every collection. APP 8 does not ban every overseas service. APP 12 concerns access to personal information; correction is covered separately by APP 13.</p><p>These summaries do not contain every condition or exception. Read the OAIC principle text when you apply a principle to a case. First establish that the case concerns an APP entity; do not transfer that assumption automatically to every school.</p><p>Reference: <a href=\"https://www.oaic.gov.au/privacy/australian-privacy-principles/read-the-australian-privacy-principles\">OAIC principle text</a>.</p>"
    ],
    [
      "Turn APP 11 into design evidence",
      "<p>For an entity covered by APP 11, turn “protect personal information” into actions you can check. Consider the sensitivity of the data, who can access it, the system design and the risk. Restricted exports, maintained authentication, useful logs, tested backups and staff processes may work together.</p><p>For each measure, finish two sentences: “This addresses the threat by …” and “I would verify it by …”. A written rule or HTTPS padlock alone does not show that the protection works.</p><p>APP 11 also deals with destroying or de-identifying information that is no longer needed, subject to its conditions and record/legal retention requirements. Do not delete records simply because a project ends. First check the authorised retention schedule, evidence holds and backup handling. Deleting a live row does not remove every copy.</p><p>Related reading: <a href=\"https://www.oaic.gov.au/privacy/australian-privacy-principles/australian-privacy-principles-guidelines/chapter-11-app-11-security-of-personal-information\">OAIC APP 11 guidance</a>.</p>"
    ],
    [
      "Assess a federal notifiable breach case",
      "<p>The Privacy Amendment (Notifiable Data Breaches) Act 2017 introduced the federal NDB scheme into the Privacy Act. For our assumed covered entity, an eligible breach generally involves unauthorised access/disclosure, or loss likely to lead to it, with likely serious harm; effective remedial action can prevent a breach becoming eligible. Eligible breaches require notification to the OAIC and affected individuals under the scheme. <a href=\"https://www.oaic.gov.au/privacy/notifiable-data-breaches/about-the-notifiable-data-breaches-scheme\">OAIC NDB overview</a>.</p><p>On reasonable suspicion, the entity assesses the circumstances expeditiously and takes reasonable steps to complete that assessment within 30 calendar days. This is an assessment limit, not permission to ignore the event or wait 30 days to notify an already-established eligible breach. Escalate promptly, preserve necessary evidence and reduce harm through authorised responders. Students propose a response on paper; they do not send notices. <a href=\"https://www.oaic.gov.au/privacy/notifiable-data-breaches/quick-reference-guide-for-responding-to-data-breaches\">OAIC response guide</a>.</p><p>An export log alone does not establish recipient, disclosure or likely serious harm. A clean restore does not settle disclosure. The federal scheme and WA’s differently timed state scheme must be analysed separately; other response duties and policy still matter before a notification provision starts.</p>"
    ],
    [
      "Collect and analyse data responsibly",
      "<p>Write the purpose before choosing data fields. A workshop booking needs a member identifier and session details. It does not automatically need a home address, health history or social-media profile. Collect what the purpose requires, explain its use, restrict access and decide who controls it and sets retention.</p><p>Look for patterns carefully. <strong>Data mining</strong> searches datasets for patterns or relationships. Attendance patterns might help plan workshop times, but missing records, biased participation, small samples and uncertain sources can mislead you. A correlation does not establish that a student lacks motivation.</p><p>Compare an aggregate report used to offer support with individual profiling used to impose a penalty. Their evidence, fairness and consequences differ. Claiming ownership of the data does not remove other people's rights or permit every use.</p><p>Removing names does not necessarily make rows anonymous. Pseudonymous IDs and rare combinations may still identify people. The offline activity counts fictional bookings and displays “suppressed” for a small group. This illustrates minimisation and disclosure risk; its threshold is an arbitrary teaching choice, not legally sufficient anonymisation. Repeated releases, totals and outside knowledge may reveal hidden values.</p><p>Acknowledge the source, date, transformations and limits without publishing personal rows.</p>"
    ],
    [
      "Explain ethical hacking and team roles",
      "<table><tr><th>Role</th><th>Purpose</th><th>Evidence of improvement</th></tr><tr><td>Red team</td><td>Emulate adversary behaviour within an authorised engagement.</td><td>Documented findings, impact, scope and reproducible evidence.</td></tr><tr><td>Blue team</td><td>Defend, monitor, detect and respond.</td><td>Detection/response evidence and verified control changes.</td></tr><tr><td>Shared review</td><td>Compare findings, remediate and retest.</td><td>Reduced demonstrated weaknesses with stated testing limits.</td></tr></table><p>Related reading: <a href=\"https://csrc.nist.gov/glossary/term/red_team_blue_team_approach\">NIST team definitions</a> · <a href=\"https://legislation.wa.gov.au/legislation/statutes.nsf/law_a196.html&amp;view=consolidated\">current WA Criminal Code</a>.</p><p>Use the table to distinguish red-team testing from blue-team defence. An authorised red team emulates adversary behaviour within an agreed engagement. A blue team defends, monitors, detects and responds. A shared review connects findings to repairs and retests.</p><p><strong>Ethical hacking</strong> is authorised testing with responsible reporting. Before testing, agree the owner's authority, targets, time window, techniques, exclusions, data handling, stop conditions and contacts. Permission for one classroom lab does not cover the school network, third-party services or another student's account.</p><p>Your red group proposes failures using supplied paper cards. Your blue group identifies evidence and controls. There is no scanning, exploitation or operational change. Report through agreed channels and avoid unnecessary exposure of personal data or exploit details.</p><p>A penetration test and a wider red-team exercise may have different goals. Passing a limited test does not establish complete security.</p>"
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
      "<p>Read the model before writing a query. Its six tables are Instructor, Workshop, Session, Member, Booking and Attendance. A booking uses the pair MemberID and SessionID as its key. Attendance references that same pair, so it must belong to a booking that exists.</p><p>A booking can have zero or one attendance record. No record means unrecorded; Present = 0 means a recorded absence. Draw both directions of each relationship and check the crow's-foot symbols against course conventions.</p><p>An <strong>invariant</strong> is a rule that must stay true as the data changes. For the supplied dependencies, find facts that depend on part of a key and facts that depend indirectly on another non-key identifier. Decompose the flat sheet to 3NF and explain how that avoids repeated conflicting names and titles.</p><p>Separate enforced rules from intended business rules. Positive Capacity does not stop overbooking. Storing a date as text does not check that it is a real calendar date.</p><p>Related reading: <a href=\"#unit4-design\">Revisit database design</a>.</p>"
    ],
    [
      "Predict reports before running SQL",
      "<table><tr><th>Session</th><th>Capacity</th><th>Bookings</th><th>Places left</th></tr><tr><td>S01</td><td>3</td><td>3</td><td>0</td></tr><tr><td>S02</td><td>2</td><td>1</td><td>1</td></tr><tr><td>S03</td><td>2</td><td>2</td><td>0</td></tr><tr><td>S04</td><td>4</td><td>0</td><td>4</td></tr><tr><td>S05</td><td>2</td><td>1</td><td>1</td></tr></table><p>Related reading: <a href=\"#unit4-sql\">Revisit advanced SQL</a>.</p><p>Use the table to predict the report before running SQL. Each row represents a session. You need five reports: a four-table booking label; counts and places left for every session; attendance including unrecorded values; full sessions using HAVING; and scheduled capacity per workshop. Use aliases and deterministic sorting.</p><p>For a session with no bookings, COUNT(*) counts the outer-join placeholder. Count a non-null child key to get zero bookings. For W01, summing session capacity after joining bookings gives 11 instead of 5 because the join repeats session values.</p><p>SUM(DISTINCT Capacity) is not a general repair. W02 has two different sessions with capacity 2, so DISTINCT gives 2 rather than the required 4. Decide the report's grain—the entity represented by a row—before choosing an aggregate.</p><p>Attendance needs both parts of the booking key. Joining only on member can attach the member's attendance from another session. A WHERE Present = 1 condition also removes bookings that an all-booking report must retain.</p>"
    ],
    [
      "Explain transactions, connectivity and recovery",
      "<p>Trace a request through the application, the database interface, parameterised SQL, the transaction and the returned result or error. Name each part's job. Python sqlite3 is a DB-API interface; ODBC is a different connection route.</p><p>Suppose the operation inserts a booking and then attendance. If attendance fails, explicitly roll back the logical operation so the earlier booking insert does not remain. One failed statement does not necessarily undo previous statements.</p><ol><li>Use disposable in-memory copies to try invalid Present values, duplicate pairs and attendance without a booking.</li><li>Check what a cascade deletes and what it leaves intact.</li><li>Explain a test in which requests compete for the last place.</li><li>Test a saved restore separately by reopening it and comparing evidence.</li></ol><p>Passing an in-memory check does not establish saved-file recovery or crash durability.</p><p>Related reading: <a href=\"#unit4-project\">Revisit database development and evaluation</a>.</p>"
    ],
    [
      "Analyse a proposed web deployment with evidence",
      "<p>Keep the prototype and the proposed deployment separate. The classroom SQLite model has no implemented website or login. In the hypothetical website, the app trusts role and scope strings sent by the browser.</p><p>The log records a learner-labelled export allowed with 250 records returned, followed by a denied export. Those are observations. They do not establish the person's identity, recipients, intent or harm.</p><ol><li>Use CIA/AAA to name the risk and the missing evidence.</li><li>Propose trusted server-side permission checks, controlled exports and useful logs.</li><li>Test an allowed Registrar export and a denied Learner all-export.</li><li>Compare that policy with blocking every export, including the effect on legitimate work.</li></ol><p>A record count does not prove external disclosure. An IP address does not identify a person. A clean restore does not settle confidentiality loss. Use paper red/blue roles to review the case; do not test a real network.</p><p>Related reading: <a href=\"#unit4-analysis\">Analysis</a> · <a href=\"#unit4-controls\">Controls</a>.</p>"
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
      "<p>Use a changed case to find out whether your reasoning transfers. The fresh cards add two bookings to the empty session, change a repeated capacity, remove legal assumptions or introduce item loans. Predict the effect before running code or explaining the result.</p><p>Retrieve earlier Unit 3 ideas too. State what binary search needs before it can work. Trace a loop over [1,0,None,1] that counts only explicit ones. Explain which class and database rules can be bypassed and where each must be enforced.</p><p>Keep the first attempt, your explained correction and a fresh independent retry separate. Record demonstrated, needs retry or not yet evidenced for each criterion. Use that evidence to choose two priorities for Weeks 13–14 consolidation. Teacher review of diagrams, current sources and suitability for any assessment use remains necessary.</p>"
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
      "<p>Try the diagnostic before opening its answers. It has eight items with two criteria each, for 16 indicative marks. The items sample aliasing, binary search, sorting, objects, SQL, transactions, networking and secure data use.</p><p>Use each missed criterion to ask what caused the difficulty. Did you need an earlier skill? Did you use the wrong mental model, leave out part of an explanation or lack evidence?</p><ol><li>Compare the attempt with your earlier independent work.</li><li>Record demonstrated, needs retry or not yet evidenced for each criterion.</li><li>Choose two specific causes using repeated evidence and their consequences.</li></ol><p>A total score can hide an important misconception. It does not tell you which explanation will help, define a grade or prove full-course readiness.</p>"
    ],
    [
      "Repair Python structures and algorithm reasoning",
      "<p>Begin with a small grid and trace which rows change. In [[0]*2]*2, both outer entries refer to the same inner row. Build independent inner rows so changing one row leaves the other alone.</p><p>For your row-total function, define what should happen with an empty grid, empty rows and invalid values. The intended grid is rectangular and contains non-negative integer counts. Keep the input unchanged and test the contract—the promised input and output behaviour.</p><p>Next, trace binary search on sorted, comparable data. Try found and missing targets and an empty list. Its logarithmic comparison bound assumes sorted input. Sorting or checking that input takes additional work.</p><p>Trace stable insertion sort on a shallow copy. Explain why strict comparisons preserve equal-key order and how the best and worst cases differ. Compare the actual bubble- and selection-sort mechanisms rather than memorising one complexity label.</p><p>Related reading: <a href=\"#unit3-structures\">Structures</a> · <a href=\"#unit3-search\">Searching</a> · <a href=\"#unit3-sort\">Sorting</a>.</p>"
    ],
    [
      "Repair object behaviour and testing",
      "<p>Build Session one behaviour at a time. Validate capacity, track the booking count, calculate remaining places and make reserve refuse a full session. Test the boundary between one place left and no places left.</p><p>Then make OnlineSession override location. Call location on different session objects in the same loop. Selecting each object's version of the method is <strong>polymorphism</strong>. Explain what the subclass inherits and what it replaces.</p><p>An underscore attribute signals intended internal use; it is not a security boundary. Direct writes can bypass your methods. Passing a class test does not establish server authorisation, concurrent-booking safety or database enforcement.</p><p>Choose evidence that matches the claim. A <strong>unit test</strong> checks a component; an <strong>integration test</strong> checks parts working together. Acceptance evidence checks the required workflow. Recovery evidence checks whether you can restore usable data.</p><p>Related reading: <a href=\"#unit3-inheritance\">Objects and inheritance</a> · <a href=\"#unit3-reliability\">Reliable software</a>.</p>"
    ],
    [
      "Transfer database knowledge to a different model",
      "<p>Transfer your database reasoning to Category, Resource, Member, Loan and Inspection. A person can borrow the same resource again, so the resource/person pair does not identify a single event. LoanID identifies each loan.</p><p>Follow the supplied dependencies before decomposing the flat sheet. A single-column LoanID has no smaller part that could cause a partial-key dependency. Repeated resource, category and member names can still create transitive dependencies. Draw the PK/FK relationships and show that ReturnDate is optional.</p><p>Use the table to predict an all-resource report and a four-table active-loan label. A resource with no loan is preserved by an outer join, with NULL child fields. Its NULL ReturnDate does not make it an active loan: count an actual LoanID that satisfies the active condition.</p><p>If you join both loans and inspections, one resource can appear in several combinations. Aggregate each child collection before joining to avoid multiplied totals. Test domain and FK errors and explicit rollback. Calendar validity, date order and one-active-loan rules need additional enforcement.</p><table><tr><th>Resource</th><th>Total loans</th><th>Active loans</th></tr><tr><td>R01</td><td>2</td><td>1</td></tr><tr><td>R02</td><td>1</td><td>1</td></tr><tr><td>R03</td><td>1</td><td>0</td></tr><tr><td>R04</td><td>0</td><td>0</td></tr></table><p>Related reading: <a href=\"#unit4-review\">Integrated review</a> · <a href=\"#unit4-sql\">SQL</a>.</p>"
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
      "<p>Practise a repair in three stages: follow one worked example, try a guided variation, then attempt a changed task without the answer. Change matrix or search values, use another subclass, add a loan, enlarge a subnet or alter the legal assumptions.</p><p>Explain why your method meets the new requirement. Then name a test that could show your repair is still wrong. This checks your reasoning more closely than repeating the original answer.</p><p>Try again in a later lesson. This <strong>delayed retry</strong> checks whether you can retrieve the idea after time has passed. Keep the original attempt, explained correction and independent work distinct. A supplied reference program passing its checks shows that example works; it does not show what you can do independently.</p><p>Use unresolved causes to choose short Weeks 15–16 revision tasks and teacher support. This adds no new project work.</p>"
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
      "<p>Read the question once for its topic, then again for the action it asks you to perform. Underline the command, the scope and every requested part.</p><ul><li><strong>Identify:</strong> name the relevant point.</li><li><strong>Explain:</strong> connect how or why something happens.</li><li><strong>Compare:</strong> give meaningful similarities and differences.</li><li><strong>Justify:</strong> support a choice using requirements and evidence.</li></ul><p>Use the supplied source rather than listing everything you remember. For SQL, decide which rows are required before writing syntax. For a trace, record changing variable values. For a design, label keys, relationships or addresses and explain your assumptions.</p><p>The 2025 candidate report highlights difficulties applying ideas to unfamiliar and multi-part tasks. You can use that advice while recognising that the past paper's structure is historical.</p><p>Related reading: <a href=\"https://senior-secondary.scsa.wa.edu.au/__data/assets/pdf_file/0019/1242532/2025-ATAR-course-examination-report-CSC-public-version.PDF\">2025 candidate report</a>.</p>"
    ],
    [
      "Plan time by the actual task",
      "<p>Plan each lesson-size sample as five minutes reading, forty working and five checking. Within the working time, use about sixteen minutes for the eight short-answer marks and twenty-four for the twelve extended-answer marks. These are illustrative checkpoints; adjust them using evidence about where you need time.</p><p>These miniature timings are not the official three-hour pacing rule. Read the actual task and attempt every part. If you are blocked, write a useful partial step and return later. Keep time to check your work.</p><p>Use a concrete checking list: joins, zero/NULL cases, loop boundaries, subnet ranges, labels and source assumptions. A mark count suggests the scope of an answer, but disconnected keywords do not replace an explanation.</p>"
    ],
    [
      "Attempt original mixed practice",
      "<p>Set A combines dictionary tracing, an all-resource report, subnet planning/diagnosis and an export-security case. Set B changes emphasis to object behaviour, active-loan counting, writing a validated accumulator and normalised design/transaction evidence. Both use a self-contained fictional source booklet and fresh exam SQL seed.</p><p>Attempt on paper before running reference code or opening the marking key. Record uncertainty and incomplete parts. Different set scores are not an equivalent-paper measure of improvement: compare the specific criteria and independent transfer instead. <a href=\"#unit4-consolidation\">Return to consolidation</a> when a prerequisite needs repair.</p>"
    ],
    [
      "Mark a criterion and explain its cause",
      "<p>Compare your original answer with the explained criteria. The key gives indicative marks and accepts equivalent correct approaches. Keep the original response so you can see what changed.</p><ol><li>Identify a cause: missing content, misread command, weak source use, tracing, syntax or pacing.</li><li>Explain one repair in your own words.</li><li>Try a changed task without the key.</li><li>Retrieve the same reasoning again in a later attempt.</li></ol><p>A copied correction does not show an independent attempt. A passing reference query validates that example, rather than your understanding. Judge improvement from fresh work and explanations. Diagrams, suitability for any assessment use and actual student work still need teacher review.</p>"
    ],
    [
      "Transfer to a changed case",
      "<p>Change the case before reusing a method. The fresh retries alter accumulator rows, search targets, loan data, subnet sizes and privacy assumptions. Predict what the change will do before calculating or executing.</p><p>Check the method's <strong>preconditions</strong>—the facts it needs to be valid. Binary search needs sorted, compatible data. A NULL date alone does not establish an active loan. An export log alone does not prove external disclosure or legal notification eligibility.</p><p>For a privacy response, state the entity and date assumptions. An established eligible federal breach calls for a different conclusion from a suspicious event with missing facts. Thirty days is not a blanket notification waiting period. Consult the responsibilities chapter and current guidance before applying the rule.</p><p>Related reading: <a href=\"#unit4-ethics\">Privacy and law</a> · <a href=\"#unit4-crypto\">Secure communication</a>.</p>"
    ],
    [
      "Make a manageable readiness plan",
      "<p>Choose two specific remaining priorities from your own work. For each, record the evidence, one short next task and what a successful attempt would show. Use demonstrated, needs retry or not yet evidenced. No sample percentage guarantees examination readiness.</p><p>Use Week 16's final lesson to retrieve ideas after a delay, review evidence and prepare practically. Confirm teacher support and approved access arrangements. Check the actual school and current SCSA instructions rather than relying on remembered rules.</p><p>Confirm the venue, timetable and permitted materials through the school. Keep revision manageable and finish project work before the examination block. Coverage &amp; audits links to the Unit 4 syllabus map; independent review and learner evidence still need checking.</p>"
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
