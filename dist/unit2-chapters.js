chapters.push({
  "id": "database-foundations",
  "unit": 2,
  "week": 1,
  "title": "Relational database foundations",
  "badge": "DATA MANAGEMENT",
  "next": "#plan-2-1",
  "intro": "A loan record is useful only when you can turn it into a trustworthy answer. Explore how organising data helps a school equipment desk answer questions and maintain records.",
  "objectives": [
    "Distinguish data from information in a stated context.",
    "Compare a flat-file approach with a relational design.",
    "Distinguish a database from a DBMS and an RDBMS.",
    "Explain data independence and the role of software in managing access."
  ],
  "sections": [
    [
      "Start with a question",
      "<p>The equipment desk needs to know which items are still on loan and which are overdue. It records a loan identifier, borrower identifier, item identifier, due date and return status. These stored values are data. Interpreting them using a question and a rule produces information.</p><p>“2026-04-06” alone does not say whether an item is overdue: we also need today’s date and whether it has been returned. For this activity, assume <strong>today is 8 April 2026</strong>, regardless of the real date. An overdue loan is unreturned and has a due date strictly before today. An item due today is not overdue under this rule.</p><p>Requirements determine the rule. A different school might define a time-of-day deadline, so clarify the requirement before building a report.</p>"
    ],
    [
      "Inspect the flat-file starter",
      "<p>A flat file stores records in a single tabular structure. Our CSV has one row per loan and one header row naming its fields. CSV is a text format; it does not by itself enforce database relationships or permissions. Opening it in a spreadsheet does not automatically make it a relational database.</p><div class=\"table-scroll\"><table><thead><tr><th>LoanID</th><th>BorrowerID</th><th>BorrowerLabel</th><th>EquipmentID</th><th>EquipmentDescription</th><th>DueDate</th><th>Returned</th></tr></thead><tbody><tr><td>L001</td><td>B001</td><td>Learner A</td><td>E01</td><td>Camera</td><td>2026-04-06</td><td>False</td></tr><tr><td>L002</td><td>B002</td><td>Learner B</td><td>E02</td><td>Tripod</td><td>2026-04-08</td><td>False</td></tr><tr><td>L003</td><td>B001</td><td>Learner A</td><td>E03</td><td>Recorder</td><td>2026-04-07</td><td>True</td></tr><tr><td>L004</td><td>B003</td><td>Learner C</td><td>E04</td><td>Camera</td><td>2026-04-10</td><td>False</td></tr><tr><td>L005</td><td>B002</td><td>Learner B</td><td>E02</td><td>Tripod</td><td>2026-04-04</td><td>True</td></tr><tr><td>L006</td><td>B004</td><td>Learner D</td><td>E05</td><td>Microphone</td><td>2026-04-07</td><td>False</td></tr></tbody></table></div><p>All borrower labels are synthetic. True and False in the CSV are text representations of return status; imported data needs conversion according to the chosen database’s types. Dates use year-month-day notation.</p><p>Six rows represent six loans. E02 appears twice because an item can have a history of loans. Those two loans have different LoanIDs and return statuses. B001 appears twice because a borrower can borrow more than one item. Do not delete repeated identifiers without checking what the rows represent.</p><p><a class=\"button\" href=\"equipment-loans-flat.csv\" download>Download synthetic loan data</a></p>"
    ],
    [
      "Turn records into information",
      "<p>First filter out returned loans. The active LoanIDs are L001, L002, L004 and L006: four items are currently on loan. Compare the remaining due dates with 8 April. L001 and L006 are overdue: two items need follow-up.</p><table><tr><th>Record</th><th>Returned?</th><th>Due before today?</th><th>Overdue?</th></tr><tr><td>L001</td><td>No</td><td>Yes</td><td>Yes</td></tr><tr><td>L002</td><td>No</td><td>No: due today</td><td>No</td></tr><tr><td>L003</td><td>Yes</td><td>Yes</td><td>No</td></tr><tr><td>L006</td><td>No</td><td>Yes</td><td>Yes</td></tr></table><p>The conclusion “two overdue loans” is information for a stated date and rule. It is only as reliable as the recorded dates and return statuses. A valid-looking date can still be factually wrong.</p>"
    ],
    [
      "Why separate related facts?",
      "<p>A small single-file register is easy to inspect and exchange. As it grows, repeated facts become costly to maintain. If Learner B’s label changes, both L002 and L005 need editing. Changing only one leaves conflicting labels for the same BorrowerID. If the final loan for E05 is removed, this register also loses its only description of that item.</p><p>A relational design can store different kinds of facts in related tables. A Borrower table stores each borrower’s details. Equipment stores each item’s details. Loan stores each borrowing event and references the borrower and item through identifiers. Later chapters define keys, relationships and normalisation formally.</p><div class=\"steps\" aria-label=\"Related table responsibilities\"><span>Borrower: who</span><span>Loan: borrowing event</span><span>Equipment: which item</span></div><p>In this starter, the three sets contain four borrower records, five equipment records and six loan records. A loan still needs its own identifier because a borrower can borrow the same item again at a later time. This is a conceptual introduction, not the final four-table project design.</p><p>Separate tables reduce duplication when designed well; they do not automatically eliminate mistakes. Incorrect links, weak constraints or poorly designed tables can still produce unreliable results.</p>"
    ],
    [
      "Database, DBMS and RDBMS",
      "<p>A database is an organised collection of stored data. A database management system (DBMS) is software used to define, store, retrieve and change database data. A relational DBMS manages data using related tables. The stored data and the software performing operations have different roles.</p><p>A user or application asks the DBMS to perform an operation. The DBMS interprets the request, checks configured rules and accesses storage. Appropriate systems can manage permissions, constraints and concurrent operations; the exact facilities depend on the product and configuration. It is not enough to own a DBMS: controls must be set up and used correctly.</p><p>For our desk, a learner might view equipment availability while authorised staff record returns. A read-only report should not provide unrestricted editing. We will explore permissions and security more deeply later in Unit 2.</p><div class=\"notice\">One physical file does not mean flat-file organisation. SQLite can store several related tables inside a single database file. “Flat” describes the logical organisation, not how many files you see in a folder. SQLite also relies on application and operating-system controls for access; do not assume every RDBMS has server-style user accounts.</div><p>Technical references: <a href=\"https://www.postgresql.org/docs/current/tutorial-concepts.html\">PostgreSQL relational concepts</a> and <a href=\"https://www.sqlite.org/about.html\">SQLite architecture</a>.</p>"
    ],
    [
      "What does data independence mean?",
      "<p>Separating data from an application’s processing helps several tools use the same managed records. A report can ask for LoanID and DueDate through the DBMS without manually reading storage bytes. A physical change such as adding an index can improve retrieval without requiring the report to change its question.</p><p>Independence is not absolute compatibility. Renaming a column used by a report can require changes to that report. Moving to another DBMS may require data conversion and query changes. A backup or export remains valuable, but copying a database file does not mean every other DBMS can read it directly.</p><p>For the equipment desk, keep the data definition, business rules and storage separate from the screen layout. A new screen should not need a second inconsistent copy of borrower records.</p>"
    ],
    [
      "Choose an approach for the requirement",
      "<table><tr><th>Requirement</th><th>Reasoned choice</th></tr><tr><td>One small temporary list, one editor, simple exchange</td><td>A CSV may be sufficient if checking and access are manageable.</td></tr><tr><td>Borrower and equipment details reused across a growing loan history</td><td>Related tables help maintain those facts separately.</td></tr><tr><td>Several users editing simultaneously with different permissions</td><td>Choose and configure a system supporting the required concurrency and access controls.</td></tr></table><p>Justify the choice against the requirements, maintenance burden and risks. “Databases are always better” is not an explanation.</p>"
    ],
    [
      "Your first database workbook",
      "<p><a class=\"button\" href=\"database-foundations-workbook.md\" download>Download student workbook</a> <a class=\"button secondary\" href=\"database-foundations-answers.md\" download>Download explained answers</a></p><p>Begin with the supplied synthetic data and paper or a school-approved spreadsheet. No SQL setup is needed for this first chapter. SQL and database implementation follow after modelling and normalisation.</p>"
    ]
  ],
  "practice": [
    [
      "Interpret",
      "Why is L003 not overdue even though its due date is before 8 April?",
      "Its Returned status is True. The overdue rule requires both an earlier due date and an unreturned loan."
    ],
    [
      "Distinguish",
      "Is a printed “two overdue loans” report the same thing as the raw records?",
      "No. It is an interpretation derived from records using a stated date and rule. The raw values support the conclusion."
    ],
    [
      "Diagnose",
      "A classmate removes L005 because E02 already appears in L002. Why is that a mistake?",
      "The rows describe different borrowing events. Repeated equipment identifiers can be legitimate history; LoanID distinguishes the loans."
    ],
    [
      "Explain",
      "A database containing three related tables is stored in one SQLite file. Is it a flat-file register?",
      "No. Its logical structure is relational even though its physical storage uses one file."
    ],
    [
      "Evaluate",
      "Does crediting a DBMS with access control mean every user is automatically restricted?",
      "No. Appropriate permissions and application/operating-system controls must be configured; facilities differ by system."
    ]
  ],
  "task": "Using the CSV and workbook, count active and overdue loans for 8 April 2026, explain repeated facts, propose Borrower/Equipment/Loan responsibilities and justify who should be able to view or edit the records. State one limitation of your analysis.",
  "solution": "Four active loans: L001, L002, L004, L006. Two overdue: L001, L006. Borrower holds four distinct borrowers; Equipment five distinct items; Loan six events referring to both. Repeated labels/descriptions create inconsistent-update risk in the flat register. Staff may edit authorised loan records; learners may view permitted availability. The counts rely on truthful and current return status, the supplied date and the defined boundary rule.",
  "recap": "Data becomes information through context and processing. A relational design separates related facts; the RDBMS is the software managing them. Logical table structure differs from physical file storage, and independence does not mean unlimited compatibility.",
  "lessons": [
    "Lesson 1: introduce the equipment desk; distinguish raw values from an answer and state the overdue rule. Evidence: identify needed fields and calculate active/overdue counts.",
    "Lesson 2: inspect the flat register; simulate changing one repeated label and deleting an item’s last loan. Evidence: explain the maintenance problem.",
    "Lesson 3: distinguish database/DBMS/RDBMS; sort facts into Borrower, Equipment and Loan; discuss independence and configured access. Evidence: a labelled concept sketch and two explanations.",
    "Lesson 4: complete the workbook independently, compare explained answers, then answer a new boundary case. Evidence: corrections and an exit justification. Four lessons total; this is formative practice, not another weighted assessment."
  ],
  "reference": "https://www.postgresql.org/docs/current/tutorial-concepts.html",
  "refTitle": "PostgreSQL relational concepts",
  "quiz": {
    "q": "Which statement is correct?",
    "options": [
      "One physical file always means flat-file data",
      "An RDBMS manages relational data; several tables can share a physical file",
      "A report is reliable even when return status is wrong"
    ],
    "answer": 1,
    "explanation": "Distinguish logical organisation from physical storage. The RDBMS manages data, while report reliability still depends on valid rules and accurate records."
  }
});

