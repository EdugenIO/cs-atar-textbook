# Database solution — explained answers and teacher checkpoints

1. L002 → B002 Learner B → E02 Tripod → C02 Support. Match Loan.BorrowerID to Borrower.BorrowerID, Loan.EquipmentID to Equipment.EquipmentID, Equipment.CategoryID to Category.CategoryID.

## 2. Report

```sql
SELECT l.LoanID, b.BorrowerLabel, e.EquipmentID, c.CategoryName, l.DueDate
FROM Loan AS l
INNER JOIN Borrower AS b ON l.BorrowerID = b.BorrowerID
INNER JOIN Equipment AS e ON l.EquipmentID = e.EquipmentID
INNER JOIN Category AS c ON e.CategoryID = c.CategoryID
WHERE l.Returned = 0 ORDER BY l.DueDate, l.LoanID;
```

Columns: LoanID, BorrowerLabel, EquipmentID, CategoryName, DueDate.

- L001, Learner A, E01, Imaging, 2026-04-06
- L006, Learner D, E05, Audio, 2026-04-07
- L002, Learner B, E02, Support, 2026-04-08
- L004, Learner C, E04, Imaging, 2026-04-10

## 4. Report

```sql
SELECT c.CategoryID, c.CategoryName, COUNT(*) AS ItemCount,
       SUM(e.ReplacementCost) AS TotalCost
FROM Category AS c INNER JOIN Equipment AS e ON c.CategoryID = e.CategoryID
GROUP BY c.CategoryID, c.CategoryName ORDER BY c.CategoryID;
```

Columns: CategoryID, CategoryName, ItemCount, TotalCost.

- C01, Imaging, 2, 1050
- C02, Support, 1, 80
- C03, Audio, 2, 270

3. Five items; sum 1400, mean 280, minimum 80, maximum 600. Use the inventory-summary worked query.

5. All loan events sum to 1480: E02's 80 estimate is counted twice, because it has two loan events. This is a history total of repeated item estimates, not inventory value. DISTINCT cost is not a general fix: different items may legitimately have equal costs.

6. Borrower count rises from four to five; inner-joined counts still show only B001 (2), B002 (2), B003 (1), B004 (1). B005 has no loan match. Rollback restores four.

7. Only L001 changes 0→1; active loans drop from four to three (L006, L002, L004 ordered by due date). Rollback restores the original statuses.

8. Inserted B005 disappears after DELETE; rollback returns to the original four borrowers. It has no referencing loans.

9. Duplicate PK, nonexistent FK, Returned outside 0/1 and negative cost must fail. FK checks require enforcement enabled before BEGIN. Use fresh/rolled-back copies and verify original rows remain. A failed statement need not undo earlier successful changes; explicitly end an active practice transaction.

10. One ungrouped summary row: COUNT = 0; SUM, AVG, MIN, MAX = NULL. COUNT(field) ignores NULL values; COUNT(*) counts rows. Required ReplacementCost has no NULLs in this starter.

11. UPDATE without WHERE changes every row. Inner joins omit unmatched records. Missing join conditions can produce unrelated combinations. Deleting B001 fails because Loan still references it; routine returns preserve history.

12. Rehearsal: B005 inserted; L001 before 0/after 1; B005 deleted; remaining test borrower count 0. ROLLBACK restores four borrowers and L001 = 0. COMMIT keeps changes; rollback cannot undo an already committed change in a later transaction. Restore from a tested backup of the closed database when needed.

## Teacher checkpoints
Review requirements before build; check diagrams/dictionary against actual schema. Practise running and explaining your own creation script; use the scaffold as a starting point. Verify report row level and numeric meaning; check actual evidence for normal/invalid/boundary/recovery tests. Ask why repeated keys in history are legitimate and why value totals should use inventory rows. Later review privacy/security decisions after explicit instruction. This optional project supports learning; it does not establish complete Unit 2 coverage.
