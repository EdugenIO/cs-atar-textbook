-- Step 01 Choose columns, order rows and remove duplicates
-- On the changed database, list distinct equipment descriptions in ascending order.
-- Database: y11 changed, fresh copy.
-- Write your independent attempt below:


-- Step 02 Filter and combine conditions before joining
-- On changed data, list outstanding loans due from 8 through 12 April inclusive, excluding B001. Also write a separate prefix search for descriptions beginning with S.
-- Database: y11 changed, fresh copy.
-- Write your independent attempt below:


-- Step 03 Match a known key in an INNER JOIN
-- On changed data, list outstanding loans with borrower labels and due dates, ordered by due date then loan identifier.
-- Database: y11 changed, fresh copy.
-- Write your independent attempt below:


-- Step 04 Use all five aggregate functions at the right grain
-- On changed durations, summarise only completed records with all five functions. Also predict the aggregate row for Days greater than 99.
-- Database: durations changed, fresh copy.
-- Write your independent attempt below:


-- Step 05 Design before CREATE: build three related tables
-- From the stated dependencies, create Student(StudentID, StudentName), Club(ClubID, ClubName), Membership(StudentID, ClubID, JoinedOn). Use required TEXT fields, a composite Membership primary key and both foreign keys. JoinedOn stores ISO date text. Explain why names belong in the parent tables.
-- Database: scratch changed, fresh copy.
-- Write your independent attempt below:


-- Step 06 INSERT deliberately and test integrity
-- On changed data, insert B011 with label New member, then L021 for B011/E06 due 15 April 2026, not returned. In separate fresh copies, try a repeated B001 key and a NULL borrower label; explain both failures.
-- Database: y11 changed, fresh copy.
-- Write your independent attempt below:


-- Step 07 Target UPDATE and DELETE, then verify unchanged rows
-- On changed data, move L007 due date to 16 April 2026, then delete only returned L005. Show both effects and an unchanged L004.
-- Database: y11 changed, fresh copy.
-- Write your independent attempt below:


-- Step 08 Independent rehearsal before the Year 11 checkpoint
-- On changed data, produce a sorted report of outstanding LoanID and equipment description. Then count all outstanding loans. Explain the join key and what each output row represents. Separately repeat the three-table construction and controlled insert/update/delete tasks before including them in assessment.
-- Database: y11 changed, fresh copy.
-- Write your independent attempt below:


-- Step 09 Inspect six tables and join across four
-- On changed data, report member display name, session date and workshop title for Network design bookings, sorted by session date then member ID.
-- Database: y12 changed, fresh copy.
-- Write your independent attempt below:


-- Step 10 GROUP BY and aggregate without multiplying totals
-- On changed data, group Session by WorkshopID and show session count and total capacity. Separately count bookings per MemberID; explain why those are different grains.
-- Database: y12 changed, fresh copy.
-- Write your independent attempt below:


-- Step 11 Calculate, concatenate and name result columns
-- On changed data, show SessionID as Code, Capacity times 15.0 as BudgetDollars, and SessionID plus date separated by @ as SessionLabel. Name all calculated and concatenated fields. Then report only booked sessions: SessionID, remaining places (capacity minus bookings), fill percentage rounded to one decimal, and a concatenated session/workshop label. Use INNER JOIN and GROUP BY, and explain why unbooked S04 is omitted.
-- Database: y12 changed, fresh copy.
-- Write your independent attempt below:


-- Step 12 Clean source data before importing it
-- On changed staging data, identify valid-looking rows, blank names and duplicate proposed IDs. Preserve raw rows and write a retain/quarantine reason for each before any INSERT. Produce a report of non-blank proposed names only. Row 4 has now been verified as M07 / Gia. Import only that reviewed row into Member using an explicit column mapping and verify the stored row.
-- Database: staging changed, fresh copy.
-- Write your independent attempt below:


-- Step 13 Modify structure and practise DROP on scratch tables
-- Create Trial(ID INTEGER PRIMARY KEY, Label TEXT NOT NULL), insert one row, add Notes TEXT, inspect it, then DROP only Trial. Verify that the table no longer exists. Explain DROP versus DELETE.
-- Database: scratch changed, fresh copy.
-- Write your independent attempt below:


-- Step 14 Test cascading delete and the whole foreign key
-- On changed data, delete only M01/S02. Verify that its attendance disappears, M01/S01 remains and Member M01 survives.
-- Database: y12 changed, fresh copy.
-- Write your independent attempt below:


-- Step 15 Independent six-table construction and constraint checks
-- Build all six tables from dictionary.md, then insert parent records before child records using the supplied seed rows. Test duplicate Booking keys, orphan Attendance and invalid Capacity in separate copies. Compare your schema and stored rows against the reference only after your attempt.
-- Database: scratch changed, fresh copy.
-- Write your independent attempt below:


-- Step 16 Independent Year 12 reporting rehearsal
-- On changed data, join Member, Booking, Session and Workshop to list member name, session ID and workshop title. Then group bookings by session and produce an aliased booking count. Explain why the report does not include sessions with no bookings. In a fresh changed copy, add M22 (Rehearsal member), update S04 capacity to 6, then delete only M22. Verify the member is gone and S04 changed.
-- Database: y12 changed, fresh copy.
-- Write your independent attempt below:


-- Step 17 Supporting extension: NULL, LEFT JOIN and HAVING
-- On changed data, include every session, count real booking keys and return only groups with fewer than two bookings.
-- Database: y12 changed, fresh copy.
-- Write your independent attempt below:


-- Step 18 Supporting extension: a transaction and a recovery test
-- On changed data, insert M21, insert its S04 booking, then roll back both. Verify neither remains. Explain the before/inside/after state and retain evidence from inside the transaction as well.
-- Database: y12 changed, fresh copy.
-- Write your independent attempt below:
