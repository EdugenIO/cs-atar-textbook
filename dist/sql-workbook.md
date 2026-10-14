# Getting started with SQL — student workbook

Unit 2, Week 4. Synthetic equipment-loan data; fixed reporting date 8 April 2026.
Use a working copy of sql-starter.sqlite in a school-approved SQLite tool. Alternatively execute sql-setup.sql once in a new empty database. Returned uses 0/1; DueDate uses valid YYYY-MM-DD text in this supplied data. Run one query at a time.

For every query, record: requirement, SQL, predicted columns/rows/order, actual result, explanation and correction if needed.

1. List borrower identifiers and labels sorted by identifier.
2. List audio equipment IDs and descriptions, sorted by ID.
3. List unreturned loan IDs and due dates, newest due date first; break ties using ascending LoanID.
4. List B002 loan IDs that have not been returned, sorted by LoanID.
5. Explain why the overdue example excludes L002 and L005.
6. Explain the difference between all equipment descriptions and DISTINCT descriptions. Does it delete stored data?
7. Repair: SELECT LoanID DueDate FROM Loan WHERE Returned = 'False'; (The missing comma may be interpreted as an alias; explain the output problem as well as the value problem.)
8. Compare Returned = 0 AND (BorrowerID = 'B001' OR BorrowerID = 'B002') with the version without parentheses. Identify the extra record.
9. Write a query that returns no records, and explain why an empty result can be valid.
10. Explain why ORDER BY DueDate alone does not decide the order of equal dates.

Extension: explain why = NULL is not a suitable missing-value test. These starter fields are required and contain no NULLs.

Teacher check: explain SELECT/FROM/WHERE/ORDER BY; defend one AND/OR decision and one boundary; demonstrate your actual results. Draft activity, not a summative assessment.
