# SQL pathway - student practice

Read the online setup and numbered explanations. Predict before running. Model/guided work uses base; independent work uses changed. Start each exercise from a fresh copy. No specialist equipment is required.


## Step 01 - Choose columns, order rows and remove duplicates

Start with the supplied four-table equipment database; you do not need to build it before learning queries. SELECT chooses output columns and FROM identifies the table. ORDER BY gives an explicit order; add a secondary key when values tie. DISTINCT removes duplicate result rows. Read the keys and table preview before writing SQL. This step assumes basic table, record, field and primary/foreign-key vocabulary from the linked reading.

Textbook: https://edugenio.github.io/cs-atar-textbook/#sql-basics

### Worked example

List every equipment identifier and description, ordered by identifier.

```sql

SELECT EquipmentID, EquipmentDescription FROM Equipment ORDER BY EquipmentID;

```

### Guided

List borrower labels and identifiers, ordered by label descending.

Prediction:

Observed / traced:

Feedback and fresh retry:


### Independent

On the changed database, list distinct equipment descriptions in ascending order.

Prediction:

Observed / traced:

Feedback and fresh retry:


## Step 02 - Filter and combine conditions before joining

WHERE retains rows whose condition is true. Use single quotes for text. AND requires both conditions; OR accepts either; parentheses make combinations explicit. NOT negates a condition. BETWEEN includes its endpoints; LIKE uses % for any sequence and _ for one character in SQLite. ISO dates here are fixed-width YYYY-MM-DD text, so lexical comparisons match chronological order. This teaching choice is not a universal date-storage rule.

Textbook: https://edugenio.github.io/cs-atar-textbook/#sql-basics

### Worked example

Find outstanding loans due before 8 April 2026.

```sql

SELECT LoanID, DueDate FROM Loan WHERE Returned = 0 AND DueDate < '2026-04-08' ORDER BY DueDate, LoanID;

```

### Guided

List Camera equipment in either category C01 or C03; make grouping explicit.

Prediction:

Observed / traced:

Feedback and fresh retry:


### Independent

On changed data, list outstanding loans due from 8 through 12 April inclusive, excluding B001. Also write a separate prefix search for descriptions beginning with S.

Prediction:

Observed / traced:

Feedback and fresh retry:


## Step 03 - Match a known key in an INNER JOIN

Read the relationship first: each Loan refers to one Borrower; a Borrower may have several Loans. INNER JOIN pairs rows on matching identifiers. Repeated borrower labels are expected when a person has multiple loans. Qualify columns shared by both tables. Join by corresponding keys, not by similarly shaped names or unrelated row numbers.

Textbook: https://edugenio.github.io/cs-atar-textbook/#database-solution

### Worked example

List each loan with its borrower label.

```sql

SELECT Loan.LoanID, Borrower.BorrowerLabel FROM Loan INNER JOIN Borrower ON Loan.BorrowerID = Borrower.BorrowerID ORDER BY Loan.LoanID;

```

### Guided

List loan identifiers and equipment descriptions for returned loans.

Prediction:

Observed / traced:

Feedback and fresh retry:


### Independent

On changed data, list outstanding loans with borrower labels and due dates, ordered by due date then loan identifier.

Prediction:

Observed / traced:

Feedback and fresh retry:


## Step 04 - Use all five aggregate functions at the right grain

An aggregate summarises a set of input rows. COUNT(*) counts rows; COUNT(column) counts non-NULL values. SUM, AVG, MAX and MIN operate on the selected values. Use a small numeric fixture to predict each result by hand. First learn whole-result aggregates without GROUP BY; grouping comes in the Year 12 pathway. For an empty input set COUNT gives zero; these other aggregates give NULL. AS labels an output column; it does not rename a stored field. These simple result labels help compare aggregates before calculated aliases are developed in Year 12.

Textbook: https://edugenio.github.io/cs-atar-textbook/#database-solution

### Worked example

Summarise the fixed durations of five practice records.

```sql

SELECT COUNT(*) AS Records, SUM(Days) AS TotalDays, AVG(Days) AS MeanDays, MAX(Days) AS Longest, MIN(Days) AS Shortest FROM Duration;

```

### Guided

Apply all five aggregates only to records with Days at least 3.

Prediction:

Observed / traced:

Feedback and fresh retry:


### Independent

On changed durations, summarise only completed records with all five functions. Also predict the aggregate row for Days greater than 99.

Prediction:

Observed / traced:

Feedback and fresh retry:


## Step 05 - Design before CREATE: build three related tables

