# Database solution — practice workbook

Use a fresh working copy of database-project.sqlite. Enable PRAGMA foreign_keys = ON before any transaction. Run each rehearsal separately. Report fixed date: 8 April 2026.

1. Trace L002 through Loan, Borrower, Equipment and Category. State each join condition.
2. Write the active report required by the project brief: LoanID, BorrowerLabel, EquipmentID, CategoryName, DueDate; oldest due first, LoanID tie-break.
3. Calculate COUNT, SUM, AVG, MIN and MAX of equipment replacement estimates. Predict by hand before running.
4. Report CategoryID, CategoryName, item count and total replacement estimate for each category; sort by CategoryID.
5. Explain why summing replacement cost across all loan events gives a different total.
6. In a transaction insert unused B005/Learner E. Check borrower count and the inner-joined borrower report. Roll back.
7. In a separate transaction preview and update L001 to returned. Check all loan statuses and the active count. Roll back.
8. In a separate transaction insert B005, preview/delete it and confirm zero matching rows. Roll back.
9. In isolated transactions, test duplicate B001, a Loan using B999, Returned = 2 and ReplacementCost = -1. Expect rejection; roll back an active transaction after each test. Do not alter constraints to make invalid input succeed.
10. Predict COUNT/SUM/AVG/MIN/MAX for equipment category C99. Compare COUNT(*) with COUNT(ReplacementCost).
11. Explain an UPDATE without WHERE, an inner join with no matching borrower, a missing join condition and deletion of a referenced borrower.
12. Run the rehearsal SQL a statement at a time. Record intermediate and final state. Explain COMMIT versus ROLLBACK, and why rollback is not a historical backup.

Then launch the project brief. Use database-project-test-log.csv; include screenshots or exported results as actual evidence, not merely 'worked'.
