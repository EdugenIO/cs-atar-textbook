# Equipment-desk database project

Unit 2. Optional learning project; teacher review pending.

## Brief and limits
Build a four-table equipment-loan database using synthetic data. Each loan is one item; history stays recorded when an item is returned. Use the existing Borrower/Category/Equipment/Loan model. The project edition adds fictional whole-dollar ReplacementCost estimates. A GUI/Python interface is optional. Use no real student personal data.

## Acceptance criteria
1. Creation SQL runs in a new SQLite database; PK, FK, required-field and cost/Returned checks are explained.
2. Active-loan report shows LoanID, borrower label, equipment ID, category name and due date, ordered oldest first with LoanID breaking ties.
3. Inventory summary uses COUNT, SUM, AVG, MIN, MAX directly on inventory rows; category report groups items by category.
4. Demonstrate INSERT of a new synthetic borrower, UPDATE of one confirmed return and DELETE of an unused disposable record. Preview targets and check before/after results.
5. Reject a duplicate ID, invalid FK, negative cost and invalid Returned value. Explain calendar-date and overlapping-loan limits.
6. Demonstrate rollback and restoration of a known-good closed database copy.
7. Supply original/revised ER diagram, data dictionary, saved SQL, test evidence and evaluation.
8. After security lessons, justify limited access, minimal collected data and backup/recovery decisions. Document which controls were actually implemented versus proposed.

## Allocation: 14 project lessons within the semester
Week 7: four lessons for requirements, design, initial creation/build and checkpoint.
Weeks 8–10: two workshops each week alongside security teaching; complete queries and controlled changes.
Weeks 11–12: two workshops each week; test, recover, document, evaluate and demonstrate.
Weeks 17–18: exam block; no project deadline spillover. Scope must fit supervised time; compulsory homework is not assumed.

## Checkpoints and evidence
Design: accepted requirements; crow's-foot ER diagram with keys/cardinalities; dictionary including ReplacementCost meaning/type/range.
Build: run your creation script and explain table order and constraints; verify baseline counts 4/3/5/6; demonstrate one report.
Test: requirement, input/action, expected, actual, pass/fail, correction; isolate changes between tests.
Evaluate: each criterion met/partly met/not met, evidence, limitation, realistic improvement. Compare predicted and actual outcomes.

## Self-review collection
Database working file, creation/data SQL, saved report/modification SQL, ER/dictionary, test log, recovery evidence and evaluation. Keep the untouched starter separately. Explain your work aloud or to a study partner. A supplied file alone does not demonstrate database creation.