chapters.push({
  "id": "entities-relationships",
  "unit": 2,
  "week": 2,
  "title": "Modelling entities and relationships",
  "badge": "DATABASE DESIGN",
  "next": "#plan-2-2",
  "intro": "Give every fact a home and every event a reliable identifier. Model how borrowers, equipment and loan history connect before implementing a database.",
  "objectives": [
    "Distinguish entity types, attributes, records and fields.",
    "Choose and justify primary, foreign and composite keys.",
    "Explain one-to-one, one-to-many and many-to-many relationships.",
    "Read and create a four-table crow’s-foot ER diagram and a data dictionary."
  ],
  "sections": [
    [
      "From entity to table",
      "<p>An entity is a kind of thing or event about which we keep facts. Borrower, Equipment and Loan are entity types. Learner A is one borrower instance; E01 is one equipment instance; L001 is one loan instance. An attribute describes an entity: a borrower has a label, and a loan has a due date.</p><p>In a relational implementation, a table represents an entity type, a row (record) represents an instance, and a column (field) represents an attribute. A single field value belongs to a row: L001’s DueDate is 2026-04-06. Distinguish the column definition from that particular stored value.</p><p>Loan is an event entity. Keeping events separately preserves history without repeatedly storing borrower labels and equipment descriptions.</p>"
    ],
    [
      "Choose identifiers deliberately",
      "<p>A primary key is the chosen identifier for each table row. Its values must be unique and not null. Our synthetic BorrowerID is a better choice than BorrowerLabel because two borrowers may share a label, and labels may change. EquipmentDescription is unsuitable: E01 and E04 are both cameras.</p><p>Candidate keys are possible unique identifiers under the agreed rules; the design chooses one primary key. A key may contain several columns. Never infer a permanent uniqueness rule from a small sample that happens to have no duplicate values.</p><p>A foreign key references a permitted key in another table (or the same table). In this model Loan.BorrowerID references Borrower.BorrowerID. Foreign-key values can repeat: B001 appears in L001 and L003. An FK is not automatically the primary key of its table.</p><p>Our foreign keys are required, so every loan must reference an existing borrower and item. Elsewhere an optional relationship might allow a null foreign key if the design permits it. Appropriate database constraints enforce these choices when implemented.</p>"
    ],
    [
      "Four tables from the familiar register",
      "<p>We retain all six loan events from the foundations CSV. The new Category table groups item types. The category assignments are an explicit new design decision: cameras are Imaging, tripods Support, and recorders/microphones Audio. Categories can exist before items are registered.</p><h3>Borrowers</h3><div class=\"table-scroll\"><table><thead><tr><th>BorrowerID</th><th>BorrowerLabel</th></tr></thead><tbody><tr><td>B001</td><td>Learner A</td></tr><tr><td>B002</td><td>Learner B</td></tr><tr><td>B003</td><td>Learner C</td></tr><tr><td>B004</td><td>Learner D</td></tr></tbody></table></div><h3>Categories</h3><div class=\"table-scroll\"><table><thead><tr><th>CategoryID</th><th>CategoryName</th></tr></thead><tbody><tr><td>C01</td><td>Imaging</td></tr><tr><td>C02</td><td>Support</td></tr><tr><td>C03</td><td>Audio</td></tr></tbody></table></div><h3>Equipment</h3><div class=\"table-scroll\"><table><thead><tr><th>EquipmentID</th><th>EquipmentDescription</th><th>CategoryID</th></tr></thead><tbody><tr><td>E01</td><td>Camera</td><td>C01</td></tr><tr><td>E02</td><td>Tripod</td><td>C02</td></tr><tr><td>E03</td><td>Recorder</td><td>C03</td></tr><tr><td>E04</td><td>Camera</td><td>C01</td></tr><tr><td>E05</td><td>Microphone</td><td>C03</td></tr></tbody></table></div><h3>Loans</h3><div class=\"table-scroll\"><table><thead><tr><th>LoanID</th><th>BorrowerID</th><th>EquipmentID</th><th>DueDate</th><th>Returned</th></tr></thead><tbody><tr><td>L001</td><td>B001</td><td>E01</td><td>2026-04-06</td><td>False</td></tr><tr><td>L002</td><td>B002</td><td>E02</td><td>2026-04-08</td><td>False</td></tr><tr><td>L003</td><td>B001</td><td>E03</td><td>2026-04-07</td><td>True</td></tr><tr><td>L004</td><td>B003</td><td>E04</td><td>2026-04-10</td><td>False</td></tr><tr><td>L005</td><td>B002</td><td>E02</td><td>2026-04-04</td><td>True</td></tr><tr><td>L006</td><td>B004</td><td>E05</td><td>2026-04-07</td><td>False</td></tr></tbody></table></div><p>Follow L001: its BorrowerID B001 locates Learner A; EquipmentID E01 locates the camera; that item’s CategoryID C01 locates Imaging. Each fact has a defined home. You can reconstruct the earlier report through these links; the loan count remains six.</p><p>Dates and Boolean values in downloadable CSVs are text encodings. Type conversion and constraints belong to the later implementation stage.</p>"
    ],
    [
      "Read relationships in both directions",
      "<table><tr><th>Relationship</th><th>Rule from the parent</th><th>Rule from the child</th></tr><tr><td>Borrower–Loan</td><td>A borrower can have zero or many loans</td><td>A loan has exactly one borrower</td></tr><tr><td>Equipment–Loan</td><td>An item can have zero or many loans over time</td><td>A loan refers to exactly one item</td></tr><tr><td>Category–Equipment</td><td>A category can contain zero or many items</td><td>An item belongs to exactly one category</td></tr></table><p>These are one-to-many relationships. The foreign key is stored on the many side. Minimum participation (zero or one) expresses whether the relationship is optional or mandatory; maximum participation (one or many) expresses its upper limit. Read the symbols at an end as the number of instances at that end for one instance at the other end.</p><p>One-to-one example: if each assigned locker can belong to at most one borrower and each borrower can have at most one locker, the maximum is one in both directions. Whether every borrower must have a locker is a separate rule. A unique foreign key plus appropriate nullability may be part of the implementation.</p><p>Many-to-many example: over time, one borrower uses many items and one item is used by many borrowers. Loan resolves this into two one-to-many relationships and stores event facts. This does not mean one physical item is available for two active loans at once. That additional business rule needs checking beyond basic foreign keys.</p>"
    ],
    [
      "Draw and interpret crow’s-foot notation",
      "<figure class=\"model-figure\"><div class=\"diagram-scroll\" tabindex=\"0\" aria-label=\"Scrollable equipment ER diagram\"><img src=\"equipment-model.svg\" alt=\"Four-table ER diagram: Category to Equipment, Equipment to Loan and Borrower to Loan are one-to-many; each parent may have zero or many children, each child requires one parent.\"></div><figcaption>Original worked ER diagram. Primary keys are underlined and marked PK; foreign keys are marked FK.</figcaption></figure><p>Two bars mean exactly one. A circle with a crow’s foot means zero or many. Read Category to Equipment: each item has exactly one category, while a category can have zero or many items. Explain all three connections aloud, then redraw the diagram without copying the image.</p><p><a href=\"equipment-model.svg\" download>Download the worked SVG diagram</a>. Compare your notation with the <a href=\"https://senior-secondary.scsa.wa.edu.au/__data/assets/pdf_file/0003/1090875/Year-11_12_Computer-Science_ATAR_Additional-syllabus-support-booklet-.PDF#page=19\">SCSA support booklet, printed page 15</a>. Table positions and line bends are layout choices; keys and relationship rules determine meaning.</p>"
    ],
    [
      "When a composite key fits",
      "<p>A composite key uses two or more attributes together. Suppose WorkshopEnrolment records a borrower in a workshop, with one enrolment allowed per borrower/workshop pair. The pair (BorrowerID, WorkshopID) can be its primary key. Both fields also reference their parent tables.</p><div class=\"table-scroll\"><table><thead><tr><th>BorrowerID (PK, FK)</th><th>WorkshopID (PK, FK)</th></tr></thead><tbody><tr><td>B001</td><td>W01</td></tr><tr><td>B001</td><td>W02</td></tr><tr><td>B002</td><td>W01</td></tr></tbody></table></div><p>Repeating B001 or W01 individually is allowed; repeating the same pair is not. These are example extension records, not part of the four-table equipment dataset.</p><div class=\"notice\">Do not use (BorrowerID, EquipmentID) alone as Loan’s key. A borrower can borrow the same item again, so the pair can legitimately repeat across events. Our LoanID identifies each event. Adding dates to a proposed key requires explicit rules about whether the resulting combination is always unique.</div>"
    ],
    [
      "Document the fields and their rules",
      "<p>A data dictionary describes the data definitions so developers can implement and maintain the model. Record the element name, type, size, meaning and constraints. Here, text sizes are maximum character lengths chosen for the exercise; Date and Boolean storage sizes depend on the DBMS. Default False describes new loans, not all historical records.</p><div class=\"table-scroll\"><table><thead><tr><th>Element</th><th>Conceptual type</th><th>Size</th><th>Description</th><th>Constraints</th></tr></thead><tbody><tr><td>Borrower.BorrowerID</td><td>Text</td><td>4</td><td>Synthetic borrower identifier</td><td>PK; unique; required; B + three digits</td></tr><tr><td>Borrower.BorrowerLabel</td><td>Text</td><td>40</td><td>Display label</td><td>Required; not assumed unique</td></tr><tr><td>Category.CategoryID</td><td>Text</td><td>3</td><td>Equipment category identifier</td><td>PK; unique; required; C + two digits</td></tr><tr><td>Category.CategoryName</td><td>Text</td><td>30</td><td>Category label</td><td>Required; unique by our agreed rule</td></tr><tr><td>Equipment.EquipmentID</td><td>Text</td><td>3</td><td>Physical item identifier</td><td>PK; unique; required; E + two digits</td></tr><tr><td>Equipment.EquipmentDescription</td><td>Text</td><td>60</td><td>Item description</td><td>Required; may repeat</td></tr><tr><td>Equipment.CategoryID</td><td>Text</td><td>3</td><td>Category of the item</td><td>Required FK → Category.CategoryID</td></tr><tr><td>Loan.LoanID</td><td>Text</td><td>4</td><td>Borrowing event identifier</td><td>PK; unique; required; L + three digits</td></tr><tr><td>Loan.BorrowerID</td><td>Text</td><td>4</td><td>Borrower for this event</td><td>Required FK → Borrower.BorrowerID</td></tr><tr><td>Loan.EquipmentID</td><td>Text</td><td>3</td><td>Item for this event</td><td>Required FK → Equipment.EquipmentID</td></tr><tr><td>Loan.DueDate</td><td>Date</td><td>DBMS-defined</td><td>Due date</td><td>Required; displayed as YYYY-MM-DD</td></tr><tr><td>Loan.Returned</td><td>Boolean</td><td>DBMS-defined</td><td>Return status</td><td>Required; default False for a new loan</td></tr></tbody></table></div><p>Identifiers are text because the letters and leading zeros matter. Use integer for a count, float for an approximate measurement such as item mass, Boolean for return status, text for a label and date for a due date. The conceptual types must later be mapped to the selected DBMS. SQLite, for example, has different storage/type behaviour from a database with a native DATE type.</p><p>Formats and lengths are design decisions, not universal rules. A future identifier range beyond E99 would require a revised specification. Validation confirms format and allowed links, not that the stored fact is truthful.</p>"
    ],
    [
      "Check the design against counterexamples",
      "<ul><li>Two borrowers share a display label: their identifiers must still distinguish them.</li><li>B001 borrows E01 again: add a new LoanID, rather than overwriting L001.</li><li>A loan refers to B999, which does not exist: reject the required reference.</li><li>Category C04 has no items yet: the optional-many rule permits that category.</li><li>Someone deletes Borrower B001 while loans still refer to it: choose a deliberate deletion policy. For this learning model, restrict deletion until references are resolved; do not silently destroy history.</li></ul><p>Review the intended rules, keys and sample data together. A plausible drawing is insufficient if it cannot store legitimate events or prevent invalid references.</p>"
    ],
    [
      "Model pack and independent practice",
      "<p><a class=\"button\" href=\"relationships-workbook.md\" download>Download student workbook</a> <a class=\"button secondary\" href=\"relationships-answers.md\" download>Download explained answers</a></p><p>Download the four related datasets: <a href=\"model-borrowers.csv\" download>Borrower</a>, <a href=\"model-categories.csv\" download>Category</a>, <a href=\"model-equipment.csv\" download>Equipment</a>, <a href=\"model-loans.csv\" download>Loan</a>. Keep synthetic records for this exercise. SQL setup is not required.</p>"
    ]
  ],
  "practice": [
    [
      "Choose",
      "Why is EquipmentDescription not a suitable primary key?",
      "Descriptions can repeat: both E01 and E04 are Camera. A key must identify each item, not merely its type."
    ],
    [
      "Trace",
      "Which fields link L003 to its borrower and category?",
      "Loan.BorrowerID B001 links to Borrower B001. Loan.EquipmentID E03 links to Equipment E03, whose CategoryID C03 links to Audio."
    ],
    [
      "Explain",
      "May BorrowerID repeat in Loan?",
      "Yes. It is a foreign key there, and a borrower can have several loan events. LoanID remains unique."
    ],
    [
      "Challenge",
      "Can the pair B001/E01 identify every future loan?",
      "No. The same borrower can borrow that item again. A new loan event needs its own identifier or a justified larger unique key."
    ],
    [
      "Read",
      "Does a category with zero equipment violate this diagram?",
      "No. Category to Equipment is optional many, so zero items are permitted. Each existing item still requires one category."
    ]
  ],
  "task": "Redraw the four-table ER diagram, underline PKs and label FKs. Explain each relationship in both directions, reproduce a data dictionary for Loan, then add a second B001/E01 event with a new LoanID. Explain which rules a duplicate LoanID and a B999 reference violate.",
  "solution": "Use Borrower.BorrowerID, Category.CategoryID, Equipment.EquipmentID and Loan.LoanID as primary keys. Equipment.CategoryID and Loan.BorrowerID/EquipmentID are required foreign keys. Each parent permits zero or many children; each child requires exactly one referenced parent. A new loan such as L007/B001/E01 is a distinct event with its own due date/status. Duplicate L001 violates key uniqueness; B999 violates the required valid-borrower reference. A second simultaneous active loan for E01 would require a separate business-rule check.",
  "recap": "Keys identify records and references link tables. Cardinality comes from business rules, not sample counts. Resolve borrowing history through Loan, document field definitions and test the design with counterexamples.",
  "lessons": [
    "Lesson 1: retrieve the flat-register problems; distinguish entities, instances, fields and records; choose identifiers. Evidence: annotated table definitions.",
    "Lesson 2: locate primary/foreign keys in the four datasets; test repeat events and invalid references; compare composite keys. Evidence: justified key choices.",
    "Lesson 3: read relationships in both directions and model minimum/maximum participation; redraw the crow’s-foot diagram. Evidence: a four-table ER diagram and spoken explanations.",
    "Lesson 4: complete the Loan data dictionary and independent workbook; review counterexamples and corrections. Evidence: diagram/dictionary revisions. Four lessons total, with no additional weighted assessment."
  ],
  "reference": "https://www.postgresql.org/docs/current/ddl-constraints.html",
  "refTitle": "PostgreSQL key and reference constraints",
  "quiz": {
    "q": "Which key fits Loan when the same borrower can borrow the same item again?",
    "options": [
      "BorrowerLabel",
      "BorrowerID + EquipmentID alone",
      "A unique LoanID for each borrowing event"
    ],
    "answer": 2,
    "explanation": "A borrowing pair can repeat over time. LoanID distinguishes the event; borrower and item identifiers are foreign keys."
  }
});

chapters.find(c=>c.id==='database-foundations').next='#entities-relationships';

