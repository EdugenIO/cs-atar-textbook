# Unit 2 practice paper — explained answers

Use these explanations to check your reasoning after trying the questions. Equivalent accurate SQL, terminology and justified alternatives can also work. These are learning checkpoints, without scores. Teacher review and classroom timing checks remain pending.

## Q1

Check these points: verify/correct against authoritative date evidence (accuracy); authenticate email source before accepting change; obtain current status evidence (currency); investigate cost against source/range/context without automatic deletion (outlier). Accept justified checks; do not equate valid format with truth.

## Q2

Check these points: raw dates/status become overdue information with rule/date; data collection versus managing software; physical index/storage change can leave a query unchanged; a renamed referenced column or different DBMS can require query/conversion changes.

## Q3

Check these points: event-specific LoanID preserves repeated borrowing; descriptions repeat for E01/E04; FK values may recur across loans; same borrower/item pair can occur again on another date.

## Q4

LoanID is the PK, with BorrowerID and EquipmentID as FKs. Each equipment item has one supplier; each supplier can have zero or many items. Each inspection requires one item; an item can have zero or many inspections. Trace Loan.EquipmentID → Equipment.EquipmentID, then Equipment.CategoryID → Category.CategoryID.

## Q5

Check each keyed relation: Member(MemberID PK, MemberLabel); Leader(LeaderID PK, LeaderLabel); Activity(ActivityID PK, ActivityName, LeaderID FK); Participation(MemberID PK/FK, ActivityID PK/FK, Term PK, AttendanceCount). Require stated composite key and moved facts; accept equivalent consistent notation.

## Q6

Check the fields and table, both status and strict-date conditions, ordering, and the matching loans L001 and L006.

```sql
SELECT LoanID, BorrowerID, DueDate FROM Loan WHERE Returned=0 AND DueDate<'2026-04-08' ORDER BY DueDate, LoanID;
```

## Q7

Check the fields and aliases, key/reference inner join, active filter and ordering, and results L001, L002, L004 and L006.

```sql
SELECT l.LoanID, b.BorrowerLabel FROM Loan AS l INNER JOIN Borrower AS b ON l.BorrowerID=b.BorrowerID WHERE l.Returned=0 ORDER BY l.LoanID;
```

## Q8

Use all five appropriate functions on Equipment: the results are 5, 1400, 280, 80 and 600. Loan events can repeat an equipment cost. E02 repeats, so the joined-history total is 1480 rather than the inventory total of 1400.

```sql
SELECT COUNT(*), SUM(ReplacementCost), AVG(ReplacementCost), MIN(ReplacementCost), MAX(ReplacementCost) FROM Equipment;
```

## Q9

Check each statement and inspect the same key before/after (e.g. L001 0→1 with other loans unchanged).

```sql
INSERT INTO Borrower (BorrowerID,BorrowerLabel) VALUES ('B005','Learner E');
UPDATE Loan SET Returned=1 WHERE LoanID='L001';
DELETE FROM Borrower WHERE BorrowerID='B005';
```

## Q10

Check these points: duplicate PK conflicts with uniqueness; missing B999 violates FK; Returned=2 violates CHECK; rollback undoes uncommitted changes in the active transaction, not earlier committed history.

## Q11

Check these points: SQL injection makes input part of database command structure; XSS makes untrusted content execute in a browser; virus attaches to a host; worm propagates without a host-file attachment. Accept accurate equivalents.

## Q12

Check these points: availability lost; theft/confidentiality not proven and needs evidence; protected unaffected backup with clean tested restore; restoring availability cannot undo disclosure or necessarily recover changes since backup.

## Q13

Check these points: shared authentication cannot distinguish identities well; authorisation defines who may change loans; accounting needs protected activity records; individual accounts plus a justified access/log improvement (any one well explained).

## Q14

Check these points: password/PIN both knowledge; knowledge plus appropriately bound device possession (or other valid distinct categories); shared secret versus related distinct public/private keys; verified recipient public encrypts and recipient private decrypts.

## Q15

ORDQ encrypts LOAN; decrypting ORDQ recovers LOAN. KEYK shifts 10, 4, 24, 10 produce NERK from DATA. Explain a weakness (tiny rotation space, fixed-map language patterns, or repeated-key patterns).

## Q16

Check these points: IDs/dates/context can still identify; synthetic demonstration avoids real borrower disclosure; responsible owner authority and scope needed, not a peer; stop out-of-scope exploration and report through agreed contact.

Each question uses original data independently. Practical creation/drawing/testing/recovery require separate demonstrations; this sampled paper is not complete evidence of mastery. Diagnose by topic, correct reasoning, then retest with changed data.
