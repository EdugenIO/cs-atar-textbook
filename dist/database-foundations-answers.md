# Unit 2 week 1 — explained answers

Working edition 0.6. Classroom draft. Use these explanations to check your reasoning; equivalent justified answers can also work.

1. Which items remain on loan and are overdue? Required facts: loan/item identity, DueDate, Returned, reference date and overdue rule.
2. Active: L001, L002, L004, L006 (4). Overdue: L001, L006 (2). Filter returned records first; compare each remaining due date strictly before 8 April.
3. L002 is due today, so it fails the strict-before condition. L003 has been returned, so it fails the unreturned condition.
4. Data: L001’s DueDate is 2026-04-06. Information: two loans are overdue as at the reference date under this rule.
5. E02 appears in two separate loans; B001 has two borrowing events. A repeated identifier may represent a legitimate relationship/history, not a duplicate event.
6. Borrower B002 would have conflicting labels. A Borrower table can hold the label once; loan events refer to BorrowerID. Good links and constraints remain necessary.
7. Borrower: BorrowerID/BorrowerLabel (4 records). Equipment: EquipmentID/EquipmentDescription (5). Loan: LoanID/BorrowerID/EquipmentID/DueDate/Returned (6). Identifiers connect the responsibilities; formal key and relationship rules come next.
8. Database: organised stored loan/borrower/item data. DBMS: software handling definition, retrieval and changes. RDBMS: DBMS using relational tables. Separate stored content from managing software.
9. Logical organisation differs from physical storage: SQLite can keep several related tables in one file.
10. A report requests fields through the DBMS instead of depending on their byte positions; adding an index can leave its question unchanged. Renaming a queried column or changing products may require changes/conversion.
11. Learners may view permitted availability; authorised staff can update loan records. Apply suitable controls; software features do not enforce an unconfigured policy. Do not store real student information in this exercise.
12. CSV: small temporary single-editor list with modest checks. Relational system: repeated borrower/equipment facts, growing history, controlled shared use. Match capacity/security requirements to the actual system.
13. Status may be inaccurate or not current; overdue assumes a strict date boundary, without time-of-day considerations.

Transfer: L002 additionally qualifies. Records are unchanged; the interpretation rule changed to include today’s date. Total overdue becomes 3.

Review criteria: accurate counts and boundary explanations; distinction between data, software and information; justified organisation/access choice; acknowledged limitation. Reattempt weak responses with changed records.