Before independent schema construction, complete the linked ER modelling and 1NF -> 2NF -> 3NF practice. Here StudentID determines StudentName, ClubID determines ClubName, and a membership is identified by StudentID plus ClubID. Separate those facts into Student, Club and Membership. An ordinary membership refers to exactly one existing student and club. SQLite uses type affinity; declared types alone do not enforce every domain rule. BOOLEAN and DATE need an explicit storage convention. The model shows inline REFERENCES for foreign keys and a table-level PRIMARY KEY for a pair: neither component alone identifies the relationship record.

Textbook: https://edugenio.github.io/cs-atar-textbook/#normalisation

### Worked example

Model a three-table design for devices, skills and dated device-skill records. Inspect the junction key and foreign keys before the independent transfer.

```sql

CREATE TABLE Device (DeviceID TEXT PRIMARY KEY NOT NULL, Label TEXT NOT NULL);
CREATE TABLE Skill (SkillID TEXT PRIMARY KEY NOT NULL, SkillName TEXT NOT NULL);
CREATE TABLE DeviceSkill (DeviceID TEXT NOT NULL REFERENCES Device(DeviceID), SkillID TEXT NOT NULL REFERENCES Skill(SkillID), RecordedOn TEXT NOT NULL, PRIMARY KEY(DeviceID, SkillID));

```

### Guided

Create Room(RoomID required TEXT primary key, RoomName required TEXT) and Desk(DeskID required TEXT primary key, RoomID required TEXT referencing Room). Explain the one-to-many link.

Prediction:

Observed / traced:

Feedback and fresh retry:


### Independent

From the stated dependencies, create Student(StudentID, StudentName), Club(ClubID, ClubName), Membership(StudentID, ClubID, JoinedOn). Use required TEXT fields, a composite Membership primary key and both foreign keys. JoinedOn stores ISO date text. Explain why names belong in the parent tables.

Prediction:

Observed / traced:

Feedback and fresh retry:


## Step 06 - INSERT deliberately and test integrity

Use a fresh copy for each attempt. Enable PRAGMA foreign_keys = ON outside a transaction in every connection, then check PRAGMA foreign_keys returns 1. That setting is not stored in the database file. Insert parent records before dependent rows. Name the columns rather than relying on table order. After a change, verify the stored record and retain evidence of a deliberate invalid case.

Textbook: https://edugenio.github.io/cs-atar-textbook/#database-solution

### Worked example

Add a new parent borrower to the equipment database.

```sql

INSERT INTO Borrower (BorrowerID, BorrowerLabel) VALUES ('B010','Practice member');

```

### Guided

Try an orphan loan. Predict the error and check that no row was inserted.

Prediction:

Observed / traced:

Feedback and fresh retry:


### Independent

On changed data, insert B011 with label New member, then L021 for B011/E06 due 15 April 2026, not returned. In separate fresh copies, try a repeated B001 key and a NULL borrower label; explain both failures.

Prediction:

Observed / traced:

Feedback and fresh retry:


## Step 07 - Target UPDATE and DELETE, then verify unchanged rows

Preview the target SELECT before changing data. UPDATE changes columns in matching rows; DELETE removes matching rows. Without WHERE, either statement can affect the whole table. Keep a disposable copy, record the original row and verify both the target and a non-target row. The expected results below are from fresh databases; do not carry mutations between exercises. In verification queries, IN (value1, value2) matches any listed value.

Textbook: https://edugenio.github.io/cs-atar-textbook/#database-solution

### Worked example

Mark L001 returned, delete only returned L005, and verify the changes plus an unchanged L002.

```sql

UPDATE Loan SET Returned = 1 WHERE LoanID = 'L001';
DELETE FROM Loan WHERE LoanID='L005' AND Returned=1;

```

### Guided

Delete only returned loan L003; verify the borrower survives.

Prediction:

Observed / traced:

Feedback and fresh retry:


### Independent

On changed data, move L007 due date to 16 April 2026, then delete only returned L005. Show both effects and an unchanged L004.

Prediction:

Observed / traced:

Feedback and fresh retry:


## Step 08 - Independent rehearsal before the Year 11 checkpoint

Use the changed four-table database and the separate three-table schema task from Step 05. Make an independent attempt before revealing reference SQL. Retain predicted results, actual results and a short explanation of the first mismatch. After feedback, retry using the other data variant or a teacher-supplied changed requirement. This public rehearsal is formative, not a secure assessment or a compulsory assessment date.

Textbook: https://edugenio.github.io/cs-atar-textbook/#database-solution

### Worked example

Model a requirement-to-query explanation for a distinct category list.

