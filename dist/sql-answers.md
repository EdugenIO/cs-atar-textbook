# Getting started with SQL — explained answers

## Borrowers

```sql
SELECT BorrowerID, BorrowerLabel FROM Borrower ORDER BY BorrowerID;
```

Columns: BorrowerID, BorrowerLabel.

- B001, Learner A
- B002, Learner B
- B003, Learner C
- B004, Learner D

## Audio items

```sql
SELECT EquipmentID, EquipmentDescription FROM Equipment WHERE CategoryID = 'C03' ORDER BY EquipmentID;
```

Columns: EquipmentID, EquipmentDescription.

- E03, Recorder
- E05, Microphone

## Active newest first

```sql
SELECT LoanID, DueDate FROM Loan WHERE Returned = 0 ORDER BY DueDate DESC, LoanID ASC;
```

Columns: LoanID, DueDate.

- L004, 2026-04-10
- L002, 2026-04-08
- L006, 2026-04-07
- L001, 2026-04-06

## Active B002

```sql
SELECT LoanID FROM Loan WHERE BorrowerID = 'B002' AND Returned = 0 ORDER BY LoanID;
```

Columns: LoanID.

- L002

5. L002 is due on the reference date, not before it; L005 has Returned = 1. Both parts of the overdue condition must hold.

6. Five rows exist in Equipment but four distinct descriptions occur (Camera, Microphone, Recorder, Tripod). DISTINCT only changes this query result.

7. Use SELECT LoanID, DueDate FROM Loan WHERE Returned = 0 ORDER BY LoanID; This returns L001/2026-04-06, L002/2026-04-08, L004/2026-04-10, L006/2026-04-07. Without a comma, SQLite can treat DueDate as an alias for LoanID rather than returning a second column. 'False' is a text literal; the stored Boolean representation is integer 0/1.

8. Grouped: L001, L002. Ungrouped: L001, L002, L005. AND binds more tightly than OR, so the ungrouped query includes every B002 loan, even a returned one.

9. Example: SELECT EquipmentID FROM Equipment WHERE CategoryID = 'C99' ORDER BY EquipmentID; Zero rows; no item has that category.

10. L003 and L006 share 2026-04-07. Add LoanID as an ordering term to decide ties. Use ASC or DESC according to the requirement.

Extension: NULL comparisons yield unknown rather than true; use IS NULL / IS NOT NULL. Do not insert missing values merely to test them in this required-field starter.

Queries are SQLite-tested. For another DBMS, adapt storage and syntax. Inner joins, aggregates and data changes are later work. Teacher review pending.
