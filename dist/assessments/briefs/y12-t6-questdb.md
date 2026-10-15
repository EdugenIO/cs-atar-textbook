# Year 12 Task 6: VR lab booking and maintenance system

2027 planning draft · Draft project brief. Original content CC BY 4.0; example code MIT. Public planning material, not a secure school-issued assessment.

Develop an integrated Python/SQL system for a fictional shared-headset laboratory.

## Placement

- Type: Project
- Course weight: 25% (one alternative in this slot)
- Proposed local timing: S2 W5–10: 16 existing workshops after four foundation lessons in W4.
- Content family: Unit 4: relational design, Python/SQL integration, integrity, transactions and evaluation

## Scope and required evidence

- Model five related entities: BorrowerAlias, DeviceModel, Device, Booking and Maintenance. Explain keys, relationships and normalisation.
- Create a Python interface that executes parameterised SQL for bookings, updates and reports. Include meaningful multi-table joins, grouped totals and calculated output.
- Test integrity, a transaction that rolls back on failure, backup restoration and role/privacy decisions. Use synthetic asset and borrower data.

## Delivery routes

- Python console interface using SQL: the baseline integrated solution.
- Optional Python desktop GUI using the same database core.
- Optional Python-backed local browser interface if already taught; retain the same SQL evidence.

## Resources and setup

- Python sqlite3 and SQLite; no headset needed to earn any mark.
- Included devices.csv, borrowers.csv, bookings.csv, schema-todo.sql and app-todo.py.
- Optional headset observation only after school approval.

## Initial acceptance checks / paper review

- A booking for an unknown device fails referential integrity.
- A duplicate/conflicting booking follows the specified rejection rule.
- A failed multi-step update rolls back and leaves earlier data unchanged.

## Submission and criteria

Submit your requirements/schedule, design, code or database, synthetic data, expected/actual test records, source/assistance log and evaluation. Use student-workbook.md and test-record.csv. Checkpoints belong to this project.

Suggested raw marks: investigation 15, design 25, implementation 35, testing 15, evaluation 10, total 100. The teacher must translate these categories into task-specific observable marking points and publish the final guide. Hardware/visual polish earns no separate marks.

## Conditions to finalise before issue

Teacher sets issue/due dates, permitted references/AI/assistance, supervised-work arrangements, individual-authorship evidence, approved adjustments and the item-level key. Record milestones and use an explanation or small change demonstration to authenticate the same task. Fresh controlled tests and exam keys must be developed privately. Public practice answers cannot establish assessment security.

This option does not add to the eight-task outline. A learner completes the selected alternative or an explicitly moderated equivalent. Refer to teacher-release-checklist.md and coverage-and-release.md before use.
