# Database solution — practice workbook

## Core and optional scope

Core Year 11 practice: taught key joins, whole-result COUNT/SUM/AVG/MIN/MAX, schema/constraints and controlled data changes. Week 5 Lesson 4 checks Q2a and Q3 only; Q6–Q12 follow explicit Week 6 instruction. Q2b (four-table independent transfer), Q4 (GROUP BY) and any grouped count in Q6 are optional supporting extensions here. They are not core completion gates or extra compulsory work. Join depth is a local pacing decision, not a syllabus maximum. Confirm and teach any extension retained in a school-issued assessment.

Before question 1, follow L001 by hand: match its BorrowerID to Borrower, EquipmentID to Equipment, then CategoryID to Category. Explain why matching IDs is safer than matching names. Predict whether L002 and L005 should both appear in a loan-history report.

Use a fresh working copy of database-project.sqlite. Enable PRAGMA foreign_keys = ON before any transaction. Run each rehearsal separately. Report fixed date: 8 April 2026.

1. Trace L002 through Loan, Borrower, Equipment and Category. State each join condition.
2a. **Core:** write an active-loan report using Loan and Equipment: LoanID, EquipmentID, EquipmentDescription; oldest due first, LoanID tie-break.
2b. **Optional extension:** add BorrowerLabel and CategoryName using all four tables; show LoanID, BorrowerLabel, EquipmentID, CategoryName, DueDate in the same order.
3. Calculate COUNT, SUM, AVG, MIN and MAX of equipment replacement estimates. Predict by hand before running.
4. **Optional extension — GROUP BY:** report CategoryID, CategoryName, item count and total replacement estimate for each category; sort by CategoryID.
5. Explain why summing replacement cost across all loan events gives a different total.
6. In a transaction insert unused B005/Learner E. Check the whole Borrower count and list matching LoanID/BorrowerID rows using a taught inner join. A grouped borrower count is optional extension. Roll back.
7. In a separate transaction preview and update L001 to returned. Check all loan statuses and the active count. Roll back.
8. In a separate transaction insert B005, preview/delete it and confirm zero matching rows. Roll back.
9. In isolated transactions, test duplicate B001, a Loan using B999, Returned = 2 and ReplacementCost = -1. Expect rejection; roll back an active transaction after each test. Do not alter constraints to make invalid input succeed.
10. Predict COUNT/SUM/AVG/MIN/MAX for equipment category C99. Compare COUNT(*) with COUNT(ReplacementCost).
11. Explain an UPDATE without WHERE, an inner join with no matching borrower, a missing join condition and deletion of a referenced borrower.
12. Run the rehearsal SQL a statement at a time. Record intermediate and final state. Explain COMMIT versus ROLLBACK, and why rollback is not a historical backup.

Then launch the core project brief after the relevant teaching; its optional report extensions remain separate. Use database-project-test-log.csv; include screenshots or exported results as actual evidence, not merely 'worked'.