chapters.push({
  "id": "normalisation",
  "unit": 2,
  "week": 3,
  "title": "Normalisation",
  "badge": "DATABASE DESIGN",
  "next": "#plan-2-3",
  "intro": "Repair the organisation of a register without losing its meaning. Use explicit keys and dependencies to move from repeating groups to a four-table relational design.",
  "objectives": [
    "Recognise insert, update and delete anomalies.",
    "Flatten repeating groups into 1NF with justified keys.",
    "Remove partial dependencies for 2NF and transitive dependencies for 3NF.",
    "Check that the decomposition preserves the original facts."
  ],
  "sections": [
    [
      "State the rules before choosing a key",
      "<p>The equipment desk accepts reservation requests as well as recording loans. A reservation is a request for a particular item on a particular date; it is not an issued loan. Competing requests from different borrowers may exist for the same item/date. At most one request is recorded for a given borrower, item and date.</p><p>The composite key is therefore <strong>(BorrowerID, EquipmentID, ReservationDate)</strong>. One borrower can request an item again on another date. BorrowerID alone, EquipmentID alone, or borrower/item alone cannot identify every reservation.</p><p>ReservationStatus is Requested or Confirmed in this exercise. Approval and availability rules must be checked separately; normalisation alone does not stop conflicting bookings. The earlier Loan model continues to use LoanID for each single-item borrowing event.</p>"
    ],
    [
      "Start with a repeating group",
      "<p>A clerk keeps one row per borrower with several reservation details inside one cell. Another version might use Item1, Date1, Item2, Date2 and so on. Both approaches make the number of reservations part of the record layout.</p><div class=\"table-scroll\"><table><thead><tr><th>BorrowerID</th><th>BorrowerLabel</th><th>Reservations stored together</th></tr></thead><tbody><tr><td>B001</td><td>Learner A</td><td>E01 / 2026-05-01 / Confirmed; E02 / 2026-05-01 / Requested; E01 / 2026-05-08 / Requested</td></tr><tr><td>B002</td><td>Learner B</td><td>E01 / 2026-05-02 / Confirmed; E01 / 2026-05-01 / Requested</td></tr><tr><td>B003</td><td>Learner C</td><td>E03 / 2026-05-02 / Confirmed</td></tr></tbody></table></div><p>The downloadable JSON also contains each item’s description and category. Its nested reservations are a teaching representation of the repeating group, not a claim that JSON itself is invalid or unsuitable for all applications.</p><p>For a relational design, give each field one value for its defined purpose and each reservation its own row. Do not split a label into letters: atomicity depends on the meaning of the attribute, not whether a text value contains spaces.</p>"
    ],
    [
      "Recognise the anomalies",
      "<p><strong>Update:</strong> E01’s description appears in several reservation entries. Editing only one leaves conflicting descriptions for the same item.</p><p><strong>Insert:</strong> the register cannot naturally store a new equipment item with no reservation because its rows require reservation key values. Inventing a borrower or date would record a false event.</p><p><strong>Delete:</strong> removing the only reservation for E03 loses this register’s only stored description of that recorder and its category.</p><p>These problems concern how facts depend on identifiers. A real duplicate event is different from a legitimately repeated equipment identifier. Deleting repeated IDs blindly can destroy history.</p>"
    ],
    [
      "1NF: one reservation per row",
      "<p>Flatten the repeating group into six rows with the same named fields, one value per field and no repeating column groups. Identify each reservation using the stated composite key. Underline all three components, not just the first.</p><p><strong>ReservationRegister</strong> (<u>BorrowerID</u>, <u>EquipmentID</u>, <u>ReservationDate</u>, BorrowerLabel, EquipmentDescription, CategoryID, CategoryName, ReservationStatus)</p><div class=\"table-scroll\"><table><thead><tr><th>BorrowerID</th><th>BorrowerLabel</th><th>EquipmentID</th><th>EquipmentDescription</th><th>CategoryID</th><th>CategoryName</th><th>ReservationDate</th><th>ReservationStatus</th></tr></thead><tbody><tr><td>B001</td><td>Learner A</td><td>E01</td><td>Camera</td><td>C01</td><td>Imaging</td><td>2026-05-01</td><td>Confirmed</td></tr><tr><td>B001</td><td>Learner A</td><td>E02</td><td>Tripod</td><td>C02</td><td>Support</td><td>2026-05-01</td><td>Requested</td></tr><tr><td>B002</td><td>Learner B</td><td>E01</td><td>Camera</td><td>C01</td><td>Imaging</td><td>2026-05-02</td><td>Confirmed</td></tr><tr><td>B001</td><td>Learner A</td><td>E01</td><td>Camera</td><td>C01</td><td>Imaging</td><td>2026-05-08</td><td>Requested</td></tr><tr><td>B003</td><td>Learner C</td><td>E03</td><td>Recorder</td><td>C03</td><td>Audio</td><td>2026-05-02</td><td>Confirmed</td></tr><tr><td>B002</td><td>Learner B</td><td>E01</td><td>Camera</td><td>C01</td><td>Imaging</td><td>2026-05-01</td><td>Requested</td></tr></tbody></table></div><p>B001/E01 occurs on both 1 May and 8 May. B001/E01/1 May and B002/E01/1 May are separate requests. These examples show why all three key components matter under our rules. The table is in 1NF, but duplicated descriptive facts still create anomalies.</p>"
    ],
    [
      "Dependencies explain the next split",
      "<p>A functional dependency X → Y means that a given X determines one Y under the business rules. It does not mean that X physically causes Y. Decide dependencies from the requirements; sample data can disprove a proposed dependency but cannot establish a permanent rule by itself.</p><pre>BorrowerID → BorrowerLabel\nEquipmentID → EquipmentDescription, CategoryID\nCategoryID → CategoryName\n(BorrowerID, EquipmentID, ReservationDate) → ReservationStatus</pre><p>BorrowerLabel depends on BorrowerID, only part of the composite reservation key. Equipment details depend on EquipmentID, another part. Those are partial dependencies. Status can vary between borrowers, items and dates, so it belongs to the whole reservation event.</p><p>EquipmentID determines CategoryID, which determines CategoryName. CategoryName therefore has a transitive dependency through a non-key attribute. We address that after removing partial dependencies.</p>"
    ],
    [
      "2NF: remove partial dependencies",
      "<p>Keep each borrower’s label in Borrower and each item’s details in Equipment. Keep the reservation’s three-part key and status in Reservation. The borrower and equipment identifiers there also become foreign keys.</p><p><strong>Borrower</strong> (<u>BorrowerID</u>, BorrowerLabel)</p><p><strong>Equipment</strong> (<u>EquipmentID</u>, EquipmentDescription, CategoryID, CategoryName)</p><p><strong>Reservation</strong> (<u>BorrowerID FK</u>, <u>EquipmentID FK</u>, <u>ReservationDate</u>, ReservationStatus)</p><div class=\"table-scroll\"><table><thead><tr><th>BorrowerID</th><th>BorrowerLabel</th></tr></thead><tbody><tr><td>B001</td><td>Learner A</td></tr><tr><td>B002</td><td>Learner B</td></tr><tr><td>B003</td><td>Learner C</td></tr></tbody></table></div><div class=\"table-scroll\"><table><thead><tr><th>EquipmentID</th><th>EquipmentDescription</th><th>CategoryID</th><th>CategoryName</th></tr></thead><tbody><tr><td>E01</td><td>Camera</td><td>C01</td><td>Imaging</td></tr><tr><td>E02</td><td>Tripod</td><td>C02</td><td>Support</td></tr><tr><td>E03</td><td>Recorder</td><td>C03</td><td>Audio</td></tr></tbody></table></div><div class=\"table-scroll\"><table><thead><tr><th>BorrowerID</th><th>EquipmentID</th><th>ReservationDate</th><th>ReservationStatus</th></tr></thead><tbody><tr><td>B001</td><td>E01</td><td>2026-05-01</td><td>Confirmed</td></tr><tr><td>B001</td><td>E01</td><td>2026-05-08</td><td>Requested</td></tr><tr><td>B001</td><td>E02</td><td>2026-05-01</td><td>Requested</td></tr><tr><td>B002</td><td>E01</td><td>2026-05-01</td><td>Requested</td></tr><tr><td>B002</td><td>E01</td><td>2026-05-02</td><td>Confirmed</td></tr><tr><td>B003</td><td>E03</td><td>2026-05-02</td><td>Confirmed</td></tr></tbody></table></div><p>There are three borrowers, three items and six reservations. Descriptions now occur once per equipment item. ReservationStatus depends on the whole reservation key. CategoryName still depends on CategoryID inside Equipment, so a transitive dependency remains.</p><div class=\"notice\">For the straightforward keys used here, a 1NF table with a single-attribute key has no partial dependency on part of that key. It can still have transitive dependencies and fail 3NF. Simply adding an ID column does not automatically solve every dependency problem.</div>"
    ],
    [
      "3NF: remove the transitive dependency",
      "<p>Move CategoryName into Category, identified by CategoryID. Equipment retains CategoryID as a foreign key. Borrower and Reservation already meet the intended 3NF conditions under the stated dependencies.</p><p><strong>Borrower</strong> (<u>BorrowerID</u>, BorrowerLabel)</p><p><strong>Category</strong> (<u>CategoryID</u>, CategoryName)</p><p><strong>Equipment</strong> (<u>EquipmentID</u>, EquipmentDescription, CategoryID FK)</p><p><strong>Reservation</strong> (<u>BorrowerID FK</u>, <u>EquipmentID FK</u>, <u>ReservationDate</u>, ReservationStatus)</p><div class=\"table-scroll\"><table><thead><tr><th>CategoryID</th><th>CategoryName</th></tr></thead><tbody><tr><td>C01</td><td>Imaging</td></tr><tr><td>C02</td><td>Support</td></tr><tr><td>C03</td><td>Audio</td></tr></tbody></table></div><div class=\"table-scroll\"><table><thead><tr><th>EquipmentID</th><th>EquipmentDescription</th><th>CategoryID</th></tr></thead><tbody><tr><td>E01</td><td>Camera</td><td>C01</td></tr><tr><td>E02</td><td>Tripod</td><td>C02</td></tr><tr><td>E03</td><td>Recorder</td><td>C03</td></tr></tbody></table></div><p>The final four tables contain three borrower records, three category records, three equipment records and six reservation records. The borrowed equipment identifiers recur in Reservation because they represent relationships, not duplicated descriptive facts.</p><p>Under these exercise rules, each non-key fact depends on its table’s key without a dependency through another non-key fact. That is the reasoning for this design’s 3NF status; the number of tables alone proves nothing.</p>"
    ],
    [
      "Verify that the split preserves information",
      "<p>Reconstruct B001/E01/1 May: Reservation supplies Confirmed; Borrower B001 supplies Learner A; Equipment E01 supplies Camera and C01; Category C01 supplies Imaging. Those are exactly the facts in the corresponding 1NF row.</p><p>Reconstruct all six rows. A correct decomposition preserves the intended records without missing rows or extra combinations. Keep the keys and references: joining on an ambiguous description such as Camera can create incorrect matches.</p><p>After decomposition, a new equipment item can be stored before it has reservations; updating a description changes one equipment record; deleting a reservation need not delete the equipment facts. Foreign-key constraints and deliberate deletion policies remain necessary.</p>"
    ],
    [
      "Practise on a fresh four-table problem",
      "<p>A club register has MemberID, MemberLabel and a repeating list of activities: ActivityID, ActivityName, LeaderID, LeaderLabel, Term and AttendanceCount. A member can join the same activity once per term. An activity has one assigned leader under this exercise’s rules; a leader may lead several activities.</p><p>Dependencies: MemberID → MemberLabel; ActivityID → ActivityName, LeaderID; LeaderID → LeaderLabel; (MemberID, ActivityID, Term) → AttendanceCount. Write the 1NF relation, then 2NF and 3NF relations. Underline keys and mark FKs. Explain one partial and one transitive dependency.</p><details><summary>Show the club model</summary><p>1NF: flattened register with PK (MemberID, ActivityID, Term). 2NF: Member(MemberID PK, MemberLabel); Activity(ActivityID PK, ActivityName, LeaderID, LeaderLabel); Participation(MemberID PK/FK, ActivityID PK/FK, Term PK, AttendanceCount). 3NF: add Leader(LeaderID PK, LeaderLabel); retain LeaderID FK in Activity and remove LeaderLabel from Activity. MemberLabel depended only on MemberID; LeaderLabel depended transitively on ActivityID through LeaderID. Four tables remain.</p></details>"
    ],
    [
      "Downloads and review checkpoints",
      "<p><a class=\"button\" href=\"normalisation-workbook.md\" download>Download student workbook</a> <a class=\"button secondary\" href=\"normalisation-answers.md\" download>Download explained answers</a></p><p><a href=\"normalisation-pack.zip\" download>Download all stages: starter JSON and eight CSV tables</a> · <a href=\"normalisation-1nf-register.csv\" download>1NF register only</a></p><p>At each stage, state the key, identify the dependency being removed and show where the moved fact now belongs. Keep the earlier model pack: these reservation tables are a learning extension, not a replacement for the existing loan datasets.</p><p>Course convention reference: <a href=\"https://senior-secondary.scsa.wa.edu.au/__data/assets/pdf_file/0003/1090875/Year-11_12_Computer-Science_ATAR_Additional-syllabus-support-booklet-.PDF#page=21\">SCSA support booklet, printed pages 17–21</a>. Normalisation and data validation serve different purposes: a normalised database can still contain factually incorrect records.</p>"
    ]
  ],
  "practice": [
    [
      "Identify",
      "Why is BorrowerLabel a partial dependency in the 1NF register?",
      "It is determined by BorrowerID alone, which is only one part of the three-attribute reservation key."
    ],
    [
      "Explain",
      "Why is CategoryName still a problem in the 2NF Equipment table?",
      "EquipmentID determines CategoryID, and CategoryID determines CategoryName. That transitive dependency is removed by Category in 3NF."
    ],
    [
      "Challenge",
      "Is a table in 3NF just because it has four columns or a single ID key?",
      "No. Normal forms depend on keys and functional dependencies, not column count or the presence of an ID."
    ],
    [
      "Distinguish",
      "Should EquipmentID stop repeating in Reservation after 3NF?",
      "No. Repeated foreign-key values represent different reservation events. Remove inappropriate descriptive duplication, not legitimate history."
    ],
    [
      "Test",
      "Can normalisation prove that a recorded reservation date is true?",
      "No. It improves organisation and dependency structure. Validation and fact checking remain separate."
    ]
  ],
  "task": "Complete the reservation transformation and the club transfer problem. For each stage, record keys, FKs, the dependency removed and an anomaly it reduces. Reconstruct two reservation rows through the final model and identify one rule that still needs enforcement.",
  "solution": "ReservationRegister becomes Borrower, Equipment and Reservation at 2NF. CategoryName moves from Equipment to Category at 3NF. Reservation’s PK is (BorrowerID, EquipmentID, ReservationDate), with BorrowerID/EquipmentID also FKs. Six original events remain. The club model ends with Member, Activity, Leader and Participation; Participation’s PK is (MemberID, ActivityID, Term). Availability/approval, valid dates and accurate facts still need checks beyond normalisation.",
  "recap": "Normalise using stated rules: establish atomic rows and a key, remove dependencies on part of the key, then remove non-key dependency chains. Preserve keys, references and the original information.",
  "lessons": [
    "Lesson 1: retrieve keys; state reservation rules; identify repeating groups and anomalies; flatten to 1NF. Evidence: six atomic rows and a justified composite key.",
    "Lesson 2: read dependency statements; identify partial dependencies and form 2NF tables. Evidence: labelled keys/references and an explanation of each split.",
    "Lesson 3: remove CategoryName’s transitive dependency; reconstruct records from the four-table 3NF design. Evidence: reconstructed rows and anomaly explanations.",
    "Lesson 4: complete the club transfer problem independently, review explained answers and correct misconceptions. Evidence: stage-by-stage working. Four lessons total; formative practice, not an additional weighted task."
  ],
  "reference": "https://learn.microsoft.com/en-us/office/troubleshoot/access/database-normalization-description",
  "refTitle": "Microsoft database normalisation overview",
  "quiz": {
    "q": "Which change removes the transitive dependency in our 2NF Equipment table?",
    "options": [
      "Delete all reservation history",
      "Give every field a different name",
      "Move CategoryName to Category and retain CategoryID as an Equipment FK"
    ],
    "answer": 2,
    "explanation": "CategoryID determines CategoryName. Give category facts their own keyed table while preserving the link from Equipment."
  }
});
chapters.find(c=>c.id==='entities-relationships').next='#normalisation';

chapters.push({
  "id": "sql-basics",
  "unit": 2,
  "week": 4,
  "title": "Getting started with SQL",
  "badge": "SQL / SQLITE",
  "intro": "Turn a question into a query. Predict, filter and sort results from the equipment-loan database, then check them against the original records.",
  "objectives": [
    "Distinguish stored tables from query results.",
    "Select fields and filter rows using comparisons and Boolean conditions.",
    "Sort results with explicit direction and tie-break fields.",
    "Check empty results, duplicates and boundary cases."
  ],
  "sections": [
    [
      "Use the relational model",
      "<p>SQL is a language for asking a relational DBMS questions and changing its data or structure. This chapter reads data. It uses the earlier loan model: Borrower (4 rows), Category (3), Equipment (5) and Loan (6). The reservation example from normalisation is a separate teaching extension.</p><p>A query produces a result table. Selecting two fields does not delete other fields from the stored table. Python can submit SQL to a database, but SQL statements are not Python statements.</p>"
    ],
    [
      "Open the starter database",
      "<p><a class=\"button\" href=\"sql-starter.sqlite\" download>Download SQLite starter</a> <a class=\"button secondary\" href=\"sql-starter-pack.zip\" download>Download complete SQL pack</a></p><ol><li>Save a working copy of sql-starter.sqlite.</li><li>Open it in your school-approved SQLite-capable database application. This is a database file, not a CSV to import.</li><li>Find its SQL editor, paste one query and run the selected statement.</li><li>Compare the result columns, rows and order with this chapter.</li></ol><p>Alternatively, create a new empty SQLite database and execute sql-setup.sql once. Re-running it in an existing database reports that tables already exist; use a new empty file to reset. For another DBMS, your teacher must adapt the setup and check its syntax.</p><p>SQLite-specific storage: DueDate is TEXT in fixed YYYY-MM-DD form; Returned is INTEGER, 0 for false and 1 for true, restricted by a CHECK. Dates are assumed valid in this supplied data; TEXT alone does not validate calendar dates. Enable foreign-key enforcement on each SQLite connection with <code>PRAGMA foreign_keys = ON;</code>. These are implementation choices, not universal SQL types.</p>"
    ],
    [
      "Choose result columns with SELECT",
      "<p>Write SELECT with a comma-separated field list, then FROM with the table name. The asterisk requests all fields; named fields make the intended output clearer. A semicolon ends the statement. SQL keywords here are uppercase for readability.</p><pre><code>SELECT * FROM Equipment ORDER BY EquipmentID;</code></pre><div class=\"table-scroll\"><table><tr><th>EquipmentID</th><th>EquipmentDescription</th><th>CategoryID</th></tr><tr><td>E01</td><td>Camera</td><td>C01</td></tr><tr><td>E02</td><td>Tripod</td><td>C02</td></tr><tr><td>E03</td><td>Recorder</td><td>C03</td></tr><tr><td>E04</td><td>Camera</td><td>C01</td></tr><tr><td>E05</td><td>Microphone</td><td>C03</td></tr></table></div><pre><code>SELECT EquipmentID, EquipmentDescription FROM Equipment ORDER BY EquipmentID;</code></pre><div class=\"table-scroll\"><table><tr><th>EquipmentID</th><th>EquipmentDescription</th></tr><tr><td>E01</td><td>Camera</td></tr><tr><td>E02</td><td>Tripod</td></tr><tr><td>E03</td><td>Recorder</td></tr><tr><td>E04</td><td>Camera</td></tr><tr><td>E05</td><td>Microphone</td></tr></table></div><p>The model contains two separate cameras, E01 and E04. Identical descriptions do not mean identical items.</p>"
    ],
    [
      "Filter rows with WHERE",
      "<p>WHERE keeps rows that satisfy a condition. Use single quotes around text literals and <code>=</code> for equality. Do not quote a field name as a text value. Comparisons include <code>&lt;</code>, <code>&lt;=</code>, <code>&gt;</code>, <code>&gt;=</code> and <code>&lt;&gt;</code>.</p><pre><code>SELECT EquipmentID, EquipmentDescription FROM Equipment WHERE EquipmentDescription = &#x27;Camera&#x27; ORDER BY EquipmentID;</code></pre><div class=\"table-scroll\"><table><tr><th>EquipmentID</th><th>EquipmentDescription</th></tr><tr><td>E01</td><td>Camera</td></tr><tr><td>E04</td><td>Camera</td></tr></table></div><p>Predict before running: two matching rows, one per camera item. Filtering the result does not remove the other equipment records.</p><pre><code>SELECT LoanID, DueDate FROM Loan WHERE Returned = 0 ORDER BY DueDate ASC, LoanID ASC;</code></pre><div class=\"table-scroll\"><table><tr><th>LoanID</th><th>DueDate</th></tr><tr><td>L001</td><td>2026-04-06</td></tr><tr><td>L006</td><td>2026-04-07</td></tr><tr><td>L002</td><td>2026-04-08</td></tr><tr><td>L004</td><td>2026-04-10</td></tr></table></div><p>In this file, Returned = 0 means still on loan. ASC sorts oldest due date first; LoanID breaks ties.</p>"
    ],
    [
      "Combine conditions and test boundaries",
      "<p>For this exercise only, the reporting date is fixed at 8 April 2026. An overdue loan is unreturned and due before that date. A loan due on the reporting date is not yet overdue under this definition.</p><pre><code>SELECT LoanID, BorrowerID, DueDate FROM Loan WHERE Returned = 0 AND DueDate &lt; &#x27;2026-04-08&#x27; ORDER BY DueDate ASC, LoanID ASC;</code></pre><div class=\"table-scroll\"><table><tr><th>LoanID</th><th>BorrowerID</th><th>DueDate</th></tr><tr><td>L001</td><td>B001</td><td>2026-04-06</td></tr><tr><td>L006</td><td>B004</td><td>2026-04-07</td></tr></table></div><p>L002 is due on 8 April and is excluded by the strict &lt; boundary. L005 has an earlier date but was returned. AND requires both conditions; OR allows either condition.</p><pre><code>SELECT EquipmentID, CategoryID FROM Equipment WHERE CategoryID = &#x27;C03&#x27; OR CategoryID = &#x27;C01&#x27; ORDER BY EquipmentID;</code></pre><div class=\"table-scroll\"><table><tr><th>EquipmentID</th><th>CategoryID</th></tr><tr><td>E01</td><td>C01</td></tr><tr><td>E03</td><td>C03</td></tr><tr><td>E04</td><td>C01</td></tr><tr><td>E05</td><td>C03</td></tr></table></div><pre><code>SELECT LoanID FROM Loan WHERE Returned = 0 AND (BorrowerID = &#x27;B001&#x27; OR BorrowerID = &#x27;B002&#x27;) ORDER BY LoanID;</code></pre><div class=\"table-scroll\"><table><tr><th>LoanID</th></tr><tr><td>L001</td></tr><tr><td>L002</td></tr></table></div><p>Parentheses make the intended grouping clear. Without them, <code>Returned = 0 AND BorrowerID = 'B001' OR BorrowerID = 'B002'</code> also includes returned B002 loan L005 because AND binds more tightly than OR. Trace individual rows to check the logic.</p>"
    ],
    [
      "Make order and duplicates deliberate",
      "<p>ORDER BY belongs after WHERE. ASC gives ascending order; DESC gives descending order. Without ORDER BY, do not rely on a particular result order. Add a unique tie-break field when tied values need a predictable order.</p><p>DISTINCT removes duplicates from the selected result values, not the stored table. Two camera items still exist even when their shared description appears once.</p><pre><code>SELECT DISTINCT EquipmentDescription FROM Equipment ORDER BY EquipmentDescription;</code></pre><div class=\"table-scroll\"><table><tr><th>EquipmentDescription</th></tr><tr><td>Camera</td></tr><tr><td>Microphone</td></tr><tr><td>Recorder</td></tr><tr><td>Tripod</td></tr></table></div><p>Selecting EquipmentID as well would keep all five items because the selected pairs differ. DISTINCT should not hide a modelling error.</p>"
    ],
    [
      "Interpret empty results and debug",
      "<pre><code>SELECT EquipmentID FROM Equipment WHERE CategoryID = &#x27;C99&#x27; ORDER BY EquipmentID;</code></pre><p>Result: zero rows, with an EquipmentID column.</p><p>A valid query can match no records. Check the requirement and supplied values before assuming a syntax error. Compare this with an error such as a misspelled column or missing comma.</p><ol><li>Confirm the table and field names against the schema.</li><li>Check commas, quotes and clause order.</li><li>Run a simpler SELECT first, then add one condition at a time.</li><li>Check row counts, boundary cases and tied sort values.</li></ol><p>NULL is a missing/unknown value; test it with IS NULL or IS NOT NULL, not = NULL. The required fields in this starter do not contain NULL. This distinction matters when later designs permit optional values.</p>"
    ],
    [
      "Complete the independent query brief",
      "<p>The equipment desk wants a readable set of reports: all borrower identifiers/labels sorted by identifier; audio equipment IDs/descriptions; unreturned loan IDs/dates newest due date first with LoanID breaking ties; and B002 loan IDs excluding returned records.</p><p>For each report, write the requirement in your own words, predict the result, run the query, record the actual result and explain any difference. Include a boundary explanation for the fixed-date overdue example.</p><p><a href=\"sql-workbook.md\" download>Student workbook</a> · <a href=\"sql-answers.md\" download>Explained answers</a> · <a href=\"sql-worked-queries.sql\" download>Worked query file</a> · <a href=\"sql-expected-results.json\" download>Expected results</a></p><p>This introduces single-table queries. Database creation, inserts/updates/deletes, inner joins and aggregates continue in the database-solution chapter; this chapter alone does not cover the full database syllabus.</p>"
    ]
  ],
  "practice": [
    [
      "Explain",
      "Does SELECT EquipmentID FROM Equipment remove other columns?",
      "No. It returns one column in the query result. Stored Equipment data remains unchanged."
    ],
    [
      "Trace",
      "Why is L005 excluded from the overdue report?",
      "Returned is 1. Its due date is early, but both parts of the AND condition must hold."
    ],
    [
      "Boundary",
      "Why is L002 excluded on 8 April 2026?",
      "Its due date equals the reporting date. The exercise defines overdue using a strict less-than comparison."
    ],
    [
      "Distinguish",
      "Why does DISTINCT EquipmentDescription return four rows rather than five?",
      "The five items have four different descriptions. Camera occurs twice in the stored table but once in that result."
    ],
    [
      "Debug",
      "Why use parentheses around the two borrower comparisons?",
      "They group the OR alternatives so Returned = 0 applies to both borrowers. Without grouping, the stated expression includes returned B002 records."
    ]
  ],
  "task": "Complete the four equipment-desk reports in the workbook. Submit the SQL, predicted and actual results, and a short explanation of your filter and ordering. Explain one boundary test and one plausible query error.",
  "solution": "The borrower report returns B001–B004. Audio equipment is E03 Recorder and E05 Microphone. Active loans newest first are L004, L002, L006, L001. The active B002 report returns only L002. Use WHERE Returned = 0, not just an early date, for active/overdue logic. Exact queries and outputs are in the separate explained-answer download.",
  "recap": "Choose result fields with SELECT, name the table with FROM, filter rows with WHERE and make ordering explicit with ORDER BY. Test requirements against individual records and boundary cases. Query results do not change stored records.",
  "lessons": [
    "Lesson 1: retrieve keys/table roles; open the starter; predict and run named-field SELECT queries.",
    "Lesson 2: filter text and Returned values; compare expected and actual rows; debug commas and quotes.",
    "Lesson 3: combine conditions; trace the overdue boundary; use parentheses and deterministic sorting.",
    "Lesson 4: complete the independent reports; peer-check results; explain errors and revise."
  ],
  "reference": "https://www.sqlite.org/lang_select.html",
  "refTitle": "SQLite SELECT reference",
  "next": "#plan-2-4",
  "quiz": {
    "q": "Which condition matches an unreturned loan due before 8 April 2026?",
    "options": [
      "Returned = 0 OR DueDate < '2026-04-08'",
      "Returned = 0 AND DueDate < '2026-04-08'",
      "Returned = 1 AND DueDate <= '2026-04-08'"
    ],
    "answer": 1,
    "explanation": "Both conditions must hold: unreturned and earlier than the fixed reporting date. OR also admits returned old loans or active loans that are not overdue."
  }
});
chapters.find(c=>c.id==='normalisation').next='#sql-basics';

chapters.push({
  "id": "database-solution",
  "unit": 2,
  "week": "5–7",
  "title": "Building a database solution",
  "badge": "SQL / PROJECT",
  "intro": "Create related tables, join meaningful records, summarise inventory and maintain data with evidence. Turn the equipment-desk requirements into a tested database solution.",
  "objectives": [
    "Create and explain a four-table relational implementation.",
    "Use inner joins to produce readable loan reports.",
    "Apply COUNT, SUM, AVG, MIN and MAX to suitable records.",
    "Use INSERT, UPDATE and DELETE with checks and recovery.",
    "Document and evaluate a database against acceptance criteria."
  ],
  "sections": [
    [
      "Define the equipment-desk solution",
      "<p>The desk needs a list of active loans with readable borrower/item labels, a category history report, an inventory-value summary, borrower loan counts and a way to maintain records. Turn each need into a testable acceptance criterion before writing SQL.</p><p>The solution retains Borrower, Category, Equipment and Loan. Each loan records one item. LoanID identifies the event; BorrowerID and EquipmentID reference existing records. The project starter adds ReplacementCost to Equipment: fictional non-negative whole-dollar estimates of 600, 80, 150, 450 and 120 for E01–E05. These are teaching data, not current prices. No personal details are needed.</p><p>Weeks 5–6 teach and practise the required SQL. Week 7 launches the project; ten further build/testing lessons are embedded in weeks 8–12 while security teaching continues. Total project allocation: 14 lessons, including the four week-7 lessons.</p>"
    ],
    [
      "Create and inspect four related tables",
      "<p><a class=\"button\" href=\"database-project-pack.zip\" download>Download database project pack</a> <a class=\"button secondary\" href=\"database-project.sqlite\" download>Download project starter</a></p><p>Open a working copy in a school-approved SQLite tool. To practise creation, execute database-project-setup.sql once in a new empty database. It creates four tables, loads the synthetic data and adds the cost field. Keep the SQL-basics database unchanged; this is a separate project edition.</p><pre><code>CREATE TABLE Category (\n  CategoryID TEXT PRIMARY KEY NOT NULL,\n  CategoryName TEXT NOT NULL\n);</code></pre><p>This statement creates a structure; INSERT adds records. Read the full setup file to identify each PK, FK, NOT NULL and CHECK. Create referenced tables before loading referencing rows. SQLite foreign-key enforcement must be enabled for each connection using PRAGMA foreign_keys = ON, before starting a transaction.</p><p>DueDate remains valid YYYY-MM-DD TEXT in the supplied data, and Returned remains integer 0/1. The schema does not validate calendar dates or prevent overlapping loans. Document those limits and check them separately. A CHECK on cost rejects negative values, but does not make a positive estimate factually accurate.</p>"
    ],
    [
      "Join keys to obtain readable reports",
      "<p>A join matches related rows. ON names the key/reference relationship; aliases such as l and b shorten qualified field names. An inner join retains only matches. Borrowers with no loan have no row in an inner-joined loan report.</p><pre><code>SELECT l.LoanID, b.BorrowerLabel, e.EquipmentDescription, l.DueDate\nFROM Loan AS l\nINNER JOIN Borrower AS b ON l.BorrowerID = b.BorrowerID\nINNER JOIN Equipment AS e ON l.EquipmentID = e.EquipmentID\nWHERE l.Returned = 0\nORDER BY l.DueDate, l.LoanID;</code></pre><div class=\"table-scroll\"><table><tr><th>LoanID</th><th>BorrowerLabel</th><th>EquipmentDescription</th><th>DueDate</th></tr><tr><td>L001</td><td>Learner A</td><td>Camera</td><td>2026-04-06</td></tr><tr><td>L006</td><td>Learner D</td><td>Microphone</td><td>2026-04-07</td></tr><tr><td>L002</td><td>Learner B</td><td>Tripod</td><td>2026-04-08</td></tr><tr><td>L004</td><td>Learner C</td><td>Camera</td><td>2026-04-10</td></tr></table></div><p>L001 joins to B001 and E01. There are four active loan rows, not four distinct borrowers or item descriptions. A borrower may appear more than once. Omitting a join condition can combine unrelated rows; matching descriptions instead of identifiers is unreliable.</p><pre><code>SELECT l.LoanID, e.EquipmentID, c.CategoryName\nFROM Loan AS l\nINNER JOIN Equipment AS e ON l.EquipmentID = e.EquipmentID\nINNER JOIN Category AS c ON e.CategoryID = c.CategoryID\nORDER BY l.LoanID;</code></pre><div class=\"table-scroll\"><table><tr><th>LoanID</th><th>EquipmentID</th><th>CategoryName</th></tr><tr><td>L001</td><td>E01</td><td>Imaging</td></tr><tr><td>L002</td><td>E02</td><td>Support</td></tr><tr><td>L003</td><td>E03</td><td>Audio</td></tr><tr><td>L004</td><td>E04</td><td>Imaging</td></tr><tr><td>L005</td><td>E02</td><td>Support</td></tr><tr><td>L006</td><td>E05</td><td>Audio</td></tr></table></div><p>E02 occurs in two loan events, L002 and L005. Both belong in history. One equipment record can match several loans; this is expected rather than a duplicate item to delete.</p>"
    ],
    [
      "Summarise the right records",
      "<p>First decide what one input row represents. Inventory values should be calculated from Equipment, where each item occurs once. Joining Equipment to loan history first can count the same item repeatedly.</p><pre><code>SELECT COUNT(*) AS ItemCount, SUM(ReplacementCost) AS TotalCost,\n       AVG(ReplacementCost) AS MeanCost, MIN(ReplacementCost) AS LowestCost,\n       MAX(ReplacementCost) AS HighestCost\nFROM Equipment;</code></pre><div class=\"table-scroll\"><table><tr><th>ItemCount</th><th>TotalCost</th><th>MeanCost</th><th>LowestCost</th><th>HighestCost</th></tr><tr><td>5</td><td>1400</td><td>280.0</td><td>80</td><td>600</td></tr></table></div><p>These five costs total 1400; the mean is 280, with minimum 80 and maximum 600. COUNT(*) counts rows; COUNT(field) counts non-NULL values. SUM, AVG, MIN and MAX ignore NULL values. Keep numeric data numeric; averaging IDs has no useful interpretation.</p><pre><code>SELECT b.BorrowerID, b.BorrowerLabel, COUNT(*) AS LoanCount\nFROM Borrower AS b\nINNER JOIN Loan AS l ON b.BorrowerID = l.BorrowerID\nGROUP BY b.BorrowerID, b.BorrowerLabel\nORDER BY b.BorrowerID;</code></pre><div class=\"table-scroll\"><table><tr><th>BorrowerID</th><th>BorrowerLabel</th><th>LoanCount</th></tr><tr><td>B001</td><td>Learner A</td><td>2</td></tr><tr><td>B002</td><td>Learner B</td><td>2</td></tr><tr><td>B003</td><td>Learner C</td><td>1</td></tr><tr><td>B004</td><td>Learner D</td><td>1</td></tr></table></div><p>GROUP BY makes a separate summary for each borrower represented in loan history. List both displayed non-aggregate borrower fields in GROUP BY. It is an extension to support the report, not a reason to select arbitrary ungrouped fields.</p><pre><code>SELECT COUNT(*) AS ItemCount, SUM(ReplacementCost) AS TotalCost,\n       AVG(ReplacementCost) AS MeanCost, MIN(ReplacementCost) AS LowestCost,\n       MAX(ReplacementCost) AS HighestCost\nFROM Equipment WHERE CategoryID = &#x27;C99&#x27;;</code></pre><div class=\"table-scroll\"><table><tr><th>ItemCount</th><th>TotalCost</th><th>MeanCost</th><th>LowestCost</th><th>HighestCost</th></tr><tr><td>0</td><td>NULL</td><td>NULL</td><td>NULL</td><td>NULL</td></tr></table></div><p>An ungrouped aggregate still produces one summary row for empty input: COUNT is 0 and these other aggregates are NULL. NULL is not automatically zero. A GROUP BY query with no input groups returns no rows.</p>"
    ],
    [
      "Insert a new record deliberately",
      "<p>INSERT supplies a value for each named field. B005 is a fictional new borrower, absent from the original starter. Execute this exercise on a working copy; do not run the same insert twice expecting another borrower.</p><pre><code>INSERT INTO Borrower (BorrowerID, BorrowerLabel) VALUES (&#x27;B005&#x27;, &#x27;Learner E&#x27;);</code></pre><p>After insertion, selecting B005 shows one row and there are five borrowers. Reusing B005 fails the primary-key constraint. Adding a Loan with B999 fails the foreign-key constraint when enforcement is enabled. Existing item/borrower references must be valid before a new loan is inserted.</p>"
    ],
    [
      "Update the intended row and check it",
      "<p>Preview the target using SELECT, then use the same key condition for the change. L001 has Returned = 0 initially; the desk has confirmed that item was returned.</p><pre><code>SELECT LoanID, Returned FROM Loan WHERE LoanID = &#x27;L001&#x27;;\nUPDATE Loan SET Returned = 1 WHERE LoanID = &#x27;L001&#x27;;\nSELECT LoanID, Returned FROM Loan WHERE LoanID = &#x27;L001&#x27;;</code></pre><p>Expected before/after: L001 changes from 0 to 1. Other loan rows stay unchanged; active loan count falls from four to three. An UPDATE without WHERE affects every row. A valid statement can match zero rows, so inspect the result rather than assuming success.</p>"
    ],
    [
      "Delete only the disposable test record",
      "<p>In this rehearsal, B005 is a disposable borrower with no loans. Confirm the target, delete it and check it is gone.</p><pre><code>SELECT * FROM Borrower WHERE BorrowerID = &#x27;B005&#x27;;\nDELETE FROM Borrower WHERE BorrowerID = &#x27;B005&#x27;;\nSELECT * FROM Borrower WHERE BorrowerID = &#x27;B005&#x27;;</code></pre><p>The final query returns no rows. DELETE without WHERE removes every row allowed by the constraints. Deleting referenced B001 is rejected by this starter’s foreign-key policy; do not disable enforcement to make it succeed. Deleting a returned loan would erase history, so the desk’s routine return operation updates Returned instead.</p>"
    ],
    [
      "Rehearse and recover with a transaction",
      "<p>Open a fresh project copy with no active transaction. Run the provided rehearsal a statement at a time so you can inspect changes. BEGIN starts the group; ROLLBACK undoes its changes. The supplied script ends with ROLLBACK to restore the starting records.</p><pre><code>-- Run in a working project copy, outside an existing transaction.\nPRAGMA foreign_keys = ON;\nBEGIN;\nINSERT INTO Borrower (BorrowerID, BorrowerLabel) VALUES (&#x27;B005&#x27;, &#x27;Learner E&#x27;);\nSELECT * FROM Borrower WHERE BorrowerID = &#x27;B005&#x27;;\nSELECT LoanID, Returned FROM Loan WHERE LoanID = &#x27;L001&#x27;;\nUPDATE Loan SET Returned = 1 WHERE LoanID = &#x27;L001&#x27;;\nSELECT LoanID, Returned FROM Loan WHERE LoanID = &#x27;L001&#x27;;\nDELETE FROM Borrower WHERE BorrowerID = &#x27;B005&#x27;;\nSELECT COUNT(*) AS RemainingTestBorrowers FROM Borrower WHERE BorrowerID = &#x27;B005&#x27;;\nROLLBACK;\n-- Original four borrowers and L001 Returned = 0 are restored.\n</code></pre><p>COMMIT would keep successful changes. Only use it when the intended before/after checks pass. If a statement fails during practice, stop and ROLLBACK an active transaction; do not assume every error automatically undoes earlier successful statements. Some tools manage transactions themselves, so confirm their behaviour.</p><p>A transaction is not a backup of earlier committed work. Keep a known-good closed database copy and test restoring it. Do not copy a database file casually while another connection is writing.</p>"
    ],
    [
      "Test against requirements, then transfer",
      "<p>Build a test log with requirement, input/action, expected outcome, actual evidence and pass/fail. Include normal cases, boundaries, invalid references, duplicate IDs, negative costs, an empty report and a recovery check. Use fresh copies or roll back between tests so one change does not silently alter another test’s starting state.</p><p>Independent report: list active loans with LoanID, BorrowerLabel, EquipmentID, CategoryName and DueDate, oldest first; then show inventory totals for each category. Explain why the inventory summary must not count loan events.</p><p>Transfer: add an unused synthetic borrower in a transaction. Predict whether the inner-join borrower count report will display them, check the prediction, then roll back. It will omit them because no Loan row matches. Reporting every borrower including zero-loan borrowers would require a different query design.</p>"
    ],
    [
      "Launch, document and evaluate the project",
      "<p><a href=\"database-project-brief.md\" download>Student project brief</a> · <a href=\"database-project-workbook.md\" download>Practice workbook</a> · <a href=\"database-project-answers.md\" download>Explained answers and teacher checkpoints</a> · <a href=\"database-project-test-log.csv\" download>Test-log template</a></p><p>Submit a four-table database, creation/data SQL, ER diagram and data dictionary, saved report queries, before/after evidence for modifications, tests and an evaluation against your acceptance criteria. A GUI or Python interface is optional; the core task is the database.</p><p>Week 7: confirm requirements, review the design, create/load the database and demonstrate the first report. Weeks 8–10: use two workshops each week to build reports, practise controlled changes and apply taught security controls. Weeks 11–12: use two each week to test, recover, document and evaluate. No extra major project or compulsory homework is assumed.</p><p>The starter schema is a worked scaffold. For the creation skill, students must run and explain their own creation script and justify any adaptations, rather than submitting only a supplied file. Privacy/security design decisions are revisited after explicit security lessons. This brief is formative and teacher review remains pending; no official assessment weighting is assigned.</p><p>Technical references: <a href=\"https://www.sqlite.org/lang_aggfunc.html\">SQLite aggregates</a>, <a href=\"https://www.sqlite.org/lang_transaction.html\">transactions</a>, <a href=\"https://www.sqlite.org/foreignkeys.html\">foreign keys</a> and the <a href=\"https://senior-secondary.scsa.wa.edu.au/__data/assets/pdf_file/0020/1232507/Computer-Science-ATAR-Year-11-Syllabus-for-teaching-from-2026.PDF\">2026 Year 11 syllabus</a>.</p>"
    ]
  ],
  "practice": [
    [
      "Trace",
      "Why can E02 appear twice in the history report?",
      "L002 and L005 are different loan events linked to the same equipment item. A one-to-many match is expected."
    ],
    [
      "Explain",
      "Why calculate inventory value directly from Equipment?",
      "Each equipment item occurs once there. Joining to loan history can repeat items and distort totals."
    ],
    [
      "Predict",
      "What happens to the borrower report when B005 has no loans?",
      "The inner-join report omits B005 because it has no matching Loan row."
    ],
    [
      "Distinguish",
      "What is the difference between COUNT(*) and COUNT(field)?",
      "COUNT(*) counts result rows; COUNT(field) excludes rows where that field is NULL."
    ],
    [
      "Recover",
      "Does a failed statement guarantee that earlier changes have been undone?",
      "No. Stop, inspect the transaction state and roll back an active practice transaction. The rehearsal explicitly ends with ROLLBACK."
    ]
  ],
  "task": "Complete the workbook, then launch the project using the brief. Demonstrate a joined report, an inventory summary, checked modifications and recovery. Supply ER/data dictionary documentation and a test log with actual evidence.",
  "solution": "The original active report has four rows. Inventory summary is five items, total 1400, mean 280, minimum 80 and maximum 600. Updating L001 to Returned = 1 leaves three active loans. The B005 insert/delete rehearsal ends with rollback, restoring four borrowers and L001 Returned = 0. Keep report evidence and project changes separate from the untouched starter.",
  "recap": "Design around requirements and keys. Join related records deliberately, aggregate at the intended level, check each data change and rehearse recovery. A working query is evidence only when its result matches the requirement.",
  "lessons": [
    "Week 5, lesson 1: trace key matches; build the active-loan inner join.",
    "Week 5, lesson 2: join categories; diagnose missing/wrong matches.",
    "Week 5, lesson 3: aggregate inventory; distinguish row counts and numeric summaries.",
    "Week 5, lesson 4: independent joined/category reports and feedback.",
    "Week 6, lesson 1: inspect creation SQL; run it in a new database; test keys/checks.",
    "Week 6, lesson 2: INSERT and UPDATE with before/after evidence.",
    "Week 6, lesson 3: DELETE disposable records; transaction/recovery rehearsal.",
    "Week 6, lesson 4: controlled SQL practice; explain and repair errors.",
    "Week 7, lesson 1: project requirements and acceptance criteria.",
    "Week 7, lesson 2: ER diagram/data dictionary and design checkpoint.",
    "Week 7, lesson 3: create/load a working database and first reports.",
    "Week 7, lesson 4: demonstrate the initial build and plan the ten later workshops."
  ],
  "reference": "https://www.sqlite.org/lang_select.html",
  "refTitle": "SQLite SELECT and join reference",
  "next": "#plan-2-5",
  "quiz": {
    "q": "Where should the total replacement cost of the five inventory items be calculated?",
    "options": [
      "From Equipment, with one row per item",
      "From Loan history, summing every joined event",
      "From borrower labels using AVG"
    ],
    "answer": 0,
    "explanation": "Inventory value concerns equipment items. Loan history can repeat an item, so summing after that join can count it more than once."
  }
});
chapters.find(c=>c.id==='sql-basics').next='#database-solution';

chapters.push({
  "id": "security-threats",
  "unit": 2,
  "week": "8–11",
  "title": "Threats and protective measures",
  "badge": "CYBER SECURITY",
  "intro": "Analyse what could go wrong, explain the evidence and choose controls that fit the mechanism. Apply security frameworks to the equipment desk and compare historical ciphers with modern encryption.",
  "objectives": [
    "Use CIA to explain security impacts and AAA to audit access.",
    "Distinguish the named network threats and malware types.",
    "Justify layered controls, authentication and encryption choices.",
    "Use rotation, random substitution and Vigenère ciphers with stated conventions.",
    "Record evidence and limitations in the database project."
  ],
  "sections": [
    [
      "Begin with assets, threats and evidence",
      "<p>The equipment desk depends on accurate loan records, controlled access and an available database. An asset is something valuable; a threat can cause harm; a vulnerability is a weakness; risk considers likelihood and consequence. An incident is an event affecting security. A failed login or suspicious message is evidence to analyse, not automatic proof of a breach.</p><p>State what is known, what is inferred and what is still uncertain. Accidental deletion and a power failure can affect security goals even without a malicious attacker.</p>"
    ],
    [
      "Analyse harm using the CIA triad",
      "<div class=\"table-scroll\"><table><tr><th>Goal</th><th>Meaning</th><th>Desk example</th></tr><tr><td>Confidentiality</td><td>Information is accessible only to those authorised to see it.</td><td>A loan export is disclosed to an unauthorised person.</td></tr><tr><td>Integrity</td><td>Information and systems are protected against unauthorised alteration or destruction.</td><td>A loan is falsely marked returned.</td></tr><tr><td>Availability</td><td>Authorised users can access the needed service/data when required.</td><td>The desk cannot open the database.</td></tr></table></div><p>One event can affect several goals. Ransomware can remove availability; stolen data can also affect confidentiality. Explain the particular consequence rather than assigning exactly one letter to every threat. Accurate-looking data is not proof that access was authorised.</p>"
    ],
    [
      "Audit access using AAA",
      "<div class=\"table-scroll\"><table><tr><th>Part</th><th>Question</th><th>Evidence/control</th></tr><tr><td>Authentication</td><td>Who or what is requesting access?</td><td>Individual sign-in and appropriate factors.</td></tr><tr><td>Authorisation</td><td>What is that identity permitted to do?</td><td>Clerk may maintain loans; reviewer may read reports.</td></tr><tr><td>Accounting</td><td>What activity is recorded for accountability?</td><td>Identity, action, target, outcome and time in protected logs.</td></tr></table></div><p>AAA accounting is activity tracking, not financial bookkeeping. Successful authentication does not grant unlimited permission. Shared accounts weaken attribution. Logs support investigation but need access controls, reliable time and review; avoid recording passwords or unnecessary personal data.</p><p>The classroom SQLite file does not automatically provide per-user roles, application login or an audit trail. File permissions and the surrounding application/service matter. Describe a control as implemented only when there is evidence.</p>"
    ],
    [
      "Distinguish people, network and application threats",
      "<div class=\"table-scroll\"><table><tr><th>Threat</th><th>Distinguishing mechanism</th><th>Scenario</th><th>Protective measure and limit</th></tr><tr><td>Social engineering / phishing</td><td>Manipulates a person into revealing information or taking an unsafe action; phishing uses deceptive messages or sites.</td><td>Fake equipment-desk sign-in request.</td><td>Independent verification, reporting practice and MFA; training alone does not eliminate deception.</td></tr><tr><td>Denial of service</td><td>Exhausts or disrupts resources so legitimate users cannot use a service; distributed DoS involves multiple sources.</td><td>Loan portal overwhelmed by requests.</td><td>Traffic filtering/rate limits and provider support; ordinary backups do not keep the live service reachable.</td></tr><tr><td>Back door</td><td>A concealed or unintended route that bypasses normal access controls.</td><td>Undocumented maintenance account bypasses normal login.</td><td>Remove unnecessary access paths, review accounts/configuration and monitor use.</td></tr><tr><td>IP spoofing</td><td>Falsifies a packet’s source IP address; this does not prove the sender can receive replies or has authenticated.</td><td>Traffic claims to come from a trusted address.</td><td>Use authenticated communication and appropriate ingress/egress filtering; do not treat an IP address alone as identity.</td></tr><tr><td>SQL injection</td><td>Untrusted input is treated as SQL structure by an application.</td><td>A search form builds a query by concatenating input.</td><td>Parameterised statements and least database privilege; field validation is an additional check.</td></tr><tr><td>Man-in-the-middle</td><td>An intermediary intercepts and may alter communication between parties.</td><td>A false network intermediary relays portal traffic.</td><td>Authenticated encrypted connections, verified endpoints and certificate checks.</td></tr><tr><td>Cross-site scripting (XSS)</td><td>Untrusted content becomes executable script in a user’s browser through a vulnerable application.</td><td>A portal displays submitted notes as active page content.</td><td>Context-appropriate output encoding, safe DOM/template practices and sanitisation where HTML is allowed. SQL parameters do not prevent browser script execution.</td></tr></table></div><p>Mechanism distinguishes SQL injection from XSS: one changes database commands; the other executes content in a browser. IP spoofing is about an address claim; it is not equivalent to logging in. A back door can enable access without the normal route.</p>"
    ],
    [
      "Distinguish malware, physical threats and new flaws",
      "<div class=\"table-scroll\"><table><tr><th>Type</th><th>Distinguishing feature</th><th>Scenario</th><th>Protective measure and limit</th></tr><tr><td>Virus</td><td>Malicious code attaches to a host such as a file/program and spreads when the host executes.</td><td>Infected program copied between desk devices.</td><td>Trusted software, updates and endpoint protection.</td></tr><tr><td>Worm</td><td>Malware that can propagate between systems without attaching to a host file.</td><td>Malware spreads between vulnerable devices.</td><td>Patching, segmentation and endpoint protection.</td></tr><tr><td>Trojan horse</td><td>Malicious software disguised as a useful or legitimate program; the label describes deception, not self-replication.</td><td>Fake inventory utility installs unwanted code.</td><td>Approved software sources, application controls and limited privilege.</td></tr><tr><td>Spyware</td><td>Covertly collects information or monitors activity.</td><td>Software records desk activity or credentials.</td><td>Endpoint protection, permissions review and trusted software.</td></tr><tr><td>Adware</td><td>Software that displays advertising; unwanted or malicious variants can track users or disrupt work.</td><td>Unwanted advertising bundled with a utility.</td><td>Review installations, permissions and trusted sources; not every advertising-supported application is malware.</td></tr><tr><td>Ransomware</td><td>Malware that blocks access, often by encrypting data, and demands payment; attacks may also steal data.</td><td>Loan database becomes unreadable and an extortion message appears.</td><td>Prevention controls plus protected, tested backups and an incident plan; restoring data does not undo a disclosure.</td></tr><tr><td>Physical security threat</td><td>Physical access, theft, damage or environmental disruption can compromise a system.</td><td>Unlocked desk laptop is stolen; a power loss interrupts service.</td><td>Restricted access, locked storage, screen locks, suitable power protection and recovery arrangements.</td></tr><tr><td>Zero-day vulnerability</td><td>A previously unknown vulnerability may be exploited before defenders have a practical fix. It is a weakness, not a malware category.</td><td>A newly disclosed application flaw has no patch available yet.</td><td>Reduce exposure, use temporary mitigations and monitoring, then apply a verified fix when available.</td></tr></table></div><p>Labels can overlap: a Trojan may install spyware or ransomware. Virus and worm describe spread; ransomware describes a harmful outcome. Zero-day describes vulnerability timing. Identify the feature stated in the scenario and justify it.</p>"
    ],
    [
      "Choose layers of protection",
      "<p>Match the control to the mechanism and the goal. Preventive controls reduce opportunity; detective controls reveal events; corrective/recovery controls help restore operations. A backup helps recovery, but does not stop phishing or erase disclosed data.</p><div class=\"table-scroll\"><table><tr><th>Control</th><th>Useful purpose</th><th>Remaining limit</th></tr><tr><td>Updates and trusted software</td><td>Reduce known flaws and unwanted code.</td><td>No guarantee against an unknown vulnerability.</td></tr><tr><td>Least privilege and separate roles</td><td>Limit permitted actions and potential damage.</td><td>An authorised user can still make a mistake.</td></tr><tr><td>Monitoring and protected logs</td><td>Detect unusual activity and support investigation.</td><td>Logs need review; alerts can be incomplete.</td></tr><tr><td>Protected backups and restore tests</td><td>Recover usable data after loss.</td><td>Recent changes may be lost; disclosure remains.</td></tr><tr><td>Physical controls and device protection</td><td>Reduce theft and unauthorised physical access.</td><td>Signed-in/unlocked devices may expose usable data.</td></tr><tr><td>Authenticated encrypted communication</td><td>Reduce interception/alteration in transit.</td><td>A compromised endpoint or deceived user is still a risk.</td></tr></table></div><p>For the project, prioritise controls using the asset and plausible impact. State cost, usability and residual risk. Do not promise that a firewall, encryption or antivirus prevents every threat.</p>"
    ],
    [
      "Protect authentication and set a useful policy",
      "<p>Use long, unique passwords/passphrases; avoid predictable personal details and reuse. A password manager can help manage unique credentials. An organisational policy should address enrolment, minimum requirements, MFA, account recovery, suspected compromise and account removal, rather than relying only on a complexity slogan.</p><p>Two-factor authentication combines two different factor categories: something known, held or inherent to the person. A password and PIN are both knowledge factors. A password plus an appropriately bound device-based authenticator can combine knowledge and possession. MFA reduces risks but recovery weaknesses and deception can still matter.</p><p>Biometrics use characteristics such as a fingerprint. Consider false acceptance/rejection, accessibility and protection of biometric templates; biological traits are hard to replace after exposure. Do not collect classmates’ passwords or biometric samples for this activity. Modern policy choices should be justified against current guidance rather than assuming frequent forced password changes solve every problem.</p><p>Reference: <a href=\"https://www.cyber.gov.au/learn-basics/explore-basics/passphrases\">ASD passphrase guidance</a>.</p>"
    ],
    [
      "Explain encryption and key roles",
      "<p>Cryptography provides techniques for protecting information. Encryption transforms plaintext into ciphertext using an algorithm and key; decryption recovers it with the appropriate key. Encoding a file format is not encryption. Hashing is a different, one-way operation rather than reversible encryption.</p><div class=\"table-scroll\"><table><tr><th>Approach</th><th>Key relationship</th><th>Example reasoning</th></tr><tr><td>Symmetric encryption</td><td>The same secret key is used to encrypt and decrypt.</td><td>Suitable for bulk data, but the shared secret must be protected/distributed securely.</td></tr><tr><td>Asymmetric/public-key encryption</td><td>A related public/private key pair has different roles.</td><td>For confidentiality to a recipient, encrypt with their verified public key; the recipient decrypts with their private key.</td></tr></table></div><p>Keep private keys private; verify who a public key belongs to. Digital signatures use different operations to support authenticity/integrity and do not simply mean keeping the message secret. Real protocols can combine asymmetric key establishment/authentication with symmetric data encryption.</p><p>Encryption at rest and in transit protect different situations. Encryption does not automatically provide authorisation, safe input handling, backups or every form of integrity protection. Historical ciphers below are learning tools, not protection for the project database.</p>"
    ],
    [
      "Use a rotation cipher with explicit conventions",
      "<p>Use uppercase A–Z with A = 0 through Z = 25. Remove spaces/punctuation for these exercises. A forward shift k encrypts using (letter number + k) mod 26; subtract k to decrypt. This is a substitution cipher with a fixed rotation.</p><pre><code>Plaintext:  LOAN\nKey shift:  3\nCiphertext: ORDQ\nTrace: L(11)+3=O(14); O(14)+3=R(17);\n       A(0)+3=D(3); N(13)+3=Q(16)</code></pre><p>Wrap-around: Z with shift 3 becomes C. Decrypt ORDQ using shift 3 to recover LOAN. With 26 letters there are only 26 possible shifts including 0, so trying each is feasible. A short result may need context to identify the intended plaintext.</p>"
    ],
    [
      "Use a random substitution and compare patterns",
      "<p>A monoalphabetic random substitution uses one shuffled alphabet as a one-to-one mapping. The mapping below is fixed for this exercise; each plaintext letter always maps to the same ciphertext letter.</p><pre><code>Plain:  ABCDEFGHIJKLMNOPQRSTUVWXYZ\nCipher: QWERTYUIOPASDFGHJKLZXCVBNM\nLOAN → SGQF</code></pre><p>Decrypt by reversing the mapping, not by applying it again. It has far more possible keys than a rotation cipher, but repeated letters and language patterns remain. Frequency analysis compares observed letter/pattern frequencies with plausible language patterns; the most common ciphertext symbol is not guaranteed to mean E, especially in short messages.</p>"
    ],
    [
      "Use a polyalphabetic cipher",
      "<p>In a Vigenère exercise, repeat a keyword to supply a different shift at each position. Use A = 0, the same uppercase letters-only convention, and a forward shift for encryption.</p><pre><code>Plaintext:  LOAN\nRepeated key: KEYK\nShifts:       10 4 24 10\nCiphertext:  VSYX</code></pre><p>Subtract each corresponding key shift to decrypt. A plaintext letter can encrypt differently at different positions. This weakens simple single-alphabet frequency analysis, but a repeated key creates patterns that can be analysed; historical Vigenère is not modern secure encryption.</p><p>Practise: rotate RETURN by 5; apply the supplied substitution to LOAN; encrypt DATA with key KEY (repeat as KEYK). Explain brute force versus frequency analysis using these conventions.</p>"
    ],
    [
      "Work through an incident using evidence",
      "<p>The desk finds an unapproved return-status change. Everyone shares a login and no application audit trail exists. Known: the value changed and attribution is weak. Unknown: who changed it, whether it was intentional and whether any data was disclosed.</p><p>CIA: integrity is affected. AAA: shared authentication and missing accounting make attribution weak; review whether authorisation allowed too many people to edit. Proposed controls: individual accounts, limited modification roles, protected change records and periodic reconciliation.</p><p>Verify against a known record, preserve relevant evidence and follow the school’s reporting process. An affected system may need controlled isolation by authorised staff. Record the justified response and limitations; do not accuse someone from an IP address or timestamp alone.</p>"
    ],
    [
      "Apply the controls to the database project",
      "<p>In the two project workshops each week, turn the security reasoning into evidence: identify assets/roles, list allowed actions, protect a known-good backup and test restoration in a separate copy. Mark controls as implemented, tested or proposed.</p><p>For a file-based SQLite project, explain who can read/copy/modify the file under the actual environment. A decorative login screen does not stop someone opening an accessible database file directly. If extending with Python, pass values through query parameters; do not concatenate input into SQL structure.</p><pre><code>cursor.execute(\n    \"SELECT LoanID FROM Loan WHERE BorrowerID = ?\",\n    (borrower_id,)\n)</code></pre><p>This SQLite Python example binds one value. It does not parameterise table names or implement authorisation. For a web extension, render untrusted text safely for its output context; parameterised SQL does not stop XSS.</p>"
    ],
    [
      "Practise on the scenario pack",
      "<p><a class=\"button\" href=\"security-workbook.md\" download>Download student workbook</a> <a class=\"button secondary\" href=\"security-answers.md\" download>Download explained answers</a></p><p><a href=\"security-scenarios.csv\" download>Eight incident scenarios</a> · <a href=\"security-risk-register.csv\" download>Risk/control template</a> · <a href=\"security-cipher-workbook.md\" download>Cipher exercises</a> · <a href=\"security-pack.zip\" download>Complete security pack</a></p><p>For each scenario: name the mechanism, cite the evidence, explain CIA impact, apply AAA where relevant, propose a matching control and state a limitation. Keep uncertainty visible. These are synthetic desk exercises using paper or local sample files; no live-system attacks are required.</p><p>Weeks 8–11 use two explicit security lessons and two project workshops per week. Week 12 continues with responsible data use, privacy and ethical hacking; this chapter does not establish full Unit 2 coverage.</p><p>Source checks: <a href=\"https://senior-secondary.scsa.wa.edu.au/__data/assets/pdf_file/0020/1232507/Computer-Science-ATAR-Year-11-Syllabus-for-teaching-from-2026.PDF\">2026 SCSA Year 11 syllabus</a>, <a href=\"https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html\">OWASP SQL injection prevention</a>, <a href=\"https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html\">OWASP XSS prevention</a> and <a href=\"https://pages.nist.gov/800-63-4/sp800-63/glossary/\">NIST terminology</a>.</p>"
    ]
  ],
  "practice": [
    [
      "Distinguish",
      "Is a password plus a PIN necessarily two-factor authentication?",
      "No. Both are knowledge factors. Two-factor authentication needs two distinct categories."
    ],
    [
      "Analyse",
      "Does ransomware necessarily prove that information was stolen?",
      "No. Availability may be affected by encryption. Confidentiality requires evidence of access/disclosure; some ransomware attacks also steal data."
    ],
    [
      "Explain",
      "Why does parameterised SQL not prevent every XSS flaw?",
      "SQL parameters keep values separate from database commands. XSS concerns unsafe execution of content in a browser and requires suitable output handling."
    ],
    [
      "Audit",
      "Does a successful login prove the user may delete loan history?",
      "No. Authentication checks identity; authorisation determines permitted actions. Accounting records activity."
    ],
    [
      "Compare",
      "Why is the shuffled substitution alphabet still vulnerable?",
      "One mapping preserves repeated-letter and language patterns. Frequency analysis can exploit them; short texts can remain ambiguous."
    ]
  ],
  "task": "Analyse four unfamiliar scenarios and complete the cipher exercises. For the database project, produce an asset/role/control register and demonstrate a restore using a separate sample copy. Label implemented, tested and proposed controls, with evidence and residual risk.",
  "solution": "A justified response connects mechanism → asset and CIA impact → relevant AAA weakness → matching control → limitation. Shared credentials weaken attribution; a clean backup supports recovery but cannot undo disclosure. Cipher checks: LOAN/shift 3 gives ORDQ; RETURN/shift 5 gives WJYZWS; supplied substitution LOAN gives SGQF; DATA/key KEY gives NERK.",
  "recap": "Explain mechanisms and evidence before choosing controls. CIA describes security goals; AAA separates identity, permission and activity records. Layers reduce risk without guaranteeing safety. Classroom substitution ciphers reveal patterns and are not suitable for protecting real records.",
  "lessons": [
    "Week 8, lesson 1: asset/threat/vulnerability/risk; CIA incident analysis.",
    "Week 8, lesson 2: AAA audit of shared accounts; define roles and evidence. Lessons 3–4 are project workshops.",
    "Week 9, lesson 1: compare people/network/application threats using mechanism cards.",
    "Week 9, lesson 2: malware/physical/zero-day scenarios; justify controls and limits. Lessons 3–4 are project workshops.",
    "Week 10, lesson 1: password policy, two-factor categories and biometric trade-offs.",
    "Week 10, lesson 2: symmetric/asymmetric encryption and key roles. Lessons 3–4 are project workshops.",
    "Week 11, lesson 1: trace rotation and random-substitution ciphers; brute force and frequency reasoning.",
    "Week 11, lesson 2: Vigenère transfer and explained corrections. Lessons 3–4 are project testing/recovery workshops."
  ],
  "reference": "https://www.cyber.gov.au/guidance/learn-about-ransomware",
  "refTitle": "ASD ransomware guidance",
  "next": "#plan-2-6",
  "quiz": {
    "q": "An authorised account reads reports but is blocked from changing loans. Which AAA component determines that restriction?",
    "options": [
      "Authentication",
      "Authorisation",
      "Accounting"
    ],
    "answer": 1,
    "explanation": "Authorisation defines permitted actions. Authentication checks identity and accounting records activity."
  }
});
chapters.find(c=>c.id==='database-solution').next='#security-threats';

chapters.push({
  "id": "responsible-data",
  "unit": 2,
  "week": 12,
  "title": "Responsible data use",
  "badge": "PRIVACY / ETHICS",
  "intro": "Justify what you collect, who may use it and how it is protected. Distinguish ethical testing from unauthorised activity, then evaluate the database project using evidence.",
  "objectives": [
    "Distinguish privacy, security, ethical and legal decisions.",
    "Recognise personal/sensitive information and re-identification risks.",
    "Apply selected APPs as a course lens while identifying jurisdiction limits.",
    "Explain authorisation and scope in ethical hacking/penetration testing.",
    "Evaluate project criteria using actual evidence and stated limitations."
  ],
  "sections": [
    [
      "Separate privacy, security, ethics and law",
      "<p>Privacy concerns how information about people is collected, used, disclosed and controlled. Security protects information and systems. Ethics asks whether a decision is fair, justified and responsible. Law sets obligations in a particular context. A secure system can still collect too much information or use it unfairly.</p><p>For the equipment desk, start with purpose: record and manage item loans. Ask which people are affected, what information is needed, who will see it and how someone can challenge an error. A technically valid record or successful query does not settle those questions.</p>"
    ],
    [
      "Recognise personal and sensitive information",
      "<p>Personal information relates to an identified person or someone reasonably identifiable in the circumstances; a name is not the only route to identification. A borrower ID linked to a school roster, exact dates or a distinctive pattern can identify a person. Some categories, including health information and certain biometric information, receive additional protection as sensitive information.</p><p>The book’s Learner A–E records are invented for teaching. Replacing real names with labels would instead be pseudonymisation if people remain identifiable through a mapping or context. Removing names alone does not establish de-identification.</p><p>Before release, consider combinations, linkage and small groups. A public report about one rare item borrower may reveal someone even without a name. For this classroom project, use genuinely synthetic examples rather than a disguised real student register.</p><p>Reference: <a href=\"https://www.oaic.gov.au/privacy/your-privacy-rights/your-personal-information/what-is-personal-information\">OAIC personal information explanation</a>.</p>"
    ],
    [
      "Know the Privacy Act and the course context",
      "<p>The federal Privacy Act 1988 governs personal-information handling by covered entities; the APPs are its principles-based framework. The syllabus requires the Privacy Act and APPs, but applicability depends on the organisation. Do not assume every Australian school falls under the same legislation.</p><p>OAIC explains that state/local government agencies, including public schools, are generally outside this federal Act. WA public-sector handling is subject to its own framework. A private school, service provider or other organisation needs its own coverage analysis.</p><p>WA context checked 13 October 2026: most substantive privacy provisions of the Privacy and Responsible Information Sharing Act 2024, including IPPs, commenced on 1 July 2026. Transitional rules differ by obligation and collection date. WA guidance states that the notifiable information breach provisions commence on 1 January 2027. This is separate from the federal APP framework and does not postpone internal incident reporting.</p><p>For an operational school decision, use current Department/school procedures and authorised privacy/records advice. Do not infer authority to disclose or dispose of records from a classroom APP exercise.</p><p>Sources: <a href=\"https://www.oaic.gov.au/privacy/your-privacy-rights/more-privacy-rights/government-agencies\">OAIC government-agency coverage</a> and <a href=\"https://www.wa.gov.au/organisation/office-of-the-information-commissioner/personal-information-collected-and-after-1-july-2026\">WA transition guidance</a>. Recheck before reusing this dated legal-context note.</p>"
    ],
    [
      "Apply selected APPs to design decisions",
      "<div class=\"table-scroll\"><table><tr><th>Course lens</th><th>Question to ask</th><th>Desk decision</th></tr><tr><td>APP 1</td><td>Make handling practices transparent.</td><td>Provide an understandable policy and a way to raise concerns.</td></tr><tr><td>APP 3</td><td>Justify necessary collection; sensitive information has additional rules.</td><td>Do not add medical notes merely because a field is available.</td></tr><tr><td>APP 5</td><td>Explain relevant collection details.</td><td>State purpose and intended recipients before collecting.</td></tr><tr><td>APP 6</td><td>Limit use/disclosure to permitted purposes and exceptions.</td><td>A loan register is not automatically a marketing list.</td></tr><tr><td>APP 8</td><td>Consider obligations for overseas disclosure.</td><td>Check a service and data flow before sending records offshore.</td></tr><tr><td>APP 10</td><td>Take reasonable steps about information quality.</td><td>Check a return status before relying on it.</td></tr><tr><td>APP 11</td><td>Protect data; assess lawful retention and disposal.</td><td>Restrict access and test backups; retention exceptions matter.</td></tr><tr><td>APPs 12–13</td><td>Provide access/correction subject to applicable rules.</td><td>Use an authorised request process rather than an informal public edit.</td></tr></table></div><p>This is a selected study guide, not the full thirteen principles or their exceptions. Read the <a href=\"https://www.oaic.gov.au/privacy/australian-privacy-principles/read-the-australian-privacy-principles\">official APP text</a> when checking a legal requirement. Consent is not a universal substitute for lawful purpose, appropriate collection or security.</p><p>APP 11 includes reasonable security steps. Its disposal/de-identification requirement has conditions and exceptions, including Commonwealth records and legally required retention. The WA records framework also imposes retention/disposal requirements. Do not translate “minimise retention” into “delete everything”.</p><p>Source: <a href=\"https://www.wa.gov.au/organisation/state-records-office-of-western-australia/privacy-and-responsible-information-sharing-act-2024-and-record-keeping-obligations\">WA State Records Office privacy and recordkeeping guidance</a>.</p>"
    ],
    [
      "Follow the data through its lifecycle",
      "<p>Map collection → storage → use → disclosure → retention/disposal. Include exports, screenshots, backups and external tools, not just the database file.</p><div class=\"table-scroll\"><table><tr><th>Stage</th><th>Decision and evidence</th></tr><tr><td>Collection</td><td>Record purpose and why each field is needed; use synthetic classroom data.</td></tr><tr><td>Storage</td><td>List who can read/change files; protect copies and credentials.</td></tr><tr><td>Use</td><td>State allowed tasks and check records before decisions.</td></tr><tr><td>Disclosure</td><td>Verify recipient, purpose, authority and approved channel/service.</td></tr><tr><td>Retention/disposal</td><td>Record the applicable approved schedule/process, including copies and exceptions.</td></tr><tr><td>Access/correction</td><td>Explain how requests are routed and how changes preserve accountability.</td></tr></table></div><p>A backup is another copy requiring access and retention controls. An overseas service question requires examining the actual data flow and applicable obligations, not assuming a product name proves where data is handled.</p>"
    ],
    [
      "Work through a disclosure decision",
      "<p>The desk wants to publish a screenshot showing that its overdue report works. It contains borrower identifiers and exact dates. Known: the report can demonstrate the query. Risk: the audience may identify real borrowers or treat a false status as fact.</p><p>For the textbook/class demo, regenerate the report using invented records. Keep evidence of the query and expected outputs while avoiding real personal information. Before any operational release, check purpose, audience, identifiability, authority and applicable policy. Encryption of the upload would protect transport but would not authorise the disclosure.</p><p>A strong answer explains the benefit, affected people, evidence and less intrusive alternative. It does not claim that deleting one name column automatically makes the export safe.</p>"
    ],
    [
      "Explain ethical hacking and penetration testing",
      "<p>Ethical security testing aims to find and reduce weaknesses within valid authorisation. Penetration testing uses agreed techniques to examine whether weaknesses can be exploited and what the impact would be, then reports findings for remediation. It is not permission to explore every reachable system.</p><p>Before testing, establish who can authorise the work, the exact systems/data in scope, permitted methods, timing, limits, stop conditions, contacts and evidence handling. A peer’s permission or a claim of good intentions does not substitute for the responsible owner’s authority. Third-party systems need their own applicable authority.</p><p>Unauthorised access or activity outside agreed scope can be unethical and unlawful even if intended to help. If an unexpected issue falls outside scope, stop that line of testing and report through the agreed route. Testing results are limited to scope/time; passing does not prove that no vulnerability exists.</p><p>Reference: <a href=\"https://www.cyber.gov.au/ism/2026-09/guidelines-for-security-assurance\">ASD security-assurance guidance</a>.</p>"
    ],
    [
      "Practise an authorisation review",
      "<p>Use the downloadable scope exercise: a teacher-owned local training app, invented borrower records, read-only review of provided configuration and logs, and checks using supplied accounts. Production systems, other students’ devices, real credentials and disruptive techniques are excluded. The document is a discussion exercise, not an actual permission grant.</p><p>Decide whether each proposed action is within that scope. Explain the authority and condition, not merely whether the action sounds useful. Scanning the production portal is outside scope; reviewing a supplied training log is within scope. Publishing the log externally needs separate disclosure authority.</p><p>A report should record scope, evidence, impact, limitations and recommended remediation without collecting more information than needed. Follow the owner’s reporting route rather than publicly exposing a weakness or identifying affected people.</p>"
    ],
    [
      "Evaluate the database with evidence",
      "<p>Return to each acceptance criterion in the project brief. Record met, partly met or not met, with evidence and a realistic improvement. Use actual query outputs, test logs, schema/diagram comparisons and recovery checks.</p><div class=\"table-scroll\"><table><tr><th>Criterion</th><th>Evidence to inspect</th><th>Possible limitation</th></tr><tr><td>Reports</td><td>Joined outputs and expected rows/order.</td><td>Unmatched borrowers are omitted by an inner join.</td></tr><tr><td>Data changes</td><td>Targeted before/after records and rollback check.</td><td>Calendar-date/overlap rules are not enforced by the starter.</td></tr><tr><td>Access</td><td>Actual file/application access test in the authorised environment.</td><td>A visual login alone does not protect the database file.</td></tr><tr><td>Recovery</td><td>A separate restored copy passes baseline checks.</td><td>Restoration may lose recent changes and does not undo disclosure.</td></tr><tr><td>Privacy</td><td>Field-purpose decisions and synthetic demonstration files.</td><td>A deployment using real data requires further authorised review.</td></tr></table></div><p>Do not present proposed controls as implemented. A rejected negative cost demonstrates that constraint, not factual accuracy of every cost. A backup file exists only as a recovery measure once a suitable restoration has been demonstrated.</p>"
    ],
    [
      "Submit, reflect and prepare for review",
      "<p><a class=\"button\" href=\"responsible-data-workbook.md\" download>Download student workbook</a> <a class=\"button secondary\" href=\"responsible-data-answers.md\" download>Download explained answers</a></p><p><a href=\"responsible-data-scenarios.csv\" download>Eight decision scenarios</a> · <a href=\"responsible-data-review.csv\" download>Privacy and evaluation template</a> · <a href=\"responsible-data-scope.md\" download>Testing-scope exercise</a> · <a href=\"responsible-data-pack.zip\" download>Complete pack</a></p><p>Week 12 has two explicit lessons on privacy and ethical testing, followed by two project evaluation/demonstration lessons. Together with week 7 and the workshops in weeks 8–11, this completes the planned 14 project lessons.</p><p>Submit the working database, creation/report SQL, diagrams/dictionary, test and recovery evidence, privacy/security reasoning and evaluation. Explain your design in the demonstration. The book now has drafts for all seven planned Unit 2 topic chapters; an editorial coverage map and later review/exam resources are now available; teacher review and classroom evidence still remain.</p><p><a href=\"responsible-data-sources.md\" download>Source record and currency notes</a> · <a href=\"#teaching\">Teaching sequence</a>. This is a formative classroom resource, not an official assessment or Department endorsement.</p>"
    ]
  ],
  "practice": [
    [
      "Distinguish",
      "Does replacing real names with B001–B004 guarantee de-identification?",
      "No. A mapping or other context may identify people. These book records are invented; relabelling actual records is a different process."
    ],
    [
      "Apply",
      "Does an encrypted transfer authorise sharing the loan register?",
      "No. Transport security and permission to disclose are separate decisions. Check purpose, recipients, authority and applicable rules."
    ],
    [
      "Qualify",
      "Should all school records be deleted immediately after the project?",
      "No. Check authorised retention/disposal requirements and exceptions. Minimise unnecessary copies without destroying records that must be retained."
    ],
    [
      "Scope",
      "Does a classmate’s approval authorise testing the school portal?",
      "No. Establish authority from the responsible owner and an agreed scope. The classroom scope exercise concerns a local training system only."
    ],
    [
      "Evaluate",
      "Can a successful negative-cost test prove the whole database is secure?",
      "No. It demonstrates one constraint. Access, data quality, recovery and privacy need separate evidence."
    ]
  ],
  "task": "Analyse four decision scenarios, review the testing scope and complete the privacy/evaluation template. Demonstrate the database against its criteria, including actual report/change/recovery evidence. Explain one unimplemented control and one realistic improvement.",
  "solution": "Use evidence and context: unnecessary sensitive fields need justification; coded IDs may still identify; disclosures require authority; testing must stay within valid scope; retention follows applicable rules. Evaluate each criterion separately and label controls implemented, tested or proposed. Use synthetic files for classroom sharing.",
  "recap": "Responsible design joins purpose, minimisation, authorised use, security, correction and lawful retention. Ethical testing requires valid authority and boundaries. Evaluate what the project actually demonstrates, and identify what remains untested or proposed.",
  "lessons": [
    "Lesson 1: privacy/security/ethics/law; personal information; selected APP and WA-context scenarios.",
    "Lesson 2: ethical hacking and penetration-test scope; evidence/disclosure/retention decisions and feedback.",
    "Lesson 3: project evaluation workshop; match acceptance criteria to report, constraint, recovery and privacy evidence.",
    "Lesson 4: project demonstration/submission, explain limitations and prioritise improvements."
  ],
  "reference": "https://www.oaic.gov.au/privacy/australian-privacy-principles/read-the-australian-privacy-principles",
  "refTitle": "OAIC official APP text",
  "quiz": {
    "q": "Which evidence best supports the claim that the database recovery process works?",
    "options": [
      "A backup file exists",
      "A separate restored copy passes the planned record and query checks",
      "The report says backups are important"
    ],
    "answer": 1,
    "explanation": "A checked restoration demonstrates recovery in the tested conditions. File existence or a proposed policy alone does not."
  }
});
chapters.find(c=>c.id==='security-threats').next='#responsible-data';