```sql

SELECT DISTINCT CategoryID FROM Equipment ORDER BY CategoryID;

```

### Guided

Produce an equipment count, then explain whether it counts categories or items.

Prediction:

Observed / traced:

Feedback and fresh retry:


### Independent

On changed data, produce a sorted report of outstanding LoanID and equipment description. Then count all outstanding loans. Explain the join key and what each output row represents. Separately repeat the three-table construction and controlled insert/update/delete tasks before including them in assessment.

Prediction:

Observed / traced:

Feedback and fresh retry:


## Step 09 - Inspect six tables and join across four

Begin after the Year 11 checkpoint. Read the supplied six-table dictionary and relationships: Workshop -> Session; Instructor -> Session; Member -> Booking; Session -> Booking; Booking -> Attendance by the complete MemberID/SessionID key. Trace one row across the keys before writing a four-table query. The report grain below is one booking. Instructor and Attendance exist in the schema even though this report does not need them. AS b, m, s and w introduce short table aliases; use those aliases to qualify fields consistently.

Textbook: https://edugenio.github.io/cs-atar-textbook/#unit4-sql

### Worked example

List member, session and workshop for each booking.

```sql

SELECT b.MemberID, m.DisplayName, s.SessionID, w.Title FROM Booking AS b INNER JOIN Member AS m ON m.MemberID = b.MemberID INNER JOIN Session AS s ON s.SessionID = b.SessionID INNER JOIN Workshop AS w ON w.WorkshopID = s.WorkshopID ORDER BY s.SessionID, b.MemberID;

```

### Guided

List bookings for Network design only.

Prediction:

Observed / traced:

Feedback and fresh retry:


### Independent

On changed data, report member display name, session date and workshop title for Network design bookings, sorted by session date then member ID.

Prediction:

Observed / traced:

Feedback and fresh retry:


## Step 10 - GROUP BY and aggregate without multiplying totals

GROUP BY partitions source rows before aggregates are calculated. Every selected non-aggregate column in these examples is grouped. First decide the grain: session capacity belongs to a session, while a booking belongs to a member/session pair. Summing capacity after joining to Booking repeats capacity for every booking and can inflate the total. SQLite may allow ungrouped bare columns; avoid relying on that behaviour.

Textbook: https://edugenio.github.io/cs-atar-textbook/#unit4-sql

### Worked example

Count bookings in sessions that have bookings.

```sql

SELECT SessionID, COUNT(*) AS Bookings FROM Booking GROUP BY SessionID ORDER BY SessionID;

```

### Guided

Compute count, sum, average, minimum and maximum capacity directly from Session.

Prediction:

Observed / traced:

Feedback and fresh retry:


### Independent

On changed data, group Session by WorkshopID and show session count and total capacity. Separately count bookings per MemberID; explain why those are different grains.

Prediction:

Observed / traced:

Feedback and fresh retry:


## Step 11 - Calculate, concatenate and name result columns

Calculated fields derive output values without changing stored fields. In SQLite, 100.0 forces real arithmetic; integer division can truncate. || concatenates text and AS supplies a meaningful alias. Keep the calculation grain explicit and state the unit. Other DBMSs may use different concatenation or date syntax; these downloads consistently use SQLite. ROUND(expression, 1) reports a numeric result to one decimal place. The independent report combines previously taught joins and grouping with the new calculations; it deliberately includes only sessions with bookings.

Textbook: https://edugenio.github.io/cs-atar-textbook/#unit4-sql

### Worked example

Show a labelled session and half its capacity using a real divisor.

```sql

SELECT SessionID || ' / ' || SessionDate AS SessionLabel, ROUND(Capacity / 2.0, 1) AS HalfCapacity FROM Session ORDER BY SessionID;

```

### Guided

List a member label formed from MemberID, separator and DisplayName.

Prediction:

Observed / traced:

Feedback and fresh retry:


### Independent

On changed data, show SessionID as Code, Capacity times 15.0 as BudgetDollars, and SessionID plus date separated by @ as SessionLabel. Name all calculated and concatenated fields. Then report only booked sessions: SessionID, remaining places (capacity minus bookings), fill percentage rounded to one decimal, and a concatenated session/workshop label. Use INNER JOIN and GROUP BY, and explain why unbooked S04 is omitted.

Prediction:

Observed / traced:

Feedback and fresh retry:


## Step 12 - Clean source data before importing it

