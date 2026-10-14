# Unit 2 week 1 — database foundations workbook

Working edition 0.6. Original classroom draft; all data are synthetic.
Use equipment-loans-flat.csv. Assume today is 8 April 2026. Overdue means Returned=False and DueDate strictly before today. No SQL installation is needed.

1. Name the question the equipment desk is asking. Identify its required input facts.
2. List active LoanIDs and overdue LoanIDs; show the two checks for each record.
3. Explain the treatment of L002 (due today) and L003 (returned).
4. Give one example of data and one example of information from this task.
5. Explain why E02 and B001 repeat. Why should repeated identifiers not simply be deleted?
6. Simulate changing Learner B’s label in L002 only. Describe the inconsistency and how separate tables help.
7. Sketch Borrower, Equipment and Loan responsibilities. Allocate the fields; count distinct borrowers, items and events. Do not treat this sketch as a formal ER diagram.
8. Distinguish database, DBMS and RDBMS using the equipment scenario.
9. Explain why one SQLite database file can still contain a relational design.
10. Explain data independence with an index/storage example; identify a change that may still require report changes.
11. Suggest read/edit permissions for learners and desk staff. Explain why configuration matters.
12. Give a case where a simple CSV is adequate and a case favouring a relational system. Justify each.
13. State one data-quality limitation and one rule assumption.

Transfer: If the desk instead defines “due today and unreturned” as overdue, which additional LoanID qualifies on 8 April? Explain what changed: data or rule.

Reflection: record one corrected misconception and answer a fresh teacher-selected scenario.
