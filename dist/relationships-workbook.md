# Unit 2 week 2 — modelling workbook

Edition 0.7. Original classroom draft. Use the four model CSVs and the worked ER diagram. No SQL setup is required.

1. Explain entity type, entity instance, attribute, field and record using Borrower B001 and Loan L001.
2. Identify each table’s PK and each FK, with its referenced table/field. Why is EquipmentDescription unsuitable as a PK?
3. Reconstruct L003’s borrower label, equipment description and category name through the links.
4. State all three diagram relationships in both directions, including minimum and maximum participation.
5. Redraw the four-table crow’s-foot ER diagram. Underline PK attributes, mark FKs, and describe each connector. Explain what a category with no equipment means.
6. Add a new historical event for borrower B001 and equipment E01. Explain why the borrowing pair alone is not unique and what assumptions prevent overlapping active loans.
7. Diagnose duplicate LoanID L001, nonexistent borrower B999 and a missing required CategoryID. Describe the violated rule in each case.
8. Compare one-to-one locker allocation, one-to-many loan history and many-to-many borrowing across time. State the rule, not just a relationship name.
9. For WorkshopEnrolment, assume one enrolment per borrower/workshop pair. May B001 appear more than once? May the pair B001/W01 appear more than once? Explain a composite key.
10. Create a Loan data dictionary: field name, conceptual type, size, meaning, format/default where applicable, and constraints. State which sizes are DBMS-dependent.
11. Choose types for item count, measured mass, return status, borrower label and due date. Justify each.
12. Explain why deleting a referenced borrower needs a deliberate policy. Propose a policy that preserves historical events.

Transfer: a new rule allows one loan event to contain several equipment items. Does the current Loan table represent this without duplication? Explain what further modelling is needed; do not silently change the meaning of a row.

Teacher review: check the four-table diagram, symbol meanings, key choices, valid references, dictionary and transfer reasoning against the requirements. Use the checklist to find what you understand and what to practise again.