Preserve the raw file. Compare values with the declared import contract: MemberID is unique, trimmed uppercase M followed by two digits; DisplayName is trimmed non-empty text. Keep a decision log and quarantine a conflicting duplicate rather than guessing identity. Syntactic validity does not prove the name is accurate. Import only reviewed clean rows into a disposable copy, with an explicit column mapping. trim removes surrounding spaces and upper converts letters to uppercase; neither verifies identity or source accuracy. For the fictional exercise, source verification has confirmed row 4 against the roster. INSERT ... SELECT inserts the selected output into named target columns; restrict it to that verified row. Other rows still need retain/quarantine decisions.

Textbook: https://edugenio.github.io/cs-atar-textbook/#unit4-project

### Worked example

Trim and normalise a supplied staging row; this is a proposed clean result, not automatic proof of identity. Row 4 has been verified as M09 / Eli; import only that row into Member after normalisation.

```sql

SELECT upper(trim(MemberID)) AS ProposedID, trim(DisplayName) AS ProposedName FROM Staging ORDER BY RowNo;
INSERT INTO Member (MemberID, DisplayName) SELECT upper(trim(MemberID)), trim(DisplayName) FROM Staging WHERE RowNo = 4;

```

### Guided

Detect duplicate proposed identifiers before importing.

Prediction:

Observed / traced:

Feedback and fresh retry:


### Independent

On changed staging data, identify valid-looking rows, blank names and duplicate proposed IDs. Preserve raw rows and write a retain/quarantine reason for each before any INSERT. Produce a report of non-blank proposed names only. Row 4 has now been verified as M07 / Gia. Import only that reviewed row into Member using an explicit column mapping and verify the stored row.

Prediction:

Observed / traced:

Feedback and fresh retry:


## Step 13 - Modify structure and practise DROP on scratch tables

CREATE/ALTER/DROP change the structure; INSERT/UPDATE/DELETE change records. The syllabus phrase modify tables describes a task, not a SQLite MODIFY keyword. SQLite supports ALTER TABLE ADD COLUMN and RENAME COLUMN, but some constraint changes need a carefully planned table rebuild. Demonstrate structure changes only on scratch tables here. DROP removes the table structure and its rows; DELETE removes rows while retaining the table.

Textbook: https://edugenio.github.io/cs-atar-textbook/#unit4-project

### Worked example

Create Scratch, add Notes, inspect the fields, then drop only this scratch table and verify its absence.

```sql

CREATE TABLE Scratch (ID INTEGER PRIMARY KEY, Label TEXT NOT NULL);
ALTER TABLE Scratch ADD COLUMN Notes TEXT;
SELECT name, type FROM pragma_table_info('Scratch') ORDER BY cid;
DROP TABLE Scratch;

```

### Guided

Rename a field, then verify the new name.

Prediction:

Observed / traced:

Feedback and fresh retry:


### Independent

Create Trial(ID INTEGER PRIMARY KEY, Label TEXT NOT NULL), insert one row, add Notes TEXT, inspect it, then DROP only Trial. Verify that the table no longer exists. Explain DROP versus DELETE.

Prediction:

Observed / traced:

Feedback and fresh retry:


## Step 14 - Test cascading delete and the whole foreign key

Attendance refers to the complete Booking(MemberID, SessionID) key with ON DELETE CASCADE. Deleting that booking removes only its dependent attendance, not the Member or Session. Other relationships use the default restrictive action. Enable and check foreign keys in each connection. A cascade is a declared relationship action, not a substitute for authorising the delete or verifying its scope. Inside CREATE TABLE Attendance, the relevant table constraint is FOREIGN KEY(MemberID, SessionID) REFERENCES Booking(MemberID, SessionID) ON DELETE CASCADE. Both key components form one relationship.

Textbook: https://edugenio.github.io/cs-atar-textbook/#unit4-project

### Worked example

Remove booking M01/S01 and inspect remaining booking and attendance keys.

```sql

DELETE FROM Booking WHERE MemberID = 'M01' AND SessionID = 'S01';

```

### Guided

Try to add attendance for a non-existent M03/S02 booking.

Prediction:

Observed / traced:

Feedback and fresh retry:


### Independent

On changed data, delete only M01/S02. Verify that its attendance disappears, M01/S01 remains and Member M01 survives.

Prediction:

Observed / traced:

Feedback and fresh retry:


## Step 15 - Independent six-table construction and constraint checks

Use the supplied dictionary and relationship list to implement Instructor, Workshop, Session, Member, Booking and Attendance in an empty database. The independent construction has six tables, exceeding the five-table minimum for Year 12. Define the whole composite Booking key and matching Attendance foreign key. Capacity must be an integer greater than zero; attendance is an integer 0 or 1. Use the source dictionary rather than copying a finished schema before the first attempt. typeof checks SQLite's stored value type; the positive-value comparison separately rules out zero and negative capacity. length counts characters; trim removes surrounding spaces. The worked Label constraint demonstrates how to enforce a trimmed non-empty length limit.

