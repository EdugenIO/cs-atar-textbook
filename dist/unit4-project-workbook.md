# Project evidence workbook
Investigate: stakeholder questions, exact scope, R1–R7 acceptance criteria. Design: six-table crow’s-foot/notation/dictionary; planned dependencies/workshop schedule; algorithm and transaction boundaries; source mapping and unresolved rules.
Develop: implement one tested slice at a time; record SQL/source version, expected/actual and repair. Use raw CSV with mapping log, don't silently invent missing names. Test known/full/duplicate/unknown/invalid-date bookings, attendance pair/0-or-1, all-or-none imports. Explain join-grain outputs after valid changes.
Recover: saved known-good database/source; actual backup method/location; restore into separate destination; reopen; integrity/references/counts/reports comparison. In-memory teacher demo does not satisfy this evidence alone.
Evaluate: R1–R7 met/partly/not with actual evidence. Demonstrate a fresh workflow, rejected request and restore. Record assistance/sources/ownership and a realistic next improvement. Use synthetic IDs; no real learner/person records.


Optional data-quality worksheet: unit4-data-quality-workbook.md applies all five factors to dated fictional source evidence, units, duplicates, missing values and outliers. Explained answers and a decision-log example are available for self-checking; there is no grading or submission.


## Transaction walkthrough: one request, one boundary
Before changing the scaffold, write the expected stored rows for a successful request and a failed request. One statement is one database command; one user operation may need several statements.

1. Start the write transaction before counting bookings. In this SQLite example, BEGIN IMMEDIATE obtains the writer boundary first. If it cannot start because another writer is active, handle the busy result rather than using an old count.
2. Check the member, session, duplicate pair, date and current booking count inside that transaction. A direct SQL insert can still bypass application-only business rules.
3. Carry out every required linked change. For a booking-and-attendance operation, keep both inserts in the same boundary.
4. Commit only when the entire operation succeeds. Commit finalises that transaction; durability still depends on the configured storage guarantees.
5. On rejection or error, roll back the whole intended operation instead. Do not proceed to the success commit. Check that earlier inserts were undone and unrelated rows are unchanged.

Explain the race: if one place remains and A and B both count before either starts a protected write transaction, both may decide to take it. Beginning before the count protects this reference's check-and-insert sequence against another writer. Starting only before INSERT leaves the earlier decision exposed.

Try an attendance value of 2 after a valid booking insert in one explicit operation. The attendance statement should fail its domain check. Predict the database after explicit rollback and explain why the error message alone does not show that the earlier booking was undone. An in-memory exercise does not demonstrate recovery after a crash.


### Read the reference boundary before reusing a function
In unit4-project-reference.py, book() begins and commits its own transaction. set_attendance() has a different transaction. If you call book() successfully and then call set_attendance(), a failure in the second function cannot undo the booking that was already committed. This is different from the illustrative two-step operation above.

For that combined exercise, plan a single shared begin/check/change/commit-or-rollback boundary around both changes. Do not nest the existing functions inside another transaction: they expect no active caller transaction. Trace their actual statements first, then decide where a combined operation would need to be structured differently. No production change is needed for this paper walkthrough.
