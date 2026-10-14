# Unit 2 practice paper — separate marking guide

64 marks; accept equivalent accurate SQL/terminology and justified alternatives. Do not double-count a point. This is a formative draft; teacher moderation and classroom timing checks remain pending.

## Q1 (4 marks)

1 each: verify/correct against authoritative date evidence (accuracy); authenticate email source before accepting change; obtain current status evidence (currency); investigate cost against source/range/context without automatic deletion (outlier). Accept justified checks; do not equate valid format with truth.

## Q2 (4 marks)

1 each: raw dates/status become overdue information with rule/date; data collection versus managing software; physical index/storage change can leave a query unchanged; a renamed referenced column or different DBMS can require query/conversion changes.

## Q3 (4 marks)

1 each: event-specific LoanID preserves repeated borrowing; descriptions repeat for E01/E04; FK values may recur across loans; same borrower/item pair can occur again on another date.

## Q4 (4 marks)

1: LoanID PK with BorrowerID/EquipmentID FKs. 1: each equipment has one supplier; supplier zero/many items. 1: inspection requires one item; item zero/many inspections. 1: Loan.EquipmentID → Equipment.EquipmentID, then Equipment.CategoryID → Category.CategoryID.

## Q5 (4 marks)

1 per correct keyed relation: Member(MemberID PK, MemberLabel); Leader(LeaderID PK, LeaderLabel); Activity(ActivityID PK, ActivityName, LeaderID FK); Participation(MemberID PK/FK, ActivityID PK/FK, Term PK, AttendanceCount). Require stated composite key and moved facts; accept equivalent consistent notation.

## Q6 (4 marks)

1 correct fields/table; 1 both status and strict-date conditions; 1 ordering; 1 matches L001,L006.

```sql
SELECT LoanID, BorrowerID, DueDate FROM Loan WHERE Returned=0 AND DueDate<'2026-04-08' ORDER BY DueDate, LoanID;
```

## Q7 (4 marks)

1 fields/table aliases; 1 key/reference inner join; 1 active filter and ordering; 1 results L001,L002,L004,L006.

```sql
SELECT l.LoanID, b.BorrowerLabel FROM Loan AS l INNER JOIN Borrower AS b ON l.BorrowerID=b.BorrowerID WHERE l.Returned=0 ORDER BY l.LoanID;
```

## Q8 (4 marks)

1 all five appropriate functions on Equipment; 1 results 5,1400,280,80,600; 1 loan events can repeat an equipment cost; 1 E02 repeats so joined-history total is 1480, not inventory 1400.

```sql
SELECT COUNT(*), SUM(ReplacementCost), AVG(ReplacementCost), MIN(ReplacementCost), MAX(ReplacementCost) FROM Equipment;
```

## Q9 (4 marks)

1 each correct statement; 1 inspect the same key before/after (e.g. L001 0→1 with other loans unchanged).

```sql
INSERT INTO Borrower (BorrowerID,BorrowerLabel) VALUES ('B005','Learner E');
UPDATE Loan SET Returned=1 WHERE LoanID='L001';
DELETE FROM Borrower WHERE BorrowerID='B005';
```

## Q10 (4 marks)

1 each: duplicate PK conflicts with uniqueness; missing B999 violates FK; Returned=2 violates CHECK; rollback undoes uncommitted changes in the active transaction, not earlier committed history.

## Q11 (4 marks)

1 each: SQL injection makes input part of database command structure; XSS makes untrusted content execute in a browser; virus attaches to a host; worm propagates without a host-file attachment. Accept accurate equivalents.

## Q12 (4 marks)

1 each: availability lost; theft/confidentiality not proven and needs evidence; protected unaffected backup with clean tested restore; restoring availability cannot undo disclosure or necessarily recover changes since backup.

## Q13 (4 marks)

1 each: shared authentication cannot distinguish identities well; authorisation defines who may change loans; accounting needs protected activity records; individual accounts plus a justified access/log improvement (any one well explained).

## Q14 (4 marks)

1 each: password/PIN both knowledge; knowledge plus appropriately bound device possession (or other valid distinct categories); shared secret versus related distinct public/private keys; verified recipient public encrypts and recipient private decrypts.

## Q15 (4 marks)

1 ORDQ; 1 decrypts LOAN; 1 KEYK shifts 10,4,24,10 produce NERK from DATA; 1 justified weakness (tiny rotation space, fixed-map language patterns, or repeated-key patterns).

## Q16 (4 marks)

1 each: IDs/dates/context can still identify; synthetic demonstration avoids real borrower disclosure; responsible owner authority and scope needed, not a peer; stop out-of-scope exploration and report through agreed contact.

Each question uses original data independently. Practical creation/drawing/testing/recovery require separate demonstrations; this sampled paper is not complete evidence of mastery. Diagnose by topic, correct reasoning, then retest with changed data.