Textbook: https://edugenio.github.io/cs-atar-textbook/#unit4-design

### Worked example

Demonstrate positive integer capacity and a trimmed label length of 1..60 on one practice table.

```sql

CREATE TABLE Sample (ID INTEGER PRIMARY KEY, Capacity INTEGER NOT NULL CHECK(typeof(Capacity)='integer' AND Capacity > 0), Label TEXT NOT NULL CHECK(length(trim(Label)) BETWEEN 1 AND 60));

```

### Guided

Try a negative capacity against that rule.

Prediction:

Observed / traced:

Feedback and fresh retry:


### Independent

Build all six tables from dictionary.md, then insert parent records before child records using the supplied seed rows. Test duplicate Booking keys, orphan Attendance and invalid Capacity in separate copies. Compare your schema and stored rows against the reference only after your attempt.

Prediction:

Observed / traced:

Feedback and fresh retry:


## Step 16 - Independent Year 12 reporting rehearsal

Use the changed six-table dataset only after Steps 09-15 and a fresh independent schema attempt. This mixed rehearsal retrieves familiar operations in a new combination. Explain row grain and validate one output row by hand. The teacher checkpoint separates taught core operations from supporting extensions; no public reference response is a secure assessment task.

Textbook: https://edugenio.github.io/cs-atar-textbook/#unit4-sql

### Worked example

Model a grouped capacity report at workshop grain.

```sql

SELECT WorkshopID, SUM(Capacity) AS Places FROM Session GROUP BY WorkshopID ORDER BY WorkshopID;

```

### Guided

Produce a concatenated session/date label, with a meaningful alias.

Prediction:

Observed / traced:

Feedback and fresh retry:


### Independent

On changed data, join Member, Booking, Session and Workshop to list member name, session ID and workshop title. Then group bookings by session and produce an aliased booking count. Explain why the report does not include sessions with no bookings. In a fresh changed copy, add M22 (Rehearsal member), update S04 capacity to 6, then delete only M22. Verify the member is gone and S04 changed.

Prediction:

Observed / traced:

Feedback and fresh retry:


## Step 17 - Supporting extension: NULL, LEFT JOIN and HAVING

Supporting extension, not an additional prescribed SQL-keyword list. LEFT JOIN preserves unmatched left-side rows with NULL right-side values. COUNT(right_key) ignores those NULL values while COUNT(*) counts the preserved row. Use IS NULL to test missing values. HAVING filters groups after grouping; WHERE filters input rows. Learn these after core INNER JOIN and GROUP BY, and teach/practise them explicitly before including them in a local assessment.

Textbook: https://edugenio.github.io/cs-atar-textbook/#unit4-sql

### Worked example

Include sessions with no bookings and count real booking keys.

```sql

SELECT s.SessionID, COUNT(b.MemberID) AS Bookings FROM Session AS s LEFT JOIN Booking AS b ON b.SessionID = s.SessionID GROUP BY s.SessionID ORDER BY s.SessionID;

```

### Guided

Find sessions with no booking match.

Prediction:

Observed / traced:

Feedback and fresh retry:


### Independent

On changed data, include every session, count real booking keys and return only groups with fewer than two bookings.

Prediction:

Observed / traced:

Feedback and fresh retry:


## Step 18 - Supporting extension: a transaction and a recovery test

Supporting application/reliability practice. A transaction can keep related changes together. BEGIN starts the boundary, COMMIT accepts it, and ROLLBACK cancels uncommitted changes. Use explicit boundaries in a disposable SQLite tool; other drivers may manage transactions differently. Enable foreign keys before BEGIN. A second BEGIN inside an open transaction fails. After an error, choose an explicit rollback/recovery action rather than assuming every earlier statement was undone.

Textbook: https://edugenio.github.io/cs-atar-textbook/#unit4-project

### Worked example

Change capacity inside a transaction, then cancel it.

```sql

BEGIN;
UPDATE Session SET Capacity = 8 WHERE SessionID = 'S01';
ROLLBACK;

```

### Guided

Insert a practice member, commit it and verify the saved row.

Prediction:

Observed / traced:

Feedback and fresh retry:


### Independent

On changed data, insert M21, insert its S04 booking, then roll back both. Verify neither remains. Explain the before/inside/after state and retain evidence from inside the transaction as well.

Prediction:

Observed / traced:

Feedback and fresh retry:
